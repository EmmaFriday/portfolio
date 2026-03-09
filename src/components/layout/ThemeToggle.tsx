"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        const newTheme = isDark ? "light" : "dark";
        setTheme(newTheme);
        const url = new URL(window.location.href);
        if (newTheme === "light") {
          url.searchParams.delete("mode");
        } else {
          url.searchParams.set("mode", newTheme);
        }
        history.replaceState(null, "", url.toString());
      }}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        top: "calc(var(--header-height) + var(--space-3))",
        left: "var(--space-container)",
        zIndex: 40,
        borderRadius: "9999px",
        padding: "var(--space-2) var(--space-4)",
        backgroundColor: "var(--bg-surface-elevated)",
        border: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: "var(--text-primary)",
        cursor: "pointer",
        transition:
          "background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease, color 300ms ease",
      }}
    >
      {isDark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 300ms ease",
            transform: "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <circle cx="8" cy="8" r="3.5" />
          <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 300ms ease",
            transform: "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <path d="M2 9l2.5-3L7 8.5l3-4.5 4 6H2z" />
          <path d="M1.5 13h13M5 13v-1.5M8 13v-3M11 13v-2" />
        </svg>
      )}
      <span className="hidden md:inline">
        {isDark ? "Exit the Matrix" : "View Sci-Fi Mode"}
      </span>
    </button>
  );
}
