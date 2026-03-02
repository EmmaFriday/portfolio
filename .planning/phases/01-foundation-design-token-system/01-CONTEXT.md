# Phase 1: Foundation + Design Token System - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold with Next.js + Tailwind CSS v4 + TypeScript. Three-tier CSS token system (primitives, semantic, component) with real color values for both light and dark modes. Blocking inline theme init script that reads URL params before first paint. Responsive base layout shell with sticky header structure. Both token sets must pass WCAG 2.1 AA contrast ratios.

Content sections, navigation links, case study data, theme toggle interaction, and animations are all separate phases.

</domain>

<decisions>
## Implementation Decisions

### Color palette
- Light mode background: pure white (#ffffff) — crisp, Notion-like
- Dark mode background: true black (#0a0a0f) — maximum contrast, OLED-friendly, makes glowing accents pop
- Light mode accent: blue (#2563eb) — professional, strong contrast on white
- Dark mode accent: cyan/teal (#22d3ee / #06b6d4) — as specified in requirements
- Dark mode glow intensity: medium — noticeable glow on cards, dividers, and key elements. Clearly sci-fi but not overwhelming. Vercel dark mode energy, not cyberpunk terminal.

### Typography
- Heading font: Inter — clean, geometric sans-serif. Same font in both modes (visual shift comes from color/glow, not typography)
- Body font: Inter — consistent with headings
- Dark mode does NOT switch to monospace headings — maintains cohesion across modes
- Type scale: large & editorial — big, bold section headings (48-64px on desktop). Statement typography, magazine/portfolio feel.
- Font weight contrast: medium — semibold headings (600), regular body (400). Professional, balanced, Notion-like.

### Layout & spacing
- Max content width: wide (1200px) — big hero, wide case study cards, more visual impact. Linear/Stripe marketing page energy.
- Section spacing: generous (120-160px) — each section feels like its own world. Editorial, premium breathing room.
- Responsive strategy: fluid scaling with clamp() — no hard breakpoints. Typography and spacing adjust continuously.
- Sticky header: include in Phase 1 layout scaffold — structurally ready for nav + toggle, even if empty. Prevents layout shifts when content arrives in Phase 2.

### Visual direction
- Light mode reference: Linear — white base with visual sophistication, subtle gradients, refined shadows, more polished than bare Notion
- Dark mode reference: modern sci-fi UI — clean dark surfaces with neon accents. Tron Legacy, Westworld UI, futuristic dashboards. Not retro CRT, not cyberpunk terminal.
- Mode divergence: dramatically different — two entirely different personalities. Light = corporate portfolio, Dark = sci-fi experience. Like visiting two different sites. Layout structure stays identical, but every visual token diverges.

### Claude's Discretion
- Exact primitive color palette (grays, surface tones, border colors) — as long as they serve the chosen references and pass WCAG AA
- Line height, letter spacing, and body text size
- Exact spacing scale values (4px, 8px, etc.)
- Container padding and edge behavior
- Surface/card background tones for each mode
- Responsive clamp() breakpoint values

</decisions>

<specifics>
## Specific Ideas

- Light mode should feel like Linear's marketing pages — polished white, refined shadows, not bare Notion
- Dark mode should feel like modern sci-fi dashboards — Tron Legacy / Westworld UI energy with clean neon accents
- The two modes should feel dramatically different — like visiting two different sites, but the layout skeleton is shared
- Medium glow in dark mode: think Vercel's dark theme sophistication, not a neon-soaked terminal

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- Stack decided via research: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript
- Three-tier token architecture planned: primitives.css > semantic-light.css / semantic-dark.css > components.css
- Theme switching via `data-theme` attribute on `<html>` — CSS-only operation
- Blocking inline script pattern for flash-free theme init (reads `?mode=` param)

### Integration Points
- Tailwind v4's `@theme` directive and CSS custom properties for token integration
- `next-themes` library for theme management (handles localStorage, system preference, SSR)
- Job search toolkit at `~/Desktop/job-search-toolkit/` provides content (Phase 2 concern, but content path is known)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-token-system*
*Context gathered: 2026-03-02*
