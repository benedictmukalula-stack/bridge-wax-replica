/* Laboratory catalogue detail page: seven image-backed entries with codes and descriptions. */
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";
import { LAB_CATALOGUES } from "../lib/labCatalog";

export default function LabCategory() {
  const [, params] = useRoute("/laboratory/:category");
  const catalogue = params?.category ? LAB_CATALOGUES[params.category] : undefined;

  if (!catalogue) {
    return <PageShell><section className="section section-white"><div className="content-wrap empty-catalogue"><span className="eyebrow">Laboratory Catalogue</span><h1>Category not found</h1><p>Return to the Laboratory page to choose an available section.</p><Link href="/laboratory" className="button button-dark"><ArrowLeft size={16} /> Back to Laboratory</Link></div></section></PageShell>;
  }

  return <PageShell>
    <PageHero eyebrow={catalogue.eyebrow} title={catalogue.title} subtitle={catalogue.summary} image={catalogue.image} />
    <section className="section section-white"><div className="content-wrap">
      <div className="catalogue-topbar"><Link href="/laboratory" className="catalogue-back"><ArrowLeft size={15} /> Back to Laboratory</Link><span className="catalogue-count">{catalogue.products.length} products</span></div>
      <div className="catalogue-overview"><div><span>Catalogue type</span><strong>Laboratory range</strong></div><div><span>Entries shown</span><strong>{catalogue.products.length} products</strong></div><div><span>Enquiry route</span><strong>Product-specific</strong></div></div>
      <div className="catalogue-notice">Contact us to confirm current specifications, lead times, and availability for each laboratory product.</div>
      <div className="catalogue-grid">{catalogue.products.map((product) => <article className="catalogue-card" key={product.code}><div className="catalogue-card-media"><img src={product.image} alt={`${product.name} reference image`} loading="lazy" decoding="async" /></div><div className="catalogue-card-body"><span className="catalogue-code">{product.code}</span><h2>{product.name}</h2><p>{product.description}</p><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="catalogue-enquire">Enquire about this product <Mail size={15} /></Link></div></article>)}</div>
    </div></section>
  </PageShell>;
}
