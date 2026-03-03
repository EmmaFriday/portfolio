import { beyondContent } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function BeyondPortfolio() {
  return (
    <section
      id="about"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <PageContainer>
        <h2
          style={{
            fontSize: "var(--text-h3)",
            lineHeight: "var(--text-h3-lh)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-6)",
          }}
        >
          {beyondContent.title}
        </h2>
        <p
          style={{
            fontSize: "var(--text-body)",
            lineHeight: "var(--text-body-lh)",
            color: "var(--text-secondary)",
            maxWidth: "40rem",
          }}
        >
          {beyondContent.body}
        </p>
      </PageContainer>
    </section>
  );
}
