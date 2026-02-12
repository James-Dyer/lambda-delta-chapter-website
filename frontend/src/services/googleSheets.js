/**
 * Google Sheets API Service
 * Fetches and parses leaderboard data from Google Sheets
 */

/**
 * Fetches leaderboard data from Google Sheets API
 *
 * @param {string} range - Sheet range (e.g., "DerbyDays!A1:B100")
 * @returns {Promise<Array>} Parsed leaderboard rows with rank, name, and score
 */
export async function fetchLeaderboardData(range) {
  const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

  // Validate environment variables
  if (!SHEET_ID || !API_KEY) {
    console.error('Missing Google Sheets configuration:', {
      hasSheetId: !!SHEET_ID,
      hasApiKey: !!API_KEY,
    });
    throw new Error(
      'Google Sheets configuration is missing. Please set REACT_APP_GOOGLE_SHEETS_ID and REACT_APP_GOOGLE_SHEETS_API_KEY'
    );
  }

  // Construct API URL
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Google Sheets API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    const rows = data.values || [];

    // Parse the data
    return parseLeaderboardData(rows);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
}

/**
 * Parses raw Google Sheets data into leaderboard format
 *
 * @param {Array<Array<string>>} rows - Raw 2D array from Google Sheets API
 * @returns {Array<{rank: number, name: string, score: number}>} Parsed and sorted leaderboard
 */
function parseLeaderboardData(rows) {
  // Skip if no data
  if (!rows || rows.length === 0) {
    return [];
  }

  // Skip header row (index 0) and parse data rows
  const dataRows = rows.slice(1);

  // Parse, filter, and convert rows
  const parsedRows = dataRows
    .map((row) => {
      const name = row[0] ? String(row[0]).trim() : '';
      const scoreStr = row[1] ? String(row[1]).trim() : '0';

      // Convert score to number, removing any non-numeric characters except decimal point
      const score = parseFloat(scoreStr.replace(/[^0-9.-]/g, '')) || 0;

      return { name, score };
    })
    .filter((row) => row.name !== ''); // Filter out rows with empty names

  // Sort by score descending
  parsedRows.sort((a, b) => b.score - a.score);

  // Assign ranks
  let currentRank = 1;
  let previousRank = 1;
  const rankedRows = parsedRows.map((row, index) => {
    // Handle ties - if score is same as previous, keep same rank
    if (index > 0 && row.score === parsedRows[index - 1].score) {
      return { ...row, rank: previousRank };
    }

    previousRank = currentRank;
    currentRank++;
    return { ...row, rank: previousRank };
  });

  return rankedRows;
}

/**
 * Validates Google Sheets configuration
 *
 * @returns {boolean} True if configuration is valid
 */
export function hasValidConfiguration() {
  return !!(
    process.env.REACT_APP_GOOGLE_SHEETS_ID &&
    process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
  );
}
