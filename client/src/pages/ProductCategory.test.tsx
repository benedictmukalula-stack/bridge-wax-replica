import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuoteCartProvider } from "../contexts/QuoteCartContext";
import ProductCategory from "./ProductCategory";

vi.mock("../components/PageShell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
  PageHero: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock("../components/CatalogueBackToTop", () => ({
  CatalogueBackToTop: () => null,
}));

function expectCategoryCount(count: number) {
  expect(screen.getByText((_, element) => Boolean(element?.classList.contains("catalogue-count") && element.textContent?.trim() === `${count} of 15 products shown`))).toBeTruthy();
}

describe("ProductCategory", () => {
  beforeEach(() => window.history.replaceState({}, "", "/products/water-pumps"));
  afterEach(() => cleanup());

  it("renders breadcrumbs and filters Water Pumps down to the domestic pump range", async () => {
    const user = userEvent.setup();
    render(<QuoteCartProvider><ProductCategory /></QuoteCartProvider>);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Water Pumps" })).toBeTruthy();
    expectCategoryCount(15);

    await user.selectOptions(screen.getByLabelText("Product range / type"), "water-pumps-domestic-pumps");
    expectCategoryCount(8);
    expect(screen.getByRole("link", { name: "Domestic Borehole Pump" }).getAttribute("href")).toBe("/products/water-pumps/domestic-borehole-pump");
  });
});
