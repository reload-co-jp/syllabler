import Link from "next/link"
import { CSSProperties, FC, ReactNode } from "react"

export const colors = {
  primary: "#3ea8ff",
  /** 白背景で十分なコントラストがある強調色（テキスト用） */
  stress: "#0b6bcb",
  text: "#1a1a2e",
  sub: "#5f6b7a",
  border: "#e0e0e0",
  correct: "#1565c0",
  wrong: "#c62828",
  missed: "#b45309",
}

export const srOnly: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
}

export const card: CSSProperties = {
  backgroundColor: "#fff",
  border: `1px solid ${colors.border}`,
  borderRadius: "12px",
  padding: "clamp(1.25rem, 4vw, 2rem)",
  boxShadow: "0 1px 4px rgba(0,0,0,.06)",
}

export const primaryButton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "48px",
  padding: ".75rem 1.25rem",
  backgroundColor: colors.primary,
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: ".9375rem",
  fontWeight: 700,
  textDecoration: "none",
  cursor: "pointer",
}

export const secondaryButton: CSSProperties = {
  ...primaryButton,
  backgroundColor: "#fff",
  border: `1px solid ${colors.primary}`,
  color: colors.stress,
}

/** 強勢のある音節を色・太字・大文字・下線で示す（色だけに頼らない） */
export const SyllableWord: FC<{
  syllables: string[]
  stressIndex: number
  fontSize?: string
}> = ({ syllables, stressIndex, fontSize = "1rem" }) => (
  <span style={{ fontSize, whiteSpace: "nowrap" }}>
    <span aria-hidden="true">
      {syllables.map((s, i) => (
        <span key={i}>
          {i > 0 && (
            <span style={{ color: "#aab4c0", margin: "0 .08em" }}>・</span>
          )}
          <span
            style={
              i === stressIndex && syllables.length > 1
                ? {
                    color: colors.stress,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    borderBottom: `.12em solid ${colors.primary}`,
                  }
                : { color: colors.sub, fontWeight: 500 }
            }
          >
            {s}
          </span>
        </span>
      ))}
    </span>
    <span style={srOnly}>
      {syllables.join("・")}
      {syllables.length > 1 && `（${stressIndex + 1}番目の音節にアクセント）`}
    </span>
  </span>
)

export const Breadcrumb: FC<{ items: { href?: string; label: string }[] }> = ({
  items,
}) => (
  <nav aria-label="パンくずリスト" style={{ marginBottom: ".875rem" }}>
    {items.map((item, i) => (
      <span key={i} style={{ fontSize: ".8125rem" }}>
        {i > 0 && <span style={{ color: "#bbb", margin: "0 .4rem" }}>/</span>}
        {item.href ? (
          <Link
            href={item.href}
            style={{ color: colors.stress, textDecoration: "none" }}
          >
            {item.label}
          </Link>
        ) : (
          <span style={{ color: colors.sub }} aria-current="page">
            {item.label}
          </span>
        )}
      </span>
    ))}
  </nav>
)

export const SectionTitle: FC<{ children: ReactNode; id?: string }> = ({
  children,
  id,
}) => (
  <h2
    id={id}
    style={{
      color: colors.text,
      fontSize: "1rem",
      fontWeight: 700,
      marginBottom: ".875rem",
    }}
  >
    {children}
  </h2>
)
