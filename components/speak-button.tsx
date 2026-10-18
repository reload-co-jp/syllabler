"use client"

import { FC, useState } from "react"
import { colors } from "./elements/syllable"

/**
 * ブラウザ標準の Web Speech API で読み上げる。外部サービス・費用なし。
 * 非対応ブラウザ・再生失敗時はメッセージを表示する。音声の質は OS の音声に依存する。
 */
export const SpeakButton: FC<{ text: string }> = ({ text }) => {
  const [error, setError] = useState(false)

  const speak = (rate: number) => {
    setError(false)
    if (!("speechSynthesis" in window)) return setError(true)
    try {
      speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = "en-US"
      u.rate = rate
      u.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted") setError(true)
      }
      speechSynthesis.speak(u)
    } catch {
      setError(true)
    }
  }

  const style = {
    minHeight: "40px",
    padding: ".4rem .875rem",
    backgroundColor: "#fff",
    border: `1px solid ${colors.border}`,
    borderRadius: "9999px",
    color: colors.stress,
    fontSize: ".8125rem",
    fontWeight: 600,
    cursor: "pointer",
  }

  return (
    <span style={{ display: "inline-flex", gap: ".5rem", flexWrap: "wrap" }}>
      <button
        type="button"
        onClick={() => speak(1)}
        style={style}
        aria-label={`${text} の発音を再生`}
      >
        ▶ 発音を聞く
      </button>
      <button
        type="button"
        onClick={() => speak(0.6)}
        style={style}
        aria-label={`${text} の発音をゆっくり再生`}
      >
        ゆっくり
      </button>
      {error && (
        <span role="status" style={{ color: colors.wrong, fontSize: ".75rem" }}>
          音声を再生できませんでした。ブラウザが音声読み上げに対応していないか、端末に英語の音声が入っていない可能性があります。
        </span>
      )}
    </span>
  )
}
