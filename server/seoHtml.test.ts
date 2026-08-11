import { describe, expect, it } from "vitest";
import { render } from "../client/src/entry-server";
import { composeHtml } from "./_core/vite";

const template = "<html><head><!--app-head--></head><body><div id=\"root\"><!--app-html--></div></body></html>";

describe("server-rendered Bridge Wax SEO document", () => {
  it("injects crawlable home content and complete SEO head tags", async () => {
    const { html, meta } = await render("/");
    const document = composeHtml(template, html, meta);
    expect(document).toContain("<title>Laboratory Equipment &amp; Industrial Solutions in Zambia | Bridge Wax</title>");
    expect(document).toContain('rel="canonical" data-seo="canonical" href="https://bridgewax-gxhf7erv.manus.space/"');
    expect(document).toContain('property="og:title"');
    expect(document).toContain('name="twitter:card"');
    expect(document).toContain('type="application/ld+json"');
    expect(document).toContain("Laboratory Equipment &amp; Industrial Solutions for Africa");
  });

  it("produces a route-specific product catalogue document and a noindex 404 document", async () => {
    const product = await render("/products/water-pumps");
    const productDocument = composeHtml(template, product.html, product.meta);
    expect(productDocument).toContain("<title>Water Pumps | Bridge Wax Product Catalogue</title>");
    expect(productDocument).toContain('href="https://bridgewax-gxhf7erv.manus.space/products/water-pumps"');
    expect(productDocument).toContain("Pump and flow-control equipment for water transfer");

    const missing = await render("/does-not-exist");
    const missingDocument = composeHtml(template, missing.html, missing.meta);
    expect(missing.meta.notFound).toBe(true);
    expect(missingDocument).toContain('name="robots" data-seo="robots" content="noindex, follow"');
  });
});
