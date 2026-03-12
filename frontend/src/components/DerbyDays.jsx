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

        {/* Instagram Section */}
        <section
          className="instagram-strip"
          aria-label="Follow us on Instagram"
        >
          <p className="instagram-strip-label">Follow Along</p>
          <div className="instagram-cards">
            <a
              href="https://instagram.com/ucmsigmachi"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-card instagram-card--chapter"
              aria-label="Follow @ucmsigmachi on Instagram"
            >
              <div className="instagram-card-icon-wrap">
                <svg
                  className="instagram-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <div className="instagram-card-text">
                <span className="instagram-handle">@ucmsigmachi</span>
                <span className="instagram-cta">Sigma Chi UCM</span>
              </div>
              <span className="instagram-card-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              href="https://instagram.com/ucmsigmachi.derbydays"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-card instagram-card--derby"
              aria-label="Follow @ucmsigmachi.derbydays on Instagram"
            >
              <div className="instagram-card-icon-wrap">
                <svg
                  className="instagram-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <div className="instagram-card-text">
                <span className="instagram-handle">@ucmsigmachi.derbydays</span>
                <span className="instagram-cta">Derby Days Official</span>
              </div>
              <span className="instagram-card-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        {/* Philo Slides Section */}
        <section
          className="content-section schedule-section"
          data-testid="schedule-section"
        >
          <h2>Philo Slides</h2>
          <div className="canva-embed-container">
            <iframe
              loading="lazy"
              src="https://www.canva.com/design/DAHDtGLlisw/HvWi_b51LZlLCVPrKp70Ig/view?embed"
              allowFullScreen
              allow="fullscreen"
              title="Derby Days 2026 Schedule"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DerbyDays;
