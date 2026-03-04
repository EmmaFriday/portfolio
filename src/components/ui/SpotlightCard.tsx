"use client";

import { useRef, useCallback, useState, type ReactNode, type CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function SpotlightCard({ children, style }: SpotlightCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const {
    padding,
    borderRadius,
    backgroundColor,
    border: _border,
    ...outerStyles
  } = style ?? {};

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...outerStyles,
        position: "relative",
        borderRadius,
        padding: "1px",
        background: isHovered
          ? `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--accent-primary), transparent 50%)`
          : "var(--border-default)",
        transition: "transform 200ms ease",
        transform: isHovered ? "translateY(-2px)" : "none",
      }}
    >
      <div
        style={{
          padding,
          borderRadius: `calc(${borderRadius ?? "var(--radius-lg)"} - 1px)`,
          backgroundColor: backgroundColor ?? "var(--bg-surface)",
          position: "relative",
          zIndex: 1,
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
