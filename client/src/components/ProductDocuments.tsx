import { Download, Eye, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
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
  const [previewDocument, setPreviewDocument] = useState<ManufacturerDocument | null>(null);
  const isInlinePreviewable = previewDocument?.fileFormat === "PDF";

  return <section className="product-documents" aria-labelledby="manufacturer-documents-heading">
    <div className="product-documents-heading"><span className="eyebrow">Technical library</span><h2 id="manufacturer-documents-heading">Manufacturer specifications &amp; documents</h2><p>Download verified files for procurement and technical review. Documents are matched to product code <strong>{product.code}</strong>.</p></div>
    {hasDocuments ? <div className="product-document-list">{documents.map((document) => <article className="product-document-item" key={`${product.code}-${document.title}`}><FileText aria-hidden="true" /><span><small>{document.type}</small><strong>{document.title}</strong><em>{document.fileFormat}{document.size ? ` · ${document.size}` : ""}{document.updated ? ` · Updated ${document.updated}` : ""}</em></span><div className="product-document-actions"><button type="button" className="product-document-preview" onClick={() => setPreviewDocument(document)} aria-label={`Preview ${document.title} for ${product.name}`}><Eye aria-hidden="true" /> Preview</button><a href={document.href} download={document.href.startsWith("/") ? "" : undefined} target={document.href.startsWith("/") ? undefined : "_blank"} rel={document.href.startsWith("/") ? undefined : "noreferrer"} aria-label={`Download ${document.title} for ${product.name}`}><Download aria-hidden="true" /> Download</a></div></article>)}</div> : <div className="product-documents-empty"><ShieldCheck aria-hidden="true" /><div><h3>Verified files are available on request</h3><p>Bridge Wax has not yet published a current manufacturer file for this product. Request the latest datasheet, manual, compliance document, or drawing for your required configuration.</p></div><Link href={documentRequestHref(product)} className="button button-dark">Request Documentation</Link></div>}
    <Dialog open={Boolean(previewDocument)} onOpenChange={(open) => { if (!open) setPreviewDocument(null); }}>
      <DialogContent className="product-document-dialog" showCloseButton>
        {previewDocument && <><DialogHeader><span className="eyebrow">Document preview</span><DialogTitle>{previewDocument.title}</DialogTitle><DialogDescription>{previewDocument.type} · {previewDocument.fileFormat}{previewDocument.size ? ` · ${previewDocument.size}` : ""}</DialogDescription></DialogHeader>{isInlinePreviewable ? <iframe className="product-document-frame" src={previewDocument.href} title={`Preview of ${previewDocument.title}`} /> : <div className="product-document-preview-unavailable"><FileText aria-hidden="true" /><h3>In-page preview is not supported for {previewDocument.fileFormat} files.</h3><p>Download the verified manufacturer document to view it in a compatible application.</p></div>}<DialogFooter><DialogClose className="button button-outline">Close Preview</DialogClose><a className="button button-gold" href={previewDocument.href} download={previewDocument.href.startsWith("/") ? "" : undefined} target={previewDocument.href.startsWith("/") ? undefined : "_blank"} rel={previewDocument.href.startsWith("/") ? undefined : "noreferrer"}><Download size={16} aria-hidden="true" /> Download Document</a></DialogFooter></>}
      </DialogContent>
    </Dialog>
  </section>;
}
