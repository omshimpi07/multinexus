import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PublicShell } from "@/components/layout/public-shell";
import { ServiceCard } from "@/components/shared/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { servicesQuery } from "@/services";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Book Services — MultiNexus" },
      { name: "description", content: "Book appointments with trusted local service providers in seconds." },
      { property: "og:title", content: "Book Services — MultiNexus" },
      { property: "og:description", content: "Book appointments with trusted local service providers in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery()),
  component: ServicesPage,
});

function ServicesPage() {
  const [q, setQ] = useState("");
  const { data } = useSuspenseQuery(servicesQuery());
  const list = q ? data.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())) : data;
  return (
    <PublicShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Bookings" title="All services" description="Book time with independent professionals across every category." />
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" className="h-11 pl-10" />
          </div>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">{list.length} services</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>
    </PublicShell>
  );
}
