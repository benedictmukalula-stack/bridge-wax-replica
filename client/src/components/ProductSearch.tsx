// Bridge Wax design reminder: keep the search utility calm, editorial, and
// catalogue-led with ink, cream, and gold rather than generic dashboard styling.
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PRODUCT_SEARCH_INDEX, searchProducts } from "../lib/productSearch";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query), [query]);
  const hasQuery = query.trim().length > 0;

  const clearSearch = () => setQuery("");

  return (
    <div className="product-search-shell">
      <div className="product-search-copy">
        <span className="eyebrow">Find a product</span>
        <h2>Search our product catalogues</h2>
        <p>Search by product name, code, application, or category to reach the right catalogue entry quickly.</p>
      </div>
      <div className="product-search-form">
        <div className="product-search-input-wrap">
          <Search size={20} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") clearSearch();
            }}
            className="product-search-input"
            type="search"
            aria-label="Search product catalogues"
            placeholder="Search products, codes, or applications"
            autoComplete="off"
          />
          {hasQuery && <button type="button" className="product-search-clear" onClick={clearSearch} aria-label="Clear product search"><X size={18} /></button>}
        </div>
        {hasQuery && <div className="product-search-results" aria-live="polite" aria-label="Product search results">
          {results.length > 0 ? results.map((product) => (
            <Link key={`${product.categorySlug}-${product.code}`} href={`/products/${product.categorySlug}#${product.code}`} className="product-search-result" onClick={clearSearch}>
              <span className="product-search-result-copy"><strong>{product.name}</strong><small>{product.code} · {product.rangeTitle ? `${product.rangeTitle} · ` : ""}{product.categoryTitle}</small></span>
              <span className="product-search-result-arrow" aria-hidden="true">→</span>
            </Link>
          )) : <p className="product-search-empty">No catalogue products match “{query}”. Try a product name, code, or broader category term.</p>}
          {results.length === 8 && <p className="product-search-limit">Showing the first 8 matches from {PRODUCT_SEARCH_INDEX.length} catalogue products.</p>}
        </div>}
      </div>
    </div>
  );
}
