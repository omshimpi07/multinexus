import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { Bell, LogOut, Search, X, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}
export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export function PortalShell({
  title,
  groups,
  brandTo,
  accentLabel,
  children,
}: {
  title: string;
  groups: NavGroup[];
  brandTo: string;
  accentLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  const NavList = (
    <nav className="flex-1 space-y-6 overflow-y-auto p-4">
      {groups.map((g, gi) => (
        <div key={gi}>
          {g.label && (
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {g.label}
            </p>
          )}
          <ul className="space-y-1">
            {g.items.map((it) => {
              const active = isActive(it.to);
              const Icon = it.icon;
              return (
                <li key={it.to}>
                  <Link
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{it.label}</span>
                    {it.badge && (
                      <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
                        {it.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <Link to={brandTo} className="flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              M
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">MultiNexus</p>
              <p className="text-[10px] uppercase tracking-widest text-accent">{accentLabel}</p>
            </div>
          </Link>
        </div>
        {NavList}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{(user?.name ?? "??").split(" ").map((s) => s[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{user?.name}</p>
              <p className="truncate text-[10px] text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              aria-label="Sign out"
              className="rounded p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          <div className="ml-auto flex items-center gap-1">
            <button aria-label="Search" className="rounded-full p-2 hover:bg-secondary">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-secondary">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-elegant">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
              <span className="font-bold">MultiNexus</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-md p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            {NavList}
          </aside>
        </div>
      )}
    </div>
  );
}
