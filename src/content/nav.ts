import { products } from "./products";
import { segments } from "./segments";

/** Navegação derivada do conteúdo — adicionar produto/segmento já
 *  aparece no menu, no rodapé e no sitemap. Nada é digitado duas vezes. */
export const nav = {
  solutions: {
    label: "Soluções",
    href: "/solucoes",
    items: products.map((p) => ({
      label: p.name,
      href: `/solucoes/${p.slug}`,
      hint: p.positioning,
      index: p.index,
    })),
  },
  segments: {
    label: "Segmentos",
    href: "/segmentos",
    items: segments.map((s) => ({
      label: s.navLabel,
      href: `/segmentos/${s.slug}`,
      hint: s.thesis,
      index: "",
    })),
  },
  simple: [
    { label: "Projetos", href: "/projetos" },
    { label: "Método", href: "/metodo" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
} as const;
