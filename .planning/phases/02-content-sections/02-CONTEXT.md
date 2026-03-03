# Phase 2: Content Sections - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver all 8 page sections with real content from the job search toolkit, laid out in an editorial long-page format with smooth-scroll navigation between sections via the sticky header. Sections in order: Hero, What I Do, Impact Metrics, Case Studies, Beyond the Portfolio, What I Stand For, The Right Fit, Contact. Dual-mode theming is a separate phase — this phase builds content in the existing light/dark token structure.

</domain>

<decisions>
## Implementation Decisions

### Editorial flow & section rhythm
- Mixed density: spacious hero section to hook attention, tighter spacing for remaining sections so hiring managers can scan efficiently
- Alternating backgrounds between sections using existing --bg-primary and --bg-secondary tokens
- Heading sizes varied by section importance: Hero gets display-sized text, Case Studies and Impact Metrics get larger H2s, personal sections get smaller headings — creates a natural visual hierarchy across the page

### Case study presentation
- 4-5 case studies displayed (EPIC.submit, EPIC.engage, NSC Interactions, Bambora, and any additional projects)
- Vertical stack layout — one full-width card per row, editorial feel
- Each card shows: outcome-first headline, key metric, role, and 1-2 sentence strategic hook
- Cards are NOT clickable (static) — full case study pages are a v2 feature (DEEP-01). No dead links, no false affordance

### Impact metrics showcase
- 6 standout metrics drawn from across ALL case studies (cross-project aggregate, not career-level stats)
- 3x2 grid layout on desktop, responsive stacking on mobile
- Each metric: big number in accent color (--accent-primary), label below, plus one-line context description
- Numbers use accent color (blue in light mode, cyan in dark mode) for visual punch

### Personal voice sections
- "Beyond the Portfolio" — user will provide this content directly (too personal to infer)
- "What I Stand For" — Claude drafts based on toolkit data, user edits for authentic voice
- "The Right Fit" — Claude drafts based on toolkit positioning data, user edits
- Very explicit positioning in "The Right Fit": names specific roles (Staff Product Designer, Design Lead), team types (platform teams, B2B SaaS), and problem spaces (complex multi-stakeholder systems)
- Tone varies by section: Beyond = warm & personal, Stand For = confident & principled, Right Fit = direct & clear

### Claude's Discretion
- Navigation link labels and which sections earn a nav link (not all 8 need one)
- Smooth scroll implementation approach
- Section component extraction strategy (which components to create)
- Content data architecture (how to structure case study data for sourcing from toolkit)
- Exact spacing values within sections
- Empty/loading states
- Mobile-specific layout adaptations within the responsive framework

</decisions>

<specifics>
## Specific Ideas

- Editorial reading experience: the 8 sections should feel like a narrative arc — hook (Hero), prove it (What I Do, Metrics, Cases), get personal (Beyond, Values, Fit), convert (Contact)
- Case study metrics from toolkit: "$390-495M social value", "5%->80% comment quality", "8,000+ staff hours saved", "700-1,000 crashes prevented", "98% task success rate", "100% centralization in 5 months"
- Toolkit case studies: EPIC.submit (environmental assessment), EPIC.engage (public engagement), NSC Interactions (cross-system governance), Bambora (payment SaaS)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `PageContainer` (src/components/layout/PageContainer.tsx): Polymorphic container with responsive padding — use for all section wrappers
- `Header` (src/components/layout/Header.tsx): Sticky header with frosted glass — needs nav links added
- Card pattern (src/app/page.tsx): Existing card styling with --bg-surface, --border-default, --shadow-md, --glow-subtle tokens
- Section pattern (src/app/page.tsx): Alternating --bg-primary/--bg-secondary with --space-section padding

### Established Patterns
- Hybrid Tailwind + CSS variables: Tailwind for layout (flex, grid), CSS vars for semantic styling (colors, spacing, typography)
- Inline styles for token references: `style={{ fontSize: "var(--text-h2)" }}`
- Fluid typography: clamp() functions for responsive type scaling (--text-display through --text-sm)
- Responsive grid: `repeat(auto-fill, minmax(min(100%, 320px), 1fr))` for card layouts

### Integration Points
- Main page (src/app/page.tsx): Currently has 5 demo sections — will be replaced with real 8-section structure
- Header (src/components/layout/Header.tsx): Has placeholder slots for logo and nav — nav links connect to section IDs
- Token system (src/styles/tokens.css): All semantic tokens ready — no new tokens needed for content sections
- Job search toolkit (~/Desktop/job-search-toolkit/applications/): metadata.json files, portfolio-strategy.md, analysis.md files contain case study data

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-sections*
*Context gathered: 2026-03-02*
