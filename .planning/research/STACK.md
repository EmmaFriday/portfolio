# Stack Research

**Domain:** High-end interactive portfolio website with dual-mode theming
**Researched:** 2026-03-02
**Confidence:** HIGH

## Decision: Next.js over Astro

This is the most consequential stack decision. Both frameworks are strong contenders for portfolios in 2026, but this project's requirements tip the scales decisively toward Next.js.

**Why not Astro?** Astro is the better choice for content-heavy, mostly-static portfolios (40% faster, zero JS by default). However, this project is a single long page where **every element** changes based on theme state (light vs dark), scroll animations play across all sections, a leva-style control panel affects visual parameters globally, and URL query params drive the entire page's presentation. In Astro's islands architecture, sharing state between islands (like a global theme or leva controls) requires nanostores workarounds, React context cannot cross island boundaries, and the "interactive" surface area is essentially the entire page. When 90%+ of the page is interactive, islands architecture creates friction rather than removing it.

**Why Next.js?** The entire page is a React component tree. Theme state, scroll state, leva controls, and URL params flow naturally through React context and hooks. `useSearchParams()` handles query params natively. Static export (`output: 'export'`) produces the same deployable static HTML/CSS/JS bundle as Astro would, deployable anywhere. The overhead of Next.js's JS runtime (~50KB) is negligible given that this page ships significant JS anyway (GSAP, theme system, leva, scroll animations).

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6 | React meta-framework, routing, static export | Industry standard for React apps. Static export produces deployable HTML/JS. App Router provides `useSearchParams` for URL query param support. Vercel deployment is one-click. |
| React | 19.2.4 | UI component library | Required by Next.js. React 19 brings performance improvements and the experimental ViewTransition component for smooth theme transitions. |
| TypeScript | 5.9.3 | Type safety | Non-negotiable for a project with complex theming logic, content schemas, and component props. Catches theme/mode bugs at compile time. |
| Tailwind CSS | 4.2.1 | Utility-first CSS | v4's CSS-first configuration with `@theme` directive and CSS custom properties makes dual-mode theming elegant. Define light/dark color tokens as CSS variables, swap them via class. 5x faster builds than v3. |

### Animation & Interactivity

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| GSAP | 3.14.2 | Scroll animations, timeline sequences, complex effects | The gold standard for scroll-driven animation. ScrollTrigger plugin provides pixel-perfect control. Now **free for all uses** (Webflow acquisition). Outperforms Motion for complex timelines and scroll scrubbing. |
| @gsap/react | 2.1.2 | React integration for GSAP | Official React hook (`useGSAP`) that replaces `useEffect` for animations. Auto-cleanup of ScrollTriggers on unmount. Required for proper GSAP + Next.js App Router usage. |
| Motion (Framer Motion) | 12.34.4 | Micro-interactions, layout animations, presence animations | Use alongside GSAP for declarative React animations: hover states, enter/exit transitions, layout shifts. Its `AnimatePresence` handles component mount/unmount animations that GSAP doesn't cover cleanly. |

### Theming

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| next-themes | 0.4.6 | Theme management (light/dark toggle) | Zero-flicker SSR-safe theme switching. Handles localStorage persistence, system preference detection, and `<html>` class toggling. Works perfectly with Tailwind CSS dark mode. Two lines to set up. |
| react-theme-switch-animation | 1.0.0 | Animated theme transition | Uses View Transitions API for smooth circle-reveal or blur animations when switching themes. Progressive enhancement -- falls back gracefully on unsupported browsers. Built for Tailwind + Next.js. |

### Content Pipeline

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| gray-matter | 4.0.3 | Frontmatter parsing from markdown files | Lightweight, battle-tested parser for extracting metadata (title, description, order, tags) from case study markdown files. No framework lock-in. |
| @mdx-js/mdx | 3.1.1 | MDX processing | Enables embedding React components inside markdown case studies if needed (interactive demos, custom callouts). Only use if case studies need interactivity beyond plain markdown. |
| @mdx-js/react | 3.1.1 | MDX React provider | Provides MDX components context for custom rendering of markdown elements (styled headings, custom image components). |

### Easter Eggs & Debug Controls

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| leva | 0.10.1 | Interactive control panel GUI | React-first GUI with sliders, color pickers, and toggles. Perfect for the "hidden control panel" Easter egg -- users discover it and can tweak visual parameters (glow intensity, animation speed, color accents) in real-time. Lightweight, designed for exactly this use case. |

