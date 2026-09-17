"use client";

import { useCallback, useRef, useState } from "react";
import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";

/* ════════════════════════════════════════════════════════════════════════
   A DISTÂNCIA, ARRASTÁVEL
   A tese da casa é reduzir a distância entre o que a empresa é e como ela
   é percebida. Aqui essa distância vira uma alavanca: arrastar move a
   fronteira entre as duas versões da mesma empresa.

   É a única interação do site que o visitante controla por completo, e é
   de propósito: ele descobre a ideia com a mão, não lendo sobre ela.

   Acessível por teclado (role="slider" com setas) e legível sem JS: sem
   script, a divisória fica em 50% e os dois lados aparecem.
   ════════════════════════════════════════════════════════════════════════ */

const real = ["Excelência técnica", "Estrutura e capacidade", "Conhecimento acumulado", "Reputação construída"];
const seen = ["Mais um fornecedor", "Empresa menor do que é", "Uma opinião entre outras", "Desconhecida fora do círculo"];

export function GapSlider() {
  const [pos, setPos] = useState(52);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(92, Math.max(8, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(8, p - step));
    if (e.key === "ArrowRight") setPos((p) => Math.min(92, p + step));
    if (e.key === "Home") setPos(8);
    if (e.key === "End") setPos(92);
  };

  return (
    <Section surface="ink" density="lg" id="distancia">
      <Shell>
        <div className="grid grid-cols-6 gap-x-gutter lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">A distância</Eyebrow>
          <h2 className="bv-display col-span-6 mt-4 text-display-2 lg:col-span-9 lg:col-start-4 lg:mt-0">
            <span className="block">Sua empresa pode ser</span>
            <span className="block bv-gradient-text">excelente</span>
            <span className="block">e ainda parecer comum.</span>
          </h2>
        </div>

        <div
          ref={box}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          data-cursor="drag"
          className="relative mt-[clamp(3rem,7vw,6rem)] touch-none select-none overflow-hidden border border-line"
        >
          {/* Camada de baixo: como o mercado lê. */}
          <div className="p-[clamp(1.25rem,3vw,3rem)]">
            <Eyebrow className="text-fg-muted">O que o mercado lê</Eyebrow>
            <ul className="mt-[clamp(1.5rem,3vw,2.5rem)] space-y-[clamp(0.5rem,1.4vw,1rem)]">
              {seen.map((t) => (
                <li
                  key={t}
                  className="bv-serif text-[clamp(1.25rem,4.2vw,3rem)] leading-tight text-fg/35"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Camada de cima: o que a empresa é. Recortada pela divisória. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-bg p-[clamp(1.25rem,3vw,3rem)]"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Eyebrow>O que a empresa é</Eyebrow>
            <ul className="mt-[clamp(1.5rem,3vw,2.5rem)] space-y-[clamp(0.5rem,1.4vw,1rem)]">
              {real.map((t) => (
                <li
                  key={t}
                  className="bv-display whitespace-nowrap text-[clamp(1.25rem,4.2vw,3rem)] leading-tight"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* A divisória: a própria distância, no gradiente da marca. */}
          <div
            role="slider"
            tabIndex={0}
            aria-valuemin={8}
            aria-valuemax={92}
            aria-valuenow={Math.round(pos)}
            aria-label="Arraste para comparar o que a empresa é com o que o mercado lê"
            onKeyDown={onKeyDown}
            className="absolute inset-y-0 z-10 w-10 -translate-x-1/2 cursor-ew-resize"
            style={{ left: `${pos}%` }}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2"
              style={{ background: "var(--bv-gradient)" }}
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg"
              style={{ boxShadow: "0 0 0 1px var(--bv-signal-lift)" }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="var(--bv-signal-lift)" strokeWidth="1.5">
                <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
              </svg>
            </span>
          </div>
        </div>

        <p className="mt-6 text-[0.8125rem] text-fg-muted">
          Arraste a divisória. Essa distância é o que a Bluver existe para reduzir.
        </p>
      </Shell>
    </Section>
  );
}
