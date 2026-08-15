import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { MobileProductsNavigation, ProductsMegaMenu } from "./ProductsMegaMenu";

describe("ProductsMegaMenu", () => {
  afterEach(() => cleanup());

  it("opens a three-column catalogue navigation, supports category arrow navigation, and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<ProductsMegaMenu active />);

    const trigger = screen.getByRole("button", { name: /Products & Solutions/i });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Products and Solutions menu" })).toBeTruthy();
    expect(screen.getByText("Featured equipment")).toBeTruthy();
    expect(screen.getAllByText("7 products").length).toBeGreaterThan(0);

    const ultrasonic = screen.getByText("Ultrasonic Equipment", { selector: ".products-mega-category > span" }).closest("button");
    if (!ultrasonic) throw new Error("Ultrasonic category button was not rendered");
    ultrasonic.focus();
    fireEvent.keyDown(ultrasonic, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toContain("Gas Detection");

    fireEvent.keyDown(screen.getByRole("dialog", { name: "Products and Solutions menu" }), { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Products and Solutions menu" })).toBeNull();
  });

  it("exposes the same product categories and ranges in the mobile accordion", async () => {
    const user = userEvent.setup();
    render(<MobileProductsNavigation active={false} />);

    await user.click(screen.getByRole("button", { name: /Products & Solutions/i }));
    expect(screen.getByRole("link", { name: /Browse all products/i })).toBeTruthy();
    await user.click(screen.getByText("Water Pumps", { selector: "summary span" }));
    expect(screen.getByText("Domestic Pumps")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Request a Quote/i })).toBeTruthy();
  });
});
