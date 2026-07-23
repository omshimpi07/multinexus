import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookingsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { BookingStatus } from "@/types";

export const Route = createFileRoute("/customer/bookings/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(bookingsQuery({ customerId: "u_customer" })),
  component: Bookings,
});

const TABS: (BookingStatus | "all")[] = ["all", "upcoming", "confirmed", "completed", "cancelled"];

function Bookings() {
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ customerId: "u_customer" }));
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const filtered = bookings.filter((b) => tab === "all" || b.status === tab);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Bookings</h2>
        <p className="text-sm text-muted-foreground">Appointments and services you've booked.</p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          {TABS.map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={CalendarIcon} title="No bookings" description="Book a service to see it here." action={<Link to="/services" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">Browse services</Link>} />
      ) : (
        <div className="grid gap-4">
          {filtered.map((b) => {
            const d = new Date(b.date);
            return (
              <div key={b.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:flex-row sm:items-center">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-secondary text-center">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-muted-foreground">{d.toLocaleString("en", { month: "short" })}</p>
                    <p className="text-xl font-bold leading-none">{d.getDate()}</p>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{b.serviceName}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.businessName} · {d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {b.durationMin} min
                  </p>
                  {b.notes && <p className="mt-1 text-xs text-muted-foreground">Note: {b.notes}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <p className="text-sm font-semibold">${b.price.toFixed(2)}</p>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/customer/bookings/$id" params={{ id: b.id }}>Details <ChevronRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
