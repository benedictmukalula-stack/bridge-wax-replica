/* Reference-matched fallback page: quiet navy utility state with the same brand voice. */
import { Link } from "wouter";
import { SiteHeader } from "../components/SiteHeader";

export default function NotFound() {
  return <div className="not-found-page"><SiteHeader /><main className="not-found-content"><span className="eyebrow">Bridge Wax</span><h1>That page is not available.</h1><p>Return to the main site to explore our laboratory and industrial solutions.</p><Link href="/" className="button button-gold">Back to Home</Link></main></div>;
}
