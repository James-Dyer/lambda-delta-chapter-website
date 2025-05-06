# Lambda Delta Chapter Website

A dynamic and responsive website for the **Lambda Delta Chapter of Sigma Chi** at UC Merced, built with React and styled using CSS Modules.

---

## Features

- **Home Page**: Introductory video and chapter background with a responsive layout.
- **Awards**: Highlights Peterson and Balfour awards with interactive elements.
- **Member Directory**: Organized view of the chapter's Head Table, Executive Committee, Outreach Committee, and Actives.
- **Donate Page**: Options to support the chapter and the Huntsman Cancer Institute.
- **Philanthropy Page**: Highlights the chapter's commitment to charitable causes.
- **Mobile-Friendly**: Fully responsive design with flexible layouts and scalable media.

---

## Technologies Used

- React.js
- React Router DOM
- CSS Modules (custom per page)
- XLSX (for parsing Excel data)
- HTML5 video
- Hosted assets (images, spreadsheets)

---

## File Structure

```
/src
 ├── assets
 │   ├── images
 │   └── videos
 ├── components
 │   └── *.jsx
 ├── styles
 │   └── *.css
 └── App.js
```

---

## Data & Assets

- **Excel File**: `brother-info.xlsx` located in `/public/data`
- **Images & Videos**: Stored in `/src/assets/images` and `/src/assets/videos`

---

## Setup Instructions

### Required Software

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org) (includes npm)

---

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lambda-delta-chapter-website.git
   cd lambda-delta-chapter-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

2.1 **(Optional)** Install `gh-pages` if not already included:
   ```bash
   npm install gh-pages --save-dev
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

---

### Note

Ensure your `package.json` includes the following configuration:

```json
"homepage": "https://your-username.github.io/lambda-delta-chapter-website",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

---

## Contact

Have questions or want to support the chapter?  
Connect with us on [Instagram](https://instagram.com/ucmsigmachi) or email chapter leadership at **sigmachi@ucmerced.edu**.
