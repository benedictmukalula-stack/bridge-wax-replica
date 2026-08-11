/* Reference-matched products page: featured equipment categories, technical services, and quotation CTA. */
import { ArrowRight, Cog, Factory, FlaskConical, Gauge, Pipette, Wrench } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const CATEGORIES = [
  { title: "Industrial Equipment", src: "/manus-storage/hero-slide-1_6378a909.webp", text: "Testing instruments, gauges, detectors and measurement solutions for industry." },
  { title: "Water Pumps", src: "/manus-storage/hero-slide-3_b13f47f0.webp", text: "Centrifugal, submersible and surface water pumps for mining, irrigation and process reticulation." },
  { title: "General Machinery", src: "/manus-storage/hero-slide-5_94e66062.webp", text: "Generators, compressors, motors and general-purpose machinery for plant and workshop operations." },
];

const SERVICES = [
  { icon: FlaskConical, title: "Laboratory Equipment & Consumables", text: "Instruments, glassware, reagents and consumables for mining, medical, water and research laboratories." },
  { icon: Gauge, title: "Industrial Testing Instruments", text: "Testing instruments, gauges, detectors and measurement solutions for plant and field use." },
  { icon: Cog, title: "Plant Maintenance & Spares", text: "Maintenance support and genuine spares to keep production and processing plants running." },
  { icon: Wrench, title: "Fabrication & Repairs", text: "Workshop fabrication, refurbishment and repair of industrial components and assemblies." },
  { icon: Pipette, title: "HDPE Pipe Systems", text: "HDPE piping, fittings and jointing solutions for water, slurry and process reticulation." },
  { icon: Factory, title: "Pumps & Valves", text: "Pumps, valves and flow-control equipment selected for mining and industrial duty." },
];

export default function Products() {
  return <PageShell><PageHero eyebrow="Products & Solutions" title="Equipment, Spares and Technical Solutions" subtitle="Explore our range of professional laboratory and industrial equipment, supported by the services and technical expertise behind it." image="/manus-storage/img-mrclab-equipment_d32cd738.webp" /><section className="section section-white"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Our Products</span><h2>Featured Categories</h2><p>Explore our range of professional industrial equipment.</p></div><div className="card-grid card-grid-3">{CATEGORIES.map((category) => <article className="image-card product-card" key={category.title}><div className="image-card-media"><img src={category.src} alt={category.title} loading="lazy" decoding="async" /></div><div className="image-card-copy"><h3>{category.title}</h3><p>{category.text}</p></div></article>)}</div></div></section><section className="section section-muted"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Our Solutions</span><h2>Services &amp; Technical Support</h2><p>We supply high-quality products and services across multiple industrial sectors in Southern Africa.</p></div><div className="card-grid card-grid-3">{SERVICES.map(({ icon: Icon, title, text }) => <div className="info-card" key={title}><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section><section className="section section-dark cta-section"><div className="content-wrap narrow-copy"><h2>Need a Quotation?</h2><p>Send us your specifications and our team will recommend the right solution for your operation.</p><Link href="/contact" className="button button-gold">Request a Quote <ArrowRight size={16} /></Link></div></section></PageShell>;
}
