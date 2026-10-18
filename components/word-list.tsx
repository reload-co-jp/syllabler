"use client"

import Link from "next/link"
import { FC, useState } from "react"
import { wordPath } from "../lib/syllable"
import { Word } from "../types"
import { colors, SyllableWord } from "./elements/syllable"

/** 全単語を通常のリンクとして描画し、入力に応じて絞り込む（検索状態はURLに持たない） */
export const WordList: FC<{ words: Word[]; searchable?: boolean }> = ({
  words,
  searchable,
}) => {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const shown = q
    ? words.filter(
        (w) => w.word.toLowerCase().includes(q) || w.meaningJa.includes(q)
      )
    : words

  return (
    <>
      {searchable && (
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="word-search"
            style={{
              display: "block",
              fontSize: ".8125rem",
              fontWeight: 700,
              color: colors.sub,
              marginBottom: ".375rem",
            }}
          >
            英単語・意味で検索
          </label>
          <input
            id="word-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="例: important / 重要"
            autoComplete="off"
            style={{
              width: "100%",
              minHeight: "48px",
              padding: ".625rem .875rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
          <p
            role="status"
            style={{
              fontSize: ".75rem",
              color: colors.sub,
              marginTop: ".375rem",
            }}
          >
            {q ? `${shown.length}件` : `${words.length}語`}
          </p>
        </div>
      )}
      {shown.length === 0 ? (
        <p
          style={{ color: colors.sub, textAlign: "center", padding: "2rem 0" }}
        >
          「{query}」に一致する単語はありません。
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            gap: ".625rem",
          }}
        >
          {shown.map((w) => (
            <li key={w.id}>
              <Link
                href={wordPath(w)}
                style={{
                  display: "block",
                  height: "100%",
                  padding: ".875rem 1rem",
                  backgroundColor: "#fff",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: colors.text,
                  }}
                >
                  {w.word}
                </div>
                <div style={{ margin: ".25rem 0" }}>
                  <SyllableWord
                    syllables={w.syllables}
                    stressIndex={w.stressIndex}
                    fontSize=".875rem"
                  />
                </div>
                <div style={{ color: colors.sub, fontSize: ".8125rem" }}>
                  {w.syllableCount}音節・{w.meaningJa}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
