/* Reference-matched homepage: ink navy, warm gold, cream editorial typography, and image-led sections. */
import { ArrowRight, Gauge, HardHat, Microscope, Wrench } from "lucide-react";
import { Link } from "wouter";
import { HeroSlider } from "../components/HeroSlider";
import { PageShell } from "../components/PageShell";

const CAPABILITIES = [
  { icon: Microscope, title: "Laboratory Equipment", text: "Mining, medical, water analysis and research laboratory supplies." },
  { icon: HardHat, title: "Mining Laboratory Solutions", text: "Sample preparation, analytical instruments and consumables." },
  { icon: Gauge, title: "Industrial Equipment", text: "Testing instruments, gauges, detectors and measurement solutions." },
  { icon: Wrench, title: "Technical Support", text: "After-sales service, maintenance and expert engineering support." },
];

const CATEGORIES = [
  { title: "Laboratory Equipment", src: "/manus-storage/hero-slide-3_3719fc5b.jpg" },
  { title: "Water Analysis Equipment", src: "/manus-storage/cat-water-analysis_190044a0.jpg" },
  { title: "Medical Laboratory Equipment", src: "/manus-storage/cat-medical-lab_2ae1d546.jpg" },
  { title: "Analytical Instruments", src: "/manus-storage/img-mrclab-equipment_f1385f6a.jpg" },
];

export default function Home() {
  return (
    <PageShell>
      <HeroSlider />

      <section className="section section-white">
        <div className="content-wrap split-layout">
          <div className="image-frame image-frame-square">
            <img src="/manus-storage/img-alphasophia_63e9fdd6.png" alt="Bridge Wax laboratory and industrial equipment" />
          </div>
          <div className="copy-block">
            <span className="eyebrow">About Bridge Wax</span>
            <h2>Your Trusted Partner in Scientific &amp; Industrial Solutions</h2>
            <p className="lead-copy">Bridge Wax is a leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa. The company supplies laboratory equipment, mining laboratory systems, analytical instruments and industrial technologies to customers throughout Southern Africa. Through global partnerships and technical expertise, Bridge Wax delivers dependable products supported by responsive customer service and after-sales support.</p>
            <Link href="/about" className="button button-dark">Learn More About Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="content-wrap">
          <div className="section-heading">
            <span className="eyebrow">What We Do</span>
            <h2>Our Core Capabilities</h2>
            <p>We supply high-quality products and services across multiple industrial sectors in Southern Africa.</p>
          </div>
          <div className="card-grid card-grid-4">
            {CAPABILITIES.map(({ icon: Icon, title, text }) => (
              <div className="info-card" key={title}>
                <div className="icon-box"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="content-wrap">
          <div className="section-heading">
            <span className="eyebrow">Our Products</span>
            <h2>Featured Categories</h2>
            <p>Explore our range of professional laboratory and industrial equipment.</p>
          </div>
          <div className="card-grid card-grid-4">
            {CATEGORIES.map((category) => (
              <Link href="/products" className="image-card" key={category.title}>
                <div className="image-card-media"><img src={category.src} alt={category.title} loading="lazy" /></div>
                <div className="image-card-copy"><h3>{category.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark cta-section">
        <div className="content-wrap narrow-copy">
          <span className="eyebrow">Get Started</span>
          <h2>Need Equipment or Technical Support?</h2>
          <p>Contact our team of experts to discuss your requirements and find the right solution for your operation.</p>
          <div className="button-row">
            <Link href="/contact" className="button button-gold">Contact Us Today <ArrowRight size={16} /></Link>
            <Link href="/products" className="button button-outline-light">View Products &amp; Solutions</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
