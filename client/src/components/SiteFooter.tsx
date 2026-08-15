/* Reference-matched shared footer: navy information band, gold divider, and the supplied business details. */
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "wouter";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Laboratory", href: "/laboratory" },
  { label: "Products & Solutions", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Laboratory Equipment & Consumables", href: "/services/laboratory" },
  { label: "Industrial Testing Instruments", href: "/services/industrial-testing" },
  { label: "Plant Maintenance & Spares", href: "/services/maintenance" },
  { label: "Fabrication & Repairs", href: "/services/fabrication" },
  { label: "HDPE Pipe Systems", href: "/services/hdpe" },
  { label: "Pumps & Valves", href: "/services/pumps" },
];

const SOCIAL_LINKS: Array<{ label: string; href: string; icon: IconType }> = [
  { label: "Facebook", href: "#social-facebook", icon: FaFacebookF },
  { label: "X / Twitter", href: "#social-x-twitter", icon: FaXTwitter },
  { label: "Instagram", href: "#social-instagram", icon: FaInstagram },
  { label: "TikTok", href: "#social-tiktok", icon: FaTiktok },
  { label: "LinkedIn", href: "#social-linkedin", icon: FaLinkedinIn },
  { label: "YouTube", href: "#social-youtube", icon: FaYoutube },
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
            <div className="footer-social" role="group" aria-label="Bridge Wax social profiles">
              <span className="footer-social-label">Social profiles coming soon</span>
              <div className="footer-social-links">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    className="footer-social-link"
                    href={href}
                    aria-label={`${label} profile coming soon`}
                    aria-disabled="true"
                    data-social-placeholder={label}
                    title={`${label} profile coming soon`}
                    onClick={(event) => event.preventDefault()}
                  >
                    <Icon aria-hidden="true" focusable="false" />
                  </a>
                ))}
              </div>
            </div>
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
