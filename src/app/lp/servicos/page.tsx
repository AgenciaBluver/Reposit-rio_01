import type { Metadata } from "next";
import Link from "next/link";
import { servicesLanding } from "@/content/services-landing";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Action } from "@/components/primitives/Action";
import { Magnetic } from "@/components/primitives/Magnetic";
import { ServiceSwitcher } from "@/components/blocks/ServiceSwitcher";
import { Faq } from "@/components/blocks/Faq";
import { PageView } from "@/components/blocks/PageView";
import { ContactChannels } from "@/components/blocks/ContactChannels";
import { Logo } from "@/components/layout/Logo";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: servicesLanding.seo.title,
  description: servicesLanding.seo.description,
  path: "/lp/servicos",
  noindex: true,
});

export default function ServicesLandingPage() {
  const { hero, combine, faq } = servicesLanding;

  return (
    <>
      <PageView event="view_product" itemId="lp_servicos" itemName="LP Serviços" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }}
      />

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
        <Section surface="paper" density="sm">
          <Shell>
            <div className="bv-grid items-end">
              <div className="col-span-6 lg:col-span-7">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="bv-rule-signal w-10 shrink-0" />
                  <Eyebrow>{hero.eyebrow}</Eyebrow>
                </div>
                <h1 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] text-display-1">
                  {hero.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </div>
              <p className="col-span-6 mt-8 text-lead leading-relaxed text-fg/80 lg:col-span-4 lg:col-start-9 lg:mt-0">
                {hero.sub}
              </p>
            </div>
          </Shell>
        </Section>

        {/* A página troca de conteúdo no lugar em vez de empilhar quatro
            blocos: quem chegou por um serviço não rola pelos outros três. */}
        <ServiceSwitcher />

        {/* ── Como as frentes se combinam ─────────────────────────── */}
        <Section surface="ink" density="lg">
          <Shell>
            <Rule />
            <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
              <Eyebrow className="col-span-6 lg:col-span-3">Juntas</Eyebrow>
              <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
                <h2 className="bv-display max-w-[18ch] text-display-3">{combine.headline}</h2>
                <p className="bv-measure mt-6 text-lead leading-relaxed text-fg-muted">
                  {combine.body}
                </p>
              </div>
            </div>

            {/* A cadeia: cada elo depende do anterior. */}
            <ol className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-center gap-x-4 gap-y-4">
              {combine.chain.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="bv-display text-[clamp(1.125rem,2.4vw,2rem)] leading-none">
                    {step}
                  </span>
                  {i < combine.chain.length - 1 && (
                    <span
                      aria-hidden
                      className="block h-px w-[clamp(1.5rem,4vw,4rem)]"
                      style={{ background: "var(--bv-gradient)" }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </Shell>
        </Section>

        <Faq items={faq} surface="paper" title="Antes de escolher por onde começar." />

        <Section surface="deep" density="md">
          <Shell>
            <span aria-hidden className="bv-rule-signal block w-24" />
            <h2 className="bv-display mt-8 max-w-[16ch] text-display-2">
              Não sabe por onde começar?
            </h2>
            <p className="bv-measure mt-6 text-lead leading-relaxed text-fg-muted">
              É exatamente para isso que existe o diagnóstico. Conte o contexto do negócio e
              dizemos qual frente resolve primeiro, e qual não faz sentido agora.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <Action href="/contato" payload={{ location: "lp_servicos_footer" }}>
                  Apresente seu desafio
                </Action>
              </Magnetic>
              <ContactChannels location="lp_servicos" />
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
