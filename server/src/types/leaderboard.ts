/**
 * Type definitions for the leaderboard system
 */

export type LeaderboardEvent = 'derbyDays' | 'callathon';

export interface LeaderboardRow {
  rank: number;
  name: string;
  score: number;
}

export type LeaderboardStatus = 'ok' | 'degraded';

export interface LeaderboardResponse {
  status: LeaderboardStatus;
  updatedAt: string; // ISO8601 timestamp
  rows: LeaderboardRow[];
  error?: string;
}

export interface CacheEntry {
  status: LeaderboardStatus;
  updatedAt: Date;
  rows: LeaderboardRow[];
  error?: string;
}

export interface RawSheetRow {
  name: string;
  score: number;
}

export interface Config {
  googleSheetsApiKey: string;
  googleSheetsId: string;
  sheetRangeDerbyDays: string;
  sheetRangeCallathon: string;
  pollIntervalCallathonMs: number;
  pollIntervalDerbyDaysMs: number;
  clientOriginProd: string;
  clientOriginDev: string;
  port: number;
}
