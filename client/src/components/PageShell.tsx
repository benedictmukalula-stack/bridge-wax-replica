/* Reference-matched page shell: fixed header, editorial page heroes, and consistent footer framing. */
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="site-page"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}

export function PageHero({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle: string; image: string }) {
  return <section className="page-hero"><img src={image} alt={title} /><div className="page-hero-overlay" /><div className="page-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div></section>;
}
