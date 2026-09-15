import { Media } from "@/components/primitives/Media";
import { Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";
import { Action } from "@/components/primitives/Action";
import type { Media as MediaType } from "@/content/types";

/* Hero reutilizável de páginas internas.
   O mesmo componente produz composições diferentes conforme `layout`:
   reutilização de código nunca deve virar repetição visual. */
export function PageHero({
  eyebrow,
  headline,
  sub,
  media,
  cta,
  surface = "paper",
  layout = "split",
}: {
  eyebrow: string;
  headline: readonly string[];
  sub: string;
  media: MediaType;
  cta?: { label: string; href: string };
  surface?: "paper" | "ink";
  /** split — texto à esquerda, imagem à direita (produtos).
   *  stack — texto grande em cima, imagem larga abaixo (segmentos). */
  layout?: "split" | "stack";
}) {
  const stack = layout === "stack";

  return (
    <section
      data-surface={surface}
      aria-labelledby="page-hero-titulo"
      className="relative overflow-hidden pt-[calc(4.5rem+clamp(2.5rem,6vw,5rem))] lg:pt-[calc(5.25rem+clamp(3rem,6vw,6rem))]"
    >
      <Shell>
        <div className="bv-grid">
          <div className={`col-span-6 ${stack ? "lg:col-span-10" : "lg:col-span-7"}`}>
            <div className="flex items-center gap-4">
              <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1
              id="page-hero-titulo"
              className={`bv-display mt-[clamp(1.5rem,3vw,2.5rem)] ${
                stack ? "text-display-2" : "text-display-2"
              }`}
            >
              {headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {!stack && (
            <div className="col-span-6 mt-[clamp(2.25rem,4vw,0rem)] lg:col-span-4 lg:col-start-9 lg:-mt-[clamp(0.5rem,2vw,2rem)]">
              <Media
                media={media}
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                cinematic
                ratioOverride="aspect-[4/3] lg:aspect-[3/4]"
              />
            </div>
          )}

          <div className="col-span-6 mt-[clamp(2rem,4vw,3rem)] lg:col-span-5">
            <p className="text-lead leading-relaxed text-fg/80">{sub}</p>
            {cta && (
              <div className="mt-[clamp(1.75rem,3vw,2.5rem)]">
                <Action href={cta.href} payload={{ location: "page_hero" }}>
                  {cta.label}
                </Action>
              </div>
            )}
          </div>
        </div>

        {stack && (
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <Media
              media={media}
              priority
              sizes="100vw"
              cinematic
              ratioOverride="aspect-[4/3] lg:aspect-[21/9]"
            />
          </div>
        )}
      </Shell>
    </section>
  );
}
