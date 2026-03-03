# Phase 2: Content Sections - Research

**Researched:** 2026-03-02
**Domain:** Static content architecture, CSS smooth scroll navigation, editorial layout with Next.js 16 + Tailwind v4
**Confidence:** HIGH

## Summary

Phase 2 transforms the existing 5-section demo page into 8 real content sections with data sourced from the job search toolkit's master case study files. The work spans three domains: (1) a TypeScript data layer that extracts and structures content from the toolkit master files into typed constants, (2) 8 section components built with the established inline-styles-with-CSS-variables pattern, and (3) CSS-only smooth scroll navigation in the sticky header.

The technical risk is low. All patterns are well-established: CSS `scroll-behavior: smooth` and `scroll-padding-top` have universal browser support, the token system already provides all needed semantic tokens, and the `PageContainer` component handles responsive wrapping. The primary complexity is content curation -- extracting the right metrics and narrative hooks from 4-5 detailed case study files (800+ lines of source material) into concise card content.

**Primary recommendation:** Build a single `src/data/content.ts` file with TypeScript interfaces and `as const` objects for all section content. Keep all content co-located in one file for easy editing. Use CSS `scroll-padding-top` on `html` rather than `scroll-margin-top` on individual sections for the most reliable sticky-header offset.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Mixed density editorial flow: spacious hero, tighter spacing for remaining sections
- Alternating backgrounds using --bg-primary and --bg-secondary tokens
- Heading sizes varied by section importance (display for Hero, larger H2 for Case Studies/Impact, smaller for personal sections)
- 4-5 case studies displayed: EPIC.submit, EPIC.engage, NSC Interactions, Bambora, plus any additional
- Vertical stack layout for case studies -- one full-width card per row, editorial feel
- Each card shows: outcome-first headline, key metric, role, 1-2 sentence strategic hook
- Cards are NOT clickable (static) -- no dead links, no false affordance
- 6 impact metrics from across ALL case studies (cross-project aggregate, not career stats)
- 3x2 grid on desktop, responsive stacking on mobile for metrics
- Each metric: big number in accent color, label below, one-line context description
- "Beyond the Portfolio" -- user provides content directly (too personal to infer)
- "What I Stand For" -- Claude drafts based on toolkit data, user edits
- "The Right Fit" -- Claude drafts, names specific roles (Staff Product Designer, Design Lead), team types (platform teams, B2B SaaS), problem spaces (complex multi-stakeholder systems)
- Tone varies: Beyond = warm & personal, Stand For = confident & principled, Right Fit = direct & clear

### Claude's Discretion
- Navigation link labels and which sections earn a nav link (not all 8 need one)
- Smooth scroll implementation approach
- Section component extraction strategy (which components to create)
- Content data architecture (how to structure case study data for sourcing from toolkit)
- Exact spacing values within sections
- Empty/loading states
- Mobile-specific layout adaptations within the responsive framework

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Hero section: name, role positioning, experience summary, illustrated character | Hero component with display typography; character placeholder until art is provided |
| CONT-02 | Impact metrics: 6 key metrics as large scannable figures with context | MetricsGrid component using 3x2 CSS Grid with accent-colored numbers and contextual descriptions |
| CONT-03 | "What I Do" section: specialties in categories (UX & Product Design, Design Systems, AI Workflows, Research & Strategy) | Simple category grid/list component; content defined in data layer |
| CONT-04 | 4-5 case study preview cards: outcome-first title, key metric, role, strategic hook | CaseStudyCard component in vertical stack; content extracted from toolkit master files |
| CONT-05 | "Beyond the Portfolio": personality, interests, human behind the work | Section component with placeholder content (user will provide real text) |
| CONT-06 | "What I Stand For": design values and philosophy | Section component with draft content from toolkit positioning data |
| CONT-07 | "The Right Fit": explicit positioning on roles, teams, problems | Section component naming specific roles/teams/domains from toolkit data |
| CONT-08 | Contact section: email link and LinkedIn as clear CTA | Contact component with mailto: link and LinkedIn URL |
| CONT-09 | Case study content sourced from toolkit master files at build time | TypeScript data file with content manually curated from master files (no build pipeline needed for v1) |
| TECH-06 | Smooth scroll navigation with sticky header | CSS scroll-behavior: smooth + scroll-padding-top + anchor links in Header |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App framework, Server Components by default | Already in project |
| React | 19.2.3 | UI rendering | Already in project |
| TypeScript | ^5 | Type safety for content data | Already in project |
| Tailwind CSS | ^4 | Layout utilities (flex, grid) | Already in project |
| next-themes | ^0.4.6 | Theme management | Already in project |

