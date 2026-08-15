import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import type { CatalogueProductRecord } from "../lib/catalogueData";
import { getProductPath } from "../lib/catalogueData";
import { AddToQuoteButton } from "./QuoteCart";

export function CatalogueProductImage({ product, eager = false }: { product: CatalogueProductRecord; eager?: boolean }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return <div className="catalogue-product-image-fallback" role="img" aria-label={`${product.name} image unavailable`}><ShoppingBag size={30} /><span>{product.code}</span></div>;
  }

  return <img
    src={product.image}
    alt={product.name}
    className="catalogue-product-image"
    loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : "auto"}
    decoding="async"
    onError={() => {
      if (import.meta.env.DEV) console.warn(`Unable to load catalogue product image for ${product.code}`);
      setHasFailed(true);
    }}
  />;
}

export function CatalogueProductCard({ product, eager = false }: { product: CatalogueProductRecord; eager?: boolean }) {
  const productPath = getProductPath(product);
  const quoteProduct = {
    code: product.code,
    name: product.name,
    categorySlug: product.categorySlug,
    categoryTitle: product.categoryTitle,
    rangeTitle: product.rangeTitle,
  };

  return <article className="catalogue-product-card" id={product.code}>
    <Link href={productPath} className="catalogue-product-media" aria-label={`View ${product.name}`}><CatalogueProductImage product={product} eager={eager} /></Link>
    <div className="catalogue-product-body">
      <div className="catalogue-product-meta"><span>{product.code}</span><small>{product.rangeTitle}</small></div>
      <h3><Link href={productPath}>{product.name}</Link></h3>
      <p>{product.description}</p>
      <div className="catalogue-product-actions"><Link href={productPath} className="catalogue-product-view">View Product <ArrowRight size={15} /></Link><AddToQuoteButton product={quoteProduct} /></div>
    </div>
  </article>;
}
