import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — MultiNexus" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  return (
    <AuthShell
      eyebrow="Reset"
      title="Choose a new password"
      subtitle="Passwords must be at least 8 characters."
      footer={<>Back to <Link to="/login" className="font-medium text-accent">log in</Link></>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Password updated. You can now sign in.");
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5"><Label>New password</Label><Input type="password" minLength={8} required /></div>
        <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password" minLength={8} required /></div>
        <Button type="submit" className="w-full" size="lg">Update password</Button>
      </form>
    </AuthShell>
  );
}
