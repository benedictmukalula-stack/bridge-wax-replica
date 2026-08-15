import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuoteCartProvider } from "../contexts/QuoteCartContext";
import LabCategory from "./LabCategory";
import ServiceCategory from "./ServiceCategory";

vi.mock("../components/PageShell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
  PageHero: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock("../components/CatalogueBackToTop", () => ({ CatalogueBackToTop: () => null }));

describe("catalogue cart integration", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => cleanup());

  it("adds a laboratory catalogue product to the shared cart", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/laboratory/mining");
    render(<QuoteCartProvider><LabCategory /></QuoteCartProvider>);

    await user.click(screen.getByRole("button", { name: "Add Laboratory Jaw Crusher to cart" }));
    expect(screen.getByRole("button", { name: "Laboratory Jaw Crusher is in the cart" })).toBeTruthy();
  });

  it("adds a service catalogue scope to the shared cart", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/services/pumps");
    render(<QuoteCartProvider><ServiceCategory /></QuoteCartProvider>);

    await user.click(screen.getByRole("button", { name: "Add Pump Selection Support to cart" }));
    expect(screen.getByRole("button", { name: "Pump Selection Support is in the cart" })).toBeTruthy();
  });
});
