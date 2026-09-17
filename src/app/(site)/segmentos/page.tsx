import type { Metadata } from "next";
import { SegmentIndex } from "@/components/blocks/SegmentIndex";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Segmentos — indústrias, advocacia e mercado imobiliário",
  description:
    "Como a Bluver trabalha posicionamento e presença em indústrias, escritórios de advocacia e serviços profissionais, construtoras, incorporadoras e imobiliárias.",
  path: "/segmentos",
});

/* Perfis citados no documento mestre que ainda não têm página própria.
   Aparecem aqui como sinal honesto de atuação — sem criar rota vazia. */
const alsoServed = [
  "Médicos, clínicas e profissionais da saúde",
  "Escritórios contábeis",
  "Especialistas, professores e produtos intelectuais",
  "Empresas B2B e negócios técnicos",
];

export default function SegmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Segmentos", path: "/segmentos" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Segmentos"
        headline={["O nicho não é", "uma profissão.", "É um tipo", "de decisão."]}
        sub="A Bluver trabalha com negócios de alto valor, alta confiança e decisão complexa. O setor muda o vocabulário e o canal — não muda a lógica da construção de autoridade."
        media={{
          src: null,
          alt: "Ambiente empresarial de cliente da Bluver registrado em luz natural.",
          ratio: "3:4",
          slot: "SEGMENTOS/HERO — Ambiente empresarial real (vertical)",
      preview: "https://t3.ftcdn.net/jpg/05/01/67/28/1000_F_501672880_moCm9LrdfE7BppTdjYybYOncrCYVrAWO.jpg",
        }}
        cta={{ label: ctas.positioning.label, href: ctas.positioning.href }}
      />

      <SegmentIndex surface="paper" />

      <Section surface="ink" density="md">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">Também atendemos</Eyebrow>
            <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h2 className="bv-display max-w-[22ch] text-display-3">
                Nem todo segmento tem página. Todos têm método.
              </h2>
              <ul className="mt-[clamp(2rem,4vw,3rem)]">
                {alsoServed.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-4 text-lead leading-snug text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Shell>
      </Section>

      <CtaBand
        title="Seu setor não está na lista?"
        body="A lógica é a mesma: entender como a decisão acontece no seu mercado e construir a percepção que a sustenta."
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location="segments_index"
      />
    </>
  );
}
