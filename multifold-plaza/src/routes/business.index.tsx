import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ordersQuery, bookingsQuery, productsQuery, reviewsQuery, analyticsQuery } from "@/services";
import { DollarSign, ShoppingBag, Calendar, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/business/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(ordersQuery({ businessId: "biz_bloom_bakery" }));
    context.queryClient.ensureQueryData(bookingsQuery({ businessId: "biz_bloom_bakery" }));
    context.queryClient.ensureQueryData(productsQuery({ businessId: "biz_bloom_bakery" }));
    context.queryClient.ensureQueryData(reviewsQuery({ businessId: "biz_bloom_bakery" }));
    context.queryClient.ensureQueryData(analyticsQuery());
  },
  component: BusinessDashboard,
});

function BusinessDashboard() {
  const { data: orders } = useSuspenseQuery(ordersQuery({ businessId: "biz_bloom_bakery" }));
  const { data: bookings } = useSuspenseQuery(bookingsQuery({ businessId: "biz_bloom_bakery" }));
  const { data: products } = useSuspenseQuery(productsQuery({ businessId: "biz_bloom_bakery" }));
  const { data: reviews } = useSuspenseQuery(reviewsQuery({ businessId: "biz_bloom_bakery" }));
  const { data: analytics } = useSuspenseQuery(analyticsQuery());

  const revenue = analytics.revenue.reduce((s, r) => s + r.revenue, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Good morning, Sofia 👋</h2>
          <p className="text-sm text-muted-foreground">Here's how Bloom Bakery is performing.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Plus className="mr-1 h-3.5 w-3.5" /> New product</Button>
          <Button size="sm">Add service</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (12mo)" value={`$${(revenue / 1000).toFixed(1)}k`} icon={DollarSign} delta={18} />
        <StatCard label="Orders" value={orders.length} icon={ShoppingBag} delta={9} />
        <StatCard label="Bookings" value={bookings.length} icon={Calendar} delta={-3} />
        <StatCard label="Products" value={products.length} icon={Package} accent />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Revenue over time</h3>
            <select className="rounded-md border border-input bg-background px-2 py-1 text-xs">
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-accent)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-base font-semibold">Bookings volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.bookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="bookings" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-base font-semibold">Recent orders</h3>
          <ul className="divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{o.id}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.customerName} · {o.items.length} item(s)</p>
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
          <h3 className="mb-4 text-base font-semibold">Latest reviews</h3>
          <ul className="space-y-3">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{r.customerName}</p>
                  <span className="text-xs text-warning">{"★".repeat(r.rating)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
