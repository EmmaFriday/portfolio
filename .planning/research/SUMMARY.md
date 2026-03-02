# Project Research Summary

**Project:** Dual-mode interactive designer portfolio
**Domain:** Senior UX/Product Designer personal portfolio with URL-driven customization
**Researched:** 2026-03-02
**Confidence:** HIGH

## Executive Summary

This is a high-interactivity single-page portfolio built around a core thesis: a single site that presents two distinct visual personalities — a clean, editorial "Notion" mode and a retro sci-fi dark mode — both controlled through the URL and a visible mode toggle. The site's unique value is the URL query parameter system (`?mode=`, `?order=`) that lets the job search toolkit generate per-application customized links, making the portfolio an active job search instrument rather than a static artifact. Research across stack, features, architecture, and pitfalls points to a single, cohesive build approach: one React component tree, a three-tier CSS token system as the theme foundation, and a static site output deployable to any CDN.

The recommended approach is **Next.js 16 with static export** (not Astro, see Framework Decision below), with Tailwind CSS v4 for the dual-mode token system, GSAP for scroll animations, Motion for micro-interactions, and next-themes for flash-free theme management. The content pipeline reads case study markdown from the adjacent job search toolkit repo at build time — the portfolio never stores its own copy of case study content. All interactivity runs client-side after a static HTML shell is served from a CDN, with a blocking inline script in `<head>` ensuring zero theme flash on URL-controlled page loads.

The primary risks are (1) theme flash on first load with `?mode=dark` — solvable with a blocking inline `<head>` script, (2) the "two websites" trap of diverging component trees per theme — prevented by building the CSS token system first and treating theme switching as a CSS-only operation, and (3) accessibility failures in the sci-fi dark mode where glow aesthetics conflict with WCAG contrast requirements — mitigated by contrast-checking every semantic token value before it touches a component. Animation performance on real hiring-manager hardware (degraded CPU, many tabs) is the fourth critical risk; the mitigation is strict adherence to transform/opacity-only animation and a Lighthouse mobile score above 90.

---

## Framework Decision: Next.js vs. Astro

**There is a documented disagreement between the Stack researcher (Next.js 16) and the Architecture researcher (Astro with islands). This summary resolves it in favor of Next.js.**

**Recommendation: Next.js 16 with `output: 'export'`**

The Architecture researcher designed an excellent Astro islands architecture, but the premise of that architecture — that most of the page is static HTML with only 2-3 interactive islands — does not hold for this project. The site's core features create pervasive interactivity:

- The dual-mode theming system requires React Context to share `data-theme` state across the entire component tree
- GSAP scroll animations and Motion micro-interactions run on nearly every visible element
- The leva control panel easter egg is a React-first library with hooks integration
- URL state sync (`useSearchParams`) is a native Next.js hook

In Astro, sharing state between islands (e.g., the theme toggle affecting scroll animation parameters) requires a nanostores workaround; React Context cannot cross island boundaries. When more than 90% of the page is interactive, islands architecture creates friction instead of removing it.

The Stack researcher's rationale is decisive: this project's interactivity profile matches a full React app, not a content-first site. Next.js static export (`output: 'export'`) produces identical deployable HTML/CSS/JS output to what Astro would produce — the same CDN deployment, the same performance characteristics — but with a React component tree that makes global state (theme, scroll, leva) flow naturally through context and hooks.

The Architecture researcher's patterns remain valid and are adopted in full: the three-tier token system, the blocking theme init script, the URL-as-state with `replaceState` sync, the build-time content pipeline from the toolkit repo, and the data-level case study reordering. Only the framework changes. The file structure maps cleanly from Astro components to Next.js App Router components.

---

## Key Findings

### Recommended Stack

The foundation is **Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS v4**. Tailwind v4's CSS-first configuration with `@theme` directive and CSS custom properties is purpose-built for this dual-mode system: define light and dark semantic tokens in separate CSS files, toggle a `data-theme` attribute, and all visual properties update via the cascade — no JavaScript re-render required. This is the architectural foundation that prevents the "two websites" trap.

