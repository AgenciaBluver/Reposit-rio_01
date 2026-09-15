import Link from "next/link";
import { products } from "@/content/products";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Reveal } from "@/components/primitives/Reveal";

/* ════════════════════════════════════════════════════════════════════════
   PRODUTOS — índice editorial, não grade de quatro cards iguais.
   Hierarquia: cada linha tem largura e deslocamento próprios; a imagem
   aparece no hover (desktop, CSS puro — zero JS) e fica sempre visível no
   mobile, onde não existe hover.
   ════════════════════════════════════════════════════════════════════════ */

/** Deslocamento por linha — assimetria controlada, não aleatória. */
const offset = ["lg:col-start-1", "lg:col-start-3", "lg:col-start-2", "lg:col-start-4"];

export function ProductIndex({ surface = "paper" }: { surface?: "paper" | "ink" }) {
  return (
    <Section surface={surface} density="lg" id="solucoes">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">As soluções</Eyebrow>
          <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <h2 className="bv-display text-display-3 max-w-[20ch]">
              Quatro portas de entrada para o mesmo trabalho.
            </h2>
            <p className="bv-measure mt-6 text-lead text-fg-muted">
              A Bluver não é um cardápio de serviços. Cada frente abaixo resolve um problema
              específico — e todas respondem à mesma tese.
            </p>
          </div>
        </div>

        <ul className="mt-[clamp(3.5rem,8vw,8rem)]">
          {products.map((product, i) => (
            <li key={product.slug}>
              <Reveal delay={i * 50}>
                <Link
                  href={`/solucoes/${product.slug}`}
                  className="group block border-t border-line py-[clamp(2rem,4vw,3.5rem)]"
                >
                  <div className="bv-grid items-center">
                    <div className={`col-span-6 lg:col-span-7 ${offset[i % offset.length]}`}>
                      <span
                        aria-hidden
                        className="bv-numeral block text-[0.8125rem] tracking-[0.1em] text-fg-muted"
                      >
                        {product.index}
                      </span>
                      <h3 className="bv-display mt-4 text-display-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:translate-x-3">
                        {product.name}
                      </h3>
                      <p className="mt-5 max-w-[42ch] leading-relaxed text-fg-muted">
                        {product.positioning}
                      </p>
                    </div>

                    {/* Desktop: revelação no hover. Mobile: sempre visível. */}
                    <div className="col-span-6 mt-6 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                      <Media
                        media={{ ...product.hero.media, ratio: "4:3" }}
                        sizes="(max-width: 1024px) 100vw, 24vw"
                        cinematic
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <Rule />
      </Shell>
    </Section>
  );
}
