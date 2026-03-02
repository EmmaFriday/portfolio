# Architecture Research

**Domain:** Dual-mode interactive designer portfolio with URL-driven customization
**Researched:** 2026-03-02
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        BUILD TIME (Astro SSG)                          │
│                                                                        │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────┐  │
│  │ Content      │    │ Astro Build  │    │ Static Output            │  │
│  │ Loader       │───>│ Pipeline     │───>│ (HTML + CSS + Islands)   │  │
│  │ (reads from  │    │              │    │                          │  │
│  │  toolkit)    │    │ Sections     │    │  index.html              │  │
│  └──────────────┘    │ assembled    │    │  _astro/*.css            │  │
│                      │ into single  │    │  _astro/*.js (islands)   │  │
│                      │ page         │    │  og-image endpoint       │  │
│                      └──────────────┘    └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     EDGE LAYER (Hosting Platform)                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Edge Middleware / Function                                       │  │
│  │ - Intercepts requests with ?mode= or ?order= params             │  │
│  │ - Injects dynamic OG meta tags into HTML                        │  │
│  │ - Returns modified HTML to social crawlers                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                                 │
│                                                                        │
│  ┌─────────────┐  ┌───────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │ Theme       │  │ URL State     │  │ Section      │  │ Easter   │  │
│  │ Controller  │  │ Manager       │  │ Scroll       │  │ Egg      │  │
│  │ (island)    │  │ (inline +     │  │ Manager      │  │ System   │  │
│  │             │  │  island)      │  │ (CSS + JS)   │  │ (island) │  │
│  └──────┬──────┘  └───────┬───────┘  └──────┬───────┘  └────┬─────┘  │
│         │                 │                  │               │         │
│  ┌──────┴─────────────────┴──────────────────┴───────────────┴──────┐  │
│  │                    Design Token Layer (CSS)                       │  │
│  │  :root / [data-theme="light"] / [data-theme="dark"]              │  │
│  │  Primitives > Semantic > Component tokens                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Static HTML Sections                          │  │
│  │  Hero | What I Do | Impact | Case Studies | Beyond |            │  │
│  │  What I Stand For | The Right Fit | Contact                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                                      ▲
                                                      │
┌─────────────────────────────────────────────────────────────────────────┐
│                   EXTERNAL: Job Search Toolkit                          │
│   ~/Desktop/job-search-toolkit/                                        │
│                                                                        │
│  ┌──────────────────────┐  ┌─────────────────────────────────────────┐│
│  │ master-files/        │  │ URL Generator                           ││
│  │   case-studies/*.md  │  │ (generates ?mode=dark&order=2,1,4,3    ││
│  │   portfolio-base/    │  │  links per application)                 ││
│  └──────────────────────┘  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Content Loader | Reads markdown from toolkit repo at build time, validates content contract | Astro content collection with glob() loader pointing to external directory |
| Theme Controller | Manages theme toggle UI, dispatches theme change to document | React/Preact island component, sets `data-theme` attribute on `<html>` |
| URL State Manager | Reads query params on load, syncs toggle state to URL | Blocking inline script (head) + island for ongoing state sync via `history.replaceState()` |
| Section Scroll Manager | Handles smooth scroll between sections, optional scroll-snap behavior | CSS scroll-snap + CSS scroll-driven animations (no JS scroll listeners) |
| Easter Egg System | Hidden controls panel, discovery triggers, reward feedback | Lazy-loaded React/Preact island, triggered by specific user actions |
| Design Token Layer | Single source of truth for all visual values in both themes | CSS custom properties organized in three tiers: primitives, semantic, component |
| Edge Middleware | Injects dynamic OG meta tags based on query params for social crawlers | Vercel Edge Middleware or Netlify Edge Function |
| Static HTML Sections | 8 content sections rendered as static Astro components | `.astro` components composed into single index page |

## Recommended Project Structure

```
src/
├── assets/                    # Static assets
│   ├── fonts/                 # Self-hosted font files (woff2)
│   │   ├── inter-var.woff2
│   │   └── jetbrains-mono-var.woff2
│   └── images/                # Illustrations, icons, OG base images
│       ├── character-light.svg
│       ├── character-dark.svg  # Placeholder until Marie creates
│       └── og-base.png
├── components/                # Astro components (static by default)
│   ├── sections/              # The 8 page sections
│   │   ├── Hero.astro
│   │   ├── WhatIDo.astro
│   │   ├── Impact.astro
│   │   ├── CaseStudies.astro
│   │   ├── CaseStudyCard.astro
│   │   ├── Beyond.astro
│   │   ├── WhatIStandFor.astro
│   │   ├── TheRightFit.astro
│   │   └── Contact.astro
│   ├── layout/                # Structural components
│   │   ├── Header.astro       # Nav + theme toggle mount point
│   │   ├── Footer.astro
│   │   └── Section.astro      # Wrapper: scroll-snap target, semantic <section>
│   └── interactive/           # Components that become islands
│       ├── ThemeToggle.tsx     # React/Preact island for toggle interaction
│       ├── EasterEggPanel.tsx  # Leva-style control panel (lazy)
│       └── EasterEggTrigger.tsx # Discovery trigger points
├── content/                   # Content collection config
│   └── config.ts              # Defines collections, points glob() to toolkit
├── layouts/                   # Page layouts
│   └── BaseLayout.astro       # <html> wrapper, head scripts, font preloads
├── pages/                     # Route pages
│   ├── index.astro            # Single page: assembles all sections
│   └── api/                   # Server endpoints (if using hybrid mode)
│       └── og-image.ts        # Dynamic OG image generation
├── scripts/                   # Client-side scripts
│   ├── theme-init.ts          # Blocking inline: reads URL, sets data-theme
│   └── url-state.ts           # Manages URL <> state sync after hydration
├── styles/                    # CSS architecture
│   ├── tokens/                # Design token layers
│   │   ├── primitives.css     # Raw values: colors, sizes, fonts
│   │   ├── semantic-light.css # Light theme semantic mappings
│   │   ├── semantic-dark.css  # Dark theme semantic mappings
│   │   └── components.css     # Component-level token aliases
│   ├── base.css               # Reset, typography, global styles
│   ├── utilities.css          # Utility classes (if not using Tailwind)
│   └── animations.css         # Scroll-driven animations, transitions
└── utils/                     # Shared utilities
    ├── content-contract.ts    # Validates content from toolkit
    └── case-study-order.ts    # Parses ?order= param, reorders data
```

### Structure Rationale

- **sections/:** Each of the 8 page sections is its own Astro component. They are static by default (zero JS). This matches the long-page editorial format where content IS the page, not interactions.
- **interactive/:** Only 2-3 components need JavaScript: theme toggle, easter egg panel, and easter egg triggers. These are React/Preact islands that hydrate selectively. The hard boundary between `sections/` and `interactive/` enforces the islands architecture -- if something is in `sections/`, it ships zero JS.
- **styles/tokens/:** The three-tier token system lives in plain CSS files, not in JavaScript. This keeps the token layer framework-agnostic and ensures theme switching is a pure CSS operation (redefining custom properties), never a JS re-render.
- **scripts/theme-init.ts:** This MUST be a separate file inlined into `<head>` as a blocking script. It cannot be bundled with other JS because it needs to execute synchronously before first paint. It reads `?mode=` from the URL and sets `data-theme` on `<html>`.
- **content/config.ts:** The content collection configuration points Astro's glob() loader at the toolkit repo's master-files directory. Content is read at build time, validated against a schema, and consumed as typed data by section components.

## Architectural Patterns

### Pattern 1: Three-Tier Design Token System

**What:** All visual values are expressed as CSS custom properties organized in three layers: primitives (raw values), semantic (purpose-mapped, theme-dependent), and component (element-scoped aliases). Theme switching ONLY redefines the semantic layer.

**When to use:** Always. This is the foundational pattern. Every color, font, spacing, shadow, and border in the project references tokens. No hardcoded values in component styles.

**Trade-offs:** Slightly more indirection when writing CSS (you reference `var(--card-border-color)` instead of `1px solid cyan`). This indirection is the entire point -- it makes theme switching a CSS-only operation.

**Example:**
```css
/* primitives.css -- raw palette, never changes */
:root {
  --white: #ffffff;
  --gray-50: #fafafa;
  --gray-900: #0a0a0f;
  --cyan-400: #22d3ee;
  --cyan-500: #06b6d4;
  --teal-900: #0f2a2e;
}

