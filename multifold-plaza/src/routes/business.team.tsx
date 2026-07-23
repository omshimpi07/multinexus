import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/business/team")({
  component: BusinessTeam,
});

const initialTeam = [
  { id: "t1", name: "Sofia Reyes", email: "sofia@bloombakery.com", role: "Owner" },
  { id: "t2", name: "Marco Vela", email: "marco@bloombakery.com", role: "Manager" },
  { id: "t3", name: "Ines Park", email: "ines@bloombakery.com", role: "Staff" },
  { id: "t4", name: "Diego Ruiz", email: "diego@bloombakery.com", role: "Staff" },
];

function BusinessTeam() {
  const [team] = useState(initialTeam);
  const [invite, setInvite] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Team</h2>
        <p className="text-sm text-muted-foreground">Invite and manage staff access.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h3 className="mb-3 text-sm font-semibold">Invite a teammate</h3>
        <div className="flex gap-2">
          <Input value={invite} onChange={(e) => setInvite(e.target.value)} placeholder="email@company.com" type="email" />
          <Button><UserPlus className="mr-1 h-3.5 w-3.5" /> Send invite</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Member</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {team.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{m.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{m.role}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded p-1.5 hover:bg-secondary" aria-label="More">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
