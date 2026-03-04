# Phase 3: Dual-Mode Theming - Research

**Researched:** 2026-03-04
**Domain:** CSS theming, font loading, accessibility, interaction design
**Confidence:** HIGH

## Summary

This phase transforms the existing token-based theming foundation into two fully realized visual identities -- a portfolio-showcase light mode (Figtree + DM Sans, blue accent, white backgrounds) and a retro sci-fi dark mode (Space Grotesk + Geist Mono, teal palette, glow effects, scanline textures). The infrastructure is already well-positioned: the three-tier token system in `tokens.css` already has `[data-theme="dark"]` overrides, all components use semantic tokens via `var()`, and `next-themes` is wired up with `data-theme` attribute.

The primary technical challenges are: (1) loading four Google Fonts via `next/font/google` and switching font families per theme using CSS custom properties, (2) implementing the giselles.ai-style radial gradient border glow on cards using CSS pseudo-elements and `mask-composite`, (3) building a floating toggle as a Client Component that avoids hydration mismatch, and (4) ensuring both modes pass WCAG 2.1 AA with careful attention to teal/cyan contrast ratios on dark backgrounds.

**Primary recommendation:** Expand the existing token system with typography tokens that swap per theme, load all four fonts in `layout.tsx` as CSS variables, remove `disableTransitionOnChange` from ThemeProvider, and add CSS `transition` properties to the `body` and key elements for the ~300ms crossfade. The glow effect should use a pseudo-element approach with `radial-gradient` + `mask-composite` rather than simple `box-shadow`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Floating pill button with icon + text, positioned left-aligned just below the sticky header
- Stays fixed on scroll (always accessible)
- In light mode: shows "View Sci-Fi Mode" with a sci-fi icon (e.g., rocket or terminal)
- In dark mode: shows "Exit the Matrix" with a light-mode icon (e.g., sun or clean shape)
- Icon morphs and label fades in/out during the mode switch
- Light mode fonts: Figtree (headers, semibold 600) + DM Sans (body, 16px base)
- Dark mode fonts: Space Grotesk (headers) + Geist Mono (body, monospace)
- Light mode: All white backgrounds, generous spacing, blue (#2563eb) accent, 16px fixed body text
- Dark mode: Full teal gradient palette (deep teal surfaces, mid-teal borders, bright cyan glows)
- Giselles.ai-style radial gradient border glow on cards (faint at rest, brightens on hover, ~300ms transition, uses CSS radial gradients + mask-composite, not just box-shadow)
- Retro sci-fi touches: monospace labels for section headers/tags, corner bracket decorations on cards/panels, faint scanline or grid background texture overlay
- Smooth crossfade over ~300ms when switching modes -- everything transitions together
- Remove current `disableTransitionOnChange` setting
- Mobile toggle placement: Claude's discretion

### Claude's Discretion
- Mobile toggle placement and sizing
- Exact teal hex values (guided by the provided teal gradient image)
- Which sections break the grid in light mode (propose candidates, can be adjusted later)
- Scanline/grid texture opacity and pattern
- Corner bracket decoration style and which elements get them
- Toggle icon choices (rocket, terminal cursor, sun, etc.)
- Transition easing curve

### Deferred Ideas (OUT OF SCOPE)
- Per-company accent colors via URL params -- Phase 4
- Leva control panel for visitor-tweakable effects -- Future phase
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| THEME-01 | Site displays in light mode with clean, white, Notion-like aesthetic and current illustrated character | Font loading pattern (Figtree + DM Sans), token overhaul for typography, white background tokens already exist |
| THEME-02 | Site displays in dark mode with black background, teal/cyan accents, glowing effects, and sci-fi character placeholder | Teal palette tokens, glow pseudo-element technique, scanline CSS overlay, corner bracket decorations, Geist Mono + Space Grotesk fonts |
| THEME-04 | Theme toggle is visible in the header, styled as a designed interaction piece | Client Component with `useTheme` + hydration guard pattern, floating pill positioning below header, icon morphing approach |
| TECH-02 | Both modes pass WCAG 2.1 AA (4.5:1 contrast, keyboard nav, screen reader, focus indicators) | Contrast validation approach for teal palette, focus-visible styling, aria-label on toggle, screen reader announcements |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-themes | ^0.4.6 | Theme state management, `data-theme` attribute, `useTheme` hook | Already installed, handles SSR/hydration, attribute-based theming |
| next/font/google | (bundled with Next.js 16.1.6) | Load Figtree, DM Sans, Space Grotesk, Geist Mono as optimized variable fonts | Zero-layout-shift font loading, automatic self-hosting, CSS variable output |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | All glow effects, scanlines, transitions, and decorations are pure CSS |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/font/google for Geist Mono | `geist` npm package (`geist/font/mono`) | The `geist` package provides fuller glyph/feature support, but Geist Mono is now on Google Fonts with variable weight support -- `next/font/google` is simpler and consistent with the other three fonts |
| Pure CSS scanlines | WebGL CRT filter | Massive overkill for a subtle texture overlay; CSS repeating-linear-gradient is 2 lines |
| CSS transition for theme crossfade | View Transitions API | View Transitions is newer and not needed for simple property crossfades; CSS transitions on color/background-color are universally supported |

**Installation:**
```bash
# No new packages needed -- next-themes and next/font/google already available
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Load all 4 fonts, apply CSS variables to <html>
│   ├── globals.css             # Transition properties, scanline overlay, bracket decorations
│   └── page.tsx                # No changes needed
├── styles/
│   └── tokens.css              # Expanded: typography tokens per theme, teal palette primitives, glow tokens
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Minor: may need z-index coordination with toggle
│   │   └── ThemeToggle.tsx     # NEW: Client Component, floating pill, icon + label
│   └── providers/
│       └── ThemeProvider.tsx    # Remove disableTransitionOnChange
└── (section components unchanged -- they already use semantic tokens)
```

### Pattern 1: Multi-Font Loading with Theme-Aware CSS Variables
**What:** Load all four Google Fonts in `layout.tsx` via `next/font/google`, expose each as a CSS variable, then use semantic typography tokens in `tokens.css` that swap `font-family` per theme.
**When to use:** When different themes need different typefaces.
**Example:**
```typescript
// Source: Next.js 16.1.6 official docs (Context7 /vercel/next.js)
// In layout.tsx:
import { Figtree, DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// On <html>:
className={`${figtree.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
```

```css
/* In tokens.css -- semantic typography tokens */
:root {
  --font-heading: var(--font-figtree), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
}

[data-theme="dark"] {
  --font-heading: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-geist-mono), ui-monospace, monospace;
}
```

### Pattern 2: Hydration-Safe Theme Toggle (Client Component)
**What:** A Client Component that uses `useTheme` with a `mounted` guard to prevent hydration mismatch. Renders nothing on first server render, then the full toggle UI after mount.
**When to use:** Any component that reads current theme state.
**Example:**
```typescript
// Source: next-themes README (Context7 /pacocoursey/next-themes)
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "Exit the Matrix" : "View Sci-Fi Mode"}
    </button>
  );
}
```

### Pattern 3: Radial Gradient Border Glow (CSS Pseudo-Element + Mask)
**What:** A glow effect on card borders using a `::before` pseudo-element with a radial gradient, masked to only show along the border edge. Faint at rest, intensifies on hover.
**When to use:** Dark mode card/panel surfaces -- the "giselles.ai" effect.
**Example:**
```css
/* Source: Frontend Masters blog (glowing hover effect) + CSS masking (ishadeed.com) */
.card-glow {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.card-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* border thickness */
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(34, 211, 238, 0.3),
    transparent 40%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.4;
  transition: opacity 300ms ease;
  pointer-events: none;
}

