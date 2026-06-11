import type { Metadata } from "next"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"

const title = "アクセントクイズ"
const description = "英単語のどの音節にアクセントがあるかを当てるクイズ。正しい音節をタップしよう。"
const url = `${BASE_URL}/quiz/stress`

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
