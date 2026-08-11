// Bridge Wax design reminder: preserve the editorial Playfair/Inter hierarchy,
// restrained ink-and-gold palette, and practical catalogue-first interaction.
import { PRODUCT_CATALOGUES } from "./productCatalog";

export type ProductSearchResult = {
  code: string;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
  categoryTitle: string;
  rangeTitle?: string;
};

export type ProductCategorySearchResult = {
  slug: string;
  title: string;
  description: string;
  productCount: number;
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

export const PRODUCT_CATEGORY_SEARCH_INDEX: ProductCategorySearchResult[] = Object.entries(PRODUCT_CATALOGUES).map(([slug, catalogue]) => ({
  slug,
  title: catalogue.title,
  description: catalogue.summary,
  productCount: catalogue.products.length + (catalogue.subsections?.reduce((count, section) => count + section.products.length, 0) ?? 0),
}));

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

export function searchProductCategories(query: string, limit = 6) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingCategories = !normalizedQuery
    ? PRODUCT_CATEGORY_SEARCH_INDEX
    : PRODUCT_CATEGORY_SEARCH_INDEX.filter((category) => `${category.title} ${category.description}`.toLocaleLowerCase().includes(normalizedQuery));

  return matchingCategories.slice(0, limit);
}

export function listAllProducts(limit = PRODUCT_SEARCH_INDEX.length) {
  return PRODUCT_SEARCH_INDEX.slice(0, limit);
}
