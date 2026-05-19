export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Category = "Frontend" | "Backend" | "Full Stack" | "AI" | "Portfolio" | "Mobile";

export interface ProjectResource {
  name: string;
  url: string;
  type: "docs" | "video" | "article" | "tool";
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  technologies: string[];
  features: string[];
  roadmap: string[];
  folderStructure: string;
  estimatedHours: number;
  youtubeId: string;
  resources: ProjectResource[];
}

export const projects: Project[] = [
  {
    id: "react-portfolio",
    title: "Developer Portfolio",
    category: "Portfolio",
    difficulty: "Beginner",
    description: "Build a sleek personal portfolio with smooth animations and dark mode.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    features: ["Hero section", "Project gallery", "Contact form", "Dark mode toggle"],
    roadmap: [
      "Project setup with Vite",
      "Tailwind CSS installation",
      "Build Navbar and Hero",
      "Add Projects section",
      "Contact form integration",
      "Deploy to Vercel",
    ],
    folderStructure: `src/
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── assets/
├── hooks/
└── App.tsx`,
    estimatedHours: 12,
    youtubeId: "k-Log6YwWcQ",
    resources: [
      { name: "React Official Docs", url: "https://react.dev", type: "docs" },
      { name: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", type: "docs" },
      { name: "Framer Motion Guide", url: "https://www.framer.com/motion/", type: "docs" },
      { name: "Deploy on Vercel", url: "https://vercel.com/docs", type: "article" },
    ],
  },
  {
    id: "task-manager",
    title: "Task Manager App",
    category: "Full Stack",
    difficulty: "Intermediate",
    description: "A productivity tool with auth, drag-and-drop tasks, and live sync.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: ["JWT auth", "CRUD tasks", "Drag & drop", "Filters", "Dashboard"],
    roadmap: [
      "Initialize client and server",
      "Setup MongoDB connection",
      "Auth endpoints (JWT)",
      "Task CRUD routes",
      "React UI with TanStack Query",
      "Drag and drop with dnd-kit",
      "Deploy to Render + Vercel",
    ],
    folderStructure: `client/
├── src/
│   ├── components/
│   ├── pages/
│   └── hooks/
server/
├── controllers/
├── routes/
├── models/
└── middleware/`,
    estimatedHours: 40,
    youtubeId: "4GUVz2psWUg",
    resources: [
      { name: "Express Docs", url: "https://expressjs.com", type: "docs" },
      { name: "MongoDB University", url: "https://learn.mongodb.com", type: "video" },
      { name: "JWT Introduction", url: "https://jwt.io/introduction", type: "article" },
      { name: "dnd-kit Docs", url: "https://dndkit.com", type: "docs" },
    ],
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot UI",
    category: "AI",
    difficulty: "Intermediate",
    description: "Modern AI chat interface with streaming responses and history.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    features: ["Chat UI", "Streaming text", "Markdown rendering", "Local history"],
    roadmap: [
      "Setup React + TS + Tailwind",
      "Build chat layout",
      "Markdown renderer",
      "Simulated streaming",
      "Persist chats to local storage",
      "Polish animations",
    ],
    folderStructure: `src/
├── components/
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   └── InputBar.tsx
├── hooks/
└── utils/`,
    estimatedHours: 18,
    youtubeId: "czuVbtMC-V0",
    resources: [
      { name: "OpenAI API Docs", url: "https://platform.openai.com/docs", type: "docs" },
      { name: "react-markdown", url: "https://github.com/remarkjs/react-markdown", type: "tool" },
      { name: "Streaming Responses", url: "https://developer.mozilla.org/docs/Web/API/Streams_API", type: "article" },
    ],
  },
  {
    id: "rest-api",
    title: "REST API with Express",
    category: "Backend",
    difficulty: "Beginner",
    description: "Build a clean REST API with auth, validation, and MongoDB.",
    technologies: ["Node.js", "Express", "MongoDB", "Zod"],
    features: ["Routes", "Controllers", "Middleware", "Validation", "Error handling"],
    roadmap: [
      "Initialize Node project",
      "Setup Express server",
      "Connect MongoDB with Mongoose",
      "Create routes & controllers",
      "Add JWT auth",
      "Deploy to Render",
    ],
    folderStructure: `server/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── index.js`,
    estimatedHours: 20,
    youtubeId: "fgTGADljAeg",
    resources: [
      { name: "Express Guide", url: "https://expressjs.com/en/guide/routing.html", type: "docs" },
      { name: "Mongoose Docs", url: "https://mongoosejs.com/docs/", type: "docs" },
      { name: "Zod Docs", url: "https://zod.dev", type: "docs" },
      { name: "Postman Learning", url: "https://learning.postman.com", type: "tool" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    category: "Full Stack",
    difficulty: "Advanced",
    description: "Full-featured shop with cart, checkout, and admin dashboard.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    features: ["Product catalog", "Cart", "Stripe checkout", "Admin panel", "Orders"],
    roadmap: [
      "Plan data models",
      "Setup Next.js project",
      "Build product pages",
      "Cart with context",
      "Stripe integration",
      "Admin dashboard",
      "Deploy",
    ],
    folderStructure: `app/
├── (shop)/
├── (admin)/
└── api/
components/
lib/
models/`,
    estimatedHours: 80,
    youtubeId: "T6MhAwQ64c0",
    resources: [
      { name: "Next.js Docs", url: "https://nextjs.org/docs", type: "docs" },
      { name: "Stripe Checkout", url: "https://stripe.com/docs/payments/checkout", type: "docs" },
      { name: "MongoDB Schema Design", url: "https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-summary/", type: "article" },
    ],
  },
  {
    id: "weather-app",
    title: "Weather Dashboard",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Live weather data with charts and forecasts.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    features: ["Search", "Current weather", "5-day forecast", "Charts"],
    roadmap: [
      "Setup project",
      "Integrate weather API",
      "Build search UI",
      "Display forecast",
      "Add charts",
      "Deploy",
    ],
    folderStructure: `src/
├── components/
├── hooks/
├── services/
└── utils/`,
    estimatedHours: 10,
    youtubeId: "UjeXpct35yA",
    resources: [
      { name: "OpenWeather API", url: "https://openweathermap.org/api", type: "docs" },
      { name: "Recharts Docs", url: "https://recharts.org", type: "docs" },
    ],
  },
  {
    id: "blog-cms",
    title: "Blog Platform with CMS",
    category: "Full Stack",
    difficulty: "Intermediate",
    description: "Markdown-powered blog with admin CMS, comments and tags.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    features: ["Markdown posts", "Admin editor", "Tags", "Comments", "SEO"],
    roadmap: [
      "Setup Next.js + Prisma",
      "Design DB schema",
      "Build post listing & detail",
      "Markdown rendering with MDX",
      "Admin CRUD interface",
      "Add comments & auth",
      "Deploy to Vercel + Supabase",
    ],
    folderStructure: `app/
├── (blog)/
├── (admin)/
└── api/
prisma/
└── schema.prisma`,
    estimatedHours: 50,
    youtubeId: "DqRD1HK7s7g",
    resources: [
      { name: "Prisma Docs", url: "https://www.prisma.io/docs", type: "docs" },
      { name: "MDX Docs", url: "https://mdxjs.com", type: "docs" },
      { name: "Next.js SEO Guide", url: "https://nextjs.org/learn/seo/introduction-to-seo", type: "article" },
    ],
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Conversion-optimized landing page with animations and pricing.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    features: ["Hero", "Pricing table", "Testimonials", "FAQ", "CTA"],
    roadmap: [
      "Setup Vite + Tailwind",
      "Build Hero & Navbar",
      "Add Features grid",
      "Pricing section",
      "Testimonials slider",
      "FAQ accordion",
      "Polish animations",
    ],
    folderStructure: `src/
├── components/
│   ├── Hero.tsx
│   ├── Pricing.tsx
│   └── FAQ.tsx
└── App.tsx`,
    estimatedHours: 8,
    youtubeId: "ldwlOzRvYOU",
    resources: [
      { name: "Tailwind UI", url: "https://tailwindui.com", type: "tool" },
      { name: "Framer Motion", url: "https://www.framer.com/motion/", type: "docs" },
    ],
  },
  {
    id: "chat-realtime",
    title: "Realtime Chat App",
    category: "Full Stack",
    difficulty: "Advanced",
    description: "WhatsApp-style chat with rooms, typing indicators and presence.",
    technologies: ["React", "Socket.io", "Node.js", "Express", "MongoDB"],
    features: ["Rooms", "1-on-1 chat", "Typing indicator", "Online presence", "Read receipts"],
    roadmap: [
      "Setup client + server",
      "Socket.io connection",
      "Auth + user list",
      "Message persistence in MongoDB",
      "Typing & presence events",
      "Read receipts",
      "Deploy",
    ],
    folderStructure: `client/
└── src/
    ├── components/
    └── socket/
server/
├── sockets/
└── models/`,
    estimatedHours: 45,
    youtubeId: "ZwFA3YMfkoc",
    resources: [
      { name: "Socket.io Docs", url: "https://socket.io/docs/v4/", type: "docs" },
      { name: "Realtime Patterns", url: "https://ably.com/blog/websockets-vs-long-polling", type: "article" },
    ],
  },
  {
    id: "movie-app",
    title: "Movie Search App",
    category: "Frontend",
    difficulty: "Beginner",
    description: "Browse trending movies, search by title and save favourites.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TMDB API"],
    features: ["Trending list", "Search", "Movie details", "Favourites"],
    roadmap: [
      "Setup React + TS",
      "Get TMDB API key",
      "Build search bar",
      "Movie grid + cards",
      "Detail modal",
      "Favourites with localStorage",
    ],
    folderStructure: `src/
├── components/
├── api/
└── hooks/`,
    estimatedHours: 9,
    youtubeId: "G6D9cBaLViA",
    resources: [
      { name: "TMDB API", url: "https://developer.themoviedb.org/docs", type: "docs" },
      { name: "React Query", url: "https://tanstack.com/query/latest", type: "docs" },
    ],
  },
  {
    id: "auth-system",
    title: "Auth System (JWT + OAuth)",
    category: "Backend",
    difficulty: "Intermediate",
    description: "Complete authentication with JWT, refresh tokens and Google OAuth.",
    technologies: ["Node.js", "Express", "MongoDB", "Passport.js"],
    features: ["Sign up / Login", "JWT + refresh", "Google OAuth", "Password reset", "Email verify"],
    roadmap: [
      "Setup Express + MongoDB",
      "User model with bcrypt",
      "JWT access + refresh tokens",
      "Google OAuth with Passport",
      "Password reset emails",
      "Rate limiting",
    ],
    folderStructure: `server/
├── controllers/
├── models/
├── middleware/
├── strategies/
└── utils/`,
    estimatedHours: 28,
    youtubeId: "Ud5xKCYQTjM",
    resources: [
      { name: "Passport.js", url: "https://www.passportjs.org", type: "docs" },
      { name: "JWT Best Practices", url: "https://datatracker.ietf.org/doc/html/rfc8725", type: "article" },
      { name: "bcrypt npm", url: "https://www.npmjs.com/package/bcrypt", type: "tool" },
    ],
  },
  {
    id: "ai-image-gen",
    title: "AI Image Generator",
    category: "AI",
    difficulty: "Advanced",
    description: "Generate images from prompts with history, gallery and downloads.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    features: ["Prompt input", "Generate images", "Gallery", "Download", "History"],
    roadmap: [
      "Setup Next.js + Tailwind",
      "OpenAI image API integration",
      "Build prompt UI",
      "Gallery grid",
      "Save history",
      "Download images",
      "Deploy",
    ],
    folderStructure: `app/
├── api/generate/
├── gallery/
└── components/`,
    estimatedHours: 30,
    youtubeId: "K6mvgHK4FRA",
    resources: [
      { name: "OpenAI Images API", url: "https://platform.openai.com/docs/guides/images", type: "docs" },
      { name: "Next.js API Routes", url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers", type: "docs" },
    ],
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    category: "Full Stack",
    difficulty: "Beginner",
    description: "Track personal expenses with categories, charts and monthly reports.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Recharts"],
    features: ["Add expense", "Categories", "Monthly charts", "Filters", "Export CSV"],
    roadmap: [
      "Setup MERN stack",
      "Expense model & routes",
      "React form + list",
      "Categories with colors",
      "Charts with Recharts",
      "CSV export",
    ],
    folderStructure: `client/
└── src/components/
server/
└── models/`,
    estimatedHours: 22,
    youtubeId: "Y8I3l_ZQc1g",
    resources: [
      { name: "Recharts Examples", url: "https://recharts.org/en-US/examples", type: "docs" },
      { name: "Mongoose Aggregation", url: "https://mongoosejs.com/docs/api/aggregate.html", type: "docs" },
    ],
  },
  {
    id: "social-clone",
    title: "Social Media Clone",
    category: "Full Stack",
    difficulty: "Advanced",
    description: "Twitter-style platform with posts, likes, follows and feed algorithm.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    features: ["Posts", "Likes", "Follow system", "Feed", "Profiles", "Notifications"],
    roadmap: [
      "Design DB schema",
      "Auth with NextAuth",
      "Post CRUD",
      "Follow system",
      "Feed query with relations",
      "Notifications",
      "Realtime updates",
      "Deploy",
    ],
    folderStructure: `app/
├── (feed)/
├── (profile)/
├── api/
└── components/
prisma/`,
    estimatedHours: 90,
    youtubeId: "uIVLfJOdMSU",
    resources: [
      { name: "NextAuth.js", url: "https://next-auth.js.org", type: "docs" },
      { name: "Prisma Relations", url: "https://www.prisma.io/docs/concepts/components/prisma-schema/relations", type: "docs" },
    ],
  },
  {
    id: "mobile-todo",
    title: "Mobile Todo App",
    category: "Mobile",
    difficulty: "Intermediate",
    description: "Cross-platform todo app with React Native and offline sync.",
    technologies: ["React Native", "Expo", "TypeScript", "SQLite"],
    features: ["Todo CRUD", "Categories", "Offline mode", "Push notifications"],
    roadmap: [
      "Setup Expo project",
      "Build screens & navigation",
      "SQLite storage",
      "Notifications",
      "Polish UI",
      "Publish to Expo",
    ],
    folderStructure: `app/
├── screens/
├── components/
└── db/`,
    estimatedHours: 25,
    youtubeId: "0-S5a0eXPoc",
    resources: [
      { name: "Expo Docs", url: "https://docs.expo.dev", type: "docs" },
      { name: "React Navigation", url: "https://reactnavigation.org", type: "docs" },
    ],
  },
];

export const categories: Category[] = ["Frontend", "Backend", "Full Stack", "AI", "Portfolio", "Mobile"];
