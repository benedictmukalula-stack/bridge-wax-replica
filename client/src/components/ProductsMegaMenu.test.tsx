import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { MobileProductsNavigation, ProductsMegaMenu } from "./ProductsMegaMenu";

describe("ProductsMegaMenu", () => {
  afterEach(() => cleanup());

  it("opens a six-area navigation, supports area arrow navigation, exposes Safety & PPE, and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<ProductsMegaMenu active />);

    await user.click(screen.getByRole("button", { name: /Products & Solutions/i }));
    expect(screen.getByRole("dialog", { name: "Products and Solutions menu" })).toBeTruthy();
    expect(screen.getByText("Product areas")).toBeTruthy();

    const laboratory = screen.getByText("Laboratory Equipment", { selector: ".products-mega-category > span" }).closest("button");
    if (!laboratory) throw new Error("Laboratory Equipment button was not rendered");
    laboratory.focus();
    fireEvent.keyDown(laboratory, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toContain("Industrial Equipment");

    fireEvent.mouseEnter(screen.getByText("Safety & PPE", { selector: ".products-mega-category > span" }).closest("button")!);
    expect(screen.getByText("Safety & PPE categories")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Workwear/i }).getAttribute("href")).toBe("/products/safety-ppe#workwear");
    expect(screen.getByRole("link", { name: /Browse Safety & PPE/i })).toBeTruthy();

    fireEvent.keyDown(screen.getByRole("dialog", { name: "Products and Solutions menu" }), { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Products and Solutions menu" })).toBeNull();
  });

  it("exposes Safety & PPE categories directly in the mobile accordion", async () => {
    const user = userEvent.setup();
    render(<MobileProductsNavigation active={false} />);

    await user.click(screen.getByRole("button", { name: /Products & Solutions/i }));
    expect(screen.getByRole("link", { name: /Browse all products/i })).toBeTruthy();
    await user.click(screen.getByText("Safety & PPE", { selector: "summary span" }));
    expect(screen.getByText("Fall Protection")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Explore Safety & PPE/i })).toBeTruthy();
  });
});
