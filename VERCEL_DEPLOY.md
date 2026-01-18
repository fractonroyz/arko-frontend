# Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `arko-frontend`
3. Make it **Public**
4. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/nicholastaub/Documents/cursor_ai/arko-frontend

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/arko-frontend.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `arko-frontend` repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** (leave default)
   - **Output Directory:** (leave default)

5. **Add Environment Variable:**
   - Key: `NEXT_PUBLIC_ARKO_API_URL`
   - Value: `YOUR_AGENCII_URL` (your deployed Arko API URL)

6. Click **"Deploy"**

## Step 4: Wait for Build (~2 minutes)

Vercel will:
- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy to production
- ✅ Give you a URL like `https://arko-frontend.vercel.app`

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. You should see the Arko chat interface
3. Send a test message
4. It will connect to your agencii.ai backend

---

## Quick Copy-Paste Setup

```bash
# 1. Get your agencii.ai URL
# Go to agencii.ai dashboard and copy your agency URL

# 2. The environment variable will be:
NEXT_PUBLIC_ARKO_API_URL=https://your-agency.agencii.ai

# 3. After deployment, your frontend will be at:
# https://arko-frontend-<random>.vercel.app
```

---

## Troubleshooting

**Build fails?**
- Check Vercel build logs
- Most likely: missing dependency or import error

**Can't connect to backend?**
- Verify `NEXT_PUBLIC_ARKO_API_URL` is correct
- Check CORS settings on agencii.ai

**UI looks broken?**
- Clear cache and hard reload (Cmd+Shift+R)
- Check browser console for errors

---

**Your code is committed and ready!** ✅

Just need to:
1. Create GitHub repo
2. Push code
3. Deploy on Vercel