### Supporting (no new installs)
| Library | Purpose | When to Use |
|---------|---------|-------------|
| CSS custom properties | All semantic styling (colors, spacing, typography) | Every component -- established Phase 1 pattern |
| CSS scroll-behavior | Smooth scroll for anchor navigation | html element declaration |
| CSS scroll-padding-top | Offset for sticky header during scroll | html element declaration |
| CSS Grid | Metrics 3x2 layout, What I Do categories | Grid-based section layouts |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS scroll-behavior | JS scrollIntoView({ behavior: 'smooth' }) | CSS-only is simpler, no client component needed; JS gives finer control but unnecessary here |
| scroll-padding-top on html | scroll-margin-top on each section | scroll-padding-top is more reliable (Safari quirks with scroll-margin outside scroll-snap containers) and DRY (one declaration vs many) |
| Static TS data file | Markdown parsing at build time | TS file is simpler, type-safe, no build pipeline; markdown parsing is overkill for 4-5 case studies |
| Typed constants | CMS or JSON files | TS gives compile-time type checking; JSON loses type safety; CMS is massive overkill |

**Installation:** None required -- zero new dependencies.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   └── content.ts           # All section content as typed constants
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Updated: add nav links
│   │   └── PageContainer.tsx # Existing: reuse for all sections
│   └── sections/
│       ├── Hero.tsx
│       ├── WhatIDo.tsx
│       ├── ImpactMetrics.tsx
│       ├── CaseStudies.tsx
│       ├── CaseStudyCard.tsx
│       ├── BeyondPortfolio.tsx
│       ├── WhatIStandFor.tsx
│       ├── TheRightFit.tsx
│       └── Contact.tsx
└── app/
    └── page.tsx              # Replaced: imports and renders all sections
```

### Pattern 1: Typed Content Data File
**What:** A single TypeScript file that exports typed constants for all section content. Content is manually curated from the toolkit master files -- not dynamically parsed.
**When to use:** When content is relatively static (4-5 case studies that change infrequently) and type safety matters more than dynamic loading.
**Why manual curation:** The toolkit master files are 100-150 lines each of rich narrative. The portfolio needs 4-5 fields per case study. Automated extraction would be fragile; manual curation ensures outcome-first framing.

```typescript
// src/data/content.ts

export interface CaseStudy {
  id: string;
  title: string;        // Outcome-first headline
  metric: string;       // Key number, e.g. "5% → 80%"
  metricLabel: string;  // What the metric measures
  role: string;         // Role title
  hook: string;         // 1-2 sentence strategic hook
}

export interface ImpactMetric {
  value: string;        // The big number, e.g. "$390-495M"
  label: string;        // Short label, e.g. "Social Value"
  context: string;      // One-line description
}

export interface NavLink {
  label: string;
  href: string;         // e.g. "#impact"
}

export const caseStudies: CaseStudy[] = [
  {
    id: "epic-submit",
    title: "One Architecture, Many Teams: A Platform That Scales Without Redesign",
    metric: "100%",
    metricLabel: "Centralized in 5 months",
    role: "Senior UX Designer & Product Lead",
    hook: "Built a modular document submission system starting with the hardest use case, then watched it expand across an entire organization without a single structural change.",
  },
  // ... more case studies
] as const;

export const impactMetrics: ImpactMetric[] = [
  {
    value: "$390-495M",
    label: "Social Value Created",
    context: "Annual public safety impact from cross-system fraud detection",
  },
  // ... 5 more metrics
] as const;

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Fit", href: "#fit" },
  { label: "Contact", href: "#contact" },
];
```

### Pattern 2: Section Component with Established Conventions
**What:** Each section is a Server Component using the existing inline-style + CSS variable pattern.
**When to use:** Every section follows this structure.

```typescript
// src/components/sections/ImpactMetrics.tsx
import { PageContainer } from "@/components/layout/PageContainer";
import { impactMetrics } from "@/data/content";

