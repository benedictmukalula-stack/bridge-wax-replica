import { describe, expect, it } from "vitest";
import { formatQuotationEmail } from "./quoteMailer";

describe("formatQuotationEmail", () => {
  it("includes the customer details and every selected product without exposing SMTP configuration", () => {
    const body = formatQuotationEmail({
      name: "Sample Customer",
      email: "customer@example.com",
      company: "Sample Mining Ltd",
      requirements: "Please include lead times.",
      products: [{ name: "End-Suction Centrifugal Pump", code: "BW-WP-001", categoryTitle: "Water Pumps", quantity: 2 }],
    });

    expect(body).toContain("Sample Customer");
    expect(body).toContain("BW-WP-001");
    expect(body).toContain("Quantity: 2");
    expect(body).not.toContain("SMTP_PASSWORD");
  });
});
