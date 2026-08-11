// Bridge Wax design reminder: preserve the editorial Playfair/Inter hierarchy,
// restrained ink-and-gold palette, and practical catalogue-first interaction.
import { PRODUCT_CATALOGUES } from "./productCatalog";

export type ProductSearchResult = {
  code: string;
  name: string;
  description: string;
  categorySlug: string;
  categoryTitle: string;
  rangeTitle?: string;
};

export const PRODUCT_SEARCH_INDEX: ProductSearchResult[] = Object.entries(PRODUCT_CATALOGUES).flatMap(([categorySlug, catalogue]) => [
  ...catalogue.products.map((product) => ({
    ...product,
    categorySlug,
    categoryTitle: catalogue.title,
  })),
  ...(catalogue.subsections?.flatMap((section) => section.products.map((product) => ({
    ...product,
    categorySlug,
    categoryTitle: catalogue.title,
    rangeTitle: section.title,
  }))) ?? []),
]);

export function searchProducts(query: string, limit = 8) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [];

  return PRODUCT_SEARCH_INDEX.filter((product) => [product.name, product.code, product.description, product.categoryTitle, product.rangeTitle]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase()
    .includes(normalizedQuery))
    .slice(0, limit);
}
