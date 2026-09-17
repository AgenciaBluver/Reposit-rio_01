"use client";

import Link from "next/link";
import { track, type BluverEvent, type EventPayload } from "@/lib/analytics";
import type { ReactNode } from "react";

/* Ações do site. Todo CTA passa por aqui — é o que garante que o dataLayer
   receba eventos consistentes sem espalhar onClick pelo projeto. */

type Common = {
  href: string;
  children: ReactNode;
  event?: BluverEvent;
  payload?: EventPayload;
  className?: string;
};

/** CTA primário: bloco sólido, sem arredondamento, com deslocamento da
 *  seta no hover. Contido — a força vem da tipografia, não do botão. */
export function Action({ href, children, event = "cta_click", payload, className = "" }: Common) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const content = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
    // Azul da marca como cor de ação. Em superfície escura o token vira o
  // ciano, que é o par legível ali — o componente não precisa saber.
  const cls = `group inline-flex items-center gap-3 bg-action px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.9rem,1.2vw,1.1rem)] text-[0.9375rem] font-medium tracking-[-0.01em] text-on-action transition-[transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:brightness-110 ${className}`;

  const onClick = () =>
    track(event, { label: typeof children === "string" ? children : undefined, destination: href, ...payload });

  if (external) {
    return (
      <a href={href} onClick={onClick} className={cls} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {content}
    </Link>
  );
}

/** CTA secundário: apenas texto com régua inferior. */
export function ActionText({ href, children, event = "cta_click", payload, className = "" }: Common) {
  return (
    <Link
      href={href}
      onClick={() =>
        track(event, { label: typeof children === "string" ? children : undefined, destination: href, ...payload })
      }
      className={`group inline-flex items-center gap-2.5 border-b border-fg/25 pb-1.5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200 hover:border-action hover:text-action ${className}`}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-[0.7em] w-[0.7em] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}
