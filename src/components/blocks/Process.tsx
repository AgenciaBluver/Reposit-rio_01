import type { ProcessStep } from "@/content/types";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";

/* PROCESSO — duas leituras possíveis a partir do mesmo dado:
   `flow`  → cadeia vertical (posicionamento → criativo → página → mídia),
             usada quando a ORDEM é o argumento.
   `stages`→ etapas com desdobramento, usada quando o CONTEÚDO de cada
             etapa é o argumento. */
export function Process({
  steps,
  eyebrow = "O processo",
  title,
  variant = "stages",
  surface = "ink",
}: {
  steps: ProcessStep[];
  eyebrow?: string;
  title: string;
  variant?: "stages" | "flow";
  surface?: "paper" | "ink" | "deep";
}) {
  return (
    <Section surface={surface} density="lg">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">{eyebrow}</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {title}
          </h2>
        </div>

        {variant === "flow" ? (
          <ol className="mt-[clamp(3rem,7vw,6rem)]">
            {steps.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 50}>
                  <div className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-[clamp(1.5rem,3vw,2.25rem)] lg:grid-cols-12">
                    <span
                      aria-hidden
                      className="bv-numeral col-span-1 text-[0.8125rem] tracking-[0.1em] text-fg-muted"
                    >
                      {step.index}
                    </span>
                    <h3 className="bv-display col-span-5 text-[clamp(1.375rem,3vw,2.5rem)] leading-tight lg:col-span-5">
                      {step.title}
                    </h3>
                    <p className="col-span-6 mt-3 leading-relaxed text-fg-muted lg:col-span-5 lg:col-start-8 lg:mt-0">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
            <Rule />
          </ol>
        ) : (
          <ol className="mt-[clamp(3rem,7vw,6rem)]">
            {steps.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 50}>
                  <article className="grid grid-cols-6 items-start gap-x-gutter border-t border-line py-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-12">
                    <div className="col-span-6 lg:col-span-4">
                      <span aria-hidden className="bv-numeral block text-index text-fg/12">
                        {step.index}
                      </span>
                      <h3 className="bv-display mt-3 text-title">{step.title}</h3>
                    </div>
                    <p className="col-span-6 mt-4 leading-relaxed text-fg-muted lg:col-span-4 lg:mt-3">
                      {step.body}
                    </p>
                    {step.detail && (
                      <ul className="col-span-6 mt-5 lg:col-span-3 lg:col-start-10 lg:mt-3">
                        {step.detail.map((d) => (
                          <li
                            key={d}
                            className="border-b border-line/60 py-2.5 text-[0.875rem] leading-snug text-fg/70 last:border-b-0"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
            <Rule />
          </ol>
        )}
      </Shell>
    </Section>
  );
}
