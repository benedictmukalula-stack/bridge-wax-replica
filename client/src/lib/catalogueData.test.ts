import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS, filterCatalogueProducts, getCatalogueCounts, getProductByPath, getProductBySku, getProductPath, getProductsByRange, searchCatalogueProducts } from "./catalogueData";

describe("catalogueData", () => {
  it("derives the existing 36 product records, category counts, and ranges from productCatalog", () => {
    expect(CATALOGUE_PRODUCTS).toHaveLength(36);
    expect(getCatalogueCounts()).toEqual({ products: 36, categories: 4, ranges: 5 });
  });

  it("supports exact SKU lookup and stable product detail paths", () => {
    const product = getProductBySku("BW-GD-001");
    expect(product?.name).toBe("Portable Single-Gas Detector");
    expect(product && getProductPath(product)).toBe("/products/gas-detection/portable-single-gas-detector");
    expect(getProductByPath("gas-detection", "portable-single-gas-detector")?.code).toBe("BW-GD-001");
  });

  it("searches and filters by product data, category, and range", () => {
    expect(searchCatalogueProducts("BW-WP-001").map((product) => product.code)).toEqual(["BW-WP-001"]);
    expect(filterCatalogueProducts({ category: "water-pumps", range: "water-pumps-domestic-pumps" })).toHaveLength(8);
    expect(getProductsByRange("water-pumps-domestic-pumps").every((product) => product.rangeTitle === "Domestic Pumps")).toBe(true);
  });
});
