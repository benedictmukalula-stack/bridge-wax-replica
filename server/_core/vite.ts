import {
  getStructuredData,
  SEO_ORIGIN,
  SEO_SITE_NAME,
  type SeoMeta,
} from "../../client/src/seo";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function composeHtml(
  template: string,
  html: string,
  meta: SeoMeta,
): string {
  const canonical = `${SEO_ORIGIN}${meta.canonicalPath}`;
  const image = meta.image
    ? `${SEO_ORIGIN}${meta.image}`
    : undefined;

  const structuredData = getStructuredData(meta);

  const head = `
<title>${escapeHtml(meta.title)}</title>
<meta name="description" data-seo="description" content="${escapeHtml(meta.description)}">
<meta name="robots" data-seo="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}">

<link rel="canonical" data-seo="canonical" href="${escapeHtml(canonical)}">

<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<meta property="og:type" content="${meta.type ?? "website"}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:site_name" content="${escapeHtml(SEO_SITE_NAME)}">

<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${escapeHtml(meta.title)}">
<meta name="twitter:description" content="${escapeHtml(meta.description)}">
${
  image
    ? `
<meta property="og:image" content="${escapeHtml(image)}">
<meta name="twitter:image" content="${escapeHtml(image)}">
`
    : ""
}

<script type="application/ld+json">${JSON.stringify(structuredData)}</script>
`;

  return template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
}
