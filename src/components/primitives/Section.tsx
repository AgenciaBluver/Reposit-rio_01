import type { ReactNode } from "react";

type Surface = "paper" | "ink" | "deep";
type Density = "xs" | "sm" | "md" | "lg";

const padding: Record<Density, string> = {
  xs: "py-pad-xs",
  sm: "py-pad-sm",
  md: "py-pad-md",
  lg: "py-pad-lg",
};

/** Bloco de página. A alternância de `surface` e `density` é o que cria o
 *  ritmo do scroll — áreas densas seguidas de áreas de respiro. */
export function Section({
  children,
  surface = "paper",
  density = "md",
  id,
  className = "",
  as: Tag = "section",
  label,
}: {
  children: ReactNode;
  surface?: Surface;
  density?: Density;
  id?: string;
  className?: string;
  as?: "section" | "div" | "article" | "header" | "footer";
  /** aria-label quando a seção não tem heading visível. */
  label?: string;
}) {
  return (
    <Tag
      id={id}
      aria-label={label}
      data-surface={surface}
      className={`relative ${padding[density]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Container de largura máxima com gutter fluido. */
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`bv-shell ${className}`}>{children}</div>;
}

/** Grade de 12 colunas (6 no mobile). */
export function Grid({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  return <Tag className={`bv-grid ${className}`}>{children}</Tag>;
}
