import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — MultiNexus" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  return (
    <AuthShell
      eyebrow="Reset"
      title="Forgot your password?"
      subtitle="We'll email you a link to reset it."
      footer={<>Back to <Link to="/login" className="font-medium text-accent">log in</Link></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Check your email for a reset link.");
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" required placeholder="you@example.com" /></div>
        <Button type="submit" className="w-full" size="lg">Send reset link</Button>
      </form>
    </AuthShell>
  );
}
