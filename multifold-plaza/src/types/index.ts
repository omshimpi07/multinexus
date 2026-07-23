export type UserRole = "customer" | "business" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  businessId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide name
  description: string;
  businessCount: number;
}

export type BusinessStatus = "active" | "pending" | "suspended";

export interface Business {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  category: string;
  tagline: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  city: string;
  hours: { day: string; open: string; close: string; closed?: boolean }[];
  isOpen: boolean;
  phone: string;
  email: string;
  logo: string; // emoji or short label
  coverGradient: string;
  status: BusinessStatus;
  featured?: boolean;
  ownerId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string; // emoji
  images?: string[];
  trending?: boolean;
}

export interface Service {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  durationMin: number;
  category: string;
  rating: number;
  reviewCount: number;
  icon: string;
  popular?: boolean;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  businessId: string;
  businessName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: string;
}

export type BookingStatus = "upcoming" | "confirmed" | "completed" | "cancelled" | "no-show";

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  businessId: string;
  businessName: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO
  durationMin: number;
  price: number;
  status: BookingStatus;
  notes?: string;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  businessId: string;
  businessName: string;
  targetType: "business" | "product" | "service";
  targetId: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
  reply?: { body: string; createdAt: string };
  status: "published" | "flagged" | "pending";
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  businessName: string;
}
