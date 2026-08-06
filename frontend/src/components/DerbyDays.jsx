/**
 * Derby Days Page
 * Dual leaderboard (social + professional orgs) with event content sections
 */

import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  derbyDaysProfessional,
  derbyDaysSocial,
  SNAPSHOT_LABEL,
} from '../Data/archiveSnapshot';
import Footer from './Footer';
import '../styles/DerbyDays.css';
import derbyDaysSchedule from '../assets/images/philanthropy/Derby-Days-2026.jpg';

const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
};

// Set to true to hide point totals near the end of competition
const SCORES_HIDDEN = false;

const HiddenScoresBanner = () => (
  <div className="hidden-scores-banner" role="status">
    Point totals are hidden. Find out who won at the Black &amp; White Formal at
    Joystiq on Saturday!
  </div>
);

const LeaderboardPanel = ({ title, rows, scoresHidden }) => (
  <div className="leaderboard-panel">
    <h2 className="panel-title">{title}</h2>
    <div className="leaderboard-cards">
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {rows.map((row, index) => (
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
              }`}
            >
              <div className="rank-display">
                {row.rank === 1 && <span className="medal">🥇</span>}
                {row.rank === 2 && <span className="medal">🥈</span>}
                {row.rank === 3 && <span className="medal">🥉</span>}
                {row.rank > 3 && (
                  <span className="rank-number">{row.rank}</span>
                )}
              </div>
              <div className="team-name">{scoresHidden ? '???' : row.name}</div>
              {!scoresHidden && (
                <motion.div className="team-score">{row.score}</motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  </div>
);

LeaderboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      rank: PropTypes.number.isRequired,
    })
  ).isRequired,
  scoresHidden: PropTypes.bool,
};

const DerbyDays = () => {
  return (
    <div className="derby-days-wrapper">
      <div className="derby-days-page">
        {/* Leaderboard Section */}
        <div className="leaderboard-hero">
          <div className="leaderboard-hero-overlay">
            {SCORES_HIDDEN && <HiddenScoresBanner />}
            <div className="leaderboard-snapshot-label">
              <span className="snapshot-label">{SNAPSHOT_LABEL}</span>
            </div>
            <div className="leaderboard-section">
              <LeaderboardPanel
                title="Social Organizations"
                rows={derbyDaysSocial}
                scoresHidden={SCORES_HIDDEN}
              />
              <LeaderboardPanel
                title="Professional Organizations"
                rows={derbyDaysProfessional}
                scoresHidden={SCORES_HIDDEN}
              />
            </div>
          </div>
        </div>

        {/* Instagram Section */}
        <section
          className="instagram-strip"
          aria-label="Follow us on Instagram"
        >
          <p className="instagram-strip-label">Stay Updated</p>
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
                <span className="instagram-cta">UCM Chapter Instagram</span>
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
                <span className="instagram-cta">Derby Days Instagram</span>
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
            <img
              loading="lazy"
              src={derbyDaysSchedule}
              alt="Sigma Chi Derby Days 2026, March 30 through April 4"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DerbyDays;
