import { describe, expect, it } from "vitest";
import { quotationSubmissionSuccessMessage } from "./quoteConfirmation";

describe("quotationSubmissionSuccessMessage", () => {
  it("tells the customer when their confirmation email was sent", () => {
    expect(quotationSubmissionSuccessMessage("customer@example.com", true)).toBe(
      "Your quotation request has been sent to info@bridgewax.com. A confirmation has also been sent to customer@example.com.",
    );
  });

  it("does not claim a customer confirmation when only the internal quotation delivery succeeded", () => {
    expect(quotationSubmissionSuccessMessage("customer@example.com", false)).toBe(
      "Your quotation request has been sent to info@bridgewax.com.",
    );
  });
});
