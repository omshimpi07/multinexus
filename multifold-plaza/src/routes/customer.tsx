import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/layout/portal-shell";
import { LayoutDashboard, ShoppingBag, Calendar, Heart, ShoppingCart, User, Settings, Bell, LifeBuoy, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});

function CustomerLayout() {
  const { count, wishlist } = useCart();
  return (
    <PortalShell
      title="Customer"
      brandTo="/customer"
      accentLabel="Customer"
      groups={[
        { items: [
          { to: "/customer", label: "Dashboard", icon: LayoutDashboard },
          { to: "/customer/orders", label: "My Orders", icon: ShoppingBag },
          { to: "/customer/bookings", label: "My Bookings", icon: Calendar },
          { to: "/customer/wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length ? String(wishlist.length) : undefined },
          { to: "/customer/cart", label: "Cart", icon: ShoppingCart, badge: count ? String(count) : undefined },
        ]},
        { label: "Account", items: [
          { to: "/customer/addresses", label: "Addresses", icon: MapPin },
          { to: "/customer/notifications", label: "Notifications", icon: Bell },
          { to: "/customer/profile", label: "Profile", icon: User },
          { to: "/customer/settings", label: "Settings", icon: Settings },
          { to: "/customer/support", label: "Support", icon: LifeBuoy },
        ]},
      ]}
    >
      <Outlet />
    </PortalShell>
  );
}
