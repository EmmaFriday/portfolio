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
          PERSONAL_LOG
        </span>
        <h2
          style={{
            fontSize: "var(--text-h3)",
            lineHeight: "var(--text-h3-lh)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            marginBottom: "var(--space-6)",
            fontFamily: "var(--font-heading)",
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
