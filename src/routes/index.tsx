import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Brain, Code2, FolderTree, MessageSquare, Rocket, Sparkles, Terminal, Zap } from "lucide-react";
import { categories, projects } from "@/data/mockProjects";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CodeMaster — Learn Development by Building Real Projects" },
      { name: "description", content: "AI-guided project learning platform. Build frontend, backend, and full stack apps step by step." },
    ],
  }),
});

const features = [
  { icon: Brain, title: "AI Mentor Chat", desc: "Get step-by-step guidance like a senior developer pairing with you." },
  { icon: FolderTree, title: "Smart Folder Generator", desc: "Industry-standard structures explained folder by folder." },
  { icon: Terminal, title: "Setup & Install Guides", desc: "From Node.js to Vite to Tailwind — beginner-friendly terminal help." },
  { icon: Rocket, title: "Project Roadmaps", desc: "Build real apps with structured tasks, tips, and outcomes." },
  { icon: Zap, title: "Progress Dashboard", desc: "Track streaks, completed steps, and your skill growth." },
  { icon: MessageSquare, title: "Voice Assistant", desc: "Talk with your AI mentor and debug issues out loud." },
];

const testimonials = [
  { name: "Aanya R.", role: "CS Student", text: "CodeMaster finally made me feel like a real developer. The roadmaps are gold." },
  { name: "Vikram S.", role: "Bootcamp grad", text: "I cleared interviews because I actually built end-to-end projects here." },
  { name: "Maya P.", role: "Self-learner", text: "The AI mentor explains errors better than most YouTube videos." },
];

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)", opacity: 0.18 }} />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,var(--primary)/12%,transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-5 border-primary/40 text-primary">
              <Sparkles className="h-3 w-3 mr-1" /> AI-Powered Project Learning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Learn development by{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                building real projects
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              CodeMaster guides you through frontend, backend, and full stack apps — with AI mentorship, setup help, folder structures, and structured tasks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                <Link to="/projects">Browse Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/mentor">Talk to AI Mentor</Link>
              </Button>
            </div>
            <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
              <div><span className="text-foreground font-semibold">50+</span> projects</div>
              <div><span className="text-foreground font-semibold">100%</span> hands-on</div>
              <div><span className="text-foreground font-semibold">Free</span> forever</div>
            </div>
          </div>

          {/* Code window mock */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
            <Card className="relative overflow-hidden border-border/60 p-0" style={{ boxShadow: "var(--shadow-glow)" }}>
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-accent/70" />
                <span className="h-3 w-3 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-muted-foreground">codemaster — mentor.ts</span>
              </div>
              <pre className="p-5 text-sm leading-relaxed overflow-x-auto"><code>{`// AI Mentor: building a Task Manager
> npm create vite@latest task-app
> cd task-app && npm install
> npm install tailwindcss @tanstack/react-query

✓ Project initialized
✓ Tailwind configured
✓ Routes created
→ Next: build auth with JWT`}</code></pre>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary">Features</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Everything you need to ship real software</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-6 hover:border-primary/50 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="h-11 w-11 rounded-lg grid place-items-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Project Categories</h2>
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((c) => (
            <Link key={c} to="/projects" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              {c}
            </Link>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p) => (
            <Link key={p.id} to="/project/$id" params={{ id: p.id }}>
              <Card className="p-6 h-full hover:border-primary/60 transition-all hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-center justify-between mb-3">
                  <Badge>{p.category}</Badge>
                  <Badge variant="outline">{p.difficulty}</Badge>
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-primary font-medium">
                  View roadmap <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Loved by learners</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="text-sm">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full grid place-items-center text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="1"><AccordionTrigger>Is CodeMaster free?</AccordionTrigger><AccordionContent>Yes — all project guidance, AI mentor and roadmaps are free.</AccordionContent></AccordionItem>
          <AccordionItem value="2"><AccordionTrigger>Do I need prior experience?</AccordionTrigger><AccordionContent>No. We have beginner tracks that start from installing Node.js.</AccordionContent></AccordionItem>
          <AccordionItem value="3"><AccordionTrigger>Where is my progress saved?</AccordionTrigger><AccordionContent>Locally in your browser — no signup required.</AccordionContent></AccordionItem>
          <AccordionItem value="4"><AccordionTrigger>Can the AI help me debug errors?</AccordionTrigger><AccordionContent>Yes, paste your error in the AI Mentor chat and it walks you through the fix.</AccordionContent></AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Card className="overflow-hidden p-10 text-center border-0" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-glow)" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to build your first real project?</h2>
          <p className="mt-3 text-primary-foreground/80">Pick a roadmap, follow the steps, ship it.</p>
          <Button size="lg" variant="secondary" asChild className="mt-6">
            <Link to="/projects">Start now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
