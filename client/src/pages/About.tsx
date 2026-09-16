/* Reference-matched about page: the supplied Bridge Wax story. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

export default function About() {
  return <PageShell>
    <PageHero eyebrow="About Bridge Wax" title="Your Trusted Partner in Scientific & Industrial Solutions" subtitle="A leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa." image="/manus-storage/lab-analytical-room_14145300.webp" />
    <section className="section section-white"><div className="content-wrap split-layout"><div className="image-frame image-frame-square"><img src="/manus-storage/lab-medical-equipment_acf3aa81.webp" alt="Clean medical laboratory equipment on a laboratory bench" loading="lazy" decoding="async" /></div><div className="copy-block"><span className="eyebrow">Who We Are</span><h2>We Exceed Our Vision</h2><p className="lead-copy">Bridge Wax is a leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa. The company supplies laboratory equipment, mining laboratory systems, analytical instruments and industrial technologies to customers throughout Southern Africa. Through global partnerships and technical expertise, Bridge Wax delivers dependable products supported by responsive customer service and after-sales support.</p><Link href="/contact" className="button button-dark">Talk to Our Team <ArrowRight size={16} /></Link></div></div></section>
  </PageShell>;
}
