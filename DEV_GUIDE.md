# Developer Guide

## Before You Start (First Time Only)

Make sure you have these installed:

- **Node.js** (version 20 or higher) — download at [nodejs.org](https://nodejs.org)
- **GitHub Desktop** — download at [desktop.github.com](https://desktop.github.com)

Once you have the repo cloned in GitHub Desktop, open a terminal in the `frontend` folder and run:

```
npm install
```

This installs all the dependencies the project needs. You only have to do this once (or again after someone changes `package.json`).

> **How to open a terminal in the right folder:** In GitHub Desktop, go to **Repository → Open in Terminal** (Mac) or **Repository → Open in Command Prompt** (Windows). Then type `cd frontend` and press Enter.

---

## Running the Dev Site

The dev site lets you preview your changes live in the browser before anyone else sees them.

**1. Open a terminal in the `frontend` folder** (see above).

**2. Run:**
```
npm run dev
```

**3. Open your browser and go to:**
```
http://localhost:5173
```

The site will automatically refresh whenever you save a file. To stop the dev server, press `Ctrl+C` in the terminal.

---

## Making Changes — The Full Workflow

Every change follows this cycle: **branch → edit → commit → push → PR → merge → deploy**.

### Step 1 — Create a new branch

Never make changes directly on `main`. Always start a new branch.

In GitHub Desktop:
1. Click **Current Branch** at the top
2. Click **New Branch**
3. Give it a short name describing your change, e.g. `update-homepage-text`
4. Click **Create Branch**

### Step 2 — Make your changes

Edit files however you like. The dev site (if running) will update automatically as you save.

### Step 3 — Commit your changes

A commit is a saved snapshot of your changes with a description.

In GitHub Desktop:
1. You'll see your changed files listed on the left
2. Write a short summary in the **Summary** box at the bottom, e.g. `Update homepage hero text`
3. Click **Commit to [your-branch-name]**

> Commit often — after each logical chunk of work. Small commits are easier to understand and undo.

### Step 4 — Push your branch

Pushing sends your commits up to GitHub so others can see them.

In GitHub Desktop, click the **Push origin** button at the top. (If it says **Publish branch**, that's the same thing for a new branch.)

### Step 5 — Open a Pull Request (PR)

A pull request prepares your changes to be merged into the main branch.

In GitHub Desktop, click **Create Pull Request**. This opens GitHub in your browser.

On GitHub:
1. Give the PR a clear title describing what changed
2. Click **Create pull request**

After opening the PR, GitHub will automatically run two checks:

- **Formatting** — verifies code style is consistent
- **Tests** — runs the automated test suite

You'll see these as green checkmarks ✅ or red X marks ❌ on the PR page. Wait for both to pass before merging. If one fails, see the Troubleshooting section below.

Once both checks are green, click **Merge pull request** on GitHub.

### Step 6 — Switch to main and pull the latest

After merging, you need to get the updated `main` branch on your computer.

In GitHub Desktop:
1. Click **Current Branch** → select **main**
2. Click **Fetch origin**, then **Pull origin**

### Step 7 — Deploy

This publishes the site to [ucmsigmachi.org](https://ucmsigmachi.org).

In your terminal (in the `frontend` folder), run:

```
npm run deploy
```

This will build the site and push it to GitHub Pages. It takes about a minute. You'll know it worked when you see `Published` in the terminal.

> ⚠️ **Important:** You must be on the `main` branch to deploy. If you're on another branch, the command will refuse to run.

---

## Troubleshooting

### "command not found: npm"
Node.js isn't installed, or the terminal doesn't know where to find it. Re-install Node from [nodejs.org](https://nodejs.org), then close and reopen your terminal.

### "Cannot find module" or a wall of errors after `npm start`
Dependencies are missing. Run `npm install` from the `frontend` folder, then try `npm start` again.

### The dev site shows old content / doesn't reflect my change
Make sure you saved the file. If it still doesn't update, stop the server (`Ctrl+C`) and run `npm start` again.

### `npm run deploy` says "Deploy blocked: current branch is '...'"
You're not on `main`. In GitHub Desktop, switch to `main` and pull the latest changes first, then run `npm run deploy` again.

### `npm run deploy` fails with "Permission denied" or an authentication error
Your GitHub credentials need refreshing. In GitHub Desktop, go to **Preferences → Accounts** and sign in again.

### The site deployed but changes aren't showing at ucmsigmachi.org
GitHub Pages can take 1–5 minutes to update. Hard-refresh the page (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows) to bypass your browser cache.

### Push is rejected: "Updates were rejected because the remote contains work you do not have"
Someone else pushed to the same branch. In GitHub Desktop, click **Fetch origin** then **Pull origin** to bring in their changes, then push again.

### The formatting check fails on GitHub ❌

Your code has a formatting issue (spacing, indentation, quotes, etc.). Fix it in one step — run this from the `frontend` folder:

```
npm run format
```

This automatically corrects all formatting problems. Then commit the changes and push again. The check will re-run and should go green.

### The tests check fails on GitHub ❌

Run the tests locally first to see what's failing:

```
npm test
```

Read the error output — it will point to the specific file and line. Fix the issue, then commit and push. The check will re-run automatically.

### The leaderboard isn't loading on the dev site
The Google Sheets API key is stored in a local config file that isn't shared in the repo. Ask for the `.env.development` file and place it in the `frontend` folder.
