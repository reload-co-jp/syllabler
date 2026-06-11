import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FC } from "react"
import { words } from "../../../data/words"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"
import { WordLevel } from "../../../types"

export function generateStaticParams() {
  return words.map((w) => ({ word: w.word }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>
}): Promise<Metadata> {
  const { word: w } = await params
  const word = words.find((wd) => wd.word === w)
  if (!word) return {}
  const title = `${word.word} の音節・発音・アクセント`
  const description = `${word.word}（${word.meaningJa}）の音節は「${word.syllables.join("・")}」で${word.syllableCount}音節。アクセントは${word.syllables[word.stressIndex].toUpperCase()}。発音記号${word.phonetic}。`
  const url = `${BASE_URL}/word/${word.word}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: "article",
    },
    twitter: { card: "summary", title: `${title} | ${SITE_NAME}`, description },
  }
}

const levelLabel: Record<WordLevel, string> = {
  junior: "中学",
  high: "高校",
  toeic: "TOEIC",
  eiken: "英検",
}


const Page = async ({ params }: { params: Promise<{ word: string }> }) => {
  const { word: wordParam } = await params
  const word = words.find((w) => w.word === wordParam)
  if (!word) notFound()

  const relatedWords = words
    .filter((w) => w.level === word.level && w.id !== word.id)
    .slice(0, 4)


  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "DefinedTerm",
              name: word.word,
              description: `${word.word}（${word.meaningJa}）。音節: ${word.syllables.join("・")}（${word.syllableCount}音節）。発音記号: ${word.phonetic}。`,
              url: `${BASE_URL}/word/${word.word}`,
              inDefinedTermSet: {
                "@type": "DefinedTermSet",
                name: `${SITE_NAME} 英単語音節辞典`,
                url: BASE_URL,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: word.word, item: `${BASE_URL}/word/${word.word}` },
              ],
            },
          ]),
        }}
      />
      {/* Breadcrumb */}
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>{word.word}</span>
      </div>

      {/* Main Card */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "1rem",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: ".375rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#1a1a2e",
              letterSpacing: "0.01em",
            }}
          >
            {word.word}
          </h1>
          <span
            style={{
              padding: ".25rem .75rem",
              borderRadius: "9999px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #e0e0e0",
              color: "#666",
              fontSize: ".75rem",
              fontWeight: "600",
              marginTop: ".5rem",
              whiteSpace: "nowrap",
            }}
          >
            {levelLabel[word.level]}
          </span>
        </div>

        {/* Phonetic */}
        <div
          style={{
            fontFamily: "monospace",
            color: "#999",
            fontSize: ".9375rem",
            marginBottom: "1.75rem",
          }}
        >
          {word.phonetic}
        </div>

        {/* Syllable Display Box */}
        <div
          style={{
            backgroundColor: "#f8fbff",
            border: "1px solid #d0e8ff",
            borderRadius: "10px",
            padding: "1.75rem 1.5rem",
            marginBottom: "1.75rem",
            textAlign: "center",
          }}
        >
          {/* Syllables */}
          <div
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              letterSpacing: "0.04em",
              marginBottom: "1.25rem",
            }}
          >
            {word.syllables.map((s, i) => (
              <span key={i}>
                {i > 0 && (
                  <span style={{ color: "#ccd8e8", margin: "0 .1em" }}>・</span>
                )}
                <span
                  style={{
                    color: i === word.stressIndex ? "#3ea8ff" : "#b0b8c8",
                    textTransform: i === word.stressIndex ? "uppercase" : "none",
                  }}
                >
                  {s}
                </span>
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2.5rem" }}
          >
            <Stat label="音節数" value={`${word.syllableCount}音節`} />
            <div style={{ width: "1px", backgroundColor: "#e0e8f0" }} />
            <Stat
              label="アクセント"
              value={word.syllables[word.stressIndex].toUpperCase()}
              highlight
            />
          </div>
        </div>

        {/* Meaning */}
        <div style={{ marginBottom: "1.25rem" }}>
          <FieldLabel>意味</FieldLabel>
          <div style={{ color: "#1a1a2e", fontSize: "1.25rem", fontWeight: "500" }}>
            {word.meaningJa}
          </div>
        </div>

        {/* Example */}
        <div style={{ marginBottom: "1.25rem" }}>
          <FieldLabel>例文</FieldLabel>
          <div
            style={{
              color: "#444",
              fontSize: ".9375rem",
              fontStyle: "italic",
              padding: ".875rem 1rem",
              backgroundColor: "#fafafa",
              borderRadius: "6px",
              borderLeft: "3px solid #3ea8ff",
            }}
          >
            {word.example}
          </div>
        </div>

        {/* Explanation */}
        <div>
          <FieldLabel>解説</FieldLabel>
          <div style={{ color: "#555", fontSize: ".9rem", lineHeight: "1.75" }}>
            {word.explanation}
          </div>
        </div>
      </div>

      {/* Quiz CTAs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: ".75rem",
          marginBottom: "1rem",
        }}
      >
        <Link
          href="/quiz/syllable-count"
          style={{
            display: "block",
            textAlign: "center",
            padding: ".75rem",
            backgroundColor: "#3ea8ff",
            borderRadius: "8px",
            color: "#fff",
            fontSize: ".875rem",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          音節数クイズ
        </Link>
        <Link
          href="/quiz/stress"
          style={{
            display: "block",
            textAlign: "center",
            padding: ".75rem",
            backgroundColor: "#fff",
            border: "1px solid #3ea8ff",
            borderRadius: "8px",
            color: "#3ea8ff",
            fontSize: ".875rem",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          アクセントクイズ
        </Link>
      </div>

      {/* Related Words */}
      {relatedWords.length > 0 && (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            padding: "1.25rem",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)",
          }}
        >
          <h2
            style={{
              color: "#999",
              fontSize: ".75rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: ".875rem",
            }}
          >
            同レベルの単語
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: ".5rem",
            }}
          >
            {relatedWords.map((w) => (
              <Link
                key={w.id}
                href={`/word/${w.word}`}
                style={{
                  display: "block",
                  padding: ".625rem .75rem",
                  backgroundColor: "#fafafa",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                <div style={{ color: "#1a1a2e", fontSize: ".875rem", fontWeight: "600" }}>
                  {w.word}
                </div>
                <div style={{ color: "#999", fontSize: ".75rem" }}>{w.meaningJa}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const FieldLabel: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      color: "#aaa",
      fontSize: ".6875rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: ".35rem",
    }}
  >
    {children}
  </div>
)

const Stat: FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ color: "#aab8c8", fontSize: ".7rem", marginBottom: ".2rem" }}>
      {label}
    </div>
    <div
      style={{
        color: highlight ? "#3ea8ff" : "#1a1a2e",
        fontSize: "1.1rem",
        fontWeight: "bold",
      }}
    >
      {value}
    </div>
  </div>
)

export default Page
