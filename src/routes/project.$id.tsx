import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/data/mockProjects";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ArrowLeft, CheckCircle2, Terminal, FolderTree, Rocket, BookOpen } from "lucide-react";

export const Route = createFileRoute("/project/$id")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <p className="text-destructive">{error.message}</p>
          <Button className="mt-4" onClick={() => { router.invalidate(); reset(); }}>Retry</Button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => {
    const { id } = Route.useParams();
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-muted-foreground mt-2">"{id}" doesn't exist.</p>
          <Button asChild className="mt-4"><Link to="/projects">Browse projects</Link></Button>
        </div>
      </div>
    );
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} — CodeMaster` },
      { name: "description", content: loaderData?.project.description ?? "" },
    ],
  }),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [done, setDone] = useLocalStorage<string[]>(`progress-${project.id}`, []);

  const toggle = (step: string) => {
    setDone(done.includes(step) ? done.filter((s) => s !== step) : [...done, step]);
  };
  const pct = Math.round((done.length / project.roadmap.length) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-6xl w-full px-6 py-10 flex-1">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge>{project.category}</Badge>
                <Badge variant="outline">{project.difficulty}</Badge>
                <span className="text-xs text-muted-foreground">~{project.estimatedHours}h</span>
              </div>
              <h1 className="text-4xl font-bold">{project.title}</h1>
              <p className="text-lg text-muted-foreground mt-3">{project.description}</p>
            </div>

            <Tabs defaultValue="roadmap">
              <TabsList>
                <TabsTrigger value="roadmap"><Rocket className="h-4 w-4 mr-1" /> Roadmap</TabsTrigger>
                <TabsTrigger value="setup"><Terminal className="h-4 w-4 mr-1" /> Setup</TabsTrigger>
                <TabsTrigger value="structure"><FolderTree className="h-4 w-4 mr-1" /> Structure</TabsTrigger>
                <TabsTrigger value="features"><BookOpen className="h-4 w-4 mr-1" /> Features</TabsTrigger>
              </TabsList>

              <TabsContent value="roadmap" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Step-by-step roadmap</h3>
                    <span className="text-sm text-primary font-semibold">{pct}% complete</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden mb-6">
                    <div className="h-full transition-all" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
                  </div>
                  <ul className="space-y-3">
                    {project.roadmap.map((step: string, i: number) => {
                      const checked = done.includes(step);
                      return (
                        <li key={step} className="flex items-start gap-3 rounded-md p-3 hover:bg-muted/50 cursor-pointer" onClick={() => toggle(step)}>
                          <Checkbox checked={checked} className="mt-0.5" />
                          <div>
                            <div className={checked ? "line-through text-muted-foreground" : "font-medium"}>Step {i + 1}: {step}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {checked ? "Done — nice work!" : "Tap to mark complete when finished."}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="setup" className="mt-4">
                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Installation & Setup</h3>
                  <p className="text-sm text-muted-foreground">Run these in your terminal. New to terminals? Open VS Code → View → Terminal.</p>
                  <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# 1. Install Node.js from nodejs.org (LTS)
node -v
npm -v

# 2. Scaffold the project
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# 3. Install dependencies
${project.technologies.map((t: string) => `npm install ${t.toLowerCase().replace(/ /g, "-")}`).join("\n")}

# 4. Start the dev server
npm run dev`}</code></pre>
                </Card>
              </TabsContent>

              <TabsContent value="structure" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Folder structure</h3>
                  <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{project.folderStructure}</code></pre>
                  <p className="text-xs text-muted-foreground mt-4">
                    This mirrors what most professional teams use. Each folder has a single responsibility — components for UI, hooks for reusable logic, services for API calls.
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">Features you'll build</h3>
                  <ul className="space-y-2">
                    {project.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-success" /> {f}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-4">
            <Card className="p-5">
              <h4 className="font-semibold mb-3">Tech stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h4 className="font-semibold mb-2">Need help?</h4>
              <p className="text-sm text-muted-foreground mb-3">Stuck on a step? Chat with the AI mentor.</p>
              <Button asChild className="w-full" style={{ background: "var(--gradient-primary)" }}>
                <Link to="/mentor">Open AI Mentor</Link>
              </Button>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
