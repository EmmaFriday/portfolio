import { whatIDoCategories } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function WhatIDo() {
  return (
    <section
      className="cosmic-bg"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--bg-secondary)",
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
          SPECIALIZATION_MATRIX
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
          What I Do
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "var(--space-8)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {whatIDoCategories.map((category) => (
            <SpotlightCard
              key={category.title}
              style={{
                padding: "var(--space-8)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--text-h3)",
                  lineHeight: "var(--text-h3-lh)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {category.title}
              </h3>
              <p
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  color: "var(--text-secondary)",
                }}
              >
                {category.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
