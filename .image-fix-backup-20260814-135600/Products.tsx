/* Reference-matched products page: featured equipment categories, technical services, and quotation CTA. */
import { ArrowRight, Cog, Factory, FlaskConical, Gauge, Pipette, Wrench } from "lucide-react";
import { Link } from "wouter";
import { PageHero, PageShell } from "../components/PageShell";

const CATEGORIES = [
  { slug: "ultrasonic", title: "Ultrasonic Equipment", src: "/images/products/ultrasonic/ultrasonic-01.jpg", text: "Precision ultrasonic inspection tools for nondestructive testing." },
  { slug: "gas-detection", title: "Gas Detection", src: "/images/products/gas-detection/gas-detection-01.jpg", text: "Portable industrial gas detection equipment for safe operations." },
  { slug: "water-pumps", title: "Water Pumps", src: "/images/products/water-pumps/water-pump-01.jpg", text: "Industrial pumps and flow-control equipment for mining, process, and water applications." },
  { slug: "general-machinery", title: "General Machinery", src: "/images/products/general-machinery/general-machinery-01.jpg", text: "Reliable machinery and plant equipment for demanding industrial operations." },
];

const SERVICES = [
  { slug: "laboratory", icon: FlaskConical, title: "Laboratory Equipment & Consumables", text: "Instruments, glassware, reagents and consumables for mining, medical, water and research laboratories.", image: "/images/hero/home-laboratory.jpg" },
  { slug: "industrial-testing", icon: Gauge, title: "Industrial Testing Instruments", text: "Testing instruments, gauges, detectors and measurement solutions for plant and field use.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "maintenance", icon: Cog, title: "Plant Maintenance & Spares", text: "Maintenance support and genuine spares to keep production and processing plants running.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "fabrication", icon: Wrench, title: "Fabrication & Repairs", text: "Workshop fabrication, refurbishment and repair of industrial components and assemblies.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "hdpe", icon: Pipette, title: "HDPE Pipe Systems", text: "HDPE piping, fittings and jointing solutions for water, slurry and process reticulation.", image: "/images/hero/laboratory-equipment.jpg" },
  { slug: "pumps", icon: Factory, title: "Pumps & Valves", text: "Pumps, valves and flow-control equipment selected for mining and industrial duty.", image: "/images/hero/laboratory-equipment.jpg" },
];

export default function Products() {
  return <PageShell><PageHero eyebrow="Products & Solutions" title="Equipment, Spares and Technical Solutions" subtitle="Explore our range of professional laboratory and industrial equipment, supported by the services and technical expertise behind it." image="/images/hero/products.jpg" /><section className="section section-white"><div className="content-wrap"><div className="section-heading products-category-heading"><span className="eyebrow">Our Products</span><h2>Featured Categories</h2><p>Choose a category to open its product catalogue with product codes and descriptions. Use the header search to locate a product quickly.</p></div><div className="card-grid card-grid-3">{CATEGORIES.map((category) => <Link href={`/products/${category.slug}`} className="image-card product-card" key={category.title}><div className="image-card-media"><img src={category.src} alt={category.title} loading="lazy" decoding="async" /></div><div className="image-card-copy"><h3>{category.title}</h3><p>{category.text}</p><span className="catalogue-link-label">View catalogue <ArrowRight size={15} /></span></div></Link>)}</div></div></section><section className="section section-muted"><div className="content-wrap"><div className="section-heading"><span className="eyebrow">Our Solutions</span><h2>Services &amp; Technical Support</h2><p>Choose a service to open its service catalogue with scope codes and descriptions.</p></div><div className="card-grid card-grid-3">{SERVICES.map(({ slug, icon: Icon, title, text, image }) => <Link href={`/services/${slug}`} className="info-card service-card" key={title}><div className="service-card-media"><img src={image} alt={title} loading="lazy" decoding="async" /></div><div className="icon-box"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p><span className="catalogue-link-label">View service catalogue <ArrowRight size={15} /></span></Link>)}</div></div></section><section className="section section-dark cta-section"><div className="content-wrap narrow-copy"><h2>Need a Quotation?</h2><p>Send us your specifications and our team will recommend the right solution for your operation.</p><Link href="/contact" className="button button-gold">Request a Quote <ArrowRight size={16} /></Link></div></section></PageShell>;
}
