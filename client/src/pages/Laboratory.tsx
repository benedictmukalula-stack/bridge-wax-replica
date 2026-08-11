/* Reference-matched laboratory page: mining, medical, water-analysis, and research solution cards. */
import { ArrowRight, Droplets, HardHat, Microscope, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const LABS = [
  { icon: HardHat, title: "Mining Laboratory", text: "Sample preparation equipment, crushers, pulverisers, assay consumables and analytical instruments.", image: "/manus-storage/hero-slide-8_331008c8.webp" },
  { icon: Stethoscope, title: "Medical Laboratory", text: "Diagnostic analysers, microscopes, centrifuges, reagents and clinical consumables.", image: "/manus-storage/cat-medical-lab_a76379b2.webp" },
  { icon: Droplets, title: "Water Analysis", text: "Meters, photometers, test kits and reagents for potable, process and effluent water testing.", image: "/manus-storage/cat-water-analysis_dd1b4205.webp" },
  { icon: Microscope, title: "Research & Education", text: "General laboratory equipment, glassware, safety products and teaching apparatus.", image: "/manus-storage/hero-slide-6_6478a9b2.webp" },
];

export default function Laboratory() {
  return <PageShell><PageHero eyebrow="Laboratory" title="Laboratory Equipment for Mining, Medical and Water Analysis" subtitle="Mining, medical, water analysis and research laboratory supplies, backed by after-sales service and expert engineering support." image="/manus-storage/hero-slide-3_b13f47f0.webp" /><section className="section section-white"><div className="content-wrap"><div className="card-grid card-grid-2">{LABS.map(({ icon: Icon, title, text, image }) => <article className="large-image-card" key={title}><div className="large-image-media"><img src={image} alt={title} loading="lazy" decoding="async" /></div><div className="large-image-copy"><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="center-action"><Link href="/products" className="button button-dark">Browse Product Categories <ArrowRight size={16} /></Link></div></div></section></PageShell>;
}
