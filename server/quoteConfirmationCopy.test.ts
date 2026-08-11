import { describe, expect, it } from "vitest";
import { quotationSubmissionSuccessMessage } from "../client/src/lib/quoteConfirmation";

describe("quotationSubmissionSuccessMessage", () => {
  it("names the customer confirmation recipient after successful confirmation delivery", () => {
    expect(quotationSubmissionSuccessMessage("customer@example.com", true)).toBe(
      "Your quotation request has been sent to info@bridgewax.com. A confirmation has also been sent to customer@example.com.",
    );
  });

  it("does not claim a customer confirmation when only the internal quotation email succeeded", () => {
    expect(quotationSubmissionSuccessMessage("customer@example.com", false)).toBe(
      "Your quotation request has been sent to info@bridgewax.com.",
    );
  });
});
