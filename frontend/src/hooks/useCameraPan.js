/**
 * useCameraPan Hook
 * Implements smooth camera-pan viewport system for unbounded bar charts
 *
 * Creates a "world space" where bars can grow infinitely, and the viewport
 * pans left when the leader approaches the right edge.
 *
 * @param {number} maxScore - Maximum score in the dataset
 * @param {number} viewportWidth - Width of the viewport container
 * @param {number} pixelsPerUnit - Scaling factor (default 1px = $1)
 * @returns {Object} { x, parallaxX } - Motion values for camera and parallax
 */

import { useEffect } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export function useCameraPan(maxScore, viewportWidth, pixelsPerUnit = 1) {
  const TRIGGER_ZONE = 0.85; // Pan starts when leader at 85% of viewport

  // Create spring animation for smooth camera movement
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    if (!maxScore || !viewportWidth) return;

    // Calculate bar width in world space
    const maxBarWidth = maxScore * pixelsPerUnit;

    // Calculate trigger point (when camera should start panning)
    const triggerPoint = viewportWidth * TRIGGER_ZONE;

    // Calculate desired camera offset
    // Camera only moves if leader exceeds trigger point
    const desiredOffset = Math.max(0, maxBarWidth - triggerPoint);

    // Update spring target (will animate smoothly to this value)
    spring.set(desiredOffset);
  }, [maxScore, viewportWidth, pixelsPerUnit, spring]);

  // Transform spring value to CSS translateX (negative for left movement)
  const x = useTransform(spring, (value) => -value);

  // Create parallax effect for background (moves slower)
  const parallaxX = useTransform(x, (value) => value * 0.3);

  return { x, parallaxX };
}
