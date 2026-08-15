import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuoteCartProvider } from "../contexts/QuoteCartContext";
import ProductDetail from "./ProductDetail";

vi.mock("../components/PageShell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));

describe("ProductDetail", () => {
  beforeEach(() => window.history.replaceState({}, "", "/products/water-pumps/end-suction-centrifugal-pump"));
  afterEach(() => cleanup());

  it("renders the authoritative product, structured details, breadcrumbs, and quotation actions", () => {
    render(<QuoteCartProvider><ProductDetail /></QuoteCartProvider>);

    expect(screen.getByRole("heading", { name: "End-Suction Centrifugal Pump" })).toBeTruthy();
    expect(screen.getAllByText("BW-WP-001").length).toBeGreaterThan(0);
    expect(screen.getByText((_, element) => Boolean(element?.classList.contains("product-detail-category") && element.textContent?.trim() === "Water Pumps · Water Pumps"))).toBeTruthy();
    expect(screen.getByRole("link", { name: "Water Pumps" }).getAttribute("href")).toBe("/products/water-pumps");
    expect(screen.getByRole("button", { name: "Add End-Suction Centrifugal Pump to cart" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Request a Quote/i }).getAttribute("href")).toContain("/contact?product=");
  });
});
