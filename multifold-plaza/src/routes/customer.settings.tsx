import { createFileRoute } from "@tanstack/react-router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/settings")({
  component: Settings,
});

function Toggle({ id, label, hint, defaultChecked }: { id: string; label: string; hint: string; defaultChecked?: boolean }) {
  const [v, setV] = useState(!!defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={v} onCheckedChange={setV} />
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Notifications, preferences, privacy.</p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <div className="mt-2 divide-y divide-border">
          <Toggle id="email-orders" label="Order updates by email" hint="Shipping, delivery, and receipts." defaultChecked />
          <Toggle id="email-promo" label="Promotions & offers" hint="Deals from businesses you follow." />
          <Toggle id="sms-book" label="Booking reminders (SMS)" hint="Text me 1 hour before appointments." defaultChecked />
          <Toggle id="push-msg" label="Push notifications" hint="Messages and important alerts." defaultChecked />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold">Preferences</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Currency</Label>
            <Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="usd">USD $</SelectItem><SelectItem value="eur">EUR €</SelectItem><SelectItem value="gbp">GBP £</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Español</SelectItem><SelectItem value="fr">Français</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/40 bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold text-destructive">Danger zone</h3>
        <p className="mt-1 text-xs text-muted-foreground">Permanently delete your account and all associated data.</p>
        <Button variant="destructive" size="sm" className="mt-4" onClick={() => toast.error("Deletion requires email confirmation")}>Delete account</Button>
      </section>
    </div>
  );
}
