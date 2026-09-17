"use client";

import Link from "next/link";
import { useState } from "react";
import { landings } from "@/content/landings";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Magnetic } from "@/components/primitives/Magnetic";
import { track } from "@/lib/analytics";

/* ════════════════════════════════════════════════════════════════════════
   SELETOR DE REALIDADE
   A porta da home para as landing pages. Em vez de três cards com nome de
   setor, o visitante escolhe pela FRASE que ele já disse sobre o próprio
   negócio. Quem se reconhece na frase chega na LP já convencido de que o
   assunto é sobre ele.

   Passar o ponteiro troca a imagem e o texto no lugar; clicar leva à LP.
   No mobile, sem ponteiro, tocar seleciona e o segundo toque navega, por
   isso o link envolve todo o bloco e o teclado percorre os três normais.
   ════════════════════════════════════════════════════════════════════════ */
export function SegmentSelector() {
  const [active, setActive] = useState(0);
  const current = landings[active];

  return (
    <Section surface="ink" density="lg" id="segmentos">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">Onde você está</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Qual dessas frases você já disse?
          </h2>
        </div>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-6 gap-x-gutter gap-y-10 lg:grid-cols-12">
          {/* Lista de reconhecimento */}
          <ul className="col-span-6 lg:col-span-7">
            {landings.map((l, i) => {
              const on = i === active;
              return (
                <li key={l.slug} className="border-t border-line last:border-b">
                  <Link
                    href={`/lp/${l.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() =>
                      track("view_segment", {
                        item_id: l.slug,
                        item_name: l.label,
                        location: "home_selector",
                      })
                    }
                    className="group block py-[clamp(1.5rem,3vw,2.5rem)]"
                  >
                    <div className="flex items-start gap-5">
                      <span
                        aria-hidden
                        className={`mt-3 block h-px shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          on ? "w-12" : "w-4 opacity-40"
                        }`}
                        style={{ background: on ? "var(--bv-gradient)" : "currentColor" }}
                      />
                      <div>
                        <p
                          className={`bv-display max-w-[24ch] text-[clamp(1.25rem,2.6vw,2.125rem)] leading-tight transition-colors duration-400 ${
                            on ? "text-fg" : "text-fg/40"
                          }`}
                        >
                          {l.recognition}
                        </p>
                        <p
                          className={`mt-3 text-[0.875rem] transition-opacity duration-400 ${
                            on ? "opacity-100 text-fg-muted" : "opacity-0 lg:opacity-0"
                          }`}
                        >
                          {l.label} · {l.audience}
                        </p>
                      </div>
                    </div>

                    {/* Mobile: a imagem acompanha o item, sem depender de hover. */}
                    <div className="mt-6 lg:hidden">
                      <Media media={{ ...l.hero.media, ratio: "16:9" }} sizes="100vw" cinematic />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Painel que responde à escolha */}
          <div className="col-span-6 hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-[8rem]">
              <div className="relative aspect-[3/4] overflow-hidden">
                {landings.map((l, i) => (
                  <div
                    key={l.slug}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Media
                      media={{ ...l.hero.media, ratio: "3:4" }}
                      sizes="32vw"
                      cinematic
                      className="h-full"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-7 text-[0.9375rem] leading-relaxed text-fg-muted">
                {current.audience}
              </p>

              <div className="mt-7">
                <Magnetic>
                  <Link
                    href={`/lp/${current.slug}`}
                    onClick={() =>
                      track("cta_click", {
                        item_id: current.slug,
                        location: "home_selector_cta",
                      })
                    }
                    className="inline-flex items-center gap-3 bg-action px-6 py-3.5 text-[0.9375rem] font-medium text-on-action"
                  >
                    Ver como resolvemos isso
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 8h13M9 3l5 5-5 5" />
                    </svg>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
