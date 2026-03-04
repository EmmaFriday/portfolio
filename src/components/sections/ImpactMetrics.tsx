import { impactMetrics } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function ImpactMetrics() {
  return (
    <section
      id="impact"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <PageContainer>
        <span
          className="hidden dark:block"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent-primary)",
            marginBottom: "var(--space-2)",
            opacity: 0.7,
          }}
        >
          MISSION_METRICS
        </span>
        <h2
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--text-h2-lh)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-12)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Impact
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "var(--space-8)",
          }}
        >
          {impactMetrics.map((metric) => (
            <div key={metric.label}>
              <span
                style={{
                  display: "block",
                  fontSize: "var(--text-display)",
                  lineHeight: "var(--text-display-lh)",
                  color: "var(--accent-primary)",
                  fontWeight: "var(--font-semibold)",
                }}
              >
                {metric.value}
              </span>
              <p
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--text-lg-lh)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--text-primary)",
                }}
              >
                {metric.label}
              </p>
              <p
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  color: "var(--text-secondary)",
                }}
              >
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
