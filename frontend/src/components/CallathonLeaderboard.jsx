/**
 * Call-a-thon Leaderboard Component
 * Optimized for big display - clean bar chart view
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useGoogleSheetsPolling } from '../hooks/useGoogleSheetsPolling';
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
        {data.rows.map((row, index) => {
          // Asymptotic scaling: bars grow continuously but never reach 100%
          const MAX_WIDTH = 95; // Asymptotic limit (bars approach but never reach this)
          const SCALE_FACTOR = maxScore * 1.2; // Controls growth rate

          const percentage =
            maxScore > 0
              ? MAX_WIDTH * (1 - Math.exp(-row.score / SCALE_FACTOR))
              : 0;

          return (
            <div
              key={`${row.rank}-${row.name}`}
              className={`bar-row ${index < 3 ? `rank-${index + 1}` : ''}`}
            >
              <motion.div
                className="bar-fill"
                data-narrow={percentage < 30}
                variants={barVariants}
                initial="hidden"
                animate="visible"
                custom={`${percentage}%`}
                style={{ width: `${percentage}%` }}
              >
                <span className="bar-name">{row.name}</span>
                <span className="bar-value">
                  ${row.score.toLocaleString()} 🐎
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CallathonLeaderboard;
