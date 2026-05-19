# GitHub & Vercel Deployment Checklist

Complete this checklist before pushing to GitHub and deploying to Vercel.

## ✅ Pre-Deployment Checks

### Code Quality
- [ ] Run `bun run lint` - fix any linting errors
- [ ] Run `bun run format` - format all code
- [ ] Check for console.log and debug code - remove before deploy
- [ ] Review all TypeScript errors: `bun run build`
- [ ] Test all routes locally: `bun run dev`

### Configuration Files
- [ ] `vercel.json` exists in root directory
- [ ] `wrangler.jsonc` has valid JSON (no trailing commas)
- [ ] `.env.example` created with all needed env vars
- [ ] `.gitignore` includes: `node_modules`, `dist`, `.env.local`, `.DS_Store`
- [ ] `README.md` is descriptive and up-to-date
- [ ] `package.json` has correct build scripts

### Route Configuration
- [ ] All routes are properly named (no double dots in filenames)
- [ ] Routes use correct TanStack Router syntax
- [ ] 404 page is implemented
- [ ] Error boundaries are in place
- [ ] No hardcoded URLs or localhost references

### Security
- [ ] No secrets in `.env.example` (only template)
- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in code or config files
- [ ] CORS headers configured if needed
- [ ] Content Security Policy headers considered

### Performance
- [ ] Images are optimized
- [ ] Unused dependencies removed from `package.json`
- [ ] Build completes successfully: `bun run build`
- [ ] Production build is smaller than 2MB (ideally < 1MB)

## 📋 GitHub Setup

### Repository Initialization
```bash
cd /home/avantika/Downloads/dev-mentor-ai-main

# Initialize git
git init

# Add all files (check .gitignore is working)
git add .

# Verify large files aren't included
git status | head -20

# Create commit
git commit -m "Initial commit: CodeMaster - AI-powered project learning platform"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/dev-mentor-ai.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Repository Settings
- [ ] Repository is public (for Vercel free tier)
- [ ] README.md displays properly
- [ ] Topics/tags added for discoverability
- [ ] Description: "AI-powered platform for learning development by building real projects"
- [ ] License file (MIT recommended)

## 🚀 Vercel Deployment

### Pre-Deployment
- [ ] GitHub repository is public and pushed
- [ ] Vercel account created
- [ ] Vercel GitHub integration authorized

### Deployment Steps
1. [ ] Visit https://vercel.com/new
2. [ ] Import project from GitHub
3. [ ] Configure project:
   - Framework: Vite
   - Build Command: `bun run build`
   - Output Directory: `dist`
   - Install Command: `bun install`
4. [ ] Add environment variables (if any from `.env.example`)
5. [ ] Click "Deploy"

### Post-Deployment
- [ ] Deployment succeeds without errors
- [ ] Visit live URL: https://your-project.vercel.app
- [ ] Test all routes by clicking navigation
- [ ] Verify no 404 errors on page refresh
- [ ] Test on mobile device
- [ ] Check console for errors (F12)
- [ ] Test critical features work

## 🧪 Testing on Deployed Site

### Functional Tests
- [ ] Home page loads (/)
- [ ] Projects page works (/projects)
- [ ] Individual project pages load (/project/id)
- [ ] Dashboard page works (/dashboard)
- [ ] Mentor page works (/mentor)
- [ ] Notes page works (/notes)
- [ ] Resources page works (/resources)
- [ ] 404 page displays on invalid route
- [ ] Navigation between pages works
- [ ] Links work correctly

### Browser Tests
- [ ] Chrome/Chromium ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Mobile Chrome ✓
- [ ] Mobile Safari ✓

### Performance
- [ ] Page loads in < 3 seconds
- [ ] No console errors (F12)
- [ ] No console warnings (check for issues)
- [ ] Network requests are fast
- [ ] CSS/JS are minified

## 📝 Documentation

- [ ] README.md is complete
- [ ] DEPLOYMENT.md has step-by-step instructions
- [ ] `.env.example` shows all needed variables
- [ ] Inline code comments explain complex logic
- [ ] API endpoints documented (if applicable)

## 🔗 Custom Domain (Optional)

- [ ] Domain purchased
- [ ] Domain added in Vercel settings
- [ ] DNS records updated
- [ ] SSL certificate auto-provisioned
- [ ] Domain resolves correctly

## 🔍 Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring checked
- [ ] Alerts set up for failures

## 🎯 Final Checks

- [ ] No console errors in production
- [ ] No security warnings
- [ ] Lighthouse score > 80
- [ ] All images load correctly
- [ ] Fonts render properly
- [ ] Dark/light mode works (if implemented)

## 📞 Support

If you encounter issues:

1. Check [Vercel Docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Check GitHub Actions (if configured)
4. Review browser console (F12)
5. Test locally: `bun run dev`

## ✨ Celebration!

- [ ] **🎉 Deployed successfully!**
- [ ] Share the URL with team/community
- [ ] Monitor for the first week
- [ ] Set up CI/CD for auto-deployments
