import type { Review } from "@/types";
import { StarRating } from "./star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback>{review.customerName.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">{review.customerName}</p>
            <StarRating value={review.rating} size={12} />
          </div>
          <p className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
          <h4 className="mt-2 text-sm font-semibold">{review.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
          {review.reply && (
            <div className="mt-3 rounded-lg border-l-2 border-accent bg-secondary p-3">
              <p className="text-xs font-semibold text-accent">Response from {review.businessName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{review.reply.body}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
