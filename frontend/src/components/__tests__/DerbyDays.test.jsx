/* eslint-disable react/prop-types */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import DerbyDays from '../DerbyDays';
import { useGoogleSheetsPolling } from '../../hooks/useGoogleSheetsPolling';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

jest.mock('../../hooks/useGoogleSheetsPolling', () => ({
  useGoogleSheetsPolling: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const React = require('react');
  const FRAMER_ONLY_PROPS = new Set([
    'initial',
    'exit',
    'custom',
    'layoutId',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
  ]);
  const makeMotion = (tag) =>
    function MotionComponent({ children, animate, className, style, ...rest }) {
      const htmlRest = Object.fromEntries(
        Object.entries(rest).filter(([k]) => !FRAMER_ONLY_PROPS.has(k))
      );
      return React.createElement(
        tag,
        {
          'data-animate':
            animate !== undefined ? JSON.stringify(animate) : undefined,
          className,
          style,
          ...htmlRest,
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

jest.mock(
  '../Footer',
  () =>
    function Footer() {
      return <footer data-testid="footer" />;
    }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LOADING = { data: null, loading: true, error: null, lastUpdated: null };
const OK_EMPTY = {
  data: { rows: [], status: 'ok', updatedAt: new Date() },
  loading: false,
  error: null,
  lastUpdated: new Date(),
};

const makeOk = (rows) => ({
  data: { rows, status: 'ok', updatedAt: new Date() },
  loading: false,
  error: null,
  lastUpdated: new Date(),
});

const makeError = (msg) => ({
  data: null,
  loading: false,
  error: msg,
  lastUpdated: null,
});

const makeDegraded = (rows, errMsg) => ({
  data: { rows, status: 'degraded', error: errMsg, updatedAt: new Date() },
  loading: false,
  error: errMsg,
  lastUpdated: new Date(),
});

// Find a leaderboard panel by its title text
const findPanel = (container, titleText) =>
  Array.from(container.querySelectorAll('.leaderboard-panel')).find((p) =>
    p.querySelector('.panel-title')?.textContent.includes(titleText)
  );

// ─── Setup / teardown ─────────────────────────────────────────────────────────

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);

  // Both panels loading by default
  useGoogleSheetsPolling.mockReturnValue(LOADING);
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

// ─── Loading state ─────────────────────────────────────────────────────────────

describe('loading state', () => {
  test('both panels show skeleton rows', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelectorAll('.skeleton-row')).toHaveLength(10); // 5 per panel
  });

  test('each panel shows 5 skeleton rows', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const panels = container.querySelectorAll('.leaderboard-panel');
    panels.forEach((panel) => {
      expect(panel.querySelectorAll('.skeleton-row')).toHaveLength(5);
    });
  });

  test('skeleton rows contain rank, name, and score placeholders', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const firstSkeleton = container.querySelector('.skeleton-row');
    expect(firstSkeleton.querySelector('.skeleton-rank')).not.toBeNull();
    expect(firstSkeleton.querySelector('.skeleton-name')).not.toBeNull();
    expect(firstSkeleton.querySelector('.skeleton-score')).not.toBeNull();
  });

  test('does not show .leaderboard-cards when loading', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });

  test('social loading does not block professional panel', () => {
    const proRows = [{ name: 'Sigma Chi', score: 200, rank: 1 }];
    useGoogleSheetsPolling
      .mockReturnValueOnce(LOADING) // social
      .mockReturnValue(makeOk(proRows)); // professional

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const proPanel = findPanel(container, 'Professional');

    expect(socialPanel.querySelector('.skeleton-row')).not.toBeNull();
    expect(proPanel.querySelector('.leaderboard-cards')).not.toBeNull();
    expect(proPanel.querySelector('.skeleton-row')).toBeNull();
  });

  test('professional loading does not block social panel', () => {
    const socialRows = [{ name: 'Alpha Chi', score: 300, rank: 1 }];
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk(socialRows)) // social
      .mockReturnValue(LOADING); // professional

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const proPanel = findPanel(container, 'Professional');

    expect(socialPanel.querySelector('.leaderboard-cards')).not.toBeNull();
    expect(socialPanel.querySelector('.skeleton-row')).toBeNull();
    expect(proPanel.querySelector('.skeleton-row')).not.toBeNull();
  });
});

// ─── Error state ──────────────────────────────────────────────────────────────

