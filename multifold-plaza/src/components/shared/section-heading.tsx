import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between " +
        (align === "center" ? "text-center sm:flex-col sm:items-center" : "")
      }
    >
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
