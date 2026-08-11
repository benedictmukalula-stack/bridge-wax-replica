/* Reference-matched products page: featured equipment categories, technical services, and quotation CTA. */
import { ArrowRight, Cog, Factory, FlaskConical, Gauge, Pipette, Wrench } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const CATEGORIES = [
  { title: "Laboratory Equipment", src: "/manus-storage/product-laboratory-equipment_cd92cc53.webp", text: "Professional laboratory workstations and advanced scientific instruments." },
  { title: "Water Analysis", src: "/manus-storage/product-water-analysis_0ba028f2.webp", text: "Premium water testing equipment for environmental and process analysis." },
  { title: "Medical Laboratory", src: "/manus-storage/product-medical-laboratory_47eb93f2.webp", text: "Modern diagnostic analyzers for clinical laboratory environments." },
  { title: "Ultrasonic Equipment", src: "/manus-storage/product-ultrasonic-equipment-no-people_09064da0.png", text: "Precision ultrasonic inspection tools for nondestructive testing." },
  { title: "Gas Detection", src: "/manus-storage/product-gas-detection-no-people_65af6933.png", text: "Portable industrial gas detection equipment for safe operations." },
];

const SERVICES = [
  { icon: FlaskConical, title: "Laboratory Equipment & Consumables", text: "Instruments, glassware, reagents and consumables for mining, medical, water and research laboratories.", image: "/manus-storage/home-featured-laboratory-no-people_2ecfd627.png" },
  { icon: Gauge, title: "Industrial Testing Instruments", text: "Testing instruments, gauges, detectors and measurement solutions for plant and field use.", image: "/manus-storage/industrial-testing-equipment-no-people_ec338117.png" },
  { icon: Cog, title: "Plant Maintenance & Spares", text: "Maintenance support and genuine spares to keep production and processing plants running.", image: "/manus-storage/industrial-maintenance-no-people_28fbdb07.png" },
  { icon: Wrench, title: "Fabrication & Repairs", text: "Workshop fabrication, refurbishment and repair of industrial components and assemblies.", image: "/manus-storage/fabrication-no-people_9c684ae1.png" },
  { icon: Pipette, title: "HDPE Pipe Systems", text: "HDPE piping, fittings and jointing solutions for water, slurry and process reticulation.", image: "/manus-storage/hdpe-pipe-systems-no-people_8beccb9e.png" },
  { icon: Factory, title: "Pumps & Valves", text: "Pumps, valves and flow-control equipment selected for mining and industrial duty.", image: "/manus-storage/pumps-valves-retry_1ad20416.webp" },
];

export default function Products() {
  return <PageShell><PageHero eyebrow="Products & Solutions" title="Equipment, Spares and Technical Solutions" subtitle="Explore our range of professional laboratory and industrial equipment, supported by the services and technical expertise behind it." image="/manus-storage/products-hero_dbc3417d.webp" /><section className="section section-white"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Our Products</span><h2>Featured Categories</h2><p>Explore laboratory, diagnostic, analytical, and industrial testing equipment.</p></div><div className="card-grid card-grid-3">{CATEGORIES.map((category) => <article className="image-card product-card" key={category.title}><div className="image-card-media"><img src={category.src} alt={category.title} loading="lazy" decoding="async" /></div><div className="image-card-copy"><h3>{category.title}</h3><p>{category.text}</p></div></article>)}</div></div></section><section className="section section-muted"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Our Solutions</span><h2>Services &amp; Technical Support</h2><p>We supply high-quality products and services across multiple industrial sectors in Southern Africa.</p></div><div className="card-grid card-grid-3">{SERVICES.map(({ icon: Icon, title, text, image }) => <div className="info-card service-card" key={title}><div className="service-card-media"><img src={image} alt={title} loading="lazy" decoding="async" /></div><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section><section className="section section-dark cta-section"><div className="content-wrap narrow-copy"><h2>Need a Quotation?</h2><p>Send us your specifications and our team will recommend the right solution for your operation.</p><Link href="/contact" className="button button-gold">Request a Quote <ArrowRight size={16} /></Link></div></section></PageShell>;
}
