import type { ReactNode } from "react";

/** Rótulo de seção. Sempre acompanhado de um índice ou de uma régua —
 *  nunca flutuando sozinho. */
export function Eyebrow({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h2" | "div";
}) {
  return <Tag className={`bv-eyebrow text-fg-muted ${className}`}>{children}</Tag>;
}

/** Régua fina — o divisor estrutural do sistema. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`bv-rule ${className}`} />;
}

/** Numeral editorial grande (01, 02...). Decorativo para leitores de tela
 *  quando o texto adjacente já carrega a informação. */
export function Numeral({
  children,
  className = "",
  hidden = true,
}: {
  children: ReactNode;
  className?: string;
  hidden?: boolean;
}) {
  return (
    <span
      aria-hidden={hidden || undefined}
      className={`bv-numeral text-index block ${className}`}
    >
      {children}
    </span>
  );
}

/** Headline em linhas controladas. Quebrar manualmente é uma decisão de
 *  composição: define o desenho do bloco de texto em cada breakpoint. */
export function DisplayLines({
  lines,
  className = "",
  as: Tag = "h2",
  accentLast = false,
}: {
  lines: readonly string[];
  className?: string;
  as?: "h1" | "h2" | "p" | "div";
  /** Aplica a cor de sinal na última linha — usar com muita parcimônia. */
  accentLast?: boolean;
}) {
  return (
    <Tag className={`bv-display ${className}`}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={`block ${
            accentLast && i === lines.length - 1 ? "text-accent" : ""
          }`}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}
