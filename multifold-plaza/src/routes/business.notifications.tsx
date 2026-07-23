import { createFileRoute } from "@tanstack/react-router";
import { Bell, ShoppingBag, Calendar, Star, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/business/notifications")({
  component: BusinessNotifications,
});

const items = [
  { id: "n1", icon: ShoppingBag, title: "New order #ORD-4821", body: "Alex Morgan ordered 3 items — $48.50", time: "2m ago", unread: true, color: "text-accent bg-accent/10" },
  { id: "n2", icon: Calendar, title: "Booking confirmed", body: "Haircut & style — tomorrow at 2:00 PM", time: "1h ago", unread: true, color: "text-chart-2 bg-chart-2/10" },
  { id: "n3", icon: Star, title: "New 5-star review", body: '"Best sourdough in town!" — Jamie L.', time: "3h ago", unread: false, color: "text-warning bg-warning/10" },
  { id: "n4", icon: AlertCircle, title: "Low stock warning", body: "Croissant is down to 4 units", time: "Yesterday", unread: false, color: "text-destructive bg-destructive/10" },
];

function BusinessNotifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">Activity across your business.</p>
        </div>
        <button className="text-xs font-medium text-accent hover:underline">Mark all as read</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <ul className="divide-y divide-border">
          {items.map((n) => {
            const Icon = n.icon;
            return (
              <li key={n.id} className={`flex gap-3 p-4 ${n.unread ? "bg-accent/5" : ""}`}>
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${n.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                </div>
                {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
              </li>
            );
          })}
        </ul>
        {items.length === 0 && (
          <div className="grid place-items-center p-10 text-center">
            <Bell className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
