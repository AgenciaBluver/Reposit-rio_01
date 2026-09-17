import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/blocks/HomeHero";
import { GapSlider } from "@/components/blocks/GapSlider";
import { Questions } from "@/components/blocks/Questions";
import { Thesis } from "@/components/blocks/Thesis";
import { Method } from "@/components/blocks/Method";
import { SegmentSelector } from "@/components/blocks/SegmentSelector";
import { Leadership } from "@/components/blocks/Leadership";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Magnetic } from "@/components/primitives/Magnetic";
import { products } from "@/content/products";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name}, ${site.signature}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.signature}` },
};

/* ════════════════════════════════════════════════════════════════════════
   HOME, função: MARCA.
   Enxuta de propósito. O trabalho comercial pesado (dores, escopo, preço,
   prova) mora nas landing pages; aqui a home só precisa fazer três
   coisas: mostrar a tese, provar que existe método e levar a pessoa para
   a porta certa.

   Ritmo de superfícies:
     hero claro · distância escura · tese clara · método escuro
     seletor escuro (invertido pelo próprio bloco) · serviços claro
     lideranças clara
   O rodapé escuro fecha com a pergunta e o CTA.
   ════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* A tese da casa, em forma de alavanca: o visitante arrasta e
          descobre a distância sozinho, antes de ler qualquer explicação. */}
      <GapSlider />

      <Thesis />

      {/* O device comercial da home: perguntas que o visitante já se fez
          sozinho. Passar o ponteiro apaga as outras e revela a observação. */}
      <Questions />

      <Method compact surface="paper" />

      {/* A porta para as landing pages: escolha pela frase, não pelo setor. */}
      <SegmentSelector />

      {/* Serviços aparecem só como índice. A página deles é a LP. */}
      <Section surface="paper" density="md" id="solucoes">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">O que fazemos</Eyebrow>
            <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h2 className="bv-display max-w-[20ch] text-display-3">
                Quatro frentes, uma direção.
              </h2>

              <ul className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap gap-x-3 gap-y-3">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/solucoes/${p.slug}`}
                      className="group inline-flex items-baseline gap-2.5 border border-line px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 hover:border-action hover:text-action"
                    >
                      <span aria-hidden className="bv-numeral text-[0.6875rem] tracking-[0.1em] text-fg-muted">
                        {p.index}
                      </span>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-[clamp(2rem,4vw,3rem)]">
                <Magnetic>
                  <Link
                    href="/lp/servicos"
                    className="inline-flex items-center gap-3 bg-action px-6 py-3.5 text-[0.9375rem] font-medium text-on-action"
                  >
                    Ver os serviços em detalhe
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

      <Leadership surface="paper" />
    </>
  );
}
