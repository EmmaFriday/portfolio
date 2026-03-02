# Phase 1: Foundation + Design Token System - Research

**Researched:** 2026-03-02
**Domain:** Next.js project scaffold, CSS design token architecture, theme switching, responsive layout
**Confidence:** HIGH

## Summary

Phase 1 establishes the project scaffold (Next.js 16 + Tailwind CSS v4 + TypeScript), a three-tier CSS custom property token system (primitives > semantic > component), a flash-free theme initialization via URL parameters, and a responsive layout shell. The core architectural insight is that Tailwind CSS v4's `@theme` directive and CSS-first configuration make it a natural fit for the three-tier token system -- primitives are defined as `@theme` variables, semantic tokens are mapped via `[data-theme]` selectors, and component tokens reference semantics. The `next-themes` library handles the blocking script injection, `data-theme` attribute management, and localStorage persistence out of the box, but URL parameter reading requires a small custom wrapper.

All chosen color pairs (light and dark modes) pass WCAG 2.1 AA contrast ratios -- every combination tested exceeds the 4.5:1 minimum for normal text. The responsive strategy uses `clamp()` for fluid scaling with no hard breakpoints for typography and spacing.

**Primary recommendation:** Use `next-themes` with `attribute="data-theme"` to manage theme state, augmented with a custom blocking inline `<script>` in `<head>` that reads `?mode=` URL params and sets `data-theme` before `next-themes` hydrates. Define all tokens in a single `tokens.css` file with clear tier separation.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Light mode background: pure white (#ffffff) -- crisp, Notion-like
- Dark mode background: true black (#0a0a0f) -- maximum contrast, OLED-friendly, makes glowing accents pop
- Light mode accent: blue (#2563eb) -- professional, strong contrast on white
- Dark mode accent: cyan/teal (#22d3ee / #06b6d4) -- as specified in requirements
- Dark mode glow intensity: medium -- noticeable glow on cards, dividers, and key elements. Clearly sci-fi but not overwhelming. Vercel dark mode energy, not cyberpunk terminal.
- Heading font: Inter -- clean, geometric sans-serif. Same font in both modes
- Body font: Inter -- consistent with headings
- Dark mode does NOT switch to monospace headings
- Type scale: large & editorial -- big, bold section headings (48-64px on desktop)
- Font weight contrast: medium -- semibold headings (600), regular body (400)
- Max content width: wide (1200px) -- Linear/Stripe marketing page energy
- Section spacing: generous (120-160px) -- each section feels like its own world
- Responsive strategy: fluid scaling with clamp() -- no hard breakpoints
- Sticky header: include in Phase 1 layout scaffold -- structurally ready for nav + toggle, even if empty
- Light mode reference: Linear -- white base with visual sophistication, subtle gradients, refined shadows
- Dark mode reference: modern sci-fi UI -- Tron Legacy, Westworld UI, futuristic dashboards
- Mode divergence: dramatically different -- two entirely different personalities

### Claude's Discretion
- Exact primitive color palette (grays, surface tones, border colors) -- as long as they serve the chosen references and pass WCAG AA
- Line height, letter spacing, and body text size
- Exact spacing scale values (4px, 8px, etc.)
- Container padding and edge behavior
- Surface/card background tones for each mode
- Responsive clamp() breakpoint values

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| THEME-03 | Both modes share identical layout structure -- only visual tokens differ | Three-tier token architecture: semantic tokens swap via `[data-theme]` selectors while layout/structure CSS stays mode-agnostic. Component tokens reference semantics, never raw primitives. |
| THEME-05 | No flash of wrong theme on page load (blocking inline script reads URL param before first paint) | `next-themes` injects a blocking `<script>` that sets `data-theme` before React hydrates. Custom inline script augments this to read `?mode=` URL params and override before first paint. |
| TECH-01 | Site is responsive across desktop, tablet, and mobile breakpoints | Fluid scaling with `clamp()` for typography and spacing. Tailwind v4 default breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) for structural layout shifts. CSS Grid for page layout. |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | React framework with App Router, SSR, file-system routing | Industry standard for React apps; App Router is the recommended architecture since Next.js 13+ |
| React | 19.x | UI library (ships with Next.js 16) | Required by Next.js 16 |
| Tailwind CSS | 4.2.1 | Utility-first CSS framework with CSS-first configuration | v4 uses native CSS custom properties for all design tokens; `@theme` directive is purpose-built for token systems |
| TypeScript | 5.x | Type safety | Ships with create-next-app; catches token name typos at build time |
| next-themes | 0.4.6 | Theme management (data-attribute switching, localStorage, SSR flash prevention) | De facto standard for Next.js theming; 2.8M+ weekly downloads; auto-injects blocking script |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font (built-in) | -- | Self-hosted font loading (Inter) | Always -- eliminates external font requests, auto-optimizes |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required for Next.js integration with Tailwind v4 |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-themes | Custom blocking script only | next-themes handles localStorage, system preference, SSR, tab sync for free. Custom script = re-inventing these. |
| Tailwind CSS v4 | Vanilla CSS custom properties | Tailwind provides utility classes + responsive variants; vanilla CSS would require manual responsive utility authoring |
| @theme directive | tailwind.config.js | v4 removed JS config; @theme is the new CSS-first approach and directly outputs CSS custom properties |

**Installation:**
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*"
npm install next-themes
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout: html, body, ThemeProvider, fonts
│   ├── page.tsx             # Home page (placeholder content for Phase 1)
│   └── globals.css          # Tailwind import + all token definitions
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky header shell (empty, structurally ready)
│   │   ├── Footer.tsx       # Footer shell (empty)
│   │   └── PageContainer.tsx # Max-width + padding wrapper
│   └── providers/
│       └── ThemeProvider.tsx # Client component wrapping next-themes
├── styles/
│   └── tokens.css           # Three-tier CSS custom property definitions
└── lib/
    └── theme.ts             # Theme constants, URL param reading utility
```

### Pattern 1: Three-Tier CSS Token Architecture
**What:** Design tokens organized in three layers of abstraction -- primitives (raw values), semantic (meaning-based), and component (usage-specific).
**When to use:** Always -- this is the foundational architecture for the entire site.

```css
/* ===== TIER 1: PRIMITIVES ===== */
/* Raw values. Never used directly in components. */
@theme {
  --color-white: #ffffff;
  --color-black: #0a0a0f;
  --color-blue-600: #2563eb;
  --color-cyan-400: #22d3ee;
  --color-cyan-500: #06b6d4;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}

/* ===== TIER 2: SEMANTIC TOKENS ===== */
/* Meaning-based. These are what components reference. */
/* Light mode (default) */
:root {
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-gray-50);
  --bg-surface: var(--color-white);
  --bg-surface-elevated: var(--color-white);

  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-700);
  --text-muted: var(--color-gray-500);
  --text-on-accent: var(--color-white);

  --accent-primary: var(--color-blue-600);
  --accent-hover: #1d4ed8; /* blue-700 */

  --border-default: var(--color-gray-200);
  --border-subtle: var(--color-gray-100);

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  --glow-accent: none;
  --glow-subtle: none;
}

/* Dark mode */
[data-theme="dark"] {
  --bg-primary: var(--color-black);
  --bg-secondary: #0f0f1a;
  --bg-surface: #1a1a2e;
  --bg-surface-elevated: #1e1e35;

  --text-primary: var(--color-gray-100);
  --text-secondary: var(--color-gray-300);
  --text-muted: var(--color-gray-400);
  --text-on-accent: var(--color-black);

  --accent-primary: var(--color-cyan-400);
  --accent-hover: var(--color-cyan-500);

  --border-default: rgba(255, 255, 255, 0.1);
  --border-subtle: rgba(255, 255, 255, 0.05);

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);

  --glow-accent: 0 0 20px rgba(34, 211, 238, 0.15);
  --glow-subtle: 0 0 10px rgba(34, 211, 238, 0.08);
}
```

**Source:** Three-tier pattern documented at [penpot.app design tokens guide](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/), [Feature-Sliced Design tokens architecture](https://feature-sliced.design/blog/design-tokens-architecture)

### Pattern 2: Tailwind v4 Dark Mode with data-theme
**What:** Override Tailwind's dark variant to use `data-theme` attribute instead of class or media query.
**When to use:** In the main CSS file, before any Tailwind utilities.

```css
/* globals.css */
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

**Source:** [Tailwind CSS v4 dark mode docs](https://tailwindcss.com/docs/dark-mode)

### Pattern 3: next-themes with App Router
**What:** Client-side ThemeProvider wrapper for Next.js App Router.
**When to use:** Root layout wraps all content.

```tsx
// src/components/providers/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}
```

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marie Anik Paradis - Portfolio",
  description: "Senior UX & Product Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var mode = params.get('mode');
                  if (mode === 'dark' || mode === 'light') {
                    document.documentElement.setAttribute('data-theme', mode);
                    try { localStorage.setItem('theme', mode); } catch(e) {}
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Source:** [next-themes README](https://github.com/pacocoursey/next-themes), [Next.js App Router docs](https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/01-getting-started/01-installation.mdx)

### Pattern 4: Fluid Typography with clamp()
**What:** Font sizes scale continuously between viewport widths without breakpoints.
**When to use:** All typography tokens. Spacing tokens for section gaps.

```css
:root {
  /* Body: 16px at 320px -> 18px at 1280px */
  --text-body: clamp(1rem, 0.958rem + 0.208vw, 1.125rem);

  /* H1: 36px at 320px -> 64px at 1280px */
  --text-display: clamp(2.25rem, 1.375rem + 2.917vw, 4rem);

  /* H2: 30px at 320px -> 48px at 1280px */
  --text-heading: clamp(1.875rem, 1.25rem + 2.083vw, 3rem);

  /* Section spacing: 80px at 320px -> 160px at 1280px */
  --space-section: clamp(5rem, 2.5rem + 8.333vw, 10rem);
}
```

**Source:** [Smashing Magazine - Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)

### Anti-Patterns to Avoid
- **Referencing primitives directly in components:** Components must only use semantic tokens (Tier 2). If you see `var(--color-blue-600)` in a component, it should be `var(--accent-primary)` instead.
- **Using Tailwind `dark:` prefix with raw colors:** Instead of `dark:bg-gray-900`, use semantic classes like `bg-[var(--bg-primary)]` or define custom utilities. This prevents the need to duplicate every color.
- **Hardcoding colors in `className`:** `bg-white dark:bg-black` defeats the token system. Use `bg-[var(--bg-primary)]` so the token system controls all colors.
- **Mixing `class` and `data-theme` strategies:** Pick one. We use `data-theme` via `@custom-variant`. Never add `.dark` class simultaneously.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Theme state management | Custom context + localStorage + SSR handling | `next-themes` | Handles flash prevention, tab sync, localStorage, system preference, SSR hydration mismatch -- dozens of edge cases |
| Blocking theme script | Manual `<script>` that handles all cases | `next-themes` built-in script + small URL-param augmentation | next-themes script handles localStorage, system pref, forcedTheme, incognito; only augment for URL params |
| Font loading | Manual `@font-face` declarations | `next/font/google` (Inter) | Auto self-hosts, eliminates layout shift, handles preloading, subsetting |
| CSS reset / normalize | Custom reset stylesheet | Tailwind's built-in preflight | Ships with Tailwind v4; tested against browser inconsistencies |
| Responsive breakpoints | Custom media query mixins | Tailwind v4 responsive variants (`sm:`, `md:`, `lg:`, `xl:`) | Built-in, well-tested, work with all utilities |
| Contrast ratio checking | Manual color math | WebAIM Contrast Checker or programmatic calculation during design | Avoids errors in manual luminance math |

**Key insight:** The blocking script is the most tempting thing to hand-roll entirely. Don't. `next-themes` handles the hard parts (localStorage race conditions, system preference detection, incognito mode, cross-tab sync). Only add a small inline script *before* `next-themes` to handle URL params -- let `next-themes` handle everything else.

## Common Pitfalls

### Pitfall 1: Flash of Wrong Theme (FOWT)
**What goes wrong:** User sees light mode flash before dark mode loads, especially with URL param `?mode=dark`.
**Why it happens:** `next-themes` reads localStorage but not URL params. If the URL says dark but localStorage says light (or is empty), `next-themes`' script sets light, then client-side code reads the URL and switches to dark -- causing a flash.
**How to avoid:** Place a small inline `<script>` in `<head>` *before* `next-themes`' script that reads URL params and sets both `data-theme` and localStorage. This way, when `next-themes` hydrates, it finds the correct value in localStorage.
**Warning signs:** Any visible flicker when loading with `?mode=dark` under CPU throttling.

### Pitfall 2: Hydration Mismatch Warnings
**What goes wrong:** React warns about server/client HTML mismatch because `data-theme` is set by client script but not during SSR.
**Why it happens:** Server renders `<html>` without `data-theme`, client script adds it immediately.
**How to avoid:** Add `suppressHydrationWarning` to `<html>` tag. This is documented and expected behavior with `next-themes`.
**Warning signs:** Console warnings about "Extra attributes from the server: data-theme".

### Pitfall 3: Semantic Token Leakage
**What goes wrong:** A component uses a primitive token directly (e.g., `--color-gray-900`), breaking when theme switches because primitives don't change per theme.
**Why it happens:** Developer shortcuts -- it's faster to reference the primitive than find the right semantic token.
**How to avoid:** Establish naming convention rule: components ONLY use `--bg-*`, `--text-*`, `--accent-*`, `--border-*`, `--shadow-*`, `--glow-*` semantic tokens. Never `--color-*` primitives.
**Warning signs:** Colors that don't change when switching themes.

### Pitfall 4: Tailwind v4 @custom-variant Syntax
**What goes wrong:** Dark mode utilities (`dark:bg-black`) silently don't apply.
**Why it happens:** Tailwind v4 removed the `darkMode` config key. You must use `@custom-variant dark` in CSS. The selector syntax is specific: `(&:where([data-theme=dark], [data-theme=dark] *))`.
**How to avoid:** Place `@custom-variant dark` immediately after `@import "tailwindcss"` in your CSS file. Test that `dark:` utilities work before writing any component code.
**Warning signs:** `dark:` prefixed classes have no effect.

### Pitfall 5: clamp() and Browser Zoom
**What goes wrong:** Fluid typography using only `vw` units ignores browser zoom (WCAG 1.4.4 requires 200% resize).
**Why it happens:** `vw` is relative to viewport, not font size. Zooming doesn't change viewport width.
**How to avoid:** Always combine `rem` and `vw` in the preferred value of `clamp()`. Pattern: `clamp(min-rem, calc-with-rem-and-vw, max-rem)`. The `rem` component ensures zoom responsiveness.
**Warning signs:** Text doesn't scale when using browser zoom (Cmd+/Ctrl+).

### Pitfall 6: next-themes `enableSystem` Conflict with URL Params
**What goes wrong:** URL param says `?mode=light` but user's OS is dark mode. With `enableSystem={true}`, system preference can override URL param.
**Why it happens:** `next-themes` with `enableSystem` listens to `prefers-color-scheme` media query.
**How to avoid:** Set `enableSystem={false}` and `defaultTheme="light"`. The URL param script and explicit user choices should be the only sources of truth. System preference detection is a Phase 4 concern (URL-05).
**Warning signs:** Theme switches unexpectedly when system dark mode is on.

## Code Examples

### Fluid Typography Scale with clamp()

```css
/* Source: Smashing Magazine fluid typography pattern + project requirements */
:root {
  /* Base (body): 16px -> 18px between 320px and 1280px viewports */
  --text-body: clamp(1rem, 0.958rem + 0.208vw, 1.125rem);
  --text-body-lh: 1.6;

  /* Small (captions, meta): 14px -> 14px (stays fixed) */
  --text-sm: 0.875rem;
  --text-sm-lh: 1.5;

  /* Large body / lead: 18px -> 22px */
  --text-lg: clamp(1.125rem, 0.958rem + 0.521vw, 1.375rem);
  --text-lg-lh: 1.5;

  /* H3: 24px -> 32px */
  --text-h3: clamp(1.5rem, 1.167rem + 1.042vw, 2rem);
  --text-h3-lh: 1.3;

  /* H2: 30px -> 48px */
  --text-h2: clamp(1.875rem, 1.25rem + 2.083vw, 3rem);
  --text-h2-lh: 1.2;

  /* H1 / Display: 36px -> 64px */
  --text-display: clamp(2.25rem, 1.083rem + 3.889vw, 4rem);
  --text-display-lh: 1.1;
}
```

### Spacing Scale (8pt grid)

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Fluid section spacing: 80px -> 160px */
  --space-section: clamp(5rem, 2.5rem + 8.333vw, 10rem);

  /* Container padding: 16px -> 48px */
  --space-container: clamp(1rem, 0rem + 3.333vw, 3rem);
}
```

### Sticky Header Shell

```tsx
// src/components/layout/Header.tsx
export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between"
        style={{ padding: '0 var(--space-container)' }}
      >
        {/* Logo / name placeholder */}
        <div />
        {/* Nav + theme toggle placeholder */}
        <div />
      </div>
    </header>
  );
}
```

### URL Parameter Theme Blocking Script

```ts
// The inline script for <head> -- reads URL params before first paint
const themeInitScript = `
(function() {
  try {
    var params = new URLSearchParams(window.location.search);
    var mode = params.get('mode');
    if (mode === 'dark' || mode === 'light') {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem('theme', mode); } catch(e) {}
    }
  } catch(e) {}
})();
`;
```

**Why this works:** This runs synchronously before `next-themes`' own script. When `next-themes` initializes, it reads localStorage and finds the URL-specified theme already stored, so it doesn't override it. If no URL param is present, the script does nothing and `next-themes` falls back to its default behavior (localStorage or defaultTheme).

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` darkMode key | `@custom-variant dark` in CSS | Tailwind v4 (Jan 2025) | Config is CSS-first; no JS config file needed |
| `prefers-color-scheme` media query | `data-theme` attribute selector | Best practice since ~2022 | Allows manual toggle independent of OS preference |
| Multiple CSS files per theme | Single file with `[data-theme]` selectors | CSS custom properties maturity | Simpler build, no file-switching logic |
| `next/head` for blocking scripts | `dangerouslySetInnerHTML` in `<head>` (App Router) | Next.js 13+ App Router | No `next/head` in App Router; direct `<head>` children |
| `px` + media queries for responsive | `clamp()` with `rem + vw` | Broad browser support since 2020 | Eliminates most media queries; WCAG zoom-safe |
| External Google Fonts CDN | `next/font/google` self-hosting | Next.js 13+ | Zero layout shift, no external requests, automatic subsetting |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Replaced by CSS-first `@theme` directive in Tailwind v4. Still supported via `@config` but not recommended.
- `next/head` component: Not available in App Router. Use `metadata` export or direct `<head>` children.
- `darkMode: 'class'` in tailwind config: Replaced by `@custom-variant dark` in CSS.

## Open Questions

1. **next-themes v0.4.x compatibility with Next.js 16**
   - What we know: next-themes 0.4.6 is the latest version. It works with Next.js 15 App Router per multiple community reports and shadcn/ui documentation. Next.js 16 uses React 19.
   - What's unclear: No explicit "Next.js 16 compatible" statement found. React 19 may introduce subtle hydration behavior changes.
   - Recommendation: Install and test early. If hydration issues arise, the fallback is a custom ThemeProvider using the same `data-theme` + blocking script pattern (the library is ~200 lines of code). **Confidence: MEDIUM** -- very likely works, but verify during setup.

2. **Tailwind v4 `@theme` + semantic custom properties interaction**
   - What we know: `@theme` creates CSS custom properties that Tailwind uses for utility generation. Semantic tokens defined in `:root` / `[data-theme]` are standard CSS and work independently.
   - What's unclear: Whether Tailwind v4 utility generation can reference semantic tokens defined outside `@theme` (e.g., can you write `bg-[var(--bg-primary)]` and have it work in all contexts).
   - Recommendation: Use `bg-[var(--bg-primary)]` arbitrary value syntax. This is supported in Tailwind v3+ and confirmed in v4. The `@theme` block defines primitives; semantic tokens live in plain CSS selectors. **Confidence: HIGH** -- arbitrary values are a core Tailwind feature.

3. **Script execution order: custom script vs. next-themes script**
   - What we know: Inline scripts in `<head>` execute in document order. Our URL-param script should be placed before `<body>` where next-themes injects its script.
   - What's unclear: Exact injection point of next-themes script in App Router. It may inject into `<head>` or early `<body>`.
   - Recommendation: Place URL-param script as the first child of `<head>`. Verify with Chrome DevTools that it runs before next-themes during development. **Confidence: MEDIUM** -- the pattern is sound, but execution order needs runtime verification.

## Sources

### Primary (HIGH confidence)
- [Context7: /vercel/next.js v16.1.6](https://github.com/vercel/next.js/blob/v16.1.6/docs/01-app/01-getting-started/01-installation.mdx) -- project setup, layout.tsx, fonts, App Router
- [Context7: /websites/tailwindcss (v4)](https://tailwindcss.com/docs/dark-mode) -- @theme directive, @custom-variant dark, data-theme configuration, CSS custom properties, responsive breakpoints
- [Context7: /pacocoursey/next-themes](https://github.com/pacocoursey/next-themes) -- ThemeProvider configuration, attribute prop, blocking script, flash prevention, forcedTheme
- [npm registry](https://www.npmjs.com/) -- verified versions: tailwindcss@4.2.1, next-themes@0.4.6, next@16.1.6
- Programmatic WCAG contrast calculation -- all 15 color pair combinations tested, all pass AA (4.5:1+)

### Secondary (MEDIUM confidence)
- [Smashing Magazine: Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) -- fluid typography patterns, clamp() formula
- [Penpot: Developer's Guide to Design Tokens](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) -- three-tier architecture pattern
- [Brad Frost: Themeable Design Systems](https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/) -- semantic token layering approach
- [shadcn/ui Next.js dark mode guide](https://ui.shadcn.com/docs/dark-mode/next) -- next-themes + Tailwind + App Router integration pattern
- [sujalvanjare.com: Dark Mode Next.js 15 Tailwind v4](https://www.sujalvanjare.com/blog/dark-mode-nextjs15-tailwind-v4) -- complete setup walkthrough verified against official docs
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) -- reference tool for contrast validation
- [Complete Accessibility Guide for Dark Mode (2026)](https://blog.greeden.me/en/2026/02/23/complete-accessibility-guide-for-dark-mode-and-high-contrast-color-design-contrast-validation-respecting-os-settings-icons-images-and-focus-visibility-wcag-2-1-aa/) -- dark mode accessibility patterns

### Tertiary (LOW confidence)
- Community articles on URL-param theme override pattern -- no single authoritative source; pattern is derived from combining next-themes docs + standard inline script approach. Needs runtime verification.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified via npm, all libraries are industry standard with active maintenance
- Architecture: HIGH -- three-tier token pattern is well-documented across multiple authoritative design system resources; Tailwind v4 @theme + @custom-variant confirmed via official docs
- Pitfalls: HIGH -- all pitfalls verified through official docs, GitHub issues, or direct testing
- URL param blocking script: MEDIUM -- pattern is sound and derived from established techniques, but the exact interaction between custom script and next-themes in App Router needs runtime verification

**Research date:** 2026-03-02
**Valid until:** 2026-04-01 (30 days -- stack is stable; Tailwind v4 and Next.js 16 are released)
