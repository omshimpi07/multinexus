import { Link } from "@tanstack/react-router";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLS = [
  {
    label: "Product",
    links: [
      { to: "/businesses", label: "Businesses" },
      { to: "/products", label: "Products" },
      { to: "/services", label: "Services" },
      { to: "/categories", label: "Categories" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    label: "For business",
    links: [
      { to: "/become-a-business", label: "Become a Business" },
      { to: "/pricing", label: "Plans" },
      { to: "/business", label: "Business dashboard" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    label: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/faq", label: "Help center" },
    ],
  },
  {
    label: "Legal",
    links: [
      { to: "/terms", label: "Terms of Service" },
      { to: "/privacy", label: "Privacy" },
      { to: "/cookies", label: "Cookie policy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
                style={{ background: "var(--gradient-brand)" }}
              >
                M
              </div>
              <span className="text-lg font-bold tracking-tight">MultiNexus</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              One platform. Multiple businesses. Unlimited possibilities. Discover, shop, and book from
              independent businesses everywhere.
            </p>
            <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="you@example.com" type="email" className="h-9" />
              <Button size="sm" type="submit">
                Subscribe
              </Button>
            </form>
            <div className="mt-6 flex gap-3 text-muted-foreground">
              <a href="#" aria-label="Twitter" className="rounded-md p-2 hover:bg-secondary hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="rounded-md p-2 hover:bg-secondary hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-md p-2 hover:bg-secondary hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Email" className="rounded-md p-2 hover:bg-secondary hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.label}>
              <p className="text-sm font-semibold">{c.label}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-muted-foreground transition hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MultiNexus, Inc. All rights reserved.</p>
          <p>Made with care for independent businesses.</p>
        </div>
      </div>
    </footer>
  );
}
