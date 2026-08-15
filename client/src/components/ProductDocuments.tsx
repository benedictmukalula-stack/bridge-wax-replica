import { Download, FileText, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import type { CatalogueProductRecord } from "../lib/catalogueData";
import { getManufacturerDocuments, type ManufacturerDocument } from "../lib/productDocuments";

type ProductDocumentsProps = {
  product: CatalogueProductRecord;
  documents?: readonly ManufacturerDocument[];
};

function documentRequestHref(product: CatalogueProductRecord) {
  return `/contact?product=${encodeURIComponent(product.name)}&request=${encodeURIComponent("manufacturer documentation")}`;
}

export function ProductDocuments({ product, documents = getManufacturerDocuments(product) }: ProductDocumentsProps) {
  const hasDocuments = documents.length > 0;

  return <section className="product-documents" aria-labelledby="manufacturer-documents-heading">
    <div className="product-documents-heading"><span className="eyebrow">Technical library</span><h2 id="manufacturer-documents-heading">Manufacturer specifications &amp; documents</h2><p>Download verified files for procurement and technical review. Documents are matched to product code <strong>{product.code}</strong>.</p></div>
    {hasDocuments ? <div className="product-document-list">{documents.map((document) => <a className="product-document-item" href={document.href} key={`${product.code}-${document.title}`} download={document.href.startsWith("/") ? "" : undefined} target={document.href.startsWith("/") ? undefined : "_blank"} rel={document.href.startsWith("/") ? undefined : "noreferrer"} aria-label={`Download ${document.title} for ${product.name}`}><FileText aria-hidden="true" /><span><small>{document.type}</small><strong>{document.title}</strong><em>{document.fileFormat}{document.size ? ` · ${document.size}` : ""}{document.updated ? ` · Updated ${document.updated}` : ""}</em></span><Download aria-hidden="true" /></a>)}</div> : <div className="product-documents-empty"><ShieldCheck aria-hidden="true" /><div><h3>Verified files are available on request</h3><p>Bridge Wax has not yet published a current manufacturer file for this product. Request the latest datasheet, manual, compliance document, or drawing for your required configuration.</p></div><Link href={documentRequestHref(product)} className="button button-dark">Request Documentation</Link></div>}
  </section>;
}
