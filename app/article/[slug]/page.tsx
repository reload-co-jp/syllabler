import Link from "next/link"
import { notFound } from "next/navigation"
import { articles } from "../../../data/articles"

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} | 音節英単語`,
    description: article.description,
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>解説</span>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>{article.title}</span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          color: "#1a1a2e",
          marginBottom: ".5rem",
          lineHeight: "1.35",
        }}
      >
        {article.title}
      </h1>
      <p style={{ color: "#999", fontSize: ".875rem", marginBottom: "2rem" }}>
        {article.description}
      </p>

      {/* Article Body */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "1.5rem",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}
      >
        {article.sections.map((section, i) => (
          <section
            key={i}
            style={{ marginBottom: i < article.sections.length - 1 ? "2rem" : "0" }}
          >
            {section.heading && (
              <h2
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: "bold",
                  color: "#1a1a2e",
                  marginBottom: ".875rem",
                  paddingBottom: ".5rem",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p
                key={j}
                style={{
                  color: "#444",
                  fontSize: ".9375rem",
                  lineHeight: "1.8",
                  marginBottom: j < section.paragraphs.length - 1 ? ".75rem" : "0",
                }}
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* References */}
      {article.references.length > 0 && (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            padding: "1.25rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)",
          }}
        >
          <h2
            style={{
              color: "#aaa",
              fontSize: ".75rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: ".75rem",
            }}
          >
            参考文献
          </h2>
          <ol style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: ".375rem" }}>
            {article.references.map((ref, i) => (
              <li key={i} style={{ color: "#999", fontSize: ".8125rem" }}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3ea8ff", textDecoration: "none" }}
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Other Articles */}
      <div>
        <h2
          style={{
            color: "#aaa",
            fontSize: ".75rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: ".75rem",
          }}
        >
          他の解説記事
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {articles
            .filter((a) => a.slug !== article.slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/article/${a.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: ".75rem 1rem",
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <span style={{ color: "#333", fontSize: ".875rem" }}>{a.title}</span>
                <span style={{ color: "#3ea8ff", fontSize: ".8125rem" }}>→</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Page
