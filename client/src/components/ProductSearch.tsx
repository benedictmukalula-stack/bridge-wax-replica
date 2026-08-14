// Bridge Wax design reminder: keep the search utility calm, editorial, and
// catalogue-led with ink, cream, and gold rather than generic dashboard styling.
import { Search, X } from "lucide-react";
import React, { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, useLocation } from "wouter";
import { PRODUCT_SEARCH_INDEX, getSearchResultIndex, listAllProducts, searchProductCategories, searchProducts, type ProductCategorySearchResult, type ProductSearchResult, type SearchNavigationKey } from "../lib/productSearch";

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
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suppressNextInputFocusRef = useRef(false);
  const resultsId = useId();
  const [, navigate] = useLocation();
  const resultLimit = variant === "section" ? 8 : 6;
  const productResults = useMemo<ProductSearchResult[]>(() => mode === "all" && !query.trim() ? listAllProducts(resultLimit) : searchProducts(query, resultLimit), [mode, query, resultLimit]);
  const categoryResults = useMemo<ProductCategorySearchResult[]>(() => searchProductCategories(query, variant === "section" ? 6 : 4), [query, variant]);
  const hasQuery = query.trim().length > 0;
  const compact = variant !== "section";
  const showResults = isFocused || hasQuery || mode === "all";
  const hasProductResults = (hasQuery || mode === "all") && productResults.length > 0;
  const resultCount = mode === "categories" ? categoryResults.length : hasProductResults ? productResults.length : 0;
  const activeResultId = activeResultIndex >= 0 ? `${resultsId}-result-${activeResultIndex}` : undefined;

  const clearSearch = () => {
    setQuery("");
    setMode("products");
    setActiveResultIndex(-1);
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const exitSearch = () => {
    setQuery("");
    setMode("products");
    setActiveResultIndex(-1);
    setIsFocused(false);
    suppressNextInputFocusRef.current = true;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      requestAnimationFrame(() => { suppressNextInputFocusRef.current = false; });
    });
  };

  const selectMode = (nextMode: SearchMode) => {
    setMode(nextMode);
    setActiveResultIndex(-1);
    setIsFocused(true);
  };

  const completeResultSelection = () => {
    setQuery("");
    setMode("products");
    setActiveResultIndex(-1);
    setIsFocused(false);
  };

  const activateResult = (index: number) => {
    if (index < 0 || index >= resultCount) return;
    if (mode === "categories") {
      const category = categoryResults[index];
      if (!category) return;
      completeResultSelection();
      navigate(`/products/${category.slug}`);
      return;
    }

    const product = productResults[index];
    if (!product) return;
    completeResultSelection();
    navigate(`/products/${product.categorySlug}#${product.code}`);
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      exitSearch();
      return;
    }

    if (event.key === "Enter" && activeResultIndex >= 0) {
      event.preventDefault();
      activateResult(activeResultIndex);
      return;
    }

    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) && resultCount > 0) {
      event.preventDefault();
      setActiveResultIndex((currentIndex) => getSearchResultIndex(currentIndex, resultCount, event.key as SearchNavigationKey));
    }
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
            ref={inputRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActiveResultIndex(-1); }}
            onFocus={() => { if (!suppressNextInputFocusRef.current) setIsFocused(true); }}
            onKeyDown={onSearchKeyDown}
            className="product-search-input"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showResults}
            aria-controls={resultsId}
            aria-activedescendant={activeResultId}
            aria-label={`Search ${mode === "categories" ? "product categories" : mode === "all" ? "all catalogue products" : "products"}`}
            placeholder={mode === "categories" ? "Search categories…" : mode === "all" ? "Browse or filter all products…" : compact ? "Search products…" : "Search products, codes, or applications"}
            autoComplete="off"
          />
          {hasQuery && <button type="button" className="product-search-clear" onClick={clearSearch} aria-label="Clear product search"><X size={18} /></button>}
        </div>
        {showResults && <div id={resultsId} className="product-search-results" aria-live="polite" aria-label="Product search results">
          <div className="product-search-results-toolbar">
            <div className="product-search-mode-list" role="group" aria-label="Search mode">
              {SEARCH_MODES.map((searchMode) => <button key={searchMode.id} type="button" className={mode === searchMode.id ? "product-search-mode is-active" : "product-search-mode"} onClick={() => selectMode(searchMode.id)} aria-pressed={mode === searchMode.id}>{searchMode.label}</button>)}
            </div>
            <button type="button" className="product-search-exit" onClick={exitSearch} aria-label="Exit product search">Exit</button>
          </div>
          {mode === "categories" ? <>
            <p className="product-search-results-heading">{hasQuery ? `Category matches for “${query}”` : "Browse product categories"}</p>
            {categoryResults.length > 0 ? <div className="product-search-result-list" role="listbox" aria-label="Category results">{categoryResults.map((category, index) => (
              <Link id={`${resultsId}-result-${index}`} key={category.slug} href={`/products/${category.slug}`} className={activeResultIndex === index ? "product-search-result is-active" : "product-search-result"} role="option" aria-selected={activeResultIndex === index} onClick={completeResultSelection}>
                <span className="product-search-result-copy"><strong>{category.title}</strong><small>{category.productCount} products · {category.description}</small></span>
                <span className="product-search-result-arrow" aria-hidden="true">→</span>
              </Link>
            ))}</div> : <p className="product-search-empty">No product categories match “{query}”. Try terms such as pumps, gas, ultrasonic, or machinery.</p>}
          </> : <>
            <p className="product-search-results-heading">{mode === "all" ? hasQuery ? `All product matches for “${query}”` : `Browse all ${PRODUCT_SEARCH_INDEX.length} products` : hasQuery ? `Product matches for “${query}”` : "Start typing to search products"}</p>
            {(hasQuery || mode === "all") && (hasProductResults ? <div className="product-search-result-list" role="listbox" aria-label="Product results">{productResults.map((product, index) => (
              <Link id={`${resultsId}-result-${index}`} key={`${product.categorySlug}-${product.code}`} href={`/products/${product.categorySlug}#${product.code}`} className={activeResultIndex === index ? "product-search-result is-active" : "product-search-result"} role="option" aria-selected={activeResultIndex === index} onClick={completeResultSelection}>
                <span className="product-search-result-thumbnail" aria-hidden="true"><img src={product.image} alt="" loading="eager" decoding="async" /></span>
                <span className="product-search-result-copy"><strong>{product.name}</strong><small>{product.code} · {product.rangeTitle ? `${product.rangeTitle} · ` : ""}{product.categoryTitle}</small></span>
                <span className="product-search-result-arrow" aria-hidden="true">→</span>
              </Link>
            ))}</div> : <p className="product-search-empty">No catalogue products match “{query}”. Try a product name, code, or broader category term.</p>)}
            {mode === "all" && <Link href="/products" className="product-search-browse-all" onClick={completeResultSelection}>View all {PRODUCT_SEARCH_INDEX.length} products and categories <span aria-hidden="true">→</span></Link>}
            {productResults.length === resultLimit && <p className="product-search-limit">Showing the first {resultLimit} of {PRODUCT_SEARCH_INDEX.length} catalogue products.</p>}
          </>}
        </div>}
      </div>
    </div>
  );
}
