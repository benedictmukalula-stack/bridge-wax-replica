import { describe, expect, it } from "vitest";
import { CONTINUE_BROWSING_PATH } from "../client/src/components/QuoteCart";

describe("cart navigation", () => {
  it("returns empty-cart shoppers to Products & Solutions", () => {
    expect(CONTINUE_BROWSING_PATH).toBe("/products");
  });
});
