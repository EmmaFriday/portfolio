import { type ElementType, type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function PageContainer({
  children,
  className,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={className}
      style={{
        maxWidth: "var(--max-width)",
        margin: "0 auto",
        padding: "0 var(--space-container)",
        width: "100%",
      }}
    >
      {children}
    </Component>
  );
}
