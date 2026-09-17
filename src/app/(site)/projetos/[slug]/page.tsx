import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCase, caseSlugs, cases } from "@/content/cases";
import { getProduct } from "@/content/products";
import { getSegment } from "@/content/segments";
import { Media } from "@/components/primitives/Media";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { CtaBand } from "@/components/blocks/CtaBand";
import { RelatedLinks } from "@/components/blocks/RelatedLinks";
import { PageView } from "@/components/blocks/PageView";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { ctas } from "@/content/site";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.client}, ${item.sector}`,
    description: item.headline,
    path: `/projetos/${item.slug}`,
    // Case ainda sem conteúdo não deve entrar no índice do Google.
    noindex: item.status === "placeholder",
  });
}

const chapters = [
  { key: "contexto", label: "Contexto" },
  { key: "problema", label: "Problema" },
  { key: "diagnostico", label: "Diagnóstico" },
  { key: "direcao", label: "Direção" },
  { key: "criacao", label: "Criação" },
  { key: "distribuicao", label: "Distribuição" },
] as const;

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const isPlaceholder = item.status === "placeholder";
  const others = cases.filter((c) => c.slug !== item.slug);

  return (
    <>
      <PageView event="case_view" itemId={item.slug} itemName={item.client} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Projetos", path: "/projetos" },
              { name: item.client, path: `/projetos/${item.slug}` },
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
          <div className="flex flex-wrap items-center gap-3">
            <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
            <Eyebrow>{item.sector}</Eyebrow>
            {isPlaceholder && (
              <span className="bv-eyebrow border border-line px-2 py-1 text-fg-muted">
                Em produção
              </span>
            )}
          </div>

          <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[18ch] text-display-2">
            {item.client}
          </h1>
          <p className="bv-serif bv-measure mt-6 text-lead leading-snug text-fg-muted">
            {item.headline}
          </p>

          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <Media media={item.cover} priority sizes="100vw" cinematic />
          </div>
        </Shell>
      </Section>

      {/* ── Narrativa ────────────────────────────────────────────── */}
      <Section surface="ink" density="lg">
        <Shell>
          {isPlaceholder ? (
            <>
              <Rule />
              <div className="grid grid-cols-6 gap-x-gutter pt-8 lg:grid-cols-12">
                <Eyebrow className="col-span-6 lg:col-span-3">Status</Eyebrow>
                <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
                  <h2 className="bv-display max-w-[22ch] text-display-3">
                    Este case está sendo montado.
                  </h2>
                  <p className="bv-measure mt-6 text-lead leading-relaxed text-fg-muted">
                    Preferimos publicar um case vazio a publicar um case inventado. A estrutura
                    narrativa abaixo já está definida e será preenchida com o material real assim
                    que a produção for concluída.
                  </p>
                </div>
              </div>
              <ol className="mt-[clamp(2.5rem,5vw,4rem)]">
                {chapters.map((c, i) => (
                  <li
                    key={c.key}
                    className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-4 lg:grid-cols-12"
                  >
                    <span
                      aria-hidden
                      className="bv-numeral col-span-1 text-[0.75rem] tracking-[0.1em] text-fg-muted"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="bv-display col-span-5 text-[1.125rem] text-fg/50 lg:col-span-3">
                      {c.label}
                    </h3>
                  </li>
                ))}
                <Rule />
              </ol>
            </>
          ) : (
            <ol>
              {chapters.map((c, i) => (
                <li key={c.key}>
                  <Reveal delay={i * 50}>
                    <article className="grid grid-cols-6 items-start gap-x-gutter border-t border-line py-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-12">
                      <div className="col-span-6 lg:col-span-3">
                        <span aria-hidden className="bv-numeral block text-index text-fg/12">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="bv-display mt-3 text-title">{c.label}</h2>
                      </div>
                      <p className="col-span-6 mt-4 text-lead leading-relaxed text-fg/85 lg:col-span-7 lg:col-start-5 lg:mt-2">
                        {item.narrative[c.key]}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}

          {/* Objetivo e resultado ficam SEPARADOS por princípio. */}
          {!isPlaceholder && (
            <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-10 border-t border-line pt-10 lg:grid-cols-12">
              <div className="col-span-6 lg:col-span-5">
                <Eyebrow as="h2">Objetivo</Eyebrow>
                <p className="mt-5 text-lead leading-relaxed text-fg/85">
                  {item.narrative.impacto.objetivo}
                </p>
              </div>
              <div className="col-span-6 lg:col-span-5 lg:col-start-8">
                <Eyebrow as="h2">Resultado comprovado</Eyebrow>
                <p className="mt-5 text-lead leading-relaxed text-fg-muted">
                  {item.narrative.impacto.comprovado ??
                    "Ainda não há dado financeiro verificável para este projeto. Quando houver, ele aparece aqui, com a fonte."}
                </p>
              </div>
            </div>
          )}
        </Shell>
      </Section>

      {/* ── Galeria ──────────────────────────────────────────────── */}
      {item.gallery.length > 0 && (
        <Section surface="paper" density="lg">
          <Shell>
            <ul className="grid grid-cols-6 gap-gutter lg:grid-cols-12">
              {item.gallery.map((media, i) => (
                <li
                  key={media.slot ?? media.alt}
                  className={
                    i === 0
                      ? "col-span-6 lg:col-span-8"
                      : i === 1
                        ? "col-span-6 lg:col-span-4"
                        : "col-span-6 lg:col-span-6"
                  }
                >
                  <Reveal delay={i * 60}>
                    <Media
                      media={media}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      cinematic
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Shell>
        </Section>
      )}

      <RelatedLinks
        title="Relacionado"
        surface="ink"
        groups={[
          {
            label: "Soluções aplicadas",
            items: item.products
              .map((p) => getProduct(p))
              .filter((p): p is NonNullable<typeof p> => Boolean(p))
              .map((p) => ({ label: p.name, href: `/solucoes/${p.slug}` })),
          },
          {
            label: "Segmento",
            items: item.segments
              .map((s) => getSegment(s))
              .filter((s): s is NonNullable<typeof s> => Boolean(s))
              .map((s) => ({ label: s.name, href: `/segmentos/${s.slug}` })),
          },
          {
            label: "Outros projetos",
            items: others.map((c) => ({ label: c.client, href: `/projetos/${c.slug}` })),
          },
        ]}
      />

      <CtaBand
        title="Seu negócio tem uma história parecida?"
        cta={{ label: ctas.challenge.label, href: ctas.challenge.href }}
        location={`case_${item.slug}`}
      />
    </>
  );
}
