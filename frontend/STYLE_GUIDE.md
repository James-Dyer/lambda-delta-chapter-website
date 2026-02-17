# Lambda Delta Chapter Website - Style Guide

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Visual Effects](#visual-effects)
7. [Responsive Design](#responsive-design)
8. [Known Inconsistencies](#known-inconsistencies)

---

## Design Philosophy

The Lambda Delta website embodies a **professional collegiate fraternity aesthetic** with:
- Clean, traditional layouts
- Professional blue color scheme
- Bold typography for headings (Bebas Neue)
- Rich media (photos, videos) to showcase chapter life
- Subtle modern touches (glass morphism, smooth transitions)

The design balances formality (for alumni and prospective members) with approachability (for current students).

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | Usage | CSS Variable Suggestion |
|------------|----------|-------|------------------------|
| **Navy Blue** | `#003366` | Primary brand color, header, footer, navigation | `--color-primary` |
| **Medium Blue** | `#00509e` | Hover states, active navigation items | `--color-primary-hover` |
| **Sky Blue** | `#61b9ef` | Accent links, Instagram hover, light accents | `--color-accent-blue` |
| **Gold** | `#edba68` | Timeline years, special accents, awards | `--color-accent-gold` |

### Neutral Colors

| Color Name | Hex Code | Usage | CSS Variable Suggestion |
|------------|----------|-------|------------------------|
| **Off-White** | `#f9f9f9` | Page background, light sections | `--color-background` |
| **Dark Gray** | `#333333` | Primary text color | `--color-text-primary` |
| **Blue Gray** | `#2c3e50` | Heading text, darker emphasis | `--color-text-heading` |
| **Light Gray** | `#e0e0e0` | Borders, table lines, subtle dividers | `--color-border` |
| **Medium Gray** | `#777777` | Border accents (calendar, etc.) | `--color-border-dark` |

### Overlay Colors

| Color Name | RGBA Value | Usage |
|------------|------------|-------|
| **Navy Overlay (Strong)** | `rgba(0, 51, 102, 0.8)` | Hero sections, strong background overlays |
| **Navy Overlay (Medium)** | `rgba(0, 30, 95, 0.65)` | Philanthropy hero overlay |
| **Navy Card** | `rgba(0, 36, 72, 0.6)` | Award cards, dark background cards |
| **Navy Card (Light)** | `rgba(0, 36, 72, 0.45)` | Brother of the Month cards |
| **White Overlay** | `rgba(255, 255, 255, 0.6)` | Glass morphism cards, light overlays |
| **White Border** | `rgba(255, 255, 255, 0.4)` | Glass morphism borders |
| **White Separator** | `rgba(255, 255, 255, 0.2)` | Menu item separators (mobile) |

### Button Colors

| Purpose | Background | Hover | Usage |
|---------|-----------|-------|-------|
| **Primary Button** | `#007bff` (blue) | `#0056b3` | General call-to-action buttons |
| **Custom Buttons** | Via `--bg` CSS variable | Via `--hover-bg` CSS variable | Customizable donation/action buttons |

---

## Typography

### Font Families

```css
/* Loaded from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
```

### Typography System

| Element | Font Family | Size | Weight | Usage |
|---------|-------------|------|--------|-------|
| **Body Text** | System font stack* | `1.2rem` | 400 | All body content |
| **Large Headings (h1)** | 'Bebas Neue', serif | `2.2rem` - `3.5rem` | Normal | Page titles, major sections |
| **Medium Headings (h2)** | 'Bebas Neue', serif | `1.7rem` - `3.5rem` | Normal | Section titles |
| **Navigation Links** | 'Bebas Neue', serif | `1.5rem` | Normal | Header navigation |
| **Instagram Link** | 'Bebas Neue', serif | `1.4rem` | Normal | Social media links |
| **Special Quotes** | 'Playfair Display', serif | `1.1rem` - `1.2rem` | 700 | Emphasized quotes on home page |
| **Buttons** | Arial, Helvetica, sans-serif | `1.1rem` | Normal | Button text |
| **Code** | source-code-pro, Menlo, Monaco, Consolas | - | - | Code snippets (if any) |

*System font stack:
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

### Text Properties

```css
/* Body defaults */
body {
  font-size: 1.2rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Responsive Typography

```css
/* Use clamp() for fluid scaling */
font-size: clamp(1.1rem, 2vw, 1.2rem); /* Example from important-quote */
```

---

## Spacing & Layout

### Spacing Scale

| Size Name | Value | Usage |
|-----------|-------|-------|
| **XS** | `5px` | Tight gaps, minimal spacing |
| **SM** | `10px` | Small gaps, footer padding (mobile) |
| **MD** | `15px` - `20px` | Standard gaps, section padding |
| **LG** | `24px` | Navigation gaps, button padding |
| **XL** | `40px` - `60px` | Section padding, large gaps |
| **2XL** | `80px` | Hero section vertical padding |

### Layout Widths

| Container | Max Width | Usage |
|-----------|-----------|-------|
| **Narrow** | `800px` | Awards content, recruitment schedule |
| **Medium** | `900px` | Members page, philanthropy overlay text |
| **Wide** | `1200px` | Donation page main content |
| **Full** | `100vw` | Videos, full-width sections |

### Border Radius

**Recommended standardization**: Use `8px` as the default

| Current Usage | Value | Elements |
|---------------|-------|----------|
| Standard | `6px` | Header links, buttons |
| Medium | `8px` | Images, cards, philanthropy hero |
| Large | `10px` | BOTM cards |
| XL | `12px` | Recruitment events, questions section |

### Flexbox Patterns

#### Common Flex Layouts

```css
/* Two-column layout (40/60 split) */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.left { flex: 0 0 calc(40% - 20px); }
.right { flex: 0 0 calc(60% - 20px); }

/* Centered content */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive column that stacks */
@media (max-width: 768px) {
  .left, .right {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
```

---

## Components

### Buttons

#### Base Button Style

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

#### Usage Examples

```jsx
/* Custom colored button */
<button
  className="btn"
  style={{ '--bg': '#28a745', '--hover-bg': '#218838' }}
>
  Donate Now
</button>
```

### Navigation Links

```css
nav ul a {
  font-family: 'Bebas Neue', serif;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  padding: 8px 18px;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease, text-decoration 0.2s ease;
}

nav ul a:hover {
  background-color: #00509e;
  text-decoration: underline;
}

nav ul a.active {
  background-color: #00509e;
}
```

### Cards

#### Glass Morphism Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  padding: 16px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

#### Dark Card (Awards/Special Content)

```css
.dark-card {
  background: rgba(0, 36, 72, 0.6);
  padding: 20px;
  border-radius: 8px;
  color: #fff;
}
```

### Tables

```css
.member-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.member-table th,
.member-table td {
  border: 1px solid #e0e0e0;
  padding: 0.75rem;
  text-align: left;
  font-size: 1rem;
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

### Timeline (Awards)

```css
.timeline-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.timeline-year {
  font-family: 'Bebas Neue', serif;
  font-size: 1.5rem;
  color: #edba68; /* Gold accent */
  min-width: 60px;
}

.timeline-toggle {
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

## Visual Effects

### Transitions

**Standard timing**: `0.3s ease` for most interactions

```css
/* Common transition patterns */
transition: background-color 0.3s ease;
transition: transform 0.2s ease;
transition: box-shadow 0.3s ease;
transition: opacity 0.1s ease;

/* Multi-property transitions */
transition: background-color 0.3s ease, transform 0.2s ease, text-decoration 0.2s ease;
```

### Shadows

```css
/* Header shadow */
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

/* Mobile menu shadow */
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

/* Card hover shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

/* BOTM card shadow */
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
```

### Animations

```css
/* Fade-slide animation (Awards timeline) */
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

.timeline-item {
  animation: fade-slide 0.6s ease both;
}

/* Menu rotation (mobile) */
.menuBtn-wrapper.open {
  transform: rotate(180deg);
  transition: transform 0.1s ease;
}

/* Menu slide-in (mobile) */
.menuItems {
  transform: translateY(-20px);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.menuItems.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}
```

### Background Images & Overlays

#### Hero Section Pattern

```css
.hero-section {
  position: relative;
  background: url('path/to/image.jpg') center/cover no-repeat;
  padding: 60px 20px;
}

/* Dark overlay */
.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 30, 95, 0.65);
  z-index: 1;
}

/* Content on top of overlay */
.hero-overlay {
  position: relative;
  z-index: 2;
  color: #fff;
}
```

#### Fixed Background (Parallax Effect)

```css
.awards-section {
  background:
    linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.8)),
    url('/path/to/image.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Creates parallax effect */
}
```

### Glass Morphism (Frosted Glass Effect)

```css
.glass-element {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
}
```

---

## Responsive Design

### Breakpoints

**Primary breakpoint**: `768px` (mobile/tablet vs desktop)

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Adjustments for mobile */
}

/* Desktop enhancements */
@media (min-width: 768px) {
  /* Desktop-specific layouts */
}
```

### Responsive Patterns

#### Mobile Navigation

```css
/* Hide hamburger menu on desktop */
.menuBtn {
  display: none;
}

/* Show on mobile */
@media (max-width: 768px) {
  .menuBtn {
    display: block;
  }

  /* Dropdown menu */
  .menuItems {
    position: absolute;
    flex-direction: column;
    background-color: #003366;
    width: 200px;
    border-radius: 5px;
  }
}
```

#### Stacking Layouts

```css
/* Desktop: side-by-side */
.content-container {
  display: flex;
  gap: 20px;
}

/* Mobile: stacked */
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }
}
```

#### Font Size Adjustments

```css
/* Desktop */
nav ul a {
  font-size: 1.5rem;
}

/* Mobile */
@media (max-width: 768px) {
  nav ul a {
    font-size: 1.2rem;
  }
}
```

### Accessibility: Reduced Motion

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: no-preference) {
  .animated-element {
    transition: transform 0.3s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

---

## Known Inconsistencies

> These areas could benefit from standardization in future updates:

### 1. Border Radius
- **Current**: 6px, 8px, 10px, 12px used throughout
- **Recommendation**: Standardize to 8px for most elements, 12px for large cards

### 2. Font Loading
- **Issue**: Roboto and Poppins are loaded but not consistently used
- **Recommendation**:
  - Keep: Bebas Neue (headings), Playfair Display (quotes)
  - Remove unused: Roboto, Poppins (or define their purpose)

### 3. Button Font Family
- **Current**: Buttons use `Arial, Helvetica, sans-serif`
- **Context**: Body uses system fonts
- **Recommendation**: Unify to system font stack for consistency

### 4. Heading Sizes
- **Issue**: h1 ranges from 2.2rem to 3.5rem, h2 from 1.7rem to 3.5rem
- **Recommendation**: Define clear hierarchy:
  - h1: 2.5rem (mobile) to 3.5rem (desktop)
  - h2: 1.8rem (mobile) to 2.5rem (desktop)
  - h3: 1.5rem to 2rem

### 5. Spacing Values
- **Current**: Many arbitrary values (5px, 10px, 12px, 15px, 16px, 18px, 20px, 24px, etc.)
- **Recommendation**: Create spacing scale:
  - XS: 4px
  - SM: 8px
  - MD: 16px
  - LG: 24px
  - XL: 40px
  - 2XL: 64px

### 6. Shadow Definitions
- **Current**: Shadows defined inline with varying values
- **Recommendation**: Create reusable shadow utilities:
  - `--shadow-sm`: `0 2px 4px rgba(0, 0, 0, 0.1)`
  - `--shadow-md`: `0 4px 12px rgba(0, 0, 0, 0.1)`
  - `--shadow-lg`: `0 8px 20px rgba(0, 0, 0, 0.2)`

---

## Future Recommendations

### CSS Custom Properties

Consider centralizing the design system with CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #003366;
  --color-primary-hover: #00509e;
  --color-accent-blue: #61b9ef;
  --color-accent-gold: #edba68;
  --color-background: #f9f9f9;
  --color-text-primary: #333333;
  --color-text-heading: #2c3e50;
  --color-border: #e0e0e0;

  /* Typography */
  --font-heading: 'Bebas Neue', serif;
  --font-quote: 'Playfair Display', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
  --spacing-2xl: 64px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.2);

  /* Transitions */
  --transition-fast: 0.1s ease;
  --transition-normal: 0.3s ease;
}
```

### Component Library

Consider extracting reusable components:
- `<Button>` with variant props (primary, secondary, etc.)
- `<Card>` with style variants (glass, dark)
- `<Hero>` with configurable background and overlay
- `<Timeline>` for award listings

### Accessibility Checklist
- ✅ Reduced motion preferences respected (partially)
- ✅ Semantic HTML structure
- ⚠️ Color contrast ratios (verify light text on dark overlays)
- ⚠️ Focus states on interactive elements (add if missing)
- ⚠️ ARIA labels for icon buttons (hamburger menu)

---

## Quick Reference

### Brand Colors
```
Primary Navy: #003366
Hover Blue: #00509e
Accent Blue: #61b9ef
Gold: #edba68
```

### Typography Stack
```
Headings: 'Bebas Neue', serif
Body: System fonts
Quotes: 'Playfair Display', serif
```

### Common Measurements
```
Max widths: 800px, 900px, 1200px
Border radius: 6-12px
Transitions: 0.3s ease
Mobile breakpoint: 768px
```

---

**Last Updated**: February 2026
**Version**: 1.0.0

For questions or suggestions about the design system, contact the development team.
