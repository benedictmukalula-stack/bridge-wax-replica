/* Reference-matched laboratory page: mining, medical, water-analysis, and research solution cards. */
import { ArrowRight, Droplets, HardHat, Microscope, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const LABS = [
  { slug: "mining", icon: HardHat, title: "Mining Laboratory Equipment", text: "Sample preparation equipment, crushers, pulverisers, assay consumables and analytical instruments.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "medical", icon: Stethoscope, title: "Medical Laboratory", text: "Diagnostic analysers, microscopes, centrifuges, reagents and clinical consumables.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "water", icon: Droplets, title: "Water Analysis", text: "Meters, photometers, test kits and reagents for potable, process and effluent water testing.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "analytical", icon: Microscope, title: "Analytical Equipment", text: "Chromatography systems, ICP instruments, balances and sample preparation stations.", image: "/images/hero/laboratory-equipment.jpg" },
];

export default function Laboratory() {
  return <PageShell><PageHero eyebrow="Laboratory" title="Laboratory Equipment for Mining, Medical and Water Analysis" subtitle="Mining, medical, water analysis and research laboratory supplies, backed by after-sales service and expert engineering support." image="/images/hero/laboratory.jpg" /><section className="section section-white"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Four laboratory catalogues</span><h2>Explore Laboratory Sections</h2><p>Open a section to review its product range, codes, descriptions, and individual product imagery.</p></div><div className="card-grid card-grid-2">{LABS.map(({ slug, icon: Icon, title, text, image }) => <Link href={`/laboratory/${slug}`} className="large-image-card" key={title}><div className="large-image-media"><img src={image} alt={title} loading="lazy" decoding="async" /></div><div className="large-image-copy"><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p><span className="catalogue-link-label">View catalogue <ArrowRight size={15} /></span></div></Link>)}</div><div className="center-action"><Link href="/products" className="button button-dark">Browse Product Categories <ArrowRight size={16} /></Link></div></div></section></PageShell>;
}
