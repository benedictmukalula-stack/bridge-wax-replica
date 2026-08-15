import express, { type Express } from "express";
import fs from "node:fs";
import { type Server } from "node:http";
import { nanoid } from "nanoid";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getSeoMeta, getStructuredData, SEO_ORIGIN, SEO_SITE_NAME, type SeoMeta } from "../../client/src/seo";

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SEO_ORIGIN}${path}`;
}

export function buildHeadTags(meta: SeoMeta) {
  const canonical = absoluteUrl(meta.canonicalPath);
  const image = meta.image ? absoluteUrl(meta.image) : undefined;
  const structuredData = JSON.stringify(getStructuredData(meta)).replace(/</g, "\\u003c");
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" data-seo="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${meta.type ?? "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${SEO_SITE_NAME}" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" data-seo="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}" />`,
    `<script type="application/ld+json" data-seo="structured-data">${structuredData}</script>`,
  ];
  if (image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
    tags.push(`<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt ?? meta.title)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  }
  return tags.join("\n");
}

export function composeHtml(template: string, appHtml: string, meta: SeoMeta) {
  return template
    .replace("<!--app-head-->", () => buildHeadTags(meta))
    .replace("<!--app-html-->", () => appHtml);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    // The managed preview terminates TLS and proxies its public HTTPS origin to
    // this in-process Vite server. Explicit client settings prevent Vite from
    // falling back to localhost:5173 for browser-side HMR reconnection.
    server: { middlewareMode: true, hmr: { server, protocol: "wss", clientPort: 443 }, allowedHosts: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      template = await vite.transformIndexHtml(req.originalUrl, template);
      template = template.replace("</head>", `<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>`);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html, meta } = await render(req.originalUrl);
      res.status(meta.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, html, meta));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const templatePath = path.resolve(distPath, "index.html");
  const ssrEntryPath = path.resolve(import.meta.dirname, "server-ssr", "entry-server.js");
  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/ .test(req.path)) return res.redirect(301, req.path.replace(/\/+$/ , "") + req.originalUrl.slice(req.path.length));
    next();
  });
  app.use(express.static(distPath, { index: false, redirect: false }));
  app.use("*", async (req, res) => {
    const template = await fs.promises.readFile(templatePath, "utf-8");
    try {
      const { render } = await import(ssrEntryPath);
      const { html, meta } = await render(req.originalUrl);
      res.status(meta.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, html, meta));
    } catch (error) {
      console.error("[SSR] render failed, serving client shell:", error);
      const meta = getSeoMeta("/");
      res.status(200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, "", meta));
    }
  });
}
