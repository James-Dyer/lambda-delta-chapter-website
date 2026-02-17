/**
 * usePrevious Hook
 * Tracks previous render values for change detection
 *
 * Usage:
 * const previousValue = usePrevious(currentValue);
 * if (previousValue !== currentValue) {
 *   // Value changed!
 * }
 */

import { useRef, useEffect } from 'react';

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
