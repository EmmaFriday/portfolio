# Phase 3: Dual-Mode Theming - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors experience two distinct visual personalities — a clean portfolio showcase light mode and a retro sci-fi dark mode — and can switch between them via a designed floating toggle. Both modes must pass WCAG 2.1 AA. This phase delivers the visual identity, font system, toggle interaction, and transition behavior. It does NOT add new interactive capabilities (like visitor-configurable effects) or per-company customization (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Theme Toggle Design
- Floating pill button with icon + text, positioned left-aligned just below the sticky header
- Stays fixed on scroll (always accessible)
- In light mode: shows "View Sci-Fi Mode" with a sci-fi icon (e.g., rocket or terminal)
- In dark mode: shows "Exit the Matrix" with a light-mode icon (e.g., sun or clean shape)
- Icon morphs and label fades in/out during the mode switch
- Mobile behavior: Claude's discretion (icon-only in header or smaller floating pill)

### Light Mode Visual Identity
- **Headers**: Figtree, semibold (600)
- **Body**: DM Sans, 16px base
- **Vibe**: Portfolio showcase — bolder than Notion minimalism, the layout itself shows she's a designer, with intentional asymmetry or visual flair
- **Backgrounds**: All white, use generous spacing between sections for separation (no alternating gray bands)
- **Accent**: Blue (#2563eb) as default — per-company accent colors deferred to Phase 4 URL params
- **Grid breaks**: Some sections may break out of the centered column for visual surprise — specifics TBD after first design round, Claude can propose candidates during implementation
- **Body text scale**: 16px fixed base (not fluid), keep current heading scale

### Dark Mode Visual Identity
- **Headers**: Space Grotesk (geometric, retro-futuristic quality)
- **Body**: Geist Mono (monospace for the sci-fi terminal feel)
- **Teal palette**: Full gradient approach using the provided reference image:
  - Deep teal for surfaces/backgrounds (replacing current #0f0f1a, #1a1a2e)
  - Mid-teal for borders and accent elements
  - Bright cyan for glows, interactive highlights, and emphasis
- **Card/surface glow**: Giselles.ai-style radial gradient border glow effect
  - Faint teal glow visible at rest (the panel is "on")
  - Brightens on hover with smooth ~300ms opacity transition
  - Uses CSS radial gradients + mask-composite technique, not just box-shadow
- **Retro sci-fi touches** (subtle cockpit accents, not full cockpit):
  - Monospace labels for section headers/tags (like "SECTOR_ANALYSIS" in the reference)
  - Corner bracket decorations on cards/panels
  - Faint scanline or grid background texture overlay on page background (like a CRT or holographic display)
- **Reference**: giselles.ai for the glow/card treatment, but "a bit more retro/sci-fi"
- **Reference**: Provided screenshot of spaceship control panel UI — teal version of that yellow/gold aesthetic

### Transition Behavior
- Smooth crossfade over ~300ms when switching modes
- Everything transitions together: colors, fonts, glows, spacing — fully unified morph
- Toggle button animates as part of the transition (icon morph + label fade)
- Remove current `disableTransitionOnChange` setting and add CSS `transition` properties to semantic token consumers

### Claude's Discretion
- Mobile toggle placement and sizing
- Exact teal hex values (guided by the provided teal gradient image)
- Which sections break the grid in light mode (propose candidates, can be adjusted later)
- Scanline/grid texture opacity and pattern
- Corner bracket decoration style and which elements get them
- Toggle icon choices (rocket, terminal cursor, sun, etc.)
- Transition easing curve

</decisions>

<specifics>
## Specific Ideas

- Toggle labels have personality: "View Sci-Fi Mode" and "Exit the Matrix" — not generic "Dark" / "Light"
- The sci-fi dark mode should feel like a spaceship control panel reimagined as a portfolio — subtle cockpit accents, not overwhelming
- Reference image 1: Teal gradient palette showing deep-to-bright cyan range — use this to derive the actual hex values for the dark mode teal tokens
- Reference image 2: Retro video game spaceship UI with bordered panels, monospace labels, corner decorations, and a "Control Panel" with slider controls — this is the aesthetic direction but with teal instead of yellow/gold
- Reference site: giselles.ai — the hover card glow effect mid-page is the target for dark mode card interactions
- Font pairings are mode-specific: Figtree + DM Sans (light) vs Space Grotesk + Geist Mono (dark) — fonts switch as part of the crossfade transition

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/tokens.css`: Full three-tier token system already has light/dark semantic tokens, glow tokens (`--glow-accent`, `--glow-subtle`), and the `[data-theme="dark"]` override structure
- `src/components/providers/ThemeProvider.tsx`: next-themes already wired with `data-theme` attribute, `disableTransitionOnChange` (to be removed)
- `src/app/layout.tsx`: Blocking inline script reads `?mode=` param and sets `data-theme` before first paint — already works
- All 9 section components reference semantic tokens via inline styles with `var()` — theme switching is already CSS-only

### Established Patterns
- Inline styles with `var()` for all component styling (no Tailwind arbitrary values)
- Server Components (no `"use client"`) for all section components — toggle will need to be a Client Component
- `@theme` block in tokens.css for Tailwind integration of primitives
- `@custom-variant dark` in globals.css for Tailwind dark variant

### Integration Points
- Header (`src/components/layout/Header.tsx`): Toggle button positioned below the header, may need layout adjustment
- `src/app/layout.tsx`: Font loading needs to change from Inter-only to loading all 4 fonts (Figtree, DM Sans, Space Grotesk, Geist Mono) and switching via CSS custom properties
- `src/styles/tokens.css`: Typography tokens need to become theme-aware (different font families per mode)
- `src/app/globals.css`: Will need transition properties and potentially the scanline/grid texture

</code_context>

<deferred>
## Deferred Ideas

- **Per-company accent colors via URL params** — Phase 4 (URL Customization). Architecture already supports it: `--accent-primary` and `--accent-hover` are single swap points. Add `?accent=dropbox` style parameter.
- **Leva control panel for visitor-tweakable effects** — Future phase. Let visitors adjust glow intensity, transition speed, etc. via a Leva-powered GUI panel (like the "Control Panel" in the reference screenshot). Fun easter egg for dark mode.

</deferred>

---

*Phase: 03-dual-mode-theming*
*Context gathered: 2026-03-04*
