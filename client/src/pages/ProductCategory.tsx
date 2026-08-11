/* Product catalogue detail page: category-specific product list with codes and clean reference imagery. */
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";
import { PRODUCT_CATALOGUES } from "../lib/productCatalog";

export default function ProductCategory() {
  const [, params] = useRoute("/products/:category");
  const catalogue = params?.category ? PRODUCT_CATALOGUES[params.category] : undefined;

  if (!catalogue) {
    return <PageShell><section className="section section-white"><div className="content-wrap empty-catalogue"><span className="eyebrow">Catalogue</span><h1>Category not found</h1><p>Return to the Products page to choose an available category.</p><Link href="/products" className="button button-dark"><ArrowLeft size={16} /> Back to Products</Link></div></section></PageShell>;
  }

  const additionalProducts = catalogue.subsections?.flatMap((section) => section.products) ?? [];
  const totalProducts = catalogue.products.length + additionalProducts.length;

  return <PageShell>
    <PageHero eyebrow={catalogue.eyebrow} title={catalogue.title} subtitle={catalogue.summary} image={catalogue.image} />
    <section className="section section-white">
      <div className="content-wrap">
        <div className="catalogue-topbar">
          <Link href="/products" className="catalogue-back"><ArrowLeft size={15} /> Back to Products</Link>
          <span className="catalogue-count">{totalProducts} products</span>
        </div>
        <div className="catalogue-overview"><div><span>Catalogue type</span><strong>Product range</strong></div><div><span>Entries shown</span><strong>{totalProducts} products</strong></div><div><span>Enquiry route</span><strong>Product-specific</strong></div></div>
        <div className="catalogue-notice">Contact us to confirm current specifications, lead times, and availability for each product.</div>
        <div className="catalogue-section"><div className="catalogue-section-heading"><span className="eyebrow">Primary range</span><h2>{catalogue.title}</h2></div><div className="catalogue-grid">
          {catalogue.products.map((product) => <article className="catalogue-card" key={product.code}>
            <div className="catalogue-card-media"><img src={product.image} alt={`${product.name} reference image`} loading="eager" decoding="sync" /></div>
            <div className="catalogue-card-body"><span className="catalogue-code">{product.code}</span><h2>{product.name}</h2><p>{product.description}</p><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="catalogue-enquire">Enquire about this product <Mail size={15} /></Link></div>
          </article>)}
        </div></div>
        {catalogue.subsections?.map((section) => <div className="catalogue-section" key={section.title}><div className="catalogue-section-heading"><span className="eyebrow">Expanded range</span><h2>{section.title}</h2><p>{section.summary}</p></div><div className="catalogue-grid">
          {section.products.map((product) => <article className="catalogue-card" key={product.code}>
            <div className="catalogue-card-media"><img src={product.image} alt={`${product.name} reference image`} loading="eager" decoding="sync" /></div>
            <div className="catalogue-card-body"><span className="catalogue-code">{product.code}</span><h2>{product.name}</h2><p>{product.description}</p><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="catalogue-enquire">Enquire about this product <Mail size={15} /></Link></div>
          </article>)}
        </div></div>)}
      </div>
    </section>
  </PageShell>;
}
