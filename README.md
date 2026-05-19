# CodeMaster - Dev Mentor AI

AI-powered platform that guides students through real-world frontend, backend, and full stack projects.

## Features

- **AI Mentor Chat** - Get step-by-step guidance like a senior developer
- **Smart Folder Generator** - Industry-standard project structures
- **Setup Guides** - Beginner-friendly terminal help
- **Project Roadmaps** - Build real apps with structured tasks
- **Progress Dashboard** - Track your skill growth
- **Voice Assistant** - Talk with your AI mentor

## Tech Stack

- **Frontend:** React 19, TanStack Router, Tailwind CSS
- **Build:** Vite, TanStack Start
- **Styling:** Tailwind CSS, shadcn/ui components
- **State:** React Query
- **Deployment:** Vercel / Cloudflare Workers

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Bun package manager (recommended)

### Installation

```bash
# Install dependencies
bun install

# Create environment file
cp .env.example .env.local
```

### Development

```bash
# Start development server
bun run dev

# Format code
bun run format

# Lint code
bun run lint
```

### Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

### Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the build configuration
4. Your app will be deployed at `https://your-domain.vercel.app`

The `vercel.json` file handles SPA routing to prevent 404 errors on route changes.

### Cloudflare Workers

```bash
# Deploy to Cloudflare Workers
bun run build
wrangler deploy
```

## Project Structure

```
src/
├── routes/           # TanStack Router routes
├── components/       # React components
│   ├── layout/      # Layout components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── data/            # Mock data
└── styles.css       # Global styles
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_VOICE_ASSISTANT=true
```

## Git Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add remote origin
git remote add origin https://github.com/yourusername/dev-mentor-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Troubleshooting

### 404 Errors on Deployment

The `vercel.json` file is configured to handle SPA routing. If you still see 404 errors:

1. Ensure `vercel.json` is in the root directory
2. Clear Vercel cache and redeploy
3. Check that routes in `src/routes/` are properly defined

### Build Failures

- Ensure all dependencies are installed: `bun install`
- Check Node.js/Bun version compatibility
- Review build logs in Vercel dashboard

## License

MIT
