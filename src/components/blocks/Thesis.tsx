"use client";

import { useEffect, useRef, useState } from "react";
import { thesis } from "@/content/site";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/* ════════════════════════════════════════════════════════════════════════
   A TESE — assinatura visual do site.
   A interação existe por um motivo: a tese é uma SEQUÊNCIA de causa, e o
   scroll só deixa uma etapa acesa por vez. Quem lê é obrigado a percorrer
   o raciocínio na ordem, em vez de varrer quatro cards simultâneos.
   Sem JS ou com reduced-motion, os quatro blocos ficam legíveis por igual.
   ════════════════════════════════════════════════════════════════════════ */
export function Thesis() {
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const observer = new IntersectionObserver(
      (entries) => {
        // A etapa "ativa" é a que estiver mais próxima do centro da tela.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = refs.current.indexOf(visible.target as HTMLLIElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.5, 1] },
    );

    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section surface="paper" density="lg" id="tese">
      <Shell>
        {/* Cabeçalho fixo: mantém o leitor ciente de onde está na sequência. */}
        <div className="sticky top-[4.5rem] z-10 -mx-gutter bg-bg/95 px-gutter py-4 backdrop-blur-[2px] lg:top-[5.25rem]">
          <Rule />
          <div className="flex items-baseline justify-between pt-4">
            <Eyebrow>A tese</Eyebrow>
            <p aria-hidden className="bv-numeral text-[0.8125rem] tracking-[0.1em] text-fg-muted">
              {String(active + 1).padStart(2, "0")} / 04
            </p>
          </div>
        </div>

        <ol className="mt-[clamp(3rem,7vw,7rem)]">
          {thesis.map((item, i) => {
            const isActive = !enabled || i === active;
            return (
              <li
                key={item.index}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="grid grid-cols-6 gap-x-gutter border-t border-line py-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12"
              >
                <div className="col-span-6 lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className={`bv-numeral block text-[0.8125rem] tracking-[0.1em] transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      {item.index}
                    </span>
                    {/* Marcador da etapa ativa: a régua de gradiente cresce.
                        Elemento não textual — sem exigência de contraste. */}
                    <span
                      aria-hidden
                      className={`bv-rule-signal transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "w-16" : "w-0"
                      }`}
                    />
                  </div>
                  <h3
                    className={`bv-display mt-5 text-display-3 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    {item.term}
                    <span className="bv-serif block italic text-fg-muted">{item.verb}.</span>
                  </h3>
                </div>
                <p
                  className={`col-span-6 mt-6 self-end text-lead leading-relaxed transition-opacity duration-700 lg:col-span-6 lg:col-start-7 lg:mt-0 ${
                    isActive ? "opacity-100 text-fg/80" : "opacity-25"
                  }`}
                >
                  {item.body}
                </p>
              </li>
            );
          })}
        </ol>
      </Shell>
    </Section>
  );
}
