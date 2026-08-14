import nodemailer from "nodemailer";

export type QuotationProduct = {
  name: string;
  code: string;
  categoryTitle: string;
  rangeTitle?: string;
  quantity: number;
};

export type QuotationEmailInput = {
  name: string;
  email: string;
  company?: string;
  requirements?: string;
  products: QuotationProduct[];
};

function env(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatProductsText(products: QuotationProduct[]): string {
  return products
    .map(
      (product) =>
        `- ${product.name} (${product.code}) — Quantity: ${product.quantity}${
          product.categoryTitle ? ` — ${product.categoryTitle}` : ""
        }${product.rangeTitle ? ` — ${product.rangeTitle}` : ""}`,
    )
    .join("\n");
}

export function formatCustomerConfirmationEmail(
  input: QuotationEmailInput,
): string {
  return [
    "Quotation Request Received",
    "",
    `Dear ${input.name},`,
    "",
    "Thank you for contacting Bridge Wax.",
    "",
    "Your quotation request has been received and is currently being reviewed by our sales team.",
    "",
    "Requested Products:",
    formatProductsText(input.products),
    "",
    "One of our consultants will contact you shortly with pricing, availability and delivery information.",
    "",
    "Thank you for choosing Bridge Wax.",
    "",
    "Bridge Wax",
    "Laboratory Equipment & Industrial Solutions",
    "info@bridgewax.com",
  ].join("\n");
}

export function formatQuotationEmail(input: QuotationEmailInput): string {
  return [
    "NEW BRIDGE WAX QUOTATION REQUEST",
    "",
    `Customer: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "Not provided"}`,
    "",
    "Requirements:",
    input.requirements || "None provided",
    "",
    "Requested Products:",
    formatProductsText(input.products),
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
}

export function buildCustomerConfirmationHtml(
  input: QuotationEmailInput,
): string {
  const products = input.products
    .map(
      (product) => `
<tr>
<td style="padding:12px;border-bottom:1px solid #e8edf3;color:#17212b;">
${escapeHtml(product.name)}
</td>
<td style="padding:12px;border-bottom:1px solid #e8edf3;color:#17212b;">
${escapeHtml(product.code)}
</td>
<td style="padding:12px;border-bottom:1px solid #e8edf3;text-align:center;color:#17212b;">
${escapeHtml(product.quantity)}
</td>
</tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Bridge Wax — Quotation Request Received</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#17212b;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fa;">
<tr>
<td align="center" style="padding:35px 15px;">

<table width="650" cellpadding="0" cellspacing="0" border="0"
style="max-width:650px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">

<tr>
<td style="background:#0d5ea8;padding:30px;text-align:center;">

<img
src="https://bridgewax.com/images/bridge-wax-logo.png"
alt="Bridge Wax"
width="170"
style="display:block;margin:0 auto;max-width:170px;height:auto;"
>

</td>
</tr>

<tr>
<td style="padding:40px;">

<h1 style="margin:0 0 20px;color:#0d5ea8;font-size:25px;line-height:1.3;">
Quotation Request Received
</h1>

<p style="font-size:15px;line-height:1.7;margin:0 0 15px;">
Dear <strong>${escapeHtml(input.name)}</strong>,
</p>

<p style="font-size:15px;line-height:1.7;margin:0 0 25px;">
Thank you for contacting <strong>Bridge Wax</strong>.
Your quotation request has been received and is currently being reviewed by our sales team.
</p>

<h2 style="font-size:18px;color:#17212b;margin:0 0 15px;">
Requested Products
</h2>

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="border-collapse:collapse;font-size:14px;">

<tr style="background:#f2f5f9;">
<th align="left" style="padding:12px;">Product</th>
<th align="left" style="padding:12px;">Code</th>
<th align="center" style="padding:12px;">Qty</th>
</tr>

${products}

</table>

<p style="font-size:15px;line-height:1.7;margin:28px 0 15px;">
One of our consultants will contact you shortly with pricing, availability and delivery information.
</p>

<p style="font-size:15px;line-height:1.7;margin:0;">
Thank you for choosing <strong>Bridge Wax</strong>.
</p>

</td>
</tr>

<tr>
<td style="background:#0d5ea8;color:#ffffff;padding:25px;text-align:center;font-size:13px;line-height:1.6;">

<strong style="font-size:15px;">Bridge Wax</strong><br>
Laboratory Equipment &amp; Industrial Solutions<br>
info@bridgewax.com

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

export function buildInternalQuotationHtml(
  input: QuotationEmailInput,
): string {
  const submitted = new Date().toLocaleString("en-ZM", {
    timeZone: "Africa/Lusaka",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const products = input.products
    .map(
      (product) => `
<tr>
<td style="padding:11px;border-bottom:1px solid #e8edf3;">
${escapeHtml(product.name)}
</td>
<td style="padding:11px;border-bottom:1px solid #e8edf3;">
${escapeHtml(product.code)}
</td>
<td style="padding:11px;border-bottom:1px solid #e8edf3;">
${escapeHtml(product.categoryTitle)}
</td>
<td style="padding:11px;border-bottom:1px solid #e8edf3;text-align:center;">
${escapeHtml(product.quantity)}
</td>
</tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>New Bridge Wax Quotation Request</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#17212b;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fa;">
<tr>
<td align="center" style="padding:30px 15px;">

<table width="700" cellpadding="0" cellspacing="0" border="0"
style="max-width:700px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">

<tr>
<td style="background:#0d5ea8;color:#ffffff;padding:28px 32px;">

<strong style="font-size:22px;">Bridge Wax</strong><br>
<span style="font-size:13px;">New Quotation Request</span>

</td>
</tr>

<tr>
<td style="padding:32px;">

<h1 style="font-size:23px;margin:0 0 25px;color:#0d5ea8;">
New Quotation Request
</h1>

<table width="100%" cellpadding="8" cellspacing="0" border="0"
style="font-size:14px;margin-bottom:28px;">

<tr>
<td width="140" style="font-weight:bold;">Customer</td>
<td>${escapeHtml(input.name)}</td>
</tr>

<tr>
<td style="font-weight:bold;">Email</td>
<td>${escapeHtml(input.email)}</td>
</tr>

<tr>
<td style="font-weight:bold;">Company</td>
<td>${escapeHtml(input.company || "Not provided")}</td>
</tr>

<tr>
<td style="font-weight:bold;">Submitted</td>
<td>${escapeHtml(submitted)}</td>
</tr>

</table>

<h2 style="font-size:17px;margin:0 0 12px;">
Requirements
</h2>

<div style="background:#f6f8fb;border-left:4px solid #0d5ea8;padding:15px;margin-bottom:28px;line-height:1.6;">
${escapeHtml(input.requirements || "No additional requirements provided.")}
</div>

<h2 style="font-size:17px;margin:0 0 12px;">
Requested Products
</h2>

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="border-collapse:collapse;font-size:13px;">

<tr style="background:#f2f5f9;">
<th align="left" style="padding:11px;">Product</th>
<th align="left" style="padding:11px;">Code</th>
<th align="left" style="padding:11px;">Category</th>
<th align="center" style="padding:11px;">Qty</th>
</tr>

${products}

</table>

</td>
</tr>

<tr>
<td style="background:#17212b;color:#ffffff;padding:20px 30px;font-size:12px;">
Bridge Wax — Laboratory Equipment &amp; Industrial Solutions
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure: port === 465,
    requireTLS: true,
    auth: {
      user: env("SMTP_USERNAME"),
      pass: env("SMTP_PASSWORD"),
    },
  });
}

export async function sendQuotationEmail(
  input: QuotationEmailInput,
): Promise<{ messageId: string }> {
  const from = env("SMTP_FROM");
  const recipient = env("SMTP_RECIPIENT");

  const transporter = createTransporter();

  const result = await transporter.sendMail({
    from,
    to: recipient,
    replyTo: input.email,
    subject: `New Bridge Wax quotation request — ${input.name}`,
    text: formatQuotationEmail(input),
    html: buildInternalQuotationHtml(input),
  });

  return {
    messageId: result.messageId,
  };
}

export async function sendCustomerConfirmationEmail(
  input: QuotationEmailInput,
): Promise<{ messageId: string }> {
  const from = env("SMTP_FROM");

  const transporter = createTransporter();

  const result = await transporter.sendMail({
    from,
    to: input.email,
    replyTo: from,
    subject: "We've received your Bridge Wax quotation request",
    text: formatCustomerConfirmationEmail(input),
    html: buildCustomerConfirmationHtml(input),
  });

  return {
    messageId: result.messageId,
  };
}