export function ImpactMetrics() {
  return (
    <section
      id="impact"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <PageContainer>
        <h2
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--text-h2-lh)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-12)",
          }}
        >
          Impact
        </h2>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "var(--space-8)",
          }}
        >
          {impactMetrics.map((metric) => (
            <div key={metric.label}>
              <span
                style={{
                  fontSize: "var(--text-display)",
                  lineHeight: "var(--text-display-lh)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--accent-primary)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {metric.value}
              </span>
              <p
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--text-primary)",
                  marginTop: "var(--space-2)",
                }}
              >
                {metric.label}
              </p>
              <p
                style={{
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  color: "var(--text-secondary)",
                  marginTop: "var(--space-1)",
                }}
              >
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
```

### Pattern 3: CSS-Only Smooth Scroll Navigation
**What:** Declare `scroll-behavior: smooth` and `scroll-padding-top` on the `html` element via CSS, then use standard `<a href="#section-id">` links in the header.
**When to use:** Single-page navigation with a sticky header.

```css
/* In globals.css or tokens.css */
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--header-height);
}
```

```typescript
// Header nav links -- plain anchor tags, no JS needed
<nav className="flex items-center" style={{ gap: "var(--space-6)" }}>
  {navLinks.map((link) => (
    <a
      key={link.href}
      href={link.href}
      style={{
        fontSize: "var(--text-sm)",
        color: "var(--text-secondary)",
        textDecoration: "none",
      }}
    >
      {link.label}
    </a>
  ))}
</nav>
```

### Pattern 4: Case Study Vertical Stack
**What:** Full-width cards in a single column, editorial feel -- not a grid.
**When to use:** Case study section (per user decision).

```typescript
<div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
  {caseStudies.map((study) => (
    <CaseStudyCard key={study.id} study={study} />
  ))}
