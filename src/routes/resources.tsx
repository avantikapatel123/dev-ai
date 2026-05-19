import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({ meta: [{ title: "Resources — CodeMaster" }, { name: "description", content: "Curated learning resources for React, Node.js, Git, APIs, databases, and deployment." }] }),
});

const resources = [
  { topic: "React", links: [
    { name: "React Official Docs", url: "https://react.dev", desc: "The new official docs — start here." },
    { name: "React Patterns", url: "https://reactpatterns.com", desc: "Common component patterns." },
  ]},
  { topic: "JavaScript", links: [
    { name: "MDN JavaScript Guide", url: "https://developer.mozilla.org/docs/Web/JavaScript", desc: "Deep reference for the language." },
    { name: "JavaScript.info", url: "https://javascript.info", desc: "Beginner-friendly modern JS tutorial." },
  ]},
  { topic: "Git & GitHub", links: [
    { name: "Pro Git Book", url: "https://git-scm.com/book", desc: "Free comprehensive Git book." },
    { name: "GitHub Skills", url: "https://skills.github.com", desc: "Interactive courses on GitHub." },
  ]},
  { topic: "APIs", links: [
    { name: "REST API Tutorial", url: "https://restfulapi.net", desc: "REST principles and design." },
    { name: "Postman Learning", url: "https://learning.postman.com", desc: "API testing and documentation." },
  ]},
  { topic: "Databases", links: [
    { name: "MongoDB University", url: "https://learn.mongodb.com", desc: "Free MongoDB courses." },
    { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com", desc: "Practical SQL with Postgres." },
  ]},
  { topic: "Tailwind CSS", links: [
    { name: "Tailwind Docs", url: "https://tailwindcss.com/docs", desc: "Utility-first CSS framework." },
  ]},
  { topic: "Deployment", links: [
    { name: "Vercel Docs", url: "https://vercel.com/docs", desc: "Deploy frontend apps fast." },
    { name: "Render Docs", url: "https://render.com/docs", desc: "Backend hosting made simple." },
  ]},
];

function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-6xl w-full px-6 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <h1 className="text-4xl font-bold">Developer Resources</h1>
        </div>
        <p className="text-muted-foreground">Hand-picked free resources to level up.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {resources.map((r) => (
            <Card key={r.topic} className="p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <Badge className="mb-3">{r.topic}</Badge>
              <ul className="space-y-3">
                {r.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-3 rounded-md p-2 hover:bg-muted">
                      <div>
                        <div className="font-medium group-hover:text-primary">{l.name}</div>
                        <div className="text-xs text-muted-foreground">{l.desc}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
