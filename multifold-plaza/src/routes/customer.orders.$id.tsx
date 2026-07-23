import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersQuery } from "@/services";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Package, Truck, Home, Circle } from "lucide-react";
import type { OrderStatus } from "@/types";

export const Route = createFileRoute("/customer/orders/$id")({
  loader: async ({ context, params }) => {
    const list = await context.queryClient.ensureQueryData(ordersQuery({ customerId: "u_customer" }));
    if (!list.find((o) => o.id === params.id)) throw notFound();
  },
  component: OrderDetail,
  notFoundComponent: () => (
    <div className="py-16 text-center">
      <p className="text-lg font-semibold">Order not found</p>
      <Button asChild className="mt-4"><Link to="/customer/orders">Back to orders</Link></Button>
    </div>
  ),
});

const STEPS: { key: OrderStatus; label: string; icon: typeof Package }[] = [
  { key: "placed", label: "Placed", icon: CheckCircle2 },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "completed", label: "Delivered", icon: Home },
];

function OrderDetail() {
  const { id } = Route.useParams();
  const { data: orders } = useSuspenseQuery(ordersQuery({ customerId: "u_customer" }));
  const order = orders.find((o) => o.id === id)!;
  const activeIdx = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/customer/orders"><ArrowLeft className="mr-1 h-4 w-4" /> All orders</Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order {order.id}</h2>
          <p className="text-sm text-muted-foreground">
            Placed {new Date(order.createdAt).toLocaleString()} · {order.businessName}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {order.status !== "cancelled" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold">Progress</h3>
          <ol className="mt-6 grid gap-6 sm:grid-cols-5">
            {STEPS.map((s, i) => {
              const done = i <= activeIdx;
              const Icon = done ? s.icon : Circle;
              return (
                <li key={s.key} className="relative flex flex-col items-center text-center">
                  {i < STEPS.length - 1 && (
                    <span className={`absolute left-1/2 top-4 hidden h-px w-full sm:block ${i < activeIdx ? "bg-accent" : "bg-border"}`} />
                  )}
                  <span className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 ${done ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`mt-2 text-xs font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold">Items</h3>
          <ul className="divide-y divide-border">
            {order.items.map((it) => (
              <li key={it.productId} className="flex items-center gap-4 py-3">
                <div className="grid h-14 w-14 place-items-center rounded-lg bg-secondary text-2xl">{it.image}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{it.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {it.quantity} × ${it.price.toFixed(2)}</p>
                </div>
                <p className="text-sm font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold">Summary</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${order.subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>${order.shipping.toFixed(2)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 font-semibold"><dt>Total</dt><dd>${order.total.toFixed(2)}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold">Shipping address</h3>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