</div>
```

### Anti-Patterns to Avoid
- **Using Link component for anchor nav:** Next.js `<Link>` adds client-side routing overhead for same-page anchors. Use plain `<a href="#id">` for hash links.
- **Client components for static sections:** All section components should be Server Components. No `"use client"` needed -- they render static content with no interactivity.
- **Inline onClick scroll handlers:** With CSS `scroll-behavior: smooth`, JavaScript scroll handlers are unnecessary complexity. The CSS approach works with all browsers and respects `prefers-reduced-motion`.
- **Dynamic imports for content data:** The data file is tiny (< 200 lines). Dynamic import adds complexity for zero benefit.
- **Using --text-muted for metric labels:** Per Phase 1 decision, --text-muted (~3.0:1 contrast) is decorative only and fails WCAG AA. Use --text-secondary for all readable text.

## Content Extraction: What to Pull from Toolkit Master Files

### Available Case Studies (from `~/Desktop/job-search-toolkit/master-files/case-studies/`)

| File | Project Name | Best Outcome-First Title | Key Metric | Role |
|------|-------------|-------------------------|------------|------|
| epic-submit.md | EPIC.submit | "One Architecture, Many Teams: A Platform That Scales Without Redesign" | 100% centralized in 5 months | Senior UX Designer & Product Lead |
| epic-engage.md | EPIC.engage | "From 5% Useful to 80% Relevant: Redesigning Public Engagement for 5M Residents" | 5% to 80% comment quality | Senior UX/Product Designer, Researcher, Product Owner |
| ptmp.md | NSC Interactions (PTMP) | "Cross-System Intelligence for 20,000+ Carriers: From Months to Hours" | $390-495M annual social value | Senior UX/Product Designer & Information Architect |
| bambora.md | Bambora SSO | "Migrating 20,000+ Merchants to Modern Auth Without Breaking Payments" | 20,000+ merchants migrated | UX Designer |
| vip.md | VIP (Vehicle Inspection) | NOT published in portfolio (marked in file) | -- | -- |

**Note:** vip.md explicitly says "CURRENTLY NOT PUBLISHED IN PORTFOLIO" at line 1. The PTMP/NSC Interactions case study covers the same system family. Use 4 case studies: EPIC.submit, EPIC.engage, NSC Interactions, Bambora.

### Recommended 6 Impact Metrics (cross-project aggregate)

These are drawn from CONTEXT.md specifics and the master files:

| # | Value | Label | Context | Source |
|---|-------|-------|---------|--------|
| 1 | $390-495M | Annual Social Value | Public safety impact from cross-system fraud detection | ptmp.md |
| 2 | 5% to 80% | Comment Quality | Transformed public engagement feedback from noise to actionable input | epic-engage.md |
| 3 | 8,000+ | Staff Hours Saved | Annual operational time recovered through system integration | ptmp.md |
| 4 | 700-1,000 | Crashes Prevented | Annual road safety impact from data-driven enforcement | ptmp.md |
| 5 | 98% | Task Success Rate | Achieved across diverse users including older adults in rural areas | epic-engage.md |
| 6 | 100% | Centralized in 5 Months | Full migration of document submissions to unified platform | epic-submit.md |

### Content for "What I Do" Categories (CONT-03)

From toolkit positioning data and case studies:
- **UX & Product Design:** End-to-end product ownership from discovery to production
- **Design Systems:** Modular architectures that scale without redesign
- **AI Workflows:** AI-enhanced research and analysis (mentioned in epic-submit.md)
- **Research & Strategy:** Systematic stakeholder research programs (30+ participants, year-long discoveries)

### Content for Personal Sections

**"Beyond the Portfolio" (CONT-05):** User will provide. Use a clear placeholder that communicates what goes here.

**"What I Stand For" (CONT-06):** Draft from toolkit themes:
- Design for the most constrained users first
- Architecture decisions matter more than UI polish
- Systems thinking over screen-level thinking
- Operational independence: design things that work without the designer

**"The Right Fit" (CONT-07):** Draft from toolkit positioning:
- Roles: Staff Product Designer, Design Lead
- Teams: Platform teams, B2B SaaS, government digital services
- Problems: Complex multi-stakeholder systems, cross-team coordination, 0-to-1 product definition
- Scale: Enterprise systems serving thousands to millions of users

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scrolling | JavaScript scroll animation | CSS `scroll-behavior: smooth` | Browser-native, respects prefers-reduced-motion, zero JS |
| Sticky header offset | Manual padding/margin on sections | CSS `scroll-padding-top` on html | One declaration, DRY, automatically applies to all anchor targets |
| Theme-aware colors | Conditional className logic | CSS custom properties (semantic tokens) | Already built in Phase 1; components just reference --accent-primary etc. |
| Responsive grid | Media query breakpoints | `grid-template-columns: repeat(auto-fill, minmax(min(100%, Xpx), 1fr))` | Already proven pattern from Phase 1; intrinsically responsive |
| Content management | CMS, MDX pipeline, markdown parser | Plain TypeScript constants file | 4 case studies and 6 metrics don't warrant a content pipeline |

**Key insight:** This phase has zero new dependencies. Every pattern is already established in Phase 1 or uses native CSS. The work is content curation and component extraction, not technology integration.

## Common Pitfalls

### Pitfall 1: Anchor Link Scrolls Behind Sticky Header
**What goes wrong:** Clicking a nav link scrolls the target section behind the 64px sticky header, hiding the section heading.
**Why it happens:** Default anchor scroll positions the target element at the very top of the viewport, not accounting for the fixed header.
**How to avoid:** Add `scroll-padding-top: var(--header-height)` to the `html` element in CSS. This is more reliable than `scroll-margin-top` on each section (Safari quirks with scroll-margin outside scroll-snap containers).
**Warning signs:** Section headings are partially hidden when navigating via header links.

### Pitfall 2: Using Next.js Link for Hash Navigation
**What goes wrong:** `<Link href="#section">` triggers Next.js client-side navigation, potentially causing full component re-renders or scroll position issues.
**Why it happens:** Next.js Link is optimized for page-to-page navigation, not same-page anchors.
**How to avoid:** Use plain `<a href="#section">` elements for same-page anchor links. The Link component adds no value for hash-only navigation.
**Warning signs:** Flash of content, unexpected scroll behavior, or browser URL updating incorrectly.

### Pitfall 3: Making Section Components Client Components Unnecessarily
**What goes wrong:** Adding `"use client"` to section components that render static content.
**Why it happens:** Habit from React SPA development, or thinking any component that imports data needs client-side JS.
**How to avoid:** All 8 sections render static content from a TypeScript data file. They are Server Components by default in Next.js 16. Only the Header needs `"use client"` if it gains interactive features (like the theme toggle in Phase 3).
**Warning signs:** Large JS bundle for a page that is fundamentally static content.

### Pitfall 4: Forgetting section id Attributes
**What goes wrong:** Nav links point to `#impact` but no section has `id="impact"`, so clicking the link does nothing.
**Why it happens:** The section ids and the nav hrefs are defined in different files -- easy to get them out of sync.
**How to avoid:** Define section IDs in the content data file alongside nav links, or use constants that both the section and nav reference. Review all nav hrefs against section ids as a verification step.
**Warning signs:** Clicking a header nav link doesn't scroll anywhere.

