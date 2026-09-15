import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";

/* Declaração de tese de uma página de produto ou segmento.
   Uma frase em escala máxima, sozinha na tela, com muito ar em volta.
   É o "momento de silêncio visual" do sistema — existe para criar pausa
   entre dois blocos densos, não para decorar. */
export function ThesisStatement({
  eyebrow = "A tese",
  statement,
  body,
  surface = "ink",
}: {
  eyebrow?: string;
  statement: string;
  body?: string;
  surface?: "paper" | "ink" | "deep";
}) {
  return (
    <Section surface={surface} density="lg">
      <Shell>
        <div className="grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
          <div className="col-span-6 flex items-start gap-4 lg:col-span-2">
            <span aria-hidden className="bv-rule-signal mt-3 w-8 shrink-0" />
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <div className="col-span-6 mt-8 lg:col-span-9 lg:col-start-4 lg:mt-0">
            <p className="bv-display text-display-2 max-w-[17ch]">{statement}</p>
            {body && (
              <p className="bv-measure mt-[clamp(2rem,4vw,3rem)] text-lead leading-relaxed text-fg-muted">
                {body}
              </p>
            )}
          </div>
        </div>
      </Shell>
    </Section>
  );
}
