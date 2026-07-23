import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — MultiNexus" }] }),
  component: VerifyEmail,
});

function VerifyEmail() {
  return (
    <AuthShell
      eyebrow="One more step"
      title="Verify your email"
      subtitle="We've sent a verification link to your inbox."
      footer={<>Wrong address? <Link to="/signup" className="font-medium text-accent">Sign up again</Link></>}
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
          <MailCheck className="h-6 w-6" />
        </div>
        <p className="text-sm text-muted-foreground">
          Click the link in the email to activate your account. It might take a minute to arrive.
        </p>
        <Button asChild variant="outline"><Link to="/login">Return to login</Link></Button>
      </div>
    </AuthShell>
  );
}
