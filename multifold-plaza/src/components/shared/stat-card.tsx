import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
  accent = false,
  className,
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  delta?: number;
  hint?: string;
  accent?: boolean;
  className?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-card transition hover:shadow-elegant",
        accent && "border-accent/40 bg-gradient-to-br from-card to-secondary",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="rounded-lg bg-secondary p-2 text-accent">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {(typeof delta === "number" || hint) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {typeof delta === "number" && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
              )}
            >
              {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {positive ? "+" : ""}
              {delta}%
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      )}
    </div>
  );
}