For animation, the approach is a deliberate split: **GSAP 3.14** handles scroll-triggered timelines, ScrollTrigger pinning, and long-scroll narrative sequences; **Motion 12.34** handles declarative React micro-interactions (hover states, presence animations, enter/exit). The two libraries complement rather than compete. Both are free. All animation must be restricted to `transform` and `opacity` properties to stay compositor-threaded and avoid jank.

**Core technologies:**
- **Next.js 16.1.6**: React meta-framework, static export (`output: 'export'`), `useSearchParams` for URL query params — the App Router makes all of this native
- **React 19.2.4**: Required by Next.js 16; React 19's performance improvements benefit the complex theme state + animation system
- **TypeScript 5.9.3**: Non-negotiable; catches theme/mode type bugs at compile time
- **Tailwind CSS 4.2.1**: CSS-first `@theme` configuration with CSS custom properties; v4's design token approach is the dual-mode theming foundation
- **GSAP 3.14.2 + @gsap/react 2.1.2**: Scroll animations, timeline sequences; free post-Webflow acquisition; `useGSAP` hook for clean React integration
- **Motion 12.34.4**: Declarative React micro-interactions; import from `motion/react` (not `framer-motion`)
- **next-themes 0.4.6**: Zero-flicker SSR-safe theme switching; handles localStorage + system preference + `<html>` class toggling; two lines to set up
- **leva 0.10.1**: React-first GUI panel for the sci-fi easter egg control panel; v2+ feature
- **gray-matter 4.0.3**: Frontmatter parsing for case study markdown files; lightweight, battle-tested, no framework lock-in
- **Vercel**: Free Hobby tier with custom domains, automatic SSL, preview deployments; native Next.js support

**What not to use:** Contentlayer (unmaintained since 2023), `next-mdx-remote` (poorly maintained, overkill), `framer-motion` package name (rebranded to `motion`), Three.js/React Three Fiber (150KB+ bundle, overkill for 2D effects), any runtime CSS-in-JS (styled-components, Emotion), any opinionated UI library (Chakra, MUI).

### Expected Features

The feature landscape is clear and well-prioritized. The portfolio's thesis requires the dual-mode system to be present at launch — it is not a nice-to-have. Without it, the site is another clean UX portfolio.

**Must have (table stakes) — all in v1:**
- Hero with specific positioning statement (0-3 second hiring manager decision window) — Marie's existing copy is already strong
- Impact metrics section with large scannable figures — 6 strong metrics already exist
- 4-5 case study preview cards, outcome-first framing, vertical layout — core of the portfolio
- Dual-mode theming (light editorial + dark sci-fi) — the portfolio's thesis
- Mode toggle in header — visible, designed, signature interaction (not hidden)
- URL query params: `?mode=light|dark` and `?order=2,1,4,3` — toolkit integration (enables per-application customization)
- About/values/fit sections — "Beyond the Portfolio," "What I Stand For," "The Right Fit"
- Contact CTA (mailto: link, not a contact form)
- Responsive design (desktop + mobile, long-scroll works naturally on mobile)
- Accessibility WCAG 2.1 AA in BOTH modes — non-negotiable for a designer who works on accessibility
- Open Graph meta tags — requires pre-rendering strategy; critical for link previews in Slack/LinkedIn
- Performance under 3s load time — Lighthouse mobile score above 90
- Custom domain on Vercel

**Should have (competitive advantage) — v1.x after launch validation:**
- Scroll-triggered reveal animations (GSAP ScrollTrigger)
- Impact metrics visualization (animated counters, typographic progressions)
- Mode toggle transition animation (View Transitions API via react-theme-switch-animation)
- Basic easter eggs (Konami code, text selection surprises)
- Illustrated character mode swap

