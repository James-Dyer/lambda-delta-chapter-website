import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import CallathonLeaderboard from '../CallathonLeaderboard';
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
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    LayoutGroup: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

// Stub rAF so fake timers control it
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

let container;
let root;

beforeEach(() => {
  jest.useFakeTimers();

  // Stub canvas for minWidthPercent — use plain function so clearAllMocks doesn't reset it
  HTMLCanvasElement.prototype.getContext = () => ({
    measureText: (text) => ({ width: text.length * 10 }),
    font: '',
  });

  Object.defineProperty(window, 'innerHeight', {
    value: 1080,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, 'innerWidth', {
    value: 1920,
    writable: true,
    configurable: true,
  });

  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  useGoogleSheetsPolling.mockReturnValue({
    data: null,
    loading: true,
    error: null,
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
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

// ─── Loading state ────────────────────────────────────────────────────────────

describe('loading state', () => {
  test('shows .loading-container and .loading-spinner', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.loading-container')).not.toBeNull();
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });

  test('shows "Loading leaderboard..." text', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.textContent).toContain('Loading leaderboard...');
  });

  test('does not show .bars-container', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.bars-container')).toBeNull();
  });
});

// ─── Error state ──────────────────────────────────────────────────────────────

describe('error state', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: null,
      loading: false,
      error: 'Connection failed',
    });
  });

  test('shows .error-container', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.error-container')).not.toBeNull();
  });

  test('contains "Unable to load leaderboard"', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.textContent).toContain('Unable to load leaderboard');
  });

  test('does not show .loading-container or .bars-container', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.loading-container')).toBeNull();
    expect(container.querySelector('.bars-container')).toBeNull();
  });
});

// ─── Empty state ──────────────────────────────────────────────────────────────

describe('empty state', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
  });

  test('shows .empty-container with "No participants yet"', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.empty-container')).not.toBeNull();
    expect(container.textContent).toContain('No participants yet');
  });

  test('does not show .bars-container', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.bars-container')).toBeNull();
  });
});

// ─── Data rendering ───────────────────────────────────────────────────────────

describe('data rendering', () => {
  const makeRows = (entries) =>
    entries.map(([name, score], i) => ({ name, score, rank: i + 1 }));

  test('.bars-container present when data has rows', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: makeRows([['Alpha', 100]]), status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.bars-container')).not.toBeNull();
  });

  test('renders one .bar-row per entry', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: makeRows([['Alpha', 100], ['Beta', 80], ['Gamma', 60]]),
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelectorAll('.bar-row')).toHaveLength(3);
  });

  test('each .bar-name contains the org name', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: {
        rows: makeRows([['Alpha Chi', 100], ['Beta Sig', 80]]),
        status: 'ok',
        updatedAt: new Date(),
      },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const names = Array.from(container.querySelectorAll('.bar-name')).map(
      (el) => el.textContent
    );
    expect(names).toContain('Alpha Chi');
    expect(names).toContain('Beta Sig');
  });

  test('score displays with $ prefix and 🐎 emoji (score 500)', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'Alpha', score: 500, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const scoreEl =
      container.querySelector('.bar-value') ||
      container.querySelector('.bar-value-external');
    expect(scoreEl).not.toBeNull();
    expect(scoreEl.textContent).toContain('$');
    expect(scoreEl.textContent).toContain('500');
    expect(scoreEl.textContent).toContain('🐎');
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
    });
  });

  test('index 0 → rank-1 class', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const rows = container.querySelectorAll('.bar-row');
    expect(rows[0].classList.contains('rank-1')).toBe(true);
  });

  test('index 1 → rank-2 class', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const rows = container.querySelectorAll('.bar-row');
    expect(rows[1].classList.contains('rank-2')).toBe(true);
  });

  test('index 2 → rank-3 class', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const rows = container.querySelectorAll('.bar-row');
    expect(rows[2].classList.contains('rank-3')).toBe(true);
  });

  test('index >= 3 → no rank class', () => {
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const rows = container.querySelectorAll('.bar-row');
    expect(rows[3].classList.contains('rank-1')).toBe(false);
    expect(rows[3].classList.contains('rank-2')).toBe(false);
    expect(rows[3].classList.contains('rank-3')).toBe(false);
  });
});

