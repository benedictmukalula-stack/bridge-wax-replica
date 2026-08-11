// Bridge Wax design reminder: the quote basket should feel like a calm,
// high-trust request sheet rather than a retail checkout or dark dashboard.
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuoteCart } from "../contexts/QuoteCartContext";

export function AddToQuoteButton({ product }: { product: import("../contexts/QuoteCartContext").QuoteProduct }) {
  const { addItem, items, openCart } = useQuoteCart();
  const selected = items.some((item) => item.code === product.code);
  const handleClick = () => selected ? openCart() : addItem(product);
  return <button type="button" className={selected ? "add-to-quote is-selected" : "add-to-quote"} onClick={handleClick} aria-label={selected ? `${product.name} is in the quotation basket` : `Add ${product.name} to quotation basket`}><ShoppingBag size={14} />{selected ? "In quote basket" : "Add to quote"}</button>;
}

export function QuoteCartButton() {
  const { itemCount, openCart } = useQuoteCart();
  return <button type="button" className="quote-cart-trigger" onClick={openCart} aria-label={`Open cart${itemCount ? ` with ${itemCount} selected item${itemCount === 1 ? "" : "s"}` : ""}`}><ShoppingBag size={18} /><span>Cart</span>{itemCount > 0 && <b>{itemCount}</b>}</button>;
}

export default function QuoteCart() {
  const { items, isOpen, closeCart, removeItem, setQuantity, clearCart } = useQuoteCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  if (!isOpen) return null;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productLines = items.map((item) => `- ${item.name} (${item.code}) — Quantity: ${item.quantity}${item.rangeTitle ? ` — ${item.rangeTitle}` : ""}`).join("\n");
    const body = [
      "Quotation Request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      "",
      "Requested products:",
      productLines,
      "",
      `Additional requirements: ${message || "None provided"}`,
    ].join("\n");
    window.location.href = `mailto:info@bridgewax.com?subject=${encodeURIComponent(`Quotation request from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return <div className="quote-cart-layer" role="dialog" aria-modal="true" aria-labelledby="quote-cart-title">
    <button type="button" className="quote-cart-backdrop" onClick={closeCart} aria-label="Close quotation basket" />
    <aside className="quote-cart-panel">
      <div className="quote-cart-header"><div><span className="eyebrow">Quotation basket</span><h2 id="quote-cart-title">Your selected products</h2></div><button type="button" className="quote-cart-close" onClick={closeCart} aria-label="Close quotation basket"><X size={21} /></button></div>
      {items.length === 0 ? <div className="quote-cart-empty"><ShoppingBag size={28} /><h3>Your basket is empty</h3><p>Select products from any catalogue and add them here to request a quotation.</p><button type="button" className="button button-dark" onClick={closeCart}>Continue browsing</button></div> : <>
        <div className="quote-cart-items">{items.map((item) => <div className="quote-cart-item" key={item.code}>
          <div className="quote-cart-item-copy"><strong>{item.name}</strong><small>{item.code} · {item.categoryTitle}{item.rangeTitle ? ` · ${item.rangeTitle}` : ""}</small></div>
          <div className="quote-cart-item-actions"><div className="quantity-control"><button type="button" onClick={() => setQuantity(item.code, item.quantity - 1)} aria-label={`Decrease quantity for ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" onClick={() => setQuantity(item.code, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`}><Plus size={13} /></button></div><button type="button" className="quote-cart-remove" onClick={() => removeItem(item.code)} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button></div>
        </div>)}</div>
        <form className="quote-cart-form" onSubmit={submit}><div className="quote-cart-form-heading"><h3>Send request for quotation</h3><button type="button" className="quote-cart-clear" onClick={clearCart}>Clear basket</button></div><div className="quote-cart-form-row"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" aria-label="Full name" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" /></div><input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company (optional)" aria-label="Company" /><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} placeholder="Tell us about your requirements (optional)" aria-label="Additional requirements" /><p className="quote-cart-recipient">Your request will be addressed only to <strong>info@bridgewax.com</strong>.</p><button type="submit" className="button button-gold quote-cart-submit"><Send size={16} /> Send quotation request</button></form>
      </>}
    </aside>
  </div>;
}
