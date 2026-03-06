# Phase 4: URL Customization - Context

**Gathered:** 2026-03-06
**Updated:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Query parameter system for mode control (?mode=) and case study reordering (?order=), making the portfolio a per-application instrument controllable via URL. The job search toolkit (separate repo) can generate URLs that tailor the portfolio for specific employers.

</domain>

<decisions>
## Implementation Decisions

### Blocking script scope
- Blocking `<head>` script handles `?mode=` ONLY — no order param in the script
- Order is a client-side rendering concern with no flash risk
- Script stays focused on theme flash prevention

### URL persistence & priority
- URL wins, fallback to localStorage — no `?mode=` checks localStorage first (from a previous toggle), toolkit links with `?mode=` override it
- Direct visitors returning without a URL param get their last-used theme from localStorage
- Toolkit-generated links always control the experience via explicit params

### URL sync behavior
- Theme toggle syncs current mode to URL via `history.replaceState` (not pushState)
- Back button navigates away from the page, not through theme changes — toggles aren't navigation events
- Toggling theme = sharing intent — if someone copies the URL after toggling to dark, recipients see dark mode
- Only changed params appear in URL (no defaults) — keeps URLs clean
- Toggling mode preserves all other params (order, UTM, etc.)
- Unknown query parameters (utm_source, etc.) are preserved untouched
- No visual indicator of customization — the experience is seamless to visitors

### Case study ordering
- `?order=` uses 1-based numeric indices (1,2,3,4 mapping to content array position)
- Partial list acts as filter: `?order=2,4` shows only studies 2 and 4
- Invalid indices are silently skipped — `?order=1,99,3` shows studies 1 and 3
- If all indices are invalid (zero valid studies), fall back to default order
- Indices are stable: adding a 5th case study doesn't change what 1-4 refer to
- Auto-extend: adding index 5 to content.ts makes `?order=5` work automatically, no mapping maintenance
- Duplicate indices deduplicated silently — `?order=1,1,2` shows studies 1 and 2 once each

### Filtered UI behavior
- No heading or layout change when fewer studies shown — same "Selected Work" heading regardless of count
- 2 cards just means less scrolling — clean and simple

### Default & fallback behavior
- No params + no localStorage = light mode + all case studies in default order
- Invalid `?mode=` value silently defaults to light mode with console warning
- Invalid `?order=` indices silently skipped with console warning
- Graceful degradation — visitor always sees a working portfolio

### Toolkit integration
- Marie constructs URLs manually (no toolkit code changes needed for v1)
- Parameter system is domain-agnostic — works on localhost, Vercel preview, custom domain
- Reference comment in content.ts maps indices to case study names for easy URL construction
- Only `mode` and `order` params for v1 — no over-engineering

### Claude's Discretion
- URL parsing implementation approach (hook, utility, etc.)
- How to handle the client/server boundary for order param (page.tsx is currently a server component)
- Console warning format and verbosity
- Whether to extract a shared URL utility or keep it inline

</decisions>

<specifics>
## Specific Ideas

- The blocking `<head>` script already handles `?mode=` for flash prevention — extend rather than replace
- `?order=2,4` doubling as a filter is a power feature for targeting specific employers with relevant case studies only
- Console warnings for debugging but invisible to hiring managers viewing the portfolio
- replaceState for toggle sync means the URL is always shareable but back button isn't cluttered with theme changes

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Blocking theme script** (layout.tsx L45-49): Already reads `?mode=` and sets `data-theme` before first paint. Currently clears localStorage when no mode param — needs update for localStorage fallback behavior.
- **ThemeProvider** (ThemeProvider.tsx): Wraps `next-themes` with `attribute="data-theme"`, `defaultTheme="light"`. Theme toggle integration point.
- **ThemeToggle** (ThemeToggle.tsx): Uses `useTheme()` from next-themes. Needs `replaceState` call added on toggle.
- **caseStudies array** (content.ts): Static typed array of 4 `CaseStudy` objects with `id` field. Order param indexes into this array.

### Established Patterns
- **Client/server split**: `page.tsx` is a server component; interactive components use `"use client"` directive
- **next-themes**: Theme state managed by next-themes library, accessed via `useTheme()` hook
- **CSS custom properties**: All theming via `data-theme` attribute and CSS variables — no JS-side style computation
- **Static content layer**: All content in `content.ts` as typed constants with `as const`

### Integration Points
- **ThemeToggle.tsx**: Add `replaceState` call after `setTheme()` to sync mode to URL
- **CaseStudies component**: Currently imports `caseStudies` directly and maps over it — needs to accept an ordered/filtered array
- **layout.tsx blocking script**: Stays mode-only; needs update to respect localStorage when no `?mode=` param
- **page.tsx**: May need to become a client component or pass searchParams to child components for order param

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-url-customization*
*Context gathered: 2026-03-06*
