import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usersQuery } from "@/services";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { Search, Ban, ShieldCheck } from "lucide-react";
import { useState } from "react";

const ROLES = ["all", "customer", "business", "admin"] as const;

export const Route = createFileRoute("/admin/users")({
  loader: ({ context }) => context.queryClient.ensureQueryData(usersQuery()),
  component: AdminUsers,
});

function AdminUsers() {
  const { data: users } = useSuspenseQuery(usersQuery());
  const [q, setQ] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("all");

  const filtered = users.filter((u) => {
    if (role !== "all" && u.role !== role) return false;
    if (q && !(u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-sm text-muted-foreground">{users.length} people on the platform.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email…" className="pl-9" />
        </div>
        <div className="flex gap-1">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                role === r ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-right">Orders</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback>{u.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize">{u.role}</span></td>
                <td className="px-4 py-3 text-right">{u.orders}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(u.joined).toLocaleDateString()}</td>
                <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3 text-right">
                  {u.status === "active" ? (
                    <Button size="sm" variant="ghost"><Ban className="mr-1 h-3.5 w-3.5" /> Suspend</Button>
                  ) : (
                    <Button size="sm" variant="ghost"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Reactivate</Button>
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
