# Google Sheets Integration Guide

## Overview

The Sigma Chi Lambda Delta chapter website uses Google Sheets as a live data source for the Derby Days and Callathon leaderboards. The React frontend polls the **Google Sheets API v4** directly from the browser using a restricted public API key — no backend or OAuth required.

## Architecture

1. Google Sheet stores org data (name, points), edited directly by organizers during the event
2. Leaderboard components poll the **Google Sheets API v4** directly from the browser (no backend) — every 3s for Callathon, every 30s for Derby Days
3. `services/googleSheets.js` parses the raw 2D array: skips the header row, reads name from col A and score from the configured column, sorts by score, and assigns ranks with tie handling
4. Framer Motion animates bar reordering and score changes in real time

## Setup

### Google Sheets

1. Open your spreadsheet and click **Share → Anyone with the link → Viewer**
2. Note the spreadsheet ID from the URL: `docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
3. Ensure your sheet tabs and column layout match:
   - **Derby Days**: col A = Org name, col B = Score (row 1 = headers)
   - **Callathon**: col A = Org name, col C = Points (row 1 = headers)

### Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com) → create or select a project
2. Navigate to **APIs & Services → Enable APIs** → enable **Google Sheets API**
3. Go to **APIs & Services → Credentials → Create API Key**
4. Restrict the key: **API restrictions → Google Sheets API only**, and **HTTP referrer restrictions** for your domain (e.g. `https://ucmsigmachi.org/*`, `http://localhost:3000/*`)

### Set environment variables

Copy the values into `frontend/.env.development` (local) and `frontend/.env.production` (deployed):

```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key
REACT_APP_GOOGLE_SHEETS_ID=your_spreadsheet_id
REACT_APP_SHEET_RANGE_DERBY_DAYS=Total Points!A1:B100
REACT_APP_SHEET_RANGE_CALLATHON=Call-a-thon!A1:C100
```

## Leaderboard Pages
  - Derby Days: `http://localhost:3000/#/derbyDays`
  - Call-a-thon: `http://localhost:3000/#/callathon`