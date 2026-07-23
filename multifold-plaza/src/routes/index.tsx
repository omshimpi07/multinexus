import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessCard } from "@/components/shared/business-card";
import { ProductCard } from "@/components/shared/product-card";
import { ServiceCard } from "@/components/shared/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  featuredBusinessesQuery,
  trendingProductsQuery,
  popularServicesQuery,
  categoriesQuery,
  platformStatsQuery,
} from "@/services";
import * as Icons from "lucide-react";
import { ArrowRight, Search, Sparkles, Store, Calendar, Shield, Zap, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MultiNexus — Discover local businesses, products & services" },
      { name: "description", content: "Shop products and book services from independent local businesses on one unified marketplace." },
      { property: "og:title", content: "MultiNexus — Discover local businesses, products & services" },
      { property: "og:description", content: "Shop products and book services from independent local businesses on one unified marketplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredBusinessesQuery());
    context.queryClient.ensureQueryData(trendingProductsQuery());
    context.queryClient.ensureQueryData(popularServicesQuery());
    context.queryClient.ensureQueryData(categoriesQuery());
    context.queryClient.ensureQueryData(platformStatsQuery());
  },
  component: Home,
});

function Home() {
  return (
    <PublicShell>
      <Hero />
      <Categories />
      <Featured />
      <Trending />
      <Popular />
      <HowItWorks />
      <WhyUs />
      <Stats />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </PublicShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" />
            Trusted by 200+ independent businesses
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            One platform.{" "}
            <span className="text-gradient">Multiple businesses.</span>
            <br className="hidden sm:block" />
            Unlimited possibilities.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            MultiNexus is where independent businesses run their storefront — selling products,
            booking services, and reaching new customers in one marketplace.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search businesses, products, or services"
                className="h-12 rounded-full pl-10"
              />
            </div>
            <Button size="lg" className="h-12 rounded-full px-6">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/businesses">Explore businesses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/become-a-business">
                Sell on MultiNexus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { data } = useSuspenseQuery(categoriesQuery());
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Categories" title="Browse by category" description="From bakeries to electricians, discover businesses across every service you need." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((c) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon] ?? Store;
          return (
            <Link
              key={c.id}
              to="/categories"
              className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="rounded-lg bg-secondary p-2.5 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.businessCount} businesses</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Featured() {
  const { data } = useSuspenseQuery(featuredBusinessesQuery());
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Featured"
        title="Businesses we love"
        description="A hand-picked selection of standout businesses on the platform."
        action={
          <Button asChild variant="ghost">
            <Link to="/businesses">See all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((b) => <BusinessCard key={b.id} business={b} />)}
      </div>
    </section>
  );
}

function Trending() {
  const { data } = useSuspenseQuery(trendingProductsQuery());
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trending"
          title="Products people love"
          action={
            <Button asChild variant="ghost">
              <Link to="/products">Shop all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function Popular() {
  const { data } = useSuspenseQuery(popularServicesQuery());
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Book it"
        title="Popular services"
        action={
          <Button asChild variant="ghost">
            <Link to="/services">Explore <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 6).map((s) => <ServiceCard key={s.id} service={s} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Search, title: "Discover", body: "Browse independent businesses, products, and bookable services in one place." },
    { icon: Store, title: "Shop or book", body: "Buy products or book appointments with a clean, unified checkout." },
    { icon: Sparkles, title: "Enjoy", body: "Track orders, manage bookings, and rediscover businesses you love." },
    { icon: Calendar, title: "Repeat", body: "Save favorites, reorder in one tap, and rebook in seconds." },
  ];
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title="From discovery to checkout in minutes" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Shield, title: "Verified businesses", body: "Every business is vetted and reviewed. What you see is what you get." },
    { icon: Zap, title: "One checkout, everywhere", body: "Buy from multiple businesses in a single, streamlined checkout." },
    { icon: TrendingUp, title: "Built for growth", body: "Powerful analytics and CRM tools built in — from day one." },
    { icon: Calendar, title: "Real-time booking", body: "Live availability, instant confirmation, calendar sync." },
    { icon: Store, title: "Your storefront", body: "A polished storefront in minutes — no design skills required." },
    { icon: Sparkles, title: "Delightful UX", body: "Designed with the polish of the best consumer apps you use daily." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Why MultiNexus" title="A platform built for both sides" align="center" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const { data } = useSuspenseQuery(platformStatsQuery());
  const items = [
    { label: "Businesses", value: data.businesses.toLocaleString() + "+" },
    { label: "Customers", value: data.customers.toLocaleString() + "+" },
    { label: "Orders placed", value: data.orders.toLocaleString() + "+" },
    { label: "Bookings made", value: data.bookings.toLocaleString() + "+" },
  ];
  return (
    <section className="bg-brand py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-primary-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "Sofia Reyes", role: "Owner, Bloom Bakery", body: "MultiNexus doubled our weekly online orders in three months. It just works." },
    { name: "Marcus Lee", role: "Founder, Apex Fitness", body: "The booking flow is so good. Members book classes without us lifting a finger." },
    { name: "Elena Rossi", role: "Owner, Maker Row Studio", body: "Best-looking storefront I could get without hiring a designer. Sales are up 3x." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Testimonials" title="Loved by independent businesses" align="center" />
      <div className="grid gap-5 lg:grid-cols-3">
        {t.map((x) => (
          <figure key={x.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <blockquote className="text-sm leading-relaxed">"{x.body}"</blockquote>
            <figcaption className="mt-4 border-t border-border pt-4">
              <p className="text-sm font-semibold">{x.name}</p>
              <p className="text-xs text-muted-foreground">{x.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const qas = [
    { q: "What is MultiNexus?", a: "A multi-tenant marketplace where independent businesses run their own storefront to sell products and bookable services." },
    { q: "How do I sign up as a business?", a: "Head to Become a Business, tell us about your business, and submit for approval. Most businesses are approved within 48 hours." },
    { q: "What are the fees?", a: "Free to browse and buy. Businesses pay a small monthly plan plus a low transaction fee. See Pricing for full details." },
    { q: "Is my payment info safe?", a: "Payments are handled by PCI-compliant providers. MultiNexus never stores your card details." },
    { q: "Can I sell services and products?", a: "Yes — many businesses do both. You can manage catalog, orders, and bookings from one dashboard." },
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
      <Accordion type="single" collapsible className="w-full">
        {qas.map((x, i) => (
          <AccordionItem key={i} value={"i" + i}>
            <AccordionTrigger className="text-left">{x.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{x.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-brand p-10 text-primary-foreground shadow-elegant sm:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to grow your business?
            </h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              Join hundreds of independent businesses selling products and services on MultiNexus.
              Set up your storefront in minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link to="/become-a-business">Start free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/pricing">See plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
