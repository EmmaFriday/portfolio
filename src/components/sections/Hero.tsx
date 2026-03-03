import { heroContent } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function Hero() {
  return (
    <section
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <PageContainer>
        <h1
          style={{
            fontSize: "var(--text-display)",
            lineHeight: "var(--text-display-lh)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
          }}
        >
          {heroContent.name}
        </h1>
        <p
          style={{
            marginTop: "var(--space-4)",
            fontSize: "var(--text-h3)",
            lineHeight: "var(--text-h3-lh)",
            color: "var(--text-secondary)",
          }}
        >
          {heroContent.title}
        </p>
        <p
          style={{
            marginTop: "var(--space-6)",
            fontSize: "var(--text-lg)",
            lineHeight: "var(--text-lg-lh)",
            color: "var(--text-secondary)",
            maxWidth: "36rem",
          }}
        >
          {heroContent.subtitle}
        </p>
      </PageContainer>
    </section>
  );
}
