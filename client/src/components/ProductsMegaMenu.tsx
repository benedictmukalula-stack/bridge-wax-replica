import { ArrowRight, ChevronDown, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { getCatalogueCategories, getCatalogueRanges, getFeaturedProducts } from "../lib/catalogueData";

function rangePath(categorySlug: string) {
  return `/products/${categorySlug}`;
}

export function ProductsMegaMenu({ active }: { active: boolean }) {
  const categories = getCatalogueCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug ?? "");
  const categoryButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCategory = categories.find((category) => category.slug === activeCategorySlug) ?? categories[0];
  const activeRanges = getCatalogueRanges(activeCategory?.slug);
  const featuredProducts = getFeaturedProducts(3);

  const close = () => setIsOpen(false);
  const moveCategoryFocus = (currentIndex: number, direction: 1 | -1) => {
    const nextIndex = (currentIndex + direction + categories.length) % categories.length;
    setActiveCategorySlug(categories[nextIndex].slug);
    categoryButtons.current[nextIndex]?.focus();
  };

  return <div className="desktop-products-menu" onMouseEnter={() => setIsOpen(true)} onMouseLeave={close} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <button type="button" className={active ? "nav-link nav-products-trigger active" : "nav-link nav-products-trigger"} onClick={() => setIsOpen(true)} onFocus={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="products-mega-menu">Products &amp; Solutions <ChevronDown size={14} aria-hidden="true" /></button>
    {isOpen && <div id="products-mega-menu" className="products-mega-panel" role="dialog" aria-label="Products and Solutions menu" onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }}>
      <section className="products-mega-column products-mega-categories" aria-labelledby="products-mega-categories-title"><span id="products-mega-categories-title" className="products-mega-label">Categories</span>{categories.map((category, index) => <button type="button" className={category.slug === activeCategory?.slug ? "products-mega-category is-active" : "products-mega-category"} key={category.slug} ref={(element) => { categoryButtons.current[index] = element; }} onMouseEnter={() => setActiveCategorySlug(category.slug)} onFocus={() => setActiveCategorySlug(category.slug)} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); moveCategoryFocus(index, 1); } if (event.key === "ArrowUp") { event.preventDefault(); moveCategoryFocus(index, -1); } }}><span>{category.title}</span><small>{category.productCount} products</small><ChevronRight size={15} aria-hidden="true" /></button>)}</section>
      <section className="products-mega-column products-mega-ranges" aria-labelledby="products-mega-ranges-title"><div><span id="products-mega-ranges-title" className="products-mega-label">Product ranges</span><h2>{activeCategory?.title}</h2><p>{activeCategory?.summary}</p></div><div className="products-mega-range-list">{activeRanges.map((range) => <Link href={rangePath(range.categorySlug)} key={range.slug} onClick={close}><span>{range.title}</span><small>{range.productCount} products</small><ArrowRight size={14} aria-hidden="true" /></Link>)}</div><Link href={`/products/${activeCategory?.slug ?? ""}`} className="products-mega-category-link" onClick={close}>Explore {activeCategory?.title} <ArrowRight size={14} /></Link></section>
      <section className="products-mega-column products-mega-featured" aria-labelledby="products-mega-featured-title"><span id="products-mega-featured-title" className="products-mega-label">Featured equipment</span>{featuredProducts.map((product) => <Link href={`/products/${product.categorySlug}/${product.productSlug}`} key={product.code} className="products-mega-featured-item" onClick={close}><img src={product.image} alt="" loading="lazy" decoding="async" /><span><small>{product.code}</small><strong>{product.name}</strong></span></Link>)}<div className="products-mega-actions"><Link href="/products" className="button button-dark button-small" onClick={close}>Browse All Products</Link><Link href="/contact" className="products-mega-quote-link" onClick={close}>Request a Quote <ArrowRight size={14} /></Link></div></section>
    </div>}
  </div>;
}

export function MobileProductsNavigation({ active }: { active: boolean }) {
  const categories = getCatalogueCategories();
  const [isOpen, setIsOpen] = useState(false);

  return <div className="mobile-products-menu"><button type="button" className={active ? "mobile-nav-link mobile-products-trigger active" : "mobile-nav-link mobile-products-trigger"} onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-controls="mobile-products-menu">Products &amp; Solutions <ChevronDown size={16} className={isOpen ? "is-open" : ""} aria-hidden="true" /></button>{isOpen && <div id="mobile-products-menu" className="mobile-products-accordion"><Link href="/products" className="mobile-products-all">Browse all products <ArrowRight size={14} /></Link>{categories.map((category) => <details key={category.slug}><summary><span>{category.title}</span><small>{category.productCount} products</small><ChevronRight size={15} aria-hidden="true" /></summary><div>{getCatalogueRanges(category.slug).map((range) => <Link href={rangePath(range.categorySlug)} key={range.slug}><span>{range.title}</span><small>{range.productCount}</small></Link>)}<Link href={`/products/${category.slug}`} className="mobile-products-category-link">Explore category <ArrowRight size={14} /></Link></div></details>)}<Link href="/contact" className="mobile-products-quote">Request a Quote <ArrowRight size={14} /></Link></div>}</div>;
}
