import { LAB_CATALOGUES } from "./lib/labCatalog";
import { CATALOGUE_PRODUCTS, getProductByPath, getProductPath } from "./lib/catalogueData";
import { PRODUCT_CATALOGUES } from "./lib/productCatalog";
import { SERVICE_CATALOGUES } from "./lib/serviceCatalog";

export const SEO_ORIGIN = "https://bridgewax.com";
export const SEO_SITE_NAME = "Bridge Wax";
export const SEO_DEFAULT_DESCRIPTION = "Bridge Wax supplies laboratory equipment, mining laboratory solutions, medical laboratory products, analytical instruments, water pumps, industrial equipment, and technical services across Zambia and Southern Africa.";
export const SEO_DEFAULT_IMAGE = "/manus-storage/lab-analytical-room_14145300.webp";

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  notFound?: boolean;
};

const STATIC_META: Record<string, SeoMeta> = {
  "/": {
    title: "Laboratory Equipment & Industrial Solutions in Zambia | Bridge Wax",
    description: SEO_DEFAULT_DESCRIPTION,
    canonicalPath: "/",
    image: SEO_DEFAULT_IMAGE,
    imageAlt: "Bridge Wax laboratory equipment and analytical workstations",
  },
  "/about": {
    title: "About Bridge Wax | Laboratory & Industrial Solutions Supplier",
    description: "Learn about Bridge Wax, a Lusaka-based supplier of laboratory equipment, industrial technologies, technical support, and specialised solutions for Southern Africa.",
    canonicalPath: "/about",
    image: "/manus-storage/about-laboratory-no-people_4a45f1ea.webp",
    imageAlt: "Clean laboratory environment supplied by Bridge Wax",
  },
  "/laboratory": {
    title: "Laboratory Equipment Solutions | Bridge Wax Zambia",
    description: "Explore mining, medical, water-analysis, and analytical laboratory equipment supplied by Bridge Wax in Zambia and Southern Africa.",
    canonicalPath: "/laboratory",
    image: "/manus-storage/laboratory-hero-no-people_36472255.png",
    imageAlt: "Laboratory equipment and analytical workstations",
  },
  "/products": {
    title: "Laboratory & Industrial Products | Bridge Wax",
    description: "Browse Bridge Wax product catalogues for ultrasonic equipment, gas detection, water pumps, general machinery, laboratory equipment, and industrial solutions.",
    canonicalPath: "/products",
    image: "/manus-storage/products-hero_dbc3417d.webp",
    imageAlt: "Bridge Wax laboratory and industrial product range",
  },
  "/services": {
    title: "Technical Services & Industrial Support | Bridge Wax",
    description: "Bridge Wax provides laboratory equipment supply, industrial testing, plant maintenance, fabrication, HDPE pipe systems, pumps, valves, and technical support.",
    canonicalPath: "/services",
    image: "/manus-storage/products-hero_dbc3417d.webp",
    imageAlt: "Bridge Wax technical services and industrial support",
  },
  "/contact": {
    title: "Contact Bridge Wax | Laboratory & Industrial Solutions",
    description: "Contact Bridge Wax in Lusaka, Zambia for laboratory equipment, industrial solutions, technical support, product catalogues, and quotation requests.",
    canonicalPath: "/contact",
    image: "/manus-storage/contact-laboratory-no-people_1d9a70dc.webp",
    imageAlt: "Bridge Wax laboratory solutions contact page",
  },
};

function normalizePath(pathname: string) {
  const base = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  return base.toLowerCase();
}

