"use client";

import { useEffect } from "react";

/* Progresso de leitura no topo da página.
   Existe por função, não por enfeite: as páginas de produto e segmento
   são longas, e a barra diz de relance quanto ainda falta.
   Escreve numa custom property e deixa o CSS transformar — nenhuma
   propriedade que force layout é tocada no scroll. */
export function ScrollProgress() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = document.createElement("div");
    bar.className = "bv-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.setProperty("--bv-progress", String(ratio));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bar.remove();
    };
  }, []);

  return null;
}
