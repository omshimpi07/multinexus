import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reviewsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Star, Check, Trash2 } from "lucide-react";
import { useState } from "react";

const TABS = ["all", "flagged", "pending", "published"] as const;

export const Route = createFileRoute("/admin/reviews")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQuery()),
  component: AdminReviews,
});

function AdminReviews() {
  const { data: reviews } = useSuspenseQuery(reviewsQuery());
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const filtered = tab === "all" ? reviews : reviews.filter((r) => r.status === tab);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">Moderate flagged and pending reviews.</p>
      </div>

      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => {
          const count = t === "all" ? reviews.length : reviews.filter((r) => r.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t} <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.customerName}</p>
                  <span className="text-xs text-muted-foreground">on {r.businessName}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex text-warning">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <p className="mt-3 text-sm font-medium">{r.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            {r.status !== "published" && (
              <div className="mt-4 flex gap-2">
                <Button size="sm"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                <Button size="sm" variant="outline"><Trash2 className="mr-1 h-3.5 w-3.5" /> Remove</Button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">Nothing here — you're all caught up.</p>}
      </div>
    </div>
  );
}
