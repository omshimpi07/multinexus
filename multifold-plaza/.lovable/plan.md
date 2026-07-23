
# MultiNexus — Build Plan

This is a very large scope (100+ routes across 4 surfaces, 3 role-based portals, full component library, mock data, analytics, bookings, checkout). To ship something that actually looks like a funded-startup MVP rather than a shallow sketch of everything, I'm proposing a **phased build** — each phase produces a polished, navigable slice; nothing is left as "Coming Soon."

## Stack adjustments (important)

Your brief specifies **React Router**, but this Lovable template runs on **TanStack Start + TanStack Router** (file-based routing, SSR-capable). Everything else in your stack (React, TS, Tailwind, shadcn, TanStack Query, RHF+Zod, Recharts, Lucide) is already wired.

I'll use TanStack Router in place of React Router — same mental model (routes, links, params, layouts), and it's what the platform is built for. Swapping to React Router would break SSR, the router bootstrap, and every knowledge convention. If you insist on React Router I'll need to know before starting.

All other stack choices, design tokens, and product requirements are honored as written.

## Phase 1 — Foundation (this turn)

The non-negotiable base everything else builds on. Delivered as one cohesive polished pass:

1. **Design system** — Deep Navy / Royal Blue / Emerald / Amber / Red palette as oklch tokens in `src/styles.css`, full light + dark themes, type scale, spacing, radii, shadows, custom shadcn variants. Inter via `<link>` in root head. Theme toggle with system-preference + localStorage persistence.
2. **App shell + navigation primitives** — Public top nav, Customer sidebar, Business sidebar, Admin sidebar, mobile drawers, breadcrumbs, footer, cookie banner. All responsive.
3. **Shared component library** — StatCard, ProductCard, ServiceCard, BusinessCard, ReviewCard, DataTable, EmptyState, ErrorState, SkeletonList, StarRating, Stepper, FilterPanel, SearchBar, Pagination, StatusBadge, ImageDropzone, Chart wrappers (line/bar/pie/area).
4. **Mock data + services layer** — `src/lib/mock-data/` (10 businesses, 30+ products, 20 services, 25+ orders, 20 bookings, 30 reviews, 6-month analytics), `src/services/` wrapping all reads/writes so a real backend swap is drop-in, TanStack Query hooks per resource.
5. **Types** — `src/types/` for Business, Product, Service, Order, Booking, Review, User, Category.
6. **Mock auth + role switcher** — `useAuth` hook, 3 seeded accounts (customer/business/admin), role switcher in dev bar so all portals are previewable without real auth.
7. **Global states** — 404, 403, 500, Session Expired, Offline banner, Maintenance page.
8. **Public site core routes** — Home (full hero → categories → featured businesses → trending products → popular services → how it works → stats → testimonials → FAQ → CTA → footer), Businesses directory, Business detail storefront, Products listing, Product detail, Services listing, Service detail, Categories, Search, About, Pricing, Become a Business, FAQ, Contact, Legal (ToS/Privacy/Cookie).
9. **Auth screens** — Login, Signup, Role Selection, Forgot/Reset Password, Verify Email (mock flows, real validation).

At the end of Phase 1 the public site + auth is fully done to a Stripe/Linear quality bar, and all three portals have working shells with dashboards + navigation stubbed to real pages.

## Phase 2 — Customer Portal (next turn)

Dashboard, My Orders (list + detail w/ status timeline), My Bookings (list + detail), Wishlist, Cart drawer + full cart, multi-step Checkout, Order Confirmation, Booking flow (date/time → contact → review → confirm), Addresses, Notifications, Profile, Settings, Support.

## Phase 3 — Business Portal (next turn)

Onboarding wizard, Dashboard (Shopify-style KPIs + charts), Storefront editor, Products table + create/edit, Services table + create/edit, Orders + details, Bookings (calendar + list), Customers, Reviews (with reply), Analytics, Billing & Subscription, Team & Roles, Notifications, Settings.

## Phase 4 — Admin Portal (next turn)

Dashboard, Users, Businesses (with approve/reject queue), Categories CRUD, Products/Services/Orders/Bookings moderation, Reviews moderation, Reports & Disputes, Platform Analytics, Platform Settings, Notifications.

## Phase 5 — Polish pass

Responsive audit at 1280 / 768 / 375, a11y sweep (keyboard, focus rings, aria, contrast in both themes), motion pass (150–250ms), loading/empty/error state review on every data view, dark mode contrast verification, cross-portal QA.

## Technical notes

- File-based routing under `src/routes/`. Portal layouts: `src/routes/customer.tsx`, `business.tsx`, `admin.tsx` each rendering `<Outlet />` with their sidebar shell.
- All data reads via TanStack Query against `services/*` — mock impls today, swappable for real API/Supabase later without touching components.
- Forms: RHF + Zod, shared field components.
- No real backend, payments, or persistence — cart/wishlist/theme in localStorage; everything else in-memory mock.
- shadcn extended with custom variants; **no** default un-styled shadcn shipped.

## Why phased

Doing all four portals + public site + auth in a single response would produce shallow work — 100+ half-finished pages instead of a real SaaS-quality product. Each phase above is one focused turn that ships polished, complete surfaces. Please confirm and I'll start Phase 1 immediately (or tell me which phase to prioritize first if you'd rather reorder).
