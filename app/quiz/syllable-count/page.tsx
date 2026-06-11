"use client"

import Link from "next/link"
import { FC, useState } from "react"
import { words } from "../../../data/words"

function generateChoices(correct: number): number[] {
  const candidates = [correct - 2, correct - 1, correct, correct + 1, correct + 2]
    .filter((n) => n >= 1 && n <= 7)
  const set = new Set<number>([correct])
  for (const n of candidates) {
    if (set.size >= 4) break
    set.add(n)
  }
  return Array.from(set).sort((a, b) => a - b)
}

const Page: FC = () => {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const word = words[index % words.length]
  const choices = generateChoices(word.syllableCount)
  const answered = selected !== null
  const correct = selected === word.syllableCount

  const next = () => {
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>音節数クイズ</span>
      </div>

      <h1
        style={{
          color: "#1a1a2e",
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1.25rem",
        }}
      >
        音節数クイズ
      </h1>

      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}
      >
        {/* Question */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ color: "#999", fontSize: ".8125rem", marginBottom: ".75rem" }}>
            この単語は何音節？
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1a1a2e",
              letterSpacing: "0.04em",
              marginBottom: ".25rem",
            }}
          >
            {word.word}
          </div>
          <div style={{ color: "#bbb", fontFamily: "monospace", fontSize: ".875rem" }}>
            {word.phonetic}
          </div>
        </div>

        {/* Choices */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: ".75rem",
            marginBottom: answered ? "1.5rem" : "0",
          }}
        >
          {choices.map((n) => {
            const isCorrect = n === word.syllableCount
            const isSelected = n === selected

            let bg = "#fafafa"
            let border = "#e0e0e0"
            let color = "#444"
            let shadow = "none"

            if (answered) {
              if (isCorrect) {
                bg = "#e8f5e9"
                border = "#4caf50"
                color = "#2e7d32"
              } else if (isSelected) {
                bg = "#ffebee"
                border = "#f44336"
                color = "#c62828"
              } else {
                color = "#ccc"
                border = "#f0f0f0"
              }
            } else {
              shadow = "0 1px 2px rgba(0,0,0,.04)"
            }

            return (
              <button
                key={n}
                onClick={() => !answered && setSelected(n)}
                disabled={answered}
                style={{
                  padding: "1.125rem",
                  backgroundColor: bg,
                  border: `2px solid ${border}`,
                  borderRadius: "8px",
                  color,
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  cursor: answered ? "default" : "pointer",
                  boxShadow: shadow,
                  transition: "all .12s",
                }}
              >
                {n}
              </button>
            )
          })}
        </div>

        {/* Result */}
        {answered && (
          <div
            style={{
              backgroundColor: "#f8fbff",
              border: "1px solid #d0e8ff",
              borderRadius: "10px",
              padding: "1.25rem",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: ".875rem",
                color: correct ? "#2e7d32" : "#c62828",
              }}
            >
              {correct ? "✓ 正解！" : `✗ 不正解。正解は ${word.syllableCount}音節`}
            </div>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "#1a1a2e",
                marginBottom: ".625rem",
              }}
            >
              {word.syllables.map((s, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: "#cce0f0" }}>・</span>}
                  <span
                    style={{
                      color: i === word.stressIndex ? "#3ea8ff" : "#b0bcc8",
                      textTransform: i === word.stressIndex ? "uppercase" : "none",
                    }}
                  >
                    {s}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ color: "#999", fontSize: ".8125rem" }}>
              {word.syllableCount}音節 ／ アクセント:{" "}
              <span style={{ color: "#3ea8ff", fontWeight: "600" }}>
                {word.syllables[word.stressIndex].toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        {answered && (
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button
              onClick={next}
              style={{
                flex: 1,
                padding: ".875rem",
                backgroundColor: "#3ea8ff",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: ".9375rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              次の問題 →
            </button>
            <Link
              href={`/word/${word.word}`}
              style={{
                padding: ".875rem 1rem",
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                color: "#666",
                fontSize: ".8125rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              単語を見る
            </Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: ".875rem", color: "#ccc", fontSize: ".75rem", textAlign: "center" }}>
        {(index % words.length) + 1} / {words.length}
      </div>
    </div>
  )
}

export default Page
