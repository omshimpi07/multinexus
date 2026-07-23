import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookingsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/bookings")({
  loader: ({ context }) => context.queryClient.ensureQueryData(bookingsQuery()),
  component: AdminBookings,
});

function AdminBookings() {
  const { data: bookings } = useSuspenseQuery(bookingsQuery());
  const [q, setQ] = useState("");
  const filtered = bookings.filter((b) => b.customerName.toLowerCase().includes(q.toLowerCase()) || b.serviceName.toLowerCase().includes(q.toLowerCase()) || b.businessName.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">All bookings</h2>
        <p className="text-sm text-muted-foreground">{bookings.length} appointments across the marketplace.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bookings…" className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Booking</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Business</th>
              <th className="px-4 py-3 text-left">When</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium">{b.serviceName}</td>
                <td className="px-4 py-3">{b.customerName}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.businessName}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(b.date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className="px-4 py-3 text-right font-semibold">${b.price.toFixed(2)}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
