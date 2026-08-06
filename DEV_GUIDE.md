# Archive Maintenance Guide

This fork is a frozen May 2026 record, not the chapter's operational website.
Maintenance should be limited to compatibility, accessibility, broken local
assets, and security updates. Do not add current member records, personal
contact information, credentials, fundraising destinations, or live chapter
integrations.

## Local workflow

From `frontend/`:

```bash
npm install
npm run dev
```

Before merging an archive-maintenance change, run:

```bash
npm test
npm run lint
npm run check-links
npm run build
```

Pushing `main` publishes the build to this fork's GitHub Pages project URL. The
archive must never add a `CNAME` file for the chapter's domain.

## Updating frozen display data

Leaderboard values live in `frontend/src/Data/archiveSnapshot.js`. Only public
display fields—organization name, score, and rank—belong there. Keep the data
local and deterministic; do not reconnect the Google Sheets polling service or
add API keys.

## Archive invariants

- Keep the global archive notice visible on every route.
- Keep metadata and documentation explicit that this is not the official site.
- Do not make archived donation controls transactional.
- Do not restore member spreadsheets or private chapter pages.
- Preserve contributor attribution in Git history and documentation.
