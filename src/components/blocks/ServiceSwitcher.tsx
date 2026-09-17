"use client";

import { useState } from "react";
import { servicesLanding } from "@/content/services-landing";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Action } from "@/components/primitives/Action";

/* ════════════════════════════════════════════════════════════════════════
   SELETOR DE SERVIÇO
   A página troca de conteúdo no lugar em vez de empilhar quatro blocos.
   Quem chegou por "cobertura de evento" resolve a dúvida sem rolar por
   três seções que não lhe dizem respeito; quem chegou sem saber compara
   os quatro no mesmo enquadramento.

   Padrão de abas com teclado: setas percorrem, Home e End vão às pontas.
   ════════════════════════════════════════════════════════════════════════ */
export function ServiceSwitcher() {
  const items = servicesLanding.services;
  const [i, setI] = useState(0);

  const onKey = (e: React.KeyboardEvent) => {
    const last = items.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setI(i === last ? 0 : i + 1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setI(i === 0 ? last : i - 1); }
    if (e.key === "Home") { e.preventDefault(); setI(0); }
    if (e.key === "End") { e.preventDefault(); setI(last); }
  };

  return (
    <Section surface="paper" density="lg" id="servicos">
      <Shell>
        <Rule />

        {/* Abas */}
        <div
          role="tablist"
          aria-label="Serviços da Bluver"
          onKeyDown={onKey}
          className="grid grid-cols-6 gap-x-gutter gap-y-0 pt-2 lg:grid-cols-12"
        >
          {items.map((item, k) => {
            const on = k === i;
            return (
              <button
                key={item.key}
                role="tab"
                id={`tab-${item.key}`}
                aria-selected={on}
                aria-controls={`painel-${item.key}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setI(k)}
                className="col-span-3 border-t border-line pb-5 pt-5 text-left lg:col-span-3"
              >
                <span
                  aria-hidden
                  className={`block h-0.5 transition-opacity duration-400 ${on ? "opacity-100" : "opacity-0"}`}
                  style={{ background: "var(--bv-gradient)" }}
                />
                <span
                  className={`bv-numeral mt-5 block text-[0.75rem] tracking-[0.1em] transition-colors duration-300 ${
                    on ? "text-accent" : "text-fg-muted"
                  }`}
                >
                  {item.index}
                </span>
                <span
                  className={`bv-display mt-2.5 block text-[clamp(1rem,1.5vw,1.375rem)] leading-tight transition-colors duration-300 ${
                    on ? "text-fg" : "text-fg/45"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`mt-2 hidden text-[0.8125rem] leading-snug transition-opacity duration-300 lg:block ${
                    on ? "opacity-100 text-fg-muted" : "opacity-0"
                  }`}
                >
                  {item.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Painéis: todos existem no HTML, os inativos ficam com
            `hidden`. Sem JavaScript a página mostra o primeiro e os
            demais continuam presentes para leitor de tela e indexação. */}
        {items.map((item, k) => (
          <div
            key={item.key}
            role="tabpanel"
            id={`painel-${item.key}`}
            aria-labelledby={`tab-${item.key}`}
            hidden={k !== i}
            className="mt-[clamp(2.5rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-10 lg:grid-cols-12"
          >
            <div className="col-span-6 lg:col-span-5">
              <Media media={item.media} sizes="(max-width: 1024px) 100vw, 40vw" cinematic />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                <span className="bv-eyebrow block text-fg-muted">Faz mais sentido para</span>
                <span className="mt-2 block">{item.bestFor}</span>
              </p>
            </div>

            <div className="col-span-6 lg:col-span-6 lg:col-start-7">
              <p className="bv-display text-display-3 max-w-[18ch]">{item.thesis}</p>

              <div className="mt-[clamp(2rem,4vw,3rem)] border-t border-line pt-7">
                <h3 className="bv-display text-title max-w-[22ch]">{item.mistake.headline}</h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-fg-muted">{item.mistake.body}</p>
              </div>

              <div className="mt-[clamp(2rem,4vw,3rem)]">
                <Eyebrow as="h3">O que entra</Eyebrow>
                <ul className="mt-5">
                  {item.includes.map((x) => (
                    <li key={x} className="border-t border-line py-3 text-[0.9375rem] leading-snug text-fg/85">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              {item.note && (
                <p
                  className="mt-7 border-l-2 pl-4 text-[0.9375rem] leading-relaxed text-fg-muted"
                  style={{ borderColor: "var(--bv-signal)" }}
                >
                  {item.note}
                </p>
              )}

              <div className="mt-[clamp(2rem,4vw,3rem)]">
                <Action href={`/contato?interesse=${item.key}`} payload={{ location: `lp_servicos_${item.key}` }}>
                  {item.cta}
                </Action>
              </div>
            </div>
          </div>
        ))}

      </Shell>
    </Section>
  );
}
