import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Package, Calendar, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/notifications")({
  component: Notifications,
});

interface Notif { id: string; icon: typeof Bell; title: string; body: string; time: string; read: boolean; tone: string }

const SEED: Notif[] = [
  { id: "n1", icon: Package, title: "Order shipped", body: "Order MN-1042 from Bloom Bakery is on its way.", time: "2h ago", read: false, tone: "text-accent" },
  { id: "n2", icon: Calendar, title: "Booking confirmed", body: "Deep clean with Fresh Home Cleaners on Fri 12:00.", time: "1d ago", read: false, tone: "text-success" },
  { id: "n3", icon: Sparkles, title: "Rewards earned", body: "You just earned $8 in MultiNexus credit.", time: "3d ago", read: true, tone: "text-warning" },
  { id: "n4", icon: Package, title: "Order delivered", body: "Order MN-1015 was delivered. Leave a review?", time: "1w ago", read: true, tone: "text-accent" },
];

function Notifications() {
  const [items, setItems] = useState<Notif[]>(SEED);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">{unread} unread</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setItems((i) => i.map((n) => ({ ...n, read: true })))}>
          <Check className="mr-1 h-3.5 w-3.5" /> Mark all read
        </Button>
      </div>

      <ul className="divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
        {items.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.id} className={cn("flex items-start gap-4 p-4", !n.read && "bg-accent/5")}>
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary", n.tone)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 rounded-full bg-accent" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
