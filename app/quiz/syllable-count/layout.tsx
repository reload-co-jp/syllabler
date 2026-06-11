import type { Metadata } from "next"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"

const title = "音節区切りクイズ"
const description = "英単語の音節の区切り位置を当てるクイズ。タップして音節を区切ろう。"
const url = `${BASE_URL}/quiz/syllable-count`

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
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
