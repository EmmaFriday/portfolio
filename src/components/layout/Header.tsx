import { navLinks } from "@/data/content";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--bg-header)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center justify-between"
        style={{
          maxWidth: "var(--max-width)",
          padding: "0 var(--space-container)",
        }}
      >
        <a
          href="#top"
          style={{
            fontSize: "var(--text-body)",
            fontWeight: "var(--font-semibold)",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Marie Anik Paradis
        </a>

        <nav
          className="hidden md:flex items-center"
          style={{ gap: "var(--space-6)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