### Infrastructure & Deployment

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vercel | -- | Hosting, deployment, custom domain | Free Hobby tier supports custom domains, automatic SSL, preview deployments from GitHub branches. Native Next.js support (same company). Zero-config deployment. |
| sharp | 0.34.5 | Image optimization | Required by Next.js Image component for optimized responsive images. Handles the illustrated character assets in both modes. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @tailwindcss/vite | Tailwind v4 build integration | v4 uses Vite plugin instead of PostCSS. Required for the new CSS-first configuration. |
| ESLint + next/core-web-vitals | Linting | Next.js ships with ESLint config. Catches accessibility issues and performance anti-patterns. |
| Prettier + prettier-plugin-tailwindcss | Code formatting | Auto-sorts Tailwind classes for consistency. |

## Installation

```bash
# Core framework
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir

# Animation
npm install gsap @gsap/react motion

# Theming
npm install next-themes react-theme-switch-animation

# Content
npm install gray-matter @mdx-js/mdx @mdx-js/react

# Easter eggs
npm install leva

# Dev dependencies
npm install -D @tailwindcss/vite prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js | Astro | If this were a multi-page portfolio with minimal interactivity (e.g., no dual theming, no leva panel, no scroll animations). Astro's islands architecture excels when most of the page is static HTML. |
| GSAP (scroll) | Motion scroll APIs | If scroll animations are simple (fade-in on scroll only). Motion's `useInView` and `whileInView` are simpler but lack ScrollTrigger's timeline scrubbing and pinning. |
| Motion (micro) | CSS animations | If micro-interactions are very simple (hover color changes). CSS transitions are lighter but can't handle presence animations or layout animations. |
| next-themes | Custom implementation | Never. next-themes solves flash-of-wrong-theme, localStorage sync, and system preference detection. Reimplementing this correctly is surprisingly hard. |
| gray-matter | Contentlayer | Never in 2026. Contentlayer is unmaintained and doesn't support Next.js 14+. gray-matter + custom loader is simpler and more reliable. |
| Tailwind CSS | CSS Modules | If the team strongly prefers traditional CSS. But Tailwind v4's `@theme` directive with CSS custom properties is the cleanest path to dual-mode theming. CSS Modules would require duplicating theme logic. |
| leva | dat.gui / Tweakpane | If not using React. leva is React-first with hooks integration. dat.gui is legacy. Tweakpane is vanilla JS and doesn't integrate as cleanly with React state. |
| Vercel | Netlify / Cloudflare Pages | If avoiding Vercel's ecosystem. Netlify and Cloudflare Pages both support static site hosting with custom domains on free tiers. But Vercel's Next.js integration is frictionless. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Contentlayer | Unmaintained since 2023. Does not support Next.js 14+. | gray-matter + custom content loader |
| next-mdx-remote | Poorly maintained as of 2025. Overkill for local file loading. | @next/mdx or gray-matter for local files |
| Framer Motion (package name) | Rebranded to "motion" at motion.dev. The `framer-motion` npm package still works but `motion` is the forward path. | `motion` (npm package) |
| create-react-app | Deprecated. No SSR, no static export optimization, no file-based routing. | Next.js |
| styled-components / Emotion | Runtime CSS-in-JS adds bundle weight and creates hydration issues with SSR. Poor theming DX compared to Tailwind v4 CSS variables. | Tailwind CSS v4 |
| Chakra UI / MUI | Opinionated styling that fights against custom dual-mode theming. Heavy runtime. This portfolio needs full visual control. | Tailwind CSS + custom components |
| Three.js / React Three Fiber | Overkill for 2D portfolio effects. Adds massive bundle weight (~150KB+). The sci-fi aesthetic can be achieved with CSS + GSAP. | GSAP + CSS effects (glow, gradients, borders) |

## Stack Patterns by Variant

**For the light "Notion" mode:**
- Tailwind's default utilities with light-mode CSS variables
- Subtle Motion enter animations (fade, slight translate)
- Minimal GSAP -- just scroll-triggered section reveals
- Clean typography, generous whitespace

**For the dark "Sci-fi" mode:**
- Dark-mode CSS variables (teal/cyan accents, dark backgrounds)
- GSAP-heavy: glowing borders, pulsing effects, text scramble animations
- leva panel becomes discoverable (Easter egg)
- More aggressive scroll animations, parallax effects
- CSS `box-shadow` with color variables for glow effects

**For URL query param handling:**
- `useSearchParams()` from `next/navigation` reads `?mode=light|dark` and `?order=2,1,4,3`
- Theme state syncs: URL param overrides localStorage, which overrides system preference
- Case study order derived from URL param, with fallback to default order
- Static export means all query param logic runs client-side (no server needed)

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@16.1.6 | react@19.2.4, react-dom@19.2.4 | Next.js 16 requires React 19. |
| tailwindcss@4.2.1 | @tailwindcss/vite@4.2.1 | v4 uses Vite plugin, not PostCSS. Ensure versions match. |
| gsap@3.14.2 | @gsap/react@2.1.2 | Official React adapter. Always match major versions. |
| motion@12.34.4 | react@19.2.4 | Motion v12 supports React 19. Import from `motion/react` not `framer-motion`. |
| next-themes@0.4.6 | next@16.x | Works with App Router. Requires `ThemeProvider` in a client component wrapping the layout. |
| leva@0.10.1 | react@19.x | React-first, hooks-based. Should work with React 19 (LOW confidence -- verify during setup). |
| react-theme-switch-animation@1.0.0 | tailwindcss, next.js | Requires Tailwind dark mode class strategy. Must be used in client components (`'use client'`). |

## Confidence Assessment

| Decision | Confidence | Rationale |
|----------|------------|-----------|
| Next.js over Astro | HIGH | This project's interactivity profile (global theme state, scroll animations everywhere, leva panel, URL params) matches a full React app, not an islands architecture. Multiple sources confirm Astro is for content-first sites, not interaction-heavy SPAs. |
| Tailwind CSS v4 | HIGH | Verified v4.2.1 is current stable. CSS-first config with `@theme` and CSS custom properties is purpose-built for multi-theme systems. Confirmed via official docs and multiple implementation guides. |
| GSAP + Motion dual approach | HIGH | Industry consensus: GSAP for scroll-driven/timeline animations, Motion for declarative React micro-interactions. Both are free. GSAP's ScrollTrigger is unmatched for the long-page scroll experience this project needs. |
| next-themes | HIGH | De facto standard for Next.js theme switching. Verified maintained at v0.4.6. Solves flash-of-wrong-theme problem that custom implementations often miss. |
| leva for Easter eggs | MEDIUM | Perfect conceptual fit (React GUI panel, exactly the sci-fi aesthetic referenced in PROJECT.md). v0.10.1 is latest, but React 19 compatibility not fully verified -- may need testing. |
| react-theme-switch-animation | MEDIUM | v1.0.0 is new. Uses View Transitions API which has broad but not universal browser support. Progressive enhancement means it degrades gracefully. Worth including but have a CSS fallback plan. |
| gray-matter for content | HIGH | Battle-tested, minimal, does one thing well. No framework lock-in. Confirmed v4.0.3 is current. |
| Vercel for hosting | HIGH | Free tier confirmed to support custom domains, SSL, and static deployments. Native Next.js support from the same company. |

## Sources

- Next.js official docs (nextjs.org/docs) -- static export, useSearchParams, MDX guide
- Astro official docs (docs.astro.build) -- islands architecture, content collections, state sharing
- GSAP official docs (gsap.com) -- ScrollTrigger, React integration, licensing (free post-Webflow acquisition)
- Motion official docs (motion.dev) -- upgrade guide from framer-motion, changelog
- Tailwind CSS official docs (tailwindcss.com) -- v4 dark mode, @theme directive, CSS variables
- npm registry -- all version numbers verified via `npm view [package] version` on 2026-03-02
- Multiple comparison articles from 2025-2026 (eastondev.com, pagepro.co, logrocket.com) -- Astro vs Next.js, animation library comparisons
- GitHub (pacocoursey/next-themes, pmndrs/leva, MinhOmega/react-theme-switch-animation) -- maintenance status, feature sets
- Vercel pricing page -- free tier capabilities confirmed

---
*Stack research for: Dual-mode interactive portfolio website*
*Researched: 2026-03-02*