### Pitfall 5: Inconsistent Heading Hierarchy
**What goes wrong:** Multiple H1 elements, skipped heading levels (H2 to H4), or mismatched visual/semantic hierarchy.
**Why it happens:** The user wants varied heading sizes, which might tempt using incorrect semantic elements.
**How to avoid:** Use one `<h1>` in Hero only. All other sections use `<h2>`. Sub-items within sections (card titles, category names) use `<h3>`. Vary visual size via CSS, not by changing heading level.
**Warning signs:** Accessibility audit flags heading hierarchy issues.

### Pitfall 6: Content Looks Like Placeholder
**What goes wrong:** Sections display generic lorem-ipsum-style text that reads like a template, not Marie's actual voice.
**Why it happens:** Rushing content curation, using overly generic descriptions instead of specific details from the toolkit.
**How to avoid:** Pull specific numbers, specific project names, and specific outcomes directly from the master files. "Redesigned a platform" is placeholder-quality. "$390-495M social value from cross-system fraud detection" is real content.
**Warning signs:** Content could apply to any designer, not specifically to Marie.

### Pitfall 7: VIP Case Study Included
**What goes wrong:** Including the VIP (Vehicle Inspection Program) case study, which is explicitly marked as not published.
**Why it happens:** vip.md exists in the master files directory alongside the other case studies.
**How to avoid:** Line 1 of vip.md says "CURRENTLY NOT PUBLISHED IN PORTFOLIO." Use only: epic-submit.md, epic-engage.md, ptmp.md, bambora.md.
**Warning signs:** 5 case studies displayed instead of 4.

## Code Examples

Verified patterns from the existing codebase:

### Alternating Section Backgrounds (from page.tsx)
```typescript
// Primary background (default)
<section style={{
  paddingTop: "var(--space-section)",
  paddingBottom: "var(--space-section)",
}}>

// Secondary background (alternating)
<section style={{
  paddingTop: "var(--space-section)",
  paddingBottom: "var(--space-section)",
  backgroundColor: "var(--bg-secondary)",
}}>
```

### Card Styling (from page.tsx)
```typescript
<div style={{
  backgroundColor: "var(--bg-surface)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-md), var(--glow-subtle)",
  padding: "var(--space-8)",
}}>
```

### Responsive Grid (from page.tsx)
```typescript
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
  gap: "var(--space-8)",
}}>
```

### PageContainer Usage (polymorphic)
```typescript
// As div (default)
<PageContainer>content</PageContainer>

// As semantic element
<PageContainer as="nav">nav content</PageContainer>
```

### Accent-Colored Numbers (metrics pattern)
```typescript
<span style={{
  fontSize: "var(--text-display)",
  lineHeight: "var(--text-display-lh)",
  fontWeight: "var(--font-semibold)",
  color: "var(--accent-primary)",  // Blue in light, cyan in dark
  letterSpacing: "var(--tracking-tight)",
}}>
  $390-495M
</span>
```

### Contact CTA Pattern (from page.tsx)
```typescript
<a
  href="mailto:marie@example.com"
  style={{
    display: "inline-block",
    padding: "var(--space-3) var(--space-8)",
    backgroundColor: "var(--accent-primary)",
    color: "var(--text-on-accent)",
    borderRadius: "var(--radius-md)",
    fontWeight: "var(--font-semibold)",
    fontSize: "var(--text-body)",
    lineHeight: "var(--text-body-lh)",
    textDecoration: "none",
    boxShadow: "var(--glow-accent)",
  }}
>
  Get in Touch
</a>
```

## Navigation Recommendation (Claude's Discretion)

Based on the 8-section structure and editorial flow, recommend **5 nav links** that map to the narrative arc:

| Label | Href | Sections Covered | Rationale |
|-------|------|-----------------|-----------|
| Work | #work | Case Studies | The portfolio's core -- hiring managers look here first |
| Impact | #impact | Impact Metrics | Quantitative proof immediately after qualitative work |
| About | #about | Beyond the Portfolio, What I Stand For | Groups the personal sections under one nav entry |
| Fit | #fit | The Right Fit | Direct positioning for hiring managers evaluating match |
| Contact | #contact | Contact | Clear conversion endpoint |

**Sections without dedicated nav links:** Hero (always visible at top), What I Do (immediately below hero, always in view after scrolling past hero). These don't need nav links because they're at the top of the page.

## Section Order and Background Alternation

