/* ════════════════════════════════════════════════════════════════════════
   BLUVER — CONTRATOS DE CONTEÚDO
   Todo texto do site vive em src/content/*. Nenhuma página inventa dado.
   Adicionar um case, segmento, produto ou depoimento = adicionar um objeto.
   ════════════════════════════════════════════════════════════════════════ */

/** Slot de mídia. `src` nulo ⇒ o componente renderiza um placeholder
 *  editorial explícito, nunca uma imagem aleatória ou lorem ipsum. */
export type Media = {
  /** Caminho em /public/media/... ou null enquanto o material real não existe. */
  src: string | null;
  /** Alt real e descritivo. Obrigatório mesmo no placeholder: descreve o
   *  que a imagem DEVE mostrar, servindo de briefing para a produção. */
  alt: string;
  /** Proporção usada para reservar espaço e evitar CLS. */
  ratio?: "3:4" | "4:3" | "1:1" | "16:9" | "9:16" | "21:9" | "3:2";
  /** Rótulo exibido no placeholder — identifica o material a produzir. */
  slot?: string;
  kind?: "image" | "video";
  /** Poster obrigatório quando kind === "video". */
  poster?: string | null;
};

export type Cta = {
  label: string;
  href: string;
  /** Nome do evento enviado ao dataLayer. */
  event?: string;
};

export type Faq = { q: string; a: string };

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  /** Detalhamento opcional — o que acontece de concreto nesta etapa. */
  detail?: string[];
  media?: Media;
};

/** Um case segue sempre a mesma espinha narrativa.
 *  `status: "placeholder"` ⇒ a página mostra a estrutura preparada e
 *  deixa claro que o material está em produção. Nada é inventado. */
export type CaseStudy = {
  slug: string;
  client: string;
  /** Setor real do cliente. */
  sector: string;
  year?: string;
  /** Frase-síntese do trabalho. */
  headline: string;
  status: "published" | "placeholder";
  /** Produtos e segmentos relacionados — alimenta o internal linking. */
  products: string[];
  segments: string[];
  narrative: {
    contexto: string;
    problema: string;
    diagnostico: string;
    direcao: string;
    criacao: string;
    distribuicao: string;
    /** SEMPRE separar objetivo de resultado comprovado.
     *  `comprovado` só existe quando houver dado real e verificável. */
    impacto: { objetivo: string; comprovado: string | null };
  };
  cover: Media;
  gallery: Media[];
};

export type Product = {
  slug: string;
  /** Numeral editorial 01–04. */
  index: string;
  name: string;
  /** Uma linha que posiciona o produto na tese, não na entrega. */
  positioning: string;
  /** A tese do produto — vira headline de seção. */
  thesis: string;
  thesisBody: string;
  hero: {
    eyebrow: string;
    headline: string[];
    sub: string;
    media: Media;
  };
  problem: { headline: string; body: string[] };
  /** O que está incluído — descrito como competência, não como pacote. */
  scope: { title: string; body: string }[];
  process: ProcessStep[];
  cta: Cta;
  faq: Faq[];
  /** Oferta comercial de entrada, quando existir. */
  offer?: { label: string; value: string; note: string } | null;
  seo: { title: string; description: string };
};

export type Segment = {
  slug: string;
  name: string;
  /** Rótulo curto para navegação. */
  navLabel: string;
  hero: { eyebrow: string; headline: string[]; sub: string; media: Media };
  thesis: string;
  /** O problema desenhado na linguagem do setor. */
  reality: { headline: string; body: string[] };
  /** Traduções: capacidade real → percepção de mercado. */
  translation: { from: string; to: string }[];
  /** Frentes aplicadas a este segmento (referenciam produtos). */
  fronts: { title: string; body: string; product?: string }[];
  /** Perguntas que o decisor deste setor realmente faz. */
  faq: Faq[];
  cta: Cta;
  seo: { title: string; description: string };
};

export type Leader = {
  slug: string;
  name: string;
  role: string;
  discipline: string;
  /** Curta. Duas ou três frases, nunca biografia longa. */
  bio: string;
  territories: string[];
  /** Credenciais verificáveis. Nada aqui pode ser estimativa. */
  credentials?: string[];
  portrait: Media;
  linkedin?: string | null;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Só renderiza se `approved` for true. */
  approved: boolean;
};
