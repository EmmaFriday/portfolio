# Requirements: Portfolio -- Marie Anik Paradis

**Defined:** 2026-03-02
**Core Value:** Present case studies compellingly and be customizable per job application via URL parameters

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Theming

- [ ] **THEME-01**: Site displays in light mode with clean, white, Notion-like aesthetic and current illustrated character
- [ ] **THEME-02**: Site displays in dark mode with black background, teal/cyan accents, glowing effects, and sci-fi character placeholder
- [x] **THEME-03**: Both modes share identical layout structure -- only visual tokens differ
- [ ] **THEME-04**: Theme toggle is visible in the header, styled as a designed interaction piece
- [x] **THEME-05**: No flash of wrong theme on page load (blocking inline script reads URL param before first paint)

### Content

- [ ] **CONT-01**: Hero section displays name, role positioning ("Senior UX & Product Designer"), experience summary, and illustrated character
- [ ] **CONT-02**: Impact metrics section displays 6 key metrics as large, scannable figures with context
- [ ] **CONT-03**: "What I Do" section breaks down specialties into categories (UX & Product Design, Design Systems, AI Workflows, Research & Strategy)
- [ ] **CONT-04**: 4-5 case study preview cards displayed vertically with outcome-first title, key metric, role, and strategic hook
- [ ] **CONT-05**: "Beyond the Portfolio" section shows personality, interests, and the human behind the work
- [ ] **CONT-06**: "What I Stand For" section communicates design values and philosophy
- [ ] **CONT-07**: "The Right Fit" section explicitly positions what roles, teams, and problems Marie is best for
- [ ] **CONT-08**: Contact section with email link and LinkedIn as clear CTA
- [x] **CONT-09**: Case study content sourced from job search toolkit master files at build time

### URL Customization

- [ ] **URL-01**: ?mode=light sets initial theme to light mode
- [ ] **URL-02**: ?mode=dark sets initial theme to dark mode
- [ ] **URL-03**: ?order=2,1,4,3 reorders case study display according to specified sequence
- [ ] **URL-04**: Missing params gracefully default (light mode, original order)
- [ ] **URL-05**: Toggle state syncs back to URL via history.replaceState without page reload

### Technical

- [x] **TECH-01**: Site is responsive across desktop, tablet, and mobile breakpoints
- [ ] **TECH-02**: Both modes pass WCAG 2.1 AA (4.5:1 contrast, keyboard nav, screen reader, focus indicators)
- [ ] **TECH-03**: Page loads in under 3 seconds on standard connection
- [ ] **TECH-04**: Open Graph meta tags render professional previews when URL is shared
- [ ] **TECH-05**: Site deployed to hosting platform with custom domain support
- [x] **TECH-06**: Smooth scroll navigation between sections with sticky header

## v1.x Requirements

Deferred to post-launch polish. Tracked but not in initial roadmap.

### Visual Polish

- **POLISH-01**: Scroll-triggered reveal animations on sections and case study cards (respect prefers-reduced-motion)
- **POLISH-02**: Impact metrics visualization with animated counters or visual progressions
- **POLISH-03**: Mode toggle transition animation (polished visual effect when switching)
- **POLISH-04**: Smooth scroll navigation with active section indicator highlighting current section

### Easter Eggs

- **EGGS-01**: Basic Easter eggs (Konami code, text selection surprises, click interactions)
- **EGGS-02**: Easter eggs more prominent/accessible in dark sci-fi mode

### Character

- **CHAR-01**: Illustrated character swaps between light mode (current style) and dark mode (sci-fi version) when Marie provides the art

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Deep Content

- **DEEP-01**: Full case study pages with process documentation, wireframes, and expanded narrative
- **DEEP-02**: Leva-style hidden control panel Easter egg (sci-fi instrument panel for tweaking visual parameters)
- **DEEP-03**: Advanced Easter eggs (hardware sensor triggers, console messages, seasonal variants)

### Analytics & Advanced

- **ADV-01**: Analytics integration to track visitor behavior, mode preference, and case study attention
- **ADV-02**: Case study filtering by positioning persona (PM Marie, Designer Marie, AI Marie)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog or writing section | Scope creep; empty blog is worse than no blog |
| Contact form with fields | Adds backend complexity; hiring managers prefer direct email |
| Real-time CMS or admin panel | Massive overhead for 5 case studies that change infrequently |
| Chat widget or AI assistant | Gimmicky for a senior designer; undermines editorial craft |
| 3D scenes or Three.js hero | Heavy load times; accessibility nightmare; wrong signal for UX strategist |
| Video backgrounds or autoplay | Slow, battery-draining, inaccessible, annoying in meetings |
| Authentication or password protection | Kills conversion; hiring managers will not create accounts |
| Job search toolkit modifications | Separate project, separate repo |
| Creating sci-fi character illustration | Marie will create/commission separately |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| THEME-01 | Phase 3 | Pending |
| THEME-02 | Phase 3 | Pending |
| THEME-03 | Phase 1 | Complete |
| THEME-04 | Phase 3 | Pending |
| THEME-05 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| CONT-06 | Phase 2 | Pending |
| CONT-07 | Phase 2 | Pending |
| CONT-08 | Phase 2 | Pending |
| CONT-09 | Phase 2 | Complete |
| URL-01 | Phase 4 | Pending |
| URL-02 | Phase 4 | Pending |
| URL-03 | Phase 4 | Pending |
| URL-04 | Phase 4 | Pending |
| URL-05 | Phase 4 | Pending |
| TECH-01 | Phase 1 | Complete |
| TECH-02 | Phase 3 | Pending |
| TECH-03 | Phase 5 | Pending |
| TECH-04 | Phase 5 | Pending |
| TECH-05 | Phase 5 | Pending |
| TECH-06 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-03-02*
*Last updated: 2026-03-02 after roadmap creation*
