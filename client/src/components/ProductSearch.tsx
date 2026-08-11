// Bridge Wax design reminder: keep the search utility calm, editorial, and
// catalogue-led with ink, cream, and gold rather than generic dashboard styling.
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PRODUCT_SEARCH_INDEX, listAllProducts, searchProductCategories, searchProducts, type ProductCategorySearchResult, type ProductSearchResult } from "../lib/productSearch";

type ProductSearchProps = { variant?: "section" | "header" | "mobile" };
type SearchMode = "products" | "categories" | "all";

const SEARCH_MODES: Array<{ id: SearchMode; label: string }> = [
  { id: "products", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "all", label: "All products" },
];

export default function ProductSearch({ variant = "section" }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("products");
  const [isFocused, setIsFocused] = useState(false);
  const resultLimit = variant === "section" ? 8 : 6;
  const productResults = useMemo<ProductSearchResult[]>(() => mode === "all" && !query.trim() ? listAllProducts(resultLimit) : searchProducts(query, resultLimit), [mode, query, resultLimit]);
  const categoryResults = useMemo<ProductCategorySearchResult[]>(() => searchProductCategories(query, variant === "section" ? 6 : 4), [query, variant]);
  const hasQuery = query.trim().length > 0;
  const compact = variant !== "section";
  const showResults = isFocused || hasQuery || mode === "all";
  const activeResults = mode === "categories" ? categoryResults : productResults;

  const clearSearch = () => {
    setQuery("");
    setMode("products");
  };

  const selectMode = (nextMode: SearchMode) => {
    setMode(nextMode);
    setIsFocused(true);
  };

  return (
    <div className={`product-search-shell product-search-${variant}`}>
      {!compact && <div className="product-search-copy">
        <span className="eyebrow">Find a product</span>
        <h2>Search our product catalogues</h2>
        <p>Search by product name, code, application, or category to reach the right catalogue entry quickly.</p>
      </div>}
      <div className="product-search-form">
        <div className="product-search-input-wrap">
          <Search size={20} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") clearSearch();
            }}
            className="product-search-input"
            type="search"
            aria-label={`Search ${mode === "categories" ? "product categories" : mode === "all" ? "all catalogue products" : "products"}`}
            placeholder={mode === "categories" ? "Search categories…" : mode === "all" ? "Browse or filter all products…" : compact ? "Search products…" : "Search products, codes, or applications"}
            autoComplete="off"
          />
          {hasQuery && <button type="button" className="product-search-clear" onClick={clearSearch} aria-label="Clear product search"><X size={18} /></button>}
        </div>
        {showResults && <div className="product-search-results" aria-live="polite" aria-label="Product search results" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false); }}>
          <div className="product-search-mode-list" role="group" aria-label="Search mode">
            {SEARCH_MODES.map((searchMode) => <button key={searchMode.id} type="button" className={mode === searchMode.id ? "product-search-mode is-active" : "product-search-mode"} onClick={() => selectMode(searchMode.id)} aria-pressed={mode === searchMode.id}>{searchMode.label}</button>)}
          </div>
          {mode === "categories" ? <>
            <p className="product-search-results-heading">{hasQuery ? `Category matches for “${query}”` : "Browse product categories"}</p>
            {categoryResults.length > 0 ? categoryResults.map((category) => (
              <Link key={category.slug} href={`/products/${category.slug}`} className="product-search-result" onClick={clearSearch}>
                <span className="product-search-result-copy"><strong>{category.title}</strong><small>{category.productCount} products · {category.description}</small></span>
                <span className="product-search-result-arrow" aria-hidden="true">→</span>
              </Link>
            )) : <p className="product-search-empty">No product categories match “{query}”. Try terms such as pumps, gas, ultrasonic, or machinery.</p>}
          </> : <>
            <p className="product-search-results-heading">{mode === "all" ? hasQuery ? `All product matches for “${query}”` : `Browse all ${PRODUCT_SEARCH_INDEX.length} products` : hasQuery ? `Product matches for “${query}”` : "Start typing to search products"}</p>
            {(hasQuery || mode === "all") && (activeResults.length > 0 ? productResults.map((product) => (
              <Link key={`${product.categorySlug}-${product.code}`} href={`/products/${product.categorySlug}#${product.code}`} className="product-search-result" onClick={clearSearch}>
                <span className="product-search-result-copy"><strong>{product.name}</strong><small>{product.code} · {product.rangeTitle ? `${product.rangeTitle} · ` : ""}{product.categoryTitle}</small></span>
                <span className="product-search-result-arrow" aria-hidden="true">→</span>
              </Link>
            )) : <p className="product-search-empty">No catalogue products match “{query}”. Try a product name, code, or broader category term.</p>)}
            {mode === "all" && <Link href="/products" className="product-search-browse-all" onClick={clearSearch}>View all {PRODUCT_SEARCH_INDEX.length} products and categories <span aria-hidden="true">→</span></Link>}
            {productResults.length === resultLimit && <p className="product-search-limit">Showing the first {resultLimit} of {PRODUCT_SEARCH_INDEX.length} catalogue products.</p>}
          </>}
        </div>}
      </div>
    </div>
  );
}
