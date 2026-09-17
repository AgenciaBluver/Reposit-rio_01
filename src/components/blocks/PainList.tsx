"use client";

import { useState } from "react";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/* ════════════════════════════════════════════════════════════════════════
   AS DORES
   Bloco central da LP. As frases aparecem como uma lista de queixas que o
   visitante já disse em voz alta; ao abrir uma, ele lê a consequência
   comercial dela.

   A interação faz trabalho de venda: obriga o leitor a escolher a própria
   dor, e é essa escolha que transforma "texto de agência" em "estão
   falando de mim". Aberto por padrão fica poluído; fechado por padrão
   convida a mexer.

   <button> + aria-expanded: funciona por teclado e é anunciado por
   leitores de tela como o que é.
   ════════════════════════════════════════════════════════════════════════ */
export function PainList({
  items,
  surface = "ink",
  eyebrow = "Reconhece alguma?",
  title,
}: {
  items: { pain: string; consequence: string }[];
  surface?: "paper" | "ink";
  eyebrow?: string;
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section surface={surface} density="lg" id="dores">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">{eyebrow}</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {title}
          </h2>
        </div>

        <ul className="mt-[clamp(2.5rem,6vw,5rem)]">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.pain} className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`dor-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-[clamp(1.125rem,2vw,1.75rem)] text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span
                        aria-hidden
                        className={`bv-numeral shrink-0 text-[0.75rem] tracking-[0.1em] transition-colors duration-300 ${
                          isOpen ? "text-accent" : "text-fg-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`bv-display max-w-[26ch] text-[clamp(1.0625rem,2.1vw,1.75rem)] leading-tight transition-colors duration-300 ${
                          isOpen ? "text-fg" : "text-fg/70 group-hover:text-fg"
                        }`}
                      >
                        {item.pain}
                      </span>
                    </span>

                    {/* Sinal de abertura: um traço que vira cruz. */}
                    <span aria-hidden className="relative mt-3 block h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                      <span
                        className={`absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "rotate-90 opacity-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={`dor-${i}`}
                  hidden={!isOpen}
                  className="grid grid-cols-6 gap-x-gutter lg:grid-cols-12"
                >
                  <p className="col-span-6 pb-[clamp(1.5rem,3vw,2.5rem)] text-lead leading-relaxed text-fg-muted lg:col-span-7 lg:col-start-2">
                    {item.consequence}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Shell>
    </Section>
  );
}
