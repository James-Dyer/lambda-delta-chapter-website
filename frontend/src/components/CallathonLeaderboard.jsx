/**
 * Call-a-thon Leaderboard Component
 * Optimized for big display - clean bar chart view
 */

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { callathon, SNAPSHOT_LABEL } from '../Data/archiveSnapshot';
import '../styles/callathonLeaderboard.css';

const CallathonLeaderboard = () => {
  const data = { rows: callathon };

  // Calculate max score for bar width percentages
  const maxScore =
    data?.rows?.length > 0 ? Math.max(...data.rows.map((row) => row.score)) : 0;

  // Tanh-based scaling with smoothed adaptation
  // k controls how quickly bars approach the edge (scale parameter)
  const [k, setK] = useState(1);
  const animationFrameRef = useRef(null);

  // Smoothly adapt k to keep leader at target ratio (0.92 of max width)
  useEffect(() => {
    if (maxScore === 0) {
      setK(1);
      return;
    }

    const TARGET_RATIO = 0.92; // Want leader at ~92% of max width
    const ALPHA = 0.08; // Smoothing factor (0.03-0.15 range, higher = more responsive)

    // Calculate ideal k for current leader
    const kIdeal = maxScore / Math.atanh(TARGET_RATIO);

    // Smoothly interpolate k toward kIdeal
    const animate = () => {
      setK((prevK) => {
        const newK = prevK + ALPHA * (kIdeal - prevK);
        // Continue animating if not close enough
        if (Math.abs(newK - kIdeal) > 0.01) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
        return newK;
      });
    };

    // Start animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maxScore]);

  const changedScores = new Set();

  // Calculate dynamic bar height so all orgs fit within the viewport (no scrolling)
  const barHeight = useMemo(() => {
    const count = data?.rows?.length || 0;
    if (count === 0) return 96;

    const MAX_BAR_HEIGHT = 96; // px - cap to avoid overly thick bars with few teams
    const DISPLAY_PADDING = 48; // px (3rem on each side, vertical)
    const GAP = 8; // px (0.5rem gap between bars)
    const viewportH = window.innerHeight;
    const available =
      viewportH - DISPLAY_PADDING * 2 - GAP * Math.max(0, count - 1);
    return Math.min(MAX_BAR_HEIGHT, Math.floor(available / count));
  }, [data?.rows?.length]);

  // Calculate minimum bar width needed to fit the longest name
  const minWidthPercent = useMemo(() => {
    if (!data?.rows || data.rows.length === 0) return 15;

    // Create a canvas context to measure text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Match the dynamic font size: clamp(0.75rem, barHeight * 0.38, 2rem)
    const dynamicFontPx = Math.min(Math.max(barHeight * 0.38, 12), 32);
    context.font = `bold ${dynamicFontPx}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    // Find the longest name width
    let maxNameWidth = 0;
    data.rows.forEach((row) => {
      const metrics = context.measureText(row.name);
      maxNameWidth = Math.max(maxNameWidth, metrics.width);
    });

    // Add padding (2rem on each side = 4rem total, roughly 64px at typical rem)
    // Plus extra space for safety margin
    const totalWidthNeeded = maxNameWidth + 128; // 64px padding + 64px safety margin

    // Convert to percentage of viewport width (approximate)
    const viewportWidth = window.innerWidth || 1920;
    const percentage = (totalWidthNeeded / viewportWidth) * 100;

    // Return at least 15%, but use calculated if larger
    return Math.max(15, Math.min(percentage, 40)); // Cap at 40% to avoid too-wide minimums
  }, [data?.rows, barHeight]);

  // Animation variants for bar growth
  const barVariants = {
    hidden: { width: '0%' },
    visible: (targetWidth) => ({
      width: targetWidth,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="callathon-display">
      <span className="snapshot-label callathon-snapshot-label">
        {SNAPSHOT_LABEL}
      </span>
      <div
        className="bars-container"
        style={{ '--bar-height': `${barHeight}px` }}
      >
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {data.rows.map((row, index) => {
              // Tanh-based scaling: saturating curve with smoothed adaptation
              // Leader visibly grows when gaining points, then scale adjusts
              const MAX_WIDTH = 95; // Maximum bar width percentage

              // Calculate bar width with dynamic minimum
              const rawPercentage =
                row.score > 0 && k > 0
                  ? MAX_WIDTH * Math.tanh(row.score / k)
                  : 0;
              const percentage = Math.max(minWidthPercent, rawPercentage);

              // Determine if points should be displayed outside the bar
              // Threshold: if bar is close to minimum width, show points externally
              const showPointsExternal = percentage < minWidthPercent * 1.3;

              // Dynamically determine the correct text color based on rank and position
              const isTopThree = index < 3;
              const basePointsColor = isTopThree
                ? '#1a1a1a' // Dark text for top 3 medal positions (light backgrounds)
                : showPointsExternal
                  ? '#d2b48c' // Tan text for external points (visible outside bar)
                  : '#ffffff'; // White text for internal points (inside dark bar)

              return (
                <motion.div
                  key={row.name}
                  layoutId={row.name}
                  className={`bar-row ${index < 3 ? `rank-${index + 1}` : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    layout: { duration: 0.6, ease: 'easeInOut' },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="bar-fill"
                    layout="position"
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                    custom={`${percentage}%`}
                    style={{ width: `${percentage}%` }}
                    transition={{
                      layout: { duration: 0.6, ease: 'easeOut' },
                    }}
                  >
                    <span className="bar-name">{row.name}</span>
                    {!showPointsExternal && (
                      <motion.span
                        className="bar-value"
                        animate={
                          changedScores.has(row.name)
                            ? {
                                scale: [1, 1.15, 1],
                                color: [
                                  basePointsColor,
                                  '#ffd700',
                                  basePointsColor,
                                ],
                              }
                            : {
                                scale: 1,
                                color: basePointsColor,
                              }
                        }
                        transition={{ duration: 0.6 }}
                      >
                        ${row.score.toLocaleString()}
                      </motion.span>
                    )}
                  </motion.div>
                  {showPointsExternal && (
                    <motion.span
                      className="bar-value-external"
                      animate={
                        changedScores.has(row.name)
                          ? {
                              scale: [1, 1.15, 1],
                              color: [
                                basePointsColor,
                                '#ffd700',
                                basePointsColor,
                              ],
                            }
                          : {
                              scale: 1,
                              color: basePointsColor,
                            }
                      }
                      transition={{ duration: 0.6 }}
                    >
                      ${row.score.toLocaleString()}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default CallathonLeaderboard;
