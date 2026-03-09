# Phase 4: URL Customization - Research

**Researched:** 2026-03-09
**Domain:** URL query parameter handling, browser History API, next-themes integration
**Confidence:** HIGH

## Summary

Phase 4 is a focused modification to three existing files: the blocking `<head>` script in `layout.tsx`, the `ThemeToggle` component, and potentially the `ThemeProvider` configuration. The scope is narrow -- `?mode=` parameter reading, localStorage fallback, and `history.replaceState` sync on toggle. No new libraries are needed.

The blocking script currently reads `?mode=` and sets `data-theme` correctly, but actively *clears* localStorage when no mode param is present (line 47 of layout.tsx). This is the primary bug to fix -- it should *read* localStorage as fallback, not clear it. The ThemeToggle component needs a `replaceState` call after `setTheme()` to sync the URL. Both changes are small and well-contained.

**Primary recommendation:** Modify the existing blocking script to use localStorage as fallback, add replaceState to ThemeToggle, and validate edge cases (invalid mode values, other query params preserved). No new dependencies or components needed.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- `?order=` dropped for v1 -- each portfolio instance is built per-application with case studies ordered directly in `content.ts`. URL-based reordering adds complexity with no benefit when content is curated at build time.
- Phase 4 is `?mode=` only for theme control
- Blocking `<head>` script reads `?mode=` and sets `data-theme` before first paint (already works)
- Script needs update: when no `?mode=` param, fall back to localStorage instead of forcing light mode
- `?mode=` in URL always wins over localStorage
- Priority chain: `?mode=` param > localStorage > light mode default
- Theme toggle syncs current mode to URL via `history.replaceState` (not pushState)
- Default mode (light) is removed from URL -- keeps URLs clean (no `?mode=light` clutter)
- Toggling preserves all other query params (utm_source, etc.) untouched
- Invalid `?mode=` value silently defaults to light mode with console warning
- No visual indicator of customization -- completely invisible to visitors

### Claude's Discretion
- URL parsing implementation approach (hook, utility, etc.)
- Console warning format and verbosity
- Whether to extract a shared URL utility or keep it inline
- How to update the blocking script for localStorage fallback

### Deferred Ideas (OUT OF SCOPE)
- `?order=` URL param: Dropped for v1. Could be added later if a use case emerges for runtime reordering without rebuilding.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| URL-01 | ?mode=light sets initial theme to light mode | Blocking script already handles this; no change needed for this case |
| URL-02 | ?mode=dark sets initial theme to dark mode | Blocking script already handles this; no change needed for this case |
| URL-03 | ?order= reorders case studies | DROPPED per CONTEXT.md -- `?order=` is out of scope for v1. Requirement stays in REQUIREMENTS.md but will not be implemented |
| URL-04 | Missing params gracefully default (light mode, original order) | Blocking script needs localStorage fallback; invalid values need console warning + light default |
| URL-05 | Toggle state syncs back to URL via history.replaceState without page reload | ThemeToggle needs replaceState call after setTheme() |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-themes | 0.4.6 | Theme state management | Already in use; provides `useTheme()` hook, manages localStorage with key `"theme"` |
| Next.js | 16.1.6 | Framework | Already in use; provides layout.tsx with blocking script support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | All URL/History APIs are browser-native |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline URLSearchParams | nuqs or next-query-params | Massive overkill for a single `?mode=` param; adds dependency for 5 lines of code |
| Manual replaceState | next/router | `page.tsx` is a server component; router hooks only work in client components and add unnecessary coupling |

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Files to Modify
```
src/
├── app/
│   └── layout.tsx          # Update blocking <head> script (lines 45-49)
├── components/
│   └── layout/
│       └── ThemeToggle.tsx  # Add replaceState after setTheme()
```

