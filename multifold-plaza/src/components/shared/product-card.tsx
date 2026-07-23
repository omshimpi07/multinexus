import { Link } from "@tanstack/react-router";
import type { Product } from "@/types";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:shadow-elegant hover:-translate-y-0.5"
    >
      <div className="relative flex h-36 items-center justify-center bg-secondary text-6xl">
        <span>{product.image}</span>
        {onSale && (
          <Badge className="absolute left-3 top-3 border-0 bg-destructive text-destructive-foreground">Sale</Badge>
        )}
        {product.trending && !onSale && (
          <Badge className="absolute left-3 top-3 border-0 bg-accent text-accent-foreground">Trending</Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted-foreground">{product.businessName}</p>
        <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold tracking-tight group-hover:text-accent">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold">${product.price.toFixed(2)}</span>
          {onSale && (
            <span className="text-xs text-muted-foreground line-through">${product.compareAtPrice?.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-2">
          <StarRating value={product.rating} count={product.reviewCount} size={11} />
        </div>
      </div>
    </Link>
  );
}
