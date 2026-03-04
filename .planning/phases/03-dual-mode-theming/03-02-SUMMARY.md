---
phase: 03-dual-mode-theming
plan: 02
subsystem: ui
tags: [next-themes, dark-mode, theming, accessibility, wcag, css-animations, spotlight]

# Dependency graph
requires:
  - phase: 03-dual-mode-theming/01
    provides: "Token system with teal palette, typography tokens, dark mode overrides, theme transitions"
  - phase: 02-content-sections
    provides: "Section components to apply heading fonts and dark mode classes to"
provides:
  - "ThemeToggle client component with floating pill design and hydration guard"
  - "Dark mode CSS decorations: scanlines, corner brackets, card glow"
  - "SpotlightCard component with cursor-tracking border glow"
  - "Monospace sci-fi labels on section headings in dark mode"
  - "WCAG 2.1 AA compliant dual-mode theming"
affects: [04-interactions, 05-deployment]

# Tech tracking
tech-stack:
  added: [next-themes]
  patterns: [hydration-guard-mount-pattern, data-theme-css-scoping, spotlight-cursor-tracking]

key-files:
  created:
    - src/components/layout/ThemeToggle.tsx
    - src/components/ui/SpotlightCard.tsx
  modified:
    - src/app/globals.css
    - src/app/page.tsx
    - src/styles/tokens.css
    - src/components/sections/Hero.tsx
    - src/components/sections/WhatIDo.tsx
    - src/components/sections/ImpactMetrics.tsx
    - src/components/sections/CaseStudyCard.tsx
    - src/components/sections/CaseStudies.tsx
    - src/components/sections/BeyondPortfolio.tsx
    - src/components/sections/WhatIStandFor.tsx
    - src/components/sections/TheRightFit.tsx
    - src/components/sections/Contact.tsx

key-decisions:
  - "SpotlightCard component for cursor-tracking border glow on cards (Giselle-style interaction)"
  - "Reduced section padding via --space-section token for tighter layout"
  - "Body text at 15px for better readability-to-density balance"
  - "Pill-shaped contact buttons matching toggle aesthetic"
  - "Cosmic starfield background on WhatIDo section in dark mode"

patterns-established:
  - "Hydration guard: useState(false) + useEffect mount pattern for client components using useTheme"
  - "Dark-mode-only CSS via [data-theme='dark'] selector scoping"
  - "SpotlightCard pattern: client component wrapping cards with onMouseMove cursor tracking"
  - "Sci-fi labels: hidden dark:block spans with monospace font above section headings"

requirements-completed: [THEME-02, THEME-04, TECH-02]

# Metrics
duration: 18min
completed: 2026-03-04
---

# Phase 3 Plan 2: Toggle, Decorations, and Visual Refinements Summary

**Floating pill theme toggle with retro sci-fi dark mode decorations, SpotlightCard cursor-tracking glow, and WCAG AA compliance across both modes**

## Performance

- **Duration:** 18 min (across checkpoint pause)
- **Started:** 2026-03-04T19:40:00Z
- **Completed:** 2026-03-04T20:12:00Z
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments
- ThemeToggle floating pill with icon morphing, label switching, keyboard accessibility, and mobile-responsive sizing
- Dark mode visual personality: scanline overlay, corner bracket decorations on case study cards, radial card glow on hover, monospace sci-fi labels above section headings
- All heading elements use --font-heading (Figtree in light, Space Grotesk in dark)
- SpotlightCard component with cursor-tracking border glow applied to ImpactMetrics and WhatIDo cards
- Cosmic starfield background on WhatIDo section in dark mode
- Pill-shaped contact buttons with SpotlightPill hover effect
- WCAG 2.1 AA verified for all text/background pairs in both modes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ThemeToggle component and dark mode CSS decorations** - `cce15ad` (feat)
2. **Task 2: Apply font-heading to headings, add dark mode classes and sci-fi labels** - `690f926` (feat)
3. **Task 3: Visual refinements from checkpoint review** - `64a6bb7` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `src/components/layout/ThemeToggle.tsx` - Client component with floating pill toggle, hydration guard, icon + label switching
- `src/components/ui/SpotlightCard.tsx` - Client component with cursor-tracking border glow effect
- `src/app/globals.css` - Scanline overlay, card glow, corner brackets, focus-visible, starfield background styles
- `src/app/page.tsx` - ThemeToggle rendered in page layout
- `src/styles/tokens.css` - Reduced --space-section, adjusted body text size
- `src/components/sections/Hero.tsx` - font-heading on h1
- `src/components/sections/WhatIDo.tsx` - font-heading, sci-fi label, SpotlightCard wrapping, starfield background
- `src/components/sections/ImpactMetrics.tsx` - font-heading, sci-fi label, SpotlightCard wrapping
- `src/components/sections/CaseStudyCard.tsx` - font-heading, card-glow and corner-brackets classes
- `src/components/sections/CaseStudies.tsx` - font-heading, sci-fi label
- `src/components/sections/BeyondPortfolio.tsx` - font-heading, sci-fi label
- `src/components/sections/WhatIStandFor.tsx` - font-heading, sci-fi label
- `src/components/sections/TheRightFit.tsx` - font-heading, sci-fi label
- `src/components/sections/Contact.tsx` - font-heading, sci-fi label, pill-shaped buttons, SpotlightPill hover

## Decisions Made
- SpotlightCard component created for cursor-tracking border glow (Giselle-style interaction pattern)
- Reduced section padding via --space-section token for tighter vertical rhythm
- Body text reduced to 15px for better density without sacrificing readability
- Contact buttons made pill-shaped to match toggle aesthetic
- Cosmic starfield background added to WhatIDo section (dark mode only) for atmospheric depth

## Deviations from Plan

### Checkpoint Refinements (User-Directed)

During the visual verification checkpoint, the user directed several design refinements that went beyond the original plan scope:

**1. SpotlightCard component (new)**
- Not in original plan; added during checkpoint review for enhanced interactivity
- Applied to ImpactMetrics and WhatIDo card sections

**2. Layout density adjustments**
- Reduced section padding via --space-section token
- Body text reduced from default to 15px

**3. Contact button restyling**
- Pill-shaped buttons with SpotlightPill hover effect

**4. Cosmic starfield background**
- Added to WhatIDo section in dark mode

---

**Total deviations:** 4 user-directed refinements during checkpoint
**Impact on plan:** All changes enhance the visual design quality. No architectural changes. Build passes.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Dual-mode theming complete with both visual personalities fully realized
- All semantic tokens working across both modes
- SpotlightCard pattern available for reuse in future phases
- Ready for Phase 4 (interactions/animations) or Phase 5 (deployment)

## Self-Check: PASSED

All files verified present. All 3 task commits verified in git log (cce15ad, 690f926, 64a6bb7). Build passes.

---
*Phase: 03-dual-mode-theming*
*Completed: 2026-03-04*
