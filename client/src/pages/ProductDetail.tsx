import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { CatalogueProductImage } from "../components/CatalogueProductCard";
import { PageShell } from "../components/PageShell";
import { AddToQuoteButton } from "../components/QuoteCart";
import { ProductDocuments } from "../components/ProductDocuments";
import { getProductByPath } from "../lib/catalogueData";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:category/:product");
  const product = params?.category && params?.product ? getProductByPath(params.category, params.product) : undefined;

  if (!product) {
    return <PageShell><section className="section section-white"><div className="content-wrap empty-catalogue"><span className="eyebrow">Product catalogue</span><h1>Product not found</h1><p>Return to the Products page to search the available Bridge Wax equipment ranges.</p><Link href="/products" className="button button-dark"><ArrowLeft size={16} /> Back to Products</Link></div></section></PageShell>;
  }

  const quoteProduct = { code: product.code, name: product.name, categorySlug: product.categorySlug, categoryTitle: product.categoryTitle, rangeTitle: product.rangeTitle };

  return <PageShell>
    <section className="section section-white product-detail-section"><div className="content-wrap">
      <nav className="catalogue-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><Link href={`/products/${product.categorySlug}`}>{product.categoryTitle}</Link><span>/</span><strong>{product.name}</strong></nav>
      <div className="product-detail-layout"><div className="product-detail-media"><CatalogueProductImage product={product} eager /></div><div className="product-detail-copy"><span className="catalogue-code">{product.code}</span><p className="product-detail-category">{product.categoryTitle} <span>·</span> {product.rangeTitle}</p><h1>{product.name}</h1><p className="product-detail-description">{product.description}</p><dl className="product-detail-facts"><div><dt>Product code</dt><dd>{product.code}</dd></div><div><dt>Category</dt><dd>{product.categoryTitle}</dd></div><div><dt>Range / type</dt><dd>{product.rangeTitle}</dd></div></dl><div className="product-detail-actions"><AddToQuoteButton product={quoteProduct} /><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="button button-gold">Request a Quote <ArrowRight size={16} /></Link></div><Link href={`/products/${product.categorySlug}`} className="catalogue-back product-detail-back"><ArrowLeft size={15} /> Back to {product.categoryTitle}</Link></div></div>
    </div></section>
    <section className="section section-muted product-detail-information"><div className="content-wrap"><ProductDocuments product={product} /><div className="product-detail-info-grid"><article><span className="eyebrow">Product information</span><h2>Specifications and availability</h2><p>Current technical specifications, lead times, and availability are confirmed on request so the equipment can be matched to your operating conditions.</p></article><article><span className="eyebrow">Applications</span><h2>Assess fit for your operation</h2><p>Use the product description with your technical requirements, then request a quotation for confirmation of configuration, compatibility, and application suitability.</p></article><article className="product-detail-support"><CheckCircle2 size={22} aria-hidden="true" /><div><h2>Need technical support?</h2><p>Include duty requirements, quantities, and any site conditions in your quotation request.</p><Link href={`/contact?product=${encodeURIComponent(product.name)}`}>Speak to Bridge Wax <ArrowRight size={14} /></Link></div></article></div></div></section>
  </PageShell>;
}
