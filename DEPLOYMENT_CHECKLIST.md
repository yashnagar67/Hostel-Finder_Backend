# Render Deployment Checklist

## Pre-Deployment

- [ ] **Code Quality**
  - [ ] Fix typos in code (e.g., "mongoos" → "mongoose", "eonnect" → "connect")
  - [ ] Remove console.log statements in production code
  - [ ] Add proper error handling to all routes

- [ ] **Dependencies**
  - [ ] Run `npm install` locally to ensure all packages are installed
  - [ ] Check `package.json` has all required packages
  - [ ] No deprecated packages

- [ ] **Environment Setup**
  - [ ] Create `.env` file locally with all required variables
  - [ ] Test with `npm start` locally
  - [ ] Verify `.env` is in `.gitignore`
  - [ ] Create `.env.example` file (already done ✓)

- [ ] **MongoDB**
  - [ ] Have MongoDB Atlas account
  - [ ] Create/have a cluster running
  - [ ] Get connection string (MONGOURI)
  - [ ] Add `0.0.0.0/0` to IP whitelist (allows all IPs - Render servers)
  - [ ] Test connection string locally

- [ ] **Google Gemini**
  - [ ] Have Google Cloud account
  - [ ] Enable Gemini API
  - [ ] Create API key
  - [ ] Test API locally

- [ ] **GitHub**
  - [ ] Initialize git repo: `git init`
  - [ ] Add all files: `git add .`
  - [ ] Commit: `git commit -m "Production ready setup"`
  - [ ] Create GitHub repository
  - [ ] Push code: `git push origin main`

## Render Deployment Steps

1. [ ] Sign in to [render.com](https://render.com)
2. [ ] Click **New +** → **Web Service**
3. [ ] Select your GitHub repository
4. [ ] Configure service:
   - **Name**: `hostel-finder-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. [ ] Set environment variables:
   - MONGOURI
   - GEMINI_API_KEY
   - ADMINPASSWORD
   - NODE_ENV = production
6. [ ] Click **Deploy**
7. [ ] Wait for deployment to complete
8. [ ] Get your Render URL (e.g., `https://hostel-finder-backend.onrender.com`)

## Post-Deployment

- [ ] Test health endpoint: `GET /health`
- [ ] Test API endpoints from Render dashboard URL
- [ ] Check logs for any errors
- [ ] Monitor application performance
- [ ] Set up auto-deploy (optional):
  - Push to GitHub automatically triggers new deployment

## Troubleshooting

If deployment fails:

1. Check build logs in Render dashboard
2. Verify all environment variables are set
3. Ensure `package.json` has correct `start` script
4. Check Node version is 18.x in `package.json` engines
5. Verify MongoDB connection string
6. Test locally first with `npm start`

## Important Security Notes

⚠️ **Before Going Live:**
- [ ] Change ADMINPASSWORD to something strong
- [ ] Never commit actual `.env` file (keep `.env.example` instead)
- [ ] Use strong MongoDB password
- [ ] Enable IP whitelisting on MongoDB (for Render servers)
- [ ] Monitor API usage and costs
- [ ] Set up rate limiting if needed

## Monitoring & Maintenance

- **Logs**: View in Render dashboard → Logs tab
- **Crashes**: Render will auto-restart failed services
- **Scale**: Free tier works for small projects; upgrade if needed
- **Costs**: Monitor Google Gemini API usage

---

**Your Deployed URL**: Will look like: `https://hostel-finder-backend-xxxx.onrender.com`

Save this URL and share it with your frontend application!