describe('error state', () => {
  test('both panels show error banner when both error', () => {
    useGoogleSheetsPolling.mockReturnValue(makeError('Connection refused'));

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.querySelectorAll('.status-banner.error')).toHaveLength(2);
  });

  test('contains "Unable to load leaderboard" text', () => {
    useGoogleSheetsPolling.mockReturnValue(makeError('Connection refused'));

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.textContent).toContain('Unable to load leaderboard');
  });

  test('does not show .leaderboard-cards on error', () => {
    useGoogleSheetsPolling.mockReturnValue(makeError('Connection refused'));

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });

  test('social error shows error only in social panel; professional unaffected', () => {
    const proRows = [{ name: 'Sigma Chi', score: 200, rank: 1 }];
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeError('Social error')) // social
      .mockReturnValue(makeOk(proRows)); // professional

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const proPanel = findPanel(container, 'Professional');

    expect(socialPanel.querySelector('.status-banner.error')).not.toBeNull();
    expect(proPanel.querySelector('.status-banner.error')).toBeNull();
    expect(proPanel.querySelector('.leaderboard-cards')).not.toBeNull();
  });

  test('professional error shows error only in professional panel; social unaffected', () => {
    const socialRows = [{ name: 'Alpha Chi', score: 300, rank: 1 }];
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk(socialRows)) // social
      .mockReturnValue(makeError('Pro error')); // professional

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const proPanel = findPanel(container, 'Professional');

    expect(socialPanel.querySelector('.status-banner.error')).toBeNull();
    expect(socialPanel.querySelector('.leaderboard-cards')).not.toBeNull();
    expect(proPanel.querySelector('.status-banner.error')).not.toBeNull();
  });
});

// ─── Degraded state ───────────────────────────────────────────────────────────

describe('degraded state', () => {
  const rows = [{ name: 'Alpha', score: 100, rank: 1 }];

  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue(makeDegraded(rows, 'Timeout'));
  });

  test('shows .status-banner.warning with "Data may be outdated"', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const banners = container.querySelectorAll('.status-banner.warning');
    expect(banners.length).toBeGreaterThan(0);
    expect(banners[0].textContent).toContain('Data may be outdated');
  });

  test('still shows .leaderboard-cards (stale data preserved)', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelector('.leaderboard-cards')).not.toBeNull();
  });

  test('does NOT show .status-banner.error (condition is error && !data)', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelector('.status-banner.error')).toBeNull();
  });
});

// ─── Empty rows ───────────────────────────────────────────────────────────────

describe('empty rows', () => {
  test('shows .empty-state with "No teams have been added yet." in both panels', () => {
    useGoogleSheetsPolling.mockReturnValue(OK_EMPTY);

    act(() => {
      root.render(<DerbyDays />);
    });

    const emptyStates = container.querySelectorAll('.empty-state');
    expect(emptyStates).toHaveLength(2);
    expect(emptyStates[0].textContent).toContain(
      'No teams have been added yet.'
    );
  });

  test('does not show .leaderboard-cards when rows are empty', () => {
    useGoogleSheetsPolling.mockReturnValue(OK_EMPTY);

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.querySelector('.leaderboard-cards')).toBeNull();
  });
});

// ─── Dual leaderboard data rendering ──────────────────────────────────────────

describe('dual leaderboard data rendering', () => {
  const socialRows = [
    { name: 'Alpha Chi', score: 300, rank: 1 },
    { name: 'Beta Sig', score: 200, rank: 2 },
  ];
  const proRows = [
    { name: 'Sigma Chi', score: 500, rank: 1 },
    { name: 'Delta Phi', score: 400, rank: 2 },
  ];

  beforeEach(() => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk(socialRows))
      .mockReturnValue(makeOk(proRows));
  });

  test('both panels render .leaderboard-cards', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelectorAll('.leaderboard-cards')).toHaveLength(2);
  });

  test('social panel shows social org names', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const names = Array.from(socialPanel.querySelectorAll('.team-name')).map(
      (el) => el.textContent
    );
    expect(names).toContain('Alpha Chi');
    expect(names).toContain('Beta Sig');
    expect(names).not.toContain('Sigma Chi');
  });

  test('professional panel shows professional org names', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const proPanel = findPanel(container, 'Professional');
    const names = Array.from(proPanel.querySelectorAll('.team-name')).map(
      (el) => el.textContent
    );
    expect(names).toContain('Sigma Chi');
    expect(names).toContain('Delta Phi');
    expect(names).not.toContain('Alpha Chi');
  });

  test('social panel shows correct scores', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const scores = Array.from(socialPanel.querySelectorAll('.team-score')).map(
      (el) => el.textContent
    );
    expect(scores).toContain('300');
    expect(scores).toContain('200');
  });

  test('professional panel shows correct scores', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const proPanel = findPanel(container, 'Professional');
    const scores = Array.from(proPanel.querySelectorAll('.team-score')).map(
      (el) => el.textContent
    );
    expect(scores).toContain('500');
    expect(scores).toContain('400');
  });

  test('renders correct number of rows per panel', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const proPanel = findPanel(container, 'Professional');
    expect(socialPanel.querySelectorAll('.leaderboard-row')).toHaveLength(2);
    expect(proPanel.querySelectorAll('.leaderboard-row')).toHaveLength(2);
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
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk(fourRows))
      .mockReturnValue(makeOk(fourRows));
  });

  test('index 0 → rank-1 class', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const rows = socialPanel.querySelectorAll('.leaderboard-row');
    expect(rows[0].classList.contains('rank-1')).toBe(true);
  });

  test('index 1 → rank-2 class', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const rows = socialPanel.querySelectorAll('.leaderboard-row');
    expect(rows[1].classList.contains('rank-2')).toBe(true);
  });

  test('index 2 → rank-3 class', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const rows = socialPanel.querySelectorAll('.leaderboard-row');
    expect(rows[2].classList.contains('rank-3')).toBe(true);
  });

  test('index >= 3 → no rank class', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const socialPanel = findPanel(container, 'Social');
    const rows = socialPanel.querySelectorAll('.leaderboard-row');
    expect(rows[3].classList.contains('rank-1')).toBe(false);
    expect(rows[3].classList.contains('rank-2')).toBe(false);
    expect(rows[3].classList.contains('rank-3')).toBe(false);
  });
});

