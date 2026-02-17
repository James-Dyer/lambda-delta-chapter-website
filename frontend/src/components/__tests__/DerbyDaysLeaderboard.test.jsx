import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import DerbyDaysLeaderboard from '../DerbyDaysLeaderboard';
import { useGoogleSheetsPolling } from '../../hooks/useGoogleSheetsPolling';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('../../hooks/useGoogleSheetsPolling', () => ({
  useGoogleSheetsPolling: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  const makeMotion = (tag) =>
    function MotionComponent({
      children,
      animate,
      initial,
      exit,
      variants,
      custom,
      layout,
      layoutId,
      transition,
      whileHover,
      whileTap,
      className,
      style,
      ...rest
    }) {
      return React.createElement(
        tag,
        {
          'data-animate':
            animate !== undefined ? JSON.stringify(animate) : undefined,
          className,
          style,
          ...rest,
        },
        children
      );
    };
  return {
    motion: { div: makeMotion('div'), span: makeMotion('span') },
    AnimatePresence: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    LayoutGroup: ({ children }) =>
      React.createElement(React.Fragment, null, children),
  };
});

jest.mock('../Footer', () => () => <footer data-testid="footer" />);

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  useGoogleSheetsPolling.mockReturnValue({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });
});

afterEach(() => {
  if (root) {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  }
  container = null;
  root = null;
  jest.clearAllMocks();
});

// ─── Loading state ────────────────────────────────────────────────────────────

describe('loading state', () => {
  test('shows .loading-container and .loading-spinner', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.loading-container')).not.toBeNull();
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });

  test('shows "Loading leaderboard..." text', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.textContent).toContain('Loading leaderboard...');
  });

  test('does not show .leaderboard-cards', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });
});

// ─── Error state ──────────────────────────────────────────────────────────────

describe('error state', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: null,
      loading: false,
      error: 'Connection refused',
      lastUpdated: null,
    });
  });

  test('shows .status-banner.error', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const banner = container.querySelector('.status-banner.error');
    expect(banner).not.toBeNull();
  });

  test('contains "Unable to load leaderboard"', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.textContent).toContain('Unable to load leaderboard');
  });

  test('does not show .leaderboard-cards', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });
});

// ─── Degraded state ───────────────────────────────────────────────────────────

describe('degraded state', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [{ name: 'Alpha', score: 100, rank: 1 }],
        status: 'degraded',
        error: 'Timeout',
        updatedAt: new Date(),
      },
      loading: false,
      error: 'Timeout',
      lastUpdated: new Date(),
    });
  });

  test('shows .status-banner.warning with "Data may be outdated"', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const banner = container.querySelector('.status-banner.warning');
    expect(banner).not.toBeNull();
    expect(banner.textContent).toContain('Data may be outdated');
  });

  test('still shows .leaderboard-cards (data preserved)', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.leaderboard-cards')).not.toBeNull();
  });

  test('does NOT show .status-banner.error (condition is error && !data)', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.status-banner.error')).toBeNull();
  });
});

// ─── Empty rows ───────────────────────────────────────────────────────────────

describe('empty rows', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
  });

  test('shows .empty-state with "No teams have been added yet."', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const emptyState = container.querySelector('.empty-state');
    expect(emptyState).not.toBeNull();
    expect(emptyState.textContent).toContain('No teams have been added yet.');
  });

  test('does not show .leaderboard-cards', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });
});

// ─── Data rendering ───────────────────────────────────────────────────────────

describe('data rendering', () => {
  const threeRows = [
    { name: 'Alpha Chi', score: 300, rank: 1 },
    { name: 'Beta Sig', score: 200, rank: 2 },
    { name: 'Gamma Phi', score: 100, rank: 3 },
  ];

  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: threeRows, status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
  });

  test('.leaderboard-cards present', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.leaderboard-cards')).not.toBeNull();
  });

  test('renders one .leaderboard-row per entry', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelectorAll('.leaderboard-row')).toHaveLength(3);
  });

  test('.team-name contains org name', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const names = Array.from(container.querySelectorAll('.team-name')).map(
      (el) => el.textContent
    );
    expect(names).toContain('Alpha Chi');
    expect(names).toContain('Beta Sig');
    expect(names).toContain('Gamma Phi');
  });

  test('.team-score contains score', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const scores = Array.from(container.querySelectorAll('.team-score')).map(
      (el) => el.textContent
    );
    expect(scores).toContain('300');
    expect(scores).toContain('200');
    expect(scores).toContain('100');
  });
});

// ─── Rank CSS classes ─────────────────────────────────────────────────────────

describe('rank CSS classes', () => {
  const fourRows = [
    { name: 'A', score: 400, rank: 1 },
    { name: 'B', score: 300, rank: 2 },
    { name: 'C', score: 200, rank: 3 },
    { name: 'D', score: 100, rank: 4 },
  ];

  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: fourRows, status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
  });

  test('index 0 → rank-1 class', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const rows = container.querySelectorAll('.leaderboard-row');
    expect(rows[0].classList.contains('rank-1')).toBe(true);
  });

  test('index 1 → rank-2 class', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const rows = container.querySelectorAll('.leaderboard-row');
    expect(rows[1].classList.contains('rank-2')).toBe(true);
  });

  test('index 2 → rank-3 class', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const rows = container.querySelectorAll('.leaderboard-row');
    expect(rows[2].classList.contains('rank-3')).toBe(true);
  });

  test('index >= 3 → no rank class', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const rows = container.querySelectorAll('.leaderboard-row');
    expect(rows[3].classList.contains('rank-1')).toBe(false);
    expect(rows[3].classList.contains('rank-2')).toBe(false);
    expect(rows[3].classList.contains('rank-3')).toBe(false);
  });
});

