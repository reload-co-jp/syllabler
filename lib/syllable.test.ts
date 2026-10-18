import assert from "node:assert/strict"
import { test } from "node:test"
import { words } from "../data/words.ts"
import {
  analyzePhonetic,
  buildCategories,
  getSplits,
  matchSplits,
  MIN_CATEGORY_WORDS,
  relatedWords,
  stressPattern,
} from "./syllable.ts"
import {
  emptyHistory,
  parseHistory,
  recordAnswer,
  recordSession,
  wrongWords,
} from "./history.ts"

const byWord = (w: string) => words.find((x) => x.word === w)!

test("単語データ: 区切り・音節数・強勢位置が整合している", () => {
  const seen = new Set<string>()
  for (const w of words) {
    assert.ok(!seen.has(w.word.toLowerCase()), `重複: ${w.word}`)
    seen.add(w.word.toLowerCase())
    for (const s of [w.syllables, ...(w.alternatives ?? [])]) {
      assert.equal(s.join(""), w.word, `区切りが綴りと一致しない: ${w.word}`)
      assert.equal(s.length, w.syllableCount, `別解の音節数: ${w.word}`)
    }
    assert.ok(w.stressIndex >= 0 && w.stressIndex < w.syllableCount, w.word)
    assert.ok(w.meaningJa && w.example && w.phonetic, `必須項目: ${w.word}`)
  }
})

test("単語データ: 発音記号の音節数・強勢記号と一致している", () => {
  for (const w of words) {
    const p = analyzePhonetic(w.phonetic)
    assert.equal(p.count, w.syllableCount, `音節数: ${w.word} ${w.phonetic}`)
    assert.equal(p.stressIndex, w.stressIndex, `強勢: ${w.word} ${w.phonetic}`)
  }
})

test("getSplits", () => {
  assert.deepEqual(getSplits(["im", "por", "tant"]), [2, 5])
  assert.deepEqual(getSplits(["school"]), [])
})

test("matchSplits: 辞書式と別解の両方を正解にする", () => {
  const computer = byWord("computer")
  assert.deepEqual(matchSplits(computer, [3, 6]), ["com", "put", "er"])
  assert.deepEqual(matchSplits(computer, [3, 5]), ["com", "pu", "ter"])
  assert.equal(matchSplits(computer, [3]), null)
  assert.equal(matchSplits(computer, [2, 5]), null)
  assert.deepEqual(matchSplits(byWord("school"), []), ["school"])
})

test("カテゴリ: 単語数が少ないものは公開しない", () => {
  const cats = buildCategories(words)
  assert.ok(cats.every((c) => c.words.length >= MIN_CATEGORY_WORDS))
  assert.ok(cats.some((c) => c.kind === "syllables" && c.value === "1"))
  const s = cats.find((c) => c.kind === "stress" && c.value === "3-2")!
  assert.ok(s.words.every((w) => stressPattern(w) === "3-2"))
})

test("関連単語は自分を含まず、同じ強勢パターンを優先する", () => {
  const w = byWord("important")
  const r = relatedWords(w, words)
  assert.ok(!r.includes(w))
  assert.equal(stressPattern(r[0]), "3-2")
})

test("履歴: 壊れたデータでも空の履歴として扱う", () => {
  assert.deepEqual(parseHistory(null), emptyHistory())
  assert.deepEqual(parseHistory("{broken"), emptyHistory())
  assert.deepEqual(parseHistory('{"version":99}'), emptyHistory())
  const partial = parseHistory(
    '{"version":1,"syllable":{"apple":{"correct":1,"wrong":0,"last":true},"x":1},"sessions":[{"bad":1}]}'
  )
  assert.deepEqual(Object.keys(partial.syllable), ["apple"])
  assert.deepEqual(partial.stress, {})
  assert.deepEqual(partial.sessions, [])
})

test("履歴: 記録・保存形式の往復・間違えた単語の抽出", () => {
  let h = recordAnswer(emptyHistory(), "stress", "banana", false)
  h = recordAnswer(h, "stress", "apple", true)
  h = recordSession(h, "stress", 2, 1, 0)
  const restored = parseHistory(JSON.stringify(h))
  assert.deepEqual(restored, h)
  assert.deepEqual(
    wrongWords(restored, "stress", words).map((w) => w.word),
    ["banana"]
  )
  h = recordAnswer(h, "stress", "banana", true)
  assert.deepEqual(wrongWords(h, "stress", words), [])
  assert.deepEqual(h.stress.banana, { correct: 1, wrong: 1, last: true })
})
