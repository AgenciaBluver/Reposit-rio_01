"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/* Revelação no scroll.
   Regras: (1) sem JS, o conteúdo está visível — o estado inicial só é
   aplicado quando a classe `bv-js` existe no <html>; (2) revela uma única
   vez; (3) prefers-reduced-motion desliga tudo via CSS, não via JS. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Atraso em ms. Usado para escalonar itens de uma mesma sequência. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.dataset.reveal = "shown";
      return;
    }

    // Já visível no primeiro paint (acima da dobra): não esconder.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.dataset.reveal = "shown";
      return;
    }

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal="shown"
      style={delay ? ({ "--bv-reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
