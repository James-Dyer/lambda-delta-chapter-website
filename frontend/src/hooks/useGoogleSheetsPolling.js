/**
 * Custom hook for polling Google Sheets data at regular intervals
 * Continues polling even on errors to allow recovery
 */

import { useState, useEffect, useRef } from 'react';
import { fetchLeaderboardData } from '../services/googleSheets';

/**
 * Custom hook that polls Google Sheets at a specified interval
 *
 * @param {string} range - The Google Sheets range to fetch (e.g., "DerbyDays!A1:B100")
 * @param {number} interval - Polling interval in milliseconds (default: 30000)
 * @param {Object} [options] - Parsing options passed to fetchLeaderboardData
 * @param {number} [options.scoreColumnIndex=1] - Zero-based column index for the score value
 * @returns {{ data: {rows: Array, updatedAt: Date} | null, loading: boolean, error: string | null, lastUpdated: Date | null }}
 */
export function useGoogleSheetsPolling(range, interval = 30000, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // Fetch function
    const fetchData = async () => {
      try {
        const rows = await fetchLeaderboardData(range, options);

        // Only update state if component is still mounted
        if (isMounted.current) {
          // Format data to match expected component structure
          setData({
            rows,
            updatedAt: new Date(),
            status: 'ok',
          });
          setError(null);
          setLoading(false);
          setLastUpdated(new Date());
        }
      } catch (err) {
        console.error('Google Sheets polling error:', err);

        // Only update state if component is still mounted
        if (isMounted.current) {
          setError(err.message || 'Failed to fetch data from Google Sheets');
          setLoading(false);

          // Keep previous data on error - don't clear it
          // But mark status as degraded if we have previous data
          if (data) {
            setData({
              ...data,
              status: 'degraded',
              error: err.message,
            });
          }
        }
      }
    };

    // Fetch immediately on mount
    fetchData();

    // Then poll at regular intervals
    const intervalId = setInterval(fetchData, interval);

    // Cleanup function
    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [range, interval]); // Re-run effect if range or interval changes

  return { data, loading, error, lastUpdated };
}
