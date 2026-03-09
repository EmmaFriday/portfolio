# Phase 4: URL Customization - Context

**Gathered:** 2026-03-06
**Updated:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Query parameter system for theme mode control (`?mode=`), making the portfolio theme controllable via URL. Case study ordering and filtering are handled in `content.ts` at build time when spinning up per-application instances — no URL param needed.

</domain>

<decisions>
## Implementation Decisions

### Scope simplification (decided 2026-03-09)
- **`?order=` dropped for v1** — each portfolio instance is built per-application with case studies ordered directly in `content.ts`. URL-based reordering adds complexity with no benefit when content is curated at build time.
- Phase 4 is now **`?mode=` only** for theme control

### Blocking script behavior
- Blocking `<head>` script reads `?mode=` and sets `data-theme` before first paint (already works)
- Script needs update: when no `?mode=` param, fall back to localStorage instead of forcing light mode
- `?mode=` in URL always wins over localStorage

### URL persistence & priority
- `?mode=dark` or `?mode=light` in URL → that mode, stored to localStorage
- No `?mode=` param → check localStorage for last-used theme (from a previous toggle)
- No `?mode=` + no localStorage → light mode (default)
- Toolkit-generated links with explicit `?mode=` always control the experience

### URL sync behavior
- Theme toggle syncs current mode to URL via `history.replaceState` (not pushState)
- Back button navigates away from the page, not through theme changes — toggles aren't navigation events
- Toggling theme = sharing intent — copying the URL after toggling gives recipients that mode
- Default mode (light) is removed from URL — keeps URLs clean (no `?mode=light` clutter)
- Toggling preserves all other query params (utm_source, etc.) untouched
- No visual indicator of customization — completely invisible to visitors

### Default & fallback behavior
- Invalid `?mode=` value (e.g., `?mode=purple`) silently defaults to light mode with console warning
- Graceful degradation — visitor always sees a working portfolio

### Per-instance model
- Each job application gets its own portfolio instance with curated content in `content.ts`
- Case study selection, ordering, and content are set in code — not via URL
- No index mapping cheat sheet needed — Claude handles mapping in conversation when building each instance

### Claude's Discretion
- URL parsing implementation approach (hook, utility, etc.)
- Console warning format and verbosity
- Whether to extract a shared URL utility or keep it inline
- How to update the blocking script for localStorage fallback

</decisions>

<specifics>
## Specific Ideas

- The blocking `<head>` script already handles `?mode=` for flash prevention — extend rather than replace
- replaceState for toggle sync means the URL is always shareable but back button isn't cluttered with theme changes
- Console warnings for debugging but invisible to hiring managers viewing the portfolio
- With `?order=` dropped, no client/server boundary concerns for page.tsx — only ThemeToggle needs URL awareness

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Blocking theme script** (layout.tsx L45-49): Already reads `?mode=` and sets `data-theme` before first paint. Currently clears localStorage when no mode param — needs update for localStorage fallback.
- **ThemeProvider** (ThemeProvider.tsx): Wraps `next-themes` with `attribute="data-theme"`, `defaultTheme="light"`. Theme toggle integration point.
- **ThemeToggle** (ThemeToggle.tsx): Uses `useTheme()` from next-themes. Needs `replaceState` call added on toggle.

### Established Patterns
- **Client/server split**: `page.tsx` is a server component; interactive components use `"use client"` directive
- **next-themes**: Theme state managed by next-themes library, accessed via `useTheme()` hook
- **CSS custom properties**: All theming via `data-theme` attribute and CSS variables — no JS-side style computation

### Integration Points
- **ThemeToggle.tsx**: Add `replaceState` call after `setTheme()` to sync mode to URL
- **layout.tsx blocking script**: Update to respect localStorage when no `?mode=` param present
- **No changes needed to**: CaseStudies, page.tsx, content.ts (order handled at build time)

</code_context>

<deferred>
## Deferred Ideas

- **`?order=` URL param**: Dropped for v1. Could be added later if a use case emerges for runtime reordering without rebuilding. Would require client-side component changes and edge case handling (duplicates, invalid indices, filtering UI).

</deferred>

---

*Phase: 04-url-customization*
*Context gathered: 2026-03-06*
*Updated: 2026-03-09 — dropped ?order= param, simplified to ?mode= only*
