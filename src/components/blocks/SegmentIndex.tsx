import Link from "next/link";
import { segments } from "@/content/segments";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Reveal } from "@/components/primitives/Reveal";

/* SEGMENTOS — função de identificação.
   Cada bloco lidera pela TESE do setor, não pelo nome do setor: é a frase
   que faz o visitante se reconhecer antes de ler o rótulo. */
export function SegmentIndex({ surface = "paper" }: { surface?: "paper" | "ink" }) {
  return (
    <Section surface={surface} density="lg" id="segmentos">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">Os segmentos</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[22ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Cada mercado convence de um jeito diferente.
          </h2>
        </div>

        <ul className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-6 gap-x-gutter gap-y-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
          {segments.map((segment, i) => (
            <li
              key={segment.slug}
              className={`col-span-6 lg:col-span-4 ${i === 1 ? "lg:mt-[clamp(2rem,5vw,5rem)]" : ""}`}
            >
              <Reveal delay={i * 70}>
                <Link href={`/segmentos/${segment.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <Media
                      media={{ ...segment.hero.media, ratio: "4:3" }}
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      cinematic
                      className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="bv-display mt-7 text-title">{segment.name}</h3>
                  <p className="bv-serif mt-4 text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-snug text-fg-muted">
                    {segment.thesis}
                  </p>
                  <span className="mt-6 inline-block border-b border-fg/25 pb-1 text-[0.875rem] font-medium transition-colors group-hover:border-fg">
                    Ver o segmento
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
