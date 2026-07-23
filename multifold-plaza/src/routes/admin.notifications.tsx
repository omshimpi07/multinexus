import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Store, Flag, Star } from "lucide-react";
import { useState } from "react";

const initial = [
  { id: "n1", icon: Store, title: "New business application", body: "Rooted Barbers submitted an application for review.", time: "2h ago", read: false, tone: "accent" as const },
  { id: "n2", icon: Flag, title: "Review flagged", body: "A review on Bloom Bakery was flagged as spam.", time: "4h ago", read: false, tone: "warning" as const },
  { id: "n3", icon: AlertTriangle, title: "Payment gateway warning", body: "Stripe reported elevated failure rates in the last hour.", time: "yesterday", read: true, tone: "destructive" as const },
  { id: "n4", icon: Star, title: "Milestone reached", body: "MultiNexus crossed 10k active customers this month.", time: "2d ago", read: true, tone: "accent" as const },
];

export const Route = createFileRoute("/admin/notifications")({
  component: AdminNotifications,
});

function AdminNotifications() {
  const [items, setItems] = useState(initial);
  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">{unread} unread</p>
        </div>
        <button onClick={() => setItems((xs) => xs.map((x) => ({ ...x, read: true })))} className="text-xs font-medium text-accent hover:underline">
          Mark all as read
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((n) => {
          const Icon = n.icon;
          const tone = n.tone === "warning" ? "bg-warning/10 text-warning" : n.tone === "destructive" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent";
          return (
            <li
              key={n.id}
              onClick={() => setItems((xs) => xs.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                n.read ? "border-border bg-card" : "border-accent/30 bg-accent/5"
              }`}
            >
              <div className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="text-xs text-muted-foreground">{n.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
