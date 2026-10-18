import type { Metadata } from "next"
import { Breadcrumb, colors } from "../../components/elements/syllable"
import { HistoryView } from "../../components/history-view"

// 端末ごとの学習状態を表示するだけのページなので検索結果に出さない
export const metadata: Metadata = {
  title: "学習履歴",
  robots: { index: false, follow: true },
}

const Page = () => (
  <div style={{ maxWidth: "680px", margin: "0 auto" }}>
    <Breadcrumb
      items={[{ href: "/", label: "ホーム" }, { label: "学習履歴" }]}
    />
    <h1
      style={{ fontSize: "1.5rem", color: colors.text, marginBottom: "1rem" }}
    >
      学習履歴
    </h1>
    <HistoryView />
  </div>
)

export default Page