.card-glow:hover::before {
  opacity: 1;
}
```

**Note:** For the static "at rest" glow (no mouse tracking), the `var(--mouse-x, 50%)` defaults center the gradient. Mouse-tracking glow requires a lightweight JS event listener updating `--mouse-x` and `--mouse-y` custom properties. This is a progressive enhancement -- the glow works without JS, just centered.

### Pattern 4: CSS Scanline/Grid Texture Overlay
**What:** A subtle CRT-like scanline effect using `repeating-linear-gradient` applied to a `::after` pseudo-element on the page body or a wrapper.
**When to use:** Dark mode only, for the retro sci-fi atmosphere.
**Example:**
```css
/* Source: Multiple CSS CRT tutorials (aleclownes.com, dev.to/ekeijl) */
[data-theme="dark"] body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  opacity: 0.5; /* Adjust for subtlety */
}
```

### Pattern 5: Theme Crossfade Transition
**What:** Add CSS `transition` on `color`, `background-color`, `border-color`, `box-shadow`, and `opacity` to key elements. Removing `disableTransitionOnChange` from next-themes allows these transitions to fire when `data-theme` changes.
**When to use:** The ~300ms unified mode switch.
**Example:**
```css
/* In globals.css */
body,
body * {
  transition:
    color 300ms ease,
    background-color 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;
}

