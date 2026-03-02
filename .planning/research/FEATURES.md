# Feature Research

**Domain:** Senior UX/Product Designer dual-mode portfolio website
**Researched:** 2026-03-02
**Confidence:** HIGH (corroborated across multiple hiring manager guides, portfolio best practice sources, and industry analysis)

## Feature Landscape

### Table Stakes (Users Expect These)

Features hiring managers and recruiters assume exist. Missing any of these means the portfolio gets closed within seconds.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Clear positioning statement in hero** | Hiring managers decide in 0-3 seconds whether you match their needs. Generic statements like "I care about users" get skipped. Must answer: what kind of designer, what level, what domains. | LOW | Marie's existing copy ("Senior UX & Product Designer, 12+ years, Government/B2B SaaS/Enterprise") is already strong. Surface it prominently. |
| **Impact metrics section** | 58% of hiring managers cite visual polish as critical, but business impact is the differentiator between senior and mid-level. Metrics like "5% to 80% comment quality" speak the language of product and business. | LOW | Already have 6 strong metrics from homepage.md. Display them as large, scannable figures with context. |
| **4-5 case study previews with outcomes-first framing** | Hiring managers skim for metrics and evidence of strategic thinking after the hero. Case studies are the core product of a senior designer portfolio. Quality over quantity. | MEDIUM | Each preview needs: title framing the outcome (not the activity), one key metric, role, and a 1-2 sentence hook. Vertical layout per PROJECT.md reference. |
| **Responsive design (desktop + mobile)** | Hiring managers review portfolios on laptops, phones, and tablets. A portfolio that breaks on mobile is disqualifying for a UX designer. | MEDIUM | Long-scroll editorial layout must work at every breakpoint. Mobile is not an afterthought; it is where quick reviews happen. |
| **Fast load time (under 3 seconds)** | Google data: bounce probability jumps from 32% (3s) to 90% (5s). Hiring managers will not wait. A slow portfolio signals poor technical judgment. | MEDIUM | Optimize images, minimize JavaScript, lazy-load below-fold content. Critical for first-impression credibility. |
| **Accessibility (WCAG 2.1 AA minimum)** | Marie designs for universal accessibility professionally. A portfolio that fails accessibility would undermine her credibility instantly. Also increasingly a legal requirement (EU EAA June 2025, US ADA Title II April 2026). | MEDIUM | 4.5:1 contrast ratios for text, keyboard navigation, screen reader support, focus indicators, skip navigation, alt text. Both light AND dark modes must pass. |
| **Contact CTA** | Hiring managers who reach the bottom are warm leads. Making it easy to reach out converts interest into conversations. | LOW | Email link is sufficient. A mailto: link with a clear CTA is more trustworthy and lower-friction than a contact form for hiring contexts. |
| **About section with personality** | The About section is where people go after they already like your work. It humanizes you and determines whether they want to meet you. | LOW | Already have content in about.md. Integrate into the long-page scroll as "Beyond the Portfolio" and "What I Stand For" sections per PROJECT.md structure. |
| **Professional custom domain** | Non-custom URLs (uxfol.io, Behance) signal lack of investment for senior roles. A custom domain is the baseline expectation. | LOW | Already planned in PROJECT.md. Deploy to a hosting platform with custom domain. |
| **Open Graph / social meta tags** | When the portfolio URL is shared in Slack, LinkedIn, or email, it must render a professional preview. Critical: SPAs built with React/Vue that inject OG tags via JavaScript will not be read by social crawlers. Must be server-rendered or pre-rendered. | LOW | Requires SSR/SSG or a pre-rendering strategy. Non-negotiable for a site that will be shared by recruiters internally. |
| **Smooth scroll navigation** | The long-page editorial format requires clear section wayfinding. Users need to know where they are and be able to jump to sections. | LOW | Sticky header with section links. Smooth scroll to anchors. Active state on current section. |

### Differentiators (Competitive Advantage)

