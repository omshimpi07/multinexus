import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              M
            </div>
            <span className="text-lg font-bold tracking-tight">MultiNexus</span>
          </Link>
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-brand lg:block">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0px, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0px, transparent 45%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest opacity-70">MultiNexus</p>
          </div>
          <div>
            <blockquote className="max-w-md text-xl leading-relaxed">
              "MultiNexus doubled our weekly online orders in three months. It just works."
            </blockquote>
            <p className="mt-4 text-sm opacity-80">Sofia Reyes — Owner, Bloom Bakery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
