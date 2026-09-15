/* ════════════════════════════════════════════════════════════════════════
   LOGO — ⚠ PROVISÓRIO
   O arquivo oficial da marca não estava no projeto. Este componente é um
   wordmark tipográfico com a marca de enquadramento (visor), construído a
   partir do conceito BLU + VER — "tornar o valor visível".

   PARA SUBSTITUIR: coloque o arquivo em /public/media/brand/logo.svg e
   troque o corpo deste componente por <img src="..."> ou pelo SVG inline.
   Nenhum outro arquivo referencia a marca diretamente.
   ════════════════════════════════════════════════════════════════════════ */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Viewfinder />
      <span className="bv-display text-[1.0625rem] font-600 uppercase tracking-[0.16em] leading-none">
        Bluver
      </span>
    </span>
  );
}

/** Marca de enquadramento: quatro cantos e um ponto central.
 *  É o mesmo sinal usado nos placeholders de mídia — o sistema se
 *  reconhece sem precisar do logotipo. */
function Viewfinder({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-[0.95em] w-[0.95em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export { Viewfinder };
