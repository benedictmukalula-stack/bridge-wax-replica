import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import {
  sendQuotationEmail,
  sendCustomerConfirmationEmail,
} from "../server/quoteMailer.js";

const quoteProductSchema = z.object({
  name: z.string().trim().min(1).max(160),
  code: z.string().trim().min(1).max(80),
  categoryTitle: z.string().trim().min(1).max(100),
  rangeTitle: z.string().trim().max(100).optional(),
  quantity: z.number().int().min(1).max(100),
});

const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional(),
  requirements: z.string().trim().max(2000).optional(),
  products: z.array(quoteProductSchema).min(1).max(50),
  website: z.string().max(0).optional(),
});

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateEntry>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }

  return req.socket.remoteAddress || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimit.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimit.set(ip, {
      count: 1,
      resetAt: now + 15 * 60 * 1000,
    });
    return true;
  }

  if (existing.count >= 5) {
    return false;
  }

  existing.count += 1;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      message: "Too many quotation requests. Please try again later.",
    });
  }

  try {
    const parsed = quoteRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Please check the quotation information and try again.",
      });
    }

    const input = parsed.data;

    // Honeypot: legitimate users leave this field empty.
    // Bots that populate it are rejected without sending email.
    if (input.website !== "") {
      return res.status(400).json({
        success: false,
        message: "Please check the quotation information and try again.",
      });
    }

    const { website: _website, ...quotationInput } = input;

    const result = await sendQuotationEmail(quotationInput);

    let customerConfirmationSent = true;

    try {
      await sendCustomerConfirmationEmail(quotationInput);
    } catch (error) {
      customerConfirmationSent = false;
      console.error(
        "[Quotation] Customer confirmation email could not be sent",
        error,
      );
    }

    return res.status(200).json({
      success: true,
      messageId: result.messageId,
      customerConfirmationSent,
    });
  } catch (error) {
    console.error("[Quotation] Delivery failed", error);

    return res.status(500).json({
      success: false,
      message: "We could not send the quotation request.",
    });
  }
}
