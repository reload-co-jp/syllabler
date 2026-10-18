export type WordLevel = "junior" | "high" | "university" | "toeic" | "eiken"

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"

export type Word = {
  id: number
  word: string
  phonetic: string
  meaningJa: string
  partOfSpeech: PartOfSpeech
  syllables: string[]
  /** 正解として認める別の区切り方（音節数・強勢位置は syllables と同じ） */
  alternatives?: string[][]
  syllableCount: number
  stressIndex: number
  level: WordLevel
  example: string
  /** 発音の揺れ・カタカナとの違いなど、単語固有の補足 */
  note?: string
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
