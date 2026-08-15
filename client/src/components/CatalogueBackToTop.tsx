import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const VISIBILITY_THRESHOLD = 560;

function scrollToCatalogueTop() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

export function CatalogueBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!isVisible) return null;

  return <button type="button" className="catalogue-back-to-top" onClick={scrollToCatalogueTop} aria-label="Back to top of catalogue"><ArrowUp aria-hidden="true" size={16} /> Back to top</button>;
}