/* semantic-light.css -- mapped by purpose, active in light mode */
[data-theme="light"] {
  --color-bg-primary: var(--white);
  --color-bg-secondary: var(--gray-50);
  --color-text-primary: var(--gray-900);
  --color-accent: #2563eb;         /* blue for light mode */
  --color-border: rgba(0,0,0,0.1);
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
  --border-treatment: 1px solid var(--color-border);
}

/* semantic-dark.css -- same tokens, different values */
[data-theme="dark"] {
  --color-bg-primary: var(--gray-900);
  --color-bg-secondary: var(--teal-900);
  --color-text-primary: #e2e8f0;
  --color-accent: var(--cyan-400);  /* cyan for dark mode */
  --color-border: rgba(34,211,238,0.2);
  --font-heading: 'JetBrains Mono', monospace;
  --font-body: 'Inter', system-ui, sans-serif;
  --shadow-card: 0 0 15px rgba(6,182,212,0.15);
  --border-treatment: 1px solid var(--color-border);
}

/* components.css -- element-specific aliases */
.card {
  --card-bg: var(--color-bg-secondary);
  --card-border: var(--border-treatment);
  --card-shadow: var(--shadow-card);
  background: var(--card-bg);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
}
```

### Pattern 2: Blocking Theme Initialization (Anti-FOUC)

**What:** A synchronous inline script in `<head>` that reads URL parameters and sets the theme attribute on `<html>` before any CSS or body content is parsed. This prevents the flash of unstyled content when a user arrives via a themed URL.

**When to use:** On every page load. This script is the first thing that executes.

**Trade-offs:** Adds ~500 bytes of render-blocking JS to `<head>`. This is an acceptable trade-off because the alternative (theme flash) is far worse for a design portfolio.

**Example:**
```html
<!-- In BaseLayout.astro <head>, before any stylesheet links -->
<script is:inline>
  (function() {
    var params = new URLSearchParams(window.location.search);
    var urlMode = params.get('mode');
    var stored = localStorage.getItem('theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // Priority: URL param > localStorage > system preference > default light
    var theme = urlMode || stored || system || 'light';
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    // Persist the resolved theme
    localStorage.setItem('theme', theme);
  })();
</script>
```

### Pattern 3: Islands Architecture for Selective Interactivity

**What:** The page is 95% static HTML rendered at build time. Only 2-3 components hydrate as interactive JavaScript "islands": the theme toggle, easter egg trigger, and easter egg panel. Everything else ships zero JavaScript.

**When to use:** This is the default. A component becomes an island ONLY if it requires client-side interactivity (click handlers, state changes, dynamic rendering). Content sections, layout, typography, and the entire token system are static.

**Trade-offs:** Slightly more ceremony when adding interactivity (you must explicitly add `client:` directives). This friction is intentional -- it prevents accidental JS bloat.

**Example:**
```astro
---
// index.astro -- assembles the single page
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';          // Static
import CaseStudies from '../components/sections/CaseStudies.astro';  // Static
import ThemeToggle from '../components/interactive/ThemeToggle'; // Island
import EasterEggTrigger from '../components/interactive/EasterEggTrigger'; // Island
---
<BaseLayout>
  <header>
    <!-- Theme toggle hydrates immediately because it's always visible -->
    <ThemeToggle client:load />
  </header>

  <!-- All sections are static HTML, zero JS -->
  <Hero />
  <CaseStudies />
  <!-- ... other sections ... -->

  <!-- Easter egg panel hydrates when idle, loaded lazily -->
  <EasterEggTrigger client:idle />
</BaseLayout>
```

### Pattern 4: URL-as-State with replaceState Sync

**What:** URL query parameters (`?mode=`, `?order=`) are the initial source of truth on page load. After that, client-side state takes over and silently syncs back to the URL via `history.replaceState()` so bookmarks/shares reflect the current state. No page reload occurs.

**When to use:** For theme mode (read + write via toggle) and case study order (read-only from URL).

**Trade-offs:** `replaceState` does not trigger navigation events, so any component listening for popstate will not fire. This is fine because the toggle is the only thing that changes the mode after load.

**Example:**
```typescript
// url-state.ts
export function syncThemeToUrl(theme: 'light' | 'dark') {
  const url = new URL(window.location.href);
  url.searchParams.set('mode', theme);
  window.history.replaceState({}, '', url.toString());
  localStorage.setItem('theme', theme);
}

export function readCaseStudyOrder(): number[] | null {
  const params = new URLSearchParams(window.location.search);
  const order = params.get('order');
  if (!order) return null;
  const indices = order.split(',').map(Number).filter(n => !isNaN(n));
  return indices.length > 0 ? indices : null;
}
```

### Pattern 5: Build-Time Content Pipeline from External Repo

**What:** Case study content lives in the job search toolkit repo (`~/Desktop/job-search-toolkit/master-files/`). The portfolio's Astro content collection uses a glob() loader with a relative base path pointing to that external directory. Content is read, validated, and typed at build time. The portfolio never has its own copy of the content.

**When to use:** At build time only. The portfolio reads from the toolkit, but the toolkit does not depend on the portfolio. One-directional data flow.

**Trade-offs:** Build requires the toolkit repo to be present at the expected relative path. For CI/deployment, a content extraction step or symlink is needed. This trade-off is acceptable because both repos live on the same machine for development, and deployment can use a build script that clones/fetches the content first.

**Example:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../../job-search-toolkit/master-files/case-studies',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    role: z.string(),
    timeline: z.string(),
    client: z.string(),
    status: z.string().optional(),
  }),
});

const portfolioBase = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../../job-search-toolkit/master-files/portfolio-base',
  }),
});

export const collections = { caseStudies, portfolioBase };
```

**Deployment note:** For CI environments where the toolkit repo is not adjacent, the build script should pull content into a known location before `astro build` runs. A simple approach:

```bash
# build.sh -- used in CI
if [ ! -d "../job-search-toolkit" ]; then
  # Fetch content from a known source (git submodule, API, or artifact)
  echo "ERROR: job-search-toolkit not found at expected path"
  exit 1
fi
astro build
```

## Data Flow

### Initial Page Load Flow

```
[User clicks customized URL: marieportfolio.com/?mode=dark&order=2,1,4,3]
    │
    ▼
[CDN/Edge serves static HTML]
    │
    ├──[Edge middleware (if present)]──> Inject dynamic OG tags for social crawlers
    │
    ▼
[Browser begins parsing HTML]
    │
    ▼
[<head> blocking inline script executes]
    │  - Reads ?mode=dark from URL
    │  - Sets <html data-theme="dark">
    │  - Stores 'dark' in localStorage
    │
    ▼
[CSS loads with correct theme active]
    │  - [data-theme="dark"] selectors apply immediately
    │  - No flash: first paint is already dark theme
    │
    ▼
[Body HTML renders (static sections)]
    │  - Hero, What I Do, Impact... all visible immediately
    │  - Case studies rendered in default order (from build)
    │
    ▼
[Islands hydrate]
    │
    ├──[ThemeToggle (client:load)]
    │     - Reads current data-theme attribute
    │     - Renders toggle in correct state
    │     - On click: updates data-theme, calls replaceState, updates localStorage
    │
    ├──[CaseStudyReorder (client:load)]
    │     - Reads ?order= from URL
    │     - Reorders case study DOM elements (data-level reorder)
    │     - One-time operation, then idle
    │
    └──[EasterEggTrigger (client:idle)]
          - Registers event listeners for discovery triggers
          - Lazy-imports EasterEggPanel when triggered
```

### Theme Toggle Flow

```
[User clicks theme toggle]
    │
    ▼
[ThemeToggle component]
    │  - Determines new theme (opposite of current)
    │
    ├──> [1. Set attribute] document.documentElement.setAttribute('data-theme', newTheme)
    │       └── CSS custom properties immediately recalculate
    │           └── All colors, fonts, shadows update via CSS (no JS re-render)
    │
    ├──> [2. Sync URL] history.replaceState() updates ?mode= param
    │       └── URL now reflects current theme for sharing/bookmarking
    │
    ├──> [3. Persist] localStorage.setItem('theme', newTheme)
    │       └── Return visits use this preference
    │
    └──> [4. Prefetch assets] Load inactive theme's decorative assets
            └── Character illustration, decorative SVGs for new theme
```

### Build-Time Content Flow

```
[Job Search Toolkit Repo]
    │
    │  ~/Desktop/job-search-toolkit/master-files/
    │  ├── case-studies/          (5 markdown files)
    │  │   ├── epic-submit.md
    │  │   ├── epic-engage.md
    │  │   ├── vip.md
    │  │   ├── ptmp.md
    │  │   └── bambora.md
    │  └── portfolio-base/        (2 markdown files)
    │      ├── homepage.md
    │      └── about.md
    │
    ▼  (glob() loader reads at build time)
    │
[Astro Content Collections]
    │  - Parses markdown frontmatter
    │  - Validates against Zod schema
    │  - Generates typed data objects
    │  - Fails build if content contract broken
    │
    ▼
[Section Components consume typed data]
    │  - Hero.astro reads from portfolioBase
    │  - CaseStudies.astro reads from caseStudies
    │  - Impact.astro reads metrics from portfolioBase
    │
    ▼
[Static HTML output]
    Content baked into HTML at build time.
    No runtime content fetching.
```

### Key Data Flows

1. **Content flow (build time):** Toolkit master files --> Astro glob loader --> Content collections (typed) --> Section components --> Static HTML. One-directional. Toolkit is source of truth.

2. **Theme state flow (runtime):** URL param --> blocking script --> `data-theme` attribute --> CSS custom properties --> visual output. After load: Toggle click --> attribute + URL + localStorage (three-way sync).

3. **Case study order flow (runtime):** URL param --> client-side reorder script --> DOM mutation (data-level, not CSS-level). Read-only from URL. Users cannot reorder via UI.

4. **Easter egg flow (runtime):** User action (keyboard shortcut, long-press, specific click) --> event listener --> lazy-import panel component --> render overlay. Dismissable. Does not affect URL state.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 person viewing (dev) | Current architecture. Build from local file paths. Hot reload both repos. |
| 10-50 hiring managers/week | Static site on CDN handles this trivially. Edge middleware for OG tags. No changes needed. |
| Full case study pages (v2) | Add individual pages under `/case-study/[slug]`. Still static. Content collection already has the data. Router structure changes from single-page to hybrid. |
| Blog/writing section (future) | Add another content collection. Same architecture pattern. |

### Scaling Priorities

1. **First concern is not traffic, it's build reliability:** The external content dependency is the fragile point. If the toolkit repo moves, the build breaks. The content contract validation catches this at build time rather than runtime, which is the correct approach.

2. **Second concern is OG tag generation:** If dynamic OG images become complex (per-theme, per-ordering previews), the edge function may need caching or pre-generation. But at the expected scale (tens of customized URLs, not thousands), this is not a concern.

## Anti-Patterns

### Anti-Pattern 1: Component-Level Theme Branching

**What people do:** Write `if (theme === 'dark') return <DarkHero />` inside components, creating parallel component trees for each theme.

**Why it's wrong:** Doubles maintenance, doubles bugs. Theme toggle triggers a full component unmount/remount instead of a CSS variable swap. Performance degrades because React must diff two different trees. Adding a new section means building it twice.

**Do this instead:** ONE component tree. Theme switching is a CSS-only operation. The `data-theme` attribute on `<html>` triggers CSS custom property overrides. Components never know or care which theme is active. The only exception: conditional rendering for purely decorative overlays (a glow particle effect in dark mode that has no light-mode equivalent), and these should be CSS-driven (`opacity: 0` in light, `opacity: 1` in dark) rather than JS-driven.

### Anti-Pattern 2: JavaScript Scroll Listeners for Animation

**What people do:** Attach `scroll` event listeners with `requestAnimationFrame` to trigger section reveal animations, parallax, or progress indicators.

**Why it's wrong:** Scroll listeners fire on the main thread. Even with `requestAnimationFrame`, the listener registration and callback evaluation block the thread. On mid-range devices (a hiring manager's 3-year-old laptop with 30 tabs open), this causes visible jank during scrolling -- the one interaction that should feel silky.

