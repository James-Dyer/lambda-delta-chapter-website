# Lambda Delta Chapter Website

A dynamic and responsive website for the **Lambda Delta Chapter of Sigma Chi** at UC Merced, built with React and styled using CSS modules.

## Features

- Member Directory: Organized view of the chapter's Head Table, Executive Committee, Outreach Committee, and Actives.
- Awards Page: Highlights Peterson Blue and Balfour awards with interactive elements.
- Home Page: Introductory video and chapter background with responsive layout.
- Donate Page: Options to support the chapter and the Huntsman Cancer Institute.
- Mobile Friendly: Fully responsive design with flexible layouts and scalable media.

## Technologies Used

- React.js
- CSS (custom per page)
- React Router DOM
- XLSX for parsing Excel data
- HTML5 video
- Hosted assets (images, spreadsheets)

## File Structure

```
/src
 ├── components
 │   ├── Header.jsx
 │   ├── Footer.jsx
 │   ├── Awards.jsx
 │   ├── Donate.jsx
 │   └── Members.jsx
 ├── styles
 │   ├── header.css
 │   ├── home.css
 │   ├── members.css
 │   ├── donate.css
 │   └── awards.css
 └── App.jsx
```

## Data & Assets

- Excel file: `brother-info.xlsx` located in `/public/data`
- Images & Videos: Stored in `/public/images` and `/public/videos`

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lambda-delta-site.git
   cd lambda-delta-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Contributing

We welcome contributions from brothers or tech enthusiasts. Submit a pull request or reach out to `sigmachi@ucmerced.edu`.

## Contact

Have questions or want to support the chapter? Connect with us on [Instagram](https://instagram.com/ucmsigmachi) or email chapter leadership `sigmachi@ucmerced.edu`.