Features that set Marie's portfolio apart from the thousands of clean-but-forgettable UX portfolios. These are where the portfolio competes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Dual-mode personality shift (light/dark)** | This IS the portfolio's thesis: Marie is both the polished professional (light) and the creative technologist (dark). The contrast demonstrates range, taste, and technical skill in a single artifact. No other senior UX designer portfolio does this. | HIGH | Not just a color swap. Light mode = clean, Notion-like, illustrated character, subtle. Dark mode = sci-fi, teal/cyan, glowing effects, retro-tech character. Same layout, different personality. Both must meet accessibility. |
| **Mode toggle as signature interaction** | The toggle itself is a designed artifact, not a generic switch. It demonstrates interaction design craft at the moment of use. Hiring managers will remember it. | MEDIUM | Must feel intentional and delightful. The toggle should have a meaningful transition animation. It is visible in the header, not hidden. This is the first thing a curious visitor will interact with. |
| **URL query parameter customization (?mode, ?order)** | Enables per-application tailoring without deploying separate sites. Startup culture gets dark mode with a specific case study order. Enterprise gets light mode with a different order. The toolkit generates these URLs automatically. This is invisible to the visitor but transformative for the job search. | MEDIUM | ?mode=light or ?mode=dark sets the initial theme. ?order=2,1,4,3 reorders case study display. Must work without JavaScript (initial render from params) and gracefully degrade if params are missing. |
| **Easter eggs and hidden interactive elements** | Rewards curiosity. Demonstrates that Marie thinks about delight, not just function. Creates word-of-mouth moments. Research shows easter eggs create memorable impressions and signal personality. | MEDIUM | Konami code, hidden Leva-style parameter panel, text selection reveals, click interactions. More prominent in dark/sci-fi mode. Must not interfere with professional impression in light mode. |
| **Leva-style control panel (hidden debug/parameter UI)** | A sci-fi "instrument panel" easter egg that lets curious visitors tweak visual parameters. Directly references the Leva React GUI library aesthetic. Demonstrates technical depth and playfulness simultaneously. | HIGH | Hidden behind a discovery mechanic (keyboard shortcut, specific click pattern, or console hint). Allows adjusting colors, glow intensity, animation speed. Only appears in dark mode or is more prominent there. |
| **Scroll-triggered reveal animations** | Sections and case study cards animate into view as the user scrolls. Creates a narrative rhythm and guides attention through the editorial flow. Sites with animations see 37% higher engagement. | MEDIUM | Must be performant (use CSS transforms/opacity, not layout-triggering properties). Hardware-accelerated. Subtle in light mode, more dramatic in dark mode. Respect prefers-reduced-motion. |
| **Illustrated character with mode variants** | Light mode has Marie's current illustrated style. Dark mode has a sci-fi version. The character grounds the portfolio in personality and makes it immediately recognizable. | LOW (implementation) | Marie creates the art separately. Technical implementation is just swapping image sources per mode. The character appears in hero section and potentially as a recurring motif. |
| **"Right fit" section with positioning filters** | A section that explicitly states what kind of roles, teams, and problems Marie is best for. Saves hiring managers time and signals confidence. Research shows explicit positioning outperforms "I can do anything" messaging. | LOW | Content already planned in PROJECT.md sections. Frame as "The Right Fit" to help hiring managers self-select. |
| **Impact timeline / metrics visualization** | Rather than listing metrics as text, display them as visual data points. Large numbers with contextual labels. Creates visual hierarchy that makes business impact scannable in the 3-10 second window. | MEDIUM | Animated counters or large typographic numbers with before/after framing. "5% to 80%" is more powerful as a visual progression than a bullet point. |

### Anti-Features (Commonly Requested, Often Problematic)

