"use client";

import { useEffect } from "react";

/* ════════════════════════════════════════════════════════════════════════
   CURSOR DA MARCA
   O ponteiro vira a marca de enquadramento: quatro cantos de visor que se
   abrem sobre qualquer coisa clicável. Não é enfeite, é a tradução direta
   do conceito da casa, BLU + VER, tornar o valor visível. O visitante
   passa a navegar olhando por um visor.

   Só existe em ponteiro fino (mouse). Em toque, e com prefers-reduced-
   motion, o cursor do sistema continua como está.
   ════════════════════════════════════════════════════════════════════════ */
export function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = document.createElement("div");
    el.className = "bv-cursor";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <span class="bv-cursor-c" style="top:0;left:0;border-top-width:1px;border-left-width:1px"></span>
      <span class="bv-cursor-c" style="top:0;right:0;border-top-width:1px;border-right-width:1px"></span>
      <span class="bv-cursor-c" style="bottom:0;right:0;border-bottom-width:1px;border-right-width:1px"></span>
      <span class="bv-cursor-c" style="bottom:0;left:0;border-bottom-width:1px;border-left-width:1px"></span>
      <span class="bv-cursor-dot"></span>`;
    document.body.appendChild(el);
    document.documentElement.classList.add("bv-has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const loop = () => {
      // Interpolação: o visor persegue o ponteiro com um atraso curto.
      // É o atraso que dá a sensação de objeto, em vez de sobreposição.
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.on = "1";
      const t = e.target as Element | null;
      const near = t?.closest("a, button, summary, input, textarea, select, [data-cursor]");
      el.dataset.state = near ? (near.getAttribute("data-cursor") ?? "link") : "idle";
    };
    const onLeave = () => {
      el.dataset.on = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      el.remove();
      document.documentElement.classList.remove("bv-has-cursor");
    };
  }, []);

  return null;
}
