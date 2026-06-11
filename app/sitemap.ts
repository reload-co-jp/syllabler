export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { articles } from "../data/articles"
import { words } from "../data/words"
import { BASE_URL } from "../lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const wordEntries: MetadataRoute.Sitemap = words.map((w) => ({
    url: `${BASE_URL}/word/${w.word}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/article/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/quiz/syllable-count`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quiz/stress`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/article`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...wordEntries,
    ...articleEntries,
  ]
}
