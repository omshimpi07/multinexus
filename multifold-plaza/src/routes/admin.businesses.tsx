import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { allBusinessesQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Check, X, Ban } from "lucide-react";
import { useState } from "react";
import type { BusinessStatus } from "@/types";

const STATUSES: (BusinessStatus | "all")[] = ["all", "pending", "active", "suspended"];

export const Route = createFileRoute("/admin/businesses")({
  loader: ({ context }) => context.queryClient.ensureQueryData(allBusinessesQuery()),
  component: AdminBusinesses,
});

function AdminBusinesses() {
  const { data: businesses } = useSuspenseQuery(allBusinessesQuery());
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<BusinessStatus | "all">("all");

  const filtered = businesses.filter((b) => {
    if (status !== "all" && b.status !== status) return false;
    if (q && !b.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Businesses</h2>
        <p className="text-sm text-muted-foreground">Approve applications and moderate merchants.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search businesses…" className="pl-9" />
        </div>
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                status === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Business</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-right">Rating</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-xl">{b.logo}</div>
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.tagline}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{b.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.city}</td>
                <td className="px-4 py-3 text-right">★ {b.rating.toFixed(1)}</td>
                <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    {b.status === "pending" && (
                      <>
                        <Button size="sm" variant="outline"><X className="mr-1 h-3.5 w-3.5" /> Reject</Button>
                        <Button size="sm"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                      </>
                    )}
                    {b.status === "active" && (
                      <Button size="sm" variant="ghost"><Ban className="mr-1 h-3.5 w-3.5" /> Suspend</Button>
                    )}
                    {b.status === "suspended" && (
                      <Button size="sm" variant="outline">Reactivate</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
