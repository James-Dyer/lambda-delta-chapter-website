# Lambda Delta Chapter Website Archive

This repository preserves the **May 2026 version** of the Lambda Delta Chapter
of Sigma Chi website at UC Merced. It is an independent historical archive and
is **not the chapter's current official website**. Information, schedules, and
external links may be outdated.

The archived site is published at
[james-dyer.github.io/lambda-delta-chapter-website](https://james-dyer.github.io/lambda-delta-chapter-website/).

## About the project

James Dyer was the primary developer and maintainer of this React website from
its initial release in December 2024 through May 2026. Other Lambda Delta
chapter members also contributed features and content; their work remains
credited in the Git history.

The site includes:

- A responsive multi-page chapter website with animated route transitions
- Philanthropy, awards, donation, and event experiences
- Responsive Derby Days leaderboards and a full-screen Call-o-thon display
- Custom design tokens, reusable components, reduced-motion support, and tests
- Photography and video documenting the chapter during the archived period

Live integrations were frozen for long-term preservation. The Derby Days and
Call-o-thon displays now read checked-in May 2026 snapshot data, and the Canva
embed was replaced by a local event image. The Google Calendar was intentionally
removed. Donation destinations are inactive, and the time-sensitive recruitment
page is not included in the archive.

## Technology

- React 19 and React Router
- Vite
- Framer Motion
- Vitest and Testing Library-style DOM tests
- GitHub Actions and GitHub Pages

## Run locally

Requirements: Node.js 20 or newer.

```bash
cd frontend
npm install
npm run dev
```

The development server prints the local URL. Other useful commands:

| Command | Purpose |
|---|---|
| `npm test` | Run the automated tests |
| `npm run lint` | Check JavaScript and formatting |
| `npm run check-links` | Check retained external links |
| `npm run build` | Create the GitHub Pages production build |

## Archive data

Public leaderboard snapshot values are isolated in
`frontend/src/Data/archiveSnapshot.js`. They were transcribed from the public
display columns of the 2026 Derby Days spreadsheets. Auxiliary working tables,
member records, credentials, and private chapter material are not part of the
archive.

## Status and attribution

This repository is preserved for demonstration and historical reference. It is
not intended to receive current chapter updates, donations, recruitment
inquiries, or operational data.

Copyright for chapter marks and contributed media remains with their respective
owners. No license is granted for reuse merely by making this source available.
