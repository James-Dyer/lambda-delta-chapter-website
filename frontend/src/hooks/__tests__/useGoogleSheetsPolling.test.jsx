/* eslint-disable react/prop-types */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { vi } from 'vitest';
import { useGoogleSheetsPolling } from '../useGoogleSheetsPolling';
import { fetchLeaderboardData } from '../../services/googleSheets';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock('../../services/googleSheets', () => ({
  fetchLeaderboardData: vi.fn(),
}));

let container;
let root;
let hookResult;

function Harness({ range, interval, options }) {
  hookResult = useGoogleSheetsPolling(range, interval, options);
  return null;
}

beforeEach(() => {
  vi.useFakeTimers();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  hookResult = null;
  vi.spyOn(console, 'error').mockImplementation(() => {});
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
  hookResult = null;
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

// ─── Initial state ────────────────────────────────────────────────────────────

test('initial state: loading true, data null, error null', () => {
  fetchLeaderboardData.mockResolvedValue([]);
  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  expect(hookResult.loading).toBe(true);
  expect(hookResult.data).toBeNull();
  expect(hookResult.error).toBeNull();
});

// ─── Successful fetch ─────────────────────────────────────────────────────────

test('sets data and clears loading after successful fetch', async () => {
  const rows = [{ name: 'Alpha', score: 100, rank: 1 }];
  fetchLeaderboardData.mockResolvedValue(rows);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.loading).toBe(false);
  expect(hookResult.error).toBeNull();
  expect(hookResult.data.rows).toEqual(rows);
  expect(hookResult.data.status).toBe('ok');
});

test('data.updatedAt is a Date instance', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.data.updatedAt).toBeInstanceOf(Date);
});

test('clears error after a successful fetch following an error', async () => {
  fetchLeaderboardData
    .mockRejectedValueOnce(new Error('First fail'))
    .mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.error).not.toBeNull();

  await act(async () => {
    vi.advanceTimersByTime(3000);
  });
  await act(async () => {});

  expect(hookResult.error).toBeNull();
  expect(hookResult.data.status).toBe('ok');
});

test('passes options.scoreColumnIndex through to fetchLeaderboardData', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(
      <Harness
        range="Sheet1!A1:C100"
        interval={3000}
        options={{ scoreColumnIndex: 2 }}
      />
    );
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledWith('Sheet1!A1:C100', {
    scoreColumnIndex: 2,
  });
});

// ─── Error handling ───────────────────────────────────────────────────────────

test('sets error and clears loading on rejection', async () => {
  fetchLeaderboardData.mockRejectedValue(new Error('Network error'));

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.error).toBe('Network error');
  expect(hookResult.loading).toBe(false);
});

test('data stays null when error occurs on first fetch', async () => {
  fetchLeaderboardData.mockRejectedValue(new Error('First error'));

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.data).toBeNull();
});

test('stale closure: interval error does not degrade data', async () => {
  // Effect is created with data=null in closure. Even after first fetch
  // succeeds (state data becomes non-null), the catch block's `if (data)`
  // still sees the stale null, so degraded update is never applied.
  fetchLeaderboardData
    .mockResolvedValueOnce([{ name: 'Alpha', score: 100, rank: 1 }])
    .mockRejectedValueOnce(new Error('Interval error'));

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(hookResult.data.status).toBe('ok');

  await act(async () => {
    vi.advanceTimersByTime(3000);
  });
  await act(async () => {});

  expect(hookResult.error).toBe('Interval error');
  // data.status is NOT 'degraded' because the closure captured null at mount
  expect(hookResult.data.status).toBe('ok');
  expect(hookResult.data.status).not.toBe('degraded');
});

// ─── Polling ─────────────────────────────────────────────────────────────────

test('calls fetchLeaderboardData once immediately on mount', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledTimes(1);
});

test('calls fetchLeaderboardData again after interval elapses', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  await act(async () => {
    vi.advanceTimersByTime(3000);
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledTimes(2);
});

test('calls fetchLeaderboardData 4 times after interval * 3 (1 + 3 polls)', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  await act(async () => {
    vi.advanceTimersByTime(3000 * 3);
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledTimes(4);
});

test('uses the provided interval value precisely', async () => {
  fetchLeaderboardData.mockResolvedValue([]);
  const INTERVAL = 5000;

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={INTERVAL} />);
  });
  await act(async () => {});

  // Advance by just under the interval — should not trigger another call
  await act(async () => {
    vi.advanceTimersByTime(INTERVAL - 1);
  });
  expect(fetchLeaderboardData).toHaveBeenCalledTimes(1);

  // Advance by 1 more ms — now the interval fires
  await act(async () => {
    vi.advanceTimersByTime(1);
  });
  await act(async () => {});
  expect(fetchLeaderboardData).toHaveBeenCalledTimes(2);
});

// ─── Cleanup ──────────────────────────────────────────────────────────────────

test('stops polling after unmount', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  act(() => {
    root.unmount();
  });
  root = null;

  // Advance well past the interval — no new fetches should occur
  await act(async () => {
    vi.advanceTimersByTime(3000 * 5);
  });

  expect(fetchLeaderboardData).toHaveBeenCalledTimes(1);
});

// ─── Re-fetch on range change ─────────────────────────────────────────────────

test('calls fetchLeaderboardData again with new range when range prop changes', async () => {
  fetchLeaderboardData.mockResolvedValue([]);

  act(() => {
    root.render(<Harness range="Sheet1!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledWith('Sheet1!A1:B100', {});

  act(() => {
    root.render(<Harness range="OtherSheet!A1:B100" interval={3000} />);
  });
  await act(async () => {});

  expect(fetchLeaderboardData).toHaveBeenCalledWith('OtherSheet!A1:B100', {});
});
