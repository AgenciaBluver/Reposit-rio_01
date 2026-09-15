import type { Faq as FaqItem } from "@/content/types";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/* FAQ — <details> nativo: acessível por teclado, funciona sem JS e é
   indexável pelo Google mesmo fechado. */
export function Faq({
  items,
  surface = "paper",
  title = "Perguntas que costumam vir antes da primeira conversa.",
}: {
  items: FaqItem[];
  surface?: "paper" | "ink";
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section surface={surface} density="md" id="faq">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-4">
            <Eyebrow>Dúvidas</Eyebrow>
            <h2 className="bv-display mt-4 max-w-[20ch] text-display-3 lg:sticky lg:top-[8rem]">
              {title}
            </h2>
          </div>

          <ul className="col-span-6 mt-[clamp(2.5rem,5vw,4rem)] lg:col-span-7 lg:col-start-6 lg:mt-0">
            {items.map((item) => (
              <li key={item.q} className="border-t border-line last:border-b">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="bv-display max-w-[34ch] text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-snug">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="relative mt-2 block h-3 w-3 shrink-0"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-fg" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-fg transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="max-w-[58ch] pb-7 leading-relaxed text-fg-muted">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </Section>
  );
}
