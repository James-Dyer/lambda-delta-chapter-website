# Google Sheets Leaderboard Setup Guide

## Overview

The leaderboard now fetches data directly from Google Sheets API without needing a backend server. This guide will help you set up the Google Sheets API and configure your environment.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- A Google Sheet with your leaderboard data

---

## Step 1: Prepare Your Google Sheet

### 1.1 Create/Configure Your Spreadsheet

Your spreadsheet should have two tabs with the following structure:

**Tab 1: DerbyDays**
```
| Name              | Score |
|-------------------|-------|
| Delta Delta Delta | 120   |
| Theta Tau         | 95    |
| ...               | ...   |
```

**Tab 2: Callathon**
```
| Name              | Score |
|-------------------|-------|
| John Smith        | 250   |
| Jane Doe          | 180   |
| ...               | ...   |
```

**Requirements:**
- Column A: Name (text)
- Column B: Score (number)
- Row 1: Header row (will be skipped by the code)
- Data starts from Row 2

### 1.2 Share Your Sheet

1. Click **Share** in the top-right corner
2. Under "General access", select **Anyone with the link**
3. Ensure permission is set to **Viewer** (read-only)
4. Click **Done**

### 1.3 Get Your Spreadsheet ID

From your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/1ABC123xyz_SPREADSHEET_ID/edit
                                    ^^^^^^^^^^^^^^^^^^^^^^
                                    This is your Sheet ID
```

Copy the spreadsheet ID for later use.

---

## Step 2: Set Up Google Cloud API

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Name it (e.g., "Lambda Delta Website")
4. Click **Create**

### 2.2 Enable Google Sheets API

1. In the search bar, type "Google Sheets API"
2. Click on **Google Sheets API**
3. Click **Enable**

### 2.3 Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Your API key will be displayed - **copy it immediately**

### 2.4 Restrict Your API Key (CRITICAL FOR SECURITY)

1. Click **Edit API key** (pencil icon)
2. Under **API restrictions**:
   - Select **Restrict key**
   - Check **Google Sheets API** only
   - Uncheck all other APIs
3. Under **Application restrictions**:
   - Select **HTTP referrers (websites)**
   - Click **Add an item**
   - Add: `http://localhost:3000/*` (for development)
   - Click **Add an item** again
   - Add: `https://ucmsigmachi.org/*` (for production)
4. Click **Save**

---

## Step 3: Configure Environment Variables

### 3.1 Development Environment

Edit `/frontend/.env.development`:

```bash
REACT_APP_GOOGLE_SHEETS_API_KEY=AIza...your_actual_api_key_here
REACT_APP_GOOGLE_SHEETS_ID=1ABC123xyz...your_actual_spreadsheet_id_here
REACT_APP_SHEET_RANGE_DERBY_DAYS=DerbyDays!A1:B100
REACT_APP_SHEET_RANGE_CALLATHON=Callathon!A1:B100
```

### 3.2 Production Environment

Edit `/frontend/.env.production`:

```bash
REACT_APP_GOOGLE_SHEETS_API_KEY=AIza...your_actual_api_key_here
REACT_APP_GOOGLE_SHEETS_ID=1ABC123xyz...your_actual_spreadsheet_id_here
REACT_APP_SHEET_RANGE_DERBY_DAYS=DerbyDays!A1:B100
REACT_APP_SHEET_RANGE_CALLATHON=Callathon!A1:B100
```

**Note:** You can use the same API key for both environments, or create separate keys.

---

## Step 4: Test Locally

### 4.1 Install Dependencies (if needed)

```bash
cd frontend
npm install
```

### 4.2 Start Development Server

```bash
npm start
```

### 4.3 Verify Leaderboards

1. Navigate to `http://localhost:3000/#/derbyDaysLeaderboard`
2. Navigate to `http://localhost:3000/#/callathon`
3. Check browser console (F12) for any errors
4. Verify data loads correctly

### 4.4 Test Updates

1. Edit your Google Sheet (add/modify scores)
2. Wait for polling interval:
   - Derby Days: 30 seconds
   - Callathon: 3 seconds
3. Verify changes appear in the UI

### 4.5 Test Error Handling

1. Temporarily use an invalid API key
2. Verify error banner appears
3. Verify last data is retained (if available)
4. Restore correct API key
5. Verify recovery after error

---

## Step 5: Deploy to Production

### 5.1 Build Production Bundle

```bash
cd frontend
npm run build
```

### 5.2 Deploy to GitHub Pages

```bash
npm run deploy
```

### 5.3 Verify Production

1. Visit `https://ucmsigmachi.org/#/derbyDaysLeaderboard`
2. Visit `https://ucmsigmachi.org/#/callathon`
3. Open browser Network tab (F12)
4. Verify Google Sheets API calls succeed
5. Test on mobile devices

