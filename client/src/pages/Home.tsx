/* Reference-matched homepage: ink navy, warm gold, cream editorial typography, and image-led sections. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { HeroSlider } from "../components/HeroSlider";
import { PageShell } from "../components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <HeroSlider />

      <section className="section section-white">
        <div className="content-wrap split-layout">
          <div className="image-frame image-frame-square">
            <img src="/manus-storage/lab-bench_a63ce4b2.webp" alt="Clean laboratory bench with scientific equipment" loading="lazy" decoding="async" />
          </div>
          <div className="copy-block">
            <span className="eyebrow">About Bridge Wax</span>
            <h2>Your Trusted Partner in Scientific &amp; Industrial Solutions</h2>
            <p className="lead-copy">Bridge Wax is a leading trading and distribution company headquartered in Lusaka, Zambia, with a branch office in Johannesburg, South Africa. The company supplies laboratory equipment, mining laboratory systems, analytical instruments and industrial technologies to customers throughout Southern Africa. Through global partnerships and technical expertise, Bridge Wax delivers dependable products supported by responsive customer service and after-sales support.</p>
            <Link href="/about" className="button button-dark">Learn More About Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
