import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, projects, type Category, type Difficulty } from "@/data/mockProjects";
import { ArrowRight, Search, Clock } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — CodeMaster" },
      { name: "description", content: "Browse beginner to advanced frontend, backend, and full stack projects with full roadmaps." },
    ],
  }),
});

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [diff, setDiff] = useState<Difficulty | "All">("All");

  const filtered = projects.filter((p) => {
    if (cat !== "All" && p.category !== cat) return false;
    if (diff !== "All" && p.difficulty !== diff) return false;
    if (q && !`${p.title} ${p.description} ${p.technologies.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl w-full px-6 py-12 flex-1">
        <h1 className="text-4xl font-bold">Explore Projects</h1>
        <p className="text-muted-foreground mt-2">Pick a project that matches your level. Each one comes with a full roadmap.</p>

        <div className="mt-8 grid gap-4 md:flex md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={cat === "All" ? "default" : "outline"} onClick={() => setCat("All")}>All</Button>
            {categories.map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={diff === "All" ? "secondary" : "ghost"} onClick={() => setDiff("All")}>All levels</Button>
            {difficulties.map((d) => (
              <Button key={d} size="sm" variant={diff === d ? "secondary" : "ghost"} onClick={() => setDiff(d)}>{d}</Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p.id} to="/project/$id" params={{ id: p.id }}>
              <Card className="p-6 h-full hover:border-primary/60 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center justify-between mb-3">
                  <Badge>{p.category}</Badge>
                  <Badge variant="outline">{p.difficulty}</Badge>
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs rounded-md bg-muted px-2 py-0.5 text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{p.estimatedHours}h</span>
                  <span className="text-xs text-primary font-medium flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></span>
                </div>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">No projects match your filters.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
