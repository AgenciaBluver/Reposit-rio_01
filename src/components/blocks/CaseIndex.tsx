import Link from "next/link";
import { cases } from "@/content/cases";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionText } from "@/components/primitives/Action";

/* PROJETOS — pré-visualização.
   Cases com `status: "placeholder"` são exibidos com a marcação honesta
   "em produção". Não há dado, número ou depoimento inventado. */
export function CaseIndex({
  surface = "ink",
  limit,
  showLink = true,
  filterBy,
}: {
  surface?: "paper" | "ink";
  limit?: number;
  showLink?: boolean;
  /** Filtra por produto ou segmento — alimenta o internal linking. */
  filterBy?: { product?: string; segment?: string };
}) {
  let list = cases;
  if (filterBy?.product) list = list.filter((c) => c.products.includes(filterBy.product!));
  if (filterBy?.segment) list = list.filter((c) => c.segments.includes(filterBy.segment!));
  if (limit) list = list.slice(0, limit);
  if (list.length === 0) return null;

  return (
    <Section surface={surface} density="lg" id="projetos">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">Projetos</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[22ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Contexto, decisão e consequência.
          </h2>
        </div>

        <ul className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-6 gap-x-gutter gap-y-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
          {list.map((item, i) => (
            <li key={item.slug} className="col-span-6">
              <Reveal delay={i * 70}>
                <Link href={`/projetos/${item.slug}`} className="group block">
                  <div className="grid grid-cols-6 items-end gap-x-gutter lg:grid-cols-12">
                    <div className="col-span-6 overflow-hidden lg:col-span-7">
                      <Media
                        media={item.cover}
                        sizes="(max-width: 1024px) 100vw, 56vw"
                        cinematic
                        className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="col-span-6 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
                      <div className="flex items-center gap-3">
                        <Eyebrow as="span">{item.sector}</Eyebrow>
                        {item.status === "placeholder" && (
                          <span className="bv-eyebrow border border-line px-2 py-1 text-fg-muted">
                            Em produção
                          </span>
                        )}
                      </div>
                      <h3 className="bv-display mt-4 text-title">{item.client}</h3>
                      <p className="bv-serif mt-3 text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-snug text-fg-muted">
                        {item.headline}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {showLink && (
          <div className="mt-[clamp(3rem,5vw,4rem)] border-t border-line pt-8">
            <ActionText href="/projetos" payload={{ location: "case_index" }}>
              Ver todos os projetos
            </ActionText>
          </div>
        )}
      </Shell>
    </Section>
  );
}
