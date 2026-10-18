"use client"

import Link from "next/link"
import { FC, useMemo, useState, useSyncExternalStore } from "react"
import { words } from "../data/words"
import {
  accuracy,
  accuracyBy,
  loadHistory,
  parseHistory,
  QuizMode,
  saveHistory,
  subscribeHistory,
  wrongWords,
} from "../lib/history"
import { rhythm, stressPattern, wordPath } from "../lib/syllable"
import {
  card,
  colors,
  primaryButton,
  secondaryButton,
  SectionTitle,
  SyllableWord,
} from "./elements/syllable"

const modes: { mode: QuizMode; label: string; href: string }[] = [
  {
    mode: "syllable",
    label: "音節区切りクイズ",
    href: "/quiz/syllable-count/",
  },
  { mode: "stress", label: "アクセントクイズ", href: "/quiz/stress/" },
]

const percent = (rate: number | null) =>
  rate === null ? "—" : `${Math.round(rate * 100)}%`

export const HistoryView: FC = () => {
  const raw = useSyncExternalStore(
    subscribeHistory,
    loadHistory,
    () => undefined
  )
  const h = useMemo(() => parseHistory(raw ?? null), [raw])
  const [confirming, setConfirming] = useState(false)

  if (raw === undefined)
    return (
      <p role="status" style={{ color: colors.sub, textAlign: "center" }}>
        読み込み中…
      </p>
    )

  const learned = new Set([
    ...Object.keys(h.syllable),
    ...Object.keys(h.stress),
  ]).size
  if (learned === 0)
    return (
      <div style={{ ...card, textAlign: "center" }}>
        <p style={{ color: colors.sub, marginBottom: "1rem", lineHeight: 1.7 }}>
          まだ学習履歴がありません。クイズに回答すると、この端末のブラウザに自動で保存されます。
        </p>
        <div style={{ display: "grid", gap: ".625rem" }}>
          {modes.map((m) => (
            <Link key={m.mode} href={m.href} style={primaryButton}>
              {m.label}を始める
            </Link>
          ))}
        </div>
      </div>
    )

  const total = accuracy([
    ...Object.values(h.syllable),
    ...Object.values(h.stress),
  ])
  const weakSyllables = accuracyBy(h, words, (w) =>
    String(Math.min(w.syllableCount, 4))
  )
  const weakPatterns = accuracyBy(
    h,
    words.filter((w) => w.syllableCount > 1),
    stressPattern,
    ["stress"]
  )

  return (
    <>
      <section style={{ ...card, marginBottom: "1rem" }}>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          <Stat label="学習した単語" value={`${learned} / ${words.length}語`} />
          <Stat label="全体の正答率" value={percent(total.rate)} />
          {modes.map((m) => (
            <Stat
              key={m.mode}
              label={m.label}
              value={percent(accuracy(Object.values(h[m.mode])).rate)}
            />
          ))}
        </dl>
      </section>

      {modes.map((m) => {
        const wrong = wrongWords(h, m.mode, words)
        return (
          <section key={m.mode} style={{ ...card, marginBottom: "1rem" }}>
            <SectionTitle>
              {m.label}で間違えた単語（{wrong.length}語）
            </SectionTitle>
            {wrong.length === 0 ? (
              <p style={{ color: colors.sub, fontSize: ".875rem" }}>
                復習が必要な単語はありません。
              </p>
            ) : (
              <>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {wrong.map((w) => (
                    <li key={w.id}>
                      <Link
                        href={wordPath(w)}
                        style={{
                          display: "inline-block",
                          padding: ".375rem .75rem",
                          border: `1px solid ${colors.border}`,
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        <SyllableWord
                          syllables={w.syllables}
                          stressIndex={w.stressIndex}
                          fontSize=".9375rem"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`${m.href}?review=1`} style={primaryButton}>
                  間違えた単語に再挑戦
                </Link>
              </>
            )}
          </section>
        )
      })}

      <section style={{ ...card, marginBottom: "1rem" }}>
        <SectionTitle>苦手な傾向（正答率の低い順）</SectionTitle>
        <WeakList
          title="音節数別"
          rows={weakSyllables.map((r) => ({
            ...r,
            label: r.group === "4" ? "4音節以上" : `${r.group}音節`,
            href: `/words/syllables/${r.group}/`,
          }))}
        />
        <WeakList
          title="アクセントパターン別"
          rows={weakPatterns.map((r) => {
            const [c, s] = r.group.split("-").map(Number)
            return {
              ...r,
              label: `${c}音節・第${s}音節（${rhythm(c, s - 1)}）`,
              href: `/quiz/stress/?pattern=${r.group}`,
            }
          })}
        />
      </section>

      <section style={card}>
        <SectionTitle>履歴のリセット</SectionTitle>
        <p
          style={{
            color: colors.sub,
            fontSize: ".875rem",
            marginBottom: ".75rem",
          }}
        >
          学習履歴はこの端末のブラウザにだけ保存されています。リセットすると元に戻せません。
        </p>
        {confirming ? (
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                saveHistory(null)
                setConfirming(false)
              }}
              style={{ ...primaryButton, backgroundColor: colors.wrong }}
            >
              本当にリセットする
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              style={secondaryButton}
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            style={{
              ...secondaryButton,
              borderColor: colors.wrong,
              color: colors.wrong,
            }}
          >
            学習履歴をリセット
          </button>
        )}
      </section>
    </>
  )
}

const WeakList: FC<{
  title: string
  rows: {
    label: string
    href: string
    rate: number | null
    correct: number
    total: number
  }[]
}> = ({ title, rows }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h3
      style={{
        fontSize: ".875rem",
        color: colors.sub,
        marginBottom: ".375rem",
      }}
    >
      {title}
    </h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {rows.slice(0, 5).map((r) => (
        <li
          key={r.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            padding: ".5rem 0",
            borderTop: `1px solid ${colors.border}`,
            fontSize: ".875rem",
          }}
        >
          <Link href={r.href} style={{ color: colors.stress }}>
            {r.label}
          </Link>
          <span
            style={{
              color: (r.rate ?? 1) < 0.6 ? colors.wrong : colors.text,
              fontWeight: 600,
            }}
          >
            {percent(r.rate)}（{r.correct}/{r.total}）
          </span>
        </li>
      ))}
    </ul>
  </div>
)

const Stat: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <dt
      style={{ color: colors.sub, fontSize: ".75rem", marginBottom: ".25rem" }}
    >
      {label}
    </dt>
    <dd
      style={{
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: 800,
        color: colors.text,
      }}
    >
      {value}
    </dd>
  </div>
)
