import type { Metadata } from "next";
import { CaseIndex } from "@/components/blocks/CaseIndex";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Projetos, cases com contexto, direção e impacto",
  description:
    "Projetos da Bluver apresentados pelo raciocínio: contexto, problema de percepção, diagnóstico, direção, criação, distribuição e impacto.",
  path: "/projetos",
});

/* O framework de case é exibido explicitamente. Mostrar o critério antes
   dos cases é, em si, uma prova de método — e prepara o leitor para ler
   raciocínio em vez de portfólio. */
const framework = [
  { step: "Contexto", body: "Onde o negócio estava e o que já funcionava." },
  { step: "Problema", body: "A distância entre o valor real e a percepção do mercado." },
  { step: "Diagnóstico", body: "O que a leitura do negócio revelou." },
  { step: "Direção", body: "A posição escolhida e o que foi recusado." },
  { step: "Criação", body: "Os ativos produzidos para materializar a posição." },
  { step: "Distribuição", body: "Como o material entrou em circulação." },
  { step: "Impacto", body: "O que foi alcançado, separando objetivo de evidência." },
];

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Projetos", path: "/projetos" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Projetos"
        headline={["Portfólio mostra", "o que ficou pronto.", "Case mostra", "por que ficou assim."]}
        sub="Cada projeto é apresentado pelo raciocínio que o originou. Quando não existe dado financeiro comprovado, dizemos isso, e mostramos a evolução de posicionamento, linguagem e estrutura."
        media={{
          src: null,
          alt: "Seleção de materiais produzidos pela Bluver para clientes.",
          ratio: "3:4",
          slot: "PROJETOS/HERO, Composição de materiais entregues (vertical)",
      preview: "https://t3.ftcdn.net/jpg/04/81/85/88/1000_F_481858837_URWKagvAasR8JEs8SF0njjDNMkabn89d.jpg",
        }}
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
      />

      <Section surface="ink" density="md">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">Como lemos um case</Eyebrow>
            <ol className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              {framework.map((item, i) => (
                <li
                  key={item.step}
                  className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-4 lg:grid-cols-8"
                >
                  <span
                    aria-hidden
                    className="bv-numeral col-span-1 text-[0.75rem] tracking-[0.1em] text-fg-muted"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="bv-display col-span-5 text-[1.125rem] lg:col-span-2">
                    {item.step}
                  </h3>
                  <p className="col-span-6 mt-1 text-[0.9375rem] leading-snug text-fg-muted lg:col-span-5 lg:mt-0">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </Section>

      <CaseIndex surface="paper" showLink={false} />

      <CtaBand
        title="O próximo case pode ser o seu."
        body="Conte o contexto do seu negócio. Começamos entendendo antes de propor."
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location="projects_index"
      />
    </>
  );
}
