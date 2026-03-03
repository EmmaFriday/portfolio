// =============================================================================
// Content Data Layer — Single Source of Truth
//
// All portfolio section content as typed TypeScript constants.
// Content is manually curated from the job search toolkit master case study
// files for outcome-first framing and concise presentation.
// =============================================================================

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface CaseStudy {
  id: string;
  title: string; // Outcome-first headline
  metric: string; // Key number, e.g. "5% to 80%"
  metricLabel: string; // What the metric measures
  role: string; // Role title
  hook: string; // 1-2 sentence strategic hook
}

export interface ImpactMetric {
  value: string; // The big number, e.g. "$390-495M"
  label: string; // Short label, e.g. "Annual Social Value"
  context: string; // One-line description
}

export interface NavLink {
  label: string;
  href: string; // e.g. "#impact"
}

export interface WhatIDoCategory {
  title: string;
  description: string;
}

export interface HeroContent {
  name: string;
  title: string;
  subtitle: string;
}

export interface ContactInfo {
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
}

// ---------------------------------------------------------------------------
// Navigation Links (5 links per research recommendation)
// ---------------------------------------------------------------------------

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Fit", href: "#fit" },
  { label: "Contact", href: "#contact" },
] as const;

// ---------------------------------------------------------------------------
// Hero Content
// ---------------------------------------------------------------------------

export const heroContent: HeroContent = {
  name: "Marie Anik Paradis",
  title: "Senior UX & Product Designer",
  subtitle:
    "Crafting thoughtful digital experiences that bridge user needs with business goals.",
} as const;

// ---------------------------------------------------------------------------
// Case Studies (4 studies from toolkit master files — excludes VIP)
// ---------------------------------------------------------------------------

export const caseStudies: CaseStudy[] = [
  {
    id: "epic-submit",
    title:
      "One Architecture, Many Teams: A Platform That Scales Without Redesign",
    metric: "100%",
    metricLabel: "Centralized in 5 months",
    role: "Senior UX Designer & Product Lead",
    hook: "Built a modular document submission system starting with the hardest use case, then watched it expand across an entire organization without a single structural change.",
  },
  {
    id: "epic-engage",
    title:
      "From 5% Useful to 80% Relevant: Redesigning Public Engagement for 5M Residents",
    metric: "5% to 80%",
    metricLabel: "Comment quality improvement",
    role: "Senior UX/Product Designer, Researcher, Product Owner",
    hook: "Constraint-driven design transformed the quality of community feedback and built an admin system that\u2019s run itself for over two years.",
  },
  {
    id: "nsc-interactions",
    title:
      "Cross-System Intelligence for 20,000+ Carriers: From Months to Hours",
    metric: "$390-495M",
    metricLabel: "Annual social value",
    role: "Senior UX/Product Designer & Information Architect",
    hook: "Designed the data architecture that linked four isolated enterprise systems, uncovering fraud patterns that previously took months to detect.",
  },
  {
    id: "bambora-sso",
    title:
      "Migrating 20,000+ Merchants to Modern Auth Without Breaking Payments",
    metric: "20,000+",
    metricLabel: "Merchants migrated",
    role: "UX Designer",
    hook: "Designed five distinct authentication flows within severe technical constraints and zero tolerance for downtime.",
  },
] as const;

// ---------------------------------------------------------------------------
// Impact Metrics (6 cross-project aggregate)
// ---------------------------------------------------------------------------

export const impactMetrics: ImpactMetric[] = [
  {
    value: "$390-495M",
    label: "Annual Social Value",
    context: "Public safety impact from cross-system fraud detection",
  },
  {
    value: "5% to 80%",
    label: "Comment Quality",
    context:
      "Transformed public engagement from noise to actionable input",
  },
  {
    value: "8,000+",
    label: "Staff Hours Saved",
    context:
      "Annual operational time recovered through system integration",
  },
  {
    value: "700-1,000",
    label: "Crashes Prevented",
    context: "Annual road safety impact from data-driven enforcement",
  },
  {
    value: "98%",
    label: "Task Success Rate",
    context:
      "Achieved across diverse users including older adults in rural areas",
  },
  {
    value: "100%",
    label: "Centralized in 5 Months",
    context:
      "Full migration of document submissions to unified platform",
  },
] as const;

// ---------------------------------------------------------------------------
// What I Do Categories (4)
// ---------------------------------------------------------------------------

export const whatIDoCategories: WhatIDoCategory[] = [
  {
    title: "UX & Product Design",
    description:
      "End-to-end product ownership from discovery through production, for complex multi-stakeholder systems",
  },
  {
    title: "Design Systems",
    description:
      "Modular architectures that scale across teams without redesign",
  },
  {
    title: "AI Workflows",
    description:
      "AI-enhanced research and analysis integrated into design practice",
  },
  {
    title: "Research & Strategy",
    description:
      "Systematic stakeholder research programs driving long-term product direction",
  },
] as const;

// ---------------------------------------------------------------------------
// Beyond the Portfolio (personal section — user-provided content)
// ---------------------------------------------------------------------------

export const beyondContent = {
  title: "Beyond the Portfolio",
  /** TODO: Marie to provide personal content for this section.
   *  This should reflect who she is beyond the work — interests,
   *  motivations, personality. Too personal to infer from toolkit data. */
  body: "[TODO] This section is coming soon \u2014 Marie will provide personal content that reflects who she is beyond the portfolio.",
} as const;

// ---------------------------------------------------------------------------
// What I Stand For (design values — drafted from toolkit themes)
// ---------------------------------------------------------------------------

export const standForContent = {
  title: "What I Stand For",
  values: [
    {
      heading: "Design for the most constrained users first",
      description:
        "When a system works for the hardest edge case, it works for everyone. Starting with constraints produces more resilient, inclusive designs than retrofitting accessibility later.",
    },
    {
      heading: "Architecture decisions matter more than UI polish",
      description:
        "A well-structured information architecture outlasts any visual trend. The systems I build are designed to scale without redesign, not just look good on launch day.",
    },
    {
      heading: "Systems thinking over screen-level thinking",
      description:
        "Individual screens are symptoms of a larger system. Understanding the full service ecosystem \u2014 users, data flows, organizational constraints \u2014 produces designs that actually hold up in production.",
    },
    {
      heading: "Operational independence: design things that work without the designer",
      description:
        "The best measure of design quality is what happens after handoff. I build systems and documentation that empower teams to extend and maintain the work long after I\u2019ve moved on.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// The Right Fit (explicit positioning for hiring managers)
// ---------------------------------------------------------------------------

export const rightFitContent = {
  title: "The Right Fit",
  summary:
    "I do my best work on complex problems at scale \u2014 the kind that require deep systems thinking, cross-team coordination, and a willingness to sit with ambiguity before jumping to solutions.",
  roles: ["Staff Product Designer", "Design Lead"] as const,
  teams: [
    "Platform teams",
    "B2B SaaS",
    "Government digital services",
  ] as const,
  problems: [
    "Complex multi-stakeholder systems",
    "Cross-team coordination",
    "0-to-1 product definition",
  ] as const,
  scale:
    "Enterprise systems serving thousands to millions of users",
} as const;

// ---------------------------------------------------------------------------
// Contact Info
// ---------------------------------------------------------------------------

export const contactInfo: ContactInfo = {
  /** TODO: Verify email address with Marie */
  email: "hello@marieanik.com",
  /** TODO: Verify LinkedIn URL with Marie */
  linkedinUrl: "https://linkedin.com/in/marieanik",
  linkedinLabel: "Connect on LinkedIn",
} as const;
