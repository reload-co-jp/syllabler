import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FC } from "react"
import {
  Breadcrumb,
  card,
  colors,
  primaryButton,
  secondaryButton,
  SectionTitle,
  SyllableWord,
} from "../../../components/elements/syllable"
import { SpeakButton } from "../../../components/speak-button"
import { articles } from "../../../data/articles"
import { words } from "../../../data/words"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"
import {
  buildCategories,
  categoryPath,
  explain,
  levelLabel,
  posLabel,
  relatedWords,
  rhythm,
  stressPattern,
  syllableText,
  wordPath,
} from "../../../lib/syllable"
import { Word } from "../../../types"

export const dynamicParams = false

export function generateStaticParams() {
  return words.map((w) => ({ word: w.word }))
}

const findWord = async (params: Promise<{ word: string }>) => {
  const { word } = await params
  return words.find((w) => w.word === decodeURIComponent(word))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>
}): Promise<Metadata> {
  const word = await findWord(params)
  if (!word) return {}
  const title = `${word.word} の音節・発音・アクセント`
  const description =
    word.syllableCount === 1
      ? `${word.word}（${word.meaningJa}）は1音節の英単語。発音記号${word.phonetic}。例文・音声つきで発音を確認できる。`
      : `${word.word}（${word.meaningJa}）の音節は「${syllableText(word)}」の${word.syllableCount}音節。アクセントは${word.stressIndex + 1}番目の${word.syllables[word.stressIndex]}。発音記号${word.phonetic}。`
  const url = `${BASE_URL}${wordPath(word)}`
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

const relatedArticles = (word: Word) =>
  [
    "what-is-syllable",
    word.syllableCount > 1 && "what-is-accent",
    word.syllableCount > 1 && "stress-patterns",
    word.syllableCount >= 4 && "how-to-remember-long-words",
    word.note?.includes("カタカナ") && "english-japanese-rhythm",
    word.level === "toeic" && "toeic-syllables",
    "how-to-read-phonetics",
  ]
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, 4)

