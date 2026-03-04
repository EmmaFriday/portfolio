import { caseStudies } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";

export function CaseStudies() {
  return (
    <section
      id="work"
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
          CASE_FILES
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
          Selected Work
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
          }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
