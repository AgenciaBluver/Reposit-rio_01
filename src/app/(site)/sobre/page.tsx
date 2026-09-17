import type { Metadata } from "next";
import { Leadership } from "@/components/blocks/Leadership";
import { Thesis } from "@/components/blocks/Thesis";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/blocks/PageHero";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas, site, disclaimer } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a Bluver — autoridade e crescimento para negócios de alto valor",
  description:
    "A Bluver é uma empresa de autoridade e crescimento para negócios de alto valor. Base em Joinville, atuação nacional.",
  path: "/sobre",
});

/* Quem serve e quem não serve. Dizer para quem NÃO é aumenta a
   credibilidade de tudo que vem antes — e qualifica o lead antes do
   formulário. Conteúdo do documento mestre, seção 02. */
const fit = {
  yes: [
    "Possui valor real: repertório, estrutura, conhecimento ou reputação",
    "Vende algo com ticket e margem compatíveis com investimento em posicionamento",
    "Entende que autoridade é construída no médio e longo prazo",
    "Valoriza estratégia e qualidade, não apenas quantidade",
    "Tem mentalidade empresarial e capacidade de atendimento comercial",
  ],
  no: [
    "Procura apenas preço, pacote de posts ou execução barata",
    "Espera retorno imediato sem estrutura comercial",
    "Não valoriza estratégia, processo ou qualidade",
    "Exige retrabalho desproporcional por ego ou microgestão",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Sobre", path: "/sobre" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Sobre a Bluver"
        headline={["Uma empresa de", "autoridade e crescimento", "para negócios", "de alto valor."]}
        sub="Existimos para reduzir a distância entre o valor real de um negócio e a forma como ele é percebido pelo mercado. Base em Joinville, atuação nacional."
        media={{
          src: null,
          alt: "Equipe da Bluver trabalhando no escritório em Joinville.",
          ratio: "3:4",
          slot: "SOBRE/HERO — Equipe/escritório real da Bluver (vertical)",
      preview: "https://t3.ftcdn.net/jpg/02/80/84/60/1000_F_280846031_1dCzkNKW1pjIFaB8RFlJiqpbDQSgb2HS.jpg",
        }}
        cta={{ label: ctas.talk.label, href: ctas.talk.href }}
      />

      {/* ── Essência ─────────────────────────────────────────────── */}
      <Section surface="ink" density="lg">
        <Shell>
          <span aria-hidden className="bv-rule-signal block w-24" />
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-6 gap-x-gutter gap-y-10 lg:grid-cols-12">
            <div className="col-span-6 lg:col-span-7">
              <Eyebrow>Essência</Eyebrow>
              <p className="bv-display mt-6 text-display-2">
                Tornar o valor <span className="bv-gradient-text">visível.</span>
              </p>
            </div>
            <div className="col-span-6 flex items-end lg:col-span-4 lg:col-start-9">
              <p className="text-lead leading-relaxed text-fg-muted">
                {site.essence.replace("Tornar o valor visível.", "").trim() ||
                  "Reduzir a distância entre o valor real de um negócio e a forma como ele é percebido pelo mercado."}
              </p>
            </div>
          </div>
        </Shell>
      </Section>

      <Thesis />
      <Leadership surface="ink" />

      {/* ── Para quem é, e para quem não é ───────────────────────── */}
      <Section surface="paper" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">Critério</Eyebrow>
            <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
              Um bom trabalho começa por um bom encaixe.
            </h2>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-12 lg:grid-cols-12">
            <div className="col-span-6 lg:col-span-5">
              <Eyebrow as="h3">Trabalhamos bem com quem</Eyebrow>
              <ul className="mt-5">
                {fit.yes.map((item, i) => (
                  <li key={item} className="border-t border-line">
                    <Reveal delay={i * 40}>
                      <p className="py-4 text-[1.0625rem] leading-snug text-fg/85">{item}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 lg:col-span-5 lg:col-start-8">
              <Eyebrow as="h3">Provavelmente não somos a escolha certa se</Eyebrow>
              <ul className="mt-5">
                {fit.no.map((item, i) => (
                  <li key={item} className="border-t border-line">
                    <Reveal delay={i * 40}>
                      <p className="py-4 text-[1.0625rem] leading-snug text-fg-muted">{item}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="bv-measure mt-[clamp(2.5rem,5vw,4rem)] border-t border-line pt-8 text-[0.9375rem] leading-relaxed text-fg-muted">
            {disclaimer}
          </p>
        </Shell>
      </Section>

      <CtaBand
        title="Vamos entender o seu contexto."
        body="A primeira conversa não é uma apresentação comercial. É um diagnóstico do que o mercado enxerga hoje sobre a sua empresa."
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location="about_page"
      />
    </>
  );
}
