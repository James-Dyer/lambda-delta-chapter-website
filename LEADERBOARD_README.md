# Live Leaderboard System

This implementation provides a real-time leaderboard system for Derby Days and Call-a-thon events, displaying data from Google Sheets with near-real-time updates.

## 🎯 Key Features

- **Dual-interval polling**: Callathon (3s), Derby Days (30s)
- **In-memory caching**: Keeps Google Sheets API usage constant regardless of client count
- **Graceful degraded mode**: Retains last good data on errors
- **Two visualization types**: Table view (Derby Days) and bar chart (Call-a-thon)
- **Real-time updates**: ~3 second average latency from sheet edit to UI update
- **Responsive design**: Works on mobile and desktop

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Google Cloud API Key** (see setup instructions below)
2. **Google Sheets Document** with proper configuration
3. **Node.js** (v16 or higher)
4. **npm** or **yarn**

## 🚀 Quick Start

### Step 1: Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google Sheets API**:
   - Navigate to "APIs & Services" → "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
5. Restrict the API key:
   - Click "Edit API key"
   - Under "API restrictions", select "Restrict key"
   - Select "Google Sheets API"
   - Click "Save"
6. Copy your API key for the next step

### Step 2: Google Sheets Configuration

1. Create or open your Google Sheets document
2. Set up two tabs:
   - **Tab 1: "DerbyDays"**
     - Column A: Team Name
     - Column B: Score
     - Row 1: Headers
   - **Tab 2: "Callathon"**
     - Column A: Participant Name
     - Column B: Amount Raised
     - Row 1: Headers
3. Share the spreadsheet:
   - Click "Share" → "Anyone with the link can view"
   - This is required for API key authentication
4. Extract the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copy the `{SPREADSHEET_ID}` part

### Step 3: Backend Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Edit the `.env` file:
   ```bash
   # Replace these values with your actual credentials
   GOOGLE_SHEETS_API_KEY=your_actual_api_key_here
   GOOGLE_SHEETS_ID=your_actual_spreadsheet_id_here
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ╔════════════════════════════════════════════════════════════╗
   ║  Lambda Delta Leaderboard Server                          ║
   ╠════════════════════════════════════════════════════════════╣
   ║  Status: Running                                           ║
   ║  Port: 3001                                                ║
   ╚════════════════════════════════════════════════════════════╝
   ```

### Step 4: Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Step 5: Test the System

1. Visit the leaderboards:
   - Derby Days: `http://localhost:3000/#/derbyDaysLeaderboard`
   - Call-a-thon: `http://localhost:3000/#/callathon`

2. Edit a score in your Google Sheets document

3. Watch the leaderboard update (should take ~3-6 seconds)

## 🧪 Testing Checklist

### Backend Testing

- [ ] Health check endpoint: `http://localhost:3001/health`
- [ ] Derby Days API: `http://localhost:3001/api/leaderboard/derbyDays`
- [ ] Callathon API: `http://localhost:3001/api/leaderboard/callathon`
- [ ] Check console logs for polling activity
- [ ] Verify degraded mode (temporarily use invalid API key)

### Frontend Testing

- [ ] Derby Days table renders correctly
- [ ] Call-a-thon bar chart renders correctly
- [ ] Top 3 rankings show medal emojis (🥇🥈🥉)
- [ ] Last updated timestamp updates every 3 seconds
- [ ] Error handling works (stop backend server)
- [ ] Degraded mode warning appears when appropriate
- [ ] Responsive design on mobile (resize browser to 768px)
- [ ] Empty state shows when no data

### End-to-End Latency Test

1. Open browser DevTools → Network tab
2. Edit a score in Google Sheets and note the timestamp
3. Watch the frontend poll the API
4. Measure time from edit to UI update
5. **Expected**: < 5 seconds for Call-a-thon, < 35 seconds for Derby Days

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── environment.ts          # Environment variable validation
│   ├── types/
│   │   └── leaderboard.ts          # TypeScript type definitions
│   ├── services/
│   │   ├── googleSheets.ts         # Google Sheets API client
│   │   └── pollingService.ts       # Dual-interval polling orchestrator
│   ├── routes/
│   │   ├── leaderboard.ts          # GET /api/leaderboard/:event
│   │   └── health.ts               # GET /health
│   ├── middleware/
│   │   ├── cors.ts                 # CORS configuration
│   │   └── errorHandler.ts         # Global error handler
│   └── index.ts                    # Express app initialization
├── .env                            # Environment variables
└── package.json

