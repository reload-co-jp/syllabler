import Link from "next/link"
import "./reset.css"

export const metadata = {
  title: "音節英単語 | 音節で覚える英単語学習",
  description:
    "英単語を音節（Syllable）単位で学習するクイズ・解説サイト。発音・アクセント・記憶力アップ。",
}

const navLinks = [
  { href: "/quiz/syllable-count", label: "音節数クイズ" },
  { href: "/quiz/stress", label: "アクセントクイズ" },
  { href: "/article", label: "解説" },
]

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #e0e0e0",
            padding: "0 1.5rem",
            height: "54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Link
            href="/"
            style={{
              color: "#3ea8ff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            音節英単語
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#666",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main
          style={{
            background: "#f5f5f5",
            minHeight: "calc(100dvh - 54px - 48px)",
            padding: "1.5rem",
          }}
        >
          {children}
        </main>
        <footer
          style={{
            backgroundColor: "#fff",
            borderTop: "1px solid #e0e0e0",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: ".75rem",
            color: "#999",
          }}
        >
          <p>© 音節英単語</p>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
