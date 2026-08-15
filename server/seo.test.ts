import { describe, expect, it } from "vitest";
import { getSeoMeta, getSitemapPaths, getStructuredData, SEO_ORIGIN } from "../client/src/seo";

describe("Bridge Wax SEO metadata", () => {
  it("returns a canonical, indexable home-page metadata record", () => {
    const meta = getSeoMeta("/");
    expect(meta.canonicalPath).toBe("/");
    expect(meta.title).toContain("Bridge Wax");
    expect(meta.description).toContain("laboratory equipment");
    expect(meta.noindex).toBeUndefined();
  });

  it("derives unique catalogue metadata from the Water Pumps source data", () => {
    const meta = getSeoMeta("/products/water-pumps");
    expect(meta.title).toBe("Water Pumps | Bridge Wax Product Catalogue");
    expect(meta.canonicalPath).toBe("/products/water-pumps");
    expect(meta.description).toContain("dewatering");
    expect(meta.image).toBe("/images/products/new-authoritative/BW-WP-001.webp");
  });

  it("publishes indexable metadata and breadcrumbs for the Safety and PPE overview", () => {
    const meta = getSeoMeta("/products/safety-ppe");
    expect(meta.title).toContain("Safety & PPE");
    expect(meta.canonicalPath).toBe("/products/safety-ppe");
    const breadcrumb = getStructuredData(meta).find((item) => item["@type"] === "BreadcrumbList");
    expect(breadcrumb).toMatchObject({ itemListElement: expect.arrayContaining([expect.objectContaining({ position: 3, name: "Safety & PPE" })]) });
  });

  it("derives product-detail metadata and ordered breadcrumb structured data from the authoritative SKU", () => {
    const meta = getSeoMeta("/products/water-pumps/end-suction-centrifugal-pump");
    expect(meta.title).toContain("End-Suction Centrifugal Pump (BW-WP-001)");
    expect(meta.canonicalPath).toBe("/products/water-pumps/end-suction-centrifugal-pump");
    expect(meta.image).toBe("/images/products/new-authoritative/BW-WP-001.webp");
    const breadcrumb = getStructuredData(meta).find((item) => item["@type"] === "BreadcrumbList");
    expect(breadcrumb).toMatchObject({
      itemListElement: expect.arrayContaining([
        expect.objectContaining({ position: 1, name: "Home" }),
        expect.objectContaining({ position: 3, name: "Water Pumps" }),
        expect.objectContaining({ position: 4, name: "End-Suction Centrifugal Pump" }),
      ]),
    });
  });

  it("marks unknown paths as non-indexable and creates Organization structured data", () => {
    const meta = getSeoMeta("/not-a-real-route");
    expect(meta.notFound).toBe(true);
    expect(meta.noindex).toBe(true);
    const data = getStructuredData(getSeoMeta("/"));
    expect(data[0]).toMatchObject({ "@type": "Organization", url: SEO_ORIGIN, email: "info@bridgewax.com" });
  });

  it("publishes all primary catalogue areas in the sitemap inventory", () => {
    const paths = getSitemapPaths();
    expect(paths).toContain("/products/water-pumps");
    expect(paths).toContain("/products/water-pumps/end-suction-centrifugal-pump");
    expect(paths).toContain("/services/hdpe");
    expect(paths).toContain("/laboratory/mining");
    expect(paths).toContain("/contact");
    expect(paths.filter((path) => path.startsWith("/products/")).length).toBe(41);
  });
});
