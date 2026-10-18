export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { articles } from "../data/articles"
import { words } from "../data/words"
import { BASE_URL } from "../lib/constants"
import { buildCategories, categoryPath, wordPath } from "../lib/syllable"

// trailingSlash: true に合わせ、URLは末尾スラッシュ付き（canonical と一致させる）
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  })

  return [
    entry("/", 1, "weekly"),
    entry("/quiz/syllable-count/", 0.9),
    entry("/quiz/stress/", 0.9),
    entry("/words/", 0.9, "weekly"),
    entry("/article/", 0.8),
    ...buildCategories(words).map((c) => entry(categoryPath(c), 0.8)),
    ...words.map((w) => entry(wordPath(w), 0.7)),
    ...articles.map((a) => entry(`/article/${a.slug}/`, 0.7)),
  ]
}
