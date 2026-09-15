import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";

/* ESCOPO — descrito como competência, não como pacote.
   Duas colunas de itens com régua superior: o desenho é de sumário
   editorial, não de tabela de preços. */
export function Scope({
  items,
  eyebrow = "O que está incluído",
  title,
  surface = "paper",
}: {
  items: { title: string; body: string }[];
  eyebrow?: string;
  title: string;
  surface?: "paper" | "ink";
}) {
  return (
    <Section surface={surface} density="lg">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">{eyebrow}</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {title}
          </h2>
        </div>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="col-span-6 border-t border-line py-[clamp(1.75rem,3vw,2.5rem)] lg:col-span-5 lg:[&:nth-child(even)]:col-start-8"
            >
              <Reveal delay={(i % 2) * 60}>
                <h3 className="bv-display text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3.5 max-w-[46ch] leading-relaxed text-fg-muted">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
