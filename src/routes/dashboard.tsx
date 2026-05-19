import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/mockProjects";
import { Flame, Trophy, Target, TrendingUp, BookOpen } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — CodeMaster" }, { name: "description", content: "Track your project progress, streaks, and skill growth." }] }),
});

const weekData = [
  { day: "Mon", tasks: 3 },
  { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 2 },
  { day: "Thu", tasks: 7 },
  { day: "Fri", tasks: 6 },
  { day: "Sat", tasks: 4 },
  { day: "Sun", tasks: 8 },
];

function Dashboard() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const result: Record<string, number> = {};
    projects.forEach((p) => {
      try {
        const raw = localStorage.getItem(`progress-${p.id}`);
        const done = raw ? (JSON.parse(raw) as string[]) : [];
        result[p.id] = Math.round((done.length / p.roadmap.length) * 100);
      } catch { result[p.id] = 0; }
    });
    setProgress(result);
  }, []);

  const active = projects.filter((p) => progress[p.id] > 0 && progress[p.id] < 100);
  const completed = projects.filter((p) => progress[p.id] === 100);
  const totalTasks = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl w-full px-6 py-10 flex-1">
        <h1 className="text-4xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">Pick up where you left off and watch the streak grow.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Active projects", value: active.length, icon: Target, color: "var(--primary)" },
            { label: "Completed", value: completed.length, icon: Trophy, color: "var(--success)" },
            { label: "Streak", value: "7 days", icon: Flame, color: "var(--accent)" },
            { label: "Progress score", value: `${totalTasks}%`, icon: TrendingUp, color: "var(--primary-glow)" },
          ].map((s) => (
            <Card key={s.label} className="p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
                <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: s.color, opacity: 0.85 }}>
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2 p-6">
            <h3 className="font-semibold mb-4">Weekly consistency</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.7 0.22 300)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.7 0.22 300)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0.05 290 / 0.2)" />
                  <XAxis dataKey="day" stroke="currentColor" className="text-muted-foreground text-xs" />
                  <YAxis stroke="currentColor" className="text-muted-foreground text-xs" />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="tasks" stroke="oklch(0.7 0.22 300)" fill="url(#grad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Skill growth</h3>
            <div className="space-y-4">
              {[
                { label: "React", value: 78 },
                { label: "Node.js", value: 55 },
                { label: "TypeScript", value: 65 },
                { label: "MongoDB", value: 40 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1"><span>{s.label}</span><span className="text-muted-foreground">{s.value}%</span></div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full" style={{ width: `${s.value}%`, background: "var(--gradient-primary)" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> In progress</h3>
          {active.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active projects yet. <Link to="/projects" className="text-primary hover:underline">Browse projects</Link> to start one.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {active.map((p) => (
                <Link key={p.id} to="/project/$id" params={{ id: p.id }}>
                  <Card className="p-4 hover:border-primary transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{p.title}</span>
                      <Badge variant="outline">{progress[p.id]}%</Badge>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full" style={{ width: `${progress[p.id]}%`, background: "var(--gradient-primary)" }} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          <Button asChild variant="outline" className="mt-4"><Link to="/projects">Browse more projects</Link></Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
