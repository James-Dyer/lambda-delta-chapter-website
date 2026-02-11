/**
 * Environment configuration with validation
 * Loads and validates all required environment variables
 */

import { config } from 'dotenv';
import type { Config } from '../types/leaderboard.js';

// Load environment variables
config();

/**
 * Validates that a required environment variable exists
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value
 */
function getEnv(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

/**
 * Parses an integer from environment variable
 */
function getEnvInt(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid integer`);
  }
  return parsed;
}

/**
 * Application configuration object
 * Validates all required environment variables on module load
 */
export const appConfig: Config = {
  googleSheetsApiKey: requireEnv('GOOGLE_SHEETS_API_KEY'),
  googleSheetsId: requireEnv('GOOGLE_SHEETS_ID'),
  sheetRangeDerbyDays: getEnv('SHEET_RANGE_DERBY_DAYS', 'DerbyDays!A1:B100'),
  sheetRangeCallathon: getEnv('SHEET_RANGE_CALLATHON', 'Callathon!A1:B100'),
  pollIntervalCallathonMs: getEnvInt('POLL_INTERVAL_CALLATHON_MS', 3000),
  pollIntervalDerbyDaysMs: getEnvInt('POLL_INTERVAL_DERBY_DAYS_MS', 30000),
  clientOriginProd: getEnv('CLIENT_ORIGIN_PROD', 'https://ucmsigmachi.org'),
  clientOriginDev: getEnv('CLIENT_ORIGIN_DEV', 'http://localhost:3000'),
  port: getEnvInt('PORT', 3001),
};

// Log configuration (without sensitive data) on startup
console.log('Configuration loaded:', {
  sheetRangeDerbyDays: appConfig.sheetRangeDerbyDays,
  sheetRangeCallathon: appConfig.sheetRangeCallathon,
  pollIntervalCallathonMs: appConfig.pollIntervalCallathonMs,
  pollIntervalDerbyDaysMs: appConfig.pollIntervalDerbyDaysMs,
  port: appConfig.port,
});
