import { cn } from "@/lib/utils";

const MAP: Record<string, string> = {
  placed: "bg-accent/10 text-accent",
  confirmed: "bg-accent/10 text-accent",
  processing: "bg-warning/10 text-warning",
  shipped: "bg-accent/10 text-accent",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
  upcoming: "bg-accent/10 text-accent",
  "no-show": "bg-destructive/10 text-destructive",
  active: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  suspended: "bg-destructive/10 text-destructive",
  published: "bg-success/10 text-success",
  flagged: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
        MAP[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}