---

## Step 6: Monitor API Usage

### 6.1 Check Quota Usage

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Dashboard**
3. Click **Google Sheets API**
4. View **Metrics** tab

### 6.2 Quota Limits

- **Free tier:** 500 requests per 100 seconds
- **Current usage:**
  - Callathon: 20 req/min per user
  - Derby Days: 2 req/min per user
- **10 concurrent users:** ~220 req/min (well within limits)
- **100 concurrent users:** ~2,200 req/min (may approach limits)

### 6.3 If Quota Issues Arise

If you exceed quota limits:

1. **Increase polling intervals:**
   - Edit `DerbyDaysLeaderboard.jsx`: Change `30000` to `60000` (60s)
   - Edit `CallathonLeaderboard.jsx`: Change `3000` to `5000` (5s)

2. **Add jitter to prevent thundering herd:**
   - Modify `useGoogleSheetsPolling.js` to randomize intervals slightly

3. **Consider reintroducing backend** for very high traffic events

---

## Troubleshooting

### Error: "Missing Google Sheets configuration"

**Solution:** Ensure environment variables are set correctly:
- `REACT_APP_GOOGLE_SHEETS_API_KEY`
- `REACT_APP_GOOGLE_SHEETS_ID`

Restart the development server after changing `.env` files.

### Error: "Google Sheets API error (403)"

**Causes:**
1. API key restrictions too strict
2. Google Sheets API not enabled
3. Sheet not shared publicly

**Solution:**
1. Verify API key has Google Sheets API enabled
2. Check HTTP referrer restrictions match your domain
3. Verify sheet is shared as "Anyone with the link can view"

### Error: "Google Sheets API error (400)"

**Cause:** Invalid sheet range

**Solution:**
1. Verify tab names match exactly (case-sensitive)
2. Check range format: `TabName!A1:B100`
3. Ensure spreadsheet ID is correct

### Data not updating

**Causes:**
1. Polling not working
2. Sheet data hasn't changed
3. Browser cache

**Solution:**
1. Check browser console for errors
2. Verify "Last updated" timestamp changes
3. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
4. Check Google Sheet was actually modified

### Empty leaderboard

**Causes:**
1. No data in Google Sheet
2. Header row in wrong position
3. Empty names in rows

**Solution:**
1. Verify sheet has data starting from Row 2
2. Ensure Row 1 is header row (Name, Score)
3. Remove rows with empty names

---

## Architecture

### Data Flow

```
[User edits Google Sheet]
    ↓ 0-30s (polling interval)
[Frontend fetches from Google Sheets API]
    ↓ <100ms
[UI re-renders with new data]
```

### Files Created/Modified

**New files:**
- `/frontend/src/services/googleSheets.js` - API service
- `/frontend/src/hooks/useGoogleSheetsPolling.js` - Polling hook

**Modified files:**
- `/frontend/src/components/DerbyDaysLeaderboard.jsx`
- `/frontend/src/components/CallathonLeaderboard.jsx`
- `/frontend/.env.development`
- `/frontend/.env.production`

**Removed dependencies:**
- Backend Express server no longer needed
- Render.com deployment no longer needed

---

## Security Considerations

### API Key Security

**Q: Is it safe to expose the API key in frontend code?**

**A:** Yes, with proper restrictions:

1. ✅ **API restricted to Google Sheets only** - key cannot access other Google services
2. ✅ **HTTP referrer restrictions** - key only works from your domains
3. ✅ **Sheet is read-only** - API can only read, not write
4. ✅ **Data is public anyway** - leaderboard is meant to be publicly viewable

**The risk is minimal because:**
- Attacker cannot write to your sheet
- Attacker cannot access other Google services
- Attacker cannot use key from other domains (HTTP referrer restriction)
- Worst case: attacker reads public data (same as viewing your website)

### Best Practices

1. **Never commit real API keys to Git** - use `.gitignore`
2. **Use separate keys** for dev/prod (optional but recommended)
3. **Monitor API usage** regularly in Google Cloud Console
4. **Rotate keys** if compromised

---

## Next Steps

1. ✅ Complete Google Sheets setup
2. ✅ Configure API key with restrictions
3. ✅ Update environment variables
4. ✅ Test locally
5. ✅ Deploy to production
6. ✅ Monitor API quota usage
7. ⚠️ (Optional) Remove backend server code if no longer needed

---

## Support

If you encounter issues:

1. Check browser console for detailed error messages
2. Verify all steps in this guide are completed
3. Test with a simple public Google Sheet first
4. Check Google Cloud Console for API errors and quota

---

## Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
