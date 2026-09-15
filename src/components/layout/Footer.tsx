import Link from "next/link";
import { Logo } from "./Logo";
import { nav } from "@/content/nav";
import { site } from "@/content/site";
import { Action } from "@/components/primitives/Action";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";

/** O rodapé não é uma lista de links. É a última pergunta do site. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Section as="footer" surface="ink" density="sm" className="overflow-hidden">
      <Shell>
        {/* ── Fechamento ───────────────────────────────────────────── */}
        <div className="pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(1rem,4vw,3rem)]">
          <Eyebrow>Última pergunta</Eyebrow>
          <h2 className="bv-display mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[16ch] text-display-2">
            Seu negócio já é percebido no nível em que realmente opera?
          </h2>
          <div className="mt-[clamp(2rem,4vw,3.5rem)]">
            <Action href="/contato" payload={{ location: "footer" }}>
              Conversar com a Bluver
            </Action>
          </div>
        </div>

        <Rule />

        {/* ── Navegação ────────────────────────────────────────────── */}
        <div className="grid grid-cols-6 gap-x-gutter gap-y-[clamp(2.5rem,5vw,4rem)] py-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-4">
            <Logo />
            <p className="bv-serif mt-6 max-w-[24ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.25]">
              {site.signature}
            </p>
            <address className="mt-8 not-italic text-[0.9375rem] leading-relaxed text-fg-muted">
              {site.base}
              <br />
              {site.reach}
            </address>
          </div>

          <FooterColumn
            label={nav.solutions.label}
            items={nav.solutions.items.map((i) => ({ label: i.label, href: i.href }))}
          />
          <FooterColumn
            label={nav.segments.label}
            items={nav.segments.items.map((i) => ({ label: i.label, href: i.href }))}
          />
          <FooterColumn
            label="Bluver"
            items={[
              ...nav.simple.map((i) => ({ label: i.label, href: i.href })),
              ...(site.social.instagram ? [{ label: "Instagram", href: site.social.instagram }] : []),
              ...(site.social.linkedin ? [{ label: "LinkedIn", href: site.social.linkedin }] : []),
            ]}
          />
        </div>

        <Rule />

        <div className="flex flex-col gap-4 py-8 text-[0.8125rem] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="bv-link">
              {site.email}
            </a>
          </p>
        </div>
      </Shell>
    </Section>
  );
}

function FooterColumn({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="col-span-3 lg:col-span-2 lg:col-start-auto">
      <Eyebrow as="h2">{label}</Eyebrow>
      <ul className="mt-5 space-y-3">
        {items.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              {external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bv-link text-[0.9375rem] leading-snug text-fg/80"
                >
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className="bv-link text-[0.9375rem] leading-snug text-fg/80">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
