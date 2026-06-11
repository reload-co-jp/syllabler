"use client"

import Link from "next/link"
import { FC, useState } from "react"
import { words } from "../../../data/words"

const Page: FC = () => {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const word = words[index % words.length]
  const answered = selected !== null
  const correct = selected === word.stressIndex

  const next = () => {
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>アクセントクイズ</span>
      </div>

      <h1 style={{ color: "#1a1a2e", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.25rem" }}>
        アクセントクイズ
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
        {/* Instruction */}
        <div style={{ color: "#999", fontSize: ".8125rem", textAlign: "center", marginBottom: "2rem" }}>
          強く読む音節をタップ
        </div>

        {/* Syllable word display */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0",
            marginBottom: answered ? "2rem" : "0",
            flexWrap: "wrap",
          }}
        >
          {word.syllables.map((s, i) => {
            const isCorrect = i === word.stressIndex
            const isSelected = i === selected

            let color = "#1a1a2e"
            let borderBottom = "2px solid transparent"
            let bg = "transparent"

            if (!answered) {
              borderBottom = "2px solid #e0e0e0"
            } else {
              if (isCorrect) {
                color = "#1565c0"
                borderBottom = "2px solid #3ea8ff"
                bg = "#e3f2fd"
              } else if (isSelected) {
                color = "#c62828"
                borderBottom = "2px solid #f44336"
                bg = "#ffebee"
              } else {
                color = "#bbb"
                borderBottom = "2px solid transparent"
              }
            }

            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                {i > 0 && (
                  <span style={{ color: "#ccc", fontSize: "1.5rem", userSelect: "none", margin: "0 1px" }}>
                    ·
                  </span>
                )}
                <button
                  onClick={() => !answered && setSelected(i)}
                  disabled={answered}
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
                    color,
                    background: bg,
                    border: "none",
                    borderBottom,
                    borderRadius: bg !== "transparent" ? "4px" : "0",
                    padding: "0.1em 0.15em",
                    cursor: answered ? "default" : "pointer",
                    transition: "all .12s",
                    lineHeight: 1.2,
                  }}
                >
                  {answered && isCorrect ? s.toUpperCase() : s}
                </button>
              </span>
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
                marginBottom: ".5rem",
                color: correct ? "#1565c0" : "#c62828",
              }}
            >
              {correct
                ? "✓ 正解！"
                : `✗ 不正解。正解は「${word.syllables[word.stressIndex].toUpperCase()}」`}
            </div>
            <div style={{ color: "#666", fontSize: ".8125rem", lineHeight: "1.7" }}>
              {word.explanation}
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