// ─── Medal display ────────────────────────────────────────────────────────────

describe('medal display', () => {
  test('rank: 1 → medal text is 🥇', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'A', score: 100, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const medal = container.querySelector('.medal');
    expect(medal).not.toBeNull();
    expect(medal.textContent).toBe('🥇');
  });

  test('rank: 2 → medal text is 🥈', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
        ],
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const medals = container.querySelectorAll('.medal');
    expect(medals[1].textContent).toBe('🥈');
  });

  test('rank: 3 → medal text is 🥉', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
          { name: 'C', score: 60, rank: 3 },
        ],
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const medals = container.querySelectorAll('.medal');
    expect(medals[2].textContent).toBe('🥉');
  });

  test('rank: 4 → .rank-number text is "4", no .medal', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
          { name: 'C', score: 60, rank: 3 },
          { name: 'D', score: 40, rank: 4 },
        ],
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const rankNumbers = container.querySelectorAll('.rank-number');
    expect(rankNumbers).toHaveLength(1);
    expect(rankNumbers[0].textContent).toBe('4');
    // Only 3 medals (rank 1, 2, 3)
    expect(container.querySelectorAll('.medal')).toHaveLength(3);
  });

  test('tied ranks: two entries with rank: 1 → two 🥇 medals', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 100, rank: 1 },
        ],
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const medals = container.querySelectorAll('.medal');
    expect(medals).toHaveLength(2);
    expect(medals[0].textContent).toBe('🥇');
    expect(medals[1].textContent).toBe('🥇');
  });
});

// ─── score-changed class ──────────────────────────────────────────────────────

describe('score-changed class', () => {
  test('not present on first render', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: [{ name: 'Alpha', score: 100, rank: 1 }],
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.score-changed')).toBeNull();
  });

  test('applied to the row whose score changed between renders', () => {
    const data1 = {
      rows: [{ name: 'Alpha', score: 100, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };
    const data2 = {
      rows: [{ name: 'Alpha', score: 150, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };

    useGoogleSheetsPolling.mockReturnValue({ data: data1, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    useGoogleSheetsPolling.mockReturnValue({ data: data2, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    expect(container.querySelector('.score-changed')).not.toBeNull();
  });

  test('NOT applied to rows whose score is unchanged', () => {
    const data1 = {
      rows: [
        { name: 'Alpha', score: 100, rank: 1 },
        { name: 'Beta', score: 80, rank: 2 },
      ],
      status: 'ok',
      updatedAt: new Date(),
    };
    const data2 = {
      rows: [
        { name: 'Alpha', score: 150, rank: 1 },
        { name: 'Beta', score: 80, rank: 2 },
      ],
      status: 'ok',
      updatedAt: new Date(),
    };

    useGoogleSheetsPolling.mockReturnValue({ data: data1, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    useGoogleSheetsPolling.mockReturnValue({ data: data2, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    const changedRows = container.querySelectorAll('.score-changed');
    expect(changedRows).toHaveLength(1);
    expect(changedRows[0].querySelector('.team-name').textContent).toBe('Alpha');
  });
});

// ─── Score change animation (data-animate) ────────────────────────────────────

describe('score change animation via data-animate', () => {
  test('unchanged score → data-animate parses to empty object {}', () => {
    const sameData = {
      rows: [{ name: 'Alpha', score: 100, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };

    useGoogleSheetsPolling.mockReturnValue({ data: sameData, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    const teamScore = container.querySelector('.team-score');
    const animate = JSON.parse(teamScore.getAttribute('data-animate'));
    expect(animate).toEqual({});
  });

  test('changed score → animate.scale=[1,1.2,1] and animate.backgroundColor includes rgba', () => {
    const data1 = {
      rows: [{ name: 'Alpha', score: 100, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };
    const data2 = {
      rows: [{ name: 'Alpha', score: 150, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };

    useGoogleSheetsPolling.mockReturnValue({ data: data1, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    useGoogleSheetsPolling.mockReturnValue({ data: data2, loading: false, error: null, lastUpdated: new Date() });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });

    const teamScore = container.querySelector('.team-score');
    const animate = JSON.parse(teamScore.getAttribute('data-animate'));
    expect(animate.scale).toEqual([1, 1.2, 1]);
    expect(animate.backgroundColor).toContain('rgba(97, 185, 239, 0.2)');
  });
});

// ─── formatTimestamp ──────────────────────────────────────────────────────────

describe('formatTimestamp via .dev-timestamp', () => {
  test('lastUpdated: null → text contains "Never"', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: null,
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('.dev-timestamp').textContent).toContain(
      'Never'
    );
  });

  test('lastUpdated: Date → text matches HH:MM:SS pattern', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(2026, 0, 1, 12, 34, 56),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    const text = container.querySelector('.dev-timestamp').textContent;
    expect(text).toMatch(/\d+:\d{2}:\d{2}/);
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

describe('footer', () => {
  test('footer is rendered in loading state', () => {
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('[data-testid="footer"]')).not.toBeNull();
  });

  test('footer is rendered when data is present', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'A', score: 100, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
      lastUpdated: new Date(),
    });
    act(() => {
      root.render(<DerbyDaysLeaderboard />);
    });
    expect(container.querySelector('[data-testid="footer"]')).not.toBeNull();
  });
});