**Defer (v2+):**
- Full case study pages (massive content/design effort; link to uxfol.io pages as interim)
- Leva-style hidden control panel — high delight, high effort; meaningful only once base experience is polished
- Advanced easter eggs (device sensor triggers, console messages)
- Analytics integration
- Persona-based case study filtering

**Anti-features to deliberately not build in v1:** Blog/writing section, contact form, real-time CMS, chat widget, 3D/WebGL scenes, video backgrounds, multi-page navigation, authentication.

### Architecture Approach

The architecture is a statically-exported Next.js App Router single-page site with all content baked into HTML at build time. The content pipeline reads case study markdown files from the adjacent job search toolkit repo at build time using `gray-matter`; the portfolio never stores its own content copy. Theme state flows through three synchronized channels: `data-theme` attribute on `<html>`, `localStorage`, and URL `?mode=` param — with a strict priority chain (URL param > localStorage > system preference > default light). A blocking inline `<script>` in `<head>` reads the URL param and sets `data-theme` before any CSS loads, preventing theme flash.

**Major components:**
1. **Design Token Layer (CSS custom properties)** — three tiers: primitives (raw values) → semantic tokens (purpose-mapped, theme-dependent) → component tokens (element-scoped). Theme switching only redefines the semantic layer. Built first, before any component.
2. **Blocking Theme Init Script** — synchronous inline `<script>` in `<head>`. Reads `?mode=`, sets `data-theme` on `<html>`, writes to `localStorage`. Executes before first paint. 500 bytes. Non-negotiable.
3. **Section Components** — 8 static page sections (Hero, What I Do, Impact, Case Studies, Beyond, What I Stand For, The Right Fit, Contact). Static HTML styled entirely through CSS tokens. Zero business logic.
4. **Theme Toggle Component** — Next.js client component via `next-themes`. Reads/writes theme. On toggle: updates `data-theme` attribute + `localStorage` + `replaceState` syncs `?mode=` in URL. Never causes a page reload.
5. **URL State Manager** — reads `?order=` to reorder case study data array before render (data-level, not CSS-level, for screen reader compatibility). Reads `?mode=` on load (handled by init script).
6. **Content Pipeline** — `gray-matter` reads markdown at build time from `~/Desktop/job-search-toolkit/master-files/`. Content contract validated at build time; build fails loudly if contract is broken.
7. **Easter Egg System** — lazily loaded React client component. Overlay/portal pattern. Does not modify section DOM. v2+ priority.
8. **Edge Middleware (Vercel)** — intercepts requests with `?mode=` or `?order=` params, injects dynamic OG meta tags for social crawlers before returning HTML.

**Key architectural patterns:**
- One component tree. Theme switching is CSS-only (no component swapping).
- CSS scroll-driven animations (compositor-threaded, no JS scroll listeners) for reveal effects; `IntersectionObserver` where JS is needed.
- Data-level case study reordering (array sort before render), not CSS `order` property.
- Lazy-load inactive theme's decorative assets; prefetch on `requestIdleCallback` after page is interactive.

### Critical Pitfalls

1. **Theme flash (FOUC) on URL-controlled load** — A `?mode=dark` link briefly shows light theme before JS runs. Prevention: blocking inline `<script>` in `<head>`, before any CSS, that reads `?mode=` and sets `data-theme` synchronously. Must be solved in the very first theming phase. Test by loading with 4x CPU throttle in Chrome DevTools.

2. **The "Two Websites" trap** — Two themes that diverge at the component level (separate component trees per theme) instead of the CSS token level, creating double maintenance and jarring toggle transitions. Prevention: build the three-tier token system first; theme switching must remain a CSS-only operation. Detection: any `if (theme === 'dark') return <DarkCard />` in a component file is the trap.

3. **Accessibility failures in dark/sci-fi mode** — Neon glow aesthetics inherently fight WCAG contrast requirements. Cyan on dark can look vivid but fail 4.5:1. Glow animations trigger vestibular discomfort. Prevention: contrast-check every semantic token value before using it; apply glows to borders/decorative elements only (never body text); implement `prefers-reduced-motion` fully (disable, not slow); test BOTH modes with Lighthouse and axe DevTools.