export function getSeoMeta(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  if (STATIC_META[path]) return STATIC_META[path];

  const productDetailMatch = path.match(/^\/products\/([^/]+)\/([^/]+)$/);
  if (productDetailMatch) {
    const product = getProductByPath(productDetailMatch[1], productDetailMatch[2]);
    if (product) {
      return {
        title: `${product.name} (${product.code}) | ${product.categoryTitle} | Bridge Wax`,
        description: `${product.description} Request a quotation from Bridge Wax for ${product.name} and compatible technical support.`,
        canonicalPath: getProductPath(product),
        image: product.image,
        imageAlt: `${product.name}, product code ${product.code}`,
      };
    }
  }

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    const catalogue = PRODUCT_CATALOGUES[productMatch[1]];
    if (catalogue) {
      return {
        title: `${catalogue.title} | Bridge Wax Product Catalogue`,
        description: catalogue.summary,
        canonicalPath: `/products/${catalogue.slug}`,
        image: catalogue.image,
        imageAlt: `${catalogue.title} supplied by Bridge Wax`,
      };
    }
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = SERVICE_CATALOGUES[serviceMatch[1]];
    if (service) {
      return {
        title: `${service.title} | Bridge Wax Services`,
        description: service.summary,
        canonicalPath: `/services/${service.slug}`,
        image: service.image,
        imageAlt: `${service.title} by Bridge Wax`,
      };
    }
  }

  const labMatch = path.match(/^\/laboratory\/([^/]+)$/);
  if (labMatch) {
    const catalogue = LAB_CATALOGUES[labMatch[1]];
    if (catalogue) {
      return {
        title: `${catalogue.title} | Bridge Wax Laboratory Catalogue`,
        description: catalogue.summary,
        canonicalPath: `/laboratory/${catalogue.slug}`,
        image: catalogue.image,
        imageAlt: `${catalogue.title} supplied by Bridge Wax`,
      };
    }
  }

  return {
    title: `Page Not Found | ${SEO_SITE_NAME}`,
    description: SEO_DEFAULT_DESCRIPTION,
    canonicalPath: path,
    noindex: true,
    notFound: true,
  };
}

function getBreadcrumbItems(pathname: string) {
  const productDetailMatch = pathname.match(/^\/products\/([^/]+)\/([^/]+)$/);
  if (productDetailMatch) {
    const product = getProductByPath(productDetailMatch[1], productDetailMatch[2]);
    if (product) return [
      { name: "Home", item: SEO_ORIGIN },
      { name: "Products", item: `${SEO_ORIGIN}/products` },
      { name: product.categoryTitle, item: `${SEO_ORIGIN}/products/${product.categorySlug}` },
      { name: product.name, item: `${SEO_ORIGIN}${getProductPath(product)}` },
    ];
  }

  const categoryMatch = pathname.match(/^\/products\/([^/]+)$/);
  if (categoryMatch) {
    const category = PRODUCT_CATALOGUES[categoryMatch[1]];
    if (category) return [
      { name: "Home", item: SEO_ORIGIN },
      { name: "Products", item: `${SEO_ORIGIN}/products` },
      { name: category.title, item: `${SEO_ORIGIN}/products/${category.slug}` },
    ];
  }

  return [];
}

export function getStructuredData(meta: SeoMeta, pathname = meta.canonicalPath) {
  const data: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SEO_SITE_NAME,
      url: SEO_ORIGIN,
      logo: `${SEO_ORIGIN}/manus-storage/bridge-wax-logo_bf0418bf.png`,
      description: SEO_DEFAULT_DESCRIPTION,
      email: "info@bridgewax.com",
      telephone: "+260966892403",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Stand No. LUS/5180/5181, Chishango Road",
        addressLocality: "Lusaka",
        addressCountry: "ZM",
      },
      areaServed: ["Zambia", "Southern Africa"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SEO_SITE_NAME,
      url: SEO_ORIGIN,
      description: meta.description,
    },
  ];

  const breadcrumbItems = getBreadcrumbItems(normalizePath(pathname));
  if (breadcrumbItems.length) {
    data.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  return data;
}

export function getSitemapPaths() {
  return [
    "/",
    "/about",
    "/laboratory",
    ...Object.values(LAB_CATALOGUES).map((catalogue) => `/laboratory/${catalogue.slug}`),
    "/products",
    ...Object.values(PRODUCT_CATALOGUES).map((catalogue) => `/products/${catalogue.slug}`),
    ...CATALOGUE_PRODUCTS.map((product) => getProductPath(product)),
    "/services",
    ...Object.values(SERVICE_CATALOGUES).map((service) => `/services/${service.slug}`),
    "/contact",
  ];
}
