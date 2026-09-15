import { Action } from "@/components/primitives/Action";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";

/* OFERTA DE ENTRADA.
   Fica confinada à página do produto — por decisão estratégica, o preço
   não aparece na home e não define a percepção da marca. O bloco é
   sóbrio: régua de gradiente, valor em escala display e a ressalva de
   escopo logo abaixo, para que o número não prometa mais do que cobre. */
export function Offer({
  offer,
  cta,
}: {
  offer: { label: string; value: string; note: string };
  cta: { label: string; href: string };
}) {
  return (
    <Section surface="deep" density="md">
      <Shell>
        <span aria-hidden className="bv-rule-signal block w-24" />
        <div className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-6 gap-x-gutter gap-y-8 lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-7">
            <Eyebrow>{offer.label}</Eyebrow>
            <p className="bv-display mt-5 text-display-2">{offer.value}</p>
          </div>
          <div className="col-span-6 flex flex-col justify-end gap-7 lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] leading-relaxed text-fg-muted">{offer.note}</p>
            <div>
              <Action href={cta.href} payload={{ location: "offer" }}>
                {cta.label}
              </Action>
            </div>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
