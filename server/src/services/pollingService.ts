/**
 * Polling service with in-memory caching
 * Manages dual-interval polling for callathon (3s) and derbyDays (30s)
 * Implements graceful degraded mode on errors
 */

import type {
  LeaderboardEvent,
  CacheEntry,
  LeaderboardResponse,
} from '../types/leaderboard.js';
import { fetchLeaderboardData } from './googleSheets.js';
import { appConfig } from '../config/environment.js';

/**
 * In-memory cache for leaderboard data
 */
const cache = new Map<LeaderboardEvent, CacheEntry>();

/**
 * Interval timers for each event
 */
const intervals = new Map<LeaderboardEvent, NodeJS.Timeout>();

/**
 * Initialize cache with degraded state for all events
 */
function initializeCache(): void {
  const events: LeaderboardEvent[] = ['callathon', 'derbyDays'];

  events.forEach((event) => {
    cache.set(event, {
      status: 'degraded',
      updatedAt: new Date(),
      rows: [],
      error: 'Not yet loaded',
    });
  });

  console.log('Cache initialized with degraded state');
}

/**
 * Polls a specific event and updates cache
 */
async function pollEvent(event: LeaderboardEvent): Promise<void> {
  try {
    const rows = await fetchLeaderboardData(event);

    // Update cache with successful data
    cache.set(event, {
      status: 'ok',
      updatedAt: new Date(),
      rows,
    });

    console.log(`✓ Successfully updated ${event} cache`);
  } catch (error) {
    // On error, keep last cache data but set status to degraded
    const currentCache = cache.get(event);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    console.error(`✗ Error polling ${event}:`, errorMessage);

    if (currentCache) {
      // Retain last good data, update status to degraded
      cache.set(event, {
        ...currentCache,
        status: 'degraded',
        error: errorMessage,
      });
    } else {
      // Fallback if no cache exists
      cache.set(event, {
        status: 'degraded',
        updatedAt: new Date(),
        rows: [],
        error: errorMessage,
      });
    }
  }
}

/**
 * Starts polling for a specific event at the configured interval
 */
function startPolling(event: LeaderboardEvent): void {
  const interval =
    event === 'callathon'
      ? appConfig.pollIntervalCallathonMs
      : appConfig.pollIntervalDerbyDaysMs;

  console.log(`Starting polling for ${event} every ${interval}ms`);

  // Poll immediately on start
  pollEvent(event);

  // Then poll at regular intervals
  const timer = setInterval(() => {
    pollEvent(event);
  }, interval);

  intervals.set(event, timer);
}

/**
 * Starts the polling service for all events
 */
export function startPollingService(): void {
  console.log('Starting polling service...');

  initializeCache();

  const events: LeaderboardEvent[] = ['callathon', 'derbyDays'];
  events.forEach((event) => startPolling(event));

  console.log('Polling service started');
}

/**
 * Stops the polling service (cleanup)
 */
export function stopPollingService(): void {
  console.log('Stopping polling service...');

  intervals.forEach((timer, event) => {
    clearInterval(timer);
    console.log(`Stopped polling for ${event}`);
  });

  intervals.clear();
  console.log('Polling service stopped');
}

/**
 * Gets the cached data for an event
 * Returns the cached entry formatted as API response
 */
export function getCachedData(event: LeaderboardEvent): LeaderboardResponse {
  const entry = cache.get(event);

  if (!entry) {
    // Should never happen if service is initialized
    return {
      status: 'degraded',
      updatedAt: new Date().toISOString(),
      rows: [],
      error: 'Cache not initialized',
    };
  }

  return {
    status: entry.status,
    updatedAt: entry.updatedAt.toISOString(),
    rows: entry.rows,
    ...(entry.error && { error: entry.error }),
  };
}

/**
 * Gets the status of all polling intervals (for health check)
 */
export function getPollingStatus(): {
  [K in LeaderboardEvent]: {
    status: string;
    lastUpdated: string;
    rowCount: number;
  };
} {
  const callathonEntry = cache.get('callathon');
  const derbyDaysEntry = cache.get('derbyDays');

  return {
    callathon: {
      status: callathonEntry?.status ?? 'unknown',
      lastUpdated: callathonEntry?.updatedAt.toISOString() ?? 'never',
      rowCount: callathonEntry?.rows.length ?? 0,
    },
    derbyDays: {
      status: derbyDaysEntry?.status ?? 'unknown',
      lastUpdated: derbyDaysEntry?.updatedAt.toISOString() ?? 'never',
      rowCount: derbyDaysEntry?.rows.length ?? 0,
    },
  };
}
