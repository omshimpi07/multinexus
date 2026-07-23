import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/services";
import { ProductCard } from "@/components/shared/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/wishlist")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery()),
  component: Wishlist,
});

function Wishlist() {
  const { data: allProducts } = useSuspenseQuery(productsQuery());
  const { wishlist, toggleWish, add } = useCart();
  const items = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wishlist</h2>
          <p className="text-sm text-muted-foreground">{items.length} saved item{items.length === 1 ? "" : "s"}.</p>
        </div>
        {items.length > 0 && (
          <Button
            onClick={() => { items.forEach((p) => add(p, 1)); toast.success("Added all to cart"); }}
          >
            Add all to cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" description="Tap the heart on any product to save it here." action={<Link to="/products" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90">Browse products</Link>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} />
              <button
                onClick={() => { toggleWish(p.id); toast.success("Removed from wishlist"); }}
                aria-label="Remove from wishlist"
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/90 shadow-card hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm">
        <Link to="/products" className="text-accent hover:underline">Continue shopping →</Link>
      </div>
    </div>
  );
}
