/* Service catalogue detail page: service scope cards with service codes and clean reference imagery. */
import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";
import { CatalogueBackToTop } from "../components/CatalogueBackToTop";
import { AddToQuoteButton } from "../components/QuoteCart";
import { SERVICE_CATALOGUES } from "../lib/serviceCatalog";

export default function ServiceCategory() {
  const [, params] = useRoute("/services/:service");
  const catalogue = params?.service ? SERVICE_CATALOGUES[params.service] : undefined;

  if (!catalogue) {
    return <PageShell><section className="section section-white"><div className="content-wrap empty-catalogue"><span className="eyebrow">Service Catalogue</span><h1>Service not found</h1><p>Return to the Products &amp; Solutions page to choose an available service.</p><Link href="/products" className="button button-dark"><ArrowLeft size={16} /> Back to Products</Link></div></section></PageShell>;
  }

  return <PageShell>
    <PageHero eyebrow={catalogue.eyebrow} title={catalogue.title} subtitle={catalogue.summary} image={catalogue.image} />
    <section className="section section-white">
      <div className="content-wrap">
        <div className="catalogue-topbar">
          <Link href="/products" className="catalogue-back"><ArrowLeft size={15} /> Back to Products &amp; Solutions</Link>
          <span className="catalogue-count">{catalogue.offers.length} service scopes</span>
        </div>
        <div className="catalogue-overview"><div><span>Catalogue type</span><strong>Service scope</strong></div><div><span>Scopes shown</span><strong>{catalogue.offers.length} services</strong></div><div><span>Enquiry route</span><strong>Service-specific</strong></div></div>
        <div className="catalogue-notice">Contact us to confirm current service scope, scheduling, and availability.</div>
        <div className="catalogue-grid">
          {catalogue.offers.map((offer) => <article className="catalogue-card" key={offer.code}>
            <div className="catalogue-card-media"><img src={offer.image} alt={`${offer.name} reference image`} loading="eager" decoding="sync" /></div>
            <div className="catalogue-card-body"><span className="catalogue-code">{offer.code}</span><h2>{offer.name}</h2><p>{offer.description}</p><AddToQuoteButton product={{ ...offer, categorySlug: catalogue.slug, categoryTitle: catalogue.title, rangeTitle: "Service scope" }} /></div>
          </article>)}
        </div>
      </div>
    </section>
    <CatalogueBackToTop />
  </PageShell>;
}
