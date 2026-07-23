import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const Route = createFileRoute("/business/settings")({
  component: BusinessSettings,
});

function BusinessSettings() {
  const [emailOrders, setEmailOrders] = useState(true);
  const [emailReviews, setEmailReviews] = useState(true);
  const [publicListing, setPublicListing] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Business profile and preferences.</p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-5 text-base font-semibold">Business profile</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Business name</Label>
            <Input defaultValue="Bloom Bakery" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input defaultValue="Food & Bakery" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="(503) 555-0142" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" defaultValue="hello@bloombakery.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Tagline</Label>
            <Input defaultValue="Sourdough, croissants, and slow-fermented magic" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea rows={4} defaultValue="A neighborhood micro-bakery baking small batches of sourdough, laminated pastries, and seasonal cakes from local grain." />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-5 text-base font-semibold">Preferences</h3>
        <div className="space-y-4">
          {[
            { label: "Email me on new orders", state: emailOrders, set: setEmailOrders },
            { label: "Email me on new reviews", state: emailReviews, set: setEmailReviews },
            { label: "Show business in public directory", state: publicListing, set: setPublicListing },
            { label: "Auto-confirm new bookings", state: autoConfirm, set: setAutoConfirm },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-sm">{r.label}</span>
              <Switch checked={r.state} onCheckedChange={r.set} />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6">
        <h3 className="text-base font-semibold text-destructive">Danger zone</h3>
        <p className="mt-1 text-sm text-muted-foreground">Deactivating hides your business from the directory. You can re-enable it anytime.</p>
        <Button variant="destructive" className="mt-4">Deactivate business</Button>
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
