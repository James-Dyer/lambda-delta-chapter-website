/**
 * Derby Days Leaderboard Component
 * Displays leaderboard data in a table format
 */

import React from 'react';
import { useGoogleSheetsPolling } from '../hooks/useGoogleSheetsPolling';
import Footer from './Footer';
import '../styles/derbyDaysLeaderboard.css';

const DerbyDaysLeaderboard = () => {
  const range = process.env.REACT_APP_SHEET_RANGE_DERBY_DAYS || 'DerbyDays!A1:B100';
  const { data, loading, error, lastUpdated } = useGoogleSheetsPolling(
    range,
    30000 // Poll every 30 seconds for Derby Days
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

  return (
    <div className="derby-days-wrapper">
      <div className="derby-days-page">
        {/* Header Section */}
        <header className="leaderboard-header">
          <h1>Derby Days 2026 Leaderboard</h1>
          <p className="leaderboard-subtitle">Live Competition Standings</p>
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

        {/* Leaderboard Table */}
        {data && (
          <div className="leaderboard-content">
            <div className="leaderboard-meta">
              <span className="last-updated">
                Last updated: {formatTimestamp(lastUpdated)}
              </span>
              <span className="row-count">
                {data.rows.length} {data.rows.length === 1 ? 'team' : 'teams'}
              </span>
            </div>

            {data.rows.length > 0 ? (
              <div className="table-container">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th className="rank-column">Rank</th>
                      <th className="name-column">Team Name</th>
                      <th className="score-column">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, index) => (
                      <tr
                        key={`${row.rank}-${row.name}`}
                        className={index < 3 ? `rank-${index + 1}` : ''}
                      >
                        <td className="rank-column">
                          {row.rank === 1 && '🥇'}
                          {row.rank === 2 && '🥈'}
                          {row.rank === 3 && '🥉'}
                          {row.rank > 3 && row.rank}
                        </td>
                        <td className="name-column">{row.name}</td>
                        <td className="score-column">{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DerbyDaysLeaderboard;
