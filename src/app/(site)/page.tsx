import type { Metadata } from "next";
import { HomeHero } from "@/components/blocks/HomeHero";
import { Problem } from "@/components/blocks/Problem";
import { Thesis } from "@/components/blocks/Thesis";
import { Method } from "@/components/blocks/Method";
import { ProductIndex } from "@/components/blocks/ProductIndex";
import { Translation } from "@/components/blocks/Translation";
import { SegmentIndex } from "@/components/blocks/SegmentIndex";
import { CaseIndex } from "@/components/blocks/CaseIndex";
import { Leadership } from "@/components/blocks/Leadership";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.name} — ${site.signature}`,
    description: site.description,
    path: "/",
  }),
  // A home é a única página que não usa o template de título.
  title: { absolute: `${site.name} — ${site.signature}` },
};

/* ════════════════════════════════════════════════════════════════════════
   HOME — função: MARCA.
   Não abre apresentando serviços. Abre construindo percepção.

   Ritmo de superfícies (claro/escuro) desenhado para alternar densidade e
   respiro, nunca para decorar:
     hero claro · problema escuro · tese clara · método escuro
     soluções clara · significado escuro · segmentos claro
     projetos escuro · lideranças clara
   O rodapé (escuro) fecha com a pergunta e o CTA — por isso a home não
   repete uma faixa de conversão antes dele.
   ════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Problem />
      <Thesis />
      <Method compact surface="ink" />
      <ProductIndex surface="paper" />
      <Translation surface="ink" />
      <SegmentIndex surface="paper" />
      <CaseIndex surface="ink" limit={2} />
      <Leadership surface="paper" />
    </>
  );
}
