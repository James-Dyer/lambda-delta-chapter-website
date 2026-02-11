/**
 * Google Sheets API client
 * Fetches and parses leaderboard data from Google Sheets
 */

import type { LeaderboardEvent, LeaderboardRow } from '../types/leaderboard.js';
import { appConfig } from '../config/environment.js';

interface SheetsApiResponse {
  range: string;
  majorDimension: string;
  values?: string[][];
}

/**
 * Fetches raw data from Google Sheets API
 */
async function fetchSheetData(range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${appConfig.googleSheetsId}/values/${range}?key=${appConfig.googleSheetsApiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Sheets API error (${response.status}): ${errorText}`
    );
  }

  const data: SheetsApiResponse = await response.json();

  // Return empty array if no values
  return data.values ?? [];
}

/**
 * Parses raw sheet rows into structured leaderboard data
 */
function parseSheetData(rawData: string[][]): LeaderboardRow[] {
  // Skip header row (index 0)
  const dataRows = rawData.slice(1);

  // Parse, filter, and sort
  const rows: LeaderboardRow[] = dataRows
    .map((row) => {
      const name = row[0]?.trim() ?? '';
      const scoreStr = row[1]?.trim() ?? '0';
      const score = parseFloat(scoreStr) || 0;

      return { name, score };
    })
    // Filter out rows with empty names
    .filter((row) => row.name.length > 0)
    // Sort by score descending
    .sort((a, b) => b.score - a.score);

  // Assign ranks
  return rows.map((row, index) => ({
    rank: index + 1,
    name: row.name,
    score: row.score,
  }));
}

/**
 * Gets the sheet range for a given event
 */
function getSheetRange(event: LeaderboardEvent): string {
  switch (event) {
    case 'derbyDays':
      return appConfig.sheetRangeDerbyDays;
    case 'callathon':
      return appConfig.sheetRangeCallathon;
  }
}

/**
 * Fetches and parses leaderboard data for a specific event
 * @throws Error if API call fails or data cannot be parsed
 */
export async function fetchLeaderboardData(
  event: LeaderboardEvent
): Promise<LeaderboardRow[]> {
  const range = getSheetRange(event);

  console.log(`Fetching ${event} leaderboard from range: ${range}`);

  const rawData = await fetchSheetData(range);
  const parsedData = parseSheetData(rawData);

  console.log(`Fetched ${parsedData.length} rows for ${event} leaderboard`);

  return parsedData;
}
