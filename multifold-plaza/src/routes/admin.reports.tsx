import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Flag } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const reports = [
  { id: "rpt_1", type: "Review", target: "Bloom Bakery", reason: "Spam", by: "Sam Patel", status: "pending" as const, date: "2026-07-18" },
  { id: "rpt_2", type: "Product", target: "Chai Concentrate", reason: "Misleading description", by: "Ana Cruz", status: "pending" as const, date: "2026-07-17" },
  { id: "rpt_3", type: "Business", target: "Aurora Nails", reason: "Fake reviews", by: "Kai Chen", status: "resolved" as const, date: "2026-07-12" },
  { id: "rpt_4", type: "Review", target: "Rooted Barbers", reason: "Harassment", by: "Jules Reyna", status: "pending" as const, date: "2026-07-19" },
];

function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
        <p className="text-sm text-muted-foreground">User-submitted reports awaiting your review.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Report</th>
              <th className="px-4 py-3 text-left">Target</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Reported by</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    <Flag className="h-3.5 w-3.5 text-warning" /> {r.type}
                  </div>
                </td>
                <td className="px-4 py-3">{r.target}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.reason}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.by}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status === "resolved" ? "completed" : "pending"} /></td>
                <td className="px-4 py-3 text-right">
                  {r.status === "pending" && (
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost">Dismiss</Button>
                      <Button size="sm">Resolve</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
