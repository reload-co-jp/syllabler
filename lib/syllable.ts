import type { PartOfSpeech, Word, WordLevel } from "../types"

export const levelLabel: Record<WordLevel, string> = {
  junior: "中学",
  high: "高校",
  university: "大学受験",
  toeic: "TOEIC",
  eiken: "英検",
}

export const posLabel: Record<PartOfSpeech, string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  preposition: "前置詞",
}

/** 音節の区切り位置（先頭からの文字数）。["im","por","tant"] → [2, 5] */
export const getSplits = (syllables: string[]): number[] => {
  const positions: number[] = []
  let pos = 0
  for (let i = 0; i < syllables.length - 1; i++) {
    pos += syllables[i].length
    positions.push(pos)
  }
  return positions
}

/** 正解の区切り方（辞書式 + 別解）のどれかと一致すれば、その区切り方を返す */
export const matchSplits = (
  word: Word,
  userSplits: Iterable<number>
): string[] | null => {
  const user = [...new Set(userSplits)].sort((a, b) => a - b).join(",")
  return (
    [word.syllables, ...(word.alternatives ?? [])].find(
      (s) => getSplits(s).join(",") === user
    ) ?? null
  )
}

/** 強勢パターン。important → "3-2"（3音節・第2音節） */
export const stressPattern = (word: Word) =>
  `${word.syllableCount}-${word.stressIndex + 1}`

/** リズム表記。important → "oOo" */
export const rhythm = (count: number, stressIndex: number) =>
  Array.from({ length: count }, (_, i) => (i === stressIndex ? "O" : "o")).join(
    ""
  )

export const syllableText = (word: Word, syllables = word.syllables) =>
  syllables
    .map((s, i) => (i === word.stressIndex ? s.toUpperCase() : s))
    .join("・")

export const explain = (word: Word) => {
  const base =
    word.syllableCount === 1
      ? `${word.word} は1音節の単語。途中で区切らず、ひとまとまりで発音する。`
      : `${word.word} は${word.syllableCount}音節。${syllableText(word)} と区切る。アクセントは${word.stressIndex + 1}番目の ${word.syllables[word.stressIndex]}。`
  return word.note ? `${base}${word.note}` : base
}

const DIPHTHONGS = ["eɪ", "aɪ", "ɔɪ", "aʊ", "oʊ", "əʊ", "ɪə", "eə", "ʊə"]
const VOWELS = "aeiouæɑɒɔəɛɜɪʊʌɐɚɝ"

/**
 * 発音記号から音節核（母音）を数え、強勢記号 ˈ の位置から強勢音節を求める。
 * データ検証用のヒューリスティック（音節主音的子音 /l̩/ などは数えない）。
 */
export const analyzePhonetic = (phonetic: string) => {
  const ipa = phonetic.replace(/[/[\]]/g, "")
  let count = 0
  let stressIndex = -1
  for (let i = 0; i < ipa.length; ) {
    if (ipa[i] === "ˈ") {
      stressIndex = count
      i++
      continue
    }
    const d = DIPHTHONGS.find((x) => ipa.startsWith(x, i))
    if (d) {
      count++
      i += d.length
    } else if (VOWELS.includes(ipa[i])) {
      count++
      i++
    } else {
      i++
    }
    if (ipa[i] === "ː") i++
  }
  return { count, stressIndex: stressIndex === -1 ? 0 : stressIndex }
}

/** 一覧ページとして公開する最低単語数。これ未満のカテゴリは公開しない */
export const MIN_CATEGORY_WORDS = 5

export type CategoryKind = "syllables" | "stress" | "level"

export type Category = {
  kind: CategoryKind
  value: string
  /** 一覧用の短い名前 */
  label: string
  title: string
  description: string
  intro: string
  words: Word[]
  /** クイズへのクエリ（?以降） */
  quizQuery: string
}

const syllableGroup = (word: Word) => String(Math.min(word.syllableCount, 4))

const groupBy = (words: Word[], key: (w: Word) => string) => {
  const map = new Map<string, Word[]>()
  for (const w of words) map.set(key(w), [...(map.get(key(w)) ?? []), w])
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
}

