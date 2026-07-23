import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { ShoppingCart, Minus, Plus, Trash2, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/customer/cart")({
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal > 0 ? (subtotal > 75 ? 0 : 6.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Add products from any business to start a new order."
        action={<Link to="/products" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">Browse products</Link>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Cart</h2>
        <p className="text-sm text-muted-foreground">{count} item{count === 1 ? "" : "s"}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card shadow-card lg:col-span-2">
          {items.map((it) => (
            <li key={it.productId} className="flex items-center gap-4 p-4">
              <div className="grid h-16 w-16 place-items-center rounded-lg bg-secondary text-3xl">{it.image}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{it.name}</p>
                <p className="text-xs text-muted-foreground">{it.businessName}</p>
                <p className="mt-1 text-sm font-semibold">${it.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center rounded-md border border-border">
                <button aria-label="Decrease" onClick={() => setQty(it.productId, it.quantity - 1)} className="p-2 hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-10 text-center text-sm font-medium">{it.quantity}</span>
                <button aria-label="Increase" onClick={() => setQty(it.productId, it.quantity + 1)} className="p-2 hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <p className="hidden w-20 text-right text-sm font-semibold sm:block">${(it.price * it.quantity).toFixed(2)}</p>
              <button aria-label="Remove" onClick={() => remove(it.productId)} className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold">Order summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-success">Free</span> : `$${shipping.toFixed(2)}`}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax (est.)</dt><dd>${tax.toFixed(2)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
            </dl>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link to="/customer/checkout">Proceed to checkout</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
              <Link to="/products">Continue shopping</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-xs text-muted-foreground shadow-card space-y-2">
            <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Free shipping on orders over $75</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> Secure checkout · SSL encrypted</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
