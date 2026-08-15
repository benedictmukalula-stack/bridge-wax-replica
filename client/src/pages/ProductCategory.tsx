import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { CatalogueBackToTop } from "../components/CatalogueBackToTop";
import { CatalogueProductCard } from "../components/CatalogueProductCard";
import { PageHero, PageShell } from "../components/PageShell";
import { filterCatalogueProducts, getCatalogueCategory } from "../lib/catalogueData";

export default function ProductCategory() {
  const [, params] = useRoute("/products/:category");
  const category = params?.category ? getCatalogueCategory(params.category) : undefined;
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("");
  const products = useMemo(() => category ? filterCatalogueProducts({ query, category: category.slug, range }) : [], [category, query, range]);

  useEffect(() => {
    if (!category || !window.location.hash) return;
    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" }));
    return () => window.cancelAnimationFrame(frame);
  }, [category]);

  if (!category) {
    return <PageShell><section className="section section-white"><div className="content-wrap empty-catalogue"><span className="eyebrow">Catalogue</span><h1>Category not found</h1><p>Return to the Products page to choose an available category.</p><Link href="/products" className="button button-dark"><ArrowLeft size={16} /> Back to Products</Link></div></section></PageShell>;
  }

  const resetFilters = () => {
    setQuery("");
    setRange("");
  };

  return <PageShell>
    <PageHero eyebrow={category.eyebrow} title={category.title} subtitle={category.summary} image={category.image} />
    <section className="section section-white"><div className="content-wrap">
      <nav className="catalogue-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><strong>{category.title}</strong></nav>
      <div className="catalogue-topbar"><Link href="/products" className="catalogue-back"><ArrowLeft size={15} /> All Products</Link><span className="catalogue-count">{products.length} of {category.productCount} products shown</span></div>
      <div className="category-range-bar" aria-label={`${category.title} product ranges`}>{category.ranges.map((item) => <button type="button" key={item.slug} className={range === item.slug ? "is-active" : ""} onClick={() => setRange((current) => current === item.slug ? "" : item.slug)}><span>{item.title}</span><small>{item.productCount}</small></button>)}</div>
      <div className="catalogue-filter-panel category-filter-panel"><div className="catalogue-search-field"><Search size={19} aria-hidden="true" /><label className="sr-only" htmlFor="category-product-search">Search {category.title}</label><input id="category-product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${category.title} by product name or SKU`} /><button type="button" className="catalogue-search-clear" onClick={() => setQuery("")} aria-label="Clear category search" hidden={!query}><X size={16} /></button></div><div className="catalogue-selects category-selects"><label><span>Product range / type</span><select value={range} onChange={(event) => setRange(event.target.value)}><option value="">All ranges</option>{category.ranges.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></label><button type="button" className="catalogue-clear-filters" disabled={!query && !range} onClick={resetFilters}><SlidersHorizontal size={15} /> Clear Filters</button></div></div>
      <div className="catalogue-product-grid">{products.map((product, index) => <CatalogueProductCard product={product} eager={index < 3} key={product.code} />)}</div>
      {products.length === 0 && <div className="catalogue-empty-results"><h2>No matching products found.</h2><p>Try another product name, SKU, or product range.</p><button type="button" className="button button-dark" onClick={resetFilters}>Clear filters</button></div>}
    </div></section>
    <CatalogueBackToTop />
  </PageShell>;
}
