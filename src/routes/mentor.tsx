import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Bot, Send, Sparkles, Mic, MicOff, Image as ImageIcon, Terminal, AlertCircle,
  Trash2, MonitorUp, Volume2, Wifi, Activity, Lightbulb, BookOpen, Copy, Check,
  X, FileCode, Zap, GitBranch, Package, Bug,
} from "lucide-react";

export const Route = createFileRoute("/mentor")({
  component: MentorPage,
  head: () => ({
    meta: [
      { title: "AI Live Developer Assistant — CodeMaster" },
      { name: "description", content: "Chat with an AI senior developer for real-time debugging and project guidance." },
    ],
  }),
});

interface Msg {
  id: string;
  role: "user" | "ai" | "system";
  text: string;
  ts: number;
  attachment?: { name: string; kind: "screenshot" | "log" | "snippet"; preview?: string };
  diagnosis?: Diagnosis;
}

interface Diagnosis {
  errorType: string;
  likelyCause: string;
  steps: string[];
  commands: string[];
  docs?: { label: string; url: string }[];
}

const QUICK_PROMPTS = [
  { icon: Bug, label: "My React app won't start" },
  { icon: Package, label: "npm install fails with errors" },
  { icon: GitBranch, label: "Git push rejected — help" },
  { icon: Zap, label: "Vite build is breaking" },
  { icon: FileCode, label: "Explain useEffect double-run" },
  { icon: Wifi, label: "Fetch returns CORS error" },
];

const TERMINAL_GUIDE = [
  { cmd: "npm install", what: "Installs every dependency listed in package.json into node_modules." },
  { cmd: "npm run dev", what: "Starts the local dev server with hot reload (Vite/Next/CRA)." },
  { cmd: "git status", what: "Shows which files changed, staged, or untracked in your repo." },
  { cmd: "git push origin main", what: "Uploads your committed changes to the remote main branch." },
  { cmd: "npm install react-router-dom", what: "Adds React Router for client-side navigation." },
  { cmd: "rm -rf node_modules && npm install", what: "Nuclear reset when dependencies act weird." },
];

const TIPS = [
  "Read the FIRST line of an error — the rest is usually noise.",
  "Restart your dev server after editing tailwind.config or vite.config.",
  "Use absolute imports (@/components/...) to keep paths clean.",
  "Commit small, commit often. Future-you will thank present-you.",
  "If it works in dev but breaks in prod — check env variables.",
];

function diagnose(input: string): Diagnosis | null {
  const q = input.toLowerCase();
  if (q.includes("won't start") || q.includes("not starting") || q.includes("wont start")) {
    return {
      errorType: "Dev server failed to start",
      likelyCause: "Missing dependencies, port in use, or corrupted node_modules.",
      steps: [
        "Check Node.js is installed: run node -v (should be 18+).",
        "Delete node_modules and lockfile, then reinstall.",
        "Verify port 5173 (Vite) or 3000 (CRA/Next) isn't already used.",
        "Read the exact red line in the terminal — paste it here.",
      ],
      commands: ["node -v", "rm -rf node_modules package-lock.json", "npm install", "npm run dev"],
      docs: [{ label: "Vite troubleshooting", url: "https://vitejs.dev/guide/troubleshooting.html" }],
    };
  }
  if (q.includes("cors")) {
    return {
      errorType: "CORS blocked request",
      likelyCause: "Your backend isn't sending Access-Control-Allow-Origin for your frontend's origin.",
      steps: [
        "Confirm the backend URL is correct (no typos, right port).",
        "Add cors middleware on the backend (Express: app.use(cors())).",
        "For dev, configure a Vite proxy under server.proxy to avoid CORS entirely.",
      ],
      commands: ["npm install cors", "// In server: import cors from 'cors'; app.use(cors())"],
      docs: [{ label: "MDN: CORS", url: "https://developer.mozilla.org/docs/Web/HTTP/CORS" }],
    };
  }
  if (q.includes("useeffect")) {
    return {
      errorType: "useEffect running twice",
      likelyCause: "React 18 StrictMode intentionally double-invokes effects in development to surface bugs.",
      steps: [
        "This only happens in dev — production runs effects once.",
        "Make sure your effect cleanup function cancels timers, subscriptions, fetches.",
        "If using fetch, abort with AbortController in cleanup.",
      ],
      commands: ["// Add cleanup", "useEffect(() => {\n  const c = new AbortController();\n  fetch(url, { signal: c.signal });\n  return () => c.abort();\n}, []);"],
      docs: [{ label: "React docs: Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" }],
    };
  }
  if (q.includes("npm install") && (q.includes("fail") || q.includes("error"))) {
    return {
      errorType: "npm install failure",
      likelyCause: "Peer-dep conflict, network issue, or stale cache.",
      steps: [
        "Try --legacy-peer-deps if it's a peer dependency error.",
        "Clear npm cache and retry.",
        "Check the first ERESOLVE/ENOENT line — it names the offending package.",
      ],
      commands: ["npm cache clean --force", "npm install --legacy-peer-deps"],
    };
  }
  if (q.includes("git") && (q.includes("push") || q.includes("reject"))) {
    return {
      errorType: "git push rejected",
      likelyCause: "Remote has commits you don't have locally, or you're pushing to a protected branch.",
      steps: [
        "Pull and rebase first: git pull --rebase origin main.",
        "Resolve any conflicts, then git add . and git rebase --continue.",
        "Push again.",
      ],
      commands: ["git pull --rebase origin main", "git push origin main"],
    };
  }
  if (q.includes("vite") && q.includes("build")) {
    return {
      errorType: "Vite build failed",
      likelyCause: "TypeScript error, missing import, or env variable not exposed with VITE_ prefix.",
      steps: [
        "Read the file path Vite prints — open that file at the line shown.",
        "Env vars used in client code MUST start with VITE_.",
        "Run tsc --noEmit to surface type errors separately.",
      ],
      commands: ["npx tsc --noEmit", "npm run build"],
    };
  }
  return null;
}

