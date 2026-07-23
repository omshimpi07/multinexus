import { Link } from "@tanstack/react-router";
import type { Service } from "@/types";
import { StarRating } from "./star-rating";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$id"
      params={{ id: service.id }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition hover:shadow-elegant hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <Badge variant="secondary" className="border-0 bg-secondary">
          {service.category}
        </Badge>
        {service.popular && (
          <Badge className="border-0 bg-accent text-accent-foreground">Popular</Badge>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold tracking-tight group-hover:text-accent">
        {service.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{service.businessName}</p>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {service.durationMin} min
        </span>
        <span className="text-base font-semibold">${service.price}</span>
      </div>
    </Link>
  );
}
