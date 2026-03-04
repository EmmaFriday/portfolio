import { rightFitContent } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function TheRightFit() {
  return (
    <section
      id="fit"
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
          TARGET_PARAMETERS
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
          {rightFitContent.title}
        </h2>
        <p
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--text-lg-lh)",
            color: "var(--text-secondary)",
            maxWidth: "40rem",
            marginBottom: "var(--space-12)",
          }}
        >
          {rightFitContent.summary}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--text-sm-lh)",
                fontWeight: "var(--font-semibold)",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-2)",
              }}
            >
              Roles
            </span>
            <p
              style={{
                fontSize: "var(--text-body)",
                lineHeight: "var(--text-body-lh)",
                color: "var(--text-primary)",
              }}
            >
              {rightFitContent.roles.join(", ")}
            </p>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--text-sm-lh)",
                fontWeight: "var(--font-semibold)",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-2)",
              }}
            >
              Teams
            </span>
            <p
              style={{
                fontSize: "var(--text-body)",
                lineHeight: "var(--text-body-lh)",
                color: "var(--text-primary)",
              }}
            >
              {rightFitContent.teams.join(", ")}
            </p>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--text-sm-lh)",
                fontWeight: "var(--font-semibold)",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "var(--space-2)",
              }}
            >
              Problems
            </span>
            <p
              style={{
                fontSize: "var(--text-body)",
                lineHeight: "var(--text-body-lh)",
                color: "var(--text-primary)",
              }}
            >
              {rightFitContent.problems.join(", ")}
            </p>
          </div>
          <p
            style={{
              fontSize: "var(--text-body)",
              lineHeight: "var(--text-body-lh)",
              color: "var(--text-secondary)",
            }}
          >
            {rightFitContent.scale}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
