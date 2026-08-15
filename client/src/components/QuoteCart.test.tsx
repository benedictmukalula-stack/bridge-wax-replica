import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { Router } from "wouter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuoteCart from "./QuoteCart";
import { QuoteCartProvider, useQuoteCart } from "../contexts/QuoteCartContext";

const downloadQuoteCartPdf = vi.hoisted(() => vi.fn());

vi.mock("../lib/quotePdf", () => ({ downloadQuoteCartPdf }));

vi.mock("../lib/trpc", () => ({
  trpc: {
    quoteRequest: {
      send: {
        useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }),
      },
    },
  },
}));

function OpenEmptyCart() {
  const { openCart } = useQuoteCart();
  useEffect(() => {
    openCart();
    // Open once for the test; re-running after close would invalidate the asserted drawer state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <QuoteCart />;
}

function AddPpeSelectionImmediately() {
  const { addItem, items } = useQuoteCart();
  useEffect(() => {
    addItem({ code: "PPE-CATEGORY-WORKWEAR", name: "Workwear selection", categorySlug: "safety-ppe", categoryTitle: "Safety & PPE", rangeTitle: "Workwear · 9 families" });
    // This deliberately represents a user selecting a card during the initial restore window.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span>{items.map((item) => item.name).join(",")}</span>;
}

function AddProductAndOpenCart() {
  const { addItem, openCart } = useQuoteCart();
  useEffect(() => {
    addItem({ code: "LAB-MIN-001", name: "Bench-top analytical balance", categorySlug: "laboratory-mining", categoryTitle: "Mining Laboratory", rangeTitle: "Analytical instruments" });
    openCart();
    // Open once for the test; re-running after close would invalidate the asserted drawer state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <QuoteCart />;
}

describe("QuoteCart empty state", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("closes the drawer and routes to Products & Solutions when Continue browsing is activated", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <QuoteCartProvider>
          <OpenEmptyCart />
        </QuoteCartProvider>
      </Router>,
    );

    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Continue browsing" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(window.location.pathname).toBe("/products");
  });

  it("preserves an immediate PPE catalogue selection while stored cart state is restored", async () => {
    render(<QuoteCartProvider><AddPpeSelectionImmediately /></QuoteCartProvider>);

    await waitFor(() => expect(screen.getByText("Workwear selection")).toBeTruthy());
  });

  it("offers a PDF summary download without changing the quotation form flow", async () => {
    const user = userEvent.setup();
    downloadQuoteCartPdf.mockResolvedValue(undefined);
    render(<QuoteCartProvider><AddProductAndOpenCart /></QuoteCartProvider>);

    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Download PDF summary" }));

    await waitFor(() => expect(downloadQuoteCartPdf).toHaveBeenCalledWith(expect.objectContaining({
      items: expect.arrayContaining([expect.objectContaining({ code: "LAB-MIN-001" })]),
    })));
    expect(screen.getByRole("button", { name: "Send quotation request" })).toBeTruthy();
  });
});
