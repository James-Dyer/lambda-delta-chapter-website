# Lambda Delta Chapter - Design System Documentation

Welcome to the design system documentation for the UC Merced Sigma Chi Lambda Delta Chapter website. This documentation was created by analyzing the existing codebase to capture the intended design patterns and provide a foundation for consistent future development.

## 📚 Documentation Files

### 1. [STYLE_GUIDE.md](./STYLE_GUIDE.md)
**Comprehensive design system reference**

This is your primary reference for understanding the design system. It includes:
- 🎨 Complete color palette with hex codes and usage guidelines
- ✍️ Typography system (fonts, sizes, weights, line heights)
- 📏 Spacing scale and layout patterns
- 🧩 Component styles (buttons, cards, tables, timelines)
- ✨ Visual effects (shadows, transitions, animations)
- 📱 Responsive design patterns and breakpoints
- ⚠️ Known inconsistencies to be aware of
- 🚀 Recommendations for future improvements

**When to use**: Reference this when designing new features, choosing colors, or making styling decisions.

### 2. [design-tokens.css](./src/styles/design-tokens.css)
**CSS custom properties (variables)**

A ready-to-use CSS file containing all design values as reusable variables:
- Color variables (e.g., `--color-primary`, `--color-accent-gold`)
- Typography variables (e.g., `--font-heading`, `--font-size-h1`)
- Spacing variables (e.g., `--spacing-md`, `--gap-large`)
- Shadow, border-radius, and transition variables
- Pre-defined animations

**How to use**:
```css
/* Import in your CSS file */
@import './styles/design-tokens.css';

/* Then use variables */
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: var(--transition-bg);
}
```

**When to use**: Import this file and use these variables when writing new CSS to ensure consistency.

### 3. [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
**Practical code examples**

Copy-paste ready code snippets for common patterns:
- Hero sections (various styles)
- Card components (glass morphism, dark cards, BOTM cards)
- Buttons (standard, custom colored, toggle buttons)
- Navigation (desktop, mobile hamburger menu)
- Tables and lists
- Timeline components
- Layout patterns (two-column, centered, full-width)

**When to use**: Reference this when building new features. Copy the patterns and adapt them to your needs.

---

## 🚀 Getting Started

### For New Developers

1. **Read the Style Guide** ([STYLE_GUIDE.md](./STYLE_GUIDE.md))
   - Understand the color palette and typography
   - Familiarize yourself with the design philosophy
   - Note the responsive breakpoint (768px)

2. **Import Design Tokens** (Optional but recommended)
   ```css
   /* In index.css or App.css */
   @import './styles/design-tokens.css';
   ```

3. **Reference Component Examples** ([COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md))
   - Use these patterns as starting points
   - Maintain consistency with existing components

### For Existing Developers

1. **Review inconsistencies** noted in [STYLE_GUIDE.md](./STYLE_GUIDE.md)
   - Consider gradually standardizing border-radius values
   - Remove unused font imports (Roboto, Poppins if not needed)

2. **Consider migrating to CSS variables** in [design-tokens.css](./src/styles/design-tokens.css)
   - Gradual migration is recommended
   - Start with new components or when refactoring existing ones

---

## 🎨 Quick Reference

### Brand Colors
```css
Primary Navy:     #003366
Hover Blue:       #00509e
Accent Sky Blue:  #61b9ef
Accent Gold:      #edba68
Background:       #f9f9f9
```

### Typography
```css
Headings:  'Bebas Neue', serif
Body:      System font stack
Quotes:    'Playfair Display', serif
```

### Key Measurements
```css
Max container widths:  800px, 900px, 1200px
Border radius:         6-12px (recommend standardizing to 8px)
Mobile breakpoint:     768px
Standard transitions:  0.3s ease
```

---

## 📝 Design Notes

### What This Documentation Captures

This documentation was created by analyzing the existing codebase and identifying patterns. It captures:
- ✅ Colors actually used throughout the site
- ✅ Typography choices and hierarchy
- ✅ Component patterns that appear multiple times
- ✅ Spacing and layout conventions
- ✅ Animation and interaction patterns

### Known Inconsistencies

The style guide documents several inconsistencies that exist in the current codebase:
- Multiple border-radius values (6px, 8px, 10px, 12px)
- Unused font imports (Roboto, Poppins)
- Varying heading sizes across different sections
- Inconsistent spacing values

These are **documented, not errors**. The site was designed organically and these variations emerged naturally. The documentation provides a path toward standardization if desired.

---

## 🔄 Maintaining Consistency

### When Adding New Features

1. **Colors**: Use the defined color palette from the style guide
   - Primary actions: `#003366` (navy)
   - Accents: `#61b9ef` (blue) or `#edba68` (gold)
   - Always use the documented overlay colors for hero sections

2. **Typography**: Follow the established hierarchy
   - Headings: Bebas Neue
   - Body: System fonts
   - Special quotes: Playfair Display

3. **Components**: Reference [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
   - Use glass morphism for modern, light cards
   - Use dark cards for special emphasis (awards, highlights)
   - Follow the established button patterns

4. **Responsive**: Always test at 768px breakpoint
   - Stack columns on mobile
   - Adjust font sizes appropriately
   - Test hamburger menu functionality

---

## 📦 File Structure

```
frontend/
├── STYLE_GUIDE.md              # Comprehensive design system reference
├── COMPONENT_EXAMPLES.md       # Code examples and patterns
├── DESIGN_SYSTEM_README.md     # This file (overview)
└── src/
    └── styles/
        ├── design-tokens.css   # CSS variables
        ├── header.css
        ├── footer.css
        ├── home/
        │   ├── home.css
        │   └── awards.css
        ├── donate/
        │   ├── donate.css
        │   ├── chapterDonate.css
        │   └── huntsmanDonate.css
        └── [other style files...]
```

---

## 🤝 Contributing

### Before Making Design Changes

1. Check if a pattern already exists in [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
2. Ensure your changes align with the color palette and typography in [STYLE_GUIDE.md](./STYLE_GUIDE.md)
3. Consider using CSS variables from [design-tokens.css](./src/styles/design-tokens.css)

### Updating This Documentation

If you introduce new patterns or significantly update existing ones:
1. Update [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md) with code examples
2. Update [STYLE_GUIDE.md](./STYLE_GUIDE.md) if you define new standards
3. Add new variables to [design-tokens.css](./src/styles/design-tokens.css) if appropriate

---

## 🎯 Goals of This Documentation

1. **Preserve the existing aesthetic** - Document what works well
2. **Enable consistency** - Provide clear patterns to follow
3. **Accelerate development** - Copy-paste ready examples
4. **Guide future improvements** - Identify areas for standardization
5. **Onboard new developers** - Comprehensive reference material

---

## ❓ Questions?

- **"Which document should I reference?"**
  - Design decisions → [STYLE_GUIDE.md](./STYLE_GUIDE.md)
  - Code examples → [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
  - Variables → [design-tokens.css](./src/styles/design-tokens.css)

- **"Should I fix the inconsistencies?"**
  - Not required, but you can gradually standardize
  - Prioritize consistency in new features
  - Consider refactoring when touching existing code

- **"Do I have to use design-tokens.css?"**
  - No, it's optional
  - But it makes maintenance easier long-term
  - Consider using it for new components

---

**Created**: February 2026
**Purpose**: Document existing design patterns to enable consistent future development
**Scope**: Covers entire Lambda Delta Chapter website design system

For questions or updates, contact the development team.