**Do this instead:** Use CSS scroll-driven animations (supported in all major browsers as of 2026, including Safari 26). For reveal effects, use `IntersectionObserver` (fires once when element enters viewport, not on every pixel scrolled). Astro's `client:visible` directive uses IntersectionObserver internally -- use it for island hydration rather than custom scroll detection. For scroll-snap between sections, use pure CSS `scroll-snap-type: y proximity`.

### Anti-Pattern 3: Storing Content in the Portfolio Repo

**What people do:** Copy markdown files from the toolkit into `src/content/` in the portfolio repo for convenience.

**Why it's wrong:** Creates two copies of the content with no sync mechanism. Over time, edits happen in one place but not the other. The toolkit generates URLs expecting specific content structure that the portfolio's diverged copy may not match. Content drift is silent and only surfaces when something visually breaks.

**Do this instead:** The portfolio NEVER stores content. It reads from the toolkit's master-files directory at build time via the glob() content loader. The toolkit is the single source of truth. If the content is missing at build time, the build fails loudly with a clear error message.

### Anti-Pattern 4: Eager-Loading Both Themes' Assets

**What people do:** Preload both character illustrations, both sets of decorative SVGs, and all background textures in the initial HTML to make the theme toggle feel instant.

**Why it's wrong:** Doubles the initial download. The inactive theme's character illustration is a large asset (SVG or optimized image) that the user may never see. On mobile connections, this delays Largest Contentful Paint for no benefit.

