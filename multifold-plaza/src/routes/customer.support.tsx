import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, MessageSquare, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/support")({
  component: Support,
});

const FAQ = [
  { q: "How do I track my order?", a: "Open the order from My Orders — you'll see live status and a progress timeline." },
  { q: "How do I cancel a booking?", a: "Go to My Bookings, choose the appointment, then tap Cancel. Cancellations 24h+ before start are free." },
  { q: "When will I get a refund?", a: "Refunds usually post 3-5 business days after approval, back to your original payment method." },
  { q: "Can I chat with the business?", a: "Yes — every order and booking has a direct chat with the business owner." },
];

function Support() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Support</h2>
        <p className="text-sm text-muted-foreground">We're here to help — reach us any way you like.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: MessageSquare, title: "Live chat", hint: "Avg reply < 2 min" },
          { icon: Mail, title: "Email", hint: "help@multinexus.io" },
          { icon: Phone, title: "Call", hint: "Mon–Fri · 9–6 PT" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <c.icon className="h-5 w-5 text-accent" />
            <p className="mt-3 font-semibold">{c.title}</p>
            <p className="text-xs text-muted-foreground">{c.hint}</p>
          </div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h3 className="flex items-center gap-2 text-sm font-semibold"><LifeBuoy className="h-4 w-4 text-accent" /> Submit a ticket</h3>
          <div className="mt-4 space-y-3">
            <div><Label>Subject</Label><Input placeholder="What can we help with?" /></div>
            <div><Label>Describe the issue</Label><Textarea rows={5} placeholder="Include order number if relevant…" /></div>
            <Button className="w-full" onClick={() => toast.success("Ticket submitted — we'll reply within 24h")}>Send</Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Frequently asked</h3>
          <Accordion type="single" collapsible className="mt-2">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
