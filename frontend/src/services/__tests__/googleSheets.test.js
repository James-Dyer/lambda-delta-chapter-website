import { fetchLeaderboardData, hasValidConfiguration } from '../googleSheets';

beforeEach(() => {
  delete process.env.REACT_APP_GOOGLE_SHEETS_ID;
  delete process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
  global.fetch = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  delete process.env.REACT_APP_GOOGLE_SHEETS_ID;
  delete process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
});

// Helper to set valid config
function setValidConfig() {
  process.env.REACT_APP_GOOGLE_SHEETS_ID = 'test-sheet-id';
  process.env.REACT_APP_GOOGLE_SHEETS_API_KEY = 'test-api-key';
}

// Helper to mock a successful fetch with given values
function mockFetch(values) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(values !== undefined ? { values } : {}),
  });
}

// ─── hasValidConfiguration ───────────────────────────────────────────────────

describe('hasValidConfiguration', () => {
  test('returns false when both env vars missing', () => {
    expect(hasValidConfiguration()).toBe(false);
  });

  test('returns false when only SHEET_ID is set', () => {
    process.env.REACT_APP_GOOGLE_SHEETS_ID = 'some-id';
    expect(hasValidConfiguration()).toBe(false);
  });

  test('returns false when only API_KEY is set', () => {
    process.env.REACT_APP_GOOGLE_SHEETS_API_KEY = 'some-key';
    expect(hasValidConfiguration()).toBe(false);
  });

  test('returns false when both are empty strings', () => {
    process.env.REACT_APP_GOOGLE_SHEETS_ID = '';
    process.env.REACT_APP_GOOGLE_SHEETS_API_KEY = '';
    expect(hasValidConfiguration()).toBe(false);
  });

  test('returns true when both are set', () => {
    setValidConfig();
    expect(hasValidConfiguration()).toBe(true);
  });
});

// ─── fetchLeaderboardData — config validation ─────────────────────────────────

describe('fetchLeaderboardData — config validation', () => {
  test('throws when SHEET_ID missing', async () => {
    process.env.REACT_APP_GOOGLE_SHEETS_API_KEY = 'some-key';
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow(
      'Google Sheets configuration is missing'
    );
  });

  test('throws when API_KEY missing', async () => {
    process.env.REACT_APP_GOOGLE_SHEETS_ID = 'some-id';
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow(
      'Google Sheets configuration is missing'
    );
  });

  test('does not call fetch when config invalid', async () => {
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

// ─── fetchLeaderboardData — HTTP errors ──────────────────────────────────────

describe('fetchLeaderboardData — HTTP errors', () => {
  beforeEach(setValidConfig);

  test('throws on 403 response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: () => Promise.resolve('Forbidden'),
    });
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow(
      'Google Sheets API error (403)'
    );
  });

  test('throws on 500 response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve('Internal Server Error'),
    });
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow(
      'Google Sheets API error (500)'
    );
  });

  test('re-throws network errors from fetch', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network failure'));
    await expect(fetchLeaderboardData('Sheet1!A1:B100')).rejects.toThrow(
      'Network failure'
    );
  });

  test('constructs correct URL', async () => {
    process.env.REACT_APP_GOOGLE_SHEETS_ID = 'my-sheet-id';
    process.env.REACT_APP_GOOGLE_SHEETS_API_KEY = 'my-api-key';
    mockFetch([['Name', 'Score']]);

    await fetchLeaderboardData('Total Points!A1:B100');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://sheets.googleapis.com/v4/spreadsheets/my-sheet-id/values/Total Points!A1:B100?key=my-api-key'
    );
  });
});

// ─── fetchLeaderboardData — header skipping / empty data ─────────────────────

describe('fetchLeaderboardData — header skipping', () => {
  beforeEach(setValidConfig);

  test('returns empty array when only header row present', async () => {
    mockFetch([['Name', 'Score']]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toEqual([]);
  });

  test('returns empty array when values is empty array', async () => {
    mockFetch([]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toEqual([]);
  });

  test('returns empty array when values key is absent', async () => {
    // mockFetch with undefined uses the "no values" branch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toEqual([]);
  });
});

// ─── fetchLeaderboardData — column reading ────────────────────────────────────

describe('fetchLeaderboardData — column reading', () => {
  beforeEach(setValidConfig);

  test('reads name from col 0 and score from col 1 by default', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha', '100'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].name).toBe('Alpha');
    expect(result[0].score).toBe(100);
  });

  test('reads score from options.scoreColumnIndex: 2', async () => {
    mockFetch([
      ['Name', 'ColB', 'Score'],
      ['Alpha', 'ignored', '250'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:C100', {
      scoreColumnIndex: 2,
    });
    expect(result[0].score).toBe(250);
  });

  test('strips $ and commas: "$1,234" → 1234', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha', '$1,234'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].score).toBe(1234);
  });

  test('strips non-numeric chars: "1.5k pts" → 1.5', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha', '1.5k pts'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].score).toBe(1.5);
  });

  test('missing score cell (short row) → score 0', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha'], // no score column
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].score).toBe(0);
  });

  test('unparseable score string "abc" → score 0', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha', 'abc'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].score).toBe(0);
  });

  test('filters rows with empty names', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['', '100'],
      ['Beta', '50'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Beta');
  });

  test('filters rows with whitespace-only names', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['   ', '100'],
      ['Gamma', '50'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gamma');
  });
});

// ─── fetchLeaderboardData — sorting ──────────────────────────────────────────

describe('fetchLeaderboardData — sorting', () => {
  beforeEach(setValidConfig);

  test('sorts descending by score', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Low', '10'],
      ['High', '300'],
      ['Mid', '100'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.name)).toEqual(['High', 'Mid', 'Low']);
  });

  test('handles single entry', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Solo', '42'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Solo');
    expect(result[0].score).toBe(42);
  });
});

// ─── fetchLeaderboardData — rank assignment ───────────────────────────────────

describe('fetchLeaderboardData — rank assignment', () => {
  beforeEach(setValidConfig);

  test('assigns rank 1 to single top entry', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['Alpha', '100'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result[0].rank).toBe(1);
  });

  test('sequential ranks for unique scores [300, 200, 100] → [1, 2, 3]', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['A', '300'],
      ['B', '200'],
      ['C', '100'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.rank)).toEqual([1, 2, 3]);
  });

  test('tie behavior: [100, 100, 90] → ranks [1, 1, 2]', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['A', '100'],
      ['B', '100'],
      ['C', '90'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.rank)).toEqual([1, 1, 2]);
  });

  test('three-way tie at top → all rank 1', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['A', '100'],
      ['B', '100'],
      ['C', '100'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.rank)).toEqual([1, 1, 1]);
  });

  test('[200, 200, 100, 50] → ranks [1, 1, 2, 3]', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['A', '200'],
      ['B', '200'],
      ['C', '100'],
      ['D', '50'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.rank)).toEqual([1, 1, 2, 3]);
  });

  test('all zero scores → all rank 1', async () => {
    mockFetch([
      ['Name', 'Score'],
      ['A', '0'],
      ['B', '0'],
      ['C', '0'],
    ]);
    const result = await fetchLeaderboardData('Sheet1!A1:B100');
    expect(result.map((r) => r.rank)).toEqual([1, 1, 1]);
  });
});
