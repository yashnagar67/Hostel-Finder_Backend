# 🚀 Quick Start Guide - Deploy to Render in 5 Minutes

## Step 1: Prepare Your Code (Local Machine)

```bash
# Install dependencies
npm install

# Test locally
npm start
# Should see: ✓ Server running on port 3000 (development mode)
# Press Ctrl+C to stop
```

## Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Production ready setup"

# Add GitHub as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to main branch
git push -u origin main
```

## Step 3: Deploy to Render

### 3a. Sign In to Render
1. Go to [render.com](https://render.com)
2. Click "Sign up" and choose GitHub
3. Authorize Render to access your GitHub

### 3b. Create Web Service
1. In Render dashboard, click **New +** → **Web Service**
2. Select your repository from the list
3. You'll see a form with these fields:

| Field | Value |
|-------|-------|
| Name | `hostel-finder-backend` |
| Environment | `Node` |
| Region | `us-west` (closest to you) |
| Build Command | `npm install` |
| Start Command | `npm start` |

4. Click **Create Web Service**

### 3c. Add Environment Variables
1. Scroll down to **Environment** section
2. Click **Add Environment Variable**
3. Add these 4 variables:

```
MONGOURI = mongodb+srv://username:password@cluster.mongodb.net/HostelFinder?retryWrites=true&w=majority
GEMINI_API_KEY = AIzaSy...your_key_here...
ADMINPASSWORD = your_secure_password_here
NODE_ENV = production
```

4. Click **Deploy** button

## Step 4: Wait for Deployment
- Render will automatically build and deploy
- Takes ~2-3 minutes
- You'll see a green checkmark when done
- Your URL will be: `https://hostel-finder-backend-xxxx.onrender.com`

## Step 5: Test Your API

Copy-paste your Render URL and test:

```bash
# Replace YOUR_URL with your Render URL
YOUR_URL=https://hostel-finder-backend-xxxx.onrender.com

# Test health endpoint
curl ${YOUR_URL}/health

# Should return:
# {"status":"OK","message":"Server is running","environment":"production",...}
```

## Step 6: Update Your Frontend

In your frontend application, change the API base URL:

### Before (Local)
```javascript
const API_URL = "http://localhost:3000"
```

### After (Production)
```javascript
const API_URL = "https://hostel-finder-backend-xxxx.onrender.com"
```

---

## Troubleshooting

### Deployment Failed?
1. Click **Logs** tab in Render dashboard
2. Look for red error messages
3. Common issues:
   - Missing environment variable → Add it and re-deploy
   - Build error → Check `package.json` syntax
   - Node version → Already set to 18.x

### API Returns 500 Error?
1. Check Render logs for error details
2. Verify MongoDB connection string is correct
3. Make sure MongoDB cluster is running in Atlas

### CORS Errors?
- Already handled in the code, should work fine

---

## After Successful Deployment

✅ Your API is live!

- **Health Check**: `/health` (always returns 200)
- **Get Hostels**: `/api/hostels`
- **Get Hostel**: `/api/hostels/:id`
- **Create Hostel**: `POST /api/hostels` (requires adminpassword)
- **AI Extract**: `POST /api/ai/extract` (upload image)

---

## Free Render Tier Limits

⚠️ Important:
- **Spin Down**: App goes to sleep after 30 minutes of inactivity
- **Storage**: 100GB database
- **Bandwidth**: Limited
- **First request**: Will take ~1 minute (due to spin-up)

**Upgrade to paid** if you need:
- Always-on service
- Better performance
- More bandwidth

---

## Next Deployments

After the first deployment, just push to GitHub:

```bash
# Make code changes
git add .
git commit -m "Your changes"
git push origin main

# Render automatically redeploys! ✨
```

---

## Support Resources

- 📖 [Render Documentation](https://render.com/docs)
- 📖 [MongoDB Atlas Help](https://www.mongodb.com/docs/)
- 📖 [Express.js Guide](https://expressjs.com/)
- 📖 [Google Gemini API](https://ai.google.dev/)

---

## Got Stuck?

Check these files for help:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Detailed checklist
- [PRODUCTION_CHANGES.md](./PRODUCTION_CHANGES.md) - All changes made

---

**You did it! Your app is now in production! 🎉**
