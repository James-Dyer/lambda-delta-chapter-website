/**
 * Use the Node test environment so fetch can access external resources.
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';

const KNOWN_DEAD = 'https://hope.huntsmancancer.org/gentoend/derby-days-2025';
let networkAvailable = true;

beforeAll(async () => {
  try {
    await fetch('https://example.com');
  } catch (err) {
    networkAvailable = false;
    console.warn('Network unavailable, external link test will be skipped');
  }
});

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

test('external links are reachable', async () => {
  if (!networkAvailable) {
    return;
  }
  const srcDir = path.resolve(__dirname, '..');
  const files = getFiles(srcDir);
  const regex = /href=["'](https?:[^"']+)["']/g;
  const links = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = regex.exec(content))) {
      links.add(match[1]);
    }
  });

  const results = await Promise.all(
    Array.from(links).map(async (url) => {
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow' });
        return { url, status: res.status };
      } catch (err) {
        return { url, status: 0 };
      }
    })
  );

  results.forEach(({ url, status }) => {
    if (url === KNOWN_DEAD) {
      expect(status).toBeGreaterThanOrEqual(400);
    } else {
      expect(status).toBeLessThan(400);
    }
  });
});
