# Lambda Delta Chapter Website

This repository contains the source for the **Lambda Delta Chapter of Sigma Chi** website hosted at [ucmsigmachi.org](https://ucmsigmachi.org). The site is a single page React application served on GitHub Pages and styled using CSS Modules.

## Project layout

All code lives under `frontend/`:

```
frontend/
├── public/          # static files (index.html, 404.html, robots.txt, CNAME)
├── src/
│   ├── assets/      # images and videos
│   ├── components/  # React components for each page
│   ├── styles/      # CSS Modules grouped by feature
│   ├── Data/        # example JSON data
│   ├── App.js       # router setup
│   └── ...
├── package.json     # dependencies and npm scripts
└── ...
```

The root of the repository only includes this README and a lockfile. The React app itself is self contained inside `frontend/`.

## Key features

- **Home page** with an embedded recruitment video and an interactive awards section.
- **Member Directory** that reads `brother-info.xlsx` at runtime using the `xlsx` library and groups members by committee.
- **Donate page** with options to support the chapter directly or donate to the Huntsman Cancer Institute.
- Fully responsive layout for desktop and mobile.

## Installing and running

1. Install dependencies from the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Linting and formatting:
   ```bash
   npm run lint   # check lint rules
   npm run format # format source files
   ```
4. Unit tests:
   ```bash
   npm run test            # run all unit tests
   npm run test:coverage   # run tests and display a coverage report
   ```
5. Build or deploy:
   ```bash
   npm run build   # produce a production build
   npm run deploy  # deploy to GitHub Pages
   ```
   The deploy script uses the `gh-pages` package and the `CNAME` file to publish to `ucmsigmachi.org`.

## Next steps

- Review `src/App.js` to understand how each component is mapped to a route.
- Explore `src/styles/` for examples of CSS Modules.
- The site is designed to be easily extendable. New pages can be added by placing components in `src/components/` and registering them in the router.

## Contact

For questions or to get involved, connect with us on [Instagram](https://instagram.com/ucmsigmachi) or email **sigmachi@ucmerced.edu**.
