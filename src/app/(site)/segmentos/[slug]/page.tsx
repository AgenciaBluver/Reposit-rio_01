import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSegment, segmentSlugs, segments } from "@/content/segments";
import { getProduct } from "@/content/products";
import { PageHero } from "@/components/blocks/PageHero";
import { ThesisStatement } from "@/components/blocks/ThesisStatement";
import { CaseIndex } from "@/components/blocks/CaseIndex";
import { Faq } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageView } from "@/components/blocks/PageView";
import { RelatedLinks } from "@/components/blocks/RelatedLinks";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return segmentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) return {};
  return buildMetadata({
    title: segment.seo.title,
    description: segment.seo.description,
    path: `/segmentos/${segment.slug}`,
  });
}

export default async function SegmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) notFound();

  const others = segments.filter((s) => s.slug !== segment.slug);

  return (
    <>
      <PageView event="view_segment" itemId={segment.slug} itemName={segment.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: segment.seo.title,
              description: segment.seo.description,
              path: `/segmentos/${segment.slug}`,
            }),
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Segmentos", path: "/segmentos" },
              { name: segment.name, path: `/segmentos/${segment.slug}` },
            ]),
            faqSchema(segment.faq),
          ]),
        }}
      />

      {/* Segmentos usam o hero "stack": título largo e imagem do setor em
          escala total. A identificação começa pela fotografia. */}
      <PageHero
        eyebrow={segment.hero.eyebrow}
        headline={segment.hero.headline}
        sub={segment.hero.sub}
        media={segment.hero.media}
        layout="stack"
      />

      {/* ── Realidade do setor ───────────────────────────────────── */}
      <Section surface="paper" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">A realidade</Eyebrow>
            <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h2 className="bv-display max-w-[20ch] text-display-3">
                {segment.reality.headline}
              </h2>
              <div className="bv-measure mt-[clamp(2rem,4vw,3rem)] space-y-6">
                {segment.reality.body.map((paragraph) => (
                  <p key={paragraph} className="text-lead leading-relaxed text-fg-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      <ThesisStatement statement={segment.thesis} surface="ink" />

      {/* ── Tradução: capacidade → percepção ─────────────────────── */}
      <Section surface="paper" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">A tradução</Eyebrow>
            <h2 className="bv-display col-span-6 mt-4 max-w-[22ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
              O que existe na operação, e o que precisa chegar ao mercado.
            </h2>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <div aria-hidden className="grid grid-cols-6 gap-x-gutter pb-4 lg:grid-cols-12">
              <Eyebrow className="col-span-3 lg:col-span-5">O que a empresa já tem</Eyebrow>
              <Eyebrow className="col-span-3 lg:col-span-5 lg:col-start-8">
                O que o mercado passa a ver
              </Eyebrow>
            </div>
            <ul>
              {segment.translation.map((row, i) => (
                <li key={row.from}>
                  <Reveal delay={i * 50}>
                    <div className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-[clamp(1.25rem,2.5vw,1.875rem)] lg:grid-cols-12">
                      <p className="bv-display col-span-3 text-[clamp(1rem,2vw,1.625rem)] leading-tight lg:col-span-5">
                        {row.from}
                      </p>
                      <span
                        aria-hidden
                        className="col-span-2 col-start-6 hidden h-px self-center bg-line lg:block"
                      />
                      <p className="bv-serif col-span-3 text-[clamp(1rem,2vw,1.625rem)] leading-tight text-fg-muted lg:col-span-5 lg:col-start-8">
                        {row.to}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Rule />
          </div>
        </Shell>
      </Section>

      {/* ── Frentes aplicadas ────────────────────────────────────── */}
      <Section surface="ink" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">As frentes</Eyebrow>
            <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
              Como isso se aplica no seu caso.
            </h2>
          </div>

          <ul className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
            {segment.fronts.map((front, i) => {
              const product = front.product ? getProduct(front.product) : undefined;
              // Frentes com produto correspondente viram link; as demais
              // permanecem como texto — sem link morto para lugar nenhum.
              const inner = (
                <>
                  <h3 className="bv-display text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight">
                    {front.title}
                  </h3>
                  <p className="mt-3.5 max-w-[46ch] leading-relaxed text-fg-muted">{front.body}</p>
                  {product && (
                    <span className="mt-5 inline-block border-b border-fg/25 pb-1 text-[0.875rem] font-medium transition-colors group-hover:border-fg">
                      {product.name}
                    </span>
                  )}
                </>
              );
              return (
                <li
                  key={front.title}
                  className="col-span-6 border-t border-line py-[clamp(1.75rem,3vw,2.5rem)] lg:col-span-5 lg:[&:nth-child(even)]:col-start-8"
                >
                  <Reveal delay={(i % 2) * 60}>
                    {product ? (
                      <Link href={`/solucoes/${product.slug}`} className="group block">
                        {inner}
                      </Link>
                    ) : (
                      <div>{inner}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Shell>
      </Section>

      <CaseIndex surface="paper" filterBy={{ segment: segment.slug }} showLink />

      <Faq
        items={segment.faq}
        surface="paper"
        title="O que decisores deste setor costumam perguntar."
      />

      <RelatedLinks
        title="Continue por aqui"
        groups={[
          { label: "Outros segmentos", items: others.map((s) => ({ label: s.name, href: `/segmentos/${s.slug}` })) },
          {
            label: "Soluções aplicadas",
            items: segment.fronts
              .filter((f) => f.product)
              .map((f) => getProduct(f.product!))
              .filter((p): p is NonNullable<typeof p> => Boolean(p))
              .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
              .map((p) => ({ label: p.name, href: `/solucoes/${p.slug}` })),
          },
        ]}
      />

      <CtaBand
        title={segment.cta.label + "."}
        body="A primeira conversa é de diagnóstico: entender o negócio, o mercado e a distância entre o que a empresa é e o que o mercado vê."
        cta={{ label: "Apresente seu desafio", href: segment.cta.href }}
        location={`segment_${segment.slug}`}
      />
    </>
  );
}
