"use client";

import { useState, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { contactInfo } from "@/data/content";
import { PageContainer } from "@/components/layout/PageContainer";

function SpotlightPill({
  href,
  children,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "9999px",
        fontWeight: "var(--font-semibold)",
        fontSize: "var(--text-sm)",
        lineHeight: "1.5",
        textDecoration: "none",
        position: "relative",
        color: isDark ? "var(--accent-primary)" : "var(--text-primary)",
        backgroundColor: !isDark && hovered ? "var(--bg-secondary)" : "transparent",
        border: isDark
          ? "1px solid transparent"
          : `1px solid ${hovered ? "var(--text-primary)" : "var(--border-default)"}`,
        backgroundImage: isDark
          ? `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), var(--accent-primary), transparent 50%)`
          : "none",
        backgroundOrigin: "border-box",
        backgroundClip: isDark ? "border-box" : "padding-box",
        // Use mask to only show gradient on the border area in dark mode
        ...(isDark
          ? {
              WebkitMask: hovered
                ? undefined
                : undefined,
            }
          : {}),
        transition: "background-color 200ms ease, border-color 200ms ease, color 200ms ease",
      }}
    >
      {/* Inner mask: covers content area so gradient only shows as border */}
      {isDark && (
        <span
          style={{
            position: "absolute",
            inset: "1px",
            borderRadius: "9999px",
            backgroundColor: "var(--bg-secondary)",
            zIndex: 0,
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </a>
  );
}

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
          <SpotlightPill href={`mailto:${contactInfo.email}`}>
            Send an Email
          </SpotlightPill>
          <SpotlightPill
            href={contactInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactInfo.linkedinLabel}
          </SpotlightPill>
        </div>
      </PageContainer>
    </section>
  );
}
