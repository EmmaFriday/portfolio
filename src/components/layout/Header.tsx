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
        {/* Logo / name placeholder -- Phase 2 */}
        <div />
        {/* Nav + theme toggle placeholder -- Phase 2/3 */}
        <div />
      </div>
    </header>
  );
}
