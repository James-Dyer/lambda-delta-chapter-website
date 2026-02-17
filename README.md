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

- The site is designed to be easily extendable. New pages can be added by placing components in `src/components/` and registering them in the router.

## Contact

For questions or to get involved, connect with us on [Instagram](https://instagram.com/ucmsigmachi) or email **sigmachi@ucmerced.edu**.
