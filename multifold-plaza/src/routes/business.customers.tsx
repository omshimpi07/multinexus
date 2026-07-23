import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersQuery, bookingsQuery } from "@/services";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/business/customers")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(ordersQuery({ businessId: "biz_bloom_bakery" }));
    context.queryClient.ensureQueryData(bookingsQuery({ businessId: "biz_bloom_bakery" }));
  },
  component: BusinessCustomers,
});

function BusinessCustomers() {
  const { data: orders } = useSuspenseQuery(ordersQuery({ businessId: "biz_bloom_bakery" }));
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ businessId: "biz_bloom_bakery" }));
  const [q, setQ] = useState("");

  const customers = useMemo(() => {
    const map = new Map<string, { id: string; name: string; orders: number; bookings: number; spend: number; last: string }>();
    for (const o of orders) {
      const c = map.get(o.customerId) ?? { id: o.customerId, name: o.customerName, orders: 0, bookings: 0, spend: 0, last: o.createdAt };
      c.orders += 1;
      c.spend += o.total;
      if (o.createdAt > c.last) c.last = o.createdAt;
      map.set(o.customerId, c);
    }
    for (const b of bookings) {
      const c = map.get(b.customerId) ?? { id: b.customerId, name: b.customerName, orders: 0, bookings: 0, spend: 0, last: b.date };
      c.bookings += 1;
      c.spend += b.price;
      if (b.date > c.last) c.last = b.date;
      map.set(b.customerId, c);
    }
    return Array.from(map.values()).sort((a, b) => b.spend - a.spend);
  }, [orders, bookings]);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <p className="text-sm text-muted-foreground">People who ordered or booked from your business.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers…" className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-right">Orders</th>
              <th className="px-4 py-3 text-right">Bookings</th>
              <th className="px-4 py-3 text-right">Total spend</th>
              <th className="px-4 py-3 text-left">Last activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{c.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">{c.orders}</td>
                <td className="px-4 py-3 text-right">{c.bookings}</td>
                <td className="px-4 py-3 text-right font-semibold">${c.spend.toFixed(2)}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(c.last).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
