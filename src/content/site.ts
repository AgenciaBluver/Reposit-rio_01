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
  /** Fallback seguro: `||` (não `??`) porque precisa cair no padrão tanto
   *  se a variável não existir quanto se existir cadastrada com valor
   *  vazio, o que aconteceu em produção e quebrava `new URL("")` no
   *  build, derrubando o deploy inteiro. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciabluver.com.br",
  email: process.env.NEXT_PUBLIC_EMAIL || "contato@agenciabluver.com.br",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/agenciabluver",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
  },
} as const;

/** CTAs aprovados no documento mestre. Nenhuma página inventa um CTA novo:
 *  todas escolhem um destes, para que a marca fale sempre igual. */
export const ctas = {
  talk: { label: "Fale com a Bluver", href: "/contato", event: "cta_click" },
  challenge: { label: "Apresente seu desafio", href: "/contato", event: "cta_click" },
  positioning: {
    label: "Conversar sobre o seu posicionamento",
    href: "/contato",
    event: "cta_click",
  },
  projects: { label: "Conhecer nossos projetos", href: "/projetos", event: "cta_click" },
  method: { label: "Entender o Método Bluver", href: "/metodo", event: "cta_click" },
} as const satisfies Record<string, Cta>;

export const primaryCta: Cta = ctas.talk;

/** Ressalva institucional. Aparece onde houver promessa de crescimento —
 *  a Bluver influencia demanda e oportunidades, não garante faturamento. */
export const disclaimer =
  "A Bluver influencia demanda e oportunidades. Parte do resultado depende da operação comercial do cliente. Por isso não prometemos faturamento garantido.";

/** Tradução de entregável em significado (documento mestre, seção 06).
 *  É o antídoto contra o site virar lista de serviços. */
export const translation = [
  { deliverable: "Vídeos", meaning: "Presença audiovisual coerente com o posicionamento." },
  { deliverable: "Mídia paga", meaning: "Ampliação da autoridade diante das pessoas certas." },
  { deliverable: "Conteúdo", meaning: "Narrativa que sustenta familiaridade, confiança e relevância." },
  { deliverable: "Design", meaning: "Materialização visual da estratégia." },
  {
    deliverable: "Planejamento",
    meaning: "Definição de como o negócio precisa ser percebido antes do que será produzido.",
  },
  { deliverable: "Eventos", meaning: "Presença e desdobramento estratégico do momento." },
] as const;

/** A tese da casa. Aparece na home como assinatura visual e é referenciada
 *  (não reescrita) por produtos e segmentos. */
export const thesis = [
  {
    index: "01",
    term: "Estratégia",
    verb: "posiciona",
    body: "Antes de produzir qualquer coisa, é preciso decidir que lugar a empresa vai ocupar na cabeça de quem decide. Posição é escolha, e escolha envolve recusa.",
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
