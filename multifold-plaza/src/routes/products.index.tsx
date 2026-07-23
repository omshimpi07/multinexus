import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PublicShell } from "@/components/layout/public-shell";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { productsQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Shop Products — MultiNexus" },
      { name: "description", content: "Discover unique products from local and independent businesses." },
      { property: "og:title", content: "Shop Products — MultiNexus" },
      { property: "og:description", content: "Discover unique products from local and independent businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery()),
  component: ProductsPage,
});

function ProductsPage() {
  const [q, setQ] = useState("");
  const { data } = useSuspenseQuery(productsQuery());
  const list = q ? data.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : data;
  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Marketplace" title="All products" description="Shop from independent businesses on MultiNexus." />
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="h-11 pl-10" />
          </div>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">{list.length} products</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </PublicShell>
  );
}
