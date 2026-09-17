"use client";

import Link from "next/link";
import { useState } from "react";
import { questionSets, questionsClosing } from "@/content/questions";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Magnetic } from "@/components/primitives/Magnetic";
import { track } from "@/lib/analytics";

/* ════════════════════════════════════════════════════════════════════════
   PERGUNTAS SEM RESPOSTA
   O bloco mais interativo do site, e o que mais trabalha comercialmente.

   Duas camadas de interação, cada uma com função:
   · Trocar de setor troca o conjunto inteiro de perguntas.
   · Passar o ponteiro sobre uma pergunta apaga as outras e revela a
     observação que a acompanha.

   O apagamento é o ponto. Ele reproduz o que acontece na cabeça de quem
   lê: uma daquelas perguntas incomoda mais que as outras, e é nela que a
   atenção trava. O movimento do ponteiro vira leitura guiada em vez de
   varredura, que é o oposto do que uma lista de dores costuma provocar.

   Sem ponteiro (toque) e com prefers-reduced-motion, nada apaga: as
   perguntas e as observações ficam todas visíveis.
   ════════════════════════════════════════════════════════════════════════ */
export function Questions() {
  const [set, setSet] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const atual = questionSets[set];

  const onKeyTabs = (e: React.KeyboardEvent) => {
    const last = questionSets.length - 1;
    if (e.key === "ArrowRight") { e.preventDefault(); setSet(set === last ? 0 : set + 1); setHover(null); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setSet(set === 0 ? last : set - 1); setHover(null); }
  };

  return (
    <Section surface="ink" density="lg" id="perguntas" className="bv-spot">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">Diagnóstico</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[19ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Perguntas que você já se fez e ainda não respondeu.
          </h2>
        </div>

        {/* Seletor de setor */}
        <div
          role="tablist"
          aria-label="Setor"
          onKeyDown={onKeyTabs}
          className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap gap-2.5"
        >
          {questionSets.map((s, i) => {
            const on = i === set;
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => { setSet(i); setHover(null); }}
                className={`border px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 ${
                  on ? "border-transparent text-on-action" : "border-line text-fg-muted hover:text-fg"
                }`}
                style={on ? { background: "var(--bv-gradient)" } : undefined}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-[0.9375rem] text-fg-muted">{atual.context}</p>

        {/* A parede de perguntas */}
        <ul
          onMouseLeave={() => setHover(null)}
          className="mt-[clamp(2.5rem,5vw,4rem)]"
        >
          {atual.questions.map((item, i) => {
            const apagada = hover !== null && hover !== i;
            const ativa = hover === i;
            return (
              <li
                key={item.q}
                onMouseEnter={() => setHover(i)}
                className="group border-t border-line last:border-b"
              >
                <div className="grid grid-cols-6 gap-x-gutter py-[clamp(1.125rem,2.4vw,1.875rem)] lg:grid-cols-12">
                  <span
                    aria-hidden
                    className={`bv-numeral col-span-1 pt-2 text-[0.75rem] tracking-[0.1em] transition-all duration-500 ${
                      ativa ? "text-accent" : "text-fg-muted"
                    } ${apagada ? "opacity-20" : "opacity-100"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p
                    className={`bv-display col-span-5 text-[clamp(1.125rem,2.4vw,2rem)] leading-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:col-span-6 ${
                      apagada ? "opacity-20 blur-[1px]" : "opacity-100 blur-0"
                    } ${ativa ? "lg:translate-x-2" : ""}`}
                  >
                    {item.q}
                  </p>

                  {/* A observação aparece só na pergunta em foco. */}
                  <p
                    className={`col-span-6 mt-3 self-center text-[0.9375rem] leading-relaxed text-fg-muted transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:col-span-4 lg:col-start-9 lg:mt-0 ${
                      ativa
                        ? "opacity-100 lg:translate-y-0"
                        : "opacity-0 lg:translate-y-2 lg:opacity-0"
                    } max-lg:opacity-100`}
                  >
                    {item.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Fechamento: a honestidade é o argumento. */}
        <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-8 lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-6">
            <span aria-hidden className="bv-rule-signal block w-20" />
            <h3 className="bv-display mt-7 max-w-[16ch] text-display-3">
              {questionsClosing.headline}
            </h3>
          </div>
          <div className="col-span-6 flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8">
            <p className="max-w-[42ch] text-lead leading-relaxed text-fg-muted">
              {questionsClosing.body}
            </p>
            <div>
              <Magnetic>
                <Link
                  href={atual.href}
                  onClick={() =>
                    track("view_segment", {
                      item_id: atual.key,
                      item_name: atual.label,
                      location: "home_perguntas",
                    })
                  }
                  className="inline-flex items-center gap-3 bg-action px-6 py-3.5 text-[0.9375rem] font-medium text-on-action"
                >
                  Ver como resolvemos em {atual.label.toLowerCase()}
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 8h13M9 3l5 5-5 5" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
