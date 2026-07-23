import { Link } from "@tanstack/react-router";
import { MapPin, Clock } from "lucide-react";
import type { Business } from "@/types";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/ui/badge";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      to="/businesses/$id"
      params={{ id: business.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:shadow-elegant hover:-translate-y-0.5"
    >
      <div
        className="relative flex h-32 items-center justify-center text-5xl"
        style={{ background: business.coverGradient }}
      >
        <span className="drop-shadow">{business.logo}</span>
        <Badge
          className="absolute right-3 top-3 border-0 bg-white/95 text-foreground"
          variant="secondary"
        >
          {business.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold tracking-tight group-hover:text-accent">
            {business.name}
          </h3>
          <span
            className={
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium " +
              (business.isOpen ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")
            }
          >
            <Clock className="h-2.5 w-2.5" />
            {business.isOpen ? "Open" : "Closed"}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{business.tagline}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {business.city}
          </span>
          <StarRating value={business.rating} count={business.reviewCount} size={12} />
        </div>
      </div>
    </Link>
  );
}
