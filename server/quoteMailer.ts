/* Bridge Wax mail delivery: all quote requests are sent server-side through the configured domain mailbox. */
import nodemailer from "nodemailer";

export type QuotationEmailInput = {
  name: string;
  email: string;
  company?: string;
  requirements?: string;
  products: Array<{
    name: string;
    code: string;
    categoryTitle: string;
    rangeTitle?: string;
    quantity: number;
  }>;
};

function requiredSecret(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`Email service configuration is incomplete: ${key}`);
  return value;
}

export function formatQuotationEmail(input: QuotationEmailInput): string {
  const products = input.products
    .map((product) => `- ${product.name} (${product.code}) — Quantity: ${product.quantity} — ${product.categoryTitle}${product.rangeTitle ? ` · ${product.rangeTitle}` : ""}`)
    .join("\n");

  return [
    "Bridge Wax Website Quotation Request",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "Not provided"}`,
    "",
    "Requested products:",
    products,
    "",
    `Additional requirements: ${input.requirements || "None provided"}`,
  ].join("\n");
}

export async function sendQuotationEmail(input: QuotationEmailInput): Promise<{ messageId: string }> {
  const host = requiredSecret("SMTP_HOST");
  const port = Number(requiredSecret("SMTP_PORT"));
  const username = requiredSecret("SMTP_USERNAME");
  const password = requiredSecret("SMTP_PASSWORD");
  const from = requiredSecret("SMTP_FROM");
  const recipient = requiredSecret("SMTP_RECIPIENT");

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("Email service configuration has an invalid SMTP port");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: username, pass: password },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  const result = await transporter.sendMail({
    from,
    to: recipient,
    replyTo: input.email,
    subject: `Bridge Wax quotation request — ${input.name}`,
    text: formatQuotationEmail(input),
  });

  if (!result.accepted.includes(recipient)) {
    throw new Error("The quotation email was not accepted by the mail server");
  }

  return { messageId: result.messageId };
}
