import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { businessQuery } from "@/services";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Star, MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/business/storefront")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(businessQuery("biz_bloom_bakery")),
  component: BusinessStorefront,
});

function BusinessStorefront() {
  const { data: b } = useSuspenseQuery(businessQuery("biz_bloom_bakery"));
  if (!b) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Storefront</h2>
          <p className="text-sm text-muted-foreground">This is how customers see your business.</p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to="/businesses/$id" params={{ id: b.slug }}>
            <ExternalLink className="mr-1 h-3.5 w-3.5" /> View public page
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="h-48 w-full" style={{ background: b.coverGradient }} />
        <div className="p-6">
          <div className="-mt-16 flex items-end gap-4">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-card bg-card text-4xl shadow-elegant">
              {b.logo}
            </div>
            <div className="flex-1 pb-2">
              <h3 className="text-2xl font-bold">{b.name}</h3>
              <p className="text-sm text-muted-foreground">{b.tagline}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="mt-1 flex items-center gap-1 font-semibold"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {b.rating}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium"><MapPin className="h-3.5 w-3.5" /> {b.city}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium"><Phone className="h-3.5 w-3.5" /> {b.phone}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                <span className={`h-2 w-2 rounded-full ${b.isOpen ? "bg-success" : "bg-muted-foreground"}`} />
                {b.isOpen ? "Open now" : "Closed"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 text-sm font-semibold">About</h4>
            <p className="text-sm text-muted-foreground">{b.description}</p>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4" /> Hours</h4>
            <div className="grid gap-1 sm:grid-cols-2">
              {b.hours.map((h) => (
                <div key={h.day} className="flex justify-between rounded px-2 py-1 text-xs">
                  <span className="font-medium">{h.day}</span>
                  <span className="text-muted-foreground">{h.closed ? "Closed" : `${h.open} – ${h.close}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button variant="outline"><Eye className="mr-1 h-3.5 w-3.5" /> Preview</Button>
            <Button>Edit storefront</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