function fakeReply(input: string): string {
  const d = diagnose(input);
  if (d) {
    return `I think this is a **${d.errorType}**.\n\n${d.likelyCause}\n\nLet's walk through it together — see the diagnosis card above. Run the commands one at a time and tell me what the terminal says after each.`;
  }
  const q = input.toLowerCase();
  if (q.includes("mongo")) {
    return `Connect MongoDB with Mongoose:\n\n1. **npm install mongoose**\n2. Add MONGO_URI to your .env\n3. In server/index.js:\n\n\`\`\`js\nimport mongoose from "mongoose";\nawait mongoose.connect(process.env.MONGO_URI);\n\`\`\`\n\nWant me to scaffold a User model next?`;
  }
  if (q.includes("folder") || q.includes("structure")) {
    return `A clean React layout I recommend:\n\n\`\`\`\nsrc/\n├── components/\n├── pages/\n├── hooks/\n├── services/\n├── utils/\n└── App.tsx\n\`\`\`\n\nKeep components small, hooks pure, services for API calls only.`;
  }
  return `Got it — let's debug "${input}" like real devs:\n\n1. Reproduce the issue locally.\n2. Read the **exact** error message — don't skip it.\n3. Search the first line of the stack trace.\n4. Try the smallest possible fix first.\n\nShare the error text or a screenshot and I'll narrow it down.`;
}

function MentorPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useLocalStorage<Msg[]>("mentor-chat-v3", []);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sharePanel, setSharePanel] = useState(false);
  const [shared, setShared] = useState<{ name: string; preview?: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && messages.length === 0) {
      setMessages([{
        id: "w",
        role: "ai",
        ts: Date.now(),
        text: "Hey 👋 I'm your **CodeMaster Live Dev Assistant**. Paste an error, share a screenshot, or talk to me with voice — I'll guide you like a senior dev on a remote pairing session.",
      }]);
    }
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!listening) { setTranscript(""); return; }
    const phrases = ["Listening…", "Listening… my app won't start", "Listening… my React app won't start after npm install"];
    let i = 0;
    const id = setInterval(() => {
      setTranscript(phrases[i % phrases.length]);
      i++;
      if (i >= phrases.length) {
        clearInterval(id);
        setTimeout(() => {
          setListening(false);
          send("My React app won't start after npm install");
        }, 600);
      }
    }, 900);
    return () => clearInterval(id);
  }, [listening]); // eslint-disable-line

  const send = (text: string, attachment?: Msg["attachment"]) => {
    if (!text.trim() && !attachment) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text, ts: Date.now(), attachment };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const d = diagnose(text || (attachment ? "screenshot of an error" : ""));
      const reply: Msg = {
        id: crypto.randomUUID(),
        role: "ai",
        ts: Date.now(),
        text: fakeReply(text || "Looking at your screenshot — common issue."),
        diagnosis: d ?? undefined,
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
      setSpeaking(true);
      setTimeout(() => setSpeaking(false), 1800);
    }, 900);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const preview = typeof reader.result === "string" ? reader.result : undefined;
      setShared({ name: f.name, preview });
      send(`I'm sharing a screenshot of my error: ${f.name}`, { name: f.name, kind: "screenshot", preview });
    };
    reader.readAsDataURL(f);
  };

  const clear = () => setMessages([{
    id: "w", role: "ai", ts: Date.now(),
    text: "Chat cleared. What are you building today?",
  }]);

  const copy = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="mx-auto max-w-[1400px] w-full px-4 lg:px-6 py-6 flex-1 grid lg:grid-cols-[300px_1fr_320px] gap-4">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-4">
          <Card className="p-5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold">Live Dev Assistant</div>
                <div className="text-xs text-success flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  Online · Senior dev mode
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md border border-border/60 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Response</div>
                <div className="text-sm font-bold text-primary">~0.9s</div>
              </div>
              <div className="rounded-md border border-border/60 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Solved</div>
                <div className="text-sm font-bold text-primary">98%</div>
              </div>
              <div className="rounded-md border border-border/60 p-2">
                <div className="text-[10px] text-muted-foreground uppercase">Mode</div>
                <div className="text-sm font-bold text-primary">Live</div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Quick prompts
            </h4>
            <div className="space-y-1.5">
              {QUICK_PROMPTS.map(({ icon: Icon, label }) => (
                <button key={label} onClick={() => send(label)}
                  className="w-full text-left text-xs rounded-md border border-border px-3 py-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0" /> {label}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-primary" /> Terminal cheatsheet
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {TERMINAL_GUIDE.map((t) => (
                <div key={t.cmd} className="rounded-md bg-muted/50 p-2 group">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[11px] font-mono text-primary truncate">{t.cmd}</code>
                    <button onClick={() => copy(t.cmd, t.cmd)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === t.cmd ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{t.what}</p>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* CENTER — CHAT CONSOLE */}
        <Card className="flex flex-col h-[calc(100vh-9rem)] overflow-hidden border-2" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-success/70" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">~/codemaster — live-dev-assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                <Activity className="h-2.5 w-2.5 mr-1" /> Live session
              </Badge>
              <Button variant="ghost" size="sm" onClick={clear} className="h-7 text-xs text-muted-foreground">
                <Trash2 className="h-3 w-3 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {(listening || speaking || shared) && (
            <div className="border-b border-border/60 px-5 py-3 bg-primary/5 flex items-center gap-4 flex-wrap">
              {listening && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 items-end h-6">
                    {[1,2,3,4,5,6,7].map((i) => (
                      <span key={i} className="w-1 rounded-full bg-primary animate-pulse"
                        style={{ height: `${10 + (i % 4) * 5}px`, animationDelay: `${i * 0.08}s` }} />
                    ))}
                  </div>
                  <span className="text-sm text-foreground font-medium">{transcript || "Listening…"}</span>
                </div>
              )}
              {speaking && !listening && (
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Assistant is speaking…</span>
                </div>
              )}
              {shared && (
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="secondary"><MonitorUp className="h-3 w-3 mr-1" /> Sharing: {shared.name}</Badge>
                  <button onClick={() => setShared(null)}><X className="h-3 w-3 text-muted-foreground" /></button>
                </div>
              )}
            </div>
          )}

          <div ref={scroller} className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-background to-muted/20">
            {!mounted ? null : messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && (
                  <div className="h-9 w-9 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[78%] space-y-2 ${m.role === "user" ? "items-end" : ""}`}>
                  {m.attachment?.preview && (
                    <div className="rounded-lg border border-border overflow-hidden max-w-xs">
                      <img src={m.attachment.preview} alt={m.attachment.name} className="w-full h-auto" />
                      <div className="px-2 py-1 text-[10px] text-muted-foreground bg-muted flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" /> {m.attachment.name}
                      </div>
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  }`}>
                    {m.text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
                      if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
                      if (part.startsWith("`")) return <code key={i} className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs font-mono">{part.slice(1, -1)}</code>;
                      return <span key={i}>{part}</span>;
                    })}
                  </div>

                  {m.diagnosis && (
                    <Card className="p-4 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-7 w-7 rounded-md grid place-items-center bg-destructive/15">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Diagnosed error</div>
                          <div className="font-semibold text-sm">{m.diagnosis.errorType}</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3"><strong className="text-foreground">Likely cause:</strong> {m.diagnosis.likelyCause}</p>

                      <div className="mb-3">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Step-by-step fix</div>
                        <ol className="space-y-1.5">
                          {m.diagnosis.steps.map((s, i) => (
                            <li key={i} className="text-xs flex gap-2">
                              <span className="h-4 w-4 shrink-0 rounded-full bg-primary/15 text-primary text-[10px] grid place-items-center font-bold">{i+1}</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="mb-2">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Commands to run</div>
                        <div className="rounded-md bg-foreground text-background p-3 font-mono text-xs space-y-1 relative group">
                          {m.diagnosis.commands.map((c, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-success select-none">$</span>
                              <span className="whitespace-pre-wrap break-all">{c}</span>
                            </div>
                          ))}
                          <button onClick={() => copy(m.diagnosis!.commands.join("\n"), m.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {copied === m.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5 text-background/70" />}
                          </button>
                        </div>
                      </div>

                      {m.diagnosis.docs && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {m.diagnosis.docs.map((d) => (
                            <a key={d.url} href={d.url} target="_blank" rel="noreferrer"
                              className="text-[11px] inline-flex items-center gap-1 text-primary hover:underline">
                              <BookOpen className="h-3 w-3" /> {d.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </Card>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-secondary grid place-items-center text-xs font-bold text-secondary-foreground">
                    You
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3 flex gap-1.5 items-center">
                  <span className="text-xs text-muted-foreground mr-1">analyzing</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/60 bg-card">
            <div className="px-4 pt-2 pb-1 flex items-center gap-1 flex-wrap">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => fileInput.current?.click()}>
                <ImageIcon className="h-3.5 w-3.5 mr-1" /> Share screenshot
              </Button>
              <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onFile} />
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setSharePanel(!sharePanel)}>
                <MonitorUp className="h-3.5 w-3.5 mr-1" /> Paste terminal log
              </Button>
              <Button variant={listening ? "destructive" : "ghost"} size="sm" className="h-7 text-xs"
                onClick={() => setListening(!listening)}>
                {listening ? <><MicOff className="h-3.5 w-3.5 mr-1" /> Stop voice</> : <><Mic className="h-3.5 w-3.5 mr-1" /> Voice</>}
              </Button>
            </div>
            {sharePanel && (
              <div className="px-4 pb-2">
                <textarea
                  className="w-full text-xs font-mono rounded-md border border-border bg-muted p-3 min-h-[80px] resize-y"
                  placeholder="Paste your terminal error output here…"
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      send("Here's my terminal output:\n\n```\n" + e.target.value + "\n```");
                      e.target.value = "";
                      setSharePanel(false);
                    }
                  }}
                />
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 pt-1 flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your bug, paste an error, or ask anything…"
                className="font-mono text-sm" />
              <Button type="submit" disabled={!input.trim()} style={{ background: "var(--gradient-primary)" }}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-4">
          <Tabs defaultValue="tips" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="tips" className="text-xs">Tips</TabsTrigger>
              <TabsTrigger value="errors" className="text-xs">Errors</TabsTrigger>
            </TabsList>

            <TabsContent value="tips" className="mt-3">
              <Card className="p-5">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5 text-primary" /> Smart suggestions
                </h4>
                <ul className="space-y-2.5">
                  {TIPS.map((t) => (
                    <li key={t} className="text-xs flex gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="mt-3">
              <Card className="p-5 space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-1.5">
                  <Bug className="h-3.5 w-3.5 text-primary" /> Common error categories
                </h4>
                {[
                  { t: "React errors", c: "Hooks, rendering, state updates" },
                  { t: "TypeScript", c: "Type mismatches, missing props" },
                  { t: "Tailwind CSS", c: "Class not applied, JIT issues" },
                  { t: "API fetch", c: "CORS, 404, JSON parsing" },
                  { t: "Node.js setup", c: "Version conflicts, env vars" },
                  { t: "Git conflicts", c: "Merge, rebase, force push" },
                ].map((e) => (
                  <button key={e.t} onClick={() => send(`I'm having ${e.t.toLowerCase()} issues`)}
                    className="block w-full text-left rounded-md border border-border p-2.5 hover:border-primary hover:bg-primary/5 transition-colors">
                    <div className="text-xs font-semibold">{e.t}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{e.c}</div>
                  </button>
                ))}
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="p-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative">
              <h4 className="font-semibold text-sm mb-2">Why students love this</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>✓ Learn debugging practically</li>
                <li>✓ Reduce fear of coding errors</li>
                <li>✓ Understand real dev workflows</li>
                <li>✓ 24/7 mentorship-like help</li>
              </ul>
            </div>
          </Card>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
