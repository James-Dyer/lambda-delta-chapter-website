/**
 * Custom hook for polling data at regular intervals
 * Continues polling even on errors to allow recovery
 */

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that polls a URL at a specified interval
 *
 * @param {string} url - The URL to fetch data from
 * @param {number} interval - Polling interval in milliseconds (default: 3000)
 * @returns {{ data: any, loading: boolean, error: string | null, lastUpdated: Date | null }}
 */
export function usePolling(url, interval = 3000) {
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
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `HTTP error ${response.status}: ${response.statusText}`
          );
        }

        const result = await response.json();

        // Only update state if component is still mounted
        if (isMounted.current) {
          setData(result);
          setError(null);
          setLoading(false);
          setLastUpdated(new Date());
        }
      } catch (err) {
        console.error('Polling error:', err);

        // Only update state if component is still mounted
        if (isMounted.current) {
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
          // Keep previous data on error - don't clear it
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
  }, [url, interval]);

  return { data, loading, error, lastUpdated };
}
