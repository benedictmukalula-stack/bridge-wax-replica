/* Reference-matched about page: the supplied Bridge Wax story. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "../components/PageShell";

export default function About() {
  return <PageShell>
    <section className="section section-white"><div className="content-wrap split-layout"><div className="image-frame image-frame-square"><img src="/manus-storage/lab-medical-equipment_acf3aa81.webp" alt="Clean medical laboratory equipment on a laboratory bench" loading="lazy" decoding="async" /></div><div className="copy-block"><span className="eyebrow">Who We Are</span><h2>Scientific Solutions With Purpose</h2><p className="lead-copy">Bridge Wax supplies laboratory equipment, mining laboratory systems, analytical instruments and industrial technologies for demanding operations across Southern Africa. Our focus is simple: connect teams with dependable equipment and practical solutions that support better work in laboratories, mines and industrial environments.</p><Link href="/contact" className="button button-dark">Talk to Our Team <ArrowRight size={16} /></Link></div></div></section>
  </PageShell>;
}
