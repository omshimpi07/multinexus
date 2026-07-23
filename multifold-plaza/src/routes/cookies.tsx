import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — MultiNexus" }] }),
  component: () => (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated Jan 1, 2026</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>We use cookies to keep you signed in, remember preferences, and understand how the platform is used.</p>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Types of cookies</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><span className="text-foreground">Essential</span> — needed for auth and core functionality.</li>
              <li><span className="text-foreground">Preferences</span> — remember your theme and layout.</li>
              <li><span className="text-foreground">Analytics</span> — anonymous usage stats to improve the product.</li>
            </ul>
          </div>
          <p>You can control cookies in your browser at any time.</p>
        </div>
      </div>
    </PublicShell>
  ),
});
