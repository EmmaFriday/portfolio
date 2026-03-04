import type { CaseStudy } from "@/data/content";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <div
      className="card-glow corner-brackets"
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md), var(--glow-subtle)",
        padding: "var(--space-8)",
      }}
    >
      <h3
        style={{
          fontSize: "var(--text-h3)",
          lineHeight: "var(--text-h3-lh)",
          letterSpacing: "var(--tracking-tight)",
          fontWeight: "var(--font-semibold)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-heading)",
        }}
      >
        {study.title}
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--space-3)",
          marginTop: "var(--space-4)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--text-h2-lh)",
            color: "var(--accent-primary)",
            fontWeight: "var(--font-semibold)",
          }}
        >
          {study.metric}
        </span>
        <span
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--text-sm-lh)",
            color: "var(--text-secondary)",
          }}
        >
          {study.metricLabel}
        </span>
      </div>
      <p
        style={{
          marginTop: "var(--space-2)",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--text-sm-lh)",
          color: "var(--text-secondary)",
        }}
      >
        {study.role}
      </p>
      <p
        style={{
          marginTop: "var(--space-4)",
          fontSize: "var(--text-body)",
          lineHeight: "var(--text-body-lh)",
          color: "var(--text-secondary)",
        }}
      >
        {study.hook}
      </p>
    </div>
  );
}
