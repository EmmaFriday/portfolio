import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ paddingTop: "var(--header-height)" }}>
        {/* Hero Section */}
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
              Marie Anik Paradis
            </h1>
            <p
              style={{
                marginTop: "var(--space-6)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--text-lg-lh)",
                color: "var(--text-secondary)",
                maxWidth: "36rem",
              }}
            >
              Senior UX &amp; Product Designer crafting thoughtful digital
              experiences that bridge user needs with business goals.
            </p>
          </PageContainer>
        </section>

        {/* Alternating Section */}
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
              }}
            >
              Selected Work
            </h2>
            <p
              style={{
                marginTop: "var(--space-4)",
                fontSize: "var(--text-body)",
                lineHeight: "var(--text-body-lh)",
                color: "var(--text-secondary)",
                maxWidth: "40rem",
              }}
            >
              A collection of case studies exploring product strategy, user
              research, and interface design across complex domains.
            </p>
          </PageContainer>
        </section>

        {/* Card Grid Section */}
        <section
          style={{
            paddingTop: "var(--space-section)",
            paddingBottom: "var(--space-section)",
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
              Case Studies
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "var(--space-8)",
              }}
            >
              {/* Card 1 */}
              <div
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
                  }}
                >
                  Enterprise Dashboard
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--text-body-lh)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Redesigning a data-heavy analytics platform for clarity and
                  speed, reducing cognitive load while increasing actionable
                  insights.
                </p>
              </div>

              {/* Card 2 */}
              <div
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
                  }}
                >
                  Mobile Onboarding
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--text-body-lh)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Transforming a complex registration flow into a guided,
                  progressive experience that boosted completion rates by 40%.
                </p>
              </div>

              {/* Card 3 */}
              <div
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
                  }}
                >
                  Design System
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-3)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--text-body-lh)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Building a unified component library serving five product
                  teams, establishing shared patterns and reducing design
                  inconsistencies by 70%.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Accent Section */}
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
              }}
            >
              Let&apos;s Work Together
            </h2>
            <p
              style={{
                marginTop: "var(--space-4)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--text-lg-lh)",
                color: "var(--text-secondary)",
                maxWidth: "36rem",
              }}
            >
              Currently open to senior product design roles where I can drive
              strategic impact through research-informed design.
            </p>
            <div style={{ marginTop: "var(--space-8)" }}>
              <a
                href="#"
                style={{
                  display: "inline-block",
                  padding: "var(--space-3) var(--space-8)",
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--text-on-accent)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "var(--font-semibold)",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--text-body-lh)",
                  textDecoration: "none",
                  boxShadow: "var(--glow-accent)",
                }}
              >
                Get in Touch
              </a>
            </div>
          </PageContainer>
        </section>
      </main>
    </>
  );
}
