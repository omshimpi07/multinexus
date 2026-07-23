import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { servicesQuery } from "@/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Clock, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/business/services")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(servicesQuery({ businessId: "biz_bloom_bakery" })),
  component: BusinessServices,
});

function BusinessServices() {
  const { data: services } = useSuspenseQuery(servicesQuery({ businessId: "biz_bloom_bakery" }));
  const [q, setQ] = useState("");
  const filtered = services.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-sm text-muted-foreground">Bookable services with duration and price.</p>
        </div>
        <Button size="sm"><Plus className="mr-1 h-3.5 w-3.5" /> New service</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services…" className="pl-9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.id} className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-elegant">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">{s.icon}</div>
              <div className="flex gap-1">
                <button className="rounded p-1.5 hover:bg-secondary" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button className="rounded p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <h3 className="mt-3 font-semibold">{s.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold">${s.price}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {s.durationMin} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
