/* Reference-matched shared footer: navy information band, gold divider, and the supplied business details. */
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Laboratory", href: "/laboratory" },
  { label: "Products & Solutions", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Laboratory Equipment & Consumables", href: "/laboratory" },
  { label: "Industrial Testing Instruments", href: "/products" },
  { label: "Plant Maintenance & Spares", href: "/products" },
  { label: "Fabrication & Repairs", href: "/products" },
  { label: "HDPE Pipe Systems", href: "/products" },
  { label: "Pumps & Valves", href: "/products" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-divider" />
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <Link href="/" className="footer-brand"><span className="footer-mark-wrap"><img src="/manus-storage/bridge-wax-logo_bf0418bf.png" alt="Bridge Wax logo" /></span><span className="brand-copy"><strong>BRIDGE WAX</strong><small>We Exceed Our Vision</small></span></Link>
            <p>Bridge Wax supplies laboratory equipment, mining laboratory solutions, medical laboratory products, analytical instruments and industrial technologies across Zambia and Southern Africa.</p>
          </div>
          <div><h4>Quick Links</h4><ul>{QUICK_LINKS.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
          <div><h4>Our Solutions</h4><ul>{SERVICES.map((service) => <li key={service.href + service.label}><Link href={service.href}>{service.label}</Link></li>)}</ul></div>
          <div><h4>Contact Us</h4><div className="footer-contact">
            <span><MapPin size={16} /><span>Stand No. LUS/5180/5181, Chishango Road, Lusaka, Zambia</span></span>
            <a href="tel:+260966892403"><Phone size={16} />+260 96 689 2403</a>
            <a href="tel:+260964326839"><Phone size={16} />+260 96 432 6839</a>
            <a href="mailto:bridgewax.sales@gmail.com"><Mail size={16} />bridgewax.sales@gmail.com</a>
            <a href="mailto:info@bridgewax.com"><Mail size={16} />info@bridgewax.com</a>
            <a href="https://www.bridgewax.com" target="_blank" rel="noreferrer"><Globe size={16} />www.bridgewax.com</a>
          </div></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Bridge Wax Ltd. All rights reserved.</p><p>Stand No. LUS/5180/5181, Chishango Road, Lusaka, Zambia</p></div>
      </div>
    </footer>
  );
}
