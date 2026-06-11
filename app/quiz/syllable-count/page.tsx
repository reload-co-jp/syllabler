"use client"

import Link from "next/link"
import { FC, useState } from "react"
import { words } from "../../../data/words"
import { BASE_URL, SITE_NAME } from "../../../lib/constants"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "音節区切りクイズ",
  description: "英単語の音節の区切り位置を当てるクイズ。タップして音節を区切ろう。",
  url: `${BASE_URL}/quiz/syllable-count`,
  learningResourceType: "quiz",
  educationalUse: "practice",
  inLanguage: "ja",
  publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "音節区切りクイズ", item: `${BASE_URL}/quiz/syllable-count` },
    ],
  },
}

function getCorrectSplits(syllables: string[]): number[] {
  const positions: number[] = []
  let pos = 0
  for (let i = 0; i < syllables.length - 1; i++) {
    pos += syllables[i].length
    positions.push(pos)
  }
  return positions
}

const Page: FC = () => {
  const [index, setIndex] = useState(0)
  const [userSplits, setUserSplits] = useState<Set<number>>(new Set())
  const [answered, setAnswered] = useState(false)

  const word = words[index % words.length]
  const chars = word.word.split("")
  const correctSplits = getCorrectSplits(word.syllables)

  const toggle = (pos: number) => {
    setUserSplits((prev) => {
      const next = new Set(prev)
      if (next.has(pos)) next.delete(pos)
      else next.add(pos)
      return next
    })
  }

  const isCorrect =
    userSplits.size === correctSplits.length &&
    correctSplits.every((p) => userSplits.has(p))

  const next = () => {
    setIndex((i) => i + 1)
    setUserSplits(new Set())
    setAnswered(false)
  }

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ marginBottom: ".875rem" }}>
        <Link href="/" style={{ color: "#3ea8ff", fontSize: ".8125rem", textDecoration: "none" }}>
          ホーム
        </Link>
        <span style={{ color: "#ccc", margin: "0 .4rem", fontSize: ".8125rem" }}>/</span>
        <span style={{ color: "#999", fontSize: ".8125rem" }}>音節区切りクイズ</span>
      </div>

      <h1 style={{ color: "#1a1a2e", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.25rem" }}>
        音節区切りクイズ
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
        <div style={{ color: "#999", fontSize: ".8125rem", textAlign: "center", marginBottom: "2rem" }}>
          音節の区切りをタップ
        </div>

        {/* Word with tap gaps */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "0",
          }}
        >
          {chars.map((char, i) => {
            const isCorrectSplit = correctSplits.includes(i)
            const isUserSplit = userSplits.has(i)

            let gapColor = "transparent"
            if (!answered) {
              gapColor = isUserSplit ? "#3ea8ff" : "transparent"
            } else {
              if (isCorrectSplit && isUserSplit) gapColor = "#3ea8ff"
              else if (!isCorrectSplit && isUserSplit) gapColor = "#f44336"
              else if (isCorrectSplit && !isUserSplit) gapColor = "#f59e0b"
            }

            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
                {i > 0 && (
                  <button
                    onClick={() => !answered && toggle(i)}
                    disabled={answered}
                    style={{
                      width: "22px",
                      height: "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      cursor: answered ? "default" : "pointer",
                      padding: "0",
                      flexShrink: 0,
                    }}
                    aria-label={`${i}番目の後ろで区切る`}
                  >
                    <span
                      style={{
                        display: "block",
                        width: "2px",
                        height: isUserSplit || (answered && isCorrectSplit) ? "36px" : "16px",
                        backgroundColor:
                          gapColor !== "transparent"
                            ? gapColor
                            : "#e8e8e8",
                        borderRadius: "2px",
                        transition: "all .12s",
                      }}
                    />
                  </button>
                )}
                <span
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: "700",
                    color: "#1a1a2e",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {char}
                </span>
              </span>
            )
          })}
        </div>

        {/* Hint */}
        {!answered && (
          <div style={{ textAlign: "center", color: "#bbb", fontSize: ".75rem", marginBottom: "1.5rem" }}>
            {word.syllableCount}音節の単語
          </div>
        )}

        {/* Submit */}
        {!answered && (
          <button
            onClick={() => setAnswered(true)}
            style={{
              width: "100%",
              padding: ".875rem",
              backgroundColor: userSplits.size > 0 ? "#3ea8ff" : "#e0e0e0",
              border: "none",
              borderRadius: "8px",
              color: userSplits.size > 0 ? "#fff" : "#aaa",
              fontSize: ".9375rem",
              fontWeight: "600",
              cursor: userSplits.size > 0 ? "pointer" : "default",
              transition: "all .12s",
            }}
          >
            答え合わせ
          </button>
        )}

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
                color: isCorrect ? "#1565c0" : "#c62828",
              }}
            >
              {isCorrect ? "✓ 正解！" : "✗ 不正解"}
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: ".625rem" }}>
              {word.syllables.map((s, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: "#3ea8ff", margin: "0 .05em" }}>·</span>}
                  <span style={{ color: i === word.stressIndex ? "#3ea8ff" : "#b0bcc8",
                    textTransform: i === word.stressIndex ? "uppercase" : "none" }}>
                    {s}
                  </span>
                </span>
              ))}
            </div>
            {!isCorrect && (
              <div style={{ fontSize: ".75rem", color: "#999", marginBottom: ".5rem" }}>
                <span style={{ color: "#f44336" }}>赤</span>=誤り
                <span style={{ color: "#f59e0b" }}>黄</span>=見逃し
              </div>
            )}
            <div style={{ color: "#666", fontSize: ".8125rem" }}>{word.explanation}</div>
          </div>
        )}

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