**Do this instead:** Eager-load only the active theme's critical assets (hero character, above-the-fold decorative elements). Prefetch the inactive theme's assets after the page becomes interactive using `requestIdleCallback`. The 200ms delay while prefetched assets load on toggle is imperceptible compared to the seconds saved on initial load.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Hosting (Vercel/Netlify) | Astro adapter + edge middleware | Edge middleware for dynamic OG tags. Astro has first-party adapters for both. |
| OG Image Generation | Satori / @vercel/og at edge | Generates theme-appropriate social preview images dynamically |
| Analytics (optional) | Lightweight script (Plausible/Fathom) | Privacy-respecting, no cookie banners. Load async, never blocking. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Portfolio repo <--> Toolkit repo | File system read at build time (glob loader) | One-directional. Portfolio reads, toolkit writes. No runtime communication. |
| Blocking script <--> Island components | `data-theme` attribute on `<html>` | The blocking script sets the attribute. Islands read it. No shared JS state needed. |
| Theme toggle <--> CSS token system | `data-theme` attribute change triggers CSS recalculation | Islands never import or manipulate CSS tokens directly. They change the attribute, CSS does the rest. |
| Easter egg system <--> Main content | Overlay/portal pattern | Easter egg panel renders as a positioned overlay, does not modify the section DOM. Closing it returns to clean state. |
| Case study reorder <--> Section rendering | Data-level array sort before render | The order parameter sorts the case study data array. Section components render whatever order they receive. No DOM manipulation post-render. |

