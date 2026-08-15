import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuoteCartProvider } from "../contexts/QuoteCartContext";
import SafetyPpe from "./SafetyPpe";

vi.mock("../components/PageShell", () => ({ PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("../components/CatalogueBackToTop", () => ({ CatalogueBackToTop: () => null }));

describe("SafetyPpe", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => cleanup());

  it("renders the supplied PPE taxonomy and filters product families without affecting existing catalogues", async () => {
    const user = userEvent.setup();
    render(<QuoteCartProvider><SafetyPpe /></QuoteCartProvider>);

    expect(screen.getByRole("heading", { name: "Protection planned for the work ahead." })).toBeTruthy();
    expect(screen.getByAltText("Reflective industrial workwear featured for Bridge Wax Safety and PPE").getAttribute("src")).toContain("/manus-storage/ppe-workwear-hi-vis-navy-orange_");
    expect(screen.getByText("70", { selector: ".ppe-hero-stats b" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Workwear" })).toBeTruthy();
    expect(screen.getByText("Premium Workwear")).toBeTruthy();
    expect(screen.getByAltText("Reflective long-sleeve industrial work shirt").getAttribute("src")).toContain("/manus-storage/ppe-workwear-hi-vis-navy-orange_");
    expect(screen.getByText("Safety Boots")).toBeTruthy();
    expect(screen.getByAltText("Industrial safety boot").getAttribute("src")).toContain("/manus-storage/ppe-safety-footwear-boot_");
    expect(screen.getByAltText("Protective industrial work glove").getAttribute("src")).toContain("/manus-storage/ppe-hand-protection-glove_");
    expect(screen.getByAltText("Orange industrial safety helmet").getAttribute("src")).toContain("/manus-storage/ppe-head-protection-helmet_");
    expect(screen.getByAltText("Full-body industrial fall protection harness").getAttribute("src")).toContain("/manus-storage/ppe-fall-protection-harness_");
    expect(screen.getByAltText("Yellow chemical protective coverall").getAttribute("src")).toContain("/manus-storage/ppe-chemical-protection-suit_");
    const addWorkwear = screen.getByRole("button", { name: "Add Workwear selection to cart" });
    await user.click(addWorkwear);
    expect(screen.getByRole("button", { name: "Workwear selection is in the cart" })).toBeTruthy();

    await user.type(screen.getByLabelText("Search Safety and PPE product families"), "fall");
    expect(screen.getByRole("heading", { name: "Fall Protection" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Workwear" })).toBeNull();
    expect(screen.getByText((_, element) => Boolean(element?.classList.contains("catalogue-result-count") && element.textContent?.includes("6 of 70 product families shown")))).toBeTruthy();
  });
});
