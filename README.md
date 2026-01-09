# Hostel Finder Backend - Production Ready

A REST API backend for Hostel Finder with AI-powered image extraction using Google Gemini.

## Features

- ✅ Express.js REST API
- ✅ MongoDB Integration
- ✅ CORS enabled
- ✅ Google Gemini AI for hostel pamphlet extraction
- ✅ Image upload handling with multer
- ✅ Error handling & logging
- ✅ Environment variable configuration
- ✅ Production-ready deployment

## Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key
- Git

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the backend directory with the following:

```env
MONGOURI=mongodb+srv://username:password@cluster.mongodb.net/HostelFinder?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
ADMINPASSWORD=your_secure_password_here
NODE_ENV=development
```

### 4. Run locally

```bash
npm start      # Production mode
npm run dev    # Development with nodemon
```

Visit `http://localhost:3000` to test the API.

---

## Deployment to Render

### Step 1: Push code to GitHub

```bash
git add .
git commit -m "Production ready setup"
git push origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service

1. In Render dashboard, click **New +** → **Web Service**
2. Select your GitHub repository
3. Fill in the following details:
   - **Name**: `hostel-finder-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

### Step 4: Set Environment Variables

In the Render dashboard, go to **Environment** tab and add:

```
MONGOURI=mongodb+srv://username:password@cluster.mongodb.net/HostelFinder?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
ADMINPASSWORD=your_secure_password_here
NODE_ENV=production
PORT=10000
```

### Step 5: Deploy

Click **Deploy** button. Render will automatically:
- Install dependencies
- Build the application
- Start the server
- Provide you with a public URL (e.g., `https://hostel-finder-backend.onrender.com`)

---

## API Endpoints

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "environment": "production",
  "timestamp": "2024-01-09T10:00:00.000Z"
}
```

### Get All Hostels
```
GET /api/hostels
```

### Get Hostel by ID
```
GET /api/hostels/:id
```

### Create Hostel (with Admin Password)
```
POST /api/hostels
Content-Type: application/json

{
  "adminpassword": "your_password",
  "name": "Hostel Name",
  "address": "123 Street, City",
  "contactNumber": "9876543210",
  "price": 5000,
  "facilities": ["WiFi", "AC", "Food"],
  "ownerName": "Owner Name",
  "type": "Boys"
}
```

### AI Extract from Image
```
POST /api/ai/extract
Content-Type: multipart/form-data

Form Data:
- imgUrl: (binary image file)
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGOURI` | MongoDB connection string | `mongodb+srv://...` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `ADMINPASSWORD` | Admin password for creating hostels | `secure_password` |
| `NODE_ENV` | Environment type | `production` or `development` |
| `PORT` | Server port | `3000` (local) or `10000` (Render) |

---

## Important Notes

⚠️ **Security:**
- Never commit `.env` file (it's in `.gitignore`)
- Always use environment variables for sensitive data
- Change `ADMINPASSWORD` to a strong value
- Use MongoDB Atlas with IP whitelist

⚠️ **MongoDB:**
- Free tier limits: 512MB storage, 100 simultaneous connections
- For production, consider upgrading to M2 tier or higher

⚠️ **Gemini API:**
- Free tier has usage limits
- Monitor API costs in Google Cloud Console
- Consider rate limiting in production

---

## Monitoring & Logs

View Render logs:
1. Go to your service in Render dashboard
2. Click **Logs** tab
3. All server logs appear in real-time

---

## Troubleshooting

### Build Fails
- Check Node version: Must be 18.x
- Verify `package.json` exists
- Check for syntax errors in code

### MongoDB Connection Error
- Verify `MONGOURI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)
- Ensure cluster is running

### API Returns 500 Error
- Check Render logs for error details
- Verify all environment variables are set
- Test locally first with `npm run dev`

---

## Testing in Production

```bash
# Health check
curl https://your-app.onrender.com/health

# Get all hostels
curl https://your-app.onrender.com/api/hostels

# Create hostel
curl -X POST https://your-app.onrender.com/api/hostels \
  -H "Content-Type: application/json" \
  -d '{"adminpassword":"...","name":"...","address":"..."}'
```

---

## Performance Tips

- Use MongoDB indexes on frequently queried fields
- Enable caching with Redis (Render supports add-ons)
- Optimize image upload size limits
- Monitor API response times

---

## Support & Documentation

- [Render Docs](https://render.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Gemini API](https://ai.google.dev/)

---

**Last Updated**: January 2024
**Version**: 1.0.0
