import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PublicShell } from "@/components/layout/public-shell";
import { serviceQuery, servicesQuery } from "@/services";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import { Clock, Calendar as Cal, MapPin } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "sonner";

export const Route = createFileRoute("/services/$id")({
  loader: async ({ context, params }) => {
    const s = await context.queryClient.ensureQueryData(serviceQuery(params.id));
    if (!s) throw notFound();
    context.queryClient.ensureQueryData(servicesQuery({ businessId: s.businessId }));
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <PublicShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Button asChild className="mt-4"><Link to="/services">Back to services</Link></Button>
      </div>
    </PublicShell>
  ),
  errorComponent: ({ error }) => <PublicShell><div className="p-10 text-center">{error.message}</div></PublicShell>,
});

function ServiceDetail() {
  const { id } = Route.useParams();
  const { data: s } = useSuspenseQuery(serviceQuery(id));
  const { data: related } = useSuspenseQuery(servicesQuery({ businessId: s!.businessId }));
  if (!s) return null;

  return (
    <PublicShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/services">Services</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{s.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">{s.category}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{s.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              by{" "}
              <Link to="/businesses/$id" params={{ id: s.businessId }} className="text-foreground underline underline-offset-2">
                {s.businessName}
              </Link>
            </p>
            <div className="mt-3"><StarRating value={s.rating} count={s.reviewCount} size={14} /></div>
            <p className="mt-6 text-muted-foreground">{s.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric icon={Clock} label="Duration" value={`${s.durationMin} min`} />
              <Metric icon={Cal} label="Availability" value="Daily" />
              <Metric icon={MapPin} label="Location" value="In-studio" />
              <Metric icon={Cal} label="Booking" value="Instant" />
            </div>

            <h2 className="mt-10 text-lg font-semibold">What to expect</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• A brief consultation to understand your needs</li>
              <li>• Professional service delivered by an experienced provider</li>
              <li>• Post-service follow-up and care recommendations</li>
            </ul>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-elegant">
            <p className="text-3xl font-bold">${s.price}</p>
            <p className="text-xs text-muted-foreground">for a {s.durationMin} minute session</p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next available</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Tomorrow", "Fri", "Sat"].map((d) => (
                  <button key={d} className="rounded-md border border-border p-2 text-xs hover:border-accent">
                    <p className="font-semibold">{d}</p>
                    <p className="text-muted-foreground">10:00 AM</p>
                  </button>
                ))}
              </div>
            </div>

            <Button className="mt-4 w-full" size="lg" onClick={() => toast.success("Booking flow started")}>Book service</Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">Free cancellation up to 24h before</p>
          </aside>
        </div>

        {related.length > 1 && (
          <section className="mt-16">
            <h2 className="text-lg font-semibold">More from {s.businessName}</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.filter((x) => x.id !== s.id).slice(0, 3).map((x) => <ServiceCard key={x.id} service={x} />)}
            </div>
          </section>
        )}
      </div>
    </PublicShell>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <Icon className="h-4 w-4 text-accent" />
      <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
