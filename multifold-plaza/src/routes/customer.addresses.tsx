import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Address } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/addresses")({
  component: Addresses,
});

const SEED: Address[] = [
  { id: "a1", label: "Home", line1: "742 Evergreen Terrace", city: "Portland", region: "OR", postalCode: "97205", country: "USA", isDefault: true },
  { id: "a2", label: "Work", line1: "1 Market Street, Ste 200", city: "Portland", region: "OR", postalCode: "97204", country: "USA" },
];

function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(SEED);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "", line1: "", city: "", region: "", postalCode: "", country: "USA" });

  const setDefault = (id: string) => setAddresses((a) => a.map((x) => ({ ...x, isDefault: x.id === id })));
  const remove = (id: string) => setAddresses((a) => a.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Addresses</h2>
          <p className="text-sm text-muted-foreground">Manage your shipping and billing addresses.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-1 h-4 w-4" /> Add address</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New address</DialogTitle></DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><Label>Label</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home" /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} /></div>
              <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
              <div><Label>Region</Label><Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} /></div>
              <div><Label>Postal</Label><Input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} /></div>
              <div><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setAddresses((a) => [...a, { ...form, id: `a${Date.now()}` }]);
                  setForm({ label: "", line1: "", city: "", region: "", postalCode: "", country: "USA" });
                  setOpen(false);
                  toast.success("Address added");
                }}
              >Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <p className="font-semibold">{a.label}</p>
                {a.isDefault && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">Default</span>}
              </div>
              <button aria-label="Remove" onClick={() => remove(a.id)} className="rounded p-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{a.line1}<br />{a.city}, {a.region} {a.postalCode}<br />{a.country}</p>
            {!a.isDefault && (
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => setDefault(a.id)}>
                <Star className="mr-1 h-3 w-3" /> Set default
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
