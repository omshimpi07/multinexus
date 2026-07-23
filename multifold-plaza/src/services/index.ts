/**
 * Services layer — all data access lives here.
 * Today: reads from in-memory mock data.
 * Later: swap each function's body for a real fetch / Supabase call.
 * Components never import from lib/mock-data directly.
 */
import { queryOptions } from "@tanstack/react-query";
import {
  analytics,
  bookings,
  businesses,
  categories,
  featuredBusinesses,
  orders,
  platformStats,
  popularServices,
  products,
  reviews,
  services,
  trendingProducts,
} from "@/lib/mock-data";
import type { Business, Product, Service } from "@/types";

const delay = <T>(v: T, ms = 120) => new Promise<T>((r) => setTimeout(() => r(v), ms));

// Businesses
export const businessesQuery = (filter?: { category?: string; search?: string }) =>
  queryOptions({
    queryKey: ["businesses", filter ?? {}],
    queryFn: async () => {
      let list = businesses.filter((b) => b.status === "active");
      if (filter?.category) list = list.filter((b) => b.categoryId === filter.category);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter((b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
      }
      return delay(list);
    },
    staleTime: 60_000,
  });

export const businessQuery = (idOrSlug: string) =>
  queryOptions({
    queryKey: ["business", idOrSlug],
    queryFn: async (): Promise<Business | null> => {
      const b = businesses.find((x) => x.id === idOrSlug || x.slug === idOrSlug) ?? null;
      return delay(b);
    },
  });

// Products
export const productsQuery = (filter?: { businessId?: string; category?: string; search?: string }) =>
  queryOptions({
    queryKey: ["products", filter ?? {}],
    queryFn: async () => {
      let list = products;
      if (filter?.businessId) list = list.filter((p) => p.businessId === filter.businessId);
      if (filter?.category) list = list.filter((p) => p.category === filter.category);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q));
      }
      return delay(list);
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => delay(products.find((p) => p.id === id) ?? null),
  });

// Services
export const servicesQuery = (filter?: { businessId?: string; category?: string; search?: string }) =>
  queryOptions({
    queryKey: ["services", filter ?? {}],
    queryFn: async () => {
      let list = services;
      if (filter?.businessId) list = list.filter((s) => s.businessId === filter.businessId);
      if (filter?.category) list = list.filter((s) => s.category === filter.category);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter((s) => s.name.toLowerCase().includes(q));
      }
      return delay(list);
    },
  });

export const serviceQuery = (id: string) =>
  queryOptions({
    queryKey: ["service", id],
    queryFn: async (): Promise<Service | null> => delay(services.find((s) => s.id === id) ?? null),
  });

// Orders
export const ordersQuery = (filter?: { customerId?: string; businessId?: string }) =>
  queryOptions({
    queryKey: ["orders", filter ?? {}],
    queryFn: async () => {
      let list = orders;
      if (filter?.customerId) list = list.filter((o) => o.customerId === filter.customerId);
      if (filter?.businessId) list = list.filter((o) => o.businessId === filter.businessId);
      return delay(list);
    },
  });

// Bookings
export const bookingsQuery = (filter?: { customerId?: string; businessId?: string }) =>
  queryOptions({
    queryKey: ["bookings", filter ?? {}],
    queryFn: async () => {
      let list = bookings;
      if (filter?.customerId) list = list.filter((b) => b.customerId === filter.customerId);
      if (filter?.businessId) list = list.filter((b) => b.businessId === filter.businessId);
      return delay(list);
    },
  });

// Reviews
export const reviewsQuery = (filter?: { businessId?: string }) =>
  queryOptions({
    queryKey: ["reviews", filter ?? {}],
    queryFn: async () => {
      let list = reviews;
      if (filter?.businessId) list = list.filter((r) => r.businessId === filter.businessId);
      return delay(list);
    },
  });

// Categories
export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async () => delay(categories),
  });

// Analytics
export const analyticsQuery = () =>
  queryOptions({
    queryKey: ["analytics"],
    queryFn: async () => delay(analytics),
  });

export const platformStatsQuery = () =>
  queryOptions({
    queryKey: ["platform-stats"],
    queryFn: async () => delay(platformStats),
  });

// Featured
export const featuredBusinessesQuery = () =>
  queryOptions({
    queryKey: ["featured-businesses"],
    queryFn: async () => delay(featuredBusinesses),
  });

export const trendingProductsQuery = () =>
  queryOptions({
    queryKey: ["trending-products"],
    queryFn: async () => delay(trendingProducts),
  });

export const popularServicesQuery = () =>
  queryOptions({
    queryKey: ["popular-services"],
    queryFn: async () => delay(popularServices),
  });

// ============ Admin ============
export const allBusinessesQuery = () =>
  queryOptions({
    queryKey: ["admin", "businesses"],
    queryFn: async () => delay(businesses),
  });

export const usersQuery = () =>
  queryOptions({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      type U = { id: string; name: string; email: string; role: "customer" | "business" | "admin"; joined: string; orders: number; status: "active" | "suspended" };
      const map = new Map<string, U>();
      for (const o of orders) {
        const u = map.get(o.customerId) ?? { id: o.customerId, name: o.customerName, email: `${o.customerName.toLowerCase().replace(/\s+/g, ".")}@example.com`, role: "customer", joined: o.createdAt, orders: 0, status: "active" };
        u.orders += 1;
        if (o.createdAt < u.joined) u.joined = o.createdAt;
        map.set(o.customerId, u);
      }
      for (const b of businesses) {
        map.set(b.ownerId, { id: b.ownerId, name: `${b.name} Owner`, email: b.email, role: "business", joined: b.createdAt, orders: 0, status: b.status === "suspended" ? "suspended" : "active" });
      }
      map.set("usr_admin", { id: "usr_admin", name: "Platform Admin", email: "admin@multinexus.io", role: "admin", joined: "2024-01-01", orders: 0, status: "active" });
      return delay(Array.from(map.values()));
    },
  });
