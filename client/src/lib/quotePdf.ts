import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { QuoteItem } from "../contexts/QuoteCartContext";

export type QuotePdfCustomer = {
  name?: string;
  email?: string;
  company?: string;
  requirements?: string;
};

export type QuotePdfInput = {
  items: QuoteItem[];
  customer?: QuotePdfCustomer;
  generatedAt?: Date;
  reference?: string;
};

export type QuotePdfRow = {
  name: string;
  code: string;
  category: string;
  range?: string;
  quantity: number;
  notes?: string;
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 44;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const INK = rgb(0.10, 0.10, 0.18);
const MUTED = rgb(0.34, 0.35, 0.40);
const GOLD = rgb(0.78, 0.56, 0.20);
const PALE_GOLD = rgb(0.97, 0.94, 0.86);
const RULE = rgb(0.84, 0.83, 0.79);
const WHITE = rgb(1, 1, 1);

export function getQuotePdfRows(items: QuoteItem[]): QuotePdfRow[] {
  return items.map((item) => ({
    name: item.name,
    code: item.code,
    category: item.categoryTitle,
    range: item.rangeTitle,
    quantity: item.quantity,
    notes: item.notes?.trim() || undefined,
  }));
}

function cleanText(value: string | undefined, fallback = "Not provided") {
  const cleaned = value?.trim();
  return cleaned || fallback;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatReference(date: Date, reference?: string) {
  if (reference?.trim()) return reference.trim();
  const stamp = date.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  return `BW-${stamp}`;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const paragraphs = text.replace(/\r/g, "").split("\n");
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !current) {
        current = candidate;
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function drawWrapped(page: PDFPage, text: string, x: number, y: number, width: number, font: PDFFont, size: number, color: ReturnType<typeof rgb>, lineHeight = size * 1.45) {
  const lines = wrapText(text, font, size, width);
  for (const line of lines) {
    if (line) page.drawText(line, { x, y, size, font, color });
    y -= lineHeight;
  }
  return y;
}

function drawRule(page: PDFPage, y: number, color = RULE) {
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.8, color });
}

export async function generateQuoteCartPdf(input: QuotePdfInput) {
  const rows = getQuotePdfRows(input.items);
  if (rows.length === 0) throw new Error("Cannot create a quote summary from an empty cart.");

  const generatedAt = input.generatedAt ?? new Date();
  const reference = formatReference(generatedAt, input.reference);
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let pageNumber = 0;
  let page!: PDFPage;
  let y = 0;

  const addPage = () => {
    pageNumber += 1;
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Draw professional corporate header with Bridge Wax logo badge
    const logoBoxWidth = 36;
    const logoBoxHeight = 36;
    const logoY = PAGE_HEIGHT - 56;
    page.drawRectangle({
      x: MARGIN,
      y: logoY,
      width: logoBoxWidth,
      height: logoBoxHeight,
      color: INK,
      borderColor: GOLD,
      borderWidth: 1,
    });
    page.drawText("BW", {
      x: MARGIN + 8,
      y: logoY + 11.5,
      size: 13,
      font: bold,
      color: GOLD,
    });

    const textX = MARGIN + logoBoxWidth + 12;
    page.drawText("BRIDGE WAX", { x: textX, y: logoY + 22, size: 15, font: bold, color: INK });
    page.drawText("WE EXCEED OUR VISION", { x: textX, y: logoY + 11, size: 6.5, font: bold, color: GOLD });
    page.drawText("Laboratory equipment · Industrial solutions · PPE", { x: textX, y: logoY - 1, size: 8, font: regular, color: MUTED });

    y = PAGE_HEIGHT - 110;
    return page;
  };

  const ensureSpace = (required: number) => {
    if (y - required < 54) {
      drawFooter();
      addPage();
    }
  };

  const drawFooter = () => {
    drawRule(page, 38, RULE);
    page.drawText(`bridgewax.com  ·  info@bridgewax.com  ·  ${reference}`, { x: MARGIN, y: 23, size: 7.5, font: regular, color: MUTED });
    page.drawText(`Page ${pageNumber}`, { x: PAGE_WIDTH - MARGIN - 42, y: 23, size: 7.5, font: regular, color: MUTED });
  };

  addPage();
  page.drawText("QUOTATION SUMMARY", { x: MARGIN, y, size: 24, font: bold, color: INK });
  y -= 22;
  page.drawText("Prepared for offline B2B review and approval", { x: MARGIN, y, size: 10, font: regular, color: MUTED });
  y -= 30;

  page.drawRectangle({ x: MARGIN, y: y - 56, width: CONTENT_WIDTH, height: 70, color: PALE_GOLD, borderColor: rgb(0.90, 0.82, 0.64), borderWidth: 0.8 });
  page.drawText("SUMMARY DETAILS", { x: MARGIN + 14, y: y - 5, size: 7.5, font: bold, color: GOLD });
  page.drawText(`Reference  ${reference}`, { x: MARGIN + 14, y: y - 24, size: 9.5, font: bold, color: INK });
  page.drawText(`Prepared  ${formatDate(generatedAt)}`, { x: MARGIN + 14, y: y - 41, size: 9, font: regular, color: MUTED });
  page.drawText(`${rows.length} selected ${rows.length === 1 ? "line item" : "line items"}`, { x: PAGE_WIDTH - MARGIN - 124, y: y - 24, size: 9.5, font: bold, color: INK });
  y -= 92;

  const customer = input.customer;
  page.drawText("CUSTOMER / APPROVAL CONTACT", { x: MARGIN, y, size: 8, font: bold, color: GOLD });
  y -= 16;
  const customerLines = [
    `Name: ${cleanText(customer?.name)}`,
    `Company: ${cleanText(customer?.company)}`,
    `Email: ${cleanText(customer?.email)}`,
  ];
  for (const line of customerLines) {
    page.drawText(line, { x: MARGIN, y, size: 9.5, font: regular, color: INK });
    y -= 14;
  }
  y -= 10;
  drawRule(page, y);
  y -= 25;

  page.drawText("SELECTED PRODUCTS", { x: MARGIN, y, size: 8, font: bold, color: GOLD });
  y -= 19;

  for (const row of rows) {
    const noteLines = row.notes ? wrapText(`Notes: ${row.notes}`, regular, 8.5, CONTENT_WIDTH - 22) : [];
    const itemHeight = 39 + (noteLines.length ? noteLines.length * 12 + 8 : 0);
    ensureSpace(itemHeight);
    page.drawRectangle({ x: MARGIN, y: y - itemHeight + 8, width: CONTENT_WIDTH, height: itemHeight, color: WHITE, borderColor: RULE, borderWidth: 0.7 });
    page.drawText(row.name, { x: MARGIN + 11, y: y - 12, size: 10.5, font: bold, color: INK });
    page.drawText(`Qty ${row.quantity}`, { x: PAGE_WIDTH - MARGIN - 53, y: y - 12, size: 8.5, font: bold, color: GOLD });
    const category = row.range ? `${row.category} · ${row.range}` : row.category;
    page.drawText(`${row.code}  ·  ${category}`, { x: MARGIN + 11, y: y - 27, size: 8.2, font: regular, color: MUTED });
    let itemY = y - 43;
    for (const line of noteLines) {
      page.drawText(line, { x: MARGIN + 11, y: itemY, size: 8.5, font: regular, color: INK });
      itemY -= 12;
    }
    y -= itemHeight + 8;
  }

  if (input.customer?.requirements?.trim()) {
    ensureSpace(75);
    y -= 8;
    page.drawText("ADDITIONAL REQUIREMENTS", { x: MARGIN, y, size: 8, font: bold, color: GOLD });
    y -= 17;
    y = drawWrapped(page, input.customer.requirements.trim(), MARGIN, y, CONTENT_WIDTH, regular, 9.5, INK, 14);
  }

  // Customer Signature & Approval Section
  ensureSpace(120);
  y -= 16;
  page.drawText("CUSTOMER APPROVAL & SIGNATURE", { x: MARGIN, y, size: 8, font: bold, color: GOLD });
  y -= 16;
  page.drawText("By signing below, the customer acknowledges and approves this quotation summary for formal submission to Bridge Wax.", { x: MARGIN, y, size: 8.5, font: regular, color: MUTED });
  y -= 24;

  const boxWidth = (CONTENT_WIDTH - 20) / 2;
  const boxHeight = 52;
  const sigY = y - boxHeight;

  // Signature box 1: Authorized Signature
  page.drawRectangle({ x: MARGIN, y: sigY, width: boxWidth, height: boxHeight, color: WHITE, borderColor: RULE, borderWidth: 0.8 });
  page.drawText("Authorized Signature", { x: MARGIN + 12, y: sigY + boxHeight - 14, size: 7.5, font: bold, color: MUTED });
  page.drawLine({ start: { x: MARGIN + 12, y: sigY + 16 }, end: { x: MARGIN + boxWidth - 12, y: sigY + 16 }, thickness: 0.6, color: RULE });
  page.drawText("X", { x: MARGIN + 12, y: sigY + 20, size: 8, font: bold, color: MUTED });

  // Signature box 2: Date & Designation
  const box2X = MARGIN + boxWidth + 20;
  page.drawRectangle({ x: box2X, y: sigY, width: boxWidth, height: boxHeight, color: WHITE, borderColor: RULE, borderWidth: 0.8 });
  page.drawText("Name / Designation / Date", { x: box2X + 12, y: sigY + boxHeight - 14, size: 7.5, font: bold, color: MUTED });
  page.drawText("Name: _______________________________", { x: box2X + 12, y: sigY + 28, size: 8, font: regular, color: MUTED });
  page.drawText("Date: ________________________________", { x: box2X + 12, y: sigY + 14, size: 8, font: regular, color: MUTED });

  y = sigY - 24;

  ensureSpace(62);
  y -= 10;
  page.drawRectangle({ x: MARGIN, y: y - 42, width: CONTENT_WIDTH, height: 56, color: INK });
  page.drawText("NEXT STEP", { x: MARGIN + 14, y: y - 9, size: 7.5, font: bold, color: GOLD });
  page.drawText("Send this signed summary to your internal approver, then contact Bridge Wax for a formal quotation.", { x: MARGIN + 14, y: y - 27, size: 8.6, font: regular, color: WHITE });
  page.drawText("info@bridgewax.com  ·  bridgewax.com", { x: MARGIN + 14, y: y - 41, size: 8.2, font: bold, color: WHITE });

  drawFooter();
  return pdf.save();
}

export async function downloadQuoteCartPdf(input: QuotePdfInput) {
  const bytes = await generateQuoteCartPdf(input);
  const generatedAt = input.generatedAt ?? new Date();
  const dateStamp = generatedAt.toISOString().slice(0, 10);
  const pdfBytes = new Uint8Array(bytes.byteLength);
  pdfBytes.set(bytes);
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `bridge-wax-quote-summary-${dateStamp}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}
