"use client"

import Link from "next/link"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { explain, getSplits, matchSplits, wordPath } from "../../lib/syllable"
import { Word } from "../../types"
import {
  colors,
  primaryButton,
  srOnly,
  SyllableWord,
} from "../elements/syllable"
import { SpeakButton } from "../speak-button"

export type QuestionProps = {
  word: Word
  isLast: boolean
  onAnswer: (correct: boolean) => void
  onNext: () => void
}

const Feedback: FC<{
  word: Word
  correct: boolean
  isLast: boolean
  onNext: () => void
  children?: ReactNode
}> = ({ word, correct, isLast, onNext, children }) => {
  const nextRef = useRef<HTMLButtonElement>(null)
  useEffect(() => nextRef.current?.focus(), [])
  return (
    <>
      <div
        role="status"
        style={{
          backgroundColor: correct ? "#f0f7ff" : "#fff5f5",
          border: `1px solid ${correct ? "#cfe4ff" : "#ffd6d6"}`,
          borderRadius: "10px",
          padding: "1.25rem",
          textAlign: "center",
          margin: "1.5rem 0 1.25rem",
        }}
      >
        <div
          style={{
            fontSize: "1.0625rem",
            fontWeight: "bold",
            marginBottom: ".75rem",
            color: correct ? colors.correct : colors.wrong,
          }}
        >
          {correct ? "✓ 正解！" : "✗ 不正解"}
        </div>
        <div style={{ marginBottom: ".625rem" }}>
          <span style={{ ...srOnly }}>正解は </span>
          <SyllableWord
            syllables={word.syllables}
            stressIndex={word.stressIndex}
            fontSize="1.75rem"
          />
        </div>
        <div style={{ color: colors.sub, fontFamily: "monospace" }}>
          {word.phonetic}
          {"\u3000"}
          {word.meaningJa}
        </div>
        {children}
        <p
          style={{
            color: "#444",
            fontSize: ".875rem",
            lineHeight: 1.7,
            marginTop: ".75rem",
            textAlign: "left",
          }}
        >
          {explain(word)}
        </p>
        <div style={{ marginTop: ".75rem" }}>
          <SpeakButton text={word.word} />
        </div>
      </div>
      <div style={{ display: "flex", gap: ".625rem" }}>
        <button
          ref={nextRef}
          type="button"
          onClick={onNext}
          style={{ ...primaryButton, flex: 1 }}
        >
          {isLast ? "結果を見る →" : "次の問題 →"}
        </button>
        <Link
          href={wordPath(word)}
          style={{
            ...primaryButton,
            backgroundColor: "#fafafa",
            border: `1px solid ${colors.border}`,
            color: colors.sub,
            fontWeight: 600,
            fontSize: ".8125rem",
          }}
        >
          単語を見る
        </Link>
      </div>
    </>
  )
}