### Pattern 1: Blocking Script with localStorage Fallback
**What:** The inline `<script>` in `<head>` runs before first paint to prevent theme flash. It must check `?mode=` first, then localStorage, then default to light.
**When to use:** Always -- this is the flash-prevention mechanism.
**Current code (buggy):**
```javascript
// Current: clears localStorage when no ?mode= param
(function(){try{
  var p=new URLSearchParams(window.location.search);
  var m=p.get('mode');
  if(m==='dark'||m==='light'){
    document.documentElement.setAttribute('data-theme',m);
    try{localStorage.setItem('theme',m)}catch(e){}
  }else{
    document.documentElement.setAttribute('data-theme','light');
    try{localStorage.removeItem('theme')}catch(e){} // BUG: clears saved preference
  }
}catch(e){}})();
```
**Fixed code:**
```javascript
(function(){try{
  var p=new URLSearchParams(window.location.search);
  var m=p.get('mode');
  var t;
  if(m==='dark'||m==='light'){
    t=m;
    try{localStorage.setItem('theme',t)}catch(e){}
  }else{
    if(m!==null){console.warn('[portfolio] Invalid ?mode= value: "'+m+'", defaulting to light')}
    try{t=localStorage.getItem('theme')}catch(e){}
    if(t!=='dark'&&t!=='light'){t='light'}
  }
  document.documentElement.setAttribute('data-theme',t);
}catch(e){}})();
```

### Pattern 2: replaceState URL Sync on Toggle
**What:** After calling `setTheme()`, update the URL to reflect the new mode using `history.replaceState`. Preserve existing query params.
**When to use:** In ThemeToggle's click handler.
**Example:**
```typescript
const handleToggle = () => {
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);

  // Sync to URL
  const url = new URL(window.location.href);
  if (newTheme === "light") {
    url.searchParams.delete("mode"); // Clean URL for default
  } else {
    url.searchParams.set("mode", newTheme);
  }
  history.replaceState(null, "", url.toString());
};
```

### Pattern 3: next-themes localStorage Alignment
**What:** next-themes uses `localStorage.getItem("theme")` by default (storageKey = `"theme"`). The blocking script must use the same key.
**Why it matters:** If keys mismatch, next-themes will override the blocking script's choice on hydration, causing a flash.
**Current state:** Both use `"theme"` key -- already aligned. No changes needed.

### Anti-Patterns to Avoid
- **Using pushState instead of replaceState:** Creates back-button history entries for theme changes, making navigation annoying. Users would have to click back multiple times to leave the page.
- **Parsing URL in a server component:** `page.tsx` is a server component and does not have access to `window.location`. All URL reading must happen in the blocking script (pre-render) or client components.
- **Adding `?mode=light` to URL for default state:** Creates unnecessary URL clutter. Only non-default mode (`dark`) should appear in URL.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Query param parsing | Custom regex parser | `URLSearchParams` | Browser-native, handles encoding, edge cases |
| URL construction | String concatenation | `new URL(window.location.href)` | Handles base URL, encoding, hash preservation |
| Theme persistence | Custom localStorage wrapper | next-themes built-in storage | Already manages the `"theme"` key; blocking script just needs to read the same key |

**Key insight:** The browser's `URL` and `URLSearchParams` APIs handle all the edge cases (encoding, multiple params, hash fragments) that string manipulation would get wrong.

## Common Pitfalls

### Pitfall 1: next-themes Overriding Blocking Script on Hydration
**What goes wrong:** next-themes reads its own localStorage value on mount and may override what the blocking script set, causing a flash.
**Why it happens:** The blocking script sets `data-theme` and writes to localStorage. next-themes reads localStorage on hydration. If they agree, no flash. If blocking script wrote a value but next-themes ignores URL params, theme stays correct because both use localStorage.
**How to avoid:** Ensure the blocking script writes to localStorage with the same key (`"theme"`) that next-themes reads. Already aligned -- just don't change `storageKey` in ThemeProvider.
**Warning signs:** Theme flashes briefly on page load.

### Pitfall 2: Forgetting to Preserve Other Query Params
**What goes wrong:** Replacing the URL with just `?mode=dark` strips UTM params, tracking codes, etc.
**Why it happens:** Building URL string manually instead of using the URL API.
**How to avoid:** Use `new URL(window.location.href)` which preserves all existing params, then only modify `mode`.
**Warning signs:** UTM params disappear from URL after toggling theme.

### Pitfall 3: Hash Fragment Loss
**What goes wrong:** If the URL has a `#section` hash, naive URL replacement might lose it.
**How to avoid:** `new URL()` preserves hash. `url.toString()` includes it. Just don't strip it manually.

