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
      {/* Breadcrumb */}
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>アクセントクイズ</span>
      </div>

      <h1
        style={{
          color: "#1a1a2e",
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "1.25rem",
        }}
      >
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
        {/* Question */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ color: "#999", fontSize: ".8125rem", marginBottom: ".75rem" }}>
            アクセント（強く読む音節）はどれ？
          </div>
          <div
            style={{
              fontSize: "2.25rem",
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

        {/* Syllable Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: ".75rem",
            flexWrap: "wrap",
            marginBottom: answered ? "1.5rem" : "0",
          }}
        >
          {word.syllables.map((s, i) => {
            const isCorrect = i === word.stressIndex
            const isSelected = i === selected

            let bg = "#fafafa"
            let border = "#e0e0e0"
            let color = "#444"

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
            }

            return (
              <button
                key={i}
                onClick={() => !answered && setSelected(i)}
                disabled={answered}
                style={{
                  padding: ".875rem 1.5rem",
                  backgroundColor: bg,
                  border: `2px solid ${border}`,
                  borderRadius: "8px",
                  color,
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  cursor: answered ? "default" : "pointer",
                  minWidth: "80px",
                  boxShadow: answered ? "none" : "0 1px 2px rgba(0,0,0,.04)",
                  transition: "all .12s",
                }}
              >
                {s}
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
              {correct
                ? "✓ 正解！"
                : `✗ 不正解。正解は「${word.syllables[word.stressIndex].toUpperCase()}」`}
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
            <div style={{ color: "#666", fontSize: ".8125rem", lineHeight: "1.6" }}>
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
