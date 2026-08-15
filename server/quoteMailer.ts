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
    notes?: string;
  }>;
};

function requiredSecret(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`Email service configuration is incomplete: ${key}`);
  return value;
}

export function formatQuotationEmail(input: QuotationEmailInput): string {
  const products = input.products
    .map((product) => {
      const base = `- ${product.name} (${product.code}) — Quantity: ${product.quantity} — ${product.categoryTitle}${product.rangeTitle ? ` · ${product.rangeTitle}` : ""}`;
      const noteLine = product.notes ? `  Notes: ${product.notes}` : "";
      return noteLine ? `${base}\n${noteLine}` : base;
    })
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

export function formatCustomerConfirmationEmail(input: QuotationEmailInput): string {
  const products = input.products
    .map((product) => {
      const base = `- ${product.name} (${product.code}) — Quantity: ${product.quantity}`;
      const noteLine = product.notes ? `  Notes: ${product.notes}` : "";
      return noteLine ? `${base}\n${noteLine}` : base;
    })
    .join("\n");

  return [
    "Bridge Wax Quotation Request Received",
    "",
    `Dear ${input.name},`,
    "",
    "Thank you for your quotation request. Our team has received it and will review the products and requirements you provided.",
    "",
    "Requested products:",
    products,
    "",
    "We will contact you at this email address with the next steps or a quotation.",
    "",
    "Kind regards,",
    "Bridge Wax",
    "Laboratory Equipment & Industrial Solutions",
  ].join("\n");
}

function createSmtpTransporter() {
  const host = requiredSecret("SMTP_HOST");
  const port = Number(requiredSecret("SMTP_PORT"));
  const username = requiredSecret("SMTP_USERNAME");
  const password = requiredSecret("SMTP_PASSWORD");

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("Email service configuration has an invalid SMTP port");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: username, pass: password },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
}

export async function sendQuotationEmail(input: QuotationEmailInput): Promise<{ messageId: string }> {
  const from = requiredSecret("SMTP_FROM");
  const recipient = requiredSecret("SMTP_RECIPIENT");
  const transporter = createSmtpTransporter();

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

export async function sendCustomerConfirmationEmail(input: QuotationEmailInput): Promise<{ messageId: string }> {
  const from = requiredSecret("SMTP_FROM");
  const transporter = createSmtpTransporter();

  const result = await transporter.sendMail({
    from,
    to: input.email,
    replyTo: from,
    subject: "We received your Bridge Wax quotation request",
    text: formatCustomerConfirmationEmail(input),
  });

  const customerAccepted = result.accepted.some((recipient) => {
    const address = typeof recipient === "string" ? recipient : recipient.address;
    return address.toLowerCase() === input.email.toLowerCase();
  });

  if (!customerAccepted) {
    throw new Error("The customer confirmation email was not accepted by the mail server");
  }

  return { messageId: result.messageId };
}