const Page = async ({ params }: { params: Promise<{ word: string }> }) => {
  const word = await findWord(params)
  if (!word) notFound()

  const related = relatedWords(word, words)
  const categories = buildCategories(words).filter(
    (c) =>
      (c.kind === "syllables" &&
        c.value === String(Math.min(word.syllableCount, 4))) ||
      (c.kind === "stress" && c.value === stressPattern(word)) ||
      (c.kind === "level" && c.value === word.level)
  )
  const url = `${BASE_URL}${wordPath(word)}`
  const quizQuery = `?syllables=${Math.min(word.syllableCount, 4)}`

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "DefinedTerm",
              name: word.word,
              description: explain(word),
              url,
              inDefinedTermSet: {
                "@type": "DefinedTermSet",
                name: `${SITE_NAME} 英単語音節辞典`,
                url: `${BASE_URL}/words/`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "ホーム",
                  item: `${BASE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "単語一覧",
                  item: `${BASE_URL}/words/`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: word.word,
                  item: url,
                },
              ],
            },
          ]),
        }}
      />
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/words/", label: "単語一覧" },
          { label: word.word },
        ]}
      />

      <article style={{ ...card, marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: ".75rem",
            flexWrap: "wrap",
            marginBottom: ".375rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.75rem, 7vw, 2.25rem)",
              fontWeight: "bold",
              color: colors.text,
              overflowWrap: "anywhere",
            }}
          >
            {word.word}
            <span
              style={{
                display: "block",
                fontSize: ".875rem",
                color: colors.sub,
                fontWeight: 500,
              }}
            >
              の音節・発音・アクセント
            </span>
          </h1>
          <span style={{ display: "flex", gap: ".375rem", marginTop: ".5rem" }}>
            <span style={badge}>{posLabel[word.partOfSpeech]}</span>
            <Link
              href={categoryPath({ kind: "level", value: word.level })}
              style={{ ...badge, color: colors.stress }}
            >
              {levelLabel[word.level]}
            </Link>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              color: colors.sub,
              fontSize: "1rem",
            }}
          >
            {word.phonetic}
          </span>
          <SpeakButton text={word.word} />
        </div>

        <section
          aria-label="音節とアクセント"
          style={{
            backgroundColor: "#f8fbff",
            border: "1px solid #d0e8ff",
            borderRadius: "10px",
            padding: "1.5rem 1rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "1.25rem", overflowX: "auto" }}>
            <SyllableWord
              syllables={word.syllables}
              stressIndex={word.stressIndex}
              fontSize="clamp(1.5rem, 7vw, 2.25rem)"
            />
          </div>
          <dl
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(1rem, 6vw, 2.5rem)",
              flexWrap: "wrap",
            }}
          >
            <Stat label="音節数" value={`${word.syllableCount}音節`} />
            {word.syllableCount > 1 && (
              <>
                <Stat
                  label="アクセント"
                  value={`${word.stressIndex + 1}番目 ${word.syllables[word.stressIndex].toUpperCase()}`}
                  highlight
                />
                <Stat
                  label="リズム"
                  value={rhythm(word.syllableCount, word.stressIndex)}
                />
              </>
            )}
          </dl>
        </section>

        <Field label="意味">
          <div
            style={{ color: colors.text, fontSize: "1.25rem", fontWeight: 500 }}
          >
            {word.meaningJa}
          </div>
        </Field>

        <Field label="例文">
          <div
            style={{
              color: "#333",
              fontSize: ".9375rem",
              fontStyle: "italic",
              padding: ".875rem 1rem",
              backgroundColor: "#fafafa",
              borderRadius: "6px",
              borderLeft: `3px solid ${colors.primary}`,
              marginBottom: ".5rem",
            }}
            lang="en"
          >
            {word.example}
          </div>
          <SpeakButton text={word.example} />
        </Field>

        <Field label="解説">
          <p style={{ color: "#444", fontSize: ".9375rem", lineHeight: 1.8 }}>
            {explain(word)}
          </p>
          {word.alternatives && (
            <p
              style={{
                color: colors.sub,
                fontSize: ".8125rem",
                lineHeight: 1.7,
                marginTop: ".5rem",
              }}
            >
              辞書の区切りは {word.syllables.join("・")}。発音上は{" "}
              {word.alternatives.map((a) => a.join("・")).join("、")}{" "}
              と区切ることもあり、クイズではどちらも正解になる。
            </p>
          )}
        </Field>
      </article>

      <section style={{ ...card, marginBottom: "1rem" }}>
        <SectionTitle>この単語を含むクイズで練習</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: ".625rem",
          }}
        >
          <Link
            href={`/quiz/syllable-count/${quizQuery}`}
            style={primaryButton}
          >
            {Math.min(word.syllableCount, 4)}音節
            {word.syllableCount >= 4 ? "以上" : ""}の区切りクイズ
          </Link>
          {word.syllableCount > 1 && (
            <Link
              href={`/quiz/stress/?pattern=${stressPattern(word)}`}
              style={secondaryButton}
            >
              {rhythm(word.syllableCount, word.stressIndex)}型のアクセントクイズ
            </Link>
          )}
        </div>
        {categories.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              flexWrap: "wrap",
            }}
          >
            {categories.map((c) => (
              <li key={`${c.kind}-${c.value}`}>
                <Link
                  href={categoryPath(c)}
                  style={{
                    ...badge,
                    display: "inline-block",
                    padding: ".5rem .875rem",
                    color: colors.stress,
                  }}
                >
                  {c.title}（{c.words.length}語）
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {related.length > 0 && (
        <section style={{ ...card, marginBottom: "1rem" }}>
          <SectionTitle>同じ音節数・アクセントパターンの単語</SectionTitle>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: ".5rem",
            }}
          >
            {related.map((w) => (
              <li key={w.id}>
                <Link
                  href={wordPath(w)}
                  style={{
                    display: "block",
                    padding: ".625rem .75rem",
                    backgroundColor: "#fafafa",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  <SyllableWord
                    syllables={w.syllables}
                    stressIndex={w.stressIndex}
                    fontSize=".9375rem"
                  />
                  <div
                    style={{
                      color: colors.sub,
                      fontSize: ".75rem",
                      marginTop: ".2rem",
                    }}
                  >
                    {w.meaningJa}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section style={card}>
        <SectionTitle>関連する解説記事</SectionTitle>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {relatedArticles(word).map((a) => (
            <li
              key={a.slug}
              style={{ borderTop: `1px solid ${colors.border}` }}
            >
              <Link
                href={`/article/${a.slug}/`}
                style={{
                  display: "block",
                  padding: ".75rem .25rem",
                  color: colors.stress,
                  textDecoration: "none",
                  fontSize: ".9375rem",
                }}
              >
                {a.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const badge = {
  padding: ".25rem .75rem",
  borderRadius: "9999px",
  backgroundColor: "#f5f5f5",
  border: `1px solid ${colors.border}`,
  color: colors.sub,
  fontSize: ".75rem",
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
  textDecoration: "none",
}

const Field: FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <section style={{ marginBottom: "1.25rem" }}>
    <h2
      style={{
        color: colors.sub,
        fontSize: ".75rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        marginBottom: ".35rem",
      }}
    >
      {label}
    </h2>
    {children}
  </section>
)

const Stat: FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div style={{ textAlign: "center" }}>
    <dt
      style={{ color: colors.sub, fontSize: ".75rem", marginBottom: ".2rem" }}
    >
      {label}
    </dt>
    <dd
      style={{
        color: highlight ? colors.stress : colors.text,
        fontSize: "1.1rem",
        fontWeight: "bold",
        margin: 0,
      }}
    >
      {value}
    </dd>
  </div>
)

export default Page
