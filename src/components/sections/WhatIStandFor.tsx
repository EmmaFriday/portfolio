import { standForContent } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function WhatIStandFor() {
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
            fontSize: "var(--text-h3)",
            lineHeight: "var(--text-h3-lh)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-12)",
          }}
        >
          {standForContent.title}
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
          }}
        >
          {standForContent.values.map((value) => (
            <div key={value.heading}>
              <h3
                style={{
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  fontWeight: "var(--font-semibold)",
                  color: "var(--text-primary)",
                }}
              >
                {value.heading}
              </h3>
              <p
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  color: "var(--text-secondary)",
                  maxWidth: "40rem",
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
