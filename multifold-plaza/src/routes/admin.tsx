import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/layout/portal-shell";
import { LayoutDashboard, Users, Store, Tag, Package, Wrench, ShoppingBag, Calendar, Star, Flag, BarChart3, Settings, Bell } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: () => (
    <PortalShell
      title="Platform Admin"
      brandTo="/admin"
      accentLabel="Admin"
      groups={[
        { items: [
          { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        ]},
        { label: "Platform", items: [
          { to: "/admin/users", label: "Users", icon: Users },
          { to: "/admin/businesses", label: "Businesses", icon: Store, badge: "1" },
          { to: "/admin/categories", label: "Categories", icon: Tag },
        ]},
        { label: "Content", items: [
          { to: "/admin/products", label: "Products", icon: Package },
          { to: "/admin/services", label: "Services", icon: Wrench },
          { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
          { to: "/admin/bookings", label: "Bookings", icon: Calendar },
          { to: "/admin/reviews", label: "Reviews", icon: Star },
          { to: "/admin/reports", label: "Reports", icon: Flag },
        ]},
        { label: "System", items: [
          { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
          { to: "/admin/notifications", label: "Notifications", icon: Bell },
          { to: "/admin/settings", label: "Settings", icon: Settings },
        ]},
      ]}
    >
      <Outlet />
    </PortalShell>
  ),
});
