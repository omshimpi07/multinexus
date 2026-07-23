import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { BusinessCard } from "@/components/shared/business-card";
import { ProductCard } from "@/components/shared/product-card";
import { ServiceCard } from "@/components/shared/service-card";
import { businessesQuery, productsQuery, servicesQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { Search } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — MultiNexus" },
      { name: "description", content: "Search across businesses, products, and services on MultiNexus." },
      { property: "og:title", content: "Search — MultiNexus" },
      { property: "og:description", content: "Search across businesses, products, and services on MultiNexus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(businessesQuery());
    context.queryClient.ensureQueryData(productsQuery());
    context.queryClient.ensureQueryData(servicesQuery());
  },
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const { data: biz } = useSuspenseQuery(businessesQuery());
  const { data: prod } = useSuspenseQuery(productsQuery());
  const { data: svc } = useSuspenseQuery(servicesQuery());

  const ql = q.toLowerCase();
  const b = q ? biz.filter((x) => x.name.toLowerCase().includes(ql) || x.category.toLowerCase().includes(ql)) : [];
  const p = q ? prod.filter((x) => x.name.toLowerCase().includes(ql)) : [];
  const s = q ? svc.filter((x) => x.name.toLowerCase().includes(ql)) : [];
  const total = b.length + p.length + s.length;

  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Search" title="Find anything on MultiNexus" />
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search businesses, products, services..." className="h-12 pl-10 text-base" />
          </div>
        </div>

        {q && total === 0 && (
          <div className="mt-10">
            <EmptyState title="No results" description={`We couldn't find anything for "${q}".`} />
          </div>
        )}

        {b.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Businesses ({b.length})</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {b.slice(0, 6).map((x) => <BusinessCard key={x.id} business={x} />)}
            </div>
          </section>
        )}

        {p.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Products ({p.length})</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.slice(0, 8).map((x) => <ProductCard key={x.id} product={x} />)}
            </div>
          </section>
        )}

        {s.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Services ({s.length})</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {s.slice(0, 6).map((x) => <ServiceCard key={x.id} service={x} />)}
            </div>
          </section>
        )}
      </div>
    </PublicShell>
  );
}
