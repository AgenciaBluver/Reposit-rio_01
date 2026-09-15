import type { Metadata } from "next";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { ContactChannels } from "@/components/blocks/ContactChannels";

export const metadata: Metadata = buildMetadata({
  title: "Contato — apresente seu desafio",
  description:
    "Fale com a Bluver. A primeira conversa é de diagnóstico: entender o negócio e a distância entre o valor real e a percepção do mercado.",
  path: "/contato",
});

/* O que acontece depois do envio. Reduz a ansiedade de quem preenche e
   já demonstra o método — a própria página de contato prova o processo. */
const nextSteps = [
  { index: "01", title: "Estudamos o contexto", body: "Antes de responder, lemos o que você enviou e olhamos como sua empresa aparece hoje." },
  { index: "02", title: "Conversa de diagnóstico", body: "Uma conversa sobre negócio e percepção. Sem apresentação comercial padrão." },
  { index: "03", title: "Direção recomendada", body: "Apresentamos a direção que faz sentido — e só depois o escopo e o investimento." },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Contato", path: "/contato" },
            ]),
          ),
        }}
      />

      <Section
        surface="paper"
        density="sm"
        className="pt-[calc(4.5rem+clamp(2.5rem,6vw,5rem))] lg:pt-[calc(5.25rem+clamp(3rem,6vw,6rem))]"
      >
        <Shell>
          <div className="bv-grid">
            {/* ── Coluna esquerda: contexto ────────────────────── */}
            <div className="col-span-6 lg:col-span-5">
              <div className="flex items-center gap-4">
                <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
                <Eyebrow>Contato</Eyebrow>
              </div>

              <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] text-display-2">
                Apresente
                <span className="block">seu desafio.</span>
              </h1>

              <p className="mt-8 max-w-[40ch] text-lead leading-relaxed text-fg/80">
                Não é um orçamento automático. É o começo de um diagnóstico — por isso
                perguntamos sobre o negócio antes de falar sobre entrega.
              </p>

              <div className="mt-[clamp(3rem,6vw,5rem)]">
                <Rule />
                <ol className="mt-8">
                  {nextSteps.map((step) => (
                    <li key={step.index} className="border-b border-line py-5">
                      <div className="flex gap-5">
                        <span
                          aria-hidden
                          className="bv-numeral pt-1 text-[0.75rem] tracking-[0.1em] text-fg-muted"
                        >
                          {step.index}
                        </span>
                        <div>
                          <h2 className="bv-display text-[1.0625rem]">{step.title}</h2>
                          <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-fg-muted">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10">
                <ContactChannels />
                <address className="mt-8 not-italic text-[0.9375rem] leading-relaxed text-fg-muted">
                  {site.base}
                  <br />
                  {site.reach}
                </address>
              </div>
            </div>

            {/* ── Coluna direita: formulário ───────────────────── */}
            <div className="col-span-6 mt-[clamp(3.5rem,7vw,0rem)] lg:col-span-6 lg:col-start-7">
              <ContactForm />
            </div>
          </div>
        </Shell>
      </Section>
    </>
  );
}
