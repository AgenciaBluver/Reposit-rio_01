import Image from "next/image";
import type { Media as MediaType } from "@/content/types";

const ratioClass: Record<string, string> = {
  "3:4": "aspect-[3/4]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "21:9": "aspect-[21/9]",
  "3:2": "aspect-[3/2]",
};

/* ════════════════════════════════════════════════════════════════════════
   MEDIA
   ────────────────────────────────────────────────────────────────────────
   Quando `src` existe, renderiza a imagem otimizada (AVIF/WebP, sizes
   corretos, sem CLS).

   Quando `src` é null, renderiza um PLACEHOLDER EDITORIAL — não uma caixa
   cinza quebrada. O placeholder usa a marca de enquadramento (cantos de
   visor) e exibe o `slot`: o nome exato do material a ser produzido.
   Ele funciona como briefing visível para a produção e desaparece no
   instante em que o arquivo real é apontado. Nenhum lorem ipsum, nenhuma
   imagem de banco genérica, nenhuma pessoa gerada por IA.
   ════════════════════════════════════════════════════════════════════════ */

export function Media({
  media,
  className = "",
  sizes = "100vw",
  priority = false,
  ratioOverride,
  /** Tratamento cinematográfico sutil: contraste e leve dessaturação.
   *  NUNCA altera tom de pele de forma agressiva — é um ajuste discreto. */
  cinematic = false,
}: {
  media: MediaType;
  className?: string;
  sizes?: string;
  priority?: boolean;
  cinematic?: boolean;
  /** Sobrescreve a proporção com classes próprias — permite enquadramento
   *  diferente por breakpoint (um retrato 3:4 no desktop raramente é o
   *  melhor corte no celular). */
  ratioOverride?: string;
}) {
  const ratio = ratioOverride ?? ratioClass[media.ratio ?? "3:2"] ?? ratioClass["3:2"];

  if (!media.src) {
    return (
      <figure
        className={`relative overflow-hidden ${ratio} ${className}`}
        // O placeholder é informativo, não decorativo: descreve o material.
        aria-label={`Material em produção: ${media.alt}`}
      >
        <div className="absolute inset-0 bg-fg/[0.04]" />
        <FrameMarks />
        <figcaption className="absolute inset-0 flex flex-col justify-end gap-2 p-[clamp(1rem,2.5vw,2rem)]">
          <span className="bv-eyebrow text-fg-muted">Material em produção</span>
          <span className="bv-serif text-fg/70 text-[clamp(0.95rem,1.4vw,1.25rem)] leading-snug max-w-[34ch]">
            {media.slot ?? media.alt}
          </span>
        </figcaption>
      </figure>
    );
  }

  if (media.kind === "video") {
    return (
      <figure className={`relative overflow-hidden ${ratio} ${className}`}>
        <video
          className="h-full w-full object-cover"
          poster={media.poster ?? undefined}
          playsInline
          muted
          loop
          autoPlay
          preload="none"
          aria-label={media.alt}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      </figure>
    );
  }

  return (
    <figure className={`relative overflow-hidden ${ratio} ${className}`}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`object-cover ${
          cinematic ? "contrast-[1.04] saturate-[0.94] brightness-[0.99]" : ""
        }`}
      />
    </figure>
  );
}

/** Cantos de visor — a marca de enquadramento do sistema.
 *  Referência conceitual direta: BLU + VER, tornar o valor visível. */
function FrameMarks() {
  const corner = "absolute h-4 w-4 border-fg/25";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`${corner} left-4 top-4 border-l border-t`} />
      <span className={`${corner} right-4 top-4 border-r border-t`} />
      <span className={`${corner} bottom-4 left-4 border-b border-l`} />
      <span className={`${corner} bottom-4 right-4 border-b border-r`} />
    </span>
  );
}
