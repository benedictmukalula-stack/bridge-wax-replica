import { describe, expect, it } from "vitest";
import { PRODUCT_SEARCH_INDEX, listAllProducts, searchProductCategories, searchProducts } from "../client/src/lib/productSearch";

describe("expanded product search index", () => {
  it("finds individual products by product terms and codes", () => {
    expect(searchProducts("centrifugal").some((product) => product.code === "BW-WP-001")).toBe(true);
    expect(searchProducts("BW-WP-001")[0]?.name).toBe("End-Suction Centrifugal Pump");
  });

  it("finds product categories and returns their catalogue destinations", () => {
    const categories = searchProductCategories("pumps");
    expect(categories).toContainEqual(expect.objectContaining({ slug: "water-pumps", title: "Water Pumps" }));
  });

  it("lists the complete product index for the all-products search mode", () => {
    expect(listAllProducts()).toHaveLength(PRODUCT_SEARCH_INDEX.length);
    expect(listAllProducts(3)).toHaveLength(3);
  });
});
