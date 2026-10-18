import type { Word } from "../types"

export type QuizMode = "syllable" | "stress"

export type WordRecord = { correct: number; wrong: number; last: boolean }

export type History = {
  version: 1
  syllable: Record<string, WordRecord>
  stress: Record<string, WordRecord>
  sessions: { mode: QuizMode; total: number; correct: number; at: number }[]
}

export const STORAGE_KEY = "syllabler:history"
const MAX_SESSIONS = 50

export const emptyHistory = (): History => ({
  version: 1,
  syllable: {},
  stress: {},
  sessions: [],
})

const isRecord = (v: unknown): v is WordRecord =>
  typeof v === "object" &&
  v !== null &&
  typeof (v as WordRecord).correct === "number" &&
  typeof (v as WordRecord).wrong === "number" &&
  typeof (v as WordRecord).last === "boolean"

const records = (v: unknown): Record<string, WordRecord> =>
  typeof v === "object" && v !== null
    ? Object.fromEntries(Object.entries(v).filter(([, r]) => isRecord(r)))
    : {}

/** 壊れた・古い形式のデータでも例外を出さず、読める部分だけ復元する */
export const parseHistory = (raw: string | null): History => {
  if (!raw) return emptyHistory()
  try {
    const v = JSON.parse(raw)
    if (v?.version !== 1) return emptyHistory()
    return {
      version: 1,
      syllable: records(v.syllable),
      stress: records(v.stress),
      sessions: Array.isArray(v.sessions)
        ? v.sessions.filter(
            (s: History["sessions"][number]) =>
              (s?.mode === "syllable" || s?.mode === "stress") &&
              typeof s.total === "number" &&
              typeof s.correct === "number" &&
              typeof s.at === "number"
          )
        : [],
    }
  } catch {
    return emptyHistory()
  }
}

export const recordAnswer = (
  h: History,
  mode: QuizMode,
  word: string,
  correct: boolean
): History => {
  const r = h[mode][word] ?? { correct: 0, wrong: 0, last: false }
  return {
    ...h,
    [mode]: {
      ...h[mode],
      [word]: {
        correct: r.correct + (correct ? 1 : 0),
        wrong: r.wrong + (correct ? 0 : 1),
        last: correct,
      },
    },
  }
}

export const recordSession = (
  h: History,
  mode: QuizMode,
  total: number,
  correct: number,
  at = Date.now()
): History => ({
  ...h,
  sessions: [...h.sessions, { mode, total, correct, at }].slice(-MAX_SESSIONS),
})

/** 直近の回答が不正解の単語 */
export const wrongWords = (h: History, mode: QuizMode, words: Word[]) =>
  words.filter((w) => h[mode][w.word]?.last === false)

export const accuracy = (rs: WordRecord[]) => {
  const c = rs.reduce((n, r) => n + r.correct, 0)
  const total = rs.reduce((n, r) => n + r.correct + r.wrong, 0)
  return { correct: c, total, rate: total ? c / total : null }
}

/** グループ別の正答率（低い順）。苦手な音節数・アクセントパターンの把握用 */
export const accuracyBy = (
  h: History,
  words: Word[],
  key: (w: Word) => string,
  modes: QuizMode[] = ["syllable", "stress"]
) => {
  const groups = new Map<string, WordRecord[]>()
  for (const w of words) {
    const rs = modes.map((m) => h[m][w.word]).filter(Boolean)
    if (rs.length) groups.set(key(w), [...(groups.get(key(w)) ?? []), ...rs])
  }
  return [...groups.entries()]
    .map(([group, rs]) => ({ group, ...accuracy(rs) }))
    .sort((a, b) => (a.rate ?? 1) - (b.rate ?? 1))
}

export const loadHistory = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const CHANGE_EVENT = "syllabler:history-change"

/** 保存に失敗しても（容量超過・プライベートモード等）学習は続けられるようにする */
export const saveHistory = (h: History | null) => {
  try {
    if (h) localStorage.setItem(STORAGE_KEY, JSON.stringify(h))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 保存できない環境では履歴なしで動作する
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export const subscribeHistory = (cb: () => void) => {
  window.addEventListener("storage", cb)
  window.addEventListener(CHANGE_EVENT, cb)
  return () => {
    window.removeEventListener("storage", cb)
    window.removeEventListener(CHANGE_EVENT, cb)
  }
}
