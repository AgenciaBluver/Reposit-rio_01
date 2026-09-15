import type { ReactNode } from "react";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/** Cabeçalho de seção: régua + rótulo + título.
 *  A régua no topo é o que amarra as seções ao mesmo sistema visual. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "start",
  className = "",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "wide";
  className?: string;
  as?: "h2" | "h3";
}) {
  const Tag = as;
  return (
    <header className={className}>
      <Rule />
      {eyebrow && (
        <div className="pt-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag
        className={`bv-display mt-[clamp(1.5rem,3vw,2.75rem)] text-display-3 ${
          align === "wide" ? "" : "max-w-[18ch]"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <div className="bv-measure mt-[clamp(1.25rem,2vw,2rem)] text-lead text-fg-muted">
          {lead}
        </div>
      )}
    </header>
  );
}
