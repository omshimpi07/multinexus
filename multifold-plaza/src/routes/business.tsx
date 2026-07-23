import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/layout/portal-shell";
import { LayoutDashboard, Package, Wrench, ShoppingBag, Calendar, Users, Star, BarChart3, CreditCard, UserPlus, Settings, Bell, Store } from "lucide-react";

export const Route = createFileRoute("/business")({
  component: () => (
    <PortalShell
      title="Business"
      brandTo="/business"
      accentLabel="Business"
      groups={[
        { items: [
          { to: "/business", label: "Dashboard", icon: LayoutDashboard },
          { to: "/business/storefront", label: "Storefront", icon: Store },
        ]},
        { label: "Catalog", items: [
          { to: "/business/products", label: "Products", icon: Package },
          { to: "/business/services", label: "Services", icon: Wrench },
        ]},
        { label: "Sales", items: [
          { to: "/business/orders", label: "Orders", icon: ShoppingBag },
          { to: "/business/bookings", label: "Bookings", icon: Calendar },
          { to: "/business/customers", label: "Customers", icon: Users },
          { to: "/business/reviews", label: "Reviews", icon: Star },
        ]},
        { label: "Insights", items: [
          { to: "/business/analytics", label: "Analytics", icon: BarChart3 },
        ]},
        { label: "Settings", items: [
          { to: "/business/billing", label: "Billing", icon: CreditCard },
          { to: "/business/team", label: "Team", icon: UserPlus },
          { to: "/business/notifications", label: "Notifications", icon: Bell },
          { to: "/business/settings", label: "Settings", icon: Settings },
        ]},
      ]}
    >
      <Outlet />
    </PortalShell>
  ),
});
