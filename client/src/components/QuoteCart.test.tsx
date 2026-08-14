import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { Router } from "wouter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuoteCart from "./QuoteCart";
import { QuoteCartProvider, useQuoteCart } from "../contexts/QuoteCartContext";

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
});
