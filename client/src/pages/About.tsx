/* Reference-matched about page: the supplied Bridge Wax story, values, and office locations. */
import { ArrowRight, Building2, Globe2, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const VALUES = [
  { icon: ShieldCheck, title: "Quality First", text: "Dependable products sourced from established global manufacturers and partners." },
  { icon: Users, title: "Customer Service", text: "Responsive customer service backed by practical after-sales support." },
  { icon: Globe2, title: "Regional Reach", text: "Serving customers throughout Zambia, South Africa and Southern Africa." },
  { icon: Building2, title: "Technical Expertise", text: "Engineering knowledge applied to laboratory, mining and industrial applications." },
];

export default function About() {
  return <PageShell>
    <PageHero eyebrow="About Bridge Wax" title="Your Trusted Partner in Scientific & Industrial Solutions" subtitle="A leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa." image="/images/hero/hero-slide-1.jpg" />
    <section className="section section-white"><div className="content-wrap split-layout"><div className="image-frame image-frame-square"><img src="/images/cat-medical-lab.jpg" alt="Clean medical laboratory equipment on a laboratory bench" loading="lazy" decoding="async" /></div><div className="copy-block"><span className="eyebrow">Who We Are</span><h2>We Exceed Our Vision</h2><p className="lead-copy">Bridge Wax is a leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa. The company supplies laboratory equipment, mining laboratory systems, analytical instruments and industrial technologies to customers throughout Southern Africa. Through global partnerships and technical expertise, Bridge Wax delivers dependable products supported by responsive customer service and after-sales support.</p><Link href="/contact" className="button button-dark">Talk to Our Team <ArrowRight size={16} /></Link></div></div></section>
    <section className="section section-muted"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">How We Work</span><h2>What Sets Us Apart</h2></div><div className="card-grid card-grid-4">{VALUES.map(({ icon: Icon, title, text }) => <div className="info-card" key={title}><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
    <section className="section section-white"><div className="content-wrap office-grid"><div className="office-card"><h3>Head Office — Lusaka, Zambia</h3><p>Stand No. LUS/5180/5181, Chishango Road, Lusaka, Zambia</p></div><div className="office-card"><h3>Branch Office — Johannesburg, South Africa</h3><p>Regional support for customers across South Africa and Southern Africa.</p></div></div></section>
  </PageShell>;
}
