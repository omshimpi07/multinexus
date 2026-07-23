import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicShell } from "@/components/layout/public-shell";
import { productQuery, productsQuery } from "@/services";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/product-card";
import { Heart, Share2, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(productQuery(params.id));
    if (!p) throw notFound();
    context.queryClient.ensureQueryData(productsQuery({ businessId: p.businessId }));
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild className="mt-4"><Link to="/products">Back to products</Link></Button>
      </div>
    </PublicShell>
  ),
  errorComponent: ({ error }) => (
    <PublicShell><div className="p-10 text-center">{error.message}</div></PublicShell>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(id));
  const { data: related } = useSuspenseQuery(productsQuery({ businessId: p!.businessId }));
  const [qty, setQty] = useState(1);
  const cart = useCart();

  if (!p) return null;
  const wished = cart.isWished(p.id);
  const onSale = typeof p.compareAtPrice === "number" && p.compareAtPrice > p.price;

  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/products">Products</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{p.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-secondary text-[10rem]">
              {p.image}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[p.image, p.image, p.image, p.image].map((im, i) => (
                <button key={i} className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card text-2xl hover:border-accent">
                  {im}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">{p.category}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{p.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              by{" "}
              <Link to="/businesses/$id" params={{ id: p.businessId }} className="text-foreground underline underline-offset-2">
                {p.businessName}
              </Link>
            </p>
            <div className="mt-3">
              <StarRating value={p.rating} count={p.reviewCount} size={14} />
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold">${p.price.toFixed(2)}</span>
              {onSale && (
                <span className="text-lg text-muted-foreground line-through">${p.compareAtPrice?.toFixed(2)}</span>
              )}
            </div>

            <p className="mt-2 text-sm text-success">
              {p.stock > 10 ? "In stock" : p.stock > 0 ? `Only ${p.stock} left` : "Out of stock"}
            </p>

            <p className="mt-6 text-muted-foreground">{p.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 hover:bg-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button size="lg" className="flex-1" onClick={() => { cart.add(p, qty); toast.success(`${p.name} added to cart`); }}>
                Add to cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                aria-label="Wishlist"
                onClick={() => { cart.toggleWish(p.id); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
              >
                <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
              </Button>
              <Button size="lg" variant="outline" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-xs">
              <div className="flex items-start gap-2"><Truck className="h-4 w-4 text-accent" /><span>Free shipping over $75</span></div>
              <div className="flex items-start gap-2"><RotateCcw className="h-4 w-4 text-accent" /><span>30-day returns</span></div>
              <div className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-accent" /><span>Verified seller</span></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-12">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4 text-muted-foreground">
            {p.description}
          </TabsContent>
          <TabsContent value="reviews" className="pt-4 text-muted-foreground">
            <StarRating value={p.rating} count={p.reviewCount} showValue />
            <p className="mt-2 text-sm">Based on {p.reviewCount} customer reviews.</p>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4 text-sm text-muted-foreground">
            Ships from {p.businessName}. Standard shipping 3–5 business days. Free over $75.
          </TabsContent>
        </Tabs>

        {related.length > 1 && (
          <section className="mt-16">
            <h2 className="text-lg font-semibold">More from {p.businessName}</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.filter((r) => r.id !== p.id).slice(0, 4).map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </section>
        )}
      </div>
    </PublicShell>
  );
}