4. **Animation performance on degraded hardware** — Scroll animations, glow effects, and parallax create a 15fps slideshow on a hiring manager's laptop with 30 tabs open. Prevention: animate only `transform` and `opacity` (compositor-threaded); use CSS Scroll-Driven Animations API; set Lighthouse mobile performance budget above 90; test on 4x CPU throttle + Fast 3G. Hiring managers spend 55 seconds on a portfolio — jank wastes 20% of that window.

5. **Broken social sharing previews via query parameters** — A `?mode=dark&order=2,1,4,3` URL pasted into Slack shows a generic preview because crawlers don't execute JS to read params. Prevention: Vercel Edge Middleware intercepts requests with query params, injects dynamic OG meta tags with theme-appropriate preview. Must be planned with the URL parameter system, not deferred to polish.

---

## Implications for Roadmap

Based on the architectural build order dependencies identified in ARCHITECTURE.md, combined with feature priorities from FEATURES.md and pitfall phase warnings from PITFALLS.md, the research strongly implies a 6-phase build order. The most important rule: **build foundations before surfaces**. The token system before components; content pipeline before sections; static sections before interactivity; animations last.

### Phase 1: Foundation — Design Tokens, Theme Init, and Project Scaffold

**Rationale:** Everything else depends on the token system. Building any component before tokens are defined means hardcoding values that must later be replaced. The blocking theme init script must also be in place from the first deploy, because retrofitting it later requires changes to the HTML document structure. This phase has zero user-visible output but determines whether all subsequent phases are maintainable or not.

