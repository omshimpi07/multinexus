import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Store, User } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — MultiNexus" }] }),
  component: Signup,
});

function Signup() {
  const [role, setRole] = useState<"customer" | "business">("customer");
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your MultiNexus account"
      subtitle="It takes less than a minute."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-accent">Log in</Link></>}
    >
      <div className="mb-5 grid grid-cols-2 gap-2">
        {[
          { key: "customer", label: "I'm a customer", icon: User },
          { key: "business", label: "I run a business", icon: Store },
        ].map((r) => {
          const active = role === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setRole(r.key as never)}
              className={cn(
                "rounded-xl border p-3 text-left text-sm transition",
                active ? "border-accent bg-accent/5 shadow-card" : "border-border hover:border-accent/50",
              )}
            >
              <r.icon className={cn("h-4 w-4", active ? "text-accent" : "text-muted-foreground")} />
              <p className="mt-2 text-sm font-medium">{r.label}</p>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginAs(role);
          toast.success("Welcome to MultiNexus!");
          navigate({ to: role === "business" ? "/business" : "/customer" });
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label>First name</Label><Input required /></div>
          <div className="space-y-1.5"><Label>Last name</Label><Input required /></div>
        </div>
        {role === "business" && (
          <div className="space-y-1.5"><Label>Business name</Label><Input required /></div>
        )}
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" required /></div>
        <div className="space-y-1.5"><Label>Password</Label><Input type="password" required minLength={8} /></div>
        <p className="text-xs text-muted-foreground">By continuing you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
        <Button type="submit" className="w-full" size="lg">Create account</Button>
      </form>
    </AuthShell>
  );
}
