import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "mn-cart";
const WISH_KEY = "mn-wishlist";

interface CartCtx {
  items: CartItem[];
  wishlist: string[];
  add: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  toggleWish: (productId: string) => void;
  isWished: (productId: string) => boolean;
  subtotal: number;
  count: number;
}

const Ctx = createContext<CartCtx | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readJSON<CartItem[]>(CART_KEY, []));
    setWishlist(readJSON<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); } catch { /* ignore */ }
  }, [wishlist, hydrated]);

  const add: CartCtx["add"] = (p, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) return prev.map((i) => (i.productId === p.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { productId: p.id, name: p.name, price: p.price, quantity: qty, image: p.image, businessName: p.businessName }];
    });
  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((i) => i.productId !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.productId !== id) : prev.map((i) => (i.productId === id ? { ...i, quantity: qty } : i))));
  const clear = () => setItems([]);
  const toggleWish: CartCtx["toggleWish"] = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isWished = (id: string) => wishlist.includes(id);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);

  return <Ctx.Provider value={{ items, wishlist, add, remove, setQty, clear, toggleWish, isWished, subtotal, count }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
