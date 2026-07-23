import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — MultiNexus" }, { name: "description", content: "Frequently asked questions about MultiNexus." }] }),
  component: FaqPage,
});

const SECTIONS = [
  {
    title: "For customers",
    items: [
      { q: "How do I create an account?", a: "Click Sign up in the top right. It's free and takes about 30 seconds." },
      { q: "Are payments secure?", a: "Yes — payments are handled by PCI-compliant providers. We never store card details." },
      { q: "Can I cancel a booking?", a: "Most bookings can be cancelled up to 24 hours before the appointment for free." },
      { q: "Do you have a mobile app?", a: "The web app works beautifully on mobile. Native apps are coming soon." },
    ],
  },
  {
    title: "For businesses",
    items: [
      { q: "How much does it cost?", a: "You can start free. Paid plans start at $29/month. See the Pricing page for details." },
      { q: "How long does approval take?", a: "Most businesses are approved within 48 hours." },
      { q: "Can I bring my existing customers?", a: "Yes — import customer contacts and reach out through our built-in email tools." },
      { q: "Do I need a website?", a: "No — your MultiNexus storefront works as your primary site if you want it to." },
    ],
  },
];

function FaqPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Help" title="Frequently asked questions" align="center" />
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-3 text-lg font-semibold">{s.title}</h2>
              <Accordion type="single" collapsible>
                {s.items.map((x, i) => (
                  <AccordionItem key={i} value={s.title + i}>
                    <AccordionTrigger className="text-left">{x.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{x.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
