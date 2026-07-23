import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/types";
import { Users, Store, ShieldCheck, LogOut, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES: { key: UserRole; label: string; icon: typeof Users; to: string }[] = [
  { key: "customer", label: "Customer", icon: Users, to: "/customer" },
  { key: "business", label: "Business Owner", icon: Store, to: "/business" },
  { key: "admin", label: "Admin", icon: ShieldCheck, to: "/admin" },
];

/**
 * Dev-only floating role switcher. Lets you preview any portal without wiring
 * real auth. Never ships to production auth — remove when integrating.
 */
export function RoleSwitcher() {
  const { role, loginAs, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Hide on auth pages
  if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password") || pathname.startsWith("/verify-email")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {open ? (
        <div className="w-64 rounded-xl border border-border bg-card p-3 shadow-elegant">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preview as
            </span>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-secondary"
              aria-label="Close role switcher"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.key;
              return (
                <Link
                  key={r.key}
                  to={r.to}
                  onClick={() => {
                    loginAs(r.key);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm transition",
                    active ? "bg-accent text-accent-foreground" : "hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{r.label}</span>
                </Link>
              );
            })}
          </div>
          {role && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="mt-2 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-elegant transition hover:bg-secondary"
        >
          <ChevronUp className="h-3.5 w-3.5" />
          {role ? `Viewing as ${role}` : "Preview portals"}
        </button>
      )}
    </div>
  );
}
