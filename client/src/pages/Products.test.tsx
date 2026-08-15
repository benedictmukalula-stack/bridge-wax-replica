import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteCartProvider } from "../contexts/QuoteCartContext";
import Products from "./Products";

vi.mock("../components/PageShell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));

vi.mock("../components/CatalogueBackToTop", () => ({
  CatalogueBackToTop: () => null,
}));

function expectResultCount(count: number) {
  expect(screen.getByText((_, element) => Boolean(element?.classList.contains("catalogue-result-count") && element.textContent?.trim() === `${count} of 36 products shown`))).toBeTruthy();
}

describe("Products catalogue discovery", () => {
  afterEach(() => cleanup());

  it("renders all derived catalogue products and filters them by SKU, category, and range", async () => {
    const user = userEvent.setup();
    render(<QuoteCartProvider><Products /></QuoteCartProvider>);

    expectResultCount(36);
    expect(screen.getAllByRole("link", { name: /View Product/i })).toHaveLength(40);

    const search = screen.getByRole("textbox", { name: "Search the Bridge Wax catalogue" });
    await user.type(search, "BW-GD-001");
    expectResultCount(1);

    await user.clear(search);
    const categorySelect = screen.getByLabelText("Category");
    await user.selectOptions(categorySelect, "water-pumps");
    expectResultCount(15);

    const rangeSelect = screen.getByLabelText("Range / type");
    await user.selectOptions(rangeSelect, "water-pumps-domestic-pumps");
    expectResultCount(8);
  });
});
