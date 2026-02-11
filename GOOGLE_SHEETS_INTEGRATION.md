# Google Sheets Integration Guide

## Overview

This Theta Tau philanthropy website integrates with Google Sheets to dynamically display organization leaderboard data. The implementation uses the **Google Sheets API v4** with a **public API key** approach (no OAuth required) and leverages **Next.js ISR (Incremental Static Regeneration)** for automatic caching and revalidation.

## Architecture

### High-Level Flow
1. Google Sheet stores organization data (name, type, size, points)
2. Next.js application fetches data from Google Sheets API
3. Data is cached and automatically revalidated every 5 minutes
4. React components display the data with filtering capabilities

## Implementation Details

### 1. Google Sheets Setup

#### Sheet Structure
The Google Sheet has a tab named **"Website Data"** with the following columns:

| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Name | Type | Size | Points |
| Org Name 1 | Fraternity | Large | 150 |
| Org Name 2 | Sorority | Medium | 200 |
| ... | ... | ... | ... |

**Important Notes:**
- Row 1 contains headers
- Data starts from Row 2 (A2:D)
- The range specified in code is `'Website Data'!A2:D` (reads from A2 to the last row with data in columns A-D)

#### Google Sheets API Access
The sheet must be:
1. **Published to the web** OR
2. **Shared as "Anyone with the link can view"**

This allows the API to access it with just an API key (no OAuth authentication needed).

### 2. Google Cloud Console Setup

To enable Google Sheets API access:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create an API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
5. (Optional) Restrict the API key:
   - Edit the API key
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API"
   - Add HTTP referrer restrictions for production use

### 3. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
NEXT_PUBLIC_SHEET_ID=your_spreadsheet_id_here
```

**Finding the Sheet ID:**
From a Google Sheets URL like:
```
https://docs.google.com/spreadsheets/d/1ABC123xyz/edit#gid=0
```
The Sheet ID is: `1ABC123xyz`

**Why NEXT_PUBLIC_ prefix?**
- These variables need to be accessible in the browser
- Next.js only exposes environment variables prefixed with `NEXT_PUBLIC_` to the client side
- The fetch happens client-side in this implementation

### 4. Core Implementation: lib/orgSheets.ts

```typescript
interface OrgData {
  name: string;
  points: number;
  size: string;
  type: string;
}

export async function getSheetData(): Promise<OrgData[]> {
  try {
    const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const RANGE = "'Website Data'!A2:D";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 300 } });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch sheet data: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows) {
      return [];
    }

    const orgData: OrgData[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] && row[0] !== 'Name') {
        orgData.push({
          name: row[0],
          type: row[1],
          size: row[2],
          points: Number(row[3] || 0)
        });
      }
    }

    // Sort by points first, then alphabetically for ties
    const sortedData = orgData.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return a.name.localeCompare(b.name);
    });

    return sortedData;
  } catch (error) {
    console.error('Error in getSheetData:', error);
    return [];
  }
}
```

#### Key Features:

**1. Google Sheets API Endpoint:**
```
https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}
```
- `SHEET_ID`: Unique identifier for the spreadsheet
- `RANGE`: Sheet tab name and cell range (e.g., `'Website Data'!A2:D`)
- `key`: API key for authentication

**2. Next.js ISR Caching:**
```typescript
fetch(url, { next: { revalidate: 300 } })
```
- Data is cached for **300 seconds (5 minutes)**
- After 5 minutes, Next.js will revalidate the cache in the background
- Users see cached data while fresh data is fetched
- Balances freshness with API quota limits

**3. Data Parsing:**
- API returns data in format: `{ values: [["row1col1", "row1col2"], ["row2col1", "row2col2"]] }`
- Each row is an array of cell values
- Skips header rows (checks for 'Name')
- Converts points to numbers with fallback to 0

**4. Sorting:**
- Primary sort: Points (descending)
- Secondary sort: Name (alphabetical) for ties
- Ensures consistent leaderboard ordering

**5. Error Handling:**
- Returns empty array on error (graceful degradation)
- Logs errors to console for debugging
- No user-facing error for failed fetches (just empty leaderboard)

### 5. Component Usage: components/leaderboard.tsx

```typescript
export default function Leaderboard() {
  const [organizations, setOrganizations] = useState<OrgData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSheetData();
        setOrganizations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leaderboard data');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ... rest of component with filtering and display logic
}
```

**Component Features:**
- Client-side data fetching in `useEffect`
- Loading state while data fetches
- Filtering by organization type (Club, Fraternity, Sorority, etc.)
- Filtering by size (Small, Medium, Large)
- Responsive "Show More" button on mobile
- Highlights top organization with yellow background

### 6. Next.js Configuration

**next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    NEXT_PUBLIC_SHEET_ID: process.env.NEXT_PUBLIC_SHEET_ID,
  }
};
```

