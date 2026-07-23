import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/customer/checkout/success")({
  component: Success,
});

function Success() {
  const orderRef = `MN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Order placed!</h1>
      <p className="mt-2 text-sm text-muted-foreground">Confirmation number <span className="font-mono font-medium text-foreground">{orderRef}</span>. We'll email you a receipt shortly.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild><Link to="/customer/orders">View orders</Link></Button>
        <Button asChild variant="outline"><Link to="/products">Keep shopping</Link></Button>
      </div>
    </div>
  );
}
