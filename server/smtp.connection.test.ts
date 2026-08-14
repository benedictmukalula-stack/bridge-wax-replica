import "dotenv/config";
import nodemailer from "nodemailer";
import { describe, expect, it } from "vitest";

describe("1-grid SMTP configuration", () => {
  it("authenticates the configured bridgewax.com sender without sending a message", async () => {
    const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_FROM", "SMTP_RECIPIENT"] as const;

    for (const key of required) {
      expect(process.env[key], `${key} must be configured`).toBeTruthy();
    }

    const port = Number(process.env.SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 15_000,
    });

    await expect(transporter.verify()).resolves.toBe(true);
  }, 25_000);
});
