import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#3ea8ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "#fff",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "serif",
              fontSize: 52,
              fontWeight: 700,
              color: "#3ea8ff",
            }}
          >
            S
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 72,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            syllabler
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 600,
          }}
        >
          シルブラ！
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 24,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
          }}
        >
          英単語を音節（syllable）単位で学ぶクイズ・解説サイト
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 16,
          }}
        >
          {["syl", "lab", "ler"].map((part, i) => (
            <div
              key={i}
              style={{
                padding: "8px 20px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: 8,
                fontSize: 28,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "serif",
              }}
            >
              {part}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
