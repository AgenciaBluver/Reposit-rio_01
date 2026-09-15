import { Action, ActionText } from "@/components/primitives/Action";
import { Media } from "@/components/primitives/Media";
import { Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";
import { site } from "@/content/site";
import type { Media as MediaType } from "@/content/types";

/* ════════════════════════════════════════════════════════════════════════
   HERO DA HOME
   Não é vídeo fullscreen. É composição: a headline ocupa a esquerda em
   escala máxima e a imagem entra pela direita, mais alta que a linha de
   base do texto e sangrando até o limite da tela. A última linha do título
   avança sobre a imagem — é o ponto onde tipografia e fotografia
   efetivamente se encontram, em vez de apenas dividirem a tela.
   ════════════════════════════════════════════════════════════════════════ */

const heroMedia: MediaType = {
  src: null,
  alt: "Equipe da Bluver em produção: direção acompanhando a captação em ambiente de cliente.",
  ratio: "3:4",
  slot: "HOME/HERO — Imagem principal: bastidor real de direção/captação (vertical)",
};

export function HomeHero() {
  return (
    <section
      data-surface="paper"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden pt-[calc(4.5rem+clamp(2.5rem,7vw,6rem))] lg:pt-[calc(5.25rem+clamp(3rem,7vw,7rem))]"
    >
      <Shell>
        <div className="bv-grid">
          {/* ── Bloco tipográfico ──────────────────────────────────── */}
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
            >
              <span className="block">Autoridade</span>
              <span className="block">que movimenta</span>
              {/* Linha que avança sobre a imagem no desktop. */}
              <span className="relative block">negócios.</span>
            </h1>
          </div>

          {/* ── Imagem ─────────────────────────────────────────────── */}
          <div className="col-span-6 mt-[clamp(2.25rem,4vw,0rem)] lg:col-span-4 lg:col-start-9 lg:-mt-[clamp(1rem,3vw,3rem)]">
            <Media
              media={heroMedia}
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              cinematic
              /* 4:3 no celular, retrato no desktop: o corte acompanha a
                 composição em vez de empurrar o CTA para fora da tela. */
              ratioOverride="aspect-[4/3] lg:aspect-[3/4]"
            />
          </div>

          {/* ── Subheadline e ações ────────────────────────────────── */}
          <div className="col-span-6 mt-[clamp(2.25rem,4vw,3rem)] lg:col-span-6">
            <p className="text-lead leading-relaxed text-fg/80">{site.description}</p>

            <div className="mt-[clamp(2rem,3.5vw,3rem)] flex flex-wrap items-center gap-x-8 gap-y-5">
              <Action href="/contato" payload={{ location: "hero" }}>
                Conversar sobre o seu posicionamento
              </Action>
              <ActionText href="/projetos" payload={{ location: "hero_secondary" }}>
                Conhecer nossos projetos
              </ActionText>
            </div>
          </div>

          {/* ── Essência: âncora conceitual da marca ───────────────── */}
          <div className="col-span-6 mt-[clamp(2.5rem,5vw,4rem)] self-end lg:col-span-3 lg:col-start-10">
            <p className="bv-serif text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.25] text-fg-muted">
              Tornar o valor
              <span className="block text-fg">visível.</span>
            </p>
          </div>
        </div>
      </Shell>

      {/* Régua de fechamento do hero — separa sem criar uma seção nova. */}
      <div className="mt-[clamp(3rem,6vw,6rem)]">
        <Shell>
          <hr className="bv-rule" />
        </Shell>
      </div>
    </section>
  );
}
