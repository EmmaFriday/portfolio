# Domain Pitfalls

**Domain:** Dual-mode interactive designer portfolio
**Researched:** 2026-03-02

---

## Critical Pitfalls

Mistakes that cause rewrites, lost job opportunities, or major credibility damage. For a designer portfolio, the site IS the work sample -- these are career-impacting.

---

### Pitfall 1: Theme Flash (FOUC) on Load With URL-Controlled Mode

**What goes wrong:** A visitor clicks a customized link (`?mode=dark`) and sees the light theme flash for 100-500ms before the dark theme loads. On server-rendered or statically-generated sites, the server does not know the user's intended theme during initial HTML generation. The page renders with default styles first, then JavaScript reads the query parameter and applies the correct theme -- but that swap is visible.

**Why it happens:** Theme state lives in JavaScript (reading `window.location.search`), which only executes after the HTML is already parsed and painted. Static site generators output one HTML version. React hydration adds another delay before JS can run.

**Consequences:** The flash screams "amateur hour" to a hiring manager reviewing your portfolio. It undermines the entire dual-mode concept by revealing the seam between the two personalities. First impressions form in under 7 seconds -- a theme flash burns one of those seconds on a visual glitch.

**Prevention:**
- Place a blocking inline `<script>` in the `<head>` (before any CSS or body content) that reads the `?mode=` query parameter and sets a class on `<html>` immediately. Because this script executes synchronously, it blocks rendering until the correct theme class is applied.
- In Astro, use the `is:inline` directive to prevent script bundling/deferral. In Next.js, use `next-themes` which handles this natively, or a manual `dangerouslySetInnerHTML` script in `_document`.
- Set CSS defaults to match the most likely mode (light, since `?mode=dark` is the explicit override).
- Test by throttling CPU in DevTools and recording a performance trace on first load with `?mode=dark`.

**Detection:** Load the page with `?mode=dark` on a throttled 4x CPU slowdown in Chrome DevTools. If you see any flash of light theme, the blocking script is not working.

**Phase relevance:** Must be solved in the very first phase where theming is implemented. Retrofitting is painful because it requires changes to the HTML template/document structure.

**Confidence:** HIGH -- this is an extremely well-documented problem with proven solutions across Next.js and Astro. Multiple sources confirm the blocking inline script approach.

---

### Pitfall 2: Dual Themes That Share Nothing -- the "Two Websites" Trap

**What goes wrong:** The two themes (clean Notion light mode vs. retro sci-fi dark mode) diverge so much in implementation that they effectively become two separate codebases. Light mode gets a card component, dark mode gets a different card component. Light mode uses one spacing system, dark mode uses another. The toggle becomes a full re-render of different component trees rather than a theme swap.

**Why it happens:** "Two distinct visual personalities" gets interpreted as "two distinct implementations." Designers (rightfully) want dramatically different aesthetics, but without a shared token architecture, every visual decision becomes a fork. The sci-fi mode with glowing borders, monospace type, and instrument-style elements feels architecturally different from the clean editorial mode.

**Consequences:** Double the maintenance, double the bugs. When you add a new case study section, you build it twice. The toggle animation becomes jarring because the DOM structure changes, not just the styles. Performance degrades because theme switching triggers unmounting/remounting components instead of CSS variable swaps (which happen on the GPU).

**Prevention:**
- Build ONE component tree. Theme switching must be a CSS-only operation (swapping CSS custom property values), never a component-swap operation.
- Use a three-tier token architecture: primitives (raw values like `--cyan-500: #06b6d4`), semantic tokens (purpose-based like `--color-accent: var(--cyan-500)`), and component tokens (scoped like `--card-border: var(--color-accent)`). Theme switching only redefines semantic tokens.
- Both themes share identical HTML structure, layout grid, spacing scale, and component hierarchy. The ONLY things that change are: colors, typography (font-family, not font-size scale), border treatments (solid vs. glowing), shadow styles, and background textures/effects.
- Build light mode first as the "structural" theme, then create dark mode by overriding ONLY the semantic token layer. If you find yourself writing `[data-theme="dark"] .card { display: flex; }` -- you've broken the pattern.

