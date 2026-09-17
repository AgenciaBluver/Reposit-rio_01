"use client";

import { useEffect, useRef, useState } from "react";
import { method } from "@/content/method";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { Media } from "@/components/primitives/Media";
import { ActionText } from "@/components/primitives/Action";

/* ════════════════════════════════════════════════════════════════════════
   MÉTODO
   `compact` (home): coluna fixa com a imagem trocando conforme a etapa
   entra na tela. O método é uma SEQUÊNCIA — a imagem única que se
   substitui mostra isso melhor do que cinco blocos soltos, e o leitor
   percebe que está avançando por um processo, não varrendo uma lista.
   Completa (/metodo): cada etapa abre seus desdobramentos.
   ════════════════════════════════════════════════════════════════════════ */
export function Method({
  compact = false,
  surface = "paper",
}: {
  compact?: boolean;
  surface?: "paper" | "ink";
}) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!compact) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const i = items.current.indexOf(best.target as HTMLLIElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    for (const el of items.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [compact]);

  return (
    <Section surface={surface} density="lg" id="metodo">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">O método</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Existe pensamento antes da execução.
          </h2>
        </div>

        {compact ? (
          <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
            {/* Coluna fixa: uma imagem só, que se substitui. */}
            <div className="col-span-6 hidden lg:col-span-5 lg:block">
              <div className="sticky top-[8rem]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {method.map((step, i) => (
                    <div
                      key={step.index}
                      aria-hidden={i !== active}
                      className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        i === active ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {step.media && (
                        <Media
                          media={{ ...step.media, ratio: "4:3" }}
                          sizes="40vw"
                          cinematic
                          className="h-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/* Trilha de etapas: o gradiente marca onde estamos. */}
                <ol className="mt-7 flex gap-2">
                  {method.map((step, i) => (
                    <li key={step.index} className="flex-1">
                      <span
                        aria-hidden
                        className={`block h-0.5 transition-opacity duration-500 ${
                          i === active ? "opacity-100" : "opacity-25"
                        }`}
                        style={{
                          background: i === active ? "var(--bv-gradient)" : "currentColor",
                        }}
                      />
                      <span
                        className={`bv-eyebrow mt-3 block transition-opacity duration-500 ${
                          i === active ? "opacity-100" : "opacity-40"
                        }`}
                      >
                        {step.index}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <ol className="col-span-6 lg:col-span-6 lg:col-start-7">
              {method.map((step, i) => (
                <li
                  key={step.index}
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  className="border-t border-line py-[clamp(2.25rem,5vw,4rem)] first:border-t-0 first:pt-0 lg:first:pt-[clamp(2rem,4vw,3rem)] lg:first:border-t"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      aria-hidden
                      className={`bv-numeral text-[0.8125rem] tracking-[0.1em] transition-colors duration-500 ${
                        i === active ? "text-accent" : "text-fg-muted"
                      }`}
                    >
                      {step.index}
                    </span>
                    <h3 className="bv-display text-title">{step.title}</h3>
                  </div>
                  <p className="mt-4 max-w-[40ch] leading-relaxed text-fg-muted">{step.body}</p>

                  {/* Mobile: a imagem acompanha a própria etapa. */}
                  {step.media && (
                    <div className="mt-6 lg:hidden">
                      <Media media={{ ...step.media, ratio: "4:3" }} sizes="100vw" cinematic />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <ol className="mt-[clamp(3.5rem,8vw,8rem)]">
            {method.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 60}>
                  <article className="grid grid-cols-6 items-start gap-x-gutter border-t border-line py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12">
                    <div className="col-span-6 lg:col-span-3">
                      <span aria-hidden className="bv-numeral block text-index text-fg/15">
                        {step.index}
                      </span>
                    </div>
                    <div className="col-span-6 mt-4 lg:col-span-4 lg:mt-2">
                      <h3 className="bv-display text-title">{step.title}</h3>
                      <p className="mt-4 max-w-[38ch] leading-relaxed text-fg-muted">{step.body}</p>
                    </div>
                    {step.detail && (
                      <ul className="col-span-6 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-2">
                        {step.detail.map((d) => (
                          <li
                            key={d}
                            className="border-b border-line/60 py-3 text-[0.9375rem] leading-snug text-fg/75 last:border-b-0"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        )}

        {compact && (
          <div className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-line pt-8">
            <ActionText href="/metodo" event="cta_click" payload={{ location: "method_home" }}>
              Ver o método completo
            </ActionText>
          </div>
        )}
      </Shell>
    </Section>
  );
}