**Delivers:** Working Next.js 16 project scaffold, three-tier CSS token system (primitives + semantic light/dark + component), blocking `<head>` theme init script, font preloading (both themes' fonts preloaded from day one to prevent FOUT), base layout shell with responsive grid.

**Addresses (from FEATURES.md):** Responsive design, custom domain setup on Vercel, Tailwind v4 configuration

**Avoids (from PITFALLS.md):** Theme Flash (Pitfall 1), Two Websites Trap (Pitfall 2), Accessibility token failures (Pitfall 3), Font loading flash (Pitfall 7)

**Research flag:** Standard patterns. No additional research needed. Tailwind v4 `@theme` directive and CSS custom properties are well-documented.

---

### Phase 2: Content Pipeline and Data Layer

**Rationale:** Section components need typed, validated content to render. Building sections with placeholder data means re-testing when real data arrives, and the content contract between the portfolio and the toolkit is a foundational integration that cannot be retrofitted without risk of silent content drift.

**Delivers:** `gray-matter` content loader reading from `~/Desktop/job-search-toolkit/master-files/`, content contract schema (required frontmatter fields), build-time validation that fails loudly on contract violations, typed data objects consumed by section components.

**Addresses (from FEATURES.md):** Case study data model, URL `?order=` parameter parsing (data-level array sort before render)

**Avoids (from PITFALLS.md):** Content Drift (Pitfall 8), CSS `order` vs. DOM order accessibility issue (Pitfall 11)

**Research flag:** Needs attention during planning. The exact content contract between the two repos must be defined and agreed on. The CI/deployment build script (for when the toolkit repo may not be co-located with the portfolio repo) needs a concrete implementation plan.

---

### Phase 3: Static Page Sections

**Rationale:** The 8 static sections are the core product. They must be built, styled with the token system, and be fully readable with all animations disabled before any interactivity or animation is layered on. This is the "content-first" rule from PITFALLS.md Pitfall 9 in practice: test that a hiring manager can find case studies, metrics, and contact information within 60 seconds with animations disabled.

**Delivers:** All 8 section components (Hero, What I Do, Impact, Case Studies, Beyond, What I Stand For, The Right Fit, Contact), outcome-first case study preview cards, impact metrics display, illustrated character asset integration (both mode variants), responsive layout across all sections, Open Graph meta tags pre-rendered at build time, smooth scroll navigation with section anchors.

**Addresses (from FEATURES.md):** Hero with positioning, impact metrics, case study preview cards, About/values/fit sections, contact CTA, illustrated character, Open Graph meta tags, responsive design, performance

**Avoids (from PITFALLS.md):** Impressive vs. Usable trap (Pitfall 9 — content hierarchy before animation), Bundle bloat from eager-loading both themes' assets (Pitfall 12)

**Research flag:** Standard patterns. Section components are well-documented Next.js patterns. Open Graph meta tag pre-rendering with Next.js static export is documented.

---

### Phase 4: Interactivity — Theme Toggle, URL State, and Mode Toggle

**Rationale:** The theme toggle, URL state sync, and mode toggle are distinct from the visual system (Phase 1 tokens) and the content system (Phases 2-3). They require the static shell to exist first — the islands pattern hydrates into existing HTML. The `next-themes` integration and `replaceState` sync must be built as a unit because they share the URL/localStorage/state priority chain.

**Delivers:** `next-themes` `ThemeProvider` wrapping the layout, mode toggle component in header (visible, designed — not a generic switch), URL state sync (`history.replaceState` keeps `?mode=` current after toggle), URL `?mode=` reading on load (coordinated with Phase 1 blocking script), URL `?order=` case study reordering (data-level array sort activated client-side).

**Addresses (from FEATURES.md):** Mode toggle in header, URL param `?mode=light|dark`, URL param `?order=2,1,4,3`, full toolkit integration

**Avoids (from PITFALLS.md):** URL param state not reflected in toggle (Pitfall 10), Confidentiality leak from URL params (Pitfall 13 — keep params as opaque numeric indices)

**Research flag:** Standard patterns with one watch item. `next-themes` v0.4.6 is well-documented. `history.replaceState` URL sync is an established pattern. **Watch:** the three-way state sync (URL param + `localStorage` + `data-theme` attribute) needs careful sequencing; the blocking init script (Phase 1) and `next-themes` (Phase 4) must agree on which channel wins. The priority chain (URL param > localStorage > system preference > default light) must be implemented consistently in both places.

---

### Phase 5: Polish — Animations, Scroll Effects, and Easter Eggs (Basic)

**Rationale:** Animations are progressive enhancement layered on a working, accessible, performant page. The performance budget (Lighthouse mobile above 90) must be established before this phase begins and enforced after each animation addition. Easter eggs at this phase are limited to the basic tier (Konami code, text selection reactions, hover interactions) that do not risk interfering with the hiring-manager content flow.

**Delivers:** GSAP ScrollTrigger scroll-triggered section reveal animations, Motion micro-interactions (hover states on case study cards, enter/exit transitions), mode toggle transition animation (View Transitions API via `react-theme-switch-animation`), impact metrics animated counters, `prefers-reduced-motion` full implementation (disable, not slow), basic easter egg layer, illustrated character mode swap, smooth scroll active section indicator.

**Addresses (from FEATURES.md):** Scroll-triggered animations, metrics visualization, mode toggle animation, basic easter eggs, illustrated character swap — all v1.x features

**Avoids (from PITFALLS.md):** Animation performance tank (Pitfall 4 — transform/opacity only, CSS Scroll-Driven Animations API, Lighthouse budget), Easter eggs that confuse (Pitfall 6 — design trigger patterns before building, never interfere with content flow)

**Research flag:** Needs attention during planning for performance. The specific combination of GSAP ScrollTrigger + Motion micro-interactions on a long single-page scroll needs profiling against the Lighthouse mobile budget. CSS Scroll-Driven Animations API is fully supported across all major browsers as of 2026 — prefer this over JS scroll listeners.

---

### Phase 6: Deployment, OG Edge Middleware, and Production Hardening

**Rationale:** The edge middleware for dynamic OG tags requires the URL parameter system (Phase 4) to be complete before it can be implemented — the middleware needs to know which params exist and how they affect presentation. Deployment infrastructure (Vercel, custom domain, preview deployments) should be confirmed working before production hardening begins.

**Delivers:** Vercel deployment with custom domain and SSL, Vercel Edge Middleware injecting dynamic OG meta tags based on `?mode=` and `?order=` params, OG image generation (Satori or `@vercel/og`) with theme-appropriate previews, production performance audit (Lighthouse CI), semantic HTML audit (view-source quality check, schema.org structured data), accessibility audit of both modes (axe DevTools, WCAG 2.1 AA verification), lazy-loading of inactive theme decorative assets with `requestIdleCallback` prefetch.

**Addresses (from FEATURES.md):** Custom domain, professional social sharing previews, performance optimization, accessibility WCAG 2.1 AA final sign-off

**Avoids (from PITFALLS.md):** Broken social sharing (Pitfall 5), View source quality (Pitfall 14), Bundle bloat (Pitfall 12)

**Research flag:** Needs phase-specific research on Vercel Edge Middleware + Satori OG image generation. The specific implementation (how to intercept `?mode=dark` and return a dark-themed OG image) is documented in Vercel and Netlify guides but has gotchas (caching, crawler behavior, `og:url` canonical URL strategy). The Architecture researcher flagged this as MEDIUM confidence.

---

### Phase Ordering Rationale

- **Tokens before components** (Phase 1 before 3): Any component built without the token system will have hardcoded values that become the "two websites" trap. The token system is not infrastructure — it IS the dual-mode feature.
- **Content pipeline before sections** (Phase 2 before 3): Sections need typed, validated data. Building with placeholder data creates re-testing overhead and risks silently breaking the content contract later.
- **Static sections before interactivity** (Phase 3 before 4): Client-side interactivity in Next.js hydrates into existing server-rendered HTML. The static shell must exist first.
- **Interactivity before animations** (Phase 4 before 5): Scroll animations and micro-interactions should enhance a working, theme-switched page — not be built in parallel with the theme toggle on an unstable base.
- **Animations before deployment** (Phase 5 before 6): The edge middleware needs to know the final URL param behavior. Deployment also serves as the production performance audit trigger — animations must be profiled before the site goes live.
- **OG/deployment last** (Phase 6): The dynamic OG strategy depends on knowing the full URL param surface area. This is also the correct moment for a final accessibility and performance audit rather than an afterthought.

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 2 (Content Pipeline):** The two-repo content contract and CI deployment build script have custom complexity that is project-specific. Define the exact content schema and build script before implementing.
- **Phase 5 (Animations):** GSAP ScrollTrigger + Motion performance on a complex long-scroll page needs profiling against the mobile Lighthouse budget. Run early performance tests before committing to animation scope.
- **Phase 6 (OG Edge Middleware):** Vercel Edge Middleware + Satori OG image generation has platform-specific implementation details. Research the exact implementation for dynamic theme-aware OG images during Phase 6 planning.

**Phases with well-documented standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** Next.js 16 setup, Tailwind v4 `@theme` configuration, and three-tier CSS token systems are all thoroughly documented.
- **Phase 3 (Static Sections):** Next.js App Router server components, gray-matter content loading, and responsive layout are standard patterns.
- **Phase 4 (Theme Toggle):** `next-themes` integration is a two-line setup. `history.replaceState` URL sync is a well-established pattern.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All package versions verified via npm registry on 2026-03-02. Framework decision (Next.js over Astro) is well-reasoned and corroborated across multiple comparison sources. One watch item: leva v0.10.1 + React 19 compatibility not fully verified — test during Phase 5 setup. |
| Features | HIGH | Feature priorities corroborated across multiple hiring manager and UX portfolio guides. The "55 seconds average review time" figure is well-sourced. Anti-feature decisions (no blog, no contact form, no 3D) are strongly supported. |
| Architecture | HIGH | Architectural patterns (three-tier tokens, blocking init script, URL-as-state, data-level reordering) are well-documented standards. The framework switch from Astro to Next.js does not change these patterns — they translate directly. One gap: the two-repo CI build script is custom to this project. |
| Pitfalls | HIGH | All critical pitfalls are backed by official standards (WCAG, Chrome DevTools, web.dev) or extensively documented community problems (FOUC, font flash). The animation performance pitfall is especially well-documented with concrete metrics (16.67ms frame budget, 60fps, Lighthouse mobile above 90). |

**Overall confidence:** HIGH

### Gaps to Address

- **leva + React 19 compatibility:** leva v0.10.1 was the latest release at research time but React 19 compatibility was flagged as LOW confidence. Test this early in Phase 5 setup; have a fallback plan (custom panel with React state rather than leva's hooks) if compatibility issues arise.

- **Two-repo CI build script:** The exact mechanism for making the job search toolkit content available during Vercel builds (the toolkit repo is not public) needs a concrete implementation decision. Options: git submodule, a content extraction script that commits a snapshot to the portfolio repo on update, or an environment-variable-configured content API. Decide during Phase 2 planning.

- **react-theme-switch-animation compatibility:** v1.0.0 is new and uses the View Transitions API, which has broad but not universal browser support. Progressive enhancement means it degrades gracefully, but test this in Safari and Firefox before committing to it as the mode toggle animation approach.

- **OG image generation strategy:** The Architecture researcher flagged this as MEDIUM confidence. The specific implementation for per-theme OG images via Vercel Edge Middleware and Satori needs phase-specific research during Phase 6 planning. The canonical URL strategy (`og:url` should point to the canonical URL without query params) also needs explicit implementation.

- **URL parameter encoding:** PITFALLS.md Pitfall 13 raises the question of whether `?order=2,1,4,3` is sufficiently opaque or whether encoded/hashed parameters (e.g., `?v=a3x9k`) are needed to protect the confidentiality of the per-application customization strategy. This is a design decision that should be made during Phase 4 planning, since it affects both the portfolio's URL parsing logic and the toolkit's URL generation logic.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (nextjs.org/docs) — static export, useSearchParams, App Router, MDX guide
- Tailwind CSS official docs (tailwindcss.com) — v4 dark mode, @theme directive, CSS custom properties
- GSAP official docs (gsap.com) — ScrollTrigger, @gsap/react useGSAP, licensing
- Motion official docs (motion.dev) — changelog, React 19 compatibility
- W3C WCAG 2.1 — contrast minimum, animation from interactions
- web.dev — dark/light theme switch, font preloading, CLS guidance
- Chrome DevTools team — scroll animation performance, 60fps frame budget
- npm registry — all version numbers verified 2026-03-02
- Astro official docs (docs.astro.build) — islands architecture, content collections (referenced for framework comparison)
- Vercel pricing page — free tier capabilities confirmed
- WebKit blog — Interop 2026, CSS Scroll-Driven Animations cross-browser support confirmed

### Secondary (MEDIUM confidence)
- Multiple comparison articles (2025-2026) — Astro vs. Next.js for interactive sites, animation library comparisons
- GitHub repos — pacocoursey/next-themes, pmndrs/leva, MinhOmega/react-theme-switch-animation (maintenance status, feature sets)
- Vercel and Netlify blogs — Edge Function OG image generation patterns
- Multiple portfolio guides — UX Playbook, OpenDoors Careers, IxDF, UXfolio Blog (hiring manager behavior, feature expectations)
- CSS-Tricks — dark mode guide, FOUC patterns
- Not A Number / Axel Larsson blogs — React/Next.js dark mode flicker prevention

### Tertiary (LOW confidence)
- Dev.to (Rose) — easter egg ideas (used for inspiration only, not for architecture decisions)
- Muzli top 100 creative portfolios 2025 — trend observation, not prescriptive guidance
- Medium (Eleana Gkogka) — easter egg UX patterns (single source, used alongside mainstream UX principles)

---
*Research completed: 2026-03-02*
*Ready for roadmap: yes*