**Detection:** If any component file contains a conditional like `if (theme === 'dark') return <DarkCard />`, you've fallen into this trap. Theme-specific code should only exist in CSS variable definitions and conditional CSS classes for decorative-only additions (like glow overlays).

**Phase relevance:** This must be the architectural foundation established in phase 1. The token system is the first thing built, before any components. Retrofitting a token architecture onto divergent implementations is a rewrite.

**Confidence:** HIGH -- this is standard design systems practice, well-documented across Style Dictionary, design token, and theming literature.

---

### Pitfall 3: Accessibility Failures in Dark/Sci-fi Mode

**What goes wrong:** The sci-fi dark theme fails WCAG contrast requirements because cyan/teal glowing text on dark backgrounds looks great but doesn't meet 4.5:1 contrast ratios. Glow effects create halation (a perceived halo around text) for users with astigmatism. Animated glowing effects trigger vestibular discomfort. The light mode passes accessibility because it's conservative, but the dark mode -- the "creative" mode -- is the one hiring managers at accessibility-conscious companies will scrutinize hardest.

**Why it happens:** Neon/glow aesthetics inherently work against contrast requirements. Bright cyan (#00ffff) on a dark gray (#1a1a2e) looks vivid but may only hit 3.8:1 for body text. Designers test by eye ("it looks readable to me") rather than by ratio. Pure black (#000000) backgrounds with bright text create excessive contrast that causes halation. Glow effects (text-shadow, box-shadow with spread) are decorative but blur the effective contrast boundary of text.

**Consequences:** For a senior UX designer who "designs for universal accessibility professionally" (per PROJECT.md), an inaccessible portfolio is a career contradiction. Enterprise companies and government agencies (Marie's background) will specifically evaluate this. Failing accessibility on the creative theme suggests accessibility is only followed when it's easy.

**Prevention:**
- Use a near-black background (e.g., `#0a0a0f` or `#121218`) rather than pure black `#000000`. This reduces halation while maintaining the dark aesthetic.
- Test EVERY text/background combination in the dark theme with a contrast checker. The glow effect is decorative -- the base text color (without glow) must independently pass 4.5:1 for body text and 3:1 for large text (WCAG AA).
- For glowing effects, apply them to borders, backgrounds, and decorative elements -- not to body text. If text has a glow, ensure the glow is supplementary: the text is readable with the glow turned off.
- Implement `prefers-reduced-motion` to disable all glow animations, pulsing effects, and flickering. Do NOT just slow them down -- offer a fully static alternative. Reduced motion should remove parallax, scroll-triggered animations, and any flashing effects while preserving layout and content.
- Add a visible "reduce motion" toggle in the UI alongside the theme toggle, because not all users have system-level motion preferences set.
- Test dark mode specifically with screen readers -- ARIA labels and semantic structure must work identically in both themes.

**Detection:** Run Lighthouse accessibility audit in BOTH themes. Run axe DevTools. Manually check every text element in the dark theme with WebAIM Contrast Checker. Test with `prefers-reduced-motion: reduce` enabled in browser DevTools.

**Phase relevance:** Accessibility standards must be baked into the token system from phase 1. The reduced-motion implementation should be part of the animation system setup. Do NOT treat accessibility as a "polish" phase -- by then the color choices are entrenched.

**Confidence:** HIGH -- WCAG requirements are documented standards. Halation with dark themes is well-established in accessibility literature. The specific risk of glowing effects is documented across multiple accessibility sources.

---

### Pitfall 4: Animations That Tank Mobile Performance and Hiring Manager Patience

**What goes wrong:** Scroll-triggered animations, glow pulsing effects, parallax backgrounds, and character animation create a beautiful desktop experience that turns into a 15fps slideshow on a 2-year-old Android phone or a MacBook Air with 30 browser tabs open (i.e., a hiring manager's actual browsing environment). Animations that trigger layout recalculation (anything besides `transform` and `opacity`) cause jank. Heavy animations delay Largest Contentful Paint (LCP), directly hurting the "first impression" window.

**Why it happens:** Developers test on powerful machines with one tab open. Portfolio animations get added incrementally ("just one more effect") until the cumulative cost is significant. CSS glow effects (multiple box-shadows, text-shadows with blur) are surprisingly expensive because they trigger paint operations on every frame. Scroll event handlers without throttling or requestAnimationFrame fire dozens of times per scroll, blocking the main thread.

**Consequences:** Hiring managers spend approximately 55 seconds on a portfolio. If 10 of those seconds are spent watching things stutter or waiting for the page to become interactive, you have lost nearly 20% of your evaluation window to a negative experience. Jank on a designer's portfolio specifically communicates "prioritizes aesthetics over usability" -- the opposite of what a UX portfolio should demonstrate.

**Prevention:**
- Only animate `transform` and `opacity` properties. These are GPU-composited and skip layout/paint. No animating `width`, `height`, `margin`, `padding`, `top`, `left`, `border-width`, `box-shadow` (animating shadow values triggers paint).
- Use CSS `will-change` sparingly and only on elements that actually animate. Over-using `will-change` consumes GPU memory.
- For scroll-driven animations, prefer the CSS Scroll-Driven Animations API (compositor-threaded, no JS cost) over JS-based scroll listeners. Where JS is needed, use IntersectionObserver for reveal effects (fires once, not on every pixel scrolled).
- Set a performance budget: LCP under 2.5s, total JS bundle under 200KB gzipped, Lighthouse Performance score above 90 on mobile throttling.
- For glow effects specifically: use a single `box-shadow` layer, not stacked shadows. Use `filter: drop-shadow()` instead of `box-shadow` where possible (can be GPU-composited). Pre-render complex glows as images/SVGs rather than calculating them per frame.
- Test on Chrome DevTools with 4x CPU throttle and "Fast 3G" network throttle. This approximates a real hiring manager's degraded browsing environment.

**Detection:** Lighthouse mobile performance audit below 90 is a red flag. Open Chrome DevTools Performance tab, record a scroll through the page, and look for any frames exceeding 16.67ms (the 60fps budget). Red frames in the flamechart = visible jank.

**Phase relevance:** Establish the animation approach and performance budget early (phase where animations are introduced). Run Lighthouse in CI to catch regressions. Do not add glow/particle effects without measuring their frame cost first.

**Confidence:** HIGH -- animation performance principles are well-documented by Chrome DevTools team, web.dev, and motion.dev. The 60fps budget and compositor-only properties are established standards.

---

### Pitfall 5: Query Parameters That Break Social Sharing Previews

**What goes wrong:** Marie sends a hiring manager a customized URL like `marieportfolio.com/?mode=dark&order=2,1,4,3`. The hiring manager pastes it into Slack or LinkedIn. The social preview card shows the wrong theme's colors, a generic title, and no relevant description -- or worse, shows a broken preview because the OG crawler cannot execute JavaScript to read query params. The carefully curated experience arrives as a bare link with no visual hook.

**Why it happens:** Social media crawlers (Facebook's, LinkedIn's, Twitter/X's, Slack's unfurler) fetch HTML and read `<meta>` OG tags. They do NOT execute JavaScript. If OG tags are static in the HTML, every URL variation shows the same preview. If OG tags are generated client-side, crawlers see nothing. Query parameters create URL variations that crawlers may or may not follow, and each variation may or may not get its own cached preview.

**Consequences:** The customized URL is the core value proposition of the toolkit integration -- "the right case studies in the right order with the right framing." If sharing that URL produces a generic preview, the customization is invisible to anyone who sees the shared link before clicking it. A bare URL with no preview in Slack looks unprofessional.

**Prevention:**
- Set the `og:url` meta tag to the canonical URL (without query params) so social platforms consolidate engagement signals to one URL.
- Use server-side rendering or edge functions to dynamically set OG tags based on query parameters. When a crawler hits `?mode=dark`, the server returns OG meta tags with a dark-themed preview image and an appropriate title.
- If using a static site generator without SSR, create an edge function (Vercel Edge, Cloudflare Workers, Netlify Edge) that intercepts requests with query params and injects appropriate OG tags into the HTML before returning it. This is a lightweight middleware, not a full SSR setup.
- Generate dynamic OG images (using `@vercel/og`, Satori, or similar) that reflect the theme and case study order. Show the dark sci-fi aesthetic in the preview when `?mode=dark` is set.
- Test every URL variation with LinkedIn's Post Inspector, Twitter/X Card Validator, and Facebook's Sharing Debugger. These tools show exactly what crawlers see.

**Detection:** Paste your customized URL into the Slack message box and check if the unfurled preview matches the intended experience. If it shows a generic preview or no preview, the OG tag strategy is broken.

**Phase relevance:** This must be planned when the URL parameter system is designed, and implemented when the deployment infrastructure is set up. It requires either SSR capability or edge function support from the hosting platform. Do NOT defer this to "polish" -- by then, the static HTML architecture may not support dynamic OG tags without a significant rework.

**Confidence:** MEDIUM-HIGH -- OG tag behavior with crawlers is well-documented. The specific edge function approach depends on hosting platform choice, which requires phase-specific research.

---

## Moderate Pitfalls

---

### Pitfall 6: Easter Eggs That Confuse or Annoy the Primary Audience

**What goes wrong:** Easter eggs (hidden leva-style control panel, discovery rewards) delight developers and design-curious visitors but confuse hiring managers who accidentally trigger them. A hiring manager clicks something expecting navigation and gets a control panel overlay. Or the easter egg requires so much discovery effort that it's invisible -- wasted development time that nobody sees. Or the sci-fi mode's more prominent easter eggs make the dark theme feel "gimmicky" to enterprise evaluators who received a `?mode=dark` link.

**Why it happens:** Easter eggs are designed by their creator who knows exactly where they are and what they do. The "delight" framing assumes a user who is exploring for fun. But hiring managers are evaluating for a job -- they are task-oriented ("show me your case studies, your process, your impact") not exploration-oriented. The Konami code or hidden click target that feels clever to build feels random to discover accidentally.

**Prevention:**
- Easter eggs must NEVER interfere with the primary content flow. They should exist in non-critical interaction zones: long-press on decorative elements, specific keyboard shortcuts, idle-time triggers, or footer/margin areas.
- The leva-style control panel should be discoverable through an intentional action (a small, styled button in the header or a keyboard shortcut tooltip) rather than a hidden interaction that could be triggered accidentally. Make the trigger unambiguous -- it should feel like a "bonus feature" not a "broken UI."
- Easter eggs should enhance the current mode, not override it. In dark sci-fi mode, the control panel fits the aesthetic. In light mode, easter eggs should be more subtle (e.g., an illustration that reacts to cursor, not a sci-fi control panel).
- Build a "discovery ladder": first easter egg is easy to find (visible interactive element), second requires mild exploration, third is truly hidden. This way casual visitors find something, without requiring expertise.
- Always include a clear "close" or "dismiss" mechanism. An easter egg that takes over the screen without an obvious exit is a usability failure on a designer's portfolio.

**Detection:** Have someone unfamiliar with the project navigate the site with the task "evaluate this designer for a senior role." Watch where they get confused. If they accidentally trigger an easter egg and express confusion rather than delight, redesign the trigger.

**Phase relevance:** Design easter egg interaction patterns before building them. The control panel UI can be a later phase, but the trigger patterns and placement rules should be defined when the layout/interaction system is designed.

**Confidence:** MEDIUM -- based on UX best practices and portfolio evaluation literature. Specific easter egg patterns are more subjective and depend on implementation quality.

---

### Pitfall 7: Font Loading Flash Across Two Typographic Personalities

**What goes wrong:** The light "Notion" mode uses a clean sans-serif (e.g., Inter, DM Sans) and the dark sci-fi mode uses a monospace typeface (e.g., JetBrains Mono, Space Mono). On first load, the browser shows a system font fallback, then the custom fonts load and text reflows -- this is FOUT (Flash of Unstyled Text). With TWO distinct font stacks, the problem doubles: switching themes mid-session triggers another font load if the second theme's fonts were not preloaded. Text reflows cause Cumulative Layout Shift (CLS) that hurts both Lighthouse scores and visual polish.

**Why it happens:** Web fonts are only downloaded when they are first referenced in rendered CSS. If dark-mode fonts are behind a `[data-theme="dark"]` selector that is not active on load, those fonts are not fetched until the user toggles themes. The first theme toggle causes a 200-500ms delay while fonts download, with visible FOUT during the swap.

**Prevention:**
- Preload BOTH themes' fonts in the `<head>`, regardless of which theme loads first. Use `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>` for all critical fonts.
- Use `font-display: swap` so text is always visible (system fallback renders immediately, custom font swaps in when ready).
- Choose fallback fonts that closely match the metrics (x-height, character width) of each custom font to minimize reflow. Use `@font-face` `size-adjust`, `ascent-override`, and `descent-override` to fine-tune fallback metrics.
- Limit to 2-3 font files total (one sans-serif, one monospace, possibly one display weight). Every additional font file is another network request and potential flash.
- Self-host fonts (don't use Google Fonts CDN) for maximum control over loading behavior and cache headers.

**Detection:** Load the page with DevTools Network tab filtered to "Font." Verify all theme fonts load on initial page load, not on theme toggle. Toggle themes and watch for any text reflow or flash.

**Phase relevance:** Font loading strategy must be decided when the typography system is set up, which should be part of the foundational design token phase.

**Confidence:** HIGH -- font loading performance is extensively documented by web.dev, Chrome DevTools team, and Google's CLS guidance.

---

### Pitfall 8: Content Drift Between Portfolio Repo and Job Search Toolkit

**What goes wrong:** Case study content lives in `~/Desktop/job-search-toolkit/master-files/case-studies/` and gets copied to the portfolio at build time. Over time, content gets edited in one place but not the other. The portfolio's copy of EPIC.submit diverges from the toolkit's master. The toolkit generates a URL expecting certain case study content that no longer matches what the portfolio displays. Or the build process breaks silently because a master file was renamed or restructured.

**Why it happens:** Two repos with shared content but no automated sync mechanism. Manual copy-paste is error-prone. There is no single source of truth at runtime -- the portfolio has its own copy. Content updates in the toolkit don't trigger portfolio rebuilds. File path dependencies are implicit (hardcoded paths) rather than explicit (a manifest or contract).

**Prevention:**
- Define a clear content contract: the toolkit exports content in a specific format (JSON/MDX files at specific paths with specific frontmatter fields), and the portfolio imports from those paths at build time. Document this contract in both repos.
- Use a build-time script that reads directly from the toolkit repo path (`~/Desktop/job-search-toolkit/master-files/`) rather than copying files into the portfolio repo. The portfolio should NEVER have its own copy of case study content -- it always reads from the source.
- In CI/deployment, the build script should fail loudly if expected content files are missing or malformed. Validate the content contract at build time (required fields present, expected file count, etc.).
- For deployment (where the toolkit repo may not be co-located), use a content extraction step that pulls from a known location and validates the contract before building.
- Keep a `content-manifest.json` in the toolkit that lists all available case studies, their file paths, and their metadata. The portfolio reads this manifest rather than scanning directories.

**Detection:** Add a build-time validation step that checks: (1) all expected case study files exist, (2) required frontmatter/metadata fields are present, (3) content was modified more recently than the last build (warning if stale).

**Phase relevance:** The content sourcing architecture must be designed in the phase where case study content is first integrated. The contract and validation should be established before any content is displayed.

**Confidence:** MEDIUM -- the specific two-repo architecture is custom to this project. The general principles of content contracts and build-time validation are well-established, but the specific implementation will need to be designed for this project's tooling.

---

### Pitfall 9: The "Impressive vs. Usable" Trap -- Prioritizing Wow Over Scanability

**What goes wrong:** The portfolio becomes a showcase of animation and interaction craft at the expense of the content that hiring managers actually need. Case study descriptions get buried under scroll animations. Impact metrics are styled beautifully but hard to scan. The mode toggle and easter eggs get more design attention than the "What I do" and "The right fit" sections. The site impresses other designers but frustrates the hiring manager who needs to evaluate fit in 55 seconds.

**Why it happens:** This is a designer portfolio where the site IS the work sample, creating an irresistible pull toward demonstrating maximum craft. "The contrast IS the statement" (from PROJECT.md) amplifies this -- the dual-mode concept itself is a showpiece, which makes it easy to keep investing in the showpiece at the expense of the content it frames. The reference site (laugon.com) is a dark editorial long-page that balances this well, but without constant reference, it is easy to drift toward spectacle.

**Consequences:** Hiring managers report spending 55 seconds on portfolios on average. They look for: design process, problem-solving judgment, impact metrics, and culture fit signals. If those are obscured by transitions, delayed by loading animations, or deprioritized in the visual hierarchy, the portfolio fails its primary job even if it succeeds as a design artifact.

**Prevention:**
- Define a "content-first" rule: every section must be fully readable and scannable with ALL animations disabled. If you set `* { animation: none !important; transition: none !important; }` and the site still communicates clearly, the content structure is sound.
- The hero, case study previews, and impact metrics must be above the fold or reachable within one scroll. Do not gate critical content behind scroll-triggered reveals that require waiting.
- Animations should enhance comprehension (drawing attention to key transitions between sections) not delay it (waiting 300ms for each case study card to fade in). Stagger animations so the first visible content appears instantly.
- Test the "hiring manager flow": can someone assess Marie's experience level, domain expertise, case study quality, and contact information within 60 seconds? Time this with a real person.
- Use the laugon.com reference structure as a constraint, not just inspiration. The section ordering (hero > what I do > case studies > beyond > values > fit > contact) is proven for this format.

**Detection:** Record a 60-second screen recording of a first-time visitor navigating the site. If they have not reached case study content by the 20-second mark, content is too buried.

**Phase relevance:** Content hierarchy and information architecture should be established before any animation work begins. Animations are layered on top of a working, scannable page -- never the other way around.

**Confidence:** HIGH -- portfolio evaluation patterns are well-documented by NNGroup, IxDF, and hiring manager surveys. The 55-second average review time is from portfolio-specific research.

---

### Pitfall 10: URL Parameter State Not Reflected in the Toggle

**What goes wrong:** A visitor arrives via `?mode=dark` and sees the dark theme. They click the visible mode toggle to switch to light mode. The URL still says `?mode=dark`. They bookmark the page or copy the URL to share -- and it opens in dark mode again, not the light mode they switched to. Or conversely, the toggle updates the URL (triggering a page navigation/reload) which breaks the smooth toggle experience.

**Why it happens:** There is a tension between URL-as-source-of-truth (for sharing/bookmarking) and client-side-state-as-source-of-truth (for smooth interactions). If the URL drives state, changing the URL means either `history.pushState` (which some frameworks interpret as navigation) or actual navigation (page reload). If client state drives state, the URL becomes stale.

**Prevention:**
- Use `history.replaceState()` to silently update the URL when the theme toggle is clicked, without triggering navigation or page reload. This keeps the URL in sync with the current state for bookmarking/sharing purposes.
- On initial load, the priority chain should be: (1) URL parameter `?mode=` if present, (2) localStorage preference from a previous visit, (3) `prefers-color-scheme` system preference, (4) default to light.
- After the initial load, the URL parameter has done its job -- subsequent toggles update both localStorage AND the URL via `replaceState`.
- For the `?order=` parameter, this should be read-only from the URL (set by the toolkit) and not modifiable by the user through the UI. The toggle only affects `?mode=`.
- Test the full cycle: arrive via URL > toggle > copy URL > paste in new tab > verify state matches.

**Detection:** Open the site with `?mode=dark`, toggle to light, copy the URL from the address bar, and paste it in a new tab. If the new tab opens in dark mode, the URL sync is broken.

**Phase relevance:** This must be designed when the URL parameter system is implemented. The state management approach (URL vs. localStorage vs. client state) should be decided as part of the core architecture.

**Confidence:** HIGH -- `history.replaceState` for theme state sync is a well-established pattern. The priority chain (URL > localStorage > system preference > default) is standard.

---

## Minor Pitfalls

---

### Pitfall 11: Case Study Order Parameter Creates Confusing Scroll Experience

**What goes wrong:** The `?order=2,1,4,3` parameter reorders case studies, but the long-page editorial format means users scroll through them sequentially. If the reordering is purely visual (CSS order property), screen readers and keyboard navigation follow DOM order (not visual order), creating an accessibility disconnect. If the reordering is at the data/component level, the transitions between case studies may not flow narratively because they were written for a different sequence.

**Prevention:**
- Reorder at the data level (array sort before render), not at the CSS level. This ensures DOM order matches visual order, which matches screen reader order.
- Between case studies, use transitional elements (spacing, dividers, section headings) that work regardless of order, rather than narrative transitions that assume a specific sequence.
- Validate the order parameter: if it references a case study index that does not exist, ignore the parameter gracefully rather than showing a blank slot or crashing.

**Phase relevance:** Design the case study data layer to be order-agnostic from the start.

**Confidence:** MEDIUM -- the accessibility implication of CSS `order` vs. DOM order is well-documented. The narrative flow concern is specific to this project's long-page format.

---

### Pitfall 12: Overloading the Initial Bundle With Both Themes' Assets

**What goes wrong:** Both themes' decorative assets (background textures, glow SVGs, character illustrations for both modes, pattern overlays) are loaded eagerly, doubling the initial download even though only one theme is visible. For the sci-fi mode with its potentially heavier assets (particle effects, glow textures), this is especially costly.

**Prevention:**
- Lazy-load theme-specific decorative assets. The inactive theme's character illustration, background textures, and decorative SVGs should load only when the user toggles themes (or after idle time as a prefetch).
- Critical assets (layout images, above-the-fold character for the active theme) load eagerly. Decorative/inactive assets load lazily.
- Do NOT lazy-load the hero/LCP image -- this is the most common Lighthouse mistake. The above-the-fold character illustration for the ACTIVE theme must load eagerly with `loading="eager"` and `fetchpriority="high"`.
- Prefetch inactive theme assets after the page becomes interactive (using `requestIdleCallback` or a 3-second timeout) so the theme toggle feels instant when clicked.

**Phase relevance:** Asset loading strategy should be defined when the theme asset system is implemented.

**Confidence:** HIGH -- lazy loading best practices and LCP optimization are well-documented by Chrome DevTools and web.dev.

---

### Pitfall 13: Confidentiality Leak Through URL Parameters or Metadata

**What goes wrong:** The URL parameter system (`?order=2,1,4,3`) is designed for per-application customization. If a hiring manager at Company A sees a URL clearly tailored for them and shares it, or if the URL parameters encode information that reveals the job search strategy (e.g., "PM persona" ordering), it could expose the confidential job search. Per PROJECT.md: "Job search is confidential -- no references to specific applications or employers on the portfolio."

**Prevention:**
- URL parameters must be opaque to the viewer. `?order=2,1,4,3` is already good -- it is numeric indices, not company names. Never use parameters like `?company=acme` or `?persona=pm`.
- Do not include any per-application metadata in the HTML, OG tags, or page title. The dynamic OG tags should say "Marie Anik Paradis -- UX & Product Designer" not "Marie's Portfolio for [Company]."
- The toolkit generates URLs; the portfolio consumes them without revealing their source. There should be no visible indicator on the portfolio that it is being controlled by an external system.
- Consider whether the `?order=` parameter itself is suspicious. A hiring manager seeing `?mode=dark&order=2,1,4,3` in their URL bar may wonder what the numbers mean. If this is a concern, use a hashed/encoded parameter (e.g., `?v=a3x9k`) that the toolkit generates and the portfolio decodes, so the URL looks clean.

**Phase relevance:** URL parameter design is a foundational decision. The encoding strategy should be decided before any URL generation logic is built in either repo.

**Confidence:** MEDIUM -- the confidentiality requirement is project-specific. The obfuscation technique (encoding parameters) is straightforward but adds implementation complexity.

---

### Pitfall 14: Neglecting the "View Source" Audience

**What goes wrong:** Technical hiring managers and developers at startups will inspect the code. Messy markup, inline styles for theme hacks, `!important` overrides, inaccessible ARIA patterns, or commented-out debug code in the production build undermine the "the site IS the work sample" premise. For a designer who claims to understand implementation, sloppy code signals the opposite.

**Prevention:**
- Treat the HTML output as part of the portfolio. Use semantic HTML (`<article>`, `<section>`, `<nav>`, `<main>`), meaningful class names, and clean structure.
- Remove all debug tools, console logs, and development aids from the production build. If using leva for easter eggs, ensure it is properly tree-shaken or lazy-loaded only when triggered.
- Ensure the source includes proper meta tags, structured data (schema.org for a personal portfolio), and clean, well-organized CSS custom properties that are readable in DevTools.
- Add a subtle HTML comment in the source that acknowledges the viewer: `<!-- You found the source. Nice. Built with [stack]. -->` This is a minor easter egg for the code-inspection audience.

**Phase relevance:** Code quality standards should be set from the first phase. A linting/formatting setup in CI catches most issues automatically.

**Confidence:** MEDIUM -- the "view source" evaluation behavior is anecdotal but widely reported among developer hiring. Clean code as a portfolio signal is a reasonable assumption for a designer who works with developers.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Design token/theme foundation | Two Websites Trap (Pitfall 2) | Build shared token architecture first, theme variants second |
| Theme implementation | Theme Flash FOUC (Pitfall 1) | Blocking inline script in `<head>` from day one |
| Dark mode styling | Accessibility failures (Pitfall 3) | Contrast-check every token value before using it in components |
| Typography setup | Font loading flash (Pitfall 7) | Preload all fonts, choose metric-compatible fallbacks |
| Animation/scroll effects | Performance tank (Pitfall 4) | Set performance budget, only animate transform/opacity |
| URL parameter system | State sync issues (Pitfall 10) | Design URL/localStorage/client state priority chain |
| URL parameter system | Social sharing broken (Pitfall 5) | Plan edge function for dynamic OG tags with the hosting setup |
| URL parameter system | Confidentiality leak (Pitfall 13) | Use opaque parameter encoding |
| Case study integration | Content drift (Pitfall 8) | Define content contract, read from source at build time |
| Case study ordering | Scroll/a11y issues (Pitfall 11) | Reorder at data level, not CSS level |
| Easter egg implementation | UX confusion (Pitfall 6) | Design trigger patterns before building features |
| Asset loading | Bundle bloat (Pitfall 12) | Lazy-load inactive theme assets, eager-load LCP |
| Overall content strategy | Impressive vs. usable (Pitfall 9) | Content-first rule, test with animation disabled |
| Production build | View source quality (Pitfall 14) | Lint/format in CI, semantic HTML throughout |

---

## Sources

- [CSS-Tricks: A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) -- MEDIUM confidence, comprehensive reference
- [web.dev: Dark and Light Theme Switch](https://web.dev/patterns/theming/theme-switch) -- HIGH confidence, official Google resource
- [The Accessibility Checker: Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/) -- MEDIUM confidence
- [W3C WCAG 2.1: Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) -- HIGH confidence, official standard
- [W3C WCAG 2.1: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- HIGH confidence, official standard
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) -- HIGH confidence, official docs
- [Chrome DevTools: Scroll Animation Performance Case Study](https://developer.chrome.com/blog/scroll-animation-performance-case-study) -- HIGH confidence, official Google resource
- [Motion.dev: Web Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list) -- MEDIUM confidence
- [Not A Number: Fixing Dark Mode Flickering in React/Next.js](https://notanumber.in/blog/fixing-react-dark-mode-flickering) -- MEDIUM confidence
- [Axel Larsson: Prevent Dark Mode Flicker in Astro](https://axellarsson.com/blog/astrojs-prevent-dark-mode-flicker/) -- MEDIUM confidence
- [Search Engine Journal: URL Parameter Handling](https://www.searchenginejournal.com/technical-seo/url-parameter-handling/) -- MEDIUM confidence
- [Netlify: Dynamically Generate OG Image Variants](https://www.netlify.com/blog/dynamically-generate-open-graph-image-variants/) -- MEDIUM confidence
- [web.dev: Font Preloading for Optional Fonts](https://web.dev/articles/preload-optional-fonts) -- HIGH confidence, official Google resource
- [DebugBear: Fixing Layout Shifts Caused by Web Fonts](https://www.debugbear.com/blog/web-font-layout-shift) -- MEDIUM confidence
- [NNGroup: UX Portfolios - What Hiring Managers Look For](https://www.nngroup.com/videos/ux-portfolios-hiring/) -- HIGH confidence, authoritative UX research
- [IxDF: What are UX Portfolios?](https://ixdf.org/literature/topics/ux-portfolio) -- MEDIUM confidence
- [Medium (Eleana Gkogka): Easter Eggs in UI/UX Design](https://medium.com/@eleana_gkogka/easter-eggs-little-delights-in-ux-design-fa26911cd8a3) -- LOW confidence, single source
- [The Developer's Guide to Design Tokens and CSS Variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) -- MEDIUM confidence
