import { translation, disclaimer } from "@/content/site";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";

/* ════════════════════════════════════════════════════════════════════════
   O QUE ESTÁ SENDO COMPRADO
   O site não pode terminar como lista de entregáveis. Esta seção traduz
   cada item comprável no significado que ele produz — e é ela que separa
   "contratamos vídeos" de "contratamos presença coerente".
   O mesmo desenho de duas colunas usado na seção de problema: o sistema
   se repete porque o raciocínio é o mesmo, invertido.
   ════════════════════════════════════════════════════════════════════════ */
export function Translation({ surface = "ink" }: { surface?: "paper" | "ink" }) {
  return (
    <Section surface={surface} density="lg">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">O que está sendo comprado</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Ninguém contrata um vídeo. Contrata o que ele provoca.
          </h2>
        </div>

        <dl className="mt-[clamp(3rem,7vw,6rem)]">
          {translation.map((row, i) => (
            <div key={row.deliverable}>
              <Reveal delay={i * 45}>
                <div className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-[clamp(1.25rem,2.5vw,1.75rem)] lg:grid-cols-12">
                  <dt className="bv-display col-span-6 text-[clamp(1.125rem,2vw,1.625rem)] leading-tight lg:col-span-3">
                    {row.deliverable}
                  </dt>
                  <dd className="bv-serif col-span-6 mt-2 text-lead leading-snug text-fg-muted lg:col-span-8 lg:col-start-5 lg:mt-0">
                    {row.meaning}
                  </dd>
                </div>
              </Reveal>
            </div>
          ))}
        </dl>
        <Rule />

        {/* Ressalva institucional — reduz risco em vez de prometer. */}
        <p className="bv-measure mt-[clamp(2rem,4vw,3rem)] text-[0.9375rem] leading-relaxed text-fg-muted">
          {disclaimer}
        </p>
      </Shell>
    </Section>
  );
}