// ─── Medal display ────────────────────────────────────────────────────────────

describe('medal display', () => {
  test('rank: 1 → medal text is 🥇', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk([{ name: 'A', score: 100, rank: 1 }]))
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const medal = socialPanel.querySelector('.medal');
    expect(medal).not.toBeNull();
    expect(medal.textContent).toBe('🥇');
  });

  test('rank: 2 → medal text is 🥈', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(
        makeOk([
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
        ])
      )
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const medals = socialPanel.querySelectorAll('.medal');
    expect(medals[1].textContent).toBe('🥈');
  });

  test('rank: 3 → medal text is 🥉', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(
        makeOk([
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
          { name: 'C', score: 60, rank: 3 },
        ])
      )
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const medals = socialPanel.querySelectorAll('.medal');
    expect(medals[2].textContent).toBe('🥉');
  });

  test('rank: 4 → .rank-number text is "4", no .medal', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(
        makeOk([
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 80, rank: 2 },
          { name: 'C', score: 60, rank: 3 },
          { name: 'D', score: 40, rank: 4 },
        ])
      )
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const rankNumbers = socialPanel.querySelectorAll('.rank-number');
    expect(rankNumbers).toHaveLength(1);
    expect(rankNumbers[0].textContent).toBe('4');
    expect(socialPanel.querySelectorAll('.medal')).toHaveLength(3);
  });

  test('tied ranks: two entries with rank: 1 → two 🥇 medals', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(
        makeOk([
          { name: 'A', score: 100, rank: 1 },
          { name: 'B', score: 100, rank: 1 },
        ])
      )
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const medals = socialPanel.querySelectorAll('.medal');
    expect(medals).toHaveLength(2);
    expect(medals[0].textContent).toBe('🥇');
    expect(medals[1].textContent).toBe('🥇');
  });
});

// ─── score-changed class ──────────────────────────────────────────────────────

