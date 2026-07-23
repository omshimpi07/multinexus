import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — MultiNexus" }, { name: "description", content: "Get in touch with the MultiNexus team." }] }),
  component: Contact,
});

function Contact() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">We'd love to hear from you</h1>
            <p className="mt-3 text-muted-foreground">Questions, feedback, or partnership ideas — send us a note and we'll get back within 1 business day.</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> hello@multinexus.io</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +1 (555) 010-8842</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> 42 Market St, Portland, OR</li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent — we'll be in touch!");
            }}
            className="rounded-2xl border border-border bg-card p-6 shadow-elegant"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>First name</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input required /></div>
            </div>
            <div className="mt-3 space-y-1.5"><Label>Email</Label><Input type="email" required /></div>
            <div className="mt-3 space-y-1.5"><Label>Subject</Label><Input /></div>
            <div className="mt-3 space-y-1.5"><Label>Message</Label><Textarea rows={5} required /></div>
            <Button type="submit" className="mt-4 w-full">Send message</Button>
          </form>
        </div>
      </div>
    </PublicShell>
  );
}
