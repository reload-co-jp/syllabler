import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#3ea8ff",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.02em",
        }}
      >
        S
      </div>
    ),
    { ...size },
  )
}
