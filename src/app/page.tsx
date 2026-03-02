export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <main
        className="mx-auto px-6 py-24"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <h1
          className="font-semibold"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: "var(--text-display-lh)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          Marie Anik Paradis
        </h1>
        <p
          className="mt-6"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--text-lg-lh)",
            color: "var(--text-secondary)",
          }}
        >
          Senior UX &amp; Product Designer
        </p>
        <div
          className="mt-12 rounded-lg p-8"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--text-h3)",
              lineHeight: "var(--text-h3-lh)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Portfolio Coming Soon
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: "var(--text-body)",
              lineHeight: "var(--text-body-lh)",
              color: "var(--text-secondary)",
            }}
          >
            Design token system active. Toggle theme via DevTools:{" "}
            <code
              className="rounded px-2 py-1 text-sm"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--accent-primary)",
              }}
            >
              document.documentElement.setAttribute(&apos;data-theme&apos;,
              &apos;dark&apos;)
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
