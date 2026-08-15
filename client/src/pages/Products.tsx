import { ArrowRight, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { CatalogueBackToTop } from "../components/CatalogueBackToTop";
import { CatalogueProductCard } from "../components/CatalogueProductCard";
import { PageShell } from "../components/PageShell";
import { filterCatalogueProducts, getCatalogueCategories, getCatalogueCounts, getCatalogueRanges, getFeaturedProducts } from "../lib/catalogueData";

const SOLUTION_GROUPS = [
  { title: "Laboratory Solutions", href: "/laboratory", text: "Explore Bridge Wax laboratory equipment and consumables for mining, medical, water analysis, and research workflows." },
  { title: "Industrial Safety", href: "/products/gas-detection", text: "Portable and fixed-point gas detection equipment for safer field, plant, and confined-space operations." },
  { title: "Water & Pumping", href: "/products/water-pumps", text: "Industrial and domestic pumping equipment for water, process, dewatering, and site applications." },
  { title: "Gas Detection", href: "/products/gas-detection", text: "Find monitored-atmosphere equipment, calibration support, and detector-readiness tools by product range." },
  { title: "Power & Backup", href: "/products/general-machinery", text: "General machinery including diesel generator sets for standby and site-power continuity requirements." },
  { title: "Technical Equipment", href: "/products/ultrasonic", text: "Ultrasonic inspection equipment for thickness measurement, calibration, and non-destructive technical workflows." },
];

export default function Products() {
  const categories = getCatalogueCategories();
  const counts = getCatalogueCounts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [range, setRange] = useState("");
  const availableRanges = getCatalogueRanges(category || undefined);
  const products = useMemo(() => filterCatalogueProducts({ query, category, range }), [query, category, range]);
  const hasFilters = Boolean(query || category || range);

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setRange("");
  };

  return <PageShell>
    <section className="products-hero">
      <img src="/manus-storage/products-hero_dbc3417d.webp" alt="Bridge Wax laboratory and industrial equipment" loading="eager" fetchPriority="high" decoding="async" />
      <div className="products-hero-overlay" />
      <div className="content-wrap products-hero-copy"><span className="eyebrow">Products &amp; Solutions</span><h1>Equipment selected for work that cannot stop.</h1><p>Explore professional industrial equipment by application, range, or precise product code. Build a quotation basket when you are ready to discuss your requirements.</p><div className="button-row"><a href="#catalogue" className="button button-gold">Explore Products <ArrowRight size={16} /></a><Link href="/contact" className="button button-outline-light">Request a Quote</Link></div><div className="products-hero-stats" aria-label="Catalogue summary"><span><b>{counts.products}</b> Products</span><span><b>{counts.categories}</b> Categories</span><span><b>{counts.ranges}</b> Ranges</span></div></div>
    </section>

    <section className="section section-white product-explorer-section"><div className="content-wrap"><div className="section-heading products-category-heading"><span className="eyebrow">Structured for procurement</span><h2>Browse the catalogue your way.</h2><p>Every category, range, count, product name, code, description, and product image is derived from the live Bridge Wax product catalogue.</p></div><div className="catalogue-category-explorer">{categories.map((item) => <article className="catalogue-category-card" key={item.slug}><div className="catalogue-category-image"><img src={item.image} alt={item.title} loading="lazy" decoding="async" /></div><div className="catalogue-category-copy"><span className="catalogue-category-count">{item.productCount} products</span><h3>{item.title}</h3><p>{item.summary}</p><div className="catalogue-category-ranges">{item.ranges.map((itemRange) => <span key={itemRange.slug}>{itemRange.title}</span>)}</div><Link href={`/products/${item.slug}`} className="catalogue-product-view">Explore Category <ArrowRight size={15} /></Link></div></article>)}</div></div></section>

    <section className="section section-muted" id="catalogue"><div className="content-wrap"><div className="catalogue-discovery-heading"><div><span className="eyebrow">Find the right equipment</span><h2>Search and filter all products.</h2><p>Search by product name, SKU, category, or range; then add the products you need to your quotation basket.</p></div><p className="catalogue-result-count" aria-live="polite"><strong>{products.length}</strong> of {counts.products} products shown</p></div><div className="catalogue-filter-panel"><div className="catalogue-search-field"><Search size={19} aria-hidden="true" /><label className="sr-only" htmlFor="catalogue-search">Search the Bridge Wax catalogue</label><input id="catalogue-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product name, SKU, category or range" /><button type="button" className="catalogue-search-clear" onClick={() => setQuery("")} aria-label="Clear catalogue search" hidden={!query}><X size={16} /></button></div><div className="catalogue-selects"><label><span>Category</span><select value={category} onChange={(event) => { setCategory(event.target.value); setRange(""); }}><option value="">All categories</option>{categories.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></label><label><span>Range / type</span><select value={range} onChange={(event) => setRange(event.target.value)}><option value="">All ranges</option>{availableRanges.map((item) => <option value={item.slug} key={item.slug}>{item.categoryTitle !== category ? `${item.categoryTitle} — ` : ""}{item.title}</option>)}</select></label><button type="button" className="catalogue-clear-filters" disabled={!hasFilters} onClick={resetFilters}><SlidersHorizontal size={15} /> Clear Filters</button></div></div><div className="catalogue-product-grid">{products.map((product, index) => <CatalogueProductCard product={product} eager={index < 3} key={product.code} />)}</div>{products.length === 0 && <div className="catalogue-empty-results"><h3>No matching products found.</h3><p>Try another name, SKU, category, or product range.</p><button type="button" className="button button-dark" onClick={resetFilters}>Clear filters</button></div>}</div></section>

    <section className="section section-white"><div className="content-wrap"><div className="catalogue-section-intro"><div><span className="eyebrow">Selected equipment</span><h2>Featured product lines.</h2></div><a href="#catalogue" className="catalogue-product-view">View every product <ChevronRight size={15} /></a></div><div className="catalogue-product-grid catalogue-product-grid-featured">{getFeaturedProducts().map((product, index) => <CatalogueProductCard product={product} eager={index === 0} key={product.code} />)}</div></div></section>

    <section className="section section-dark"><div className="content-wrap"><div className="section-heading solution-heading"><span className="eyebrow">Solutions by application</span><h2>Start with the work in front of you.</h2><p>Explore supported applications through the relevant product category, then refine the list by range or SKU.</p></div><div className="catalogue-solution-grid">{SOLUTION_GROUPS.map((solution) => <Link href={solution.href} className="catalogue-solution-card" key={solution.title}><span>Solution area</span><h3>{solution.title}</h3><p>{solution.text}</p><strong>Explore products <ArrowRight size={15} /></strong></Link>)}</div></div></section>

    <section className="section section-white catalogue-quote-cta"><div className="content-wrap"><div><span className="eyebrow">Quotation support</span><h2>Need help selecting the right equipment?</h2><p>Add products to your basket, tell us about your operating conditions, and request a considered quotation from Bridge Wax.</p></div><div className="button-row"><a href="#catalogue" className="button button-dark">Build a product list</a><Link href="/contact" className="button button-gold">Request a Quote <ArrowRight size={16} /></Link></div></div></section>
    <CatalogueBackToTop />
  </PageShell>;
}