export const SyllableQuestion: FC<QuestionProps> = ({
  word,
  isLast,
  onAnswer,
  onNext,
}) => {
  const [userSplits, setUserSplits] = useState<Set<number>>(new Set())
  const [matched, setMatched] = useState<string[] | null | undefined>()
  const [hint, setHint] = useState(false)
  const answered = matched !== undefined
  const chars = word.word.split("")
  const correctSplits = answered ? getSplits(matched ?? word.syllables) : []
  const long = chars.length > 10

  const toggle = (pos: number) =>
    setUserSplits((prev) => {
      const next = new Set(prev)
      if (next.has(pos)) next.delete(pos)
      else next.add(pos)
      return next
    })

  const submit = () => {
    const m = matchSplits(word, userSplits)
    setMatched(m)
    onAnswer(m !== null)
  }

  return (
    <>
      <p
        style={{
          color: colors.sub,
          fontSize: ".875rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        音節の区切りになる位置をタップ（もう一度タップで解除）
      </p>
      <div
        role="group"
        aria-label={`${word.word} の区切り位置`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1.25rem",
          overflowX: "auto",
        }}
      >
        {chars.map((char, i) => {
          const isCorrectSplit = correctSplits.includes(i)
          const isUserSplit = userSplits.has(i)
          let color = isUserSplit ? colors.primary : "#d5dbe3"
          let mark = ""
          if (answered) {
            if (isCorrectSplit && isUserSplit)
              [color, mark] = [colors.correct, "✓"]
            else if (isUserSplit) [color, mark] = [colors.wrong, "×"]
            else if (isCorrectSplit) [color, mark] = [colors.missed, "!"]
          }
          const active = isUserSplit || (answered && isCorrectSplit)
          return (
            <span
              key={i}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  disabled={answered}
                  aria-pressed={isUserSplit}
                  aria-label={`${chars[i - 1]} と ${char} の間で区切る`}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "24px",
                    height: "64px",
                    margin: long ? "0 -6px" : "0 -2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    cursor: answered ? "default" : "pointer",
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: active ? "3px" : "2px",
                      height: active ? "40px" : "18px",
                      backgroundColor: color,
                      borderRadius: "2px",
                      transition: "all .12s",
                    }}
                  />
                  {mark && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        color,
                        fontSize: ".75rem",
                        fontWeight: 700,
                      }}
                    >
                      {mark}
                    </span>
                  )}
                </button>
              )}
              <span
                aria-hidden="true"
                style={{
                  fontSize: long
                    ? "clamp(1.125rem, 6vw, 2rem)"
                    : "clamp(1.5rem, 9vw, 2.5rem)",
                  fontWeight: 700,
                  color: colors.text,
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

      {!answered && (
        <>
          <div
            style={{
              textAlign: "center",
              marginBottom: "1.25rem",
              minHeight: "1.5rem",
            }}
          >
            {hint ? (
              <span style={{ color: colors.sub, fontSize: ".8125rem" }}>
                ヒント: {word.syllableCount}音節の単語（{word.meaningJa}）
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setHint(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.stress,
                  fontSize: ".8125rem",
                  textDecoration: "underline",
                  cursor: "pointer",
                  minHeight: "32px",
                }}
              >
                ヒントを見る
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={submit}
            style={{ ...primaryButton, width: "100%" }}
          >
            {userSplits.size === 0 ? "区切らずに答える（1音節）" : "答え合わせ"}
          </button>
        </>
      )}

      {answered && (
        <Feedback
          word={word}
          correct={matched !== null}
          isLast={isLast}
          onNext={onNext}
        >
          {matched && matched !== word.syllables && (
            <p
              style={{
                fontSize: ".8125rem",
                color: colors.sub,
                marginTop: ".5rem",
              }}
            >
              あなたの区切り {matched.join("・")} も発音上の区切りとして正解。
            </p>
          )}
          {!matched && (
            <p
              style={{
                fontSize: ".75rem",
                color: colors.sub,
                marginTop: ".5rem",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: ".25rem .875rem",
              }}
            >
              <span style={{ color: colors.correct }}>✓ 正しい区切り</span>
              <span style={{ color: colors.wrong }}>× 不要な区切り</span>
              <span style={{ color: colors.missed }}>! 見落とした区切り</span>
            </p>
          )}
          {word.alternatives && (
            <p
              style={{
                fontSize: ".75rem",
                color: colors.sub,
                marginTop: ".25rem",
              }}
            >
              別解として {word.alternatives.map((a) => a.join("・")).join("、")}{" "}
              も正解。
            </p>
          )}
        </Feedback>
      )}
    </>
  )
}

export const StressQuestion: FC<QuestionProps> = ({
  word,
  isLast,
  onAnswer,
  onNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  const select = (i: number) => {
    setSelected(i)
    onAnswer(i === word.stressIndex)
  }

  return (
    <>
      <p
        style={{
          color: colors.sub,
          fontSize: ".875rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        いちばん強く読む音節をタップ
      </p>
      <div
        role="group"
        aria-label={`${word.word} の音節`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: ".375rem",
          flexWrap: "wrap",
        }}
      >
        {word.syllables.map((s, i) => {
          const isStress = i === word.stressIndex
          const isSelected = i === selected
          let style = {
            color: colors.text,
            background: "#f7f9fc",
            border: `2px solid ${colors.border}`,
          }
          let label = ""
          if (answered && isStress) {
            style = {
              color: colors.correct,
              background: "#e3f2fd",
              border: `2px solid ${colors.primary}`,
            }
            label = isSelected ? "✓ 強" : "強"
          } else if (answered && isSelected) {
            style = {
              color: colors.wrong,
              background: "#ffebee",
              border: `2px dashed ${colors.wrong}`,
            }
            label = "× 回答"
          } else if (answered) {
            style = { ...style, color: "#9aa3ae" }
          }
          return (
            <span
              key={i}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => select(i)}
                disabled={answered}
                aria-label={`${s}（${i + 1}番目の音節）`}
                style={{
                  ...style,
                  minWidth: "48px",
                  minHeight: "56px",
                  fontSize: "clamp(1.375rem, 7vw, 2.25rem)",
                  fontWeight: answered && isStress ? 800 : 700,
                  textTransform: answered && isStress ? "uppercase" : "none",
                  borderRadius: "8px",
                  padding: ".1em .3em",
                  cursor: answered ? "default" : "pointer",
                  lineHeight: 1.2,
                }}
              >
                {s}
              </button>
              <span
                style={{
                  minHeight: "1.25rem",
                  fontSize: ".75rem",
                  fontWeight: 700,
                  color: isStress ? colors.correct : colors.wrong,
                  marginTop: ".25rem",
                }}
              >
                {label}
              </span>
            </span>
          )
        })}
      </div>
      {answered && (
        <Feedback
          word={word}
          correct={selected === word.stressIndex}
          isLast={isLast}
          onNext={onNext}
        >
          {selected !== word.stressIndex && (
            <p
              style={{
                fontSize: ".875rem",
                color: colors.wrong,
                marginTop: ".5rem",
              }}
            >
              正解は {word.stressIndex + 1}番目の「
              {word.syllables[word.stressIndex].toUpperCase()}」
            </p>
          )}
        </Feedback>
      )}
    </>
  )
}
