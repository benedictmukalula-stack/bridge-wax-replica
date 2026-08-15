import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { generateQuoteCartPdf, getQuotePdfRows } from "./quotePdf";

const items = [
  {
    code: "LAB-MIN-001",
    name: "Bench-top analytical balance",
    categorySlug: "laboratory-mining",
    categoryTitle: "Mining Laboratory",
    rangeTitle: "Analytical instruments",
    quantity: 2,
    notes: "Include calibration certificate and delivery lead time.",
  },
  {
    code: "PPE-FP-004",
    name: "Full body fall-arrest harness",
    categorySlug: "safety-ppe",
    categoryTitle: "Safety & PPE",
    rangeTitle: "Fall protection",
    quantity: 5,
  },
] as const;

describe("quote cart PDF summary", () => {
  it("normalizes item codes, quantities, categories, and notes for the document", () => {
    expect(getQuotePdfRows([...items])).toEqual([
      {
        name: "Bench-top analytical balance",
        code: "LAB-MIN-001",
        category: "Mining Laboratory",
        range: "Analytical instruments",
        quantity: 2,
        notes: "Include calibration certificate and delivery lead time.",
      },
      {
        name: "Full body fall-arrest harness",
        code: "PPE-FP-004",
        category: "Safety & PPE",
        range: "Fall protection",
        quantity: 5,
        notes: undefined,
      },
    ]);
  });

  it("creates a readable PDF document with customer approval details", async () => {
    const bytes = await generateQuoteCartPdf({
      items: [...items],
      generatedAt: new Date("2026-08-15T10:30:00.000Z"),
      reference: "BW-TEST-001",
      customer: {
        name: "Benedict Mukalula",
        company: "Bridge Wax Test Company",
        email: "approver@example.com",
        requirements: "Please quote delivery to Lusaka and include warranty terms.",
      },
    });

    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    const document = await PDFDocument.load(bytes);
    expect(document.getPageCount()).toBe(1);
  });

  it("creates additional pages for a large offline approval summary", async () => {
    const manyItems = Array.from({ length: 28 }, (_, index) => ({
      code: `SKU-${String(index + 1).padStart(3, "0")}`,
      name: `Industrial catalogue item ${index + 1}`,
      categorySlug: "industrial",
      categoryTitle: "Industrial Solutions",
      rangeTitle: "Plant maintenance",
      quantity: index + 1,
      notes: "Confirm technical specification, availability, and delivery schedule before approval.",
    }));

    const bytes = await generateQuoteCartPdf({ items: manyItems });
    const document = await PDFDocument.load(bytes);
    expect(document.getPageCount()).toBeGreaterThan(1);
  });

  it("rejects an empty cart instead of downloading a blank document", async () => {
    await expect(generateQuoteCartPdf({ items: [] })).rejects.toThrow("empty cart");
  });
});