| # | Section | Background | Section ID | Heading Size |
|---|---------|------------|------------|-------------|
| 1 | Hero | --bg-primary | (none needed) | --text-display (H1) |
| 2 | What I Do | --bg-secondary | (no nav link) | --text-h2 (H2) |
| 3 | Impact Metrics | --bg-primary | impact | --text-h2 (H2, larger feel) |
| 4 | Case Studies | --bg-secondary | work | --text-h2 (H2, larger feel) |
| 5 | Beyond the Portfolio | --bg-primary | about | --text-h3 (H2, smaller styling) |
| 6 | What I Stand For | --bg-secondary | (covered by #about) | --text-h3 (H2, smaller styling) |
| 7 | The Right Fit | --bg-primary | fit | --text-h3 (H2, smaller styling) |
| 8 | Contact | --bg-secondary | contact | --text-h2 (H2) |

**Note:** All sections use semantic `<h2>` (except Hero which uses `<h1>`). Visual size is controlled via CSS tokens, not by changing heading level. Personal sections use `--text-h3` visually but remain `<h2>` semantically.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS scrollIntoView for smooth scroll | CSS scroll-behavior: smooth | Widely supported since 2020+ | Zero JS needed for smooth scrolling |
| Manual padding/offset for sticky headers | CSS scroll-padding-top | Universal browser support 2021+ | One declaration handles all anchor offsets |
| CMS for small portfolio content | TypeScript constants with type safety | Ongoing trend in dev portfolios | Simpler, faster, type-checked, no infrastructure |
| Create React App with client rendering | Next.js Server Components | Next.js 13+ (2023), mature in 16 | Static sections render on server, zero client JS |

**Deprecated/outdated:**
- `getStaticProps` / `getStaticPaths`: Replaced by Server Components in App Router (already using App Router)
- jQuery smooth scroll plugins: Replaced by native CSS `scroll-behavior`
- react-scroll / react-anchor-link-smooth-scroll: Unnecessary with CSS-only approach

## Open Questions

1. **Marie's email address and LinkedIn URL for Contact section**
   - What we know: Contact section needs a working mailto: link and LinkedIn URL
   - What's unclear: The exact email and LinkedIn URL to use
   - Recommendation: Use placeholder values in the data file with clear TODO comments. The planner should flag this as requiring user input before verification.

2. **"Beyond the Portfolio" content**
   - What we know: User explicitly said this is too personal to infer -- they will provide it
   - What's unclear: When the content will be ready
   - Recommendation: Build the section component with clearly marked placeholder text that explains what goes here. Do not draft this content.

3. **Illustrated character in Hero (CONT-01)**
   - What we know: CONT-01 mentions "illustrated character" but STATE.md notes "dark mode will use a placeholder until Marie creates/commissions the art"
   - What's unclear: Whether any character illustration exists yet for light mode
   - Recommendation: Build Hero section without character illustration. Leave a clear slot for it. This is likely a Phase 3 or later concern.

4. **Case study display order and URL reordering (URL-03)**
   - What we know: Phase 4 will implement ?order= URL param for reordering case studies
   - What's unclear: Whether the data structure needs to accommodate this now
   - Recommendation: Use an array with `id` field per case study. Phase 4 can reorder by ID. No special data structure needed now -- a simple array with IDs is sufficient.

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/app/page.tsx`, `src/components/layout/Header.tsx`, `src/styles/tokens.css` -- established patterns
- Job search toolkit master files: `~/Desktop/job-search-toolkit/master-files/case-studies/` -- content source
- MDN Web Docs: [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior), [scroll-padding-top](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-padding-top) -- CSS specs

### Secondary (MEDIUM confidence)
- [CSS-Tricks: Fixed Headers and Jump Links](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/) -- scroll-margin-top vs scroll-padding-top comparison
- [Markus Oberlehner: Simple Solution for Anchor Links Behind Sticky Headers](https://markus.oberlehner.net/blog/simple-solution-for-anchor-links-behind-sticky-headers/) -- scroll-padding-top recommendation
- [Go Make Things: Prevent anchor links scrolling behind sticky header](https://gomakethings.com/how-to-prevent-anchor-links-from-scrolling-behind-a-sticky-header-with-one-line-of-css/) -- one-line CSS solution

### Tertiary (LOW confidence)
- None -- all findings verified against official docs or established project patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all patterns established in Phase 1 codebase
- Architecture: HIGH -- component structure follows existing project conventions; content data pattern is straightforward TypeScript
- Content extraction: HIGH -- master files thoroughly read, specific metrics and titles identified with line-level attribution
- Smooth scroll: HIGH -- CSS-only approach verified against MDN, universal browser support, well-documented pattern
- Pitfalls: HIGH -- derived from direct codebase analysis and known CSS/Next.js behaviors

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (stable -- all technologies mature, no fast-moving dependencies)
