import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CatalogueBackToTop } from "./CatalogueBackToTop";

describe("CatalogueBackToTop", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("appears after a visitor has scrolled and smoothly returns the catalogue to the top", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 700 });

    render(<CatalogueBackToTop />);
    fireEvent.scroll(window);

    const button = await screen.findByRole("button", { name: "Back to top of catalogue" });
    await user.click(button);

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" }));
  });
});
