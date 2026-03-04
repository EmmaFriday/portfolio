import { contactInfo } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

export function Contact() {
  return (
    <section
      id="contact"
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
          COMM_CHANNEL
        </span>
        <h2
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--text-h2-lh)",
            letterSpacing: "var(--tracking-tight)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Get in Touch
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
        <div
          style={{
            marginTop: "var(--space-8)",
            display: "flex",
            gap: "var(--space-4)",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`mailto:${contactInfo.email}`}
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
            Send an Email
          </a>
          <a
            href={contactInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "var(--space-3) var(--space-8)",
              backgroundColor: "transparent",
              color: "var(--accent-primary)",
              border: "2px solid var(--accent-primary)",
              borderRadius: "var(--radius-md)",
              fontWeight: "var(--font-semibold)",
              fontSize: "var(--text-body)",
              lineHeight: "var(--text-body-lh)",
              textDecoration: "none",
            }}
          >
            {contactInfo.linkedinLabel}
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
