import type { Media, Faq } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   LANDING PAGES DE CAMPANHA
   Função: CONVERSÃO. Menos distração, mais intenção comercial.
   Ficam fora do grupo (site): sem menu, sem rodapé institucional.

   São `noindex` por padrão — LP de campanha não deve competir no orgânico
   com a página de solução correspondente, que é a versão canônica.

   Adicionar uma campanha = adicionar um objeto aqui. A rota /lp/<slug>
   passa a existir; o sitemap continua ignorando (por ser noindex).
   ════════════════════════════════════════════════════════════════════════ */

export type Campaign = {
  slug: string;
  /** Produto de origem — mantém a LP coerente com a página canônica. */
  product: string;
  hero: { eyebrow: string; headline: string[]; sub: string; media: Media };
  /** Argumentos curtos. LP não é lugar de ensaio. */
  points: { title: string; body: string }[];
  offer?: { label: string; value: string; note: string } | null;
  proof: string[];
  faq: Faq[];
  ctaLabel: string;
  seo: { title: string; description: string };
};

export const campaigns: Campaign[] = [
  {
    slug: "site-para-empresas",
    product: "criacao-de-sites",
    hero: {
      eyebrow: "Criação de sites",
      headline: ["Seu site é a", "primeira reunião", "que acontece", "sem você."],
      sub: "Sites com estratégia, design autoral e performance — construídos para que a empresa seja percebida no nível em que realmente opera.",
      media: {
        src: null,
        alt: "Site desenvolvido pela Bluver exibido em desktop e celular.",
        ratio: "3:2",
        slot: "LP SITES — Projeto real em tela (horizontal)",
      preview: "https://t3.ftcdn.net/jpg/02/58/54/00/1000_F_258540015_SSAcBYnqx2ED0nz6bVcucFRcCYxl2Q1L.jpg",
      },
    },
    points: [
      {
        title: "Estratégia antes do layout",
        body: "Definimos para quem o site fala e qual objeção precisa vencer antes de desenhar qualquer tela.",
      },
      {
        title: "Design autoral",
        body: "Nada de tema pronto. A direção de arte é construída a partir da sua marca.",
      },
      {
        title: "Rápido e responsivo",
        body: "Performance e mobile são requisitos do projeto, não ajustes finais.",
      },
      {
        title: "Pronto para anúncios",
        body: "Rotas de conversão e eventos instrumentados desde a entrega.",
      },
    ],
    offer: {
      label: "Sites profissionais",
      value: "A partir de R$ 1.999",
      note: "Valor de entrada para site institucional de escopo definido. Projetos maiores são orçados conforme o escopo.",
    },
    proof: [
      "Estratégia, design e desenvolvimento na mesma casa",
      "SEO técnico e Core Web Vitals como requisito",
      "Domínio e projeto no seu nome",
      "Base em Joinville, atuação nacional",
    ],
    faq: [
      {
        q: "O que está incluído no valor de entrada?",
        a: "Projeto, design e desenvolvimento de um site institucional de escopo definido. Estruturas maiores — mais páginas, integrações, e-commerce — são orçadas conforme o projeto.",
      },
      {
        q: "Vocês fazem o conteúdo e as fotos?",
        a: "Sim, podem entrar no escopo. É o caminho mais comum quando a empresa quer que o site represente a operação real.",
      },
      {
        q: "Quem fica com o site depois?",
        a: "Você. Domínio, hospedagem e projeto ficam no seu nome.",
      },
    ],
    ctaLabel: "Quero um novo site",
    seo: {
      title: "Criação de sites profissionais a partir de R$ 1.999",
      description:
        "Sites com estratégia, design autoral, performance e SEO técnico. Base em Joinville, atuação nacional.",
    },
  },
];

export const getCampaign = (slug: string) => campaigns.find((c) => c.slug === slug);
export const campaignSlugs = campaigns.map((c) => c.slug);
