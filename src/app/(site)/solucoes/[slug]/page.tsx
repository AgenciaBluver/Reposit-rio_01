import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, productSlugs, products } from "@/content/products";
import { PageHero } from "@/components/blocks/PageHero";
import { ThesisStatement } from "@/components/blocks/ThesisStatement";
import { Scope } from "@/components/blocks/Scope";
import { Process } from "@/components/blocks/Process";
import { CaseIndex } from "@/components/blocks/CaseIndex";
import { Faq } from "@/components/blocks/Faq";
import { CtaBand } from "@/components/blocks/CtaBand";
import { Offer } from "@/components/blocks/Offer";
import { PageView } from "@/components/blocks/PageView";
import { RelatedLinks } from "@/components/blocks/RelatedLinks";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { segments } from "@/content/segments";

/* Geração estática de todas as soluções. Adicionar um produto em
   src/content/products.ts cria a rota, o sitemap e os links do menu. */
export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/solucoes/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // Segmentos que citam este produto — internal linking derivado, não manual.
  const related = segments.filter((s) => s.fronts.some((f) => f.product === product.slug));
  const otherProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <PageView event="view_product" itemId={product.slug} itemName={product.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: product.name,
              description: product.seo.description,
              path: `/solucoes/${product.slug}`,
            }),
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Soluções", path: "/solucoes" },
              { name: product.name, path: `/solucoes/${product.slug}` },
            ]),
            faqSchema(product.faq),
          ]),
        }}
      />

      <PageHero
        eyebrow={product.hero.eyebrow}
        headline={product.hero.headline}
        sub={product.hero.sub}
        media={product.hero.media}
        cta={{ label: product.cta.label, href: product.cta.href }}
      />

      {/* ── Problema ─────────────────────────────────────────────── */}
      <Section surface="paper" density="lg">
        <Shell>
          <Rule />
          <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
            <Eyebrow className="col-span-6 lg:col-span-3">O problema</Eyebrow>
            <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h2 className="bv-display max-w-[20ch] text-display-3">{product.problem.headline}</h2>
              <div className="bv-measure mt-[clamp(2rem,4vw,3rem)] space-y-6">
                {product.problem.body.map((paragraph) => (
                  <p key={paragraph} className="text-lead leading-relaxed text-fg-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      <ThesisStatement statement={product.thesis} body={product.thesisBody} surface="ink" />

      <Scope
        items={product.scope}
        title="A competência que entra no trabalho."
        surface="paper"
      />

      <Process
        steps={product.process}
        title={
          product.slug === "midia-paga"
            ? "Cada etapa depende da anterior."
            : "Como o trabalho acontece."
        }
        variant={product.slug === "midia-paga" ? "flow" : "stages"}
        surface="ink"
      />

      {product.offer && <Offer offer={product.offer} cta={product.cta} />}

      <CaseIndex surface="paper" filterBy={{ product: product.slug }} showLink />

      <Faq items={product.faq} surface="paper" />

      <RelatedLinks
        title="Continue por aqui"
        groups={[
          ...(related.length
            ? [
                {
                  label: "Segmentos que usam esta frente",
                  items: related.map((s) => ({
                    label: s.name,
                    href: `/segmentos/${s.slug}`,
                  })),
                },
              ]
            : []),
          {
            label: "Outras soluções",
            items: otherProducts.map((p) => ({
              label: p.name,
              href: `/solucoes/${p.slug}`,
            })),
          },
        ]}
      />

      <CtaBand
        title={product.cta.label + "."}
        body="Conte o contexto do seu negócio. A primeira conversa é de diagnóstico — entender antes de propor."
        cta={{ label: "Apresente seu desafio", href: product.cta.href }}
        location={`product_${product.slug}`}
      />
    </>
  );
}
