import { method } from "@/content/method";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { Media } from "@/components/primitives/Media";
import { ActionText } from "@/components/primitives/Action";

/* MÉTODO — linha vertical com numerais grandes.
   `compact` é usado na home (resumo); a versão completa vive em /metodo. */
export function Method({
  compact = false,
  surface = "paper",
}: {
  compact?: boolean;
  surface?: "paper" | "ink";
}) {
  return (
    <Section surface={surface} density="lg" id="metodo">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">O método</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Existe pensamento antes da execução.
          </h2>
        </div>

        <ol className="mt-[clamp(3.5rem,8vw,8rem)]">
          {method.map((step, i) => (
            <li key={step.index}>
              <Reveal delay={i * 60}>
                <article className="grid grid-cols-6 items-start gap-x-gutter border-t border-line py-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12">
                  {/* Numeral gigante — o elemento que dá escala editorial. */}
                  <div className="col-span-6 lg:col-span-3">
                    <span aria-hidden className="bv-numeral block text-index text-fg/15">
                      {step.index}
                    </span>
                  </div>

                  <div className="col-span-6 mt-4 lg:col-span-4 lg:mt-2">
                    <h3 className="bv-display text-title">{step.title}</h3>
                    <p className="mt-4 max-w-[38ch] leading-relaxed text-fg-muted">{step.body}</p>
                  </div>

                  {!compact && step.detail && (
                    <ul className="col-span-6 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-2">
                      {step.detail.map((d) => (
                        <li
                          key={d}
                          className="border-b border-line/60 py-3 text-[0.9375rem] leading-snug text-fg/75 last:border-b-0"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}

                  {compact && step.media && (
                    <div className="col-span-6 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
                      <Media
                        media={step.media}
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        cinematic
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        {compact && (
          <div className="border-t border-line pt-8">
            <ActionText href="/metodo" event="cta_click" payload={{ location: "method_home" }}>
              Ver o método completo
            </ActionText>
          </div>
        )}
      </Shell>
    </Section>
  );
}
