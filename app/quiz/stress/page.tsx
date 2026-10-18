import { Suspense } from "react"
import { Breadcrumb, colors } from "../../../components/elements/syllable"
import { QuizApp } from "../../../components/quiz/quiz-app"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "アクセントクイズ",
  description:
    "英単語のどの音節にアクセントがあるかを当てるクイズ。正しい音節をタップしよう。",
  url: `${BASE_URL}/quiz/stress/`,
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
        name: "アクセントクイズ",
        item: `${BASE_URL}/quiz/stress/`,
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
      items={[{ href: "/", label: "ホーム" }, { label: "アクセントクイズ" }]}
    />
    <h1
      style={{
        color: colors.text,
        fontSize: "1.375rem",
        fontWeight: "bold",
        marginBottom: ".5rem",
      }}
    >
      アクセントクイズ
    </h1>
    <p
      style={{
        color: colors.sub,
        fontSize: ".875rem",
        lineHeight: 1.7,
        marginBottom: "1.25rem",
      }}
    >
      音節に分けた英単語のうち、いちばん強く読む音節（アクセント）を選ぶ練習。回答後に発音記号・意味・解説を確認し、音声で聞くこともできる。
    </p>
    <Suspense
      fallback={
        <p role="status" style={{ textAlign: "center", color: colors.sub }}>
          読み込み中…
        </p>
      }
    >
      <QuizApp mode="stress" />
    </Suspense>
  </div>
)

export default Page
