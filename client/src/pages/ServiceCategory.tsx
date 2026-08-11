/* Indicative service catalogue detail page: service scope cards with provisional service codes and clean reference imagery. */
import { ArrowLeft, Mail } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";
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
          <span className="catalogue-count">{catalogue.offers.length} indicative service scopes</span>
        </div>
        <div className="catalogue-overview"><div><span>Catalogue type</span><strong>Indicative service scope</strong></div><div><span>Scopes shown</span><strong>{catalogue.offers.length} services</strong></div><div><span>Enquiry route</span><strong>Service-specific</strong></div></div>
        <div className="catalogue-notice"><strong>Indicative service catalogue.</strong> Service codes and descriptions are provisional working entries for layout review and should be replaced with the official Bridge Wax service schedule before publication.</div>
        <div className="catalogue-grid">
          {catalogue.offers.map((offer) => <article className="catalogue-card" key={offer.code}>
            <div className="catalogue-card-media"><img src={offer.image} alt={`${offer.name} reference image`} loading="lazy" decoding="async" /></div>
            <div className="catalogue-card-body"><span className="catalogue-code">{offer.code}</span><h2>{offer.name}</h2><p>{offer.description}</p><Link href={`/contact?service=${encodeURIComponent(offer.name)}`} className="catalogue-enquire">Enquire about this service <Mail size={15} /></Link></div>
          </article>)}
        </div>
      </div>
    </section>
  </PageShell>;
}
