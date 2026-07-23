import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { servicesQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { Search, Flag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/services")({
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery()),
  component: AdminServices,
});

function AdminServices() {
  const { data: services } = useSuspenseQuery(servicesQuery());
  const [q, setQ] = useState("");
  const filtered = services.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.businessName.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">All services</h2>
        <p className="text-sm text-muted-foreground">{services.length} services offered platform-wide.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services…" className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Business</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Duration</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.businessName}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.category}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{s.durationMin}m</td>
                <td className="px-4 py-3 text-right font-semibold">${s.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded p-1.5 text-warning hover:bg-warning/10" aria-label="Flag"><Flag className="h-3.5 w-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