### Pitfall 4: SSR/Hydration Mismatch Warnings
**What goes wrong:** Reading `window.location` during SSR throws errors or causes hydration mismatches.
**Why it happens:** Server-side rendering has no `window` object.
**How to avoid:** All URL reading happens in: (1) the blocking `<script>` (runs only in browser), (2) ThemeToggle (already `"use client"` with `mounted` guard). No changes to server components needed.

### Pitfall 5: Blocking Script Console Warning in SSR
**What goes wrong:** `console.warn` in the blocking script could be noisy.
**How to avoid:** The blocking script only runs in the browser (it's in `dangerouslySetInnerHTML`), so console.warn is fine -- it won't appear in server logs.

## Code Examples

### Complete Updated Blocking Script
```javascript
// Priority: ?mode= param > localStorage > light default
(function(){try{
  var p=new URLSearchParams(window.location.search);
  var m=p.get('mode');
  var t;
  if(m==='dark'||m==='light'){
    t=m;
    try{localStorage.setItem('theme',t)}catch(e){}
  }else{
    if(m!==null){
      console.warn('[portfolio] Invalid ?mode= value: "'+m+'", defaulting to light');
    }
    try{t=localStorage.getItem('theme')}catch(e){}
    if(t!=='dark'&&t!=='light'){t='light'}
  }
  document.documentElement.setAttribute('data-theme',t);
}catch(e){}})();
```

### Complete Updated ThemeToggle Click Handler
```typescript
const handleToggle = () => {
  const newTheme = isDark ? "light" : "dark";
  setTheme(newTheme);

  // Sync theme to URL via replaceState (not pushState -- no history entry)
  const url = new URL(window.location.href);
  if (newTheme === "light") {
    // Default mode: remove ?mode= for clean URLs
    url.searchParams.delete("mode");
  } else {
    url.searchParams.set("mode", newTheme);
  }
  history.replaceState(null, "", url.toString());
};
```

### Edge Case: URL with Multiple Params
```
Input:  https://portfolio.com/?utm_source=linkedin&mode=dark&ref=apply
Toggle to light:
Output: https://portfolio.com/?utm_source=linkedin&ref=apply
(mode removed, other params preserved)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom theme scripts | next-themes library | Stable since 0.4.x | Handles localStorage, system pref, SSR; blocking script only needed for flash prevention |
| `window.location.search` manual parsing | `URLSearchParams` API | Broadly supported | No polyfill needed; handles encoding automatically |
| `pushState` for UI state | `replaceState` for non-navigational state | Best practice | Theme changes are not navigation events |

## Open Questions

1. **URL-03 (?order= param) status**
   - What we know: CONTEXT.md explicitly drops it for v1
   - What's unclear: Whether REQUIREMENTS.md should be updated to mark URL-03 as deferred
   - Recommendation: During planning, note that URL-03 is intentionally skipped per user decision. Update traceability table after phase completion.

2. **Default mode URL behavior edge case**
   - What we know: Light mode = no `?mode=` in URL (clean URLs)
   - What's unclear: If user arrives with `?mode=light` explicitly, should it stay in URL after toggle back to light?
   - Recommendation: Always remove `?mode=` when theme is light, regardless of how user arrived. Keeps behavior consistent and URLs clean.

## Sources

### Primary (HIGH confidence)
- **Project source code** (layout.tsx, ThemeToggle.tsx, ThemeProvider.tsx) - Direct inspection of current implementation
- **next-themes 0.4.6** (node_modules) - Verified storageKey default is `"theme"`, attribute handling, localStorage behavior
- **MDN Web Docs** - `history.replaceState()`, `URLSearchParams`, `URL` constructor are stable Web APIs

### Secondary (MEDIUM confidence)
- **next-themes GitHub** - storageKey configuration, ThemeProvider props

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new libraries; all browser-native APIs
- Architecture: HIGH - Only 2 files to modify, changes are small and well-understood
- Pitfalls: HIGH - Common patterns well-documented; hydration concern verified against actual next-themes source

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable domain, no fast-moving dependencies)