frontend/
├── src/
│   ├── hooks/
│   │   └── usePolling.js           # Custom polling hook
│   ├── components/
│   │   ├── DerbyDaysLeaderboard.jsx    # Table view
│   │   └── CallathonLeaderboard.jsx    # Bar chart view
│   └── styles/
│       ├── derbyDaysLeaderboard.css
│       └── callathonLeaderboard.css
├── .env.development
├── .env.production
└── package.json
```

## 🌐 API Endpoints

### GET /health
Health check endpoint with polling status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-10T22:15:00.123Z",
  "uptime": 123.456,
  "leaderboards": {
    "callathon": {
      "status": "ok",
      "lastUpdated": "2026-02-10T22:15:00.000Z",
      "rowCount": 5
    },
    "derbyDays": {
      "status": "ok",
      "lastUpdated": "2026-02-10T22:14:30.000Z",
      "rowCount": 8
    }
  }
}
```

### GET /api/leaderboard/:event
Returns leaderboard data for specified event (derbyDays | callathon).

**Response:**
```json
{
  "status": "ok",
  "updatedAt": "2026-02-10T22:15:00.123Z",
  "rows": [
    { "rank": 1, "name": "Delta Delta Delta", "score": 120 },
    { "rank": 2, "name": "Theta Tau", "score": 95 }
  ]
}
```

**Degraded Mode Response:**
```json
{
  "status": "degraded",
  "updatedAt": "2026-02-10T22:10:00.000Z",
  "rows": [...],
  "error": "Google Sheets API error (403): API key expired"
}
```

## 🚢 Deployment

### Backend (Render)

1. Create account at [Render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
5. Add environment variables:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SHEETS_ID`
   - `CLIENT_ORIGIN_PROD=https://ucmsigmachi.org`
   - `CLIENT_ORIGIN_DEV=http://localhost:3000`
6. Deploy and note your backend URL (e.g., `https://your-app.onrender.com`)

### Frontend (GitHub Pages)

1. Update `frontend/.env.production`:
   ```bash
   REACT_APP_API_URL=https://your-app.onrender.com
   ```

2. Deploy:
   ```bash
   cd frontend
   npm run deploy
   ```

## 🔧 Troubleshooting

### Backend won't start
- **Issue**: "Missing required environment variable"
- **Solution**: Check that `.env` file has `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEETS_ID`

### Google Sheets API errors
- **Issue**: 403 Forbidden
- **Solution**: Ensure spreadsheet is shared with "Anyone with the link can view"
- **Solution**: Verify API key has Google Sheets API enabled

### Frontend can't connect to backend
- **Issue**: CORS errors
- **Solution**: Check `CLIENT_ORIGIN_DEV` in backend `.env` matches frontend URL
- **Solution**: Verify backend is running on port 3001

### Data not updating
- **Issue**: Leaderboard shows old data
- **Solution**: Check backend console logs for polling errors
- **Solution**: Verify Google Sheets tabs are named "DerbyDays" and "Callathon"
- **Solution**: Check that data is in columns A (name) and B (score)

### Degraded mode persists
- **Issue**: "Data may be outdated" warning won't go away
- **Solution**: Check backend logs for specific error messages
- **Solution**: Verify Google Sheets API quota hasn't been exceeded
- **Solution**: Test API key with direct curl request

## 📊 Google Sheets API Quota

**Free tier limits**: 500 requests per 100 seconds per user

**Current usage**:
- Callathon: 20 requests/minute
- Derby Days: 2 requests/minute
- **Total**: 22 requests/minute = 1,320 requests/hour

**Status**: ✅ Well within quota (1,320 < 3,000/hour)

Monitor usage at: [Google Cloud Console → Quotas](https://console.cloud.google.com)

## 🎨 Customization

### Change polling intervals

Edit `server/.env`:
```bash
POLL_INTERVAL_CALLATHON_MS=5000     # 5 seconds instead of 3
POLL_INTERVAL_DERBY_DAYS_MS=60000   # 1 minute instead of 30 seconds
```

### Change sheet ranges

Edit `server/.env`:
```bash
SHEET_RANGE_DERBY_DAYS=DerbyDays!A1:B200  # Increase from 100 to 200 rows
```

### Change frontend polling interval

Edit the components (`DerbyDaysLeaderboard.jsx`, `CallathonLeaderboard.jsx`):
```javascript
const { data, loading, error } = usePolling(url, 5000); // 5 seconds instead of 3
```

## 📝 Next Steps

After successful local testing:

1. ✅ Verify end-to-end latency meets requirements
2. ✅ Test error scenarios and degraded mode
3. ✅ Deploy backend to Render
4. ✅ Update frontend `.env.production` with Render URL
5. ✅ Deploy frontend to GitHub Pages
6. ✅ Test production CORS from https://ucmsigmachi.org
7. ✅ Monitor Google Sheets API quota
8. ✅ Share leaderboard URLs with users

## 🆘 Support

If you encounter issues:

1. Check backend console logs for errors
2. Check frontend browser console for errors
3. Verify all environment variables are set correctly
4. Test Google Sheets API directly with curl:
   ```bash
   curl "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/DerbyDays!A1:B10?key=YOUR_API_KEY"
   ```
5. Check the health endpoint: `http://localhost:3001/health`

## 📄 License

This project is part of the Lambda Delta chapter website.
