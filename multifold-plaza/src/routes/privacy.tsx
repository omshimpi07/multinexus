import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — MultiNexus" }] }),
  component: () => (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated Jan 1, 2026</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
            <p className="mt-2">Account info (name, email), transaction data, and usage analytics needed to operate the platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">To provide, secure, and improve the service. We never sell your personal data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
            <p className="mt-2">You can request access, correction, or deletion of your data at any time via Settings or by contacting us.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">Privacy questions? Email privacy@multinexus.io.</p>
          </section>
        </div>
      </div>
    </PublicShell>
  ),
});
