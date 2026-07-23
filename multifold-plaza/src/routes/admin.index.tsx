import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { businessesQuery, platformStatsQuery, analyticsQuery, reviewsQuery, allBusinessesQuery } from "@/services";
import { Users, Store, DollarSign, ShoppingBag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(allBusinessesQuery());
    context.queryClient.ensureQueryData(platformStatsQuery());
    context.queryClient.ensureQueryData(analyticsQuery());
    context.queryClient.ensureQueryData(reviewsQuery());
  },
  component: AdminDashboard,
});

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-accent)"];

function AdminDashboard() {
  const { data: biz } = useSuspenseQuery(allBusinessesQuery());
  const { data: stats } = useSuspenseQuery(platformStatsQuery());
  const { data: analytics } = useSuspenseQuery(analyticsQuery());
  const { data: reviews } = useSuspenseQuery(reviewsQuery());

  const pending = biz.filter((b) => b.status === "pending");
  const flagged = reviews.filter((r) => r.status !== "published");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform overview</h2>
        <p className="text-sm text-muted-foreground">Everything happening on MultiNexus, at a glance.</p>
      </div>

      {(pending.length > 0 || flagged.length > 0) && (
        <div className="flex flex-wrap gap-3 rounded-xl border border-warning/40 bg-warning/5 p-4 text-sm">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" />
          <div className="flex-1">
            <p className="font-semibold">Items awaiting your review</p>
            <p className="text-muted-foreground">{pending.length} business application(s), {flagged.length} review(s) flagged.</p>
          </div>
          <Button asChild size="sm" variant="outline"><Link to="/admin/businesses">Review</Link></Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats.customers.toLocaleString()} icon={Users} delta={14} />
        <StatCard label="Businesses" value={stats.businesses} icon={Store} delta={6} />
        <StatCard label="Platform Revenue" value={`$${(analytics.revenue.reduce((s, r) => s + r.revenue, 0) / 1000).toFixed(0)}k`} icon={DollarSign} delta={22} accent />
        <StatCard label="Orders" value={stats.orders.toLocaleString()} icon={ShoppingBag} delta={11} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold">Customer growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.growth}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="customers" stroke="var(--color-accent)" fill="url(#grad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 text-base font-semibold">Category share</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.categoryShare} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {analytics.categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Businesses awaiting approval</h3>
          <Button asChild variant="ghost" size="sm"><Link to="/admin/businesses">Manage all</Link></Button>
        </div>
        {pending.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No businesses awaiting approval.</p>
        ) : (
          <ul className="divide-y divide-border">
            {pending.map((b) => (
              <li key={b.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-xl">{b.logo}</div>
                  <div>
                    <p className="text-sm font-medium">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.category} · {b.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={b.status} />
                  <Button size="sm" variant="outline">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
