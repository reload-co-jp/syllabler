"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FC, useMemo, useState, useSyncExternalStore } from "react"
import { levels, words } from "../../data/words"
import {
  loadHistory,
  parseHistory,
  QuizMode,
  recordAnswer,
  recordSession,
  saveHistory,
  subscribeHistory,
  wrongWords,
} from "../../lib/history"
import {
  filterWords,
  levelLabel,
  QuizFilter,
  rhythm,
  shuffle,
  stressPattern,
  wordPath,
} from "../../lib/syllable"
import { Word } from "../../types"
import {
  card,
  colors,
  primaryButton,
  secondaryButton,
  SyllableWord,
} from "../elements/syllable"
import { StressQuestion, SyllableQuestion } from "./questions"

type Session = {
  queue: Word[]
  index: number
  results: { word: Word; correct: boolean }[]
}

const COUNTS = [
  { value: 10, label: "10問" },
  { value: 20, label: "20問" },
  { value: 0, label: "すべて" },
]

const update = (fn: (h: ReturnType<typeof parseHistory>) => typeof h) =>
  saveHistory(fn(parseHistory(loadHistory())))

export const QuizApp: FC<{ mode: QuizMode }> = ({ mode }) => {
  const params = useSearchParams()
  const historyRaw = useSyncExternalStore(
    subscribeHistory,
    loadHistory,
    () => null
  )
  const history = useMemo(() => parseHistory(historyRaw), [historyRaw])
  // アクセントクイズは1音節語を出題しない
  const pool = useMemo(
    () =>
      mode === "stress" ? words.filter((w) => w.syllableCount > 1) : words,
    [mode]
  )
  const [filter, setFilter] = useState<QuizFilter>(() => ({
    level: params.get("level") ?? "",
    syllables: params.get("syllables") ?? "",
    pattern: params.get("pattern") ?? "",
  }))
  const [review, setReview] = useState(params.get("review") === "1")
  const [count, setCount] = useState(10)
  const [random, setRandom] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  const reviewWords = wrongWords(history, mode, pool)
  const candidates = review ? reviewWords : filterWords(pool, filter)
  const patterns = useMemo(
    () => [...new Set(pool.map(stressPattern))].sort(),
    [pool]
  )

  const start = (list: Word[]) => {
    const ordered = random ? shuffle(list) : list
    setSession({
      queue: count ? ordered.slice(0, count) : ordered,
      index: 0,
      results: [],
    })
    window.scrollTo({ top: 0 })
  }

  if (!session) {
    const select = (
      key: keyof QuizFilter,
      label: string,
      options: [string, string][]
    ) => (
      <label style={{ display: "block", marginBottom: ".875rem" }}>
        <span style={fieldLabel}>{label}</span>
        <select
          value={filter[key]}
          disabled={review}
          onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
          style={selectStyle}
        >
          <option value="">すべて</option>
          {options.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </label>
    )
    return (
      <div style={card}>
        <h2
          style={{
            fontSize: "1.0625rem",
            marginBottom: "1.25rem",
            color: colors.text,
          }}
        >
          出題設定
        </h2>
        {select(
          "level",
          "レベル",
          levels.map((l) => [l, levelLabel[l]])
        )}
        {select(
          "syllables",
          "音節数",
          (mode === "stress" ? ["2", "3", "4"] : ["1", "2", "3", "4"]).map(
            (v) => [v, v === "4" ? "4音節以上" : `${v}音節`]
          )
        )}
        {select(
          "pattern",
          "アクセントの位置",
          patterns.map((p) => {
            const [c, s] = p.split("-").map(Number)
            return [p, `${c}音節・第${s}音節（${rhythm(c, s - 1)}）`]
          })
        )}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            minHeight: "44px",
            marginBottom: ".875rem",
            color: reviewWords.length ? colors.text : "#999",
            fontSize: ".9375rem",
          }}
        >
          <input
            type="checkbox"
            checked={review}
            disabled={!reviewWords.length}
            onChange={(e) => setReview(e.target.checked)}
            style={{ width: "20px", height: "20px" }}
          />
          前回間違えた単語だけ復習する（{reviewWords.length}語）
        </label>
        <fieldset style={fieldset}>
          <legend style={fieldLabel}>出題数</legend>
          <div style={{ display: "flex", gap: ".5rem" }}>
            {COUNTS.map((c) => (
              <Choice
                key={c.value}
                name="count"
                checked={count === c.value}
                onChange={() => setCount(c.value)}
              >
                {c.label}
              </Choice>
            ))}
          </div>
        </fieldset>
        <fieldset style={fieldset}>
          <legend style={fieldLabel}>出題順</legend>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <Choice
              name="order"
              checked={random}
              onChange={() => setRandom(true)}
            >
              ランダム
            </Choice>
            <Choice
              name="order"
              checked={!random}
              onChange={() => setRandom(false)}
            >
              順番どおり
            </Choice>
          </div>
        </fieldset>
        {candidates.length === 0 ? (
          <p
            role="status"
            style={{
              color: colors.wrong,
              fontSize: ".875rem",
              marginBottom: ".75rem",
            }}
          >
            条件に合う単語がありません。条件を変更してください。
          </p>
        ) : (
          <p
            style={{
              color: colors.sub,
              fontSize: ".875rem",
              marginBottom: ".75rem",
            }}
          >
            対象 {candidates.length}語から
            {count && count < candidates.length
              ? `${count}問`
              : `${candidates.length}問`}
            出題
          </p>
        )}
        <button
          type="button"
          onClick={() => start(candidates)}
          disabled={candidates.length === 0}
          style={{
            ...primaryButton,
            width: "100%",
            opacity: candidates.length ? 1 : 0.5,
            cursor: candidates.length ? "pointer" : "not-allowed",
          }}
        >
          スタート
        </button>
      </div>
    )
  }

  const { queue, index, results } = session

  if (index >= queue.length) {
    const correct = results.filter((r) => r.correct).length
    const wrong = results.filter((r) => !r.correct).map((r) => r.word)
    return (
      <div style={card}>
        <h2
          style={{
            fontSize: "1.0625rem",
            textAlign: "center",
            color: colors.text,
          }}
        >
          結果
        </h2>
        <div style={{ textAlign: "center", margin: "1rem 0 1.5rem" }}>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: colors.stress,
            }}
          >
            {correct} / {results.length}
          </div>
          <div style={{ color: colors.sub }}>
            正答率 {Math.round((correct / results.length) * 100)}%
          </div>
        </div>
        {wrong.length > 0 ? (
          <>
            <h3
              style={{
                fontSize: ".9375rem",
                marginBottom: ".5rem",
                color: colors.text,
              }}
            >
              間違えた単語（{wrong.length}語）
            </h3>
            <ul
              style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}
            >
              {wrong.map((w) => (
                <li
                  key={w.id}
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <Link
                    href={wordPath(w)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: ".75rem .25rem",
                      textDecoration: "none",
                    }}
                  >
                    <SyllableWord
                      syllables={w.syllables}
                      stressIndex={w.stressIndex}
                    />
                    <span style={{ color: colors.sub, fontSize: ".8125rem" }}>
                      {w.meaningJa}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              marginBottom: "1.25rem",
              color: colors.correct,
            }}
          >
            全問正解！
          </p>
        )}
        <div style={{ display: "grid", gap: ".625rem" }}>
          {wrong.length > 0 && (
            <button
              type="button"
              onClick={() => start(wrong)}
              style={primaryButton}
            >
              間違えた単語に再挑戦
            </button>
          )}
          <button
            type="button"
            onClick={() => start(candidates)}
            style={wrong.length ? secondaryButton : primaryButton}
          >
            同じ設定でもう一度
          </button>
          <button
            type="button"
            onClick={() => setSession(null)}
            style={secondaryButton}
          >
            設定を変える
          </button>
          <Link href="/history/" style={{ ...secondaryButton, border: "none" }}>
            学習履歴を見る →
          </Link>
        </div>
      </div>
    )
  }

  const word = queue[index]
  const Question = mode === "stress" ? StressQuestion : SyllableQuestion
  const score = results.filter((r) => r.correct).length

  const onAnswer = (correct: boolean) => {
    const nextResults = [...results, { word, correct }]
    setSession({ ...session, results: nextResults })
    update((h) => {
      const r = recordAnswer(h, mode, word.word, correct)
      return nextResults.length === queue.length
        ? recordSession(
            r,
            mode,
            queue.length,
            nextResults.filter((x) => x.correct).length
          )
        : r
    })
  }

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: colors.sub,
          fontSize: ".8125rem",
          marginBottom: ".5rem",
        }}
      >
        <span>
          第{index + 1}問 / {queue.length}問
        </span>
        <span>正解 {score}</span>
      </div>
      <div
        role="progressbar"
        aria-label="進捗"
        aria-valuemin={0}
        aria-valuemax={queue.length}
        aria-valuenow={index}
        style={{
          height: "4px",
          background: "#eef1f5",
          borderRadius: "2px",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            width: `${(index / queue.length) * 100}%`,
            height: "100%",
            background: colors.primary,
            borderRadius: "2px",
          }}
        />
      </div>
      <Question
        key={`${index}-${word.id}`}
        word={word}
        isLast={index === queue.length - 1}
        onAnswer={onAnswer}
        onNext={() => setSession({ ...session, index: index + 1 })}
      />
    </div>
  )
}

const Choice: FC<{
  name: string
  checked: boolean
  onChange: () => void
  children: React.ReactNode
}> = ({ name, checked, onChange, children }) => (
  <label
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "44px",
      borderRadius: "8px",
      border: `${checked ? 2 : 1}px solid ${checked ? colors.primary : colors.border}`,
      background: checked ? "#f0f7ff" : "#fff",
      color: checked ? colors.stress : colors.text,
      fontWeight: checked ? 700 : 500,
      fontSize: ".9375rem",
      cursor: "pointer",
    }}
  >
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      style={{ marginRight: ".375rem" }}
    />
    {children}
  </label>
)

const fieldLabel = {
  display: "block",
  color: colors.sub,
  fontSize: ".8125rem",
  fontWeight: 700,
  marginBottom: ".375rem",
}

const fieldset = { border: "none", padding: 0, margin: "0 0 1rem" }

const selectStyle = {
  width: "100%",
  minHeight: "44px",
  padding: ".5rem .75rem",
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  background: "#fff",
  fontSize: "1rem",
  color: colors.text,
}
