import type { Metadata } from "next";
import { Method } from "@/components/blocks/Method";
import { Thesis } from "@/components/blocks/Thesis";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Método Bluver — diagnóstico, direção, construção, distribuição e evolução",
  description:
    "O Sistema Bluver de Autoridade em cinco etapas: diagnóstico, direção, construção, distribuição e evolução. Pensamento antes da execução.",
  path: "/metodo",
});

/* A pré-produção é a prova concreta de que existe método — e é o que
   separa "temos câmera" de "temos direção". Por isso ganha seção própria. */
const preProduction = [
  "Estudo de mercado e estratégia antes do tático",
  "Roteiro, referências e moodboard quando necessário",
  "Direção de ambiente, enquadramento, vestimenta e linguagem",
  "Teleprompter ou condução adaptada ao perfil de quem aparece",
  "Planejamento de captação e de desdobramento do material",
];

export default function MethodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Método", path: "/metodo" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Método Bluver"
        headline={["Pensamos como", "estrategistas.", "Materializamos", "como criativos."]}
        sub="O diferencial não é ter câmera e gerir tráfego. É integrar pensamento, materialização e distribuição dentro da mesma direção — e conseguir sustentar isso ao longo do tempo."
        media={{
          src: null,
          alt: "Mesa de trabalho da Bluver com roteiro, referências impressas e anotações de direção.",
          ratio: "3:4",
          slot: "MÉTODO/HERO — Mesa de pré-produção real (vertical)",
        }}
        cta={{ label: ctas.positioning.label, href: ctas.positioning.href }}
      />

      <Thesis />
      <Method surface="ink" />

      <Section surface="paper" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">Pré-produção</Eyebrow>
            <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h2 className="bv-display max-w-[20ch] text-display-3">
                O trabalho que acontece antes da câmera ligar.
              </h2>
              <p className="bv-measure mt-[clamp(1.5rem,3vw,2.5rem)] text-lead leading-relaxed text-fg-muted">
                Equipamento de alta qualidade comprova estrutura, mas não é o produto. O produto é
                a percepção estratégica que essa estrutura ajuda a materializar.
              </p>
              <ul className="mt-[clamp(2rem,4vw,3rem)]">
                {preProduction.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-4 text-[1.0625rem] leading-snug text-fg/85"
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
        title="Todo trabalho começa pelo diagnóstico."
        body="Entender o negócio, o mercado, a oferta e a percepção atual — antes de propor qualquer produção."
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location="method_page"
      />
    </>
  );
}
