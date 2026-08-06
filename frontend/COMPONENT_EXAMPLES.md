# Component Examples - Lambda Delta Chapter Website

This document provides practical examples of common UI patterns and components used throughout the Lambda Delta website. Use these as a reference when building new features to maintain consistency.

---

## Table of Contents
1. [Hero Sections](#hero-sections)
2. [Card Components](#card-components)
3. [Buttons](#buttons)
4. [Navigation Patterns](#navigation-patterns)
5. [Lists & Tables](#lists--tables)
6. [Timeline Components](#timeline-components)
7. [Layout Patterns](#layout-patterns)

---

## Hero Sections

### Full-Width Hero with Background Image & Overlay

```jsx
// Philanthropy.jsx pattern
<section className="hero-section">
  <div className="hero-overlay">
    <h1>Derby Days 2025</h1>
    <p>
      Our annual Derby Days event raises awareness and funds for the
      Huntsman Cancer Institute...
    </p>
  </div>
</section>
```

```css
/* CSS */
.hero-section {
  position: relative;
  width: 100%;
  background: url('../assets/images/hero-image.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 30, 95, 0.65);
  z-index: 1;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  color: #fff;
  max-width: 900px;
  margin: 0 auto;
  text-align: justify;
  line-height: 1.6;
  padding: 20px;
}
```

### Compact Hero (Recruitment Style)

```jsx
// Recruitment.jsx pattern
<div className="recruitment-hero">
  <h1>Fall 2025 Recruitment</h1>
  <p>Join us for an exciting semester of brotherhood and growth</p>
</div>
```

```css
.recruitment-hero {
  text-align: center;
  margin-bottom: 2rem;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('../assets/images/hero.png') center/cover no-repeat;
  border-radius: 12px;
}
```

### Parallax Hero (Awards Style)

```css
.awards-section {
  width: 100%;
  padding: 80px 0;
  background:
    linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)),
    url('/src/assets/images/awards-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
  color: #fff;
  text-align: center;
}
```

---

## Card Components

### Glass Morphism Card (Recruitment Events)

```jsx
// Event card with frosted glass effect
<div className="event">
  <img
    src={eventImage}
    alt="Recruitment event"
    className="event-image"
  />
  <div className="event-info">
    <h3>Casino Night</h3>
    <p>📅 Friday, Sept 15 @ 7:00 PM</p>
    <p>📍 Student Center Ballroom</p>
    <p>Join us for a night of games, prizes, and fun!</p>
  </div>
</div>
```

```css
.event {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.event:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.event-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  max-height: 260px;
  object-fit: cover;
  border-radius: 8px;
}

/* Desktop: side-by-side layout */
@media (min-width: 768px) {
  .event {
    flex-direction: row;
    align-items: center;
  }
  .event-info {
    flex: 1;
  }
  .event-image {
    flex: 1;
  }
}
```

### Dark Card (Awards/Special Content)

```jsx
// Award item card
<div className="award-item">
  <h2 className="award-item-title">Significant Chapter Award</h2>
  <div className="award-item-content">
    <img
      src={awardImage}
      alt="Award trophy"
      className="award-image"
    />
    <div className="award-text">
      <p className="award-item-description">
        This award recognizes chapters that demonstrate excellence...
      </p>
    </div>
  </div>
</div>
```

```css
.award-item {
  text-align: left;
  background: rgba(0, 36, 72, 0.6);
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}

.award-item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.award-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
  flex-shrink: 0;
  object-fit: cover;
}

.award-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .award-item {
    text-align: center;
  }

  .award-item-content {
    flex-direction: column;
    align-items: center;
  }

  .award-image {
    width: 250px;
  }
}
```

### Brother of the Month Card

```jsx
<div className="BOTM">
  <div className="brother-of-the-month-name">
    <h3>John Doe</h3>
    <h3>January 2025</h3>
  </div>
  <img src={brotherPhoto} alt="Brother of the Month" />
</div>
```

```css
.BOTM {
  width: 100%;
  max-width: 360px;
  margin: 12px auto;
  padding: 14px;
  background: rgba(0, 36, 72, 0.45);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  overflow: hidden;
}

.brother-of-the-month-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.brother-of-the-month-name h3 {
  margin: 0;
  line-height: 1.1;
  text-align: center;
}
```

---

## Buttons

### Standard Button

```jsx
// Basic button with default styling
<button className="btn">Click Me</button>

// Link styled as button
<a href="/donate" className="btn">Donate Now</a>
```

```css
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--bg, #007bff);
  color: #fff;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--hover-bg, #0056b3);
}
```

### Custom Colored Button with CSS Variables

```jsx
// Green success button
<button
  className="btn"
  style={{ '--bg': '#28a745', '--hover-bg': '#218838' }}
>
  Confirm
</button>

// Navy chapter button
<button
  className="btn"
  style={{ '--bg': '#003366', '--hover-bg': '#00509e' }}
>
  Learn More
</button>
```

### Timeline Toggle Button

```jsx
<button className="timeline-toggle" onClick={handleToggle}>
  {isExpanded ? 'Hide' : 'Show More'}
</button>
```

```css
.timeline-toggle {
  align-self: flex-start;
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.timeline-toggle:hover {
  background: rgba(97, 185, 239, 0.1);
}
```

---

## Navigation Patterns

### Desktop Navigation Link

```jsx
// Using React Router NavLink
<NavLink
  to="/philanthropy"
  end
  className={({ isActive }) => (isActive ? 'active' : '')}
>
  Philanthropy
</NavLink>
```

```css
nav ul a {
  font-family: 'Bebas Neue', serif;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  padding: 8px 18px;
  border-radius: 6px;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    text-decoration 0.2s ease;
}

nav ul a:hover {
  background-color: #00509e;
  text-decoration: underline;
}

nav ul a.active {
  background-color: #00509e;
  transform: none;
}
```

### Mobile Hamburger Menu

```jsx
// Header.jsx pattern
const [menuOpen, setMenuOpen] = useState(false);

return (
  <div className="menu-container" ref={containerRef}>
    <div
      className={`menuBtn-wrapper ${menuOpen ? 'open' : ''}`}
      onClick={() => setMenuOpen((o) => !o)}
    >
      <img
        className="menuBtn"
        src={menuOpen ? closeIcon : hamburgerIcon}
        alt="menu button"
      />
    </div>

    <ul className={`menuItems ${menuOpen ? 'open' : ''}`}>
      {navItems.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);
```

```css
/* Hide hamburger on desktop */
.menuBtn {
  display: none;
}

@media (max-width: 768px) {
  .menuBtn {
    display: block;
    height: 30px;
    width: auto;
    cursor: pointer;
  }

  .menuBtn-wrapper {
    transition: transform 0.1s ease;
  }

  .menuBtn-wrapper.open {
    transform: rotate(180deg);
  }

  .menuItems {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background-color: #003366;
    width: 200px;
    border-radius: 5px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.1s ease,
      opacity 0.1s ease;
  }

  .menuItems.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .menuItems li {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .menuItems li:last-child {
    border-bottom: none;
  }
}
```

---

## Lists & Tables

### Member Table

```jsx
<div className="table-responsive">
  <table className="member-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Position(s)</th>
        <th>Class</th>
      </tr>
    </thead>
    <tbody>
      {members.map((member) => (
        <tr key={member.id}>
          <td>{member.name}</td>
          <td>{member.positions.join(', ')}</td>
          <td>{member.class}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

```css
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.member-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  table-layout: fixed;
  min-width: 600px; /* Ensures scroll on narrow screens */
}

.member-table th,
.member-table td {
  border: 1px solid #e0e0e0;
  padding: 0.75rem;
  text-align: left;
  font-size: 1rem;
}

/* Column widths */
.member-table th:nth-child(1),
.member-table td:nth-child(1) {
  width: 40%; /* Name */
}
.member-table th:nth-child(2),
.member-table td:nth-child(2) {
  width: 40%; /* Position(s) */
}
.member-table th:nth-child(3),
.member-table td:nth-child(3) {
  width: 20%; /* Class */
}

.member-table th {
  background-color: #f2f2f2;
  font-weight: 600;
}

.member-table tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

.member-table tbody tr:hover {
  background-color: #f5f5f5;
}
```

### Bullet List (Awards)

```jsx
<ul className="award-list">
  <li>Outstanding chapter programming</li>
  <li>Strong member retention</li>
  <li>Active campus involvement</li>
</ul>
```

```css
.award-list {
  list-style-type: disc;
  padding-left: 30px;
  margin-top: 5px;
}

.award-list li {
  margin-bottom: 6px;
  font-size: 1.1rem;
  line-height: 1.4;
}
```

---

## Timeline Components

### Timeline Item with Year Badge

```jsx
<div className="timeline-item">
  <span className="timeline-year">2024</span>
  <h3 className="timeline-title">Significant Chapter Award</h3>
  <button className="timeline-toggle" onClick={toggleDetails}>
    Show More
  </button>
</div>
```

```css
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 15px;
  animation: fade-slide 0.6s ease both;
}

.timeline-year {
  font-family: 'Bebas Neue', serif;
  font-size: 1.5rem;
  color: #edba68; /* Gold accent */
  min-width: 60px;
}

.timeline-title {
  flex: 1;
}

@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .timeline-item {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .timeline-year,
  .timeline-title {
    text-align: center;
  }
}
```

---

## Layout Patterns

### Two-Column Layout (40/60 Split)

```jsx
// About section pattern
<section className="content-container">
  <div className="left-image">
    <img src={logo} alt="Chapter logo" />
  </div>
  <div className="right-text">
    <h2 className="section-title">About Us</h2>
    <p>Welcome to Lambda Delta chapter...</p>
  </div>
</section>
```

```css
.content-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

.left-image {
  flex: 0 0 calc(40% - 20px);
  max-width: calc(40% - 20px);
}

.left-image img {
  width: 100%;
  max-width: 500px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.right-text {
  flex: 0 0 calc(60% - 20px);
  max-width: calc(60% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
    align-items: center;
  }

  .left-image,
  .right-text {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
```

### Centered Content Container

```jsx
<div className="page-container">
  <h1>Page Title</h1>
  <p>Content goes here...</p>
</div>
```

```css
.page-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
```

### Full-Width Section with Background

```jsx
<section className="donation-page">
  <div className="donation-main">
    <h1>Support Our Chapter</h1>
    {/* Content */}
  </div>
</section>
```

```css
.donation-page {
  color: #333;
  background:
    linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
    url('/src/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  text-align: justify;
}

.donation-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}
```

### Flexbox Footer Pattern

```jsx
// Footer that sticks to bottom
<div className="page-wrapper">
  <Header />
  <main className="page-content">
    {/* Main content */}
  </main>
  <Footer />
</div>
```

```css
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}

footer {
  margin-top: auto;
  background: #003366;
  color: white;
  text-align: center;
  padding: 10px;
}
```

---

## Additional Patterns

### Important Quote Box

```jsx
<p className="important-quote">
  Men join fraternities. Leaders of men join Sigma Chi.
</p>
```

```css
.important-quote {
  margin-top: 10px;
  font-size: clamp(1.1rem, 2vw, 1.2rem);
  color: #222222b6;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}
```

### Video Wrapper (Responsive)

```jsx
<section id="recruitment-video">
  <div className="videoWrapper">
    <video controls autoPlay muted loop>
      <source src={videoFile} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</section>
```

```css
#recruitment-video {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 60px;
}

video {
  width: 100vw;
  height: auto;
  max-height: 100vh;
  display: block;
  object-fit: cover;
  object-position: center;
}
```

## Quick Tips

### Accessibility
- Always include `alt` text for images
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Ensure sufficient color contrast
- Provide `aria-label` for icon-only buttons
- Respect `prefers-reduced-motion`

### Performance
- Use `loading="lazy"` for images below the fold
- Optimize images before uploading
- Consider using `webp` format for photos
- Minimize use of heavy animations

### Responsive Design
- Test at the 768px breakpoint
- Use `flex-wrap: wrap` for flexible layouts
- Consider `clamp()` for fluid typography
- Always test on mobile devices

---

**Last Updated**: February 2026

For more details, see [STYLE_GUIDE.md](./STYLE_GUIDE.md) and [design-tokens.css](./src/styles/design-tokens.css).
