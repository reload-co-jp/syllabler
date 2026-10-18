import type { Metadata } from "next"
import Link from "next/link"
import { FC } from "react"
import {
  card,
  colors,
  primaryButton,
  secondaryButton,
  SectionTitle,
  SyllableWord,
} from "../components/elements/syllable"
import { articles } from "../data/articles"
import { words } from "../data/words"
import { BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "../lib/constants"
import {
  buildCategories,
  categoryPath,
  CategoryKind,
  wordPath,
} from "../lib/syllable"

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | 英単語の音節とアクセントを学ぶ` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: `${SITE_NAME} | 英単語の音節とアクセントを学ぶ`,
    description: SITE_DESCRIPTION,
    url: `${BASE_URL}/`,
    type: "website",
  },
}

const featured = [
  "important",
  "hotel",
  "strength",
  "photographer",
  "economic",
  "comfortable",
]

const Page: FC = () => {
  const categories = buildCategories(words)
  const byKind = (kind: CategoryKind) =>
    categories.filter((c) => c.kind === kind)
  const featuredWords = featured
    .map((f) => words.find((w) => w.word === f))
    .filter(Boolean)

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            url: `${BASE_URL}/`,
          }),
        }}
      />
      <section style={{ textAlign: "center", padding: "2rem 0 2rem" }}>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 6vw, 2.25rem)",
            fontWeight: "bold",
            color: colors.text,
            marginBottom: "1rem",
            lineHeight: 1.35,
          }}
        >
          英単語の<span style={{ color: colors.stress }}>音節</span>と
          <span style={{ color: colors.stress }}>アクセント</span>を学ぶ
        </h1>
        <p
          style={{
            fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
            marginBottom: ".75rem",
          }}
        >
          <SyllableWord
            syllables={["im", "por", "tant"]}
            stressIndex={1}
            fontSize="inherit"
          />
        </p>
        <p style={{ color: "#444", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          単語を音のまとまり（音節）に区切り、強く読む位置を覚える。
          <br />
          発音しやすくなり、長い単語も記憶しやすくなる。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: ".75rem",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/quiz/syllable-count/"
            style={{
              ...primaryButton,
              flexDirection: "column",
              minHeight: "64px",
            }}
          >
            音節区切りクイズを始める
            <span style={{ fontSize: ".75rem", fontWeight: 500 }}>
              区切る位置をタップ
            </span>
          </Link>
          <Link
            href="/quiz/stress/"
            style={{
              ...secondaryButton,
              flexDirection: "column",
              minHeight: "64px",
            }}
          >
            アクセントクイズを始める
            <span style={{ fontSize: ".75rem", fontWeight: 500 }}>
              強く読む音節を選ぶ
            </span>
          </Link>
        </div>
        <ul
          aria-label="収録データ"
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginTop: "1.5rem",
            color: colors.sub,
            fontSize: ".875rem",
          }}
        >
          <li>
            収録単語{" "}
            <strong style={{ color: colors.text }}>{words.length}語</strong>
          </li>
          <li>
            単語一覧{" "}
            <strong style={{ color: colors.text }}>
              {categories.length}分類
            </strong>
          </li>
          <li>
            解説記事{" "}
            <strong style={{ color: colors.text }}>{articles.length}本</strong>
          </li>
        </ul>
      </section>

      <section style={{ ...card, marginBottom: "1.5rem" }}>
        <SectionTitle>単語を探す</SectionTitle>
        <Link
          href="/words/"
          style={{ ...secondaryButton, width: "100%", marginBottom: "1.25rem" }}
        >
          🔍 単語一覧・検索
        </Link>
        <CategoryLinks title="レベル・試験別" items={byKind("level")} />
        <CategoryLinks title="音節数別" items={byKind("syllables")} />
        <CategoryLinks
          title="アクセントパターン別"
          items={byKind("stress").slice(0, 6)}
          more
        />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <SectionTitle>音節・アクセントに注意したい単語</SectionTitle>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: ".75rem",
          }}
        >
          {featuredWords.map((word) => (
            <li key={word.id}>
              <Link
                href={wordPath(word)}
                style={{
                  display: "block",
                  height: "100%",
                  padding: "1rem",
                  backgroundColor: "#fff",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {word.word}
                </div>
                <div
                  style={{
                    color: colors.sub,
                    fontSize: ".75rem",
                    margin: ".2rem 0 .5rem",
                    fontFamily: "monospace",
                  }}
                >
                  {word.phonetic}
                </div>
                <SyllableWord
                  syllables={word.syllables}
                  stressIndex={word.stressIndex}
                  fontSize=".9375rem"
                />
                <div
                  style={{
                    color: "#444",
                    fontSize: ".8125rem",
                    marginTop: ".4rem",
                  }}
                >
                  {word.meaningJa}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <SectionTitle>解説記事</SectionTitle>
          <Link
            href="/article/"
            style={{
              color: colors.stress,
              fontSize: ".875rem",
              textDecoration: "none",
            }}
          >
            すべて見る →
          </Link>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          {articles.slice(0, 4).map((article) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}/`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: ".875rem 1rem",
                  backgroundColor: "#fff",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: ".9375rem",
                      fontWeight: 600,
                      color: colors.text,
                    }}
                  >
                    {article.title}
                  </div>
                  <div
                    style={{
                      fontSize: ".8125rem",
                      color: colors.sub,
                      marginTop: ".15rem",
                    }}
                  >
                    {article.description}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    color: colors.stress,
                    marginLeft: "1rem",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const CategoryLinks: FC<{
  title: string
  items: ReturnType<typeof buildCategories>
  more?: boolean
}> = ({ title, items, more }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h3
      style={{ fontSize: ".8125rem", color: colors.sub, marginBottom: ".5rem" }}
    >
      {title}
    </h3>
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: ".5rem",
      }}
    >
      {items.map((c) => (
        <li key={c.value}>
          <Link
            href={categoryPath(c)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".375rem",
              minHeight: "40px",
              padding: ".375rem .875rem",
              borderRadius: "9999px",
              backgroundColor: "#fff",
              border: `1px solid ${colors.border}`,
              color: colors.text,
              fontSize: ".875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {c.label}
            <span style={{ color: colors.sub, fontWeight: 400 }}>
              {c.words.length}語
            </span>
          </Link>
        </li>
      ))}
      {more && (
        <li>
          <Link
            href="/words/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "40px",
              color: colors.stress,
              fontSize: ".875rem",
            }}
          >
            すべての分類 →
          </Link>
        </li>
      )}
    </ul>
  </div>
)

export default Page
