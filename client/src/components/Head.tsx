import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSeoMeta, getStructuredData, SEO_ORIGIN, SEO_SITE_NAME } from "../seo";

function setMeta(selector: string, attribute: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    element.dataset.seo = "true";
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function Head() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = getSeoMeta(location);
    const canonical = `${SEO_ORIGIN}${meta.canonicalPath}`;
    const image = meta.image ? `${SEO_ORIGIN}${meta.image}` : undefined;
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:type"]', "property", "og:type", meta.type ?? "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SEO_SITE_NAME);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    if (image) {
      setMeta('meta[property="og:image"]', "property", "og:image", image);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    }

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[data-seo="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.dataset.seo = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    let robots = document.head.querySelector<HTMLMetaElement>('meta[data-seo="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.dataset.seo = "robots";
      document.head.appendChild(robots);
    }
    robots.content = meta.noindex ? "noindex, follow" : "index, follow";

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-seo="structured-data"]');
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.seo = "structured-data";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(getStructuredData(meta, location));
  }, [location]);

  return null;
}
