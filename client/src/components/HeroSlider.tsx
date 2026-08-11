/* Reference-matched homepage hero: five source slides, six-second rotation, arrows, and gold progress markers. */
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const SLIDES = [
  { src: "/manus-storage/home-hero_e4f93bdf.webp", alt: "Modern analytical laboratory inside a scientific research facility" },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setIndex((value) => (value + 1) % SLIDES.length), 6000); return () => window.clearInterval(timer); }, []);
  const move = (direction: number) => setIndex((value) => (value + direction + SLIDES.length) % SLIDES.length);
  return <section className="hero-slider">
    {SLIDES.map((slide, slideIndex) => <div className={`hero-slide ${slideIndex === index ? "visible" : ""}`} key={slide.src}><img src={slide.src} alt={slide.alt} loading={slideIndex === 0 ? "eager" : "lazy"} fetchPriority={slideIndex === 0 ? "high" : "low"} decoding="async" /></div>)}
    <div className="hero-overlay" />
    {SLIDES.length > 1 && <><button className="hero-arrow hero-arrow-left" aria-label="Previous slide" onClick={() => move(-1)}><ChevronLeft size={20} /></button><button className="hero-arrow hero-arrow-right" aria-label="Next slide" onClick={() => move(1)}><ChevronRight size={20} /></button><div className="hero-markers">{SLIDES.map((slide, slideIndex) => <button key={slide.src} aria-label={`Go to slide ${slideIndex + 1}`} className={slideIndex === index ? "active" : ""} onClick={() => setIndex(slideIndex)} />)}</div></>}
    <div className="hero-copy content-wrap">
      <span className="eyebrow">We Exceed Our Vision</span>
      <h1>Laboratory Equipment &amp; Industrial Solutions for Africa</h1>
      <p>Bridge Wax supplies laboratory equipment, mining laboratory solutions, medical laboratory products, analytical instruments and industrial technologies across Zambia and Southern Africa.</p>
      <div className="button-row"><Link href="/laboratory" className="button button-gold">Explore Laboratory <ArrowRight size={16} /></Link><Link href="/contact" className="button button-outline-light">Contact Us</Link></div>
    </div>
  </section>;
}
