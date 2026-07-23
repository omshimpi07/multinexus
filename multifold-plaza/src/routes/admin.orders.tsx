import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/orders")({
  loader: ({ context }) => context.queryClient.ensureQueryData(ordersQuery()),
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders } = useSuspenseQuery(ordersQuery());
  const [q, setQ] = useState("");
  const filtered = orders.filter((o) => o.id.toLowerCase().includes(q.toLowerCase()) || o.customerName.toLowerCase().includes(q.toLowerCase()) || o.businessName.toLowerCase().includes(q.toLowerCase()));

  const gmv = orders.reduce((s, o) => s + o.total, 0);
  const commission = gmv * 0.08;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">All orders</h2>
        <p className="text-sm text-muted-foreground">
          GMV <span className="font-semibold text-foreground">${gmv.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> · Platform commission (8%) <span className="font-semibold text-accent">${commission.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, customer, business…" className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Business</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.businessName}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right font-semibold">${o.total.toFixed(2)}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