describe('score-changed class', () => {
  test('not present on first render', () => {
    useGoogleSheetsPolling
      .mockReturnValueOnce(makeOk([{ name: 'Alpha', score: 100, rank: 1 }]))
      .mockReturnValue(makeOk([]));

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.querySelector('.score-changed')).toBeNull();
  });

  test('applied to social row whose score changed between renders', () => {
    const social1 = makeOk([{ name: 'Alpha', score: 100, rank: 1 }]);
    const social2 = makeOk([{ name: 'Alpha', score: 150, rank: 1 }]);
    const pro = makeOk([]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(social1) // render 1: social
      .mockReturnValueOnce(pro) // render 1: pro
      .mockReturnValueOnce(social2) // render 2: social
      .mockReturnValue(pro); // render 2: pro

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    expect(socialPanel.querySelector('.score-changed')).not.toBeNull();
  });

  test('applied to professional row whose score changed between renders', () => {
    const social = makeOk([]);
    const pro1 = makeOk([{ name: 'Sigma Chi', score: 200, rank: 1 }]);
    const pro2 = makeOk([{ name: 'Sigma Chi', score: 300, rank: 1 }]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(social) // render 1: social
      .mockReturnValueOnce(pro1) // render 1: pro
      .mockReturnValueOnce(social) // render 2: social
      .mockReturnValue(pro2); // render 2: pro

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const proPanel = findPanel(container, 'Professional');
    expect(proPanel.querySelector('.score-changed')).not.toBeNull();
  });

  test('score change in social panel does not trigger pulse in professional panel', () => {
    const social1 = makeOk([{ name: 'Alpha', score: 100, rank: 1 }]);
    const social2 = makeOk([{ name: 'Alpha', score: 200, rank: 1 }]);
    const pro = makeOk([{ name: 'Sigma Chi', score: 300, rank: 1 }]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(social1) // render 1: social
      .mockReturnValueOnce(pro) // render 1: pro
      .mockReturnValueOnce(social2) // render 2: social
      .mockReturnValue(pro); // render 2: pro

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const proPanel = findPanel(container, 'Professional');
    expect(proPanel.querySelector('.score-changed')).toBeNull();
  });

  test('NOT applied to rows whose score is unchanged', () => {
    const social1 = makeOk([
      { name: 'Alpha', score: 100, rank: 1 },
      { name: 'Beta', score: 80, rank: 2 },
    ]);
    const social2 = makeOk([
      { name: 'Alpha', score: 150, rank: 1 },
      { name: 'Beta', score: 80, rank: 2 },
    ]);
    const pro = makeOk([]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(social1)
      .mockReturnValueOnce(pro)
      .mockReturnValueOnce(social2)
      .mockReturnValue(pro);

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const changedRows = socialPanel.querySelectorAll('.score-changed');
    expect(changedRows).toHaveLength(1);
    expect(changedRows[0].querySelector('.team-name').textContent).toBe(
      'Alpha'
    );
  });
});

// ─── Score change animation (data-animate) ────────────────────────────────────

describe('score change animation via data-animate', () => {
  test('unchanged score → data-animate parses to empty object {}', () => {
    const data = makeOk([{ name: 'Alpha', score: 100, rank: 1 }]);
    const pro = makeOk([]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(data)
      .mockReturnValueOnce(pro)
      .mockReturnValueOnce(data)
      .mockReturnValue(pro);

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const teamScore = socialPanel.querySelector('.team-score');
    const animate = JSON.parse(teamScore.getAttribute('data-animate'));
    expect(animate).toEqual({});
  });

  test('changed score → animate.scale=[1,1.2,1] and animate.backgroundColor includes rgba', () => {
    const social1 = makeOk([{ name: 'Alpha', score: 100, rank: 1 }]);
    const social2 = makeOk([{ name: 'Alpha', score: 150, rank: 1 }]);
    const pro = makeOk([]);

    useGoogleSheetsPolling
      .mockReturnValueOnce(social1)
      .mockReturnValueOnce(pro)
      .mockReturnValueOnce(social2)
      .mockReturnValue(pro);

    act(() => {
      root.render(<DerbyDays />);
    });
    act(() => {
      root.render(<DerbyDays />);
    });

    const socialPanel = findPanel(container, 'Social');
    const teamScore = socialPanel.querySelector('.team-score');
    const animate = JSON.parse(teamScore.getAttribute('data-animate'));
    expect(animate.scale).toEqual([1, 1.2, 1]);
    expect(animate.backgroundColor).toContain('rgba(97, 185, 239, 0.2)');
  });
});

// ─── Content sections ─────────────────────────────────────────────────────────

describe('content sections', () => {
  beforeEach(() => {
    useGoogleSheetsPolling.mockReturnValue(LOADING);
  });

  test('schedule section renders', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(
      container.querySelector('[data-testid="schedule-section"]')
    ).not.toBeNull();
  });

  test('schedule section contains "Philo Slides" heading', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const section = container.querySelector('[data-testid="schedule-section"]');
    expect(section.textContent).toContain('Philo Slides');
  });

  test('instagram strip renders with both handles', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const strip = container.querySelector('.instagram-strip');
    expect(strip).not.toBeNull();
    expect(strip.textContent).toContain('@ucmsigmachi');
    expect(strip.textContent).toContain('@ucmsigmachi.derbydays');
  });

  test('video and about sections are not rendered', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(
      container.querySelector('[data-testid="video-section"]')
    ).toBeNull();
    expect(
      container.querySelector('[data-testid="event-overview-section"]')
    ).toBeNull();
  });
});

// ─── Panel titles ─────────────────────────────────────────────────────────────

describe('panel titles', () => {
  test('renders "Social Organizations" panel title', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const titles = Array.from(container.querySelectorAll('.panel-title')).map(
      (el) => el.textContent
    );
    expect(titles).toContain('Social Organizations');
  });

  test('renders "Professional Organizations" panel title', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    const titles = Array.from(container.querySelectorAll('.panel-title')).map(
      (el) => el.textContent
    );
    expect(titles).toContain('Professional Organizations');
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

describe('footer', () => {
  test('footer is rendered in loading state', () => {
    act(() => {
      root.render(<DerbyDays />);
    });
    expect(container.querySelector('[data-testid="footer"]')).not.toBeNull();
  });

  test('footer is rendered when data is present', () => {
    useGoogleSheetsPolling.mockReturnValue(
      makeOk([{ name: 'A', score: 100, rank: 1 }])
    );

    act(() => {
      root.render(<DerbyDays />);
    });

    expect(container.querySelector('[data-testid="footer"]')).not.toBeNull();
  });
});
