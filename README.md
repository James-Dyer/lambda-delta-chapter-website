# Lambda Delta Chapter Website

The official website for the **Lambda Delta Chapter of Sigma Chi** at UC Merced, hosted at [ucmsigmachi.org](https://ucmsigmachi.org).

For questions or to get involved, reach us on [Instagram](https://instagram.com/ucmsigmachi) or email **sigmachi@ucmerced.edu**.

---

## Getting Started

### What you'll need

- **Node.js** (version 20 or higher) — download at [nodejs.org](https://nodejs.org)
- **GitHub (CLI or Desktop)** 

### First-time setup

Once you've cloned the repo, open a terminal in the `frontend` folder and run:

```bash
npm install
```

This downloads all the packages the project depends on. You only need to do this once.

> **Tip:** In GitHub Desktop, go to **Repository → Open in Terminal** to open a terminal already pointed at the right folder. Then type `cd frontend` and press Enter.

---

## Running the Site Locally

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser. The page will automatically refresh as you save files. Press `Ctrl+C` to stop.

---

## Project Structure

All code lives under `frontend/src/`:

```
frontend/
├── index.html           # HTML entry point
├── src/
│   ├── components/      # one file per page or UI section
│   ├── styles/          # CSS files, one per component
│   ├── hooks/           # shared React hooks
│   ├── services/        # Google Sheets API logic
│   └── App.js           # page routing
├── public/              # static files (images, data, favicons)
└── package.json         # dependencies and scripts
```

Adding a new page means creating a component in `src/components/` and adding a route in `App.js`.

---

## Other Useful Commands

All commands run from the `frontend/` folder.

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm test` | Run the automated tests |
| `npm run format` | Auto-fix code formatting |
| `npm run build` | Build the site for production |
| `npm run deploy` | Build and publish to ucmsigmachi.org |

> `npm run deploy` only works from the `main` branch — it will block you if you're on anything else.

---

## Making Changes

New to Git? See **[DEV_GUIDE.md](./DEV_GUIDE.md)** for a full step-by-step walkthrough: how to create a branch, commit, open a pull request, and deploy.
