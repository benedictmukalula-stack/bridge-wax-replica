/* Reference-matched homepage hero: five source slides, six-second rotation, arrows, and gold progress markers. */
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const SLIDES = [
  { src: "/manus-storage/hero-slide-1_d8e78602.jpg", alt: "Industrial equipment solutions" },
  { src: "/manus-storage/hero-slide-3_3719fc5b.jpg", alt: "Laboratory equipment and glassware" },
  { src: "/manus-storage/hero-slide-5_de7749c3.jpg", alt: "Professional laboratory setup" },
  { src: "/manus-storage/hero-slide-6_461456ad.jpg", alt: "Essential laboratory tools and safety equipment" },
  { src: "/manus-storage/hero-slide-8_01bd615e.jpg", alt: "Advanced laboratory instruments" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % SLIDES.length), 6000); return () => window.clearInterval(timer); }, []);
  const move = (direction: number) => setIndex((value) => (value + direction + SLIDES.length) % SLIDES.length);
  return <section className="hero-slider">
    {SLIDES.map((slide, slideIndex) => <div className={`hero-slide ${slideIndex === index ? "visible" : ""}`} key={slide.src}><img src={slide.src} alt={slide.alt} /></div>)}
    <div className="hero-overlay" />
    <button className="hero-arrow hero-arrow-left" aria-label="Previous slide" onClick={() => move(-1)}><ChevronLeft size={20} /></button>
    <button className="hero-arrow hero-arrow-right" aria-label="Next slide" onClick={() => move(1)}><ChevronRight size={20} /></button>
    <div className="hero-markers">{SLIDES.map((slide, slideIndex) => <button key={slide.src} aria-label={`Go to slide ${slideIndex + 1}`} className={slideIndex === index ? "active" : ""} onClick={() => setIndex(slideIndex)} />)}</div>
    <div className="hero-copy content-wrap">
      <span className="eyebrow">We Exceed Our Vision</span>
      <h1>Laboratory Equipment &amp; Industrial Solutions for Africa</h1>
      <p>Bridge Wax supplies laboratory equipment, mining laboratory solutions, medical laboratory products, analytical instruments and industrial technologies across Zambia and Southern Africa.</p>
      <div className="button-row"><Link href="/laboratory" className="button button-gold">Explore Laboratory <ArrowRight size={16} /></Link><Link href="/contact" className="button button-outline-light">Contact Us</Link></div>
    </div>
  </section>;
}
