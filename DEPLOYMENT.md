# Deployment Guide

This guide covers deploying CodeMaster to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Git installed locally

## Step-by-Step Deployment to Vercel

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CodeMaster AI mentorship platform"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/dev-mentor-ai.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "Import Project"
5. Paste your repository URL: `https://github.com/YOUR_USERNAME/dev-mentor-ai.git`
6. Click "Import"

### 3. Configure Project Settings

Vercel will auto-detect your project settings from `vercel.json`:

- **Framework Preset:** Vite (auto-detected)
- **Build Command:** `bun run build`
- **Output Directory:** `dist`
- **Install Command:** `bun install`

### 4. Environment Variables (if needed)

In the Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add any needed variables from `.env.example`:
   ```
   VITE_API_URL=your-api-url
   VITE_ENABLE_VOICE_ASSISTANT=true
   ```

### 5. Deploy!

1. Click "Deploy"
2. Vercel will build and deploy your app
3. Your app will be live at `https://your-project-name.vercel.app`

## Why No 404 Errors?

The `vercel.json` file includes rewrites that tell Vercel to serve `index.html` for all routes. This allows TanStack Router to handle client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

When someone visits `/project/123`, Vercel:
1. Doesn't find that physical file
2. Serves `index.html` instead (due to rewrites)
3. React Router takes over and displays the correct page
4. The user never sees a 404

## Continuous Deployment

After your first deployment, every push to `main` will automatically:

1. Trigger a new build
2. Run tests (if configured)
3. Deploy to production (if build succeeds)

You can disable auto-deploy in project settings if needed.

## Custom Domain

1. Go to your project → Settings → Domains
2. Click "Add"
3. Enter your domain name
4. Update your domain's DNS settings according to Vercel's instructions

## Troubleshooting

### 404 Errors Still Appearing

If you see 404 errors after deployment:

1. **Clear browser cache:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check vercel.json:** Ensure it's in the root directory
3. **Redeploy:** Go to Deployments → Redeploy

### Build Failed

Check the build logs in Vercel dashboard:

1. Go to your project → Deployments
2. Click the failed deployment
3. Scroll to "Build" section
4. Look for error messages

Common fixes:
- Ensure all dependencies are in `package.json`
- Check for missing environment variables
- Verify TypeScript types are correct

### Slow Performance

- Check network tab in browser DevTools
- Verify assets are being compressed
- Consider enabling caching headers in `vercel.json`

## Rollback a Deployment

If something goes wrong:

1. Go to Deployments
2. Find the previous working deployment
3. Click the three dots menu
4. Select "Promote to Production"

## Local Preview

Test your production build locally:

```bash
bun run build
bun run preview
```

Visit `http://localhost:5173` to see the production build.

## Monitoring

In Vercel dashboard:

- **Analytics:** View traffic, performance metrics
- **Speed Insights:** Identify slow pages
- **Web Vitals:** Monitor Core Web Vitals
- **Errors:** View error logs

## Next Steps

After deployment:

1. Set up a custom domain
2. Enable preview deployments for pull requests
3. Set up monitoring and alerts
4. Configure analytics
5. Consider adding auth for admin features

For more help, visit [Vercel Docs](https://vercel.com/docs)