export const buildCategories = (words: Word[]): Category[] => {
  const bySyllables = groupBy(words, syllableGroup).map(
    ([value, ws]): Category => {
      const label = value === "4" ? "4音節以上" : `${value}音節`
      return {
        kind: "syllables",
        value,
        label,
        title: `${label}の英単語一覧`,
        description: `${label}の英単語${ws.length}語を音節の区切り・アクセント位置つきで一覧表示。発音記号と意味も確認できる。`,
        intro:
          value === "1"
            ? "1音節の単語は、母音のまとまりが1つだけの単語。カタカナでは何拍にもなる単語も、英語では途中で区切らず一息で発音する。"
            : `${label}の単語は、音節ごとに区切ってアクセントのある音節を強く・長く読むと発音しやすくなる。${value === "4" ? "長い単語ほど、音節に分けると覚えやすい。" : ""}`,
        words: ws,
        quizQuery: `syllables=${value}`,
      }
    }
  )

  const byStress = groupBy(
    words.filter((w) => w.syllableCount > 1),
    stressPattern
  ).map(([value, ws]): Category => {
    const [count, pos] = value.split("-").map(Number)
    const r = rhythm(count, pos - 1)
    return {
      kind: "stress",
      value,
      label: `${count}音節・第${pos}音節（${r}）`,
      title: `第${pos}音節にアクセントがある${count}音節の英単語（${r}型）`,
      description: `${count}音節で第${pos}音節にアクセントがある英単語${ws.length}語の一覧。${r}のリズムで発音する単語をまとめて練習できる。`,
      intro: `${count}音節のうち${pos}番目の音節を強く読む単語。リズムは ${r}（O が強い音節）。同じリズムの単語をまとめて声に出すと、アクセントの位置が身につきやすい。`,
      words: ws,
      quizQuery: `pattern=${value}`,
    }
  })

  const levelOrder = Object.keys(levelLabel)
  const byLevel = groupBy(words, (w) => w.level)
    .sort(([a], [b]) => levelOrder.indexOf(a) - levelOrder.indexOf(b))
    .map(([value, ws]): Category => {
      const label = levelLabel[value as WordLevel]
      return {
        kind: "level",
        value,
        label,
        title: `${label}レベルの英単語の音節・アクセント一覧`,
        description: `${label}レベルの英単語${ws.length}語の音節の区切り・アクセント位置・発音記号の一覧。クイズで練習もできる。`,
        intro: `${label}レベルでよく出る英単語を、音節数ごとに並べた一覧。アクセントの位置を確認してからクイズで練習しよう。`,
        words: [...ws].sort((a, b) => a.syllableCount - b.syllableCount),
        quizQuery: `level=${value}`,
      }
    })

  return [...bySyllables, ...byStress, ...byLevel].filter(
    (c) => c.words.length >= MIN_CATEGORY_WORDS
  )
}

/** 同じ強勢パターン → 同じ音節数 → 同じレベルの順で関連単語を選ぶ */
export const relatedWords = (word: Word, words: Word[], limit = 6) => {
  const score = (w: Word) =>
    (stressPattern(w) === stressPattern(word) ? 4 : 0) +
    (w.syllableCount === word.syllableCount ? 2 : 0) +
    (w.level === word.level ? 1 : 0)
  return words
    .filter((w) => w.id !== word.id)
    .map((w) => ({ w, s: score(w) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s || a.w.id - b.w.id)
    .slice(0, limit)
    .map(({ w }) => w)
}

export const wordPath = (word: Word) => `/word/${word.word}/`
export const categoryPath = (c: Pick<Category, "kind" | "value">) =>
  `/words/${c.kind}/${c.value}/`

export type QuizFilter = {
  level?: string
  syllables?: string
  pattern?: string
}

export const filterWords = (words: Word[], f: QuizFilter) =>
  words.filter(
    (w) =>
      (!f.level || w.level === f.level) &&
      (!f.syllables || syllableGroup(w) === f.syllables) &&
      (!f.pattern || stressPattern(w) === f.pattern)
  )

export const shuffle = <T>(items: T[], random = Math.random): T[] => {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
