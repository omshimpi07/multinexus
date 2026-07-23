import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/become-a-business")({
  head: () => ({
    meta: [
      { title: "Sell on MultiNexus — Become a Business" },
      { name: "description", content: "Join hundreds of independent businesses selling products and services on MultiNexus." },
    ],
  }),
  component: Become,
});

function Become() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Become a business</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Set up your storefront in minutes</h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Get a beautiful storefront, powerful analytics, and a booking system that just works.
              Approvals typically within 48 hours.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Free to start — upgrade any time",
                "Polished storefront, no design skills required",
                "Sell products, book services, or both",
                "Payments, orders, and bookings in one place",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-success" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild size="lg"><Link to="/signup">Create your business account</Link></Button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks — we'll be in touch shortly!");
            }}
            className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
          >
            <h2 className="text-lg font-semibold">Talk to sales</h2>
            <p className="mt-1 text-sm text-muted-foreground">Curious how MultiNexus works? Send us a note.</p>
            <div className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label>Business name</Label>
                <Input placeholder="Bloom Bakery" required />
              </div>
              <div className="space-y-1.5">
                <Label>Your email</Label>
                <Input type="email" placeholder="you@business.com" required />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Input placeholder="Bakery, Salon, Fitness..." />
              </div>
              <div className="space-y-1.5">
                <Label>Tell us about your business</Label>
                <Textarea rows={4} placeholder="What do you sell? Where are you based?" />
              </div>
              <Button type="submit" className="w-full">Request info</Button>
            </div>
          </form>
        </div>
      </div>
    </PublicShell>
  );
}