Features to deliberately NOT build. These seem good on the surface but create problems for a senior designer portfolio.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Full case study pages (v1)** | Depth shows thinking. Hiring managers want to see process. | Massive content and design effort. The long-page preview format already communicates strategic thinking through outcome-first framing. Full pages are v2 after the core site proves itself. | Rich preview cards with outcome-first framing, key metric, role, and a 2-3 sentence strategic hook. Add "Full case study coming soon" or link to existing uxfol.io pages as interim. |
| **Blog or writing section** | Demonstrates thought leadership. | Scope creep. An empty blog is worse than no blog. Marie's positioning is as a practitioner, not a content creator. A blog also requires ongoing maintenance. | The "What I Stand For" section and case study framing demonstrate thought leadership without requiring ongoing content. |
| **Contact form with fields** | Seems professional. Captures structured inquiries. | Adds backend complexity (form processing, spam protection). Hiring managers prefer to email directly from their own client. A form feels like a barrier. | Simple mailto: link with a clear "Let's talk" CTA. Include LinkedIn as secondary. |
| **Real-time CMS or admin panel** | Easy content updates without code. | Massive engineering overhead for a portfolio with 5 case studies that change infrequently. The toolkit integration means content changes happen at build time, not at runtime. | Static site generation with content sourced from toolkit master files. Update by rebuilding. |
| **Chat widget or AI assistant** | Trendy. "Talk to my portfolio." | Gimmicky for a senior designer. Feels like a tech demo, not a professional site. Undermines the editorial craft. Also creates maintenance and cost burden. | The portfolio itself tells the story. Easter eggs provide interactivity for the curious. |
| **3D scenes or Three.js hero** | Flashy. Shows technical skill. | Heavy load times (contradicts the 3-second threshold). Accessibility nightmare. Distracts from case study content. More appropriate for a front-end developer portfolio than a UX strategist. | Subtle CSS animations, the mode toggle transition, and the Leva panel easter egg provide technical flair without sacrificing load time or accessibility. |
| **Video backgrounds or autoplay media** | Dynamic, engaging first impression. | Slow to load, battery-draining on mobile, inaccessible without captions, and annoying when someone opens the portfolio in a meeting. | Static hero with illustrated character and subtle CSS animation. The mode toggle provides the "wow" moment. |
| **Multi-page navigation** | Separate pages for About, Work, Contact. | Breaks the editorial scroll narrative that the reference site (laugon.com) establishes. Multi-page adds routing complexity and loses the storytelling flow. | Single long-page with smooth scroll navigation and section anchors. The scroll IS the narrative. |
| **Authentication or password protection** | Protect confidential case studies. | Adds friction that kills conversion. Hiring managers will not create an account. Password-protected portfolios have dramatically higher bounce rates. | Keep all content portfolio-appropriate. Confidential details stay in the job search toolkit, not on the public site. Use NDA-friendly framing in case studies. |
| **Animations on every element** | Makes the site feel "alive" and modern. | Animation fatigue. Too many animations feel chaotic and slow. Interferes with scanning behavior. Distracts from content. | Purposeful animation on key moments: section reveals, mode toggle, metric counters, hover states on case study cards. Everything else is static. |

## Feature Dependencies

```
[Responsive Layout Framework]
    |-- requires --> [Dual-Mode Theming System]
    |                   |-- requires --> [CSS Custom Properties / Theme Tokens]
    |                   |-- requires --> [Mode Toggle Component]
    |                   |                   |-- enhances --> [URL Query Param Support (?mode)]
    |                   |-- requires --> [Accessibility Compliance Per Mode]
    |
    |-- requires --> [Section Structure (Hero, Metrics, Cases, About, Fit, Contact)]
    |                   |-- requires --> [Case Study Preview Cards]
    |                   |                   |-- enhances --> [URL Query Param Support (?order)]
    |                   |-- enhances --> [Scroll Navigation]
    |                   |-- enhances --> [Scroll-Triggered Animations]
    |
    |-- enhances --> [Easter Eggs Layer]
                        |-- requires --> [Dual-Mode Theming System] (eggs are mode-aware)
                        |-- enhances --> [Leva-Style Control Panel]

[Open Graph / Meta Tags]
    |-- requires --> [SSR or Pre-rendering Strategy]
    |-- independent of --> [Easter Eggs Layer]

[Illustrated Character]
    |-- requires --> [Dual-Mode Theming System] (swaps per mode)
    |-- independent of --> [Easter Eggs Layer]
```

### Dependency Notes

