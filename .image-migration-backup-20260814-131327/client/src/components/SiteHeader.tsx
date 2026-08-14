/* Reference-matched shared header: fixed white bar, supplied wordmark, gold active states, and mobile drawer. */
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import ProductSearch from "./ProductSearch";
import { QuoteCartButton } from "./QuoteCart";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Laboratory", href: "/laboratory" },
  { label: "Products & Solutions", href: "/products" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isActive = (href: string) => href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav">
        <Link href="/" className="brand-link" aria-label="Bridge Wax home">
          <span className="brand-mark-wrap"><img src="/images/bridge-wax-logo.png" alt="Bridge Wax logo" /></span>
          <span className="brand-copy"><strong>BRIDGE WAX</strong><small>We Exceed Our Vision</small></span>
        </Link>

        <div className="desktop-nav">
          {NAV.map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "nav-link active" : "nav-link"} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </div>

        <div className="header-actions">
          <ProductSearch variant="header" />
          <QuoteCartButton />
          <Link href="/contact" className="button button-gold button-small desktop-contact">Contact</Link>
          <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </nav>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {[...NAV, { label: "Contact", href: "/contact" }].map((item) => <Link key={item.href} href={item.href} className={isActive(item.href) ? "mobile-nav-link active" : "mobile-nav-link"}>{item.label}</Link>)}
        <ProductSearch variant="mobile" />
      </div>
    </header>
  );
}
