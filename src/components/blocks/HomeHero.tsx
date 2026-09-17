"use client";

import { useState } from "react";
import { Action, ActionText } from "@/components/primitives/Action";
import { Media } from "@/components/primitives/Media";
import { Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";
import { Magnetic } from "@/components/primitives/Magnetic";
import { site } from "@/content/site";
import type { Media as MediaType } from "@/content/types";

/* ════════════════════════════════════════════════════════════════════════
   HERO DA HOME
   Composição editorial, não vídeo fullscreen: a headline ocupa a esquerda
   em escala máxima e a imagem entra pela direita.

   A interação: cada palavra da assinatura troca a fotografia ao lado.
   AUTORIDADE mostra direção, MOVIMENTA mostra produção, NEGÓCIOS mostra
   a reunião. É a frase da marca sendo demonstrada em imagem enquanto se
   lê, e é o primeiro sinal de que o site responde a quem está nele.

   Sem ponteiro, a primeira imagem fica e o hero funciona igual.
   ════════════════════════════════════════════════════════════════════════ */

const camadas: { palavra: string; media: MediaType }[] = [
  {
    palavra: "Autoridade",
    media: {
      src: null,
      alt: "Direção de fotografia conduzindo uma captação, câmera em primeiro plano.",
      ratio: "3:4",
      slot: "HOME/HERO, direção",
      preview:
        "https://t3.ftcdn.net/jpg/04/00/26/10/1000_F_400261057_x8kvCSM5oSZ3MMhL5hItFyfoaVRAbLHP.jpg",
    },
  },
  {
    palavra: "que movimenta",
    media: {
      src: null,
      alt: "Centro de usinagem em operação, detalhe do processo produtivo.",
      ratio: "3:4",
      slot: "HOME/HERO, produção",
      preview:
        "https://t4.ftcdn.net/jpg/05/78/31/89/1000_F_578318978_WTnZMEnr4hudQnTlwKfeILwM0S88Bp3j.jpg",
    },
  },
  {
    palavra: "negócios.",
    media: {
      src: null,
      alt: "Equipe em reunião de estratégia num escritório com luz natural.",
      ratio: "3:4",
      slot: "HOME/HERO, negócio",
      preview:
        "https://t3.ftcdn.net/jpg/02/12/34/24/1000_F_212342499_FZA9KbUcE8C16eQOiXXKdEx1xlID0YY6.jpg",
    },
  },
];

export function HomeHero() {
  const [ativo, setAtivo] = useState(0);

  return (
    <section
      data-surface="paper"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden pt-[calc(4.5rem+clamp(2.5rem,7vw,6rem))] lg:pt-[calc(5.25rem+clamp(3rem,7vw,7rem))]"
    >
      <Shell>
        <div className="bv-grid">
          <div className="relative z-10 col-span-6 lg:col-span-8">
            <div className="flex items-center gap-4">
              <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
              <Eyebrow>
                {site.base.split(",")[0]} · {site.reach}
              </Eyebrow>
            </div>

            <h1
              id="hero-titulo"
              className="bv-display mt-[clamp(1.75rem,3.5vw,3rem)] text-display-1"
              onMouseLeave={() => setAtivo(0)}
            >
              {camadas.map((c, i) => (
                <span
                  key={c.palavra}
                  onMouseEnter={() => setAtivo(i)}
                  className={`block w-fit cursor-default transition-opacity duration-500 ${
                    ativo === i ? "opacity-100" : "opacity-45"
                  }`}
                >
                  {c.palavra}
                </span>
              ))}
            </h1>
          </div>

          {/* A imagem responde à palavra em foco. */}
          <div className="col-span-6 mt-[clamp(2.25rem,4vw,0rem)] lg:col-span-4 lg:col-start-9 lg:-mt-[clamp(1rem,3vw,3rem)]">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
              {camadas.map((c, i) => (
                <div
                  key={c.palavra}
                  aria-hidden={i !== ativo}
                  className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === ativo ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Media
                    media={c.media}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    cinematic
                    ratioOverride="aspect-[4/3] lg:aspect-[3/4]"
                  />
                </div>
              ))}

              {/* Marcador de qual palavra está acesa. */}
              <ol
                aria-hidden
                className="absolute bottom-4 left-4 right-4 z-10 flex gap-1.5"
              >
                {camadas.map((c, i) => (
                  <li key={c.palavra} className="h-0.5 flex-1 bg-paper-pure/25">
                    <span
                      className={`block h-full origin-left transition-transform duration-500 ${
                        i === ativo ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ background: "var(--bv-gradient)" }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-6 mt-[clamp(2.25rem,4vw,3rem)] lg:col-span-6">
            <p className="text-lead leading-relaxed text-fg/80">{site.description}</p>

            <div className="mt-[clamp(2rem,3.5vw,3rem)] flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <Action href="/contato" payload={{ location: "hero" }}>
                  Conversar sobre o seu posicionamento
                </Action>
              </Magnetic>
              <ActionText href="/projetos" payload={{ location: "hero_secondary" }}>
                Conhecer nossos projetos
              </ActionText>
            </div>
          </div>

          <div className="col-span-6 mt-[clamp(2.5rem,5vw,4rem)] self-end lg:col-span-3 lg:col-start-10">
            <p className="bv-serif text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.25] text-fg-muted">
              Tornar o valor
              <span className="block text-fg">visível.</span>
            </p>
          </div>
        </div>
      </Shell>

      <div className="mt-[clamp(3rem,6vw,6rem)]">
        <Shell>
          <hr className="bv-rule" />
        </Shell>
      </div>
    </section>
  );
}
