import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { categoriesQuery, businessesQuery } from "@/services";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — MultiNexus" },
      { name: "description", content: "Browse businesses, products, and services by category." },
      { property: "og:title", content: "Categories — MultiNexus" },
      { property: "og:description", content: "Browse businesses, products, and services by category." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(categoriesQuery());
    context.queryClient.ensureQueryData(businessesQuery());
  },
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: cats } = useSuspenseQuery(categoriesQuery());
  const { data: biz } = useSuspenseQuery(businessesQuery());
  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore" title="All categories" description="Find businesses grouped by what they do." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[c.icon] ?? Icons.Store;
            const inCat = biz.filter((b) => b.categoryId === c.id);
            return (
              <Link
                key={c.id}
                to="/businesses"
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                    <p className="mt-3 text-xs font-medium text-accent">{inCat.length} businesses →</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PublicShell>
  );
}
