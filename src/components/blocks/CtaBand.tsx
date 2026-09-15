import { Action } from "@/components/primitives/Action";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";

/* Faixa de conversão de fim de página.
   Usa a superfície "deep" para se distinguir do rodapé, que já é tinta —
   dois pretos seguidos matariam a hierarquia do fechamento. */
export function CtaBand({
  eyebrow = "Próximo passo",
  title,
  body,
  cta,
  secondary,
  location,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  location: string;
}) {
  return (
    <Section surface="deep" density="md">
      <Shell>
        <div className="grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="bv-display mt-6 max-w-[16ch] text-display-2">{title}</h2>
          </div>
          <div className="col-span-6 mt-8 flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
            {body && <p className="max-w-[40ch] text-lead leading-relaxed text-fg-muted">{body}</p>}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Action href={cta.href} payload={{ location }}>
                {cta.label}
              </Action>
              {secondary && (
                <a
                  href={secondary.href}
                  className="bv-link text-[0.9375rem] font-medium text-fg/80"
                >
                  {secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
