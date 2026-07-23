import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [holdReviews, setHoldReviews] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [signupsOpen, setSignupsOpen] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform settings</h2>
        <p className="text-sm text-muted-foreground">Global controls for MultiNexus.</p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-5 text-base font-semibold">Platform</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Platform name</Label>
            <Input defaultValue="MultiNexus" />
          </div>
          <div className="space-y-2">
            <Label>Support email</Label>
            <Input type="email" defaultValue="support@multinexus.io" />
          </div>
          <div className="space-y-2">
            <Label>Commission rate</Label>
            <Input type="number" defaultValue={8} />
          </div>
          <div className="space-y-2">
            <Label>Default currency</Label>
            <Input defaultValue="USD" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-5 text-base font-semibold">Moderation</h3>
        <div className="space-y-4">
          {[
            { label: "Auto-approve verified business applications", state: autoApprove, set: setAutoApprove },
            { label: "Hold new reviews for moderation", state: holdReviews, set: setHoldReviews },
            { label: "Allow new customer signups", state: signupsOpen, set: setSignupsOpen },
            { label: "Maintenance mode (public site read-only)", state: maintenance, set: setMaintenance },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-sm">{r.label}</span>
              <Switch checked={r.state} onCheckedChange={r.set} />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}
