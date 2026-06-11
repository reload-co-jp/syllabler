import Link from "next/link"
import { FC } from "react"
import { articles } from "../../data/articles"
import { BASE_URL, SITE_NAME } from "../../lib/constants"

export const metadata = {
  title: "解説記事一覧 | syllabler シルブラ！",
  description: "音節・アクセント・発音記号・英単語の覚え方を解説する記事一覧。",
  alternates: { canonical: `${BASE_URL}/article` },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "解説記事一覧",
  description: "音節・アクセント・発音記号・英単語の覚え方を解説する記事一覧。",
  url: `${BASE_URL}/article`,
  publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "解説", item: `${BASE_URL}/article` },
    ],
  },
}

const Page: FC = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto" }}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div style={{ marginBottom: ".875rem" }}>
      <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
        ホーム
      </Link>
      <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
      <span style={{ color: "#999", fontSize: ".8125rem" }}>解説</span>
    </div>

    <h1
      style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#1a1a2e",
        marginBottom: "1.5rem",
      }}
    >
      解説記事
    </h1>

    <div style={{ display: "flex", flexDirection: "column", gap: ".625rem" }}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/article/${article.slug}`}
          style={{
            display: "block",
            padding: "1.125rem 1.25rem",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)",
          }}
        >
          <div
            style={{
              fontSize: ".9375rem",
              fontWeight: "600",
              color: "#1a1a2e",
              marginBottom: ".3rem",
            }}
          >
            {article.title}
          </div>
          <div style={{ fontSize: ".8125rem", color: "#999" }}>{article.description}</div>
        </Link>
      ))}
    </div>
  </div>
)

export default Page
