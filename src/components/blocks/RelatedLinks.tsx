import Link from "next/link";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/* Internal linking editorial. As listas são derivadas do conteúdo
   (quais segmentos citam este produto, etc.), nunca digitadas à mão —
   é o que mantém a malha de links correta quando o site cresce. */
export function RelatedLinks({
  title,
  groups,
  surface = "ink",
}: {
  title: string;
  groups: { label: string; items: { label: string; href: string }[] }[];
  surface?: "paper" | "ink";
}) {
  const visible = groups.filter((g) => g.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <Section surface={surface} density="sm">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter gap-y-10 pt-8 lg:grid-cols-12">
          <h2 className="bv-display col-span-6 text-title lg:col-span-3">{title}</h2>

          {visible.map((group) => (
            <div key={group.label} className="col-span-6 lg:col-span-4">
              <Eyebrow as="h3">{group.label}</Eyebrow>
              <ul className="mt-5">
                {group.items.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] leading-snug"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden
                        className="translate-x-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
