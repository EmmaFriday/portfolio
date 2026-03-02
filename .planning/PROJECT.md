# Portfolio -- Marie Anik Paradis

## What This Is

A dual-mode portfolio website for a Senior UX & Product Designer with 12+ years of experience in government, B2B SaaS, and enterprise systems. The site presents 4-5 case studies and personal brand in a long-page editorial format, with two distinct visual modes: a clean "Notion" light mode and a retro sci-fi dark mode. It integrates with an external job search toolkit to enable per-application customization via URL parameters.

## Core Value

The portfolio must present Marie's case studies compellingly and be customizable per job application -- the right case studies in the right order with the right framing, controlled by URL parameters that the job search toolkit generates automatically.

## Requirements

### Validated

(None yet -- ship to validate)

### Active

- [ ] Dual-mode theming: light ("Notion" -- clean, white, illustrated character, subtle) and dark ("Sci-fi" -- black, teal/cyan accents, glowing effects, retro-tech character)
- [ ] Long-page editorial layout following reference site structure (laugon.com)
- [ ] Sections: Hero + character, What I do, Impact metrics, Case studies, Beyond the portfolio, What I stand for, The right fit, Contact/CTA
- [ ] Visible mode toggle in header (styled as a designed interaction piece)
- [ ] URL query param support: ?mode=light|dark for theme control
- [ ] URL query param support: ?order=2,1,4,3 for case study reordering
- [ ] 4-5 case studies displayed vertically with previews and descriptions
- [ ] Case study content sourced from job search toolkit master files
- [ ] Illustrated character: current style in light mode, sci-fi version in dark mode
- [ ] Easter eggs: hidden interactive controls (leva-style parameter panel) and discovery rewards
- [ ] Easter eggs more prominent / accessible in dark sci-fi mode
- [ ] Responsive design (desktop + mobile)
- [ ] Deployable to a hosting platform with custom domain support
- [ ] Integration point for job search toolkit to generate customized URLs

### Out of Scope

- Full case study pages (long-page format covers summaries; deep-dive pages are v2)
- Job search toolkit modifications (separate project, separate repo)
- Creating the sci-fi character illustration (Marie will create/commission separately)
- Real-time CMS or content editing UI
- Blog or writing section
- Authentication or admin panel

## Context

- **Current portfolio:** Hosted on uxfol.io -- clean white design with illustrated character, 4 case studies in 2-column grid, About page with bio/metrics/what I'm looking for
- **Reference site:** laugon.com -- dark editorial long-page with sections: hero, what I do, case studies, teaching, beyond portfolio, values, right fit, footer
- **Retro reference:** Leva control panel sci-fi UI -- dark teal/navy, gold/amber elements, monospace type, instrument-style sliders and readouts
- **Job search toolkit:** Located at ~/Desktop/job-search-toolkit/ -- has master case study content in /master-files/case-studies/ (EPIC.submit, EPIC.engage, VIP Modernization, NSC Interactions, PTMP) plus homepage/about content in /master-files/portfolio-base/
- **Three positioning personas:** PM Marie, Designer Marie, AI Marie -- the toolkit recommends which persona to lead with per application
- **Content migration:** Case study and page content will be copied from toolkit master files as baseline, then the toolkit operates on the live portfolio per application
- **Design direction:** The mode toggle is the signature interaction -- light mode is professional and warm, dark mode reveals the creative/technical side. The contrast IS the statement.

## Constraints

- **Content:** Case study content must come from existing master files in the job search toolkit (no fabrication)
- **Character art:** Light mode character exists; dark mode sci-fi character is a placeholder until Marie creates it
- **Writing style:** No em dashes (ever) -- per Marie's established style rules
- **Confidentiality:** Job search is confidential -- no references to specific applications or employers on the portfolio
- **Accessibility:** Must meet accessibility standards (Marie designs for universal accessibility professionally)
- **Architecture:** Portfolio repo (~/Desktop/portfolio/) is the build project; job search toolkit (~/Desktop/job-search-toolkit/) is the operations layer -- they stay separate

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dual-mode (light/dark) with personality shift | Light = professional/editorial, Dark = creative/sci-fi. Lets Marie tailor presentation to company culture via URL param | -- Pending |
| Separate repos (portfolio + toolkit) | Portfolio focuses on build/design, toolkit focuses on job ops. Content flows toolkit to portfolio at build time, toolkit operates on live site per application | -- Pending |
| Query param versioning (?mode, ?order) | Enables automated per-application customization without deploying separate sites. Toolkit generates URLs. | -- Pending |
| Long-page single-page format | Following laugon.com reference -- more engaging than multi-page, tells a story as you scroll | -- Pending |
| Visible mode toggle (not hidden) | The toggle itself demonstrates design craft. Easter eggs are separate hidden elements. | -- Pending |

---
*Last updated: 2026-03-02 after initialization*
