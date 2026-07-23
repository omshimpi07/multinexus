import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookingsQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/bookings/$id")({
  loader: async ({ context, params }) => {
    const list = await context.queryClient.ensureQueryData(bookingsQuery({ customerId: "u_customer" }));
    if (!list.find((b) => b.id === params.id)) throw notFound();
  },
  component: BookingDetail,
  notFoundComponent: () => (
    <div className="py-16 text-center">
      <p className="text-lg font-semibold">Booking not found</p>
      <Button asChild className="mt-4"><Link to="/customer/bookings">Back</Link></Button>
    </div>
  ),
});

function BookingDetail() {
  const { id } = Route.useParams();
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ customerId: "u_customer" }));
  const b = bookings.find((x) => x.id === id)!;
  const d = new Date(b.date);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/customer/bookings"><ArrowLeft className="mr-1 h-4 w-4" /> All bookings</Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{b.serviceName}</h2>
          <p className="text-sm text-muted-foreground">Booking {b.id} · {b.businessName}</p>
        </div>
        <StatusBadge status={b.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-accent" /> {d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
          <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-accent" /> {d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {b.durationMin} min</div>
          <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-accent" /> On-site at {b.businessName}</div>
          {b.notes && <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">{b.notes}</div>}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="mt-1 text-3xl font-bold">${b.price.toFixed(2)}</p>
          </div>
          {(b.status === "upcoming" || b.status === "confirmed") && (
            <div className="flex flex-col gap-2">
              <Button onClick={() => toast.success("Reschedule request sent")}>Reschedule</Button>
              <Button variant="outline" onClick={() => toast.success("Booking cancelled")}>Cancel booking</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
