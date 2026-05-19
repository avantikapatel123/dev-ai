import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Trash2, Plus, BookOpen } from "lucide-react";

export const Route = createFileRoute("/notes")({
  component: Notes,
  head: () => ({ meta: [{ title: "Notes — CodeMaster" }, { name: "description", content: "Your personal coding journal — snippets, commands, reflections." }] }),
});

interface Note { id: string; title: string; body: string; ts: number; }

function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("codemaster-notes", []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const add = () => {
    if (!title.trim() && !body.trim()) return;
    setNotes([{ id: crypto.randomUUID(), title: title || "Untitled", body, ts: Date.now() }, ...notes]);
    setTitle(""); setBody("");
  };
  const del = (id: string) => setNotes(notes.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-5xl w-full px-6 py-10 flex-1">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <h1 className="text-4xl font-bold">Learning Notes</h1>
        </div>
        <p className="text-muted-foreground">Save snippets, commands, mistakes, and reflections.</p>

        <Card className="p-5 mt-8">
          <Input placeholder="Note title (e.g. 'Vite + Tailwind setup')" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea className="mt-3 min-h-32" placeholder="What did you learn? Paste commands, code, or mistakes to remember…" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button className="mt-3" onClick={add} style={{ background: "var(--gradient-primary)" }}>
            <Plus className="h-4 w-4 mr-1" /> Add note
          </Button>
        </Card>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {notes.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No notes yet. Start journaling above ↑</p>}
          {notes.map((n) => (
            <Card key={n.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-xs text-muted-foreground">{new Date(n.ts).toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => del(n.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
              <p className="text-sm mt-3 whitespace-pre-wrap">{n.body}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
