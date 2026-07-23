import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  count,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const stars = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= stars ? "fill-warning text-warning" : "text-muted-foreground/30"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && <span className="font-medium">{value.toFixed(1)}</span>}
      {typeof count === "number" && (
        <span className="text-muted-foreground">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
