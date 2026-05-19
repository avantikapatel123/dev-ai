import { Code2, Github, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            CodeMaster
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Learn development by building real projects with AI guidance.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/resources" className="hover:text-primary">Resources</Link></li>
            <li><Link to="/mentor" className="hover:text-primary">AI Mentor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Workspace</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link to="/notes" className="hover:text-primary">Notes</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="GitHub"><Github className="h-5 w-5 hover:text-primary" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 CodeMaster. Built for learners.
      </div>
    </footer>
  );
}
