import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reviewsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/business/reviews")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(reviewsQuery({ businessId: "biz_bloom_bakery" })),
  component: BusinessReviews,
});

function BusinessReviews() {
  const { data: reviews } = useSuspenseQuery(reviewsQuery({ businessId: "biz_bloom_bakery" }));
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">
          {reviews.length} reviews · Average <span className="font-semibold text-foreground">{avg.toFixed(1)} ★</span>
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{r.customerName}</p>
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

            {r.reply ? (
              <div className="mt-4 rounded-lg border-l-2 border-accent bg-secondary/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Owner reply</p>
                <p className="mt-1 text-sm">{r.reply.body}</p>
              </div>
            ) : replyingTo === r.id ? (
              <div className="mt-4 space-y-2">
                <Textarea placeholder="Write a thoughtful response…" rows={3} />
                <div className="flex gap-2">
                  <Button size="sm">Post reply</Button>
                  <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(r.id)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <MessageSquare className="h-3 w-3" /> Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
