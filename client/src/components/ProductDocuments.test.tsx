import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { CATALOGUE_PRODUCTS } from "../lib/catalogueData";
import { ProductDocuments } from "./ProductDocuments";

const product = CATALOGUE_PRODUCTS.find((item) => item.code === "BW-WP-001");

if (!product) throw new Error("Expected authoritative water-pump SKU for documentation test");

describe("ProductDocuments", () => {
  afterEach(() => cleanup());

  it("offers a precise documentation request when no verified manufacturer file is registered", () => {
    render(<ProductDocuments product={product} />);

    expect(screen.getByRole("heading", { name: "Manufacturer specifications & documents" })).toBeTruthy();
    expect(screen.getByText("Verified files are available on request")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Request Documentation" }).getAttribute("href")).toContain("request=manufacturer%20documentation");
  });

  it("renders a registered manufacturer document with preview and download controls", () => {
    render(<ProductDocuments product={product} documents={[{ title: "End-Suction Centrifugal Pump Datasheet", type: "Specification sheet", href: "/manus-storage/verified-end-suction-datasheet.pdf", fileFormat: "PDF", size: "1.2 MB", updated: "August 2026" }]} />);

    const download = screen.getByRole("link", { name: /Download End-Suction Centrifugal Pump Datasheet/i });
    expect(download.getAttribute("href")).toBe("/manus-storage/verified-end-suction-datasheet.pdf");
    expect(download.hasAttribute("download")).toBe(true);
    expect(screen.getByText("PDF · 1.2 MB · Updated August 2026")).toBeTruthy();
  });

  it("opens a PDF preview modal and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<ProductDocuments product={product} documents={[{ title: "End-Suction Centrifugal Pump Datasheet", type: "Specification sheet", href: "/manus-storage/verified-end-suction-datasheet.pdf", fileFormat: "PDF" }]} />);

    await user.click(screen.getByRole("button", { name: /Preview End-Suction Centrifugal Pump Datasheet/i }));
    expect(screen.getByRole("dialog", { name: "End-Suction Centrifugal Pump Datasheet" })).toBeTruthy();
    expect(screen.getByTitle("Preview of End-Suction Centrifugal Pump Datasheet").getAttribute("src")).toBe("/manus-storage/verified-end-suction-datasheet.pdf");
    expect(screen.getByRole("link", { name: /Download Document/i }).getAttribute("href")).toBe("/manus-storage/verified-end-suction-datasheet.pdf");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("explains how to access non-PDF manufacturer documents from the preview modal", async () => {
    const user = userEvent.setup();
    render(<ProductDocuments product={product} documents={[{ title: "End-Suction Centrifugal Pump Technical Table", type: "Technical drawing", href: "/manus-storage/verified-end-suction-table.xlsx", fileFormat: "XLSX" }]} />);

    await user.click(screen.getByRole("button", { name: /Preview End-Suction Centrifugal Pump Technical Table/i }));
    expect(screen.getByText("In-page preview is not supported for XLSX files.")).toBeTruthy();
    expect(screen.queryByTitle(/Preview of End-Suction Centrifugal Pump Technical Table/i)).toBeNull();
    expect(screen.getByRole("link", { name: /Download Document/i }).getAttribute("href")).toBe("/manus-storage/verified-end-suction-table.xlsx");
  });
});
