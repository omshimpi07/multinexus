import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { CreditCard, Download, Check } from "lucide-react";

export const Route = createFileRoute("/business/billing")({
  component: BusinessBilling,
});

const invoices = [
  { id: "INV-2024-011", date: "2024-11-01", amount: 49, status: "completed" },
  { id: "INV-2024-010", date: "2024-10-01", amount: 49, status: "completed" },
  { id: "INV-2024-009", date: "2024-09-01", amount: 49, status: "completed" },
  { id: "INV-2024-008", date: "2024-08-01", amount: 49, status: "completed" },
];

const plans = [
  { name: "Starter", price: 0, features: ["1 storefront", "50 products", "Basic analytics"] },
  { name: "Pro", price: 49, features: ["Unlimited products", "Booking calendar", "Advanced analytics", "Priority support"], current: true },
  { name: "Enterprise", price: 199, features: ["Everything in Pro", "Multi-location", "API access", "Dedicated manager"] },
];

function BusinessBilling() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
        <p className="text-sm text-muted-foreground">Manage your plan, payment method, and invoices.</p>
      </div>

      <section>
        <h3 className="mb-4 text-base font-semibold">Plan</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-5 shadow-card ${
                p.current ? "border-accent bg-accent/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{p.name}</h4>
                {p.current && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Current</span>}
              </div>
              <p className="mt-2 text-3xl font-bold">${p.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full" variant={p.current ? "outline" : "default"} disabled={p.current}>
                {p.current ? "Current plan" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-4 text-base font-semibold">Payment method</h3>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-14 place-items-center rounded-md bg-secondary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 08/27</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Update</Button>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold">Invoices</h3>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Invoice</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td className="px-4 py-3 font-medium">{i.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.date}</td>
                  <td className="px-4 py-3 text-right">${i.amount}</td>
                  <td className="px-4 py-3"><StatusBadge status={i.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                      <Download className="h-3 w-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
