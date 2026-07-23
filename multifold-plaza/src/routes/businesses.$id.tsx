import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicShell } from "@/components/layout/public-shell";
import { ProductCard } from "@/components/shared/product-card";
import { ServiceCard } from "@/components/shared/service-card";
import { ReviewCard } from "@/components/shared/review-card";
import { StarRating } from "@/components/shared/star-rating";
import { businessQuery, productsQuery, servicesQuery, reviewsQuery } from "@/services";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Share2 } from "lucide-react";

export const Route = createFileRoute("/businesses/$id")({
  loader: async ({ context, params }) => {
    const biz = await context.queryClient.ensureQueryData(businessQuery(params.id));
    if (!biz) throw notFound();
    context.queryClient.ensureQueryData(productsQuery({ businessId: biz.id }));
    context.queryClient.ensureQueryData(servicesQuery({ businessId: biz.id }));
    context.queryClient.ensureQueryData(reviewsQuery({ businessId: biz.id }));
  },
  component: BusinessDetail,
  notFoundComponent: () => (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Business not found</h1>
        <p className="mt-2 text-muted-foreground">This storefront may have moved or been removed.</p>
        <Button asChild className="mt-6"><Link to="/businesses">Back to directory</Link></Button>
      </div>
    </PublicShell>
  ),
  errorComponent: ({ error }) => (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </PublicShell>
  ),
});

function BusinessDetail() {
  const { id } = Route.useParams();
  const { data: biz } = useSuspenseQuery(businessQuery(id));
  const { data: prods } = useSuspenseQuery(productsQuery({ businessId: biz!.id }));
  const { data: svcs } = useSuspenseQuery(servicesQuery({ businessId: biz!.id }));
  const { data: revs } = useSuspenseQuery(reviewsQuery({ businessId: biz!.id }));

  if (!biz) return null;

  return (
    <PublicShell>
      <div
        className="relative h-64 w-full sm:h-80"
        style={{ background: biz.coverGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-elegant sm:flex-row sm:items-end">
          <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-card bg-secondary text-4xl shadow-card">
            {biz.logo}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{biz.category}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{biz.name}</h1>
            <p className="mt-1 text-muted-foreground">{biz.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <StarRating value={biz.rating} count={biz.reviewCount} showValue size={14} />
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {biz.city}</span>
              <span className={"inline-flex items-center gap-1 " + (biz.isOpen ? "text-success" : "")}>
                <Clock className="h-3.5 w-3.5" /> {biz.isOpen ? "Open now" : "Closed"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            <Button>Contact</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products ({prods.length})</TabsTrigger>
            <TabsTrigger value="services">Services ({svcs.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({revs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="mt-2 text-muted-foreground">{biz.description}</p>
                {prods.length > 0 && (
                  <>
                    <h3 className="mt-8 text-lg font-semibold">Popular products</h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {prods.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                  </>
                )}
                {svcs.length > 0 && (
                  <>
                    <h3 className="mt-8 text-lg font-semibold">Services offered</h3>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {svcs.slice(0, 4).map((s) => <ServiceCard key={s.id} service={s} />)}
                    </div>
                  </>
                )}
              </div>
              <aside className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <h4 className="text-sm font-semibold">Contact</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {biz.location}, {biz.city}</li>
                    <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {biz.phone}</li>
                    <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {biz.email}</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <h4 className="text-sm font-semibold">Hours</h4>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {biz.hours.map((h) => (
                      <li key={h.day} className="flex justify-between">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span>{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-40 overflow-hidden rounded-xl border border-border bg-secondary">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Map preview
                  </div>
                </div>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="products" className="pt-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {prods.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="services" className="pt-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {svcs.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="grid gap-4">
              {revs.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PublicShell>
  );
}
