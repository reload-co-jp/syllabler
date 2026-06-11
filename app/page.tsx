import type { Metadata } from "next"
import Link from "next/link"
import { FC } from "react"
import { articles } from "../data/articles"
import { words, wordsByLevel } from "../data/words"
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "../lib/constants"
import { WordLevel } from "../types"

export const metadata: Metadata = {
  title: `${SITE_NAME} | 音節で覚える英単語学習`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: `${SITE_NAME} | 音節で覚える英単語学習`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    type: "website",
  },
}

const levelLabel: Record<WordLevel, string> = {
  junior: "中学",
  high: "高校",
  toeic: "TOEIC",
  eiken: "英検",
}


const Page: FC = () => {
  const featuredWords = words.slice(0, 6)

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            url: BASE_URL,
          }),
        }}
      />
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "3rem 1rem 2.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1a1a2e",
            marginBottom: ".75rem",
            lineHeight: "1.3",
          }}
        >
          音節で覚える英単語
        </h1>
        <p style={{ color: "#555", fontSize: "1rem", marginBottom: ".5rem" }}>
          im・<span style={{ color: "#3ea8ff", fontWeight: "bold" }}>POR</span>・tant のように、音のまとまりで単語を学ぼう。
        </p>
        <p style={{ color: "#999", fontSize: ".875rem" }}>
          発音しやすく、アクセントが身につき、長い単語も記憶しやすくなる。
        </p>
      </section>

      {/* Quiz Cards */}
      <section style={{ marginBottom: "2.5rem" }}>
        <SectionTitle>クイズで練習</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          <QuizCard
            href="/quiz/syllable-count"
            title="音節区切りクイズ"
            description="単語の音節の区切り位置はどこ？タップして答えよう。"
          />
          <QuizCard
            href="/quiz/stress"
            title="アクセントクイズ"
            description="どの音節が強い？正しい音節を選ぼう。"
          />
        </div>
      </section>

      {/* Level Select */}
      <section style={{ marginBottom: "2.5rem" }}>
        <SectionTitle>レベル別学習</SectionTitle>
        <div style={{ display: "flex", gap: ".625rem", flexWrap: "wrap" }}>
          {(Object.keys(wordsByLevel) as WordLevel[]).map((level) => (
            <Link
              key={level}
              href={`/word/${wordsByLevel[level][0].word}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".4rem",
                padding: ".375rem .875rem",
                borderRadius: "9999px",
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                color: "#333",
                fontSize: ".8125rem",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              {levelLabel[level]}
              <span style={{ color: "#bbb", fontWeight: "normal" }}>
                {wordsByLevel[level].length}語
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Words */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionTitle>単語を見てみよう</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: ".75rem",
          }}
        >
          {featuredWords.map((word) => (
            <Link
              key={word.id}
              href={`/word/${word.word}`}
              style={{
                display: "block",
                padding: "1rem",
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,.06)",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#1a1a2e",
                  marginBottom: ".2rem",
                }}
              >
                {word.word}
              </div>
              <div style={{ color: "#999", fontSize: ".75rem", marginBottom: ".5rem", fontFamily: "monospace" }}>
                {word.phonetic}
              </div>
              <div style={{ fontSize: ".8rem", marginBottom: ".4rem" }}>
                {word.syllables.map((s, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ color: "#ccc" }}>・</span>}
                    <span
                      style={{
                        color: i === word.stressIndex ? "#3ea8ff" : "#999",
                        fontWeight: i === word.stressIndex ? "bold" : "normal",
                        textTransform: i === word.stressIndex ? "uppercase" : "none",
                      }}
                    >
                      {s}
                    </span>
                  </span>
                ))}
              </div>
              <div style={{ color: "#666", fontSize: ".8rem" }}>{word.meaningJa}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: ".875rem",
          }}
        >
          <SectionTitle>解説記事</SectionTitle>
          <Link
            href="/article"
            style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}
          >
            すべて見る →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: ".875rem 1rem",
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,.04)",
              }}
            >
              <div>
                <div style={{ fontSize: ".875rem", fontWeight: "600", color: "#1a1a2e" }}>
                  {article.title}
                </div>
                <div style={{ fontSize: ".75rem", color: "#999", marginTop: ".15rem" }}>
                  {article.description}
                </div>
              </div>
              <span style={{ color: "#3ea8ff", fontSize: ".8125rem", marginLeft: "1rem", flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

const SectionTitle: FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2
    style={{
      color: "#1a1a2e",
      fontSize: ".8125rem",
      fontWeight: "700",
      marginBottom: ".875rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    {children}
  </h2>
)

const QuizCard: FC<{
  href: string
  title: string
  description: string
}> = ({ href, title, description }) => (
  <Link
    href={href}
    style={{
      display: "block",
      padding: "1.25rem",
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      textDecoration: "none",
      boxShadow: "0 1px 3px rgba(0,0,0,.06)",
    }}
  >
    <div
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#1a1a2e",
        marginBottom: ".25rem",
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: ".875rem", color: "#666" }}>{description}</div>
    <div
      style={{
        marginTop: ".875rem",
        color: "#3ea8ff",
        fontSize: ".8125rem",
        fontWeight: "600",
      }}
    >
      チャレンジ →
    </div>
  </Link>
)

export default Page
