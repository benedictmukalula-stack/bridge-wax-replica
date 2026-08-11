/* Bridge Wax design reminder: keep cart selection calm and clear while the server handles delivery from the verified domain mailbox. */
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { trpc } from "../lib/trpc";
import { useQuoteCart } from "../contexts/QuoteCartContext";

export function AddToQuoteButton({ product }: { product: import("../contexts/QuoteCartContext").QuoteProduct }) {
  const { addItem, items, openCart } = useQuoteCart();
  const selected = items.some((item) => item.code === product.code);
  const handleClick = () => selected ? openCart() : addItem(product);
  return <button type="button" className={selected ? "add-to-quote is-selected" : "add-to-quote"} onClick={handleClick} aria-label={selected ? `${product.name} is in the cart` : `Add ${product.name} to cart`}><ShoppingBag size={14} />{selected ? "In cart" : "Add to cart"}</button>;
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
  const [requirements, setRequirements] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const quoteRequest = trpc.quoteRequest.send.useMutation();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setShowClearConfirm(false);
  }, [isOpen]);

  useEffect(() => {
    if (items.length > 0) setSubmitted(false);
  }, [items.length]);

  const openMailtoFallback = () => {
    const productLines = items.map((item) => `- ${item.name} (${item.code}) — Quantity: ${item.quantity}${item.rangeTitle ? ` — ${item.rangeTitle}` : ""}`).join("\n");
    const body = ["Quotation Request", "", `Name: ${name}`, `Email: ${email}`, `Company: ${company || "Not provided"}`, "", "Requested products:", productLines, "", `Additional requirements: ${requirements || "None provided"}`].join("\n");
    window.location.href = `mailto:info@bridgewax.com?subject=${encodeURIComponent(`Quotation request from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    try {
      await quoteRequest.mutateAsync({
        name,
        email,
        company: company || undefined,
        requirements: requirements || undefined,
        products: items.map(({ name: productName, code, categoryTitle, rangeTitle, quantity }) => ({ name: productName, code, categoryTitle, rangeTitle, quantity })),
      });
      clearCart();
      setSubmitted(true);
      setRequirements("");
    } catch {
      setSubmitError("We could not send the request automatically. You can use your email app instead.");
    }
  };

  if (!isOpen) return null;

  return <div className="quote-cart-layer" role="dialog" aria-modal="true" aria-labelledby="quote-cart-title">
    <button type="button" className="quote-cart-backdrop" onClick={closeCart} aria-label="Close quotation basket" />
    <aside className="quote-cart-panel">
      <div className="quote-cart-header"><div><span className="eyebrow">Quotation basket</span><h2 id="quote-cart-title">Your selected products</h2></div><button type="button" className="quote-cart-close" onClick={closeCart} aria-label="Close quotation basket"><X size={21} /></button></div>
      {submitted && <p className="quote-cart-submission-success" role="status">Your quotation request has been sent to info@bridgewax.com.</p>}
      {items.length === 0 ? <div className="quote-cart-empty"><ShoppingBag size={28} /><h3>Your basket is empty</h3><p>Select products from any catalogue and add them here to request a quotation.</p><button type="button" className="button button-dark" onClick={closeCart}>Continue browsing</button></div> : <>
        <div className="quote-cart-items">{items.map((item) => <div className="quote-cart-item" key={item.code}>
          <div className="quote-cart-item-copy"><strong>{item.name}</strong><small>{item.code} · {item.categoryTitle}{item.rangeTitle ? ` · ${item.rangeTitle}` : ""}</small></div>
          <div className="quote-cart-item-actions"><div className="quantity-control"><button type="button" onClick={() => setQuantity(item.code, item.quantity - 1)} aria-label={`Decrease quantity for ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" onClick={() => setQuantity(item.code, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`}><Plus size={13} /></button></div><button type="button" className="quote-cart-remove" onClick={() => removeItem(item.code)} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button></div>
        </div>)}</div>
        <form className="quote-cart-form" onSubmit={submit}><div className="quote-cart-form-heading"><h3>Send request for quotation</h3><button type="button" className="quote-cart-clear" onClick={() => setShowClearConfirm(true)} aria-label="Clear cart"><Trash2 size={14} /> Clear Cart</button></div>{showClearConfirm && <div className="clear-cart-confirmation" role="alertdialog" aria-labelledby="clear-cart-title" aria-describedby="clear-cart-description"><div><strong id="clear-cart-title">Clear all selected products?</strong><p id="clear-cart-description">This will remove every item from your cart. You can add products again at any time.</p></div><div className="clear-cart-confirmation-actions"><button type="button" className="button button-small button-outline-dark" onClick={() => setShowClearConfirm(false)}>Cancel</button><button type="button" className="button button-small button-danger" onClick={() => { clearCart(); setShowClearConfirm(false); }}>Clear Cart</button></div></div>}{submitError && <div className="quote-cart-submit-error" role="alert"><span>{submitError}</span><button type="button" className="button button-small button-outline-dark" onClick={openMailtoFallback}>Open email app</button></div>}<div className="quote-cart-form-row"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" aria-label="Full name" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" /></div><input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company (optional)" aria-label="Company" /><textarea value={requirements} onChange={(event) => setRequirements(event.target.value)} rows={3} placeholder="Tell us about your requirements (optional)" aria-label="Additional requirements" /><p className="quote-cart-recipient">Your request will be sent securely from <strong>info@bridgewax.com</strong> and delivered only to <strong>info@bridgewax.com</strong>.</p><button type="submit" className="button button-gold quote-cart-submit" disabled={quoteRequest.isPending}><Send size={16} /> {quoteRequest.isPending ? "Sending request…" : "Send quotation request"}</button></form>
      </>}
    </aside>
  </div>;
}
