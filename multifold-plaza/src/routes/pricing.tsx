import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — MultiNexus" },
      { name: "description", content: "Simple, transparent pricing plans for businesses of every size." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  { name: "Starter", price: 0, blurb: "Everything to get started.", features: ["Up to 10 products", "Basic booking", "Standard analytics", "Community support"], cta: "Get started" },
  { name: "Growth", price: 29, blurb: "For growing businesses.", features: ["Unlimited products", "Advanced booking + calendar sync", "Full analytics", "Priority support", "Team seats (up to 5)"], cta: "Start free trial", popular: true },
  { name: "Scale", price: 99, blurb: "Serious tooling for serious teams.", features: ["Everything in Growth", "Custom domain", "Dedicated success manager", "SLA-backed uptime", "Unlimited team seats"], cta: "Contact sales" },
];

function Pricing() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Pricing" title="Simple plans, no surprises" description="Free to start. Transparent as you grow." align="center" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-6 shadow-card",
                p.popular ? "border-accent shadow-elegant ring-1 ring-accent/30" : "border-border",
              )}
            >
              {p.popular && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-4">
                <span className="text-4xl font-bold">${p.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-6" variant={p.popular ? "default" : "outline"}>
                <Link to="/become-a-business">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Plus 2.9% + 30¢ per transaction. No hidden fees.
        </p>
      </div>
    </PublicShell>
  );
}
