export type WordLevel = "junior" | "high" | "toeic" | "eiken"

export type Word = {
  id: number
  word: string
  phonetic: string
  meaningJa: string
  syllables: string[]
  syllableCount: number
  stressIndex: number
  level: WordLevel
  example: string
  explanation: string
}

export type ArticleSection = {
  heading?: string
  paragraphs: string[]
}

export type ArticleReference = {
  title: string
  url: string
}

export type Article = {
  slug: string
  title: string
  description: string
  sections: ArticleSection[]
  references: ArticleReference[]
}
