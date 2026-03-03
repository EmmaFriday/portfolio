import { whatIDoCategories } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function WhatIDo() {
  return (
    <section
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <PageContainer>
        <h2
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--text-h2-lh)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-12)",
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
          }}
        >
          {whatIDoCategories.map((category) => (
            <div key={category.title}>
              <h3
                style={{
                  fontSize: "var(--text-h3)",
                  lineHeight: "var(--text-h3-lh)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--text-primary)",
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
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