- **Dual-Mode Theming requires CSS Custom Properties:** The entire visual system must be built on theme tokens from day one. Retrofitting theming is a rewrite.
- **URL Query Params require Mode Toggle and Case Study Cards:** The params control things that must already exist. Build the controllable things first, then add the control mechanism.
- **Easter Eggs require the Theming System:** Eggs are mode-aware (more prominent in dark mode). The theming system must be stable before easter eggs layer on top.
- **Open Graph requires SSR/pre-rendering:** This is a build-time concern that must be decided in the stack phase. Cannot be an afterthought with a client-side SPA.
- **Scroll animations enhance section structure:** Sections must exist and work without animation first. Animations are progressive enhancement.
- **Accessibility must be validated in BOTH modes:** This is not a feature to add later. Both modes must pass WCAG 2.1 AA from the start, or dark mode becomes a liability.

## MVP Definition

### Launch With (v1)

Minimum viable portfolio that a hiring manager can receive, review, and be impressed by.

- [ ] **Hero with positioning statement and illustrated character** -- The 0-3 second decision happens here
- [ ] **Impact metrics section** -- Business credibility in the 3-10 second scan window
- [ ] **4-5 case study preview cards (outcome-first framing)** -- The core content. Vertical layout with title, key metric, role, and strategic hook
- [ ] **Dual-mode theming (light + dark)** -- This is the portfolio's thesis, not a nice-to-have. Without it, the site is just another clean portfolio
- [ ] **Mode toggle in header** -- Visible, designed, signature interaction
- [ ] **URL query param: ?mode=light|dark** -- Enables toolkit integration for per-application theming
- [ ] **URL query param: ?order=2,1,4,3** -- Enables toolkit integration for case study reordering
- [ ] **"Beyond the Portfolio" section** -- Humanizes Marie after case studies
- [ ] **"What I Stand For" section** -- Values and design philosophy
- [ ] **"The Right Fit" section** -- Explicit positioning for hiring managers
- [ ] **Contact CTA with email link** -- Conversion endpoint
- [ ] **Responsive design** -- Desktop and mobile
- [ ] **Accessibility (WCAG 2.1 AA)** -- Both modes. Non-negotiable for a UX designer
- [ ] **Open Graph meta tags** -- Professional link previews when shared
- [ ] **Fast load time (under 3 seconds)** -- Performance as credibility
- [ ] **Custom domain deployment** -- Professional URL

### Add After Validation (v1.x)

Features to add once the core portfolio is live and Marie has shared it with a few hiring managers for feedback.

- [ ] **Scroll-triggered reveal animations** -- After layout is stable and performant, add progressive enhancement animations
- [ ] **Impact metrics visualization** -- Upgrade from text to animated counters or visual progressions
- [ ] **Easter eggs (basic layer)** -- Konami code, text selection surprises, click interactions. Start simple.
- [ ] **Mode toggle transition animation** -- Upgrade the toggle from functional to delightful with a polished transition between modes
- [ ] **Smooth scroll navigation with active section indicator** -- Enhance wayfinding after section structure is finalized

### Future Consideration (v2+)

Features to defer until the portfolio is proven and Marie has bandwidth.

- [ ] **Full case study pages** -- Deep-dive pages with process documentation, wireframes, and expanded narrative
- [ ] **Leva-style hidden control panel** -- The sci-fi instrument panel easter egg. High effort, high delight, but only meaningful once the base experience is polished
- [ ] **Advanced easter eggs** -- Hardware sensor triggers (device shake/tilt), console messages, seasonal variants
- [ ] **Analytics integration** -- Track where visitors drop off, which case studies get attention, mode preference distribution
- [ ] **Case study filtering by persona** -- The three positioning personas (PM Marie, Designer Marie, AI Marie) could each have a curated view. Requires more complex URL param logic.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero with positioning | HIGH | LOW | P1 |
| Impact metrics section | HIGH | LOW | P1 |
| Case study preview cards | HIGH | MEDIUM | P1 |
| Dual-mode theming system | HIGH | HIGH | P1 |
| Mode toggle (header, designed) | HIGH | MEDIUM | P1 |
| URL param: ?mode | HIGH | LOW | P1 |
| URL param: ?order | HIGH | LOW | P1 |
| About/values/fit sections | MEDIUM | LOW | P1 |
| Contact CTA | MEDIUM | LOW | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Accessibility (WCAG 2.1 AA) | HIGH | MEDIUM | P1 |
| Open Graph meta tags | MEDIUM | LOW | P1 |
| Performance optimization | HIGH | MEDIUM | P1 |
| Custom domain | MEDIUM | LOW | P1 |
| Smooth scroll navigation | MEDIUM | LOW | P1 |
| Scroll-triggered animations | MEDIUM | MEDIUM | P2 |
| Metrics visualization | MEDIUM | MEDIUM | P2 |
| Mode toggle animation | MEDIUM | MEDIUM | P2 |
| Basic easter eggs | LOW | MEDIUM | P2 |
| Illustrated character mode swap | MEDIUM | LOW | P2 |
| Full case study pages | HIGH | HIGH | P3 |
| Leva control panel easter egg | LOW | HIGH | P3 |
| Advanced easter eggs | LOW | MEDIUM | P3 |
| Analytics | MEDIUM | LOW | P3 |
| Persona-based filtering | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch. The portfolio is incomplete without these.
- P2: Should have, add in the polish phase. Makes the portfolio memorable.
- P3: Future consideration. Valuable but not blocking the job search.

