import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProductSearch from "./ProductSearch";

describe("ProductSearch keyboard interactions", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("moves through results with Arrow keys, Home and End, then opens the active product with Enter", async () => {
    const user = userEvent.setup();
    render(<ProductSearch variant="header" />);
    const input = screen.getByRole("combobox", { name: "Search products" });

    await user.type(input, "centrifugal");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input.getAttribute("aria-activedescendant")).toMatch(/-result-0$/);
    expect(screen.getByRole("option", { name: /End-Suction Centrifugal Pump/i }).getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(input, { key: "End" });
    expect(screen.getByRole("option", { name: /Domestic Centrifugal Pump/i }).getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(input, { key: "Home" });
    fireEvent.keyDown(input, { key: "Enter" });
    await waitFor(() => expect(`${window.location.pathname}${window.location.hash}`).toBe("/products/water-pumps#BW-WP-001"));
  });

  it("closes on Escape and the visible Exit control while preserving focus on the search input", async () => {
    const user = userEvent.setup();
    render(<ProductSearch variant="mobile" />);
    const input = screen.getByRole("combobox", { name: "Search products" });

    await user.type(input, "pumps");
    fireEvent.keyDown(input, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    expect(input).toBe(document.activeElement);

    await user.type(input, "pumps");
    await user.click(screen.getByRole("button", { name: "Exit product search" }));
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    expect(input).toBe(document.activeElement);
    expect((input as HTMLInputElement).value).toBe("");
  });
});
