'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SRC_DIR = path.join(__dirname, '../src');

// Placeholder / stock-photo CDNs that are never real app links
const SKIP_PREFIXES = [
  'https://encrypted-tbn0.gstatic.com',
  'https://t4.ftcdn.net',
  'https://plus.unsplash.com',
  'https://images.pexels.com',
  'https://www.aspca.org',
];

// URLs that are expected to be dead (>=400). Script fails if they come back alive.
const KNOWN_DEAD = new Set([
  'https://hope.huntsmancancer.org/gentoend/derby-days-2025',
]);

// Treat these as "server is up but blocking headless clients" — not a dead link
const BLOCKED_AS_REACHABLE_STATUSES = new Set([403, 429, 503]);

const TIMEOUT_MS = 10000;

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// ---------------------------------------------------------------------------
// File walking
// ---------------------------------------------------------------------------

function walkSrc(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue; // skip test fixtures
      files.push(...walkSrc(path.join(dir, entry.name)));
    } else if (entry.isFile() && /\.(js|jsx|ts|tsx|css|html|json)$/.test(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

// ---------------------------------------------------------------------------
// URL extraction
// ---------------------------------------------------------------------------

const URL_PATTERNS = [
  // href="https://..." or src="https://..."  (JSX string attribute)
  /(?:href|src)="(https?:\/\/[^"]+)"/g,
  // href={"https://..."} or src={"https://..."}  (JSX expression attribute)
  /(?:href|src)=\{"(https?:\/\/[^"]+)"\}/g,
  // bare string literals  'https://...'  (JS arrays, variables)
  /'(https?:\/\/[^']+)'/g,
];

function extractUrls(content) {
  const urls = new Set();
  for (const pattern of URL_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      urls.add(match[1]);
    }
  }
  return urls;
}

// ---------------------------------------------------------------------------
// URL checking
// ---------------------------------------------------------------------------

async function checkUrl(url) {
  const headers = { 'User-Agent': USER_AGENT };

  async function attempt(method) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        headers,
        redirect: 'follow',
        signal: controller.signal,
      });
      return res.status;
    } finally {
      clearTimeout(timer);
    }
  }

  let status = await attempt('HEAD');
  // Some servers reject HEAD; fall back to GET
  if (status === 405 || status === 501) {
    status = await attempt('GET');
  }
  return status;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const files = walkSrc(SRC_DIR);

  // Collect { url -> Set<relativeFile> }
  const urlSources = new Map();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const urls = extractUrls(content);
    for (const url of urls) {
      if (SKIP_PREFIXES.some((p) => url.startsWith(p))) continue;
      if (!urlSources.has(url)) urlSources.set(url, new Set());
      urlSources.get(url).add(path.relative(SRC_DIR, file));
    }
  }

  const urls = Array.from(urlSources.keys());
  console.log('\nChecking ' + urls.length + ' unique URL(s)...\n');

  let failures = 0;

  await Promise.all(
    urls.map(async (url) => {
      const sources = Array.from(urlSources.get(url)).join(', ');
      const isDead = KNOWN_DEAD.has(url);

      let status;
      try {
        status = await checkUrl(url);
      } catch (err) {
        const msg = err.name === 'AbortError' ? 'TIMEOUT' : err.message;
        if (isDead) {
          console.log('OK  (known-dead, unreachable): ' + url);
        } else {
          console.error('FAIL (' + msg + '): ' + url + '\n  source: ' + sources);
          failures++;
        }
        return;
      }

      const reachable =
        status < 400 || BLOCKED_AS_REACHABLE_STATUSES.has(status);

      if (isDead) {
        if (reachable) {
          console.error(
            'FAIL (known-dead but got ' + status + '): ' + url + '\n  source: ' + sources
          );
          failures++;
        } else {
          console.log('OK  (known-dead ' + status + '): ' + url);
        }
      } else {
        if (reachable) {
          console.log('OK  (' + status + '): ' + url);
        } else {
          console.error('FAIL (' + status + '): ' + url + '\n  source: ' + sources);
          failures++;
        }
      }
    })
  );

  console.log('\n' + (failures === 0 ? 'All links OK.' : failures + ' link(s) failed.'));
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error('check-links failed:', err.message);
  process.exit(1);
});
