import { Suspense } from "react"
import { Breadcrumb, colors } from "../../../components/elements/syllable"
import { QuizApp } from "../../../components/quiz/quiz-app"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "音節区切りクイズ",
  description:
    "英単語の音節の区切り位置を当てるクイズ。タップして音節を区切ろう。",
  url: `${BASE_URL}/quiz/syllable-count/`,
  learningResourceType: "quiz",
  educationalUse: "practice",
  inLanguage: "ja",
  publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
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
        name: "音節区切りクイズ",
        item: `${BASE_URL}/quiz/syllable-count/`,
      },
    ],
  },
}

const Page = () => (
  <div style={{ maxWidth: "560px", margin: "0 auto" }}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <Breadcrumb
      items={[{ href: "/", label: "ホーム" }, { label: "音節区切りクイズ" }]}
    />
    <h1
      style={{
        color: colors.text,
        fontSize: "1.375rem",
        fontWeight: "bold",
        marginBottom: ".5rem",
      }}
    >
      音節区切りクイズ
    </h1>
    <p
      style={{
        color: colors.sub,
        fontSize: ".875rem",
        lineHeight: 1.7,
        marginBottom: "1.25rem",
      }}
    >
      英単語を音節ごとに区切る練習。単語の文字と文字の間をタップして区切り位置を選び、答え合わせする。辞書の区切りと発音上の区切りが異なる単語は、どちらも正解になる。
    </p>
    <Suspense
      fallback={
        <p role="status" style={{ textAlign: "center", color: colors.sub }}>
          読み込み中…
        </p>
      }
    >
      <QuizApp mode="syllable" />
    </Suspense>
  </div>
)

export default Page