### Integration with Job Search Toolkit

The toolkit generates URLs for the portfolio. This is a one-directional, asynchronous integration:

1. **At build time:** Portfolio reads case study markdown from toolkit master-files.
2. **At application time:** Toolkit generates a URL like `marieportfolio.com/?mode=dark&order=2,1,4,3` and includes it in application materials.
3. **At visit time:** Portfolio's client-side code reads the URL params and adjusts presentation.

There is no API, no webhook, no runtime communication between the two repos. The URL IS the interface. This is intentionally simple -- the contract is: "the toolkit generates URLs with `?mode=` and `?order=` parameters, and the portfolio knows how to consume them."

## Build Order Implications

The architecture has clear dependency chains that determine what must be built first:

```
Phase 1: Foundation (no dependencies)
  ├── Design token system (primitives + semantic + component CSS)
  ├── Blocking theme init script
  ├── BaseLayout with font preloading
  └── Section.astro wrapper component

Phase 2: Content Pipeline (depends on Phase 1 for layout)
  ├── Content collection config (glob loader pointing to toolkit)
  ├── Content contract validation (Zod schema)
  └── Section components consuming typed content

Phase 3: Sections + Static Page (depends on Phase 1 tokens + Phase 2 content)
  ├── All 8 section components (static Astro, styled with tokens)
  ├── index.astro assembling sections
  └── Responsive layout for all sections

Phase 4: Interactivity Islands (depends on Phase 1 tokens + Phase 3 sections)
  ├── Theme toggle component (island)
  ├── URL state sync (replaceState)
  └── Case study reorder (client-side data sort)

Phase 5: Polish + Easter Eggs (depends on all above)
  ├── Scroll-driven animations
  ├── Easter egg system (triggers + panel)
  ├── Reduced motion support
  └── Performance optimization

Phase 6: Deployment + OG (depends on Phase 4 for URL params)
  ├── Hosting adapter setup
  ├── Edge middleware for dynamic OG
  └── OG image generation
```

