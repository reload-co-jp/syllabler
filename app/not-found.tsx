import type { Metadata } from "next"
import Link from "next/link"
import {
  card,
  colors,
  primaryButton,
  secondaryButton,
} from "../components/elements/syllable"

export const metadata: Metadata = {
  title: "ページが見つかりません",
}

const NotFound = () => (
  <div
    style={{
      maxWidth: "560px",
      margin: "2rem auto",
      ...card,
      textAlign: "center",
    }}
  >
    <h1
      style={{
        fontSize: "1.375rem",
        color: colors.text,
        marginBottom: ".75rem",
      }}
    >
      ページが見つかりません
    </h1>
    <p style={{ color: colors.sub, lineHeight: 1.7, marginBottom: "1.25rem" }}>
      お探しの単語やページは存在しないか、移動した可能性があります。
    </p>
    <div style={{ display: "grid", gap: ".625rem" }}>
      <Link href="/words/" style={primaryButton}>
        単語一覧から探す
      </Link>
      <Link href="/" style={secondaryButton}>
        トップページへ
      </Link>
    </div>
  </div>
)

export default NotFound
