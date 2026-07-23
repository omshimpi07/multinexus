import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";

function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="prose prose-sm mt-8 max-w-none text-muted-foreground [&_h2]:mt-8 [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:text-lg [&_p]:mt-3">
          {children}
        </div>
      </div>
    </PublicShell>
  );
}

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — MultiNexus" }] }),
  component: () => (
    <LegalPage title="Terms of Service" updated="Jan 1, 2026">
      <p>These terms govern your use of the MultiNexus platform. By using our services, you agree to these terms.</p>
      <h2>Acceptable use</h2>
      <p>Don't do anything illegal, hateful, or harmful. Businesses must accurately represent their goods and services.</p>
      <h2>Accounts</h2>
      <p>You are responsible for maintaining the security of your account. We may suspend accounts that violate these terms.</p>
      <h2>Content</h2>
      <p>You retain rights to content you post. You grant MultiNexus a license to host and display it on the platform.</p>
      <h2>Payments</h2>
      <p>Payments are processed by third-party providers. Refunds and disputes are handled per each business's policy.</p>
      <h2>Termination</h2>
      <p>Either party may terminate the agreement at any time, subject to outstanding obligations.</p>
    </LegalPage>
  ),
});