**Why this order:**
- Tokens first because everything depends on them. Building components without tokens means hardcoding values you'll later have to replace.
- Content pipeline before sections because sections need typed data to render. Building sections with placeholder data means re-testing when real data arrives.
- Static sections before interactivity because the islands pattern requires the static shell to exist first. You hydrate into existing HTML.
- Easter eggs last because they are additive -- they enhance a working page but don't change its structure.
- OG/deployment after interactivity because the edge middleware needs to know which URL params exist and how they affect presentation.

## Sources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) -- HIGH confidence, official docs
- [Astro Content Loader API Reference](https://docs.astro.build/en/reference/content-loader-reference/) -- HIGH confidence, official docs
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/) -- HIGH confidence, official docs
- [External Content Collections Discussion (Resolved with Loaders)](https://github.com/withastro/roadmap/discussions/434) -- HIGH confidence, official Astro team confirmation
- [CSS Scroll-Driven Animations (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) -- HIGH confidence, official reference
- [Interop 2026: Scroll-driven animations cross-browser](https://webkit.org/blog/17818/announcing-interop-2026/) -- HIGH confidence, official WebKit
- [URL as State Management](https://alfy.blog/2025/10/31/your-url-is-your-state.html) -- MEDIUM confidence, well-reasoned pattern article
- [The URL is the Ultimate Global State Management Tool](https://www.jacobparis.com/content/url-as-state-management) -- MEDIUM confidence, widely cited pattern article
- [The Developer's Guide to Design Tokens and CSS Variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) -- MEDIUM confidence
- [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026) -- MEDIUM confidence
- [Vercel OG Image Generation with Astro](https://www.thomasledoux.be/blog/adding-vercel-og-image-astro-project) -- MEDIUM confidence, practical implementation guide
- [Netlify Edge Functions for OG Images](https://www.kevinzunigacuellar.com/blog/og-images-on-the-edge/) -- MEDIUM confidence, practical implementation guide
- [Leva React GUI Library](https://github.com/pmndrs/leva) -- HIGH confidence, official GitHub repo

---
*Architecture research for: Dual-mode interactive designer portfolio*
*Researched: 2026-03-02*
