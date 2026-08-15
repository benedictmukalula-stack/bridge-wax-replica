import { PRODUCT_CATALOGUES, type CatalogueProduct } from "./productCatalog";

export type CatalogueRange = {
  slug: string;
  title: string;
  summary: string;
  categorySlug: string;
  categoryTitle: string;
  productCount: number;
};

export type CatalogueCategory = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  eyebrow: string;
  productCount: number;
  ranges: CatalogueRange[];
};

export type CatalogueProductRecord = CatalogueProduct & {
  categorySlug: string;
  categoryTitle: string;
  categorySummary: string;
  rangeSlug: string;
  rangeTitle: string;
  productSlug: string;
};

function toSlug(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function primaryRange(categorySlug: string, categoryTitle: string, summary: string, products: CatalogueProduct[]): CatalogueRange {
  return { slug: categorySlug, title: categoryTitle, summary, categorySlug, categoryTitle, productCount: products.length };
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = Object.values(PRODUCT_CATALOGUES).map((catalogue) => {
  const ranges = [
    primaryRange(catalogue.slug, catalogue.title, catalogue.summary, catalogue.products),
    ...(catalogue.subsections?.map((section) => ({
      slug: `${catalogue.slug}-${toSlug(section.title)}`,
      title: section.title,
      summary: section.summary,
      categorySlug: catalogue.slug,
      categoryTitle: catalogue.title,
      productCount: section.products.length,
    })) ?? []),
  ];

  return {
    slug: catalogue.slug,
    title: catalogue.title,
    summary: catalogue.summary,
    image: catalogue.image,
    eyebrow: catalogue.eyebrow,
    productCount: ranges.reduce((total, range) => total + range.productCount, 0),
    ranges,
  };
});

export const CATALOGUE_PRODUCTS: CatalogueProductRecord[] = Object.values(PRODUCT_CATALOGUES).flatMap((catalogue) => [
  ...catalogue.products.map((product) => ({
    ...product,
    categorySlug: catalogue.slug,
    categoryTitle: catalogue.title,
    categorySummary: catalogue.summary,
    rangeSlug: catalogue.slug,
    rangeTitle: catalogue.title,
    productSlug: toSlug(product.name),
  })),
  ...(catalogue.subsections?.flatMap((section) => section.products.map((product) => ({
    ...product,
    categorySlug: catalogue.slug,
    categoryTitle: catalogue.title,
    categorySummary: catalogue.summary,
    rangeSlug: `${catalogue.slug}-${toSlug(section.title)}`,
    rangeTitle: section.title,
    productSlug: toSlug(product.name),
  }))) ?? []),
]);

export function getCatalogueCategories() {
  return CATALOGUE_CATEGORIES;
}

export function getCatalogueCategory(categorySlug: string) {
  return CATALOGUE_CATEGORIES.find((category) => category.slug === categorySlug);
}

export function getCatalogueRanges(categorySlug?: string) {
  return categorySlug
    ? getCatalogueCategory(categorySlug)?.ranges ?? []
    : CATALOGUE_CATEGORIES.flatMap((category) => category.ranges);
}

export function getProductsByCategory(categorySlug: string) {
  return CATALOGUE_PRODUCTS.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsByRange(rangeSlug: string) {
  return CATALOGUE_PRODUCTS.filter((product) => product.rangeSlug === rangeSlug);
}

export function getProductBySku(code: string) {
  return CATALOGUE_PRODUCTS.find((product) => product.code.toLocaleLowerCase() === code.toLocaleLowerCase());
}

export function getProductByPath(categorySlug: string, productSlug: string) {
  return CATALOGUE_PRODUCTS.find((product) => product.categorySlug === categorySlug && product.productSlug === productSlug);
}

export function getProductPath(product: Pick<CatalogueProductRecord, "categorySlug" | "productSlug">) {
  return `/products/${product.categorySlug}/${product.productSlug}`;
}

export function searchCatalogueProducts(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return CATALOGUE_PRODUCTS;

  return CATALOGUE_PRODUCTS.filter((product) => [product.name, product.code, product.description, product.categoryTitle, product.rangeTitle]
    .join(" ")
    .toLocaleLowerCase()
    .includes(normalizedQuery));
}

export function filterCatalogueProducts({ query = "", category = "", range = "" }: { query?: string; category?: string; range?: string }) {
  return searchCatalogueProducts(query).filter((product) => (!category || product.categorySlug === category) && (!range || product.rangeSlug === range));
}

export function getCatalogueCounts() {
  return {
    products: CATALOGUE_PRODUCTS.length,
    categories: CATALOGUE_CATEGORIES.length,
    ranges: getCatalogueRanges().length,
  };
}

export function getFeaturedProducts(limit = 4) {
  return CATALOGUE_CATEGORIES.flatMap((category) => getProductsByCategory(category.slug).slice(0, 1)).slice(0, limit);
}
