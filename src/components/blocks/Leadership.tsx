import { leadership } from "@/content/leadership";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Reveal } from "@/components/primitives/Reveal";

/* LIDERANÇAS — competências complementares.
   Retratos verticais grandes e bios curtas: o retrato carrega o peso,
   o texto apenas delimita território. */
export function Leadership({ surface = "paper" }: { surface?: "paper" | "ink" }) {
  return (
    <Section surface={surface} density="lg" id="liderancas">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">Quem conduz</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 max-w-[20ch] text-display-3 lg:col-span-8 lg:col-start-5 lg:mt-0">
            Duas disciplinas que precisam andar juntas.
          </h2>
        </div>

        <ul className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-6 gap-x-gutter gap-y-[clamp(3.5rem,7vw,5rem)] lg:grid-cols-12">
          {leadership.map((leader, i) => (
            <li
              key={leader.slug}
              className={`col-span-6 lg:col-span-5 ${i === 1 ? "lg:col-start-8 lg:mt-[clamp(3rem,8vw,8rem)]" : ""}`}
            >
              <Reveal delay={i * 80}>
                <article>
                  <Media
                    media={leader.portrait}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    cinematic
                  />
                  <div className="mt-8">
                    <h3 className="bv-display text-title">{leader.name}</h3>
                    <p className="bv-serif mt-2 text-[clamp(1.125rem,1.6vw,1.5rem)] italic text-fg-muted">
                      {leader.discipline}
                    </p>
                    <p className="bv-eyebrow mt-4 text-fg-muted">{leader.role}</p>

                    <p className="mt-6 max-w-[46ch] leading-relaxed text-fg/85">{leader.bio}</p>

                    <ul className="mt-7 flex flex-wrap gap-x-2.5 gap-y-2">
                      {leader.territories.map((t) => (
                        <li
                          key={t}
                          className="border border-line px-3 py-1.5 text-[0.75rem] tracking-[0.02em] text-fg-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    {/* Credenciais entram como redução de risco, não como ego:
                        aparecem depois do território, em régua discreta. */}
                    {leader.credentials && (
                      <ul className="mt-8 border-t border-line">
                        {leader.credentials.map((c) => (
                          <li
                            key={c}
                            className="border-b border-line py-3 text-[0.9375rem] leading-snug text-fg/75"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