This ensures environment variables are properly exposed to the Next.js build.

## Advantages of This Approach

### 1. No Backend Required
- Direct API calls from frontend
- No need for custom server endpoints
- Simpler deployment (static hosting possible)

### 2. Real-time Updates
- Sheet updates reflect on website within 5 minutes
- No manual redeployment needed
- Non-technical users can update data via Google Sheets

### 3. Collaboration-Friendly
- Multiple people can edit the Google Sheet
- Built-in Google Sheets revision history
- Familiar interface for data entry

### 4. Cost-Effective
- Google Sheets API has generous free tier (500 requests per 100 seconds per project)
- No database hosting costs
- No backend server costs

### 5. Performance
- Cached data reduces API calls
- Fast response times for users
- Automatic background revalidation

## Limitations & Considerations

### 1. API Quota Limits
- Google Sheets API has rate limits
- With 5-minute caching, a high-traffic site won't hit limits
- Monitor usage in Google Cloud Console

### 2. Public API Key Exposure
- API key is visible in client-side code
- Mitigate by:
  - Restricting API key to Google Sheets API only
  - Adding HTTP referrer restrictions
  - The sheet must be publicly accessible anyway

### 3. Data Structure Changes
- If sheet columns change, code must be updated
- Consider documenting the expected sheet format
- Could add validation for expected columns

### 4. No Write Access
- This implementation is read-only
- For write operations, would need OAuth or server-side implementation
- Current design is perfect for display-only leaderboards

## Alternative Approaches Considered

### 1. Server-Side Rendering (SSR)
**Not Used Because:**
- Would fetch on every page load
- More server load
- Slower initial page loads

### 2. Static Site Generation (SSG)
**Not Used Because:**
- Requires rebuild/redeploy for data updates
- Not suitable for frequently changing data
- ISR provides better balance

### 3. Google Sheets Add-on/Apps Script
**Not Used Because:**
- Requires additional setup
- Less control over caching
- More complex deployment

### 4. Webhooks for Real-time Updates
**Not Used Because:**
- Overkill for this use case
- 5-minute delay is acceptable
- Simpler implementation without webhooks

## Best Practices

### 1. Error Handling
- Always provide fallback data (empty array)
- Don't expose API errors to end users
- Log errors for debugging

### 2. Data Validation
- Validate data types (convert points to numbers)
- Handle missing data gracefully
- Skip malformed rows

### 3. Performance
- Use appropriate cache duration (5 minutes is reasonable)
- Consider client-side caching for filters
- Implement loading states

### 4. Security
- Never commit `.env.local` to version control
- Use API key restrictions in production
- Monitor API usage for anomalies

### 5. Maintenance
- Document sheet structure requirements
- Test with various data scenarios
- Monitor error logs regularly

## Testing the Integration

### 1. Test API Access
```bash
curl "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Website%20Data!A2:D?key=YOUR_API_KEY"
```

### 2. Check Sheet Permissions
- Verify sheet is shared publicly or "Anyone with link can view"
- Test access from incognito browser

### 3. Verify Data Format
- Ensure columns match expected order
- Check for proper data types
- Test with empty rows/missing data

## Troubleshooting

### Error: 403 Forbidden
- Google Sheets API not enabled in project
- API key restrictions too strict
- Sheet not shared publicly

### Error: 404 Not Found
- Incorrect Sheet ID
- Sheet tab name mismatch
- Sheet deleted or moved

### No Data Displayed
- Check browser console for errors
- Verify environment variables are set
- Check sheet has data in correct range
- Ensure sheet tab name matches code

### Stale Data
- Check if caching duration is too long
- Clear Next.js cache: delete `.next` folder
- Verify revalidate setting in fetch

## Summary

This implementation provides a **simple, effective, and maintainable** way to display live data from Google Sheets on a Next.js website. It combines:

- ✅ Google Sheets API v4 for data access
- ✅ Next.js ISR for intelligent caching
- ✅ Client-side fetching for simplicity
- ✅ Public API key (properly restricted)
- ✅ 5-minute auto-revalidation
- ✅ Graceful error handling
- ✅ Sortable and filterable data display

Perfect for contest tracking, leaderboards, event listings, or any scenario where non-technical users need to update website data without touching code.
