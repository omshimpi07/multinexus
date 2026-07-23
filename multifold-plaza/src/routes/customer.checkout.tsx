import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/checkout")({
  component: Checkout,
});

const STEPS = [
  { key: "shipping", label: "Shipping", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: Package },
] as const;

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<(typeof STEPS)[number]["key"]>("shipping");
  const [shipping, setShipping] = useState({ name: "Alex Morgan", line1: "742 Evergreen Terrace", city: "Portland", region: "OR", postal: "97205", country: "USA" });
  const [payment, setPayment] = useState({ method: "card", cardName: "Alex Morgan", cardNumber: "4242 4242 4242 4242", exp: "12/29", cvc: "123" });

  const shippingCost = subtotal > 75 ? 0 : 6.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <Button asChild className="mt-4"><Link to="/products">Browse products</Link></Button>
      </div>
    );
  }

  const advance = () => {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("review");
    else {
      clear();
      toast.success("Order placed!");
      navigate({ to: "/customer/checkout/success" });
    }
  };

  const activeIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
        <p className="text-sm text-muted-foreground">Complete your order in a few steps.</p>
      </div>

      <ol className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 shadow-card">
        {STEPS.map((s, i) => {
          const done = i < activeIdx;
          const active = i === activeIdx;
          const Icon = done ? Check : s.icon;
          return (
            <li key={s.key} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-primary/10 text-foreground" : "text-muted-foreground"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${done || active ? "bg-primary text-primary-foreground" : "bg-muted"}`}><Icon className="h-3 w-3" /></span>
              <span className="font-medium">{s.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          {step === "shipping" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Shipping address</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label>Full name</Label><Input value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label>Address</Label><Input value={shipping.line1} onChange={(e) => setShipping({ ...shipping, line1: e.target.value })} /></div>
                <div><Label>City</Label><Input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} /></div>
                <div><Label>Region</Label><Input value={shipping.region} onChange={(e) => setShipping({ ...shipping, region: e.target.value })} /></div>
                <div><Label>Postal code</Label><Input value={shipping.postal} onChange={(e) => setShipping({ ...shipping, postal: e.target.value })} /></div>
                <div><Label>Country</Label><Input value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} /></div>
              </div>
            </div>
          )}
          {step === "payment" && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Payment method</h3>
              <RadioGroup value={payment.method} onValueChange={(v) => setPayment({ ...payment, method: v })}>
                <div className="flex items-center gap-2 rounded-lg border border-border p-3"><RadioGroupItem value="card" id="card" /><Label htmlFor="card" className="flex-1">Credit / Debit card</Label></div>
                <div className="flex items-center gap-2 rounded-lg border border-border p-3"><RadioGroupItem value="paypal" id="paypal" /><Label htmlFor="paypal" className="flex-1">PayPal</Label></div>
                <div className="flex items-center gap-2 rounded-lg border border-border p-3"><RadioGroupItem value="apple" id="apple" /><Label htmlFor="apple" className="flex-1">Apple Pay</Label></div>
              </RadioGroup>
              {payment.method === "card" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>Name on card</Label><Input value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label>Card number</Label><Input value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} /></div>
                  <div><Label>Expiry</Label><Input value={payment.exp} onChange={(e) => setPayment({ ...payment, exp: e.target.value })} /></div>
                  <div><Label>CVC</Label><Input value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} /></div>
                </div>
              )}
            </div>
          )}
          {step === "review" && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold">Review your order</h3>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ship to</p>
                <p className="mt-1 text-sm">{shipping.name}<br />{shipping.line1}, {shipping.city}, {shipping.region} {shipping.postal}, {shipping.country}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment</p>
                <p className="mt-1 text-sm capitalize">{payment.method === "card" ? `Card ending ${payment.cardNumber.slice(-4)}` : payment.method}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</p>
                <ul className="mt-2 divide-y divide-border">
                  {items.map((it) => (
                    <li key={it.productId} className="flex items-center justify-between py-2 text-sm">
                      <span>{it.name} × {it.quantity}</span>
                      <span className="font-medium">${(it.price * it.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(step === "review" ? "payment" : step === "payment" ? "shipping" : "shipping")} disabled={step === "shipping"}>
              Back
            </Button>
            <Button onClick={advance}>
              {step === "review" ? `Place order · $${total.toFixed(2)}` : "Continue"}
            </Button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold">Order summary</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.productId} className="flex items-center justify-between">
                <span className="truncate">{it.name} × {it.quantity}</span>
                <span className="font-medium">${(it.price * it.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>${tax.toFixed(2)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
