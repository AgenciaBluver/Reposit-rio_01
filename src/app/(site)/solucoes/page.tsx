import type { Metadata } from "next";
import { ProductIndex } from "@/components/blocks/ProductIndex";
import { Translation } from "@/components/blocks/Translation";
import { Method } from "@/components/blocks/Method";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Soluções — produção, eventos, mídia e sites",
  description:
    "Quatro frentes que resolvem o mesmo problema: produção de conteúdo recorrente, cobertura de eventos, mídia paga e criação de sites.",
  path: "/solucoes",
});

export default function SolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Soluções", path: "/solucoes" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Soluções"
        headline={["Quatro frentes.", "Uma direção."]}
        sub="Produção de conteúdo, cobertura de eventos, mídia paga e criação de sites. Não são serviços avulsos: são formas diferentes de resolver a mesma distância entre o que a empresa é e o que o mercado percebe."
        media={{
          src: null,
          alt: "Equipe da Bluver em reunião de direção, com material de projeto sobre a mesa.",
          ratio: "3:4",
          slot: "SOLUÇÕES/HERO — Reunião de direção (vertical)",
        }}
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
      />

      <ProductIndex surface="paper" />
      <Translation surface="ink" />
      <Method compact surface="paper" />

      <CtaBand
        title="Qual delas resolve o seu problema?"
        body="Se não estiver claro, a conversa de diagnóstico existe justamente para isso — entender antes de propor."
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location="solutions_index"
      />
    </>
  );
}