/* Exception: don't transition layout properties */
body *::before,
body *::after {
  transition:
    opacity 300ms ease,
    background-color 300ms ease;
}
```

### Anti-Patterns to Avoid
- **`transition: all` on wildcard selectors:** Causes jank by transitioning layout properties (width, height, padding, transform). Explicitly list only color-related properties.
- **Font-family in transition list:** `font-family` is a discrete property and cannot be smoothly interpolated. Including it in transitions does nothing and adds confusion. Fonts will swap instantly during the crossfade; the color/background transitions mask this.
- **Using `box-shadow` alone for glow effects:** `box-shadow` produces a uniform blur that lacks the directional, border-hugging quality of the giselles.ai effect. Use the `::before` pseudo-element + `mask-composite` technique instead.
- **Hardcoded colors in components:** All section components already use `var()` tokens. New decorative elements (corner brackets, monospace labels) must also use semantic tokens, not hex values.
- **Transitioning CSS custom properties directly:** Unregistered CSS custom properties (the `--` variables) are not animatable by default. The transitions must target the resolved properties (`background-color`, `color`, etc.), not the custom properties themselves.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Theme state management | Custom localStorage + context | `next-themes` (already installed) | Handles SSR, hydration, script injection, system preference |
| Font loading/optimization | Manual `@font-face` declarations | `next/font/google` | Automatic self-hosting, zero CLS, preload hints, CSS variable output |
| Hydration-safe mounting | Custom SSR detection | `mounted` state pattern from next-themes docs | Proven pattern, prevents flash of wrong UI |
| Contrast ratio checking | Manual calculation | WebAIM Contrast Checker or browser DevTools accessibility audit | Too error-prone to eyeball; tools give exact ratios |
| Icon components | SVG string templates | Inline SVG as React components (no icon library needed for 2-3 icons) | Only need 2-3 toggle icons; an icon library is overkill |

**Key insight:** The existing token architecture means theme switching is already a CSS-only operation. The work is expanding token coverage (typography, teal palette, glow effects) and adding the toggle UI, not restructuring the component tree.

## Common Pitfalls

### Pitfall 1: Hydration Mismatch on Theme Toggle
**What goes wrong:** The toggle renders theme-dependent content (icons, labels) on the server where `theme` is undefined, producing a mismatch with the client.
**Why it happens:** `useTheme()` returns `undefined` on the server because the theme is determined client-side.
**How to avoid:** Use the `mounted` state guard pattern: render `null` until `useEffect` fires. The toggle is not SSR-critical content.
**Warning signs:** React hydration error in console, flash of wrong toggle state.

### Pitfall 2: Font-Family Not Animatable
**What goes wrong:** Developer adds `font-family` to the CSS `transition` list expecting a smooth crossfade between typefaces, but fonts swap instantly.
**Why it happens:** CSS `font-family` is a discrete property; it cannot interpolate between values. Only continuous properties (color, opacity, transform) can animate.
**How to avoid:** Accept the instant font swap. The simultaneous color/background transitions create enough visual continuity to mask the font change. The 300ms crossfade on colors effectively hides the discrete font swap.
**Warning signs:** No smooth font morphing despite transition declaration.

### Pitfall 3: Teal/Cyan Failing WCAG Contrast on Dark Backgrounds
**What goes wrong:** Bright cyan (#22d3ee) on very dark backgrounds may pass, but mid-teal values used for secondary text or borders may fall below 4.5:1.
**Why it happens:** Teal/cyan is a tricky color family for accessibility. Pure cyan (#00FFFF) on black is ~10.7:1, but desaturated or darker teals drop quickly.
**How to avoid:** Audit every text color + background combination. Use bright cyan (#22d3ee, ~8.6:1 on #0a0a0f) for body text, not mid-teals. Reserve mid-teals for decorative/non-text elements (borders, glows). Use WebAIM Contrast Checker for each pair.
**Warning signs:** Axe or Lighthouse accessibility audit flags contrast issues.

### Pitfall 4: Scanline Overlay Blocking Interactions
**What goes wrong:** The fixed-position scanline overlay captures pointer events, making the page unclickable.
**Why it happens:** Fixed-position elements naturally sit in the stacking context and receive pointer events.
**How to avoid:** Always set `pointer-events: none` on the scanline overlay pseudo-element.
**Warning signs:** Users cannot click links or buttons in dark mode.

### Pitfall 5: `transition: all` Causing Layout Jank
**What goes wrong:** When switching themes, elements visibly resize or shift because `width`, `height`, `padding`, `margin` are being transitioned.
**Why it happens:** `transition: all` includes every property, including layout properties that should change instantly.
**How to avoid:** Explicitly list only visual properties: `color`, `background-color`, `border-color`, `box-shadow`, `opacity`. Never use `transition: all` for theme switching.
**Warning signs:** Layout shifts or "swimming" elements during theme toggle.

### Pitfall 6: Performance with `body *` Selector for Transitions
**What goes wrong:** Applying transitions to every element via `body *` can cause frame drops on pages with many DOM nodes.
**Why it happens:** The browser must set up transition tracking for every single element.
**How to avoid:** If performance issues arise, scope transitions to specific semantic elements (sections, cards, headings, body text) rather than universal selector. Test on mid-range mobile devices.
**Warning signs:** Dropped frames during theme switch, visible stutter.

## Code Examples

Verified patterns from official sources:

### Loading Four Google Fonts in Next.js 16 Layout
```typescript
// Source: Context7 /vercel/next.js v16.1.6 - font loading docs
import { Figtree, DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Apply to <html> element:
// className={`${figtree.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
```

### Theme-Aware Typography Tokens
```css
/* In tokens.css -- replace current --font-sans with theme-aware tokens */
:root {
  --font-heading: var(--font-figtree), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

[data-theme="dark"] {
  --font-heading: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-geist-mono), ui-monospace, monospace;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

### Corner Bracket Decoration (CSS-Only)
```css
/* Retro sci-fi panel corner brackets */
.corner-brackets {
  position: relative;
}

.corner-brackets::before,
.corner-brackets::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--accent-primary);
  border-style: solid;
  pointer-events: none;
}

.corner-brackets::before {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}

.corner-brackets::after {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}
```

### Removing disableTransitionOnChange
```typescript
// Source: Context7 /pacocoursey/next-themes
// In ThemeProvider.tsx -- simply remove the prop:
<NextThemesProvider
  attribute="data-theme"
  defaultTheme="light"
  enableSystem={false}
  themes={["light", "dark"]}
>
  {children}
</NextThemesProvider>
```

### Accessible Toggle Button
```typescript
// Accessibility requirements for the toggle:
<button
  onClick={toggleTheme}
  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  role="switch"
  aria-checked={isDark}
  // Focus indicator via CSS:
  // :focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 2px; }
>
  {/* Icon + label content */}
</button>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `prefers-color-scheme` media query | Attribute-based (`data-theme`) with user toggle | ~2022 | Allows user preference override + URL param control |
| Manual `@font-face` | `next/font/google` with CSS variables | Next.js 13+ | Zero-CLS, automatic self-hosting, variable font support |
| `box-shadow` for glow | `::before` pseudo-element + `mask-composite` | ~2024 | Border-hugging glow, directional control, gradient support |
| `transition: all` for theme swap | Explicit property list | Ongoing best practice | Prevents layout jank, better performance |
| Geist Mono via `geist` npm package only | Also available via Google Fonts / `next/font/google` | 2024 | Simpler import, consistent with other font loading |

**Deprecated/outdated:**
- The current `--font-sans: var(--font-inter)` token in `@theme` will be replaced by theme-aware `--font-heading` and `--font-body` tokens
- The `disableTransitionOnChange` prop will be removed (it was appropriate during Phase 1 when transitions weren't designed yet)

## Open Questions

1. **Exact teal hex palette values**
   - What we know: Context says "deep teal for surfaces, mid-teal for borders, bright cyan for glows" with a gradient reference image
   - What's unclear: Exact hex values haven't been specified -- the planner/implementer needs to derive them from the reference image while maintaining WCAG AA compliance
   - Recommendation: Propose a palette during implementation, validate with WebAIM Contrast Checker, document rationale in code comments. Start from current tokens (#0f0f1a, #1a1a2e) and shift toward teal.

2. **Grid-breaking sections in light mode**
   - What we know: "Some sections may break out of the centered column for visual surprise"
   - What's unclear: Which sections, and how far they break
   - Recommendation: This is marked as Claude's discretion. Consider Hero and Impact Metrics as candidates. Defer specifics to implementation -- can propose and adjust.

3. **Mouse-tracking vs static glow**
   - What we know: Giselles.ai uses mouse-tracking glow that follows cursor position
   - What's unclear: Whether the user expects mouse-tracking or just a static ambient glow that brightens on hover
   - Recommendation: Implement static glow (centered gradient, brightens on hover) as baseline. Mouse-tracking is a progressive enhancement that requires a JS event listener per card -- add if performance allows and the static version feels flat.

4. **Geist Mono weight range for body text**
   - What we know: Geist Mono is available as a variable font on Google Fonts
   - What's unclear: Whether 400 weight is optimal for body text readability in a monospace font
   - Recommendation: Use 400 for body, test readability. Monospace at body size (16px) can feel dense -- may need slightly increased letter-spacing or line-height in dark mode tokens.

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js` v16.1.6 - Multi-font loading with CSS variables, `next/font/google` API
- Context7 `/pacocoursey/next-themes` - `useTheme` hook, `disableTransitionOnChange`, hydration guard pattern, theme switching API
- [Google Fonts: Geist Mono](https://fonts.google.com/specimen/Geist+Mono) - Confirmed availability, variable font, weight range
- [Google Fonts: Figtree](https://fonts.google.com/specimen/Figtree) - Variable font, weight range
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG 2.1 AA validation tool
- [W3C WCAG 2.1 Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) - 4.5:1 normal text, 3:1 large text, 3:1 UI components

### Secondary (MEDIUM confidence)
- [Frontend Masters: Glowing Hover Effect](https://frontendmasters.com/blog/glowing-hover-effect/) - Radial gradient + mask technique, verified with MDN mask-composite docs
- [CSS Masking (ishadeed.com)](https://ishadeed.com/article/css-masking/) - mask-composite: exclude technique for border-only effects
- [Alec Lownes: CRT Display CSS](https://aleclownes.com/2017/02/01/crt-display.html) - Scanline overlay approach with repeating-linear-gradient
- [web.dev: @property baseline](https://web.dev/blog/at-property-baseline) - CSS registered properties for animation (context only; not needed here)
- [MDN: CSS transition-property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-property) - Which properties are animatable

### Tertiary (LOW confidence)
- Giselles.ai visual reference -- cited by user as inspiration, actual CSS technique inferred from similar implementations (not directly inspected)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - next-themes and next/font/google are verified via Context7 official docs, all four fonts confirmed on Google Fonts
- Architecture: HIGH - Token system is already built, pattern is extending it; font loading confirmed in Next.js 16.1.6 docs
- Pitfalls: HIGH - Font non-animatability, hydration mismatch, contrast ratios, and pointer-events are well-documented CSS/React fundamentals
- Glow technique: MEDIUM - Based on verified CSS techniques (mask-composite, radial-gradient) but exact giselles.ai implementation was inferred, not directly inspected

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable domain, no fast-moving dependencies)
