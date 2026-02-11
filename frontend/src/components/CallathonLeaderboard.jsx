/**
 * Call-a-thon Leaderboard Component
 * Displays leaderboard data as horizontal bar chart
 */

import React from 'react';
import { usePolling } from '../hooks/usePolling';
import Footer from './Footer';
import '../styles/callathonLeaderboard.css';

const CallathonLeaderboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const { data, loading, error, lastUpdated } = usePolling(
    `${apiUrl}/api/leaderboard/callathon`,
    3000
  );

  // Format last updated timestamp
  const formatTimestamp = (date) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Calculate max score for bar chart scaling
  const maxScore = data?.rows?.length > 0
    ? Math.max(...data.rows.map((row) => row.score))
    : 0;

  return (
    <div className="callathon-wrapper">
      <div className="callathon-page">
        {/* Header Section */}
        <header className="leaderboard-header">
          <h1>Call-a-thon 2026 Leaderboard</h1>
          <p className="leaderboard-subtitle">Live Fundraising Progress</p>
        </header>

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

        {/* Leaderboard Bar Chart */}
        {data && (
          <div className="leaderboard-content">
            <div className="leaderboard-meta">
              <span className="last-updated">
                Last updated: {formatTimestamp(lastUpdated)}
              </span>
              <span className="row-count">
                {data.rows.length}{' '}
                {data.rows.length === 1 ? 'participant' : 'participants'}
              </span>
            </div>

            {data.rows.length > 0 ? (
              <div className="bar-chart-container">
                {data.rows.map((row, index) => {
                  const percentage =
                    maxScore > 0 ? (row.score / maxScore) * 100 : 0;

                  return (
                    <div
                      key={`${row.rank}-${row.name}`}
                      className={`bar-item ${index < 3 ? `rank-${index + 1}` : ''}`}
                    >
                      <div className="bar-label">
                        <span className="bar-rank">
                          {row.rank === 1 && '🥇'}
                          {row.rank === 2 && '🥈'}
                          {row.rank === 3 && '🥉'}
                          {row.rank > 3 && `${row.rank}.`}
                        </span>
                        <span className="bar-name">{row.name}</span>
                      </div>
                      <div className="bar-visualization">
                        <div
                          className="bar-fill"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="bar-score">${row.score.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>No participants have been added yet.</p>
                <p className="empty-state-subtitle">
                  Check back soon for live fundraising progress!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CallathonLeaderboard;
