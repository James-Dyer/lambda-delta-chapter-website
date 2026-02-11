/**
 * Call-a-thon Leaderboard Component
 * Optimized for big display - clean bar chart view
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useGoogleSheetsPolling } from '../hooks/useGoogleSheetsPolling';
import { usePrevious } from '../hooks/usePrevious';
import '../styles/callathonLeaderboard.css';

const CallathonLeaderboard = () => {
  const range =
    process.env.REACT_APP_SHEET_RANGE_CALLATHON || 'Callathon!A1:B100';
  const { data, loading, error } = useGoogleSheetsPolling(
    range,
    3000 // Poll every 3 seconds for Callathon (fast updates)
  );

  // Calculate max score for bar width percentages
  const maxScore =
    data?.rows?.length > 0 ? Math.max(...data.rows.map((row) => row.score)) : 0;

  // Track previous data for score change detection
  const previousData = usePrevious(data?.rows);

  // Detect which organizations had score changes
  const changedScores = useMemo(() => {
    if (!previousData || !data?.rows) return new Set();

    const changed = new Set();
    data.rows.forEach((row) => {
      const prevRow = previousData.find((p) => p.name === row.name);
      if (prevRow && prevRow.score !== row.score) {
        changed.add(row.name);
      }
    });
    return changed;
  }, [previousData, data?.rows]);

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

  // Loading State
  if (loading && !data) {
    return (
      <div className="callathon-display">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !data) {
    return (
      <div className="callathon-display">
        <div className="error-container">
          <p>❌ Unable to load leaderboard</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!data?.rows || data.rows.length === 0) {
    return (
      <div className="callathon-display">
        <div className="empty-container">
          <p>No participants yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="callathon-display">
      <div className="bars-container">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {data.rows.map((row, index) => {
              // Asymptotic scaling: bars grow continuously but never reach 100%
              const MAX_WIDTH = 95; // Asymptotic limit (bars approach but never reach this)
              const SCALE_FACTOR = maxScore * 1.2; // Controls growth rate

              const percentage =
                maxScore > 0
                  ? MAX_WIDTH * (1 - Math.exp(-row.score / SCALE_FACTOR))
                  : 0;

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
                    data-narrow={percentage < 30}
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
                    <motion.span
                      className="bar-value"
                      animate={
                        changedScores.has(row.name)
                          ? {
                              scale: [1, 1.15, 1],
                              color: ['#ffffff', '#ffd700', '#ffffff'],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                    >
                      ${row.score.toLocaleString()} 🐎
                    </motion.span>
                  </motion.div>
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
