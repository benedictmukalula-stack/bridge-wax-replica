import type { CatalogueProductRecord } from "./catalogueData";

export type ManufacturerDocument = {
  title: string;
  type: "Specification sheet" | "Operation manual" | "Compliance document" | "Technical drawing";
  href: string;
  fileFormat: "PDF" | "DOCX" | "XLSX";
  size?: string;
  updated?: string;
};

/**
 * Add only original or manufacturer-approved files to this SKU-keyed registry.
 * Host uploaded files through managed storage (for example, /manus-storage/...) rather than
 * inventing documents from catalogue copy or linking to an unverified third-party file.
 */
export const MANUFACTURER_DOCUMENTS: Readonly<Record<string, readonly ManufacturerDocument[]>> = {};

export function getManufacturerDocuments(product: Pick<CatalogueProductRecord, "code">) {
  return MANUFACTURER_DOCUMENTS[product.code] ?? [];
}
