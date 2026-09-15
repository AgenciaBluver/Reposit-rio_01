import type { Cta } from "./types";

/** Informações institucionais. Nada é repetido em outro arquivo. */
export const site = {
  name: "Bluver",
  legalName: "Bluver",
  signature: "Autoridade que movimenta negócios.",
  essence: "Tornar o valor visível.",
  /** Descrição institucional de uma linha — usada em OG, schema e rodapé. */
  description:
    "A Bluver constrói a percepção que posiciona negócios de alto valor, materializa seus diferenciais e amplia sua presença diante das pessoas certas.",
  base: "Joinville, Santa Catarina",
  reach: "Atuação nacional",
  /** Fallback seguro: se NEXT_PUBLIC_SITE_URL não estiver definida, usamos o
   *  domínio institucional para não emitir canonical quebrado. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.agenciabluver.com.br",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contato@agenciabluver.com.br",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "https://www.instagram.com/agenciabluver",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  },
} as const;

export const primaryCta: Cta = {
  label: "Conversar com a Bluver",
  href: "/contato",
  event: "cta_click",
};

/** A tese da casa. Aparece na home como assinatura visual e é referenciada
 *  (não reescrita) por produtos e segmentos. */
export const thesis = [
  {
    index: "01",
    term: "Estratégia",
    verb: "posiciona",
    body: "Antes de produzir qualquer coisa, é preciso decidir que lugar a empresa vai ocupar na cabeça de quem decide. Posição é escolha — e escolha envolve recusa.",
  },
  {
    index: "02",
    term: "Imagem",
    verb: "materializa",
    body: "Posição que não vira imagem continua sendo intenção. Fotografia, vídeo, design e linguagem são o que torna a decisão estratégica visível para o mercado.",
  },
  {
    index: "03",
    term: "Conteúdo",
    verb: "sustenta",
    body: "Autoridade não se instala em uma campanha. Ela se sustenta na frequência com que a empresa demonstra o que sabe, para quem precisa saber.",
  },
  {
    index: "04",
    term: "Mídia",
    verb: "amplifica",
    body: "Distribuição é o que faz a percepção construída alcançar as pessoas certas, na quantidade certa, pelo custo que o negócio suporta.",
  },
] as const;
