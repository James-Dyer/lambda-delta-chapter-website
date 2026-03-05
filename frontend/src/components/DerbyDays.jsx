/**
 * Derby Days Page
 * Dual leaderboard (social + professional orgs) with event content sections
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useGoogleSheetsPolling } from '../hooks/useGoogleSheetsPolling';
import { usePrevious } from '../hooks/usePrevious';
import Footer from './Footer';
import '../styles/DerbyDays.css';

const SKELETON_ROW_COUNT = 5;

const SkeletonRow = () => (
  <div className="leaderboard-row skeleton-row" aria-hidden="true">
    <div className="skeleton skeleton-rank" />
    <div className="skeleton skeleton-name" />
    <div className="skeleton skeleton-score" />
  </div>
);

const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

const LeaderboardPanel = ({ title, data, loading, error, changedScores }) => (
  <div className="leaderboard-panel">
    <h2 className="panel-title">{title}</h2>

    {data?.status === 'degraded' && (
      <div className="status-banner warning">
        ⚠️ Data may be outdated - experiencing connectivity issues
        {data.error && <div className="status-error">{data.error}</div>}
      </div>
    )}

    {error && !data && (
      <div className="status-banner error">
        ❌ Unable to load leaderboard: {error}
      </div>
    )}

    {loading && !data && (
      <div className="skeleton-cards" aria-label="Loading leaderboard">
        {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    )}

    {data &&
      (data.rows.length > 0 ? (
        <div className="leaderboard-cards">
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {data.rows.map((row, index) => (
                <motion.div
                  key={row.name}
                  layoutId={`${title}-${row.name}`}
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
                    {row.rank === 1 && <span className="medal">🥇</span>}
                    {row.rank === 2 && <span className="medal">🥈</span>}
                    {row.rank === 3 && <span className="medal">🥉</span>}
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
      ))}
  </div>
);

LeaderboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
      })
    ).isRequired,
    status: PropTypes.string,
    error: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  changedScores: PropTypes.instanceOf(Set).isRequired,
};

const DerbyDays = () => {
  const socialRange =
    process.env.REACT_APP_SHEET_RANGE_DERBY_DAYS_SOCIAL ||
    'Total Points!A1:B100';
  const proRange =
    process.env.REACT_APP_SHEET_RANGE_DERBY_DAYS_PROFESSIONAL ||
    'Total Points!D1:E100';

  const {
    data: socialData,
    loading: socialLoading,
    error: socialError,
  } = useGoogleSheetsPolling(socialRange, 30000);

  const {
    data: proData,
    loading: proLoading,
    error: proError,
  } = useGoogleSheetsPolling(proRange, 30000, { scoreColumnIndex: 1 });

  const previousSocialData = usePrevious(socialData?.rows);
  const previousProData = usePrevious(proData?.rows);

  const socialChangedScores = useMemo(() => {
    if (!previousSocialData || !socialData?.rows) return new Set();
    const changed = new Set();
    socialData.rows.forEach((row) => {
      const prev = previousSocialData.find((p) => p.name === row.name);
      if (prev && prev.score !== row.score) changed.add(row.name);
    });
    return changed;
  }, [previousSocialData, socialData?.rows]);

  const proChangedScores = useMemo(() => {
    if (!previousProData || !proData?.rows) return new Set();
    const changed = new Set();
    proData.rows.forEach((row) => {
      const prev = previousProData.find((p) => p.name === row.name);
      if (prev && prev.score !== row.score) changed.add(row.name);
    });
    return changed;
  }, [previousProData, proData?.rows]);

  return (
    <div className="derby-days-wrapper">
      <div className="derby-days-page">
        {/* Leaderboard Section */}
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

            <div className="leaderboard-section">
              <LeaderboardPanel
                title="Social Organizations"
                data={socialData}
                loading={socialLoading}
                error={socialError}
                changedScores={socialChangedScores}
              />
              <LeaderboardPanel
                title="Professional Organizations"
                data={proData}
                loading={proLoading}
                error={proError}
                changedScores={proChangedScores}
              />
            </div>
          </div>
        </div>

        {/* Event Overview Section */}
        <motion.div
          className="event-info-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          data-testid="event-overview-section"
        >
          <div className="event-description">
            <h2>About Derby Days</h2>
            <p>
              Derby Days is our annual week-long philanthropy event bringing
              together fraternities and sororities in friendly competition while
              raising funds for our partnered charities. Teams compete in
              various athletic and social events, earning points for their
              performance and fundraising efforts.
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
              <p>Campus Quad &amp; Recreation Center</p>
              <p className="detail-subtitle">Various locations across campus</p>
            </div>
            <div className="detail-card">
              <h3>🎯 Events</h3>
              <p>
                Athletic competitions, trivia, fundraising challenges, and more
              </p>
              <p className="detail-subtitle">Points awarded for each event</p>
            </div>
          </div>
        </motion.div>

        {/* Images Section */}
        <section
          className="content-section images-section"
          data-testid="images-section"
        >
          <h2>Event Photos</h2>
          <div className="placeholder-block">
            <p>Photos coming soon</p>
          </div>
        </section>

        {/* YouTube Embed Section */}
        <section
          className="content-section video-section"
          data-testid="video-section"
        >
          <h2>Highlights</h2>
          <div className="placeholder-block">
            <p>Video highlights coming soon</p>
          </div>
        </section>

        {/* Schedule of Events Section */}
        <section
          className="content-section schedule-section"
          data-testid="schedule-section"
        >
          <h2>Schedule of Events</h2>
          <div className="placeholder-block">
            <p>Schedule coming soon</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DerbyDays;
