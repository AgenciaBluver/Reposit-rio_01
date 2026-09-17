"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { products } from "@/content/products";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Media } from "@/components/primitives/Media";
import { Reveal } from "@/components/primitives/Reveal";

/* ════════════════════════════════════════════════════════════════════════
   PRODUTOS — índice editorial, não grade de quatro cards iguais.

   Interação: no desktop, a imagem do produto acompanha o cursor dentro da
   linha. Não é efeito gratuito — é o que permite que quatro produtos
   tenham imagem sem encher a tela de miniaturas: a fotografia aparece
   exatamente onde o olho já está, e some quando a atenção sai dali.
   No mobile (sem cursor) a imagem fica fixa ao lado do texto.
   ════════════════════════════════════════════════════════════════════════ */

const offset = ["lg:col-start-1", "lg:col-start-3", "lg:col-start-2", "lg:col-start-4"];

export function ProductIndex({ surface = "paper" }: { surface?: "paper" | "ink" }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const peek = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent<HTMLElement>) => {
    const el = peek.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const active = products.find((p) => p.slug === hovered);

  return (
    <Section surface={surface} density="lg" id="solucoes">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">As soluções</Eyebrow>
          <div className="col-span-6 mt-4 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <h2 className="bv-display max-w-[20ch] text-display-3">
              Quatro portas de entrada para o mesmo trabalho.
            </h2>
            <p className="bv-measure mt-6 text-lead text-fg-muted">
              A Bluver não é um cardápio de serviços. Cada frente abaixo resolve um problema
              específico — e todas respondem à mesma tese.
            </p>
          </div>
        </div>

        <div
          className="relative mt-[clamp(3.5rem,8vw,8rem)]"
          onMouseMove={move}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Painel que segue o cursor. Só existe no desktop. */}
          <div
            ref={peek}
            aria-hidden
            className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-[19rem] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 lg:block ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "translate(calc(var(--x) - 50%), calc(var(--y) - 50%))" }}
          >
            {active && (
              <Media
                media={{ ...active.hero.media, ratio: "4:3" }}
                sizes="19rem"
                cinematic
              />
            )}
          </div>

          <ul>
            {products.map((product, i) => (
              <li key={product.slug}>
                <Reveal delay={i * 50}>
                  <Link
                    href={`/solucoes/${product.slug}`}
                    onMouseEnter={() => setHovered(product.slug)}
                    onFocus={() => setHovered(product.slug)}
                    className="group block border-t border-line py-[clamp(2rem,4vw,3.5rem)]"
                  >
                    <div className="bv-grid items-center">
                      <div className={`col-span-6 lg:col-span-7 ${offset[i % offset.length]}`}>
                        <span
                          aria-hidden
                          className="bv-numeral block text-[0.8125rem] tracking-[0.1em] text-accent"
                        >
                          {product.index}
                        </span>
                        <h3 className="bv-display mt-4 text-display-3 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:translate-x-3 lg:group-hover:text-accent">
                          {product.name}
                        </h3>
                        <p className="mt-5 max-w-[42ch] leading-relaxed text-fg-muted">
                          {product.positioning}
                        </p>
                      </div>

                      {/* Mobile: imagem fixa, já que não existe cursor. */}
                      <div className="col-span-6 mt-6 lg:hidden">
                        <Media
                          media={{ ...product.hero.media, ratio: "4:3" }}
                          sizes="100vw"
                          cinematic
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Rule />
      </Shell>
    </Section>
  );
}
