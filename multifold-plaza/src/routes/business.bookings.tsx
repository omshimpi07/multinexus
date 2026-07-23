import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookingsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Calendar, Clock, User } from "lucide-react";

export const Route = createFileRoute("/business/bookings")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(bookingsQuery({ businessId: "biz_bloom_bakery" })),
  component: BusinessBookings,
});

function BusinessBookings() {
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ businessId: "biz_bloom_bakery" }));
  const sorted = [...bookings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
        <p className="text-sm text-muted-foreground">Upcoming and past appointments.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sorted.map((b) => {
          const d = new Date(b.date);
          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{b.serviceName}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" /> {b.customerName}
                    </p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}{" · "}
                  {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> {b.durationMin} min
                </span>
                <span className="font-semibold text-foreground">${b.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
