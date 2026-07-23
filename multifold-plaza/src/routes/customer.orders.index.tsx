import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { ShoppingBag, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/customer/orders/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(ordersQuery({ customerId: "u_customer" })),
  component: OrdersList,
});

const FILTERS: (OrderStatus | "all")[] = ["all", "placed", "processing", "shipped", "completed", "cancelled"];

function OrdersList() {
  const { data: orders } = useSuspenseQuery(ordersQuery({ customerId: "u_customer" }));
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof FILTERS)[number]>("all");

  const filtered = orders.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (q && !(`${o.id} ${o.businessName} ${o.items[0]?.name ?? ""}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
        <p className="text-sm text-muted-foreground">{orders.length} orders placed to date.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            {FILTERS.map((f) => (
              <TabsTrigger key={f} value={f} className="capitalize">{f}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders" className="pl-8 sm:w-72" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="No orders here yet" description="Try a different filter or place your first order." action={<Link to="/products" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">Browse products</Link>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                  </td>
                  <td className="px-4 py-3">{o.businessName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-right font-semibold">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to="/customer/orders/$id" params={{ id: o.id }} className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                      View <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
