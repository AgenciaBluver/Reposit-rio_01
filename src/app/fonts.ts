import { Archivo, Instrument_Serif } from "next/font/google";

/* ════════════════════════════════════════════════════════════════════════
   TIPOGRAFIA — duas famílias, carregadas com `display: swap` e subset
   latin-ext (português precisa de ã, õ, ç, ê).

   ⚠ PROVISÓRIO: quando a tipografia oficial da Bluver for definida,
   substitua aqui e em --bv-font-* (src/styles/tokens.css). Nenhum
   componente referencia nome de fonte diretamente.

   DISPLAY — Archivo: grotesca variável, desenho técnico, aguenta escala
   grande com tracking negativo sem perder legibilidade.
   TEXT — Instrument Serif: serifa editorial usada com parcimônia em tese,
   citação e numerais. É o que tira o site do registro "SaaS".
   ════════════════════════════════════════════════════════════════════════ */

export const fontDisplay = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  /* Reduz CLS ao aproximar as métricas da fonte de fallback. */
  adjustFontFallback: true,
});

export const fontText = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-text",
  weight: ["400"],
  style: ["normal", "italic"],
});
