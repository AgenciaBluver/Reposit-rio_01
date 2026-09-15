import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCampaign, campaignSlugs } from "@/content/campaigns";
import { getProduct } from "@/content/products";
import { Media } from "@/components/primitives/Media";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { Action } from "@/components/primitives/Action";
import { Faq } from "@/components/blocks/Faq";
import { Offer } from "@/components/blocks/Offer";
import { PageView } from "@/components/blocks/PageView";
import { ContactChannels } from "@/components/blocks/ContactChannels";
import { Logo } from "@/components/layout/Logo";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

export function generateStaticParams() {
  return campaignSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};
  return buildMetadata({
    title: campaign.seo.title,
    description: campaign.seo.description,
    path: `/lp/${campaign.slug}`,
    // LP de campanha não disputa orgânico com a página canônica.
    noindex: true,
  });
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();

  const product = getProduct(campaign.product);
  const cta = { label: campaign.ctaLabel, href: `/contato?interesse=${campaign.product}` };

  return (
    <>
      <PageView event="view_product" itemId={`lp_${campaign.slug}`} itemName={campaign.seo.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(campaign.faq)) }}
      />

      {/* Chrome reduzido: marca, um canal direto e nada mais.
          Sem menu, a única saída é a conversão. */}
      <header data-surface="paper" className="border-b border-line">
        <Shell>
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link href="/" aria-label="Bluver — página inicial">
              <Logo />
            </Link>
            <p className="hidden text-[0.8125rem] text-fg-muted sm:block">
              {site.base.split(",")[0]} · {site.reach}
            </p>
          </div>
        </Shell>
      </header>

      <main id="conteudo">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <Section surface="paper" density="sm">
          <Shell>
            <div className="bv-grid items-center">
              <div className="col-span-6 lg:col-span-6">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
                  <Eyebrow>{campaign.hero.eyebrow}</Eyebrow>
                </div>
                <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] text-display-2">
                  {campaign.hero.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="mt-8 max-w-[42ch] text-lead leading-relaxed text-fg/80">
                  {campaign.hero.sub}
                </p>
                <div className="mt-10">
                  <Action href={cta.href} payload={{ location: `lp_${campaign.slug}_hero` }}>
                    {cta.label}
                  </Action>
                </div>
              </div>

              <div className="col-span-6 mt-[clamp(2.5rem,5vw,0rem)] lg:col-span-5 lg:col-start-8">
                <Media media={campaign.hero.media} priority sizes="(max-width: 1024px) 100vw, 42vw" cinematic />
              </div>
            </div>
          </Shell>
        </Section>

        {/* ── Argumentos ─────────────────────────────────────────── */}
        <Section surface="ink" density="md">
          <Shell>
            <ul className="grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
              {campaign.points.map((point, i) => (
                <li
                  key={point.title}
                  className="col-span-6 border-t border-line py-[clamp(1.5rem,3vw,2.25rem)] lg:col-span-5 lg:[&:nth-child(even)]:col-start-8"
                >
                  <Reveal delay={(i % 2) * 60}>
                    <h2 className="bv-display text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight">
                      {point.title}
                    </h2>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-fg-muted">{point.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Shell>
        </Section>

        {campaign.offer && <Offer offer={campaign.offer} cta={cta} />}

        {/* ── Prova ──────────────────────────────────────────────── */}
        <Section surface="paper" density="md">
          <Shell>
            <Rule />
            <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
              <Eyebrow className="col-span-6 lg:col-span-3">Por que a Bluver</Eyebrow>
              <ul className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
                {campaign.proof.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-4 text-lead leading-snug text-fg/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Shell>
        </Section>

        <Faq items={campaign.faq} surface="paper" title="Antes de falar com a gente." />

        {/* ── Fechamento ─────────────────────────────────────────── */}
        <Section surface="deep" density="md">
          <Shell>
            <span aria-hidden className="bv-rule-signal block w-24" />
            <h2 className="bv-display mt-8 max-w-[16ch] text-display-2">{campaign.ctaLabel}.</h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Action href={cta.href} payload={{ location: `lp_${campaign.slug}_footer` }}>
                {cta.label}
              </Action>
              <ContactChannels location={`lp_${campaign.slug}`} />
            </div>
            {product && (
              <p className="mt-12 border-t border-line pt-8 text-[0.8125rem] text-fg-muted">
                Quer entender a solução por completo?{" "}
                <Link href={`/solucoes/${product.slug}`} className="bv-link text-fg">
                  {product.name}
                </Link>
              </p>
            )}
          </Shell>
        </Section>
      </main>
    </>
  );
}
