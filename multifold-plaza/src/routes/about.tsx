import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MultiNexus" },
      { name: "description", content: "The story behind MultiNexus and why we're building a home for independent businesses." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PublicShell>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our story</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Building a home for independent businesses
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            MultiNexus was founded on a simple belief — that every small business deserves the same
            software polish as the biggest brands. We're the platform we wished existed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Values" title="What guides us" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, title: "Craft", body: "We sweat every pixel because our businesses do too." },
            { icon: Users, title: "Independence", body: "We build for the makers, not the middlemen." },
            { icon: Sparkles, title: "Delight", body: "Great software should feel joyful, not just useful." },
            { icon: Rocket, title: "Momentum", body: "We ship fast, learn faster, and never sit still." },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="text-3xl font-bold">Join us on the journey</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Whether you're a customer, a business, or somewhere in between — we're glad you're here.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary"><Link to="/become-a-business">Sell on MultiNexus</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Get in touch</Link></Button>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
