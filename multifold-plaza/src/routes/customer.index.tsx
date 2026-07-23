import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/shared/stat-card";
import { ordersQuery, bookingsQuery, trendingProductsQuery } from "@/services";
import { ShoppingBag, Calendar, Heart, Sparkles, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shared/product-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/customer/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(ordersQuery({ customerId: "u_customer" }));
    context.queryClient.ensureQueryData(bookingsQuery({ customerId: "u_customer" }));
    context.queryClient.ensureQueryData(trendingProductsQuery());
  },
  component: CustomerDashboard,
});

function CustomerDashboard() {
  const { data: orders } = useSuspenseQuery(ordersQuery({ customerId: "u_customer" }));
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ customerId: "u_customer" }));
  const { data: recs } = useSuspenseQuery(trendingProductsQuery());

  const upcoming = bookings.filter((b) => b.status === "upcoming" || b.status === "confirmed");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Alex 👋</h2>
        <p className="text-sm text-muted-foreground">Here's a quick look at your recent activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingBag} delta={12} />
        <StatCard label="Active Bookings" value={upcoming.length} icon={Calendar} delta={8} />
        <StatCard label="Wishlist" value={7} icon={Heart} />
        <StatCard label="Rewards" value="$42" icon={Sparkles} hint="Redeem at checkout" accent />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Complete your profile</h3>
            <p className="text-xs text-muted-foreground">4 of 6 steps completed</p>
          </div>
          <Button asChild variant="ghost" size="sm"><Link to="/customer/profile">Continue <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
        </div>
        <Progress value={66} className="mt-3" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Recent orders</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/customer/orders">View all</Link></Button>
          </div>
          <ul className="divide-y divide-border">
            {orders.slice(0, 4).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{o.id}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.items[0].name} · {o.businessName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="text-sm font-semibold">${o.total.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Upcoming bookings</h3>
            <Button asChild variant="ghost" size="sm"><Link to="/customer/bookings">View all</Link></Button>
          </div>
          {upcoming.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No upcoming bookings.</p>
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.slice(0, 4).map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{b.serviceName}</p>
                    <p className="truncate text-xs text-muted-foreground">{b.businessName} · {new Date(b.date).toLocaleString()}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Recommended for you</h3>
          <Button asChild variant="ghost" size="sm"><Link to="/products">Browse all</Link></Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recs.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