// ─── --bar-height CSS variable ────────────────────────────────────────────────

describe('--bar-height CSS variable', () => {
  function makeNRows(n) {
    return Array.from({ length: n }, (_, i) => ({
      name: `Org ${i}`,
      score: 100 - i,
      rank: i + 1,
    }));
  }

  function getBarsContainerStyle() {
    return container.querySelector('.bars-container').style;
  }

  test('1 team at innerHeight=1080 → 96px (min(96, floor(984/1)))', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: makeNRows(1), status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(getBarsContainerStyle().getPropertyValue('--bar-height')).toBe('96px');
  });

  test('10 teams at innerHeight=1080 → 91px (min(96, floor(912/10)))', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: makeNRows(10), status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(getBarsContainerStyle().getPropertyValue('--bar-height')).toBe('91px');
  });

  test('5 teams at innerHeight=1080 → 96px (min(96, floor(952/5)))', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: makeNRows(5), status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(getBarsContainerStyle().getPropertyValue('--bar-height')).toBe('96px');
  });
});

// ─── Score change animation ───────────────────────────────────────────────────

describe('score change animation', () => {
  function getScoreEl() {
    return (
      container.querySelector('.bar-value') ||
      container.querySelector('.bar-value-external')
    );
  }

  test('first render: changedScores is empty → static animate', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'Alpha', score: 100, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    const el = getScoreEl();
    const animate = JSON.parse(el.getAttribute('data-animate'));
    // Static: scale is a single number, not an array
    expect(animate.scale).toBe(1);
  });

  test('re-render with changed score → pulse animation', () => {
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

    useGoogleSheetsPolling.mockReturnValue({ data: data1, loading: false, error: null });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });

    useGoogleSheetsPolling.mockReturnValue({ data: data2, loading: false, error: null });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });

    const el = getScoreEl();
    const animate = JSON.parse(el.getAttribute('data-animate'));
    expect(animate.scale).toEqual([1, 1.15, 1]);
    expect(animate.color).toContain('#ffd700');
  });

  test('re-render with unchanged score → static animate', () => {
    const sameData = {
      rows: [{ name: 'Alpha', score: 100, rank: 1 }],
      status: 'ok',
      updatedAt: new Date(),
    };

    useGoogleSheetsPolling.mockReturnValue({ data: sameData, loading: false, error: null });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });

    const el = getScoreEl();
    const animate = JSON.parse(el.getAttribute('data-animate'));
    expect(animate.scale).toBe(1);
  });

  test('only the changed org gets the pulse; others remain static', () => {
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

    useGoogleSheetsPolling.mockReturnValue({ data: data1, loading: false, error: null });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });

    useGoogleSheetsPolling.mockReturnValue({ data: data2, loading: false, error: null });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });

    const scoreEls = container.querySelectorAll('.bar-value, .bar-value-external');
    const animates = Array.from(scoreEls).map((el) =>
      JSON.parse(el.getAttribute('data-animate'))
    );

    // Alpha changed → pulse
    expect(animates[0].scale).toEqual([1, 1.15, 1]);
    // Beta unchanged → static
    expect(animates[1].scale).toBe(1);
  });
});

// ─── External vs internal score display ──────────────────────────────────────

describe('external vs internal score display', () => {
  test('score 0 → rawPercentage=0 → showPointsExternal=true → .bar-value-external present', () => {
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'Alpha', score: 0, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.bar-value-external')).not.toBeNull();
    expect(container.querySelector('.bar-fill .bar-value')).toBeNull();
  });

  test('high-score leader → bar is wide → .bar-fill .bar-value present', () => {
    // With k=1 (fake timers prevent rAF), tanh(500/1) ≈ 1, percentage ≈ 95 > minWidthPercent*1.3
    useGoogleSheetsPolling.mockReturnValue({
      data: { rows: [{ name: 'Alpha', score: 500, rank: 1 }], status: 'ok', updatedAt: new Date() },
      loading: false,
      error: null,
    });
    act(() => {
      root.render(<CallathonLeaderboard />);
    });
    expect(container.querySelector('.bar-fill .bar-value')).not.toBeNull();
    expect(container.querySelector('.bar-value-external')).toBeNull();
  });
});
