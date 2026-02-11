/**
 * Derby Days Leaderboard Component
 * Displays leaderboard data with hero layout and animations
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useGoogleSheetsPolling } from '../hooks/useGoogleSheetsPolling';
import { usePrevious } from '../hooks/usePrevious';
import Footer from './Footer';
import '../styles/derbyDaysLeaderboard.css';

const DerbyDaysLeaderboard = () => {
  const range =
    process.env.REACT_APP_SHEET_RANGE_DERBY_DAYS || 'DerbyDays!A1:B100';
  const { data, loading, error, lastUpdated } = useGoogleSheetsPolling(
    range,
    30000 // Poll every 30 seconds for Derby Days
  );

  // Track previous data for change detection
  const previousData = usePrevious(data?.rows);

  // Format last updated timestamp
  const formatTimestamp = (date) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Detect score changes for animation triggers
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

  // Animation variants
  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="derby-days-wrapper">
      <div className="derby-days-page">
        {/* Status Banner */}
        {data?.status === 'degraded' && (
          <div className="status-banner warning">
            ⚠️ Data may be outdated - experiencing connectivity issues
            {data.error && <div className="status-error">{data.error}</div>}
          </div>
        )}

        {/* Error Banner */}
        {error && !data && (
          <div className="status-banner error">
            ❌ Unable to load leaderboard: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && !data && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        )}

        {/* Hero Leaderboard Section */}
        {data && (
          <>
            <div className="leaderboard-hero">
              <div className="leaderboard-hero-overlay">
                <motion.div
                  className="leaderboard-hero-title"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1>Derby Days 2026 Leaderboard</h1>
                </motion.div>

                {/* Dev-only timestamp */}
                <div className="dev-timestamp">
                  Updated: {formatTimestamp(lastUpdated)}
                </div>

                {data.rows.length > 0 ? (
                  <div className="leaderboard-cards">
                    <LayoutGroup>
                      <AnimatePresence mode="popLayout">
                        {data.rows.map((row, index) => (
                          <motion.div
                            key={row.name}
                            layoutId={row.name}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={index}
                            className={`leaderboard-row ${
                              index === 0
                                ? 'rank-1'
                                : index === 1
                                  ? 'rank-2'
                                  : index === 2
                                    ? 'rank-3'
                                    : ''
                            } ${changedScores.has(row.name) ? 'score-changed' : ''}`}
                          >
                            <div className="rank-display">
                              {row.rank === 1 && (
                                <span className="medal">🥇</span>
                              )}
                              {row.rank === 2 && (
                                <span className="medal">🥈</span>
                              )}
                              {row.rank === 3 && (
                                <span className="medal">🥉</span>
                              )}
                              {row.rank > 3 && (
                                <span className="rank-number">{row.rank}</span>
                              )}
                            </div>
                            <div className="team-name">{row.name}</div>
                            <motion.div
                              className="team-score"
                              animate={
                                changedScores.has(row.name)
                                  ? {
                                      scale: [1, 1.2, 1],
                                      backgroundColor: [
                                        'transparent',
                                        'rgba(97, 185, 239, 0.2)',
                                        'transparent',
                                      ],
                                    }
                                  : {}
                              }
                              transition={{ duration: 0.6 }}
                            >
                              {row.score}
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </LayoutGroup>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No teams have been added yet.</p>
                    <p className="empty-state-subtitle">
                      Check back soon for live standings!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Information Section */}
            <motion.div
              className="event-info-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="event-description">
                <h2>About Derby Days</h2>
                <p>
                  Derby Days is our annual week-long philanthropy event bringing
                  together fraternities and sororities in friendly competition
                  while raising funds for our partnered charities. Teams compete
                  in various athletic and social events, earning points for
                  their performance and fundraising efforts.
                </p>
              </div>

              <div className="event-details">
                <div className="detail-card">
                  <h3>📅 When</h3>
                  <p>Spring 2026</p>
                  <p className="detail-subtitle">
                    Week-long event with daily competitions
                  </p>
                </div>
                <div className="detail-card">
                  <h3>📍 Where</h3>
                  <p>Campus Quad & Recreation Center</p>
                  <p className="detail-subtitle">
                    Various locations across campus
                  </p>
                </div>
                <div className="detail-card">
                  <h3>🎯 Events</h3>
                  <p>
                    Athletic competitions, trivia, fundraising challenges, and
                    more
                  </p>
                  <p className="detail-subtitle">
                    Points awarded for each event
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DerbyDaysLeaderboard;
