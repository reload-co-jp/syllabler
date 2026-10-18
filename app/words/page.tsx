import type { Metadata } from "next"
import Link from "next/link"
import {
  Breadcrumb,
  card,
  colors,
  SectionTitle,
} from "../../components/elements/syllable"
import { WordList } from "../../components/word-list"
import { words } from "../../data/words"
import { BASE_URL, SITE_NAME } from "../../lib/constants"
import { buildCategories, categoryPath, CategoryKind } from "../../lib/syllable"

const title = "英単語の音節・アクセント一覧"
const description = `音節の区切りとアクセント位置つきの英単語${words.length}語の一覧。音節数別・アクセントパターン別・レベル別にも探せる。`
const url = `${BASE_URL}/words/`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url,
    type: "website",
  },
}

const kindLabel: Record<CategoryKind, string> = {
  syllables: "音節数別",
  stress: "アクセントパターン別",
  level: "レベル・試験別",
}

const Page = () => {
  const categories = buildCategories(words)
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description,
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
                  item: url,
                },
              ],
            },
          }),
        }}
      />
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "単語一覧" }]}
      />
      <h1
        style={{
          fontSize: "1.5rem",
          color: colors.text,
          marginBottom: ".5rem",
        }}
      >
        {title}
      </h1>
      <p style={{ color: colors.sub, lineHeight: 1.7, marginBottom: "1.5rem" }}>
        {description}
      </p>

      <section style={{ ...card, marginBottom: "1.5rem" }}>
        {(Object.keys(kindLabel) as CategoryKind[]).map((kind) => (
          <div key={kind} style={{ marginBottom: "1rem" }}>
            <SectionTitle>{kindLabel[kind]}</SectionTitle>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: ".5rem",
              }}
            >
              {categories
                .filter((c) => c.kind === kind)
                .map((c) => (
                  <li key={c.value}>
                    <Link href={categoryPath(c)} style={chip}>
                      {c.label}
                      <span
                        style={{
                          color: colors.sub,
                          fontWeight: 400,
                          marginLeft: ".375rem",
                        }}
                      >
                        {c.words.length}語
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <SectionTitle>すべての単語</SectionTitle>
      <WordList words={words} searchable />
    </div>
  )
}

const chip = {
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
}

export default Page
