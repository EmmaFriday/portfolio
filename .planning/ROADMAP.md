# Roadmap: Portfolio -- Marie Anik Paradis

## Overview

This roadmap delivers a dual-mode portfolio site in five phases, ordered by architectural dependency: the CSS token system and responsive scaffold first (because every component depends on it), then all content sections rendered with real toolkit data, then the dual-mode theming system that makes both visual personalities switchable, then the URL parameter system that makes the portfolio a per-application instrument, and finally deployment with production hardening. Each phase delivers a coherent, verifiable capability that unblocks the next.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation + Design Token System** - Project scaffold, three-tier CSS token system, blocking theme init script, responsive base layout
- [x] **Phase 2: Content Sections** - All 8 page sections rendered with real case study data from the job search toolkit
- [x] **Phase 3: Dual-Mode Theming** - Light and dark modes visually complete and switchable via header toggle
- [ ] **Phase 4: URL Customization** - Query parameter system for theme mode control (?mode=)
- [ ] **Phase 5: Deployment + Production** - Live site on Vercel with custom domain, OG previews, and performance/accessibility sign-off

## Phase Details

### Phase 1: Foundation + Design Token System
**Goal**: A working project scaffold where the token architecture enforces that theme switching is a CSS-only operation, and the responsive grid works across all breakpoints
**Depends on**: Nothing (first phase)
**Requirements**: THEME-03, THEME-05, TECH-01
**Success Criteria** (what must be TRUE):
  1. The site renders a visible layout shell in a browser with the responsive grid adapting correctly across desktop, tablet, and mobile breakpoints
  2. CSS custom properties follow the three-tier structure (primitives, semantic, component) and changing the `data-theme` attribute on `<html>` switches all semantic token values without any JavaScript re-render
  3. A blocking inline script in `<head>` reads URL parameters and sets `data-theme` before first paint -- loading with `?mode=dark` and 4x CPU throttle shows zero flash of the wrong theme
  4. Both light and dark token sets pass WCAG 2.1 AA contrast ratios (4.5:1 minimum) for all text/background semantic token pairs
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- Project scaffold (Next.js 16 + Tailwind v4 + next-themes) and three-tier CSS design token system
- [x] 01-02-PLAN.md -- Responsive layout shell (sticky header, container, sections) and blocking theme init script

### Phase 2: Content Sections
**Goal**: A visitor sees all 8 page sections with real content from the job search toolkit, laid out in the editorial long-page format, and can navigate between them
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, TECH-06
**Success Criteria** (what must be TRUE):
  1. All 8 sections are visible on the page in order: Hero, What I Do, Impact Metrics, Case Studies, Beyond the Portfolio, What I Stand For, The Right Fit, Contact
  2. Case study preview cards display real content sourced from job search toolkit master files (outcome-first title, key metric, role, strategic hook) -- not placeholder text
  3. Impact metrics section displays 6 real metrics as large, scannable figures with contextual descriptions
  4. Clicking a section link in the sticky header smooth-scrolls to that section, and the header remains visible during scroll
  5. Contact section displays a working mailto link and LinkedIn URL as clear calls to action
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Typed content data layer (case studies, metrics, nav links) and smooth-scroll navigation in Header
- [x] 02-02-PLAN.md -- Upper showcase sections: Hero, What I Do, Impact Metrics, Case Studies
- [x] 02-03-PLAN.md -- Personal voice sections (Beyond, Stand For, Right Fit, Contact) and full page assembly

### Phase 3: Dual-Mode Theming
**Goal**: Visitors experience two distinct visual personalities -- a clean Notion-like light mode and a retro sci-fi dark mode -- and can switch between them via a designed toggle in the header
**Depends on**: Phase 2
**Requirements**: THEME-01, THEME-02, THEME-04, TECH-02
**Success Criteria** (what must be TRUE):
  1. Light mode displays the clean, white, Notion-like aesthetic with the current illustrated character (or placeholder)
  2. Dark mode displays a black background with teal/cyan accents, glowing effects on decorative elements, and a sci-fi character placeholder
  3. The mode toggle is visible in the header, styled as a designed interaction piece (not a generic switch), and clicking it switches between modes instantly without page reload
  4. Both modes pass a full WCAG 2.1 AA audit: 4.5:1 contrast ratios, keyboard navigation works on all interactive elements, screen reader announces all content and controls, focus indicators are visible in both themes
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md -- Token system expansion (typography tokens, teal palette, font loading, transitions)
- [x] 03-02-PLAN.md -- Theme toggle, dark mode decorations (scanlines, glow, brackets, labels), accessibility audit

### Phase 4: URL Customization
**Goal**: URLs can control which theme visitors see (?mode=dark/light), with localStorage fallback for returning visitors and replaceState sync on toggle
**Depends on**: Phase 3
**Requirements**: URL-01, URL-02, URL-03, URL-04, URL-05
**Success Criteria** (what must be TRUE):
  1. Loading the site with `?mode=light` shows light mode; loading with `?mode=dark` shows dark mode
  2. Loading without any query parameters checks localStorage for a previously-toggled theme, defaulting to light mode if none exists
  3. After using the mode toggle, the URL updates via `history.replaceState` to reflect the current mode (e.g., toggling to dark adds `?mode=dark`) without triggering a page reload
  4. Invalid `?mode=` values silently default to light mode -- visitor always sees a working portfolio
  5. Toggling theme preserves any other query parameters already in the URL (utm_source, etc.)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Deployment + Production
**Goal**: The portfolio is live on a production URL with a custom domain, professional social sharing previews, and verified performance and accessibility
**Depends on**: Phase 4
**Requirements**: TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. The site is accessible at a custom domain with HTTPS, served from Vercel (or equivalent CDN hosting)
  2. Sharing the portfolio URL in Slack, LinkedIn, or iMessage renders a professional Open Graph preview with the correct title, description, and image
  3. The page loads in under 3 seconds on a standard connection (verified via Lighthouse on mobile with simulated throttling)
  4. A final Lighthouse audit on mobile scores above 90 for Performance, Accessibility, Best Practices, and SEO
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 > 2 > 3 > 4 > 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Design Token System | 2/2 | Complete | 2026-03-02 |
| 2. Content Sections | 3/3 | Complete | 2026-03-02 |
| 3. Dual-Mode Theming | 2/2 | Complete | 2026-03-04 |
| 4. URL Customization | 0/0 | Not started | - |
| 5. Deployment + Production | 0/0 | Not started | - |

---
*Roadmap created: 2026-03-02*
*Last updated: 2026-03-04 after Phase 3 execution complete*
