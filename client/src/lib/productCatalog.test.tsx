import { describe, expect, it } from "vitest";
import { PRODUCT_CATALOGUES } from "./productCatalog";

const EXPECTED_SKUS = [
  "BW-UTG-001", "BW-UTG-002", "BW-UTG-003", "BW-UTG-004", "BW-UTG-005", "BW-UTG-006", "BW-UTG-007",
  "BW-GD-001", "BW-GD-002", "BW-GD-003", "BW-GD-004", "BW-GD-005", "BW-GD-006", "BW-GD-007",
  "BW-WP-001", "BW-WP-002", "BW-WP-003", "BW-WP-004", "BW-WP-005", "BW-WP-006", "BW-WP-007",
  "BW-GM-001", "BW-GM-002", "BW-GM-003", "BW-GM-004", "BW-GM-005", "BW-GM-006", "BW-GM-007",
  "BW-DP-001", "BW-DP-002", "BW-DP-003", "BW-DP-004", "BW-DP-005", "BW-DP-006", "BW-DP-007", "BW-DP-008",
].sort();

const products = Object.values(PRODUCT_CATALOGUES).flatMap((catalogue) => [
  ...catalogue.products,
  ...(catalogue.subsections?.flatMap((section) => section.products) ?? []),
]);

describe("authoritative product catalogue image mappings", () => {
  it("contains exactly the expected 36 SKUs", () => {
    expect(products).toHaveLength(36);
    expect(products.map(({ code }) => code).sort()).toEqual(EXPECTED_SKUS);
  });

  it("maps each SKU to one deterministic authoritative image path", () => {
    const imagePaths = products.map(({ image }) => image);
    expect(new Set(imagePaths).size).toBe(36);
    for (const product of products) {
      expect(product.image).toBe(`/images/products/new-authoritative/${product.code}.webp`);
    }
  });
});
