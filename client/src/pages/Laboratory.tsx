/* Reference-matched laboratory page: mining, medical, water-analysis, and research solution cards. */
import { ArrowRight, Droplets, HardHat, Microscope, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const LABS = [
  { icon: HardHat, title: "Mining Laboratory Equipment", text: "Sample preparation equipment, crushers, pulverisers, assay consumables and analytical instruments.", image: "/manus-storage/mining-laboratory-equipment-no-people_3d310196.png" },
  { icon: Stethoscope, title: "Medical Laboratory", text: "Diagnostic analysers, microscopes, centrifuges, reagents and clinical consumables.", image: "/manus-storage/medical-laboratory-no-people_d3b8525c.png" },
  { icon: Droplets, title: "Water Analysis", text: "Meters, photometers, test kits and reagents for potable, process and effluent water testing.", image: "/manus-storage/water-analysis_9ab5677e.webp" },
  { icon: Microscope, title: "Analytical Equipment", text: "Chromatography systems, ICP instruments, balances and sample preparation stations.", image: "/manus-storage/analytical-equipment_e8c6c592.webp" },
];

export default function Laboratory() {
  return <PageShell><PageHero eyebrow="Laboratory" title="Laboratory Equipment for Mining, Medical and Water Analysis" subtitle="Mining, medical, water analysis and research laboratory supplies, backed by after-sales service and expert engineering support." image="/manus-storage/laboratory-hero-no-people_36472255.png" /><section className="section section-white"><div className="content-wrap"><div className="card-grid card-grid-2">{LABS.map(({ icon: Icon, title, text, image }) => <article className="large-image-card" key={title}><div className="large-image-media"><img src={image} alt={title} loading="lazy" decoding="async" /></div><div className="large-image-copy"><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="center-action"><Link href="/products" className="button button-dark">Browse Product Categories <ArrowRight size={16} /></Link></div></div></section></PageShell>;
}
