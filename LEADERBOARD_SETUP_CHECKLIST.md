# Leaderboard System Setup Checklist

Complete these steps in order to get the leaderboard system running.

## ☑️ Pre-Implementation (COMPLETED)
- [x] Backend folder structure created
- [x] TypeScript configuration set up
- [x] All backend services implemented
- [x] All frontend components implemented
- [x] Styling completed

## 📋 User Action Required

### 1. Google Cloud API Key Setup
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create/select project
- [ ] Enable Google Sheets API
- [ ] Create API Key
- [ ] Restrict key to Google Sheets API only
- [ ] Copy API key

### 2. Google Sheets Setup
- [ ] Create/open Google Sheets document
- [ ] Create "DerbyDays" tab (Column A: Name, Column B: Score)
- [ ] Create "Callathon" tab (Column A: Name, Column B: Score)
- [ ] Share: "Anyone with the link can view"
- [ ] Copy Spreadsheet ID from URL

### 3. Backend Configuration
- [ ] Open `server/.env`
- [ ] Replace `your_api_key_here` with actual Google API key
- [ ] Replace `your_spreadsheet_id_here` with actual spreadsheet ID
- [ ] Save file

### 4. Install Dependencies & Test Locally
```bash
# Terminal 1: Backend
cd server
npm install
npm run dev
# Should see: "Lambda Delta Leaderboard Server - Status: Running"

# Terminal 2: Frontend
cd frontend
npm install  # if not already installed
npm start
# Should open at http://localhost:3000
```

### 5. Local Testing
- [ ] Visit `http://localhost:3001/health` - should return JSON with status
- [ ] Visit `http://localhost:3000/#/derbyDaysLeaderboard` - should load page
- [ ] Visit `http://localhost:3000/#/callathon` - should load page
- [ ] Add test data to Google Sheets
- [ ] Verify data appears in leaderboards (wait ~3-30 seconds)
- [ ] Edit a score in sheets - verify update appears
- [ ] Test on mobile/narrow browser window (768px)

### 6. Error Scenario Testing
- [ ] Stop backend server - verify frontend shows error message
- [ ] Start backend server - verify frontend recovers
- [ ] Use invalid API key - verify degraded mode works
- [ ] Restore valid API key - verify recovery to "ok" status

### 7. Deployment Preparation
- [ ] Create [Render.com](https://render.com) account
- [ ] Create Web Service on Render
- [ ] Set environment variables on Render:
  - `GOOGLE_SHEETS_API_KEY`
  - `GOOGLE_SHEETS_ID`
  - `CLIENT_ORIGIN_PROD=https://ucmsigmachi.org`
  - `CLIENT_ORIGIN_DEV=http://localhost:3000`

### 8. Backend Deployment
- [ ] Deploy backend to Render
- [ ] Note Render backend URL (e.g., `https://your-app.onrender.com`)
- [ ] Test health endpoint: `https://your-app.onrender.com/health`
- [ ] Test API endpoints:
  - `https://your-app.onrender.com/api/leaderboard/derbyDays`
  - `https://your-app.onrender.com/api/leaderboard/callathon`

### 9. Frontend Production Config
- [ ] Open `frontend/.env.production`
- [ ] Replace `https://your-render-app.onrender.com` with actual Render URL
- [ ] Save file

### 10. Frontend Deployment
```bash
cd frontend
npm run deploy
```
- [ ] Verify deployment successful
- [ ] Test production site at `https://ucmsigmachi.org/#/derbyDaysLeaderboard`
- [ ] Test production site at `https://ucmsigmachi.org/#/callathon`

### 11. Production Validation
- [ ] Edit Google Sheets - verify production site updates
- [ ] Test on mobile device
- [ ] Verify CORS works from production domain
- [ ] Check Google Sheets API quota usage in Cloud Console
- [ ] Monitor Render logs for errors

## 🎯 Success Criteria
- [ ] Backend polls Google Sheets at configured intervals
- [ ] Frontend updates every 3 seconds
- [ ] End-to-end latency < 5 seconds (callathon)
- [ ] Degraded mode retains last data on errors
- [ ] CORS allows production + localhost origins
- [ ] Both leaderboard views render correctly
- [ ] Responsive design works on mobile
- [ ] Google Sheets API usage stays constant

## 📞 Next Steps After Deployment
1. Share URLs with event organizers:
   - Derby Days: `https://ucmsigmachi.org/#/derbyDaysLeaderboard`
   - Call-a-thon: `https://ucmsigmachi.org/#/callathon`

2. Monitor during events:
   - Check backend logs for errors
   - Monitor API quota usage
   - Watch for degraded mode warnings

3. Optional enhancements:
   - Add authentication for sheet editing
   - Add total score/progress indicators
   - Add live update notifications
   - Add historical data/trends

## 🔗 Quick Links
- Google Cloud Console: https://console.cloud.google.com
- Render Dashboard: https://dashboard.render.com
- Local Backend: http://localhost:3001
- Local Frontend: http://localhost:3000
- Health Check: http://localhost:3001/health
- Derby Days (local): http://localhost:3000/#/derbyDaysLeaderboard
- Call-a-thon (local): http://localhost:3000/#/callathon

## 📚 Documentation
- Full README: `LEADERBOARD_README.md`
- Original Plan: `plan.md`
- Design System: `frontend/STYLE_GUIDE.md`
