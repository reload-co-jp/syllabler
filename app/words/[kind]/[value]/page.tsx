import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  card,
  colors,
  primaryButton,
  secondaryButton,
  SectionTitle,
} from "../../../../components/elements/syllable"
import { WordList } from "../../../../components/word-list"
import { words } from "../../../../data/words"
import { BASE_URL, SITE_NAME } from "../../../../lib/constants"
import { buildCategories, categoryPath } from "../../../../lib/syllable"

type Params = Promise<{ kind: string; value: string }>

export const dynamicParams = false

const categories = buildCategories(words)

export function generateStaticParams() {
  return categories.map(({ kind, value }) => ({ kind, value }))
}

const findCategory = async (params: Params) => {
  const { kind, value } = await params
  return categories.find((c) => c.kind === kind && c.value === value)
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const c = await findCategory(params)
  if (!c) return {}
  const url = `${BASE_URL}${categoryPath(c)}`
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${c.title} | ${SITE_NAME}`,
      description: c.description,
      url,
      type: "website",
    },
  }
}

const Page = async ({ params }: { params: Params }) => {
  const c = await findCategory(params)
  if (!c) notFound()
  const url = `${BASE_URL}${categoryPath(c)}`
  const siblings = categories.filter((x) => x.kind === c.kind && x !== c)

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.title,
            description: c.description,
            url,
            breadcrumb: {
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
                { "@type": "ListItem", position: 3, name: c.label, item: url },
              ],
            },
          }),
        }}
      />
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/words/", label: "単語一覧" },
          { label: c.label },
        ]}
      />
      <h1
        style={{
          fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
          color: colors.text,
          marginBottom: ".75rem",
        }}
      >
        {c.title}
      </h1>
      <p style={{ color: "#444", lineHeight: 1.8, marginBottom: "1.25rem" }}>
        {c.intro}
      </p>

      <div
        style={{
          ...card,
          marginBottom: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: ".625rem",
        }}
      >
        <Link
          href={`/quiz/syllable-count/?${c.quizQuery}`}
          style={primaryButton}
        >
          この{c.words.length}語で音節区切りクイズ
        </Link>
        {c.value !== "1" && (
          <Link href={`/quiz/stress/?${c.quizQuery}`} style={secondaryButton}>
            この{c.words.length}語でアクセントクイズ
          </Link>
        )}
      </div>

      <SectionTitle>単語一覧（{c.words.length}語）</SectionTitle>
      <WordList words={c.words} />

      {siblings.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <SectionTitle>ほかの分類</SectionTitle>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: ".5rem",
            }}
          >
            {siblings.map((s) => (
              <li key={s.value}>
                <Link
                  href={categoryPath(s)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "40px",
                    padding: ".375rem .875rem",
                    borderRadius: "9999px",
                    backgroundColor: "#fff",
                    border: `1px solid ${colors.border}`,
                    color: colors.stress,
                    fontSize: ".875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {s.label}（{s.words.length}語）
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default Page
