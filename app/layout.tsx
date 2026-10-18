import type { Metadata } from "next"
import Link from "next/link"
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "../lib/constants"
import "./reset.css"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | 音節で覚える英単語学習`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 音節で覚える英単語学習`,
    description: SITE_DESCRIPTION,
    locale: "ja_JP",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 音節で覚える英単語学習`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
}

const navLinks = [
  { href: "/quiz/syllable-count/", label: "区切りクイズ" },
  { href: "/quiz/stress/", label: "アクセントクイズ" },
  { href: "/words/", label: "単語一覧" },
  { href: "/article/", label: "解説" },
  { href: "/history/", label: "学習履歴" },
]

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #e0e0e0",
            padding: ".5rem 1rem",
            minHeight: "54px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: "1rem",
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
            syllabler シルブラ！
          </Link>
          <nav
            aria-label="メインメニュー"
            style={{
              display: "flex",
              gap: ".25rem 1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#4b5563",
                  fontSize: ".875rem",
                  textDecoration: "none",
                  padding: ".5rem 0",
                  display: "inline-block",
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
            padding: "1.5rem 1rem",
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
          <p style={{ color: "#6b7280" }}>© syllabler シルブラ！</p>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
