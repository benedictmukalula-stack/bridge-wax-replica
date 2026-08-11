// Bridge Wax design reminder: keep quotation capture practical and editorial,
// using the existing ink, gold, cream, and restrained card language.
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type QuoteProduct = {
  code: string;
  name: string;
  categorySlug: string;
  categoryTitle: string;
  rangeTitle?: string;
};

export type QuoteItem = QuoteProduct & { quantity: number };

type QuoteCartContextValue = {
  items: QuoteItem[];
  itemCount: number;
  isOpen: boolean;
  addItem: (product: QuoteProduct) => void;
  removeItem: (code: string) => void;
  setQuantity: (code: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "bridge-wax-quote-cart";
const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

function readStoredItems(): QuoteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((item): item is QuoteItem => item && typeof item.code === "string" && typeof item.name === "string" && typeof item.quantity === "number" && item.quantity > 0);
  } catch {
    return [];
  }
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasRestoredItems, setHasRestoredItems] = useState(false);

  useEffect(() => {
    setItems(readStoredItems());
    setHasRestoredItems(true);
  }, []);

  useEffect(() => {
    if (!hasRestoredItems || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasRestoredItems, items]);

  const value = useMemo<QuoteCartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    isOpen,
    addItem: (product) => setItems((current) => {
      const existing = current.find((item) => item.code === product.code);
      if (existing) return current.map((item) => item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    }),
    removeItem: (code) => setItems((current) => current.filter((item) => item.code !== code)),
    setQuantity: (code, quantity) => setItems((current) => quantity > 0 ? current.map((item) => item.code === code ? { ...item, quantity: Math.min(99, Math.max(1, quantity)) } : item) : current.filter((item) => item.code !== code)),
    clearCart: () => setItems([]),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [isOpen, items]);

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return context;
}
