# Phase 4: URL Customization - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Query parameter system for mode control (?mode=) and case study reordering (?order=), making the portfolio a per-application instrument controllable via URL. The job search toolkit (separate repo) can generate URLs that tailor the portfolio for specific employers.

</domain>

<decisions>
## Implementation Decisions

### URL sync behavior
- Theme toggle always syncs current mode to URL via `history.replaceState`
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

### Default & fallback behavior
- No params = light mode + all case studies in default order
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

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Blocking theme script** (layout.tsx L46-48): Already reads `?mode=` and sets `data-theme` before first paint. Needs extension for URL sync back, but the read path works.
- **ThemeProvider** (ThemeProvider.tsx): Wraps `next-themes` with `attribute="data-theme"`, `defaultTheme="light"`. Theme toggle integration point.
- **ThemeToggle** (ThemeToggle.tsx): Uses `useTheme()` from next-themes. Needs `replaceState` call added on toggle.
- **caseStudies array** (content.ts L77-114): Static typed array of 4 `CaseStudy` objects with `id` field. Order param indexes into this array.

### Established Patterns
- **Client/server split**: `page.tsx` is a server component; interactive components use `"use client"` directive
- **next-themes**: Theme state managed by next-themes library, accessed via `useTheme()` hook
- **CSS custom properties**: All theming via `data-theme` attribute and CSS variables — no JS-side style computation
- **Static content layer**: All content in `content.ts` as typed constants with `as const`

### Integration Points
- **ThemeToggle.tsx**: Add `replaceState` call after `setTheme()` to sync mode to URL
- **CaseStudies component**: Needs to accept an ordered/filtered array instead of importing `caseStudies` directly
- **layout.tsx blocking script**: May need to also read `?order=` for SSR considerations, or order can be client-only
- **page.tsx**: May need to become a client component or pass searchParams to child components

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-url-customization*
*Context gathered: 2026-03-06*
