import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PublicShell } from "@/components/layout/public-shell";
import { BusinessCard } from "@/components/shared/business-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/shared/section-heading";
import { businessesQuery, categoriesQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/businesses/")({
  head: () => ({
    meta: [
      { title: "Browse Businesses — MultiNexus" },
      { name: "description", content: "Explore verified independent businesses across every category on MultiNexus." },
      { property: "og:title", content: "Browse Businesses — MultiNexus" },
      { property: "og:description", content: "Explore verified independent businesses across every category on MultiNexus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(businessesQuery());
    context.queryClient.ensureQueryData(categoriesQuery());
  },
  component: BusinessesPage,
});

function BusinessesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"rating" | "newest" | "name">("rating");

  const { data: all } = useSuspenseQuery(businessesQuery());
  const { data: cats } = useSuspenseQuery(categoriesQuery());

  let list = all.filter((b) => {
    if (category && b.categoryId !== category) return false;
    if (search && !`${b.name} ${b.category} ${b.city}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  list = [...list].sort((a, b) =>
    sort === "rating" ? b.rating - a.rating : sort === "name" ? a.name.localeCompare(b.name) : a.createdAt < b.createdAt ? 1 : -1,
  );

  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Directory"
          title="All businesses"
          description="Search and browse every business on MultiNexus."
        />
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, category, or city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as never)}
            className="h-11 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="rating">Sort: Top rated</option>
            <option value="newest">Sort: Newest</option>
            <option value="name">Sort: Name A–Z</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <SlidersHorizontal className="h-3 w-3" /> Category
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory(null)}
                  className={cn(
                    "block w-full rounded-md px-2 py-1.5 text-left text-sm transition",
                    !category ? "bg-secondary" : "hover:bg-secondary/60",
                  )}
                >
                  All
                </button>
                {cats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "block w-full rounded-md px-2 py-1.5 text-left text-sm transition",
                      category === c.id ? "bg-secondary" : "hover:bg-secondary/60",
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <p className="mb-3 text-sm text-muted-foreground">{list.length} results</p>
            {list.length === 0 ? (
              <EmptyState
                title="No businesses match"
                description="Try clearing filters or searching for something else."
                action={
                  <Button onClick={() => { setSearch(""); setCategory(null); }}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((b) => <BusinessCard key={b.id} business={b} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