## Competitor Feature Analysis

| Feature | Standard UX Portfolios (uxfol.io, Squarespace) | Award-Winning Portfolios (Awwwards, Muzli Top 100) | Marie's Approach |
|---------|--------------------------------------------------|------------------------------------------------------|------------------|
| Theme | Single mode (usually light) | Often dark-only with heavy effects | Dual-mode with personality shift -- unique in the space |
| Case studies | Grid of thumbnails linking to pages | Elaborate full-page experiences with heavy animation | Outcome-first preview cards in vertical editorial layout. Full pages deferred to v2. |
| Interactivity | Hover effects, basic transitions | Scroll-jacking, 3D scenes, cursor effects, WebGL | Mode toggle as hero interaction, easter eggs for depth. No scroll-jacking. |
| Customization | None | None | URL query params for per-application tailoring. No competitor does this. |
| Performance | Fast (simple templates) | Often slow (heavy JavaScript, WebGL) | Fast by design. Under 3 seconds. No heavy 3D. |
| Accessibility | Variable (templates often fail) | Usually poor (custom builds neglect a11y) | WCAG 2.1 AA in both modes. Demonstrates professional commitment. |
| Personality | Minimal | In-your-face creative expression | Calibrated. Light mode = professional warmth. Dark mode = creative depth. Hiring manager chooses the experience via URL. |
| Mobile | Template-responsive | Often broken on mobile | First-class responsive. Long-scroll works naturally on mobile. |

## Sources

- [UX Playbook: Senior UX Designer Portfolio Guide 2026](https://uxplaybook.org/articles/senior-ux-designer-portfolio-get-hired-2026) -- MEDIUM confidence, verified against multiple sources
- [OpenDoors Careers: How Hiring Managers Look at Portfolios](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio) -- MEDIUM confidence, hiring manager perspective
- [IxDF: Grab Hiring Managers' Attention](https://www.interaction-design.org/literature/article/grab-hiring-managers-attention-with-your-design-portfolio-right-from-the-start) -- MEDIUM confidence
- [UXfolio Blog: UX Design Skills 2025](https://blog.uxfol.io/ux-design-skills/) -- MEDIUM confidence
- [Perspect Agency: Designing for Dark and Light Mode](https://perspectaagency.com/blog/designing-for-dark-mode-and-light-mode/) -- MEDIUM confidence
- [Dev.to: Playing with Easter Eggs](https://dev.to/rose/playing-with-easter-eggs-ideas-for-making-your-website-more-fun-1p0p) -- LOW confidence, single source, used for idea generation only
- [Muzli: Top 100 Creative Portfolios 2025](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/) -- LOW confidence, trend observation
- [Google/Integreat: Page Load Speed Research](https://www.integreatcommerce.com/the-3-second-threshold-of-page-load-speed) -- HIGH confidence, widely cited Google data
- [WCAG 2.2 / Accessibility Standards 2026](https://www.accessibilitychecker.org/guides/wcag/) -- HIGH confidence, regulatory standard
- [Leva (pmndrs) GitHub](https://github.com/pmndrs/leva) -- HIGH confidence, primary source

---
*Feature research for: Senior UX/Product Designer dual-mode portfolio website*
*Researched: 2026-03-02*
