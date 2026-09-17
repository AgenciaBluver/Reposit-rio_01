import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanding, landingSlugs } from "@/content/landings";
import { Media } from "@/components/primitives/Media";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";
import { Action } from "@/components/primitives/Action";
import { Magnetic } from "@/components/primitives/Magnetic";
import { PainList } from "@/components/blocks/PainList";
import { Faq } from "@/components/blocks/Faq";
import { PageView } from "@/components/blocks/PageView";
import { ContactChannels } from "@/components/blocks/ContactChannels";
import { Logo } from "@/components/layout/Logo";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

export function generateStaticParams() {
  return landingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) return {};
  return buildMetadata({
    title: l.seo.title,
    description: l.seo.description,
    path: `/lp/${l.slug}`,
    // LP de campanha não disputa orgânico com a página de segmento.
    noindex: true,
  });
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLanding(slug);
  if (!l) notFound();

  const href = `/contato?segmento=${l.slug}`;

  return (
    <>
      <PageView event="view_segment" itemId={`lp_${l.slug}`} itemName={l.label} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(l.faq)) }}
      />

      {/* Chrome reduzido: marca e um caminho de volta. Sem menu, para que
          a única saída natural seja a conversa. */}
      <header data-surface="paper" className="border-b border-line">
        <Shell>
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link href="/" aria-label="Bluver, página inicial">
              <Logo />
            </Link>
            <p className="hidden text-[0.8125rem] text-fg-muted sm:block">
              {site.base.split(",")[0]} · {site.reach}
            </p>
          </div>
        </Shell>
      </header>

      <main id="conteudo">
        {/* ── Hero: abre pela dor, não pela apresentação ──────────── */}
        <Section surface="paper" density="sm">
          <Shell>
            <div className="bv-grid items-center">
              <div className="col-span-6 lg:col-span-6">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
                  <Eyebrow>{l.hero.eyebrow}</Eyebrow>
                </div>
                <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] text-display-2">
                  {l.hero.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="mt-8 max-w-[44ch] text-lead leading-relaxed text-fg/80">
                  {l.hero.sub}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Magnetic>
                    <Action href={href} payload={{ location: `lp_${l.slug}_hero` }}>
                      {l.cta.label}
                    </Action>
                  </Magnetic>
                  <a href="#dores" className="bv-link text-[0.9375rem] text-fg-muted">
                    Ver se é o seu caso
                  </a>
                </div>
              </div>

              <div className="col-span-6 mt-[clamp(2.5rem,5vw,0rem)] lg:col-span-5 lg:col-start-8">
                <Media
                  media={l.hero.media}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  cinematic
                  ratioOverride="aspect-[4/3] lg:aspect-[3/4]"
                />
              </div>
            </div>
          </Shell>
        </Section>

        {/* ── As dores, interativas ───────────────────────────────── */}
        <PainList
          items={l.pains}
          surface="ink"
          title="Se alguma dessas frases é sua, o problema não é falta de esforço."
        />

        {/* ── O custo ─────────────────────────────────────────────── */}
        <Section surface="deep" density="md">
          <Shell>
            <span aria-hidden className="bv-rule-signal block w-24" />
            <div className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-6 gap-x-gutter gap-y-8 lg:grid-cols-12">
              <h2 className="bv-display col-span-6 max-w-[18ch] text-display-2 lg:col-span-7">
                {l.cost.headline}
              </h2>
              <p className="col-span-6 flex items-end text-lead leading-relaxed text-fg-muted lg:col-span-4 lg:col-start-9">
                {l.cost.body}
              </p>
            </div>
          </Shell>
        </Section>

        {/* ── O que muda ──────────────────────────────────────────── */}
        <Section surface="paper" density="lg">
          <Shell>
            <Rule />
            <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
              <Eyebrow className="col-span-6 lg:col-span-3">O que muda</Eyebrow>
              <h2 className="bv-display col-span-6 mt-4 max-w-[22ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
                Sem promessa de número. Com mudança que dá para verificar.
              </h2>
            </div>

            <ul className="mt-[clamp(2.5rem,6vw,5rem)]">
              {l.shifts.map((s, i) => (
                <li key={s.from}>
                  <Reveal delay={i * 45}>
                    <div className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-[clamp(1.125rem,2.4vw,1.75rem)] lg:grid-cols-12">
                      <p className="bv-serif col-span-3 text-[clamp(0.9375rem,1.9vw,1.5rem)] leading-tight text-fg-muted lg:col-span-5">
                        {s.from}
                      </p>
                      <span
                        aria-hidden
                        className="col-span-2 col-start-6 hidden h-px self-center lg:block"
                        style={{ background: "var(--bv-gradient)" }}
                      />
                      <p className="bv-display col-span-3 text-[clamp(0.9375rem,1.9vw,1.5rem)] leading-tight lg:col-span-5 lg:col-start-8">
                        {s.to}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Rule />
          </Shell>
        </Section>

        {/* ── Como fazemos ────────────────────────────────────────── */}
        <Section surface="ink" density="lg">
          <Shell>
            <Rule />
            <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
              <Eyebrow className="col-span-6 lg:col-span-3">Como fazemos</Eyebrow>
              <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
                Diagnóstico antes de produção.
              </h2>
            </div>

            <ol className="mt-[clamp(2.5rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-0 lg:grid-cols-12">
              {l.how.map((h, i) => (
                <li
                  key={h.index}
                  className="col-span-6 border-t border-line py-[clamp(1.5rem,3vw,2.25rem)] lg:col-span-3"
                >
                  <Reveal delay={i * 60}>
                    <span aria-hidden className="bv-numeral block text-[0.75rem] tracking-[0.1em] text-accent">
                      {h.index}
                    </span>
                    <h3 className="bv-display mt-4 text-[clamp(1.125rem,1.7vw,1.375rem)]">{h.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{h.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-6 gap-x-gutter gap-y-8 border-t border-line pt-10 lg:grid-cols-12">
              <div className="col-span-6 lg:col-span-5">
                <Eyebrow as="h3">O que entra no trabalho</Eyebrow>
                <ul className="mt-5">
                  {l.includes.map((x) => (
                    <li key={x} className="border-b border-line py-3 text-[0.9375rem] leading-snug text-fg/85">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-6 lg:col-span-5 lg:col-start-8">
                <Eyebrow as="h3">Por que a Bluver</Eyebrow>
                <ul className="mt-5">
                  {l.proof.map((x) => (
                    <li key={x} className="border-b border-line py-3 text-[0.9375rem] leading-snug text-fg-muted">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </Section>

        <Faq items={l.faq} surface="paper" title="O que costuma vir antes da primeira conversa." />

        {/* ── Fechamento ──────────────────────────────────────────── */}
        <Section surface="deep" density="md">
          <Shell>
            <span aria-hidden className="bv-rule-signal block w-24" />
            <h2 className="bv-display mt-8 max-w-[16ch] text-display-2">{l.cta.label}.</h2>
            <p className="bv-measure mt-6 text-lead leading-relaxed text-fg-muted">{l.cta.sub}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <Action href={href} payload={{ location: `lp_${l.slug}_footer` }}>
                  Apresente seu desafio
                </Action>
              </Magnetic>
              <ContactChannels location={`lp_${l.slug}`} />
            </div>
            <p className="mt-12 border-t border-line pt-8 text-[0.8125rem] text-fg-muted">
              {site.base} · {site.reach}
            </p>
          </Shell>
        </Section>
      </main>
    </>
  );
}
