import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CATALOGUE_CATEGORIES, CATALOGUE_PRODUCTS, getCatalogueCounts } from "../lib/catalogueData";
import { PPE_CATEGORY_GROUPS, PPE_PRODUCT_FAMILIES, PPE_VISUAL_ASSETS } from "../lib/ppeCatalogue";
import SafetyPpe from "./SafetyPpe";

vi.mock("../components/PageShell", () => ({ PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("../components/CatalogueBackToTop", () => ({ CatalogueBackToTop: () => null }));

describe("Safety & PPE authorised catalogue integration", () => {
  afterEach(() => cleanup());

  it("renders every category, managed visual, filter flow, and quotation request without changing the existing catalogue", async () => {
    const user = userEvent.setup();
    render(<SafetyPpe />);

    expect(PPE_CATEGORY_GROUPS).toHaveLength(12);
    expect(PPE_PRODUCT_FAMILIES).toHaveLength(70);
    expect(PPE_VISUAL_ASSETS).toHaveLength(10);
    expect(CATALOGUE_PRODUCTS).toHaveLength(36);
    expect(CATALOGUE_CATEGORIES).toHaveLength(4);
    expect(getCatalogueCounts()).toEqual({ products: 36, categories: 4, ranges: 5 });

    for (const group of PPE_CATEGORY_GROUPS) {
      const categoryCard = document.getElementById(group.slug);
      expect(categoryCard).toBeTruthy();
      expect(categoryCard?.textContent).toContain(group.title);
      expect(categoryCard?.textContent).toContain(`${group.families.length} families`);
      expect(screen.getByRole("link", { name: `Request ${group.title}` }).getAttribute("href")).toBe(`/contact?product=${encodeURIComponent(`Safety & PPE — ${group.title}`)}`);
    }

    for (const asset of PPE_VISUAL_ASSETS) {
      const image = screen.getByAltText(asset.alt);
      expect(image.getAttribute("src")).toBe(asset.image);
      const visualCard = image.closest(".ppe-visual-card");
      expect(visualCard?.textContent).toContain(asset.title);
      const quoteLink = visualCard?.querySelector('a[href^="/contact?product="]');
      expect(quoteLink?.getAttribute("href")).toBe(`/contact?product=${encodeURIComponent(`Safety & PPE — ${asset.title}`)}`);
    }

    const search = screen.getByLabelText("Search Safety and PPE product families");
    for (const group of PPE_CATEGORY_GROUPS) {
      await user.clear(search);
      await user.type(search, group.title);
      expect(document.getElementById(group.slug)).toBeTruthy();
      const normalizedQuery = group.title.toLowerCase();
      const expectedResultCount = PPE_CATEGORY_GROUPS
        .flatMap((candidate) => candidate.families.filter((family) => `${candidate.title} ${family.title}`.toLowerCase().includes(normalizedQuery)))
        .length;
      expect(document.querySelector(".catalogue-result-count")?.textContent).toContain(`${expectedResultCount} of ${PPE_PRODUCT_FAMILIES.length} product families shown`);
    }
  });
});
