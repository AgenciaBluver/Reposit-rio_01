import type { CaseStudy, Testimonial } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   CASES
   ────────────────────────────────────────────────────────────────────────
   REGRA INEGOCIÁVEL: nada aqui é inventado.
   Os dois cases abaixo estão marcados como `status: "placeholder"` porque
   os materiais ainda não foram entregues ao projeto. A página renderiza a
   estrutura narrativa completa e sinaliza explicitamente o que está em
   produção — em vez de preencher com texto genérico ou dado fictício.

   PARA PUBLICAR UM CASE:
   1. Troque `status` para "published".
   2. Preencha `narrative` com o texto real.
   3. Aponte `cover`/`gallery` para os arquivos em /public/media/cases/.
   4. `impacto.comprovado` só recebe valor se houver dado verificável.
      Sem dado, permanece `null` e a página mostra apenas o objetivo.
   ════════════════════════════════════════════════════════════════════════ */

export const cases: CaseStudy[] = [
  {
    slug: "expo-inovacao-joinville",
    client: "Expo Inovação Joinville",
    sector: "Evento — inovação e tecnologia",
    headline: "Cobertura planejada para transformar um evento em acervo de marca.",
    status: "placeholder",
    products: ["cobertura-de-eventos", "producao-de-conteudo"],
    segments: [],
    narrative: {
      contexto: "",
      problema: "",
      diagnostico: "",
      direcao: "",
      criacao: "",
      distribuicao: "",
      impacto: { objetivo: "", comprovado: null },
    },
    cover: {
      src: null,
      alt: "Cobertura da Expo Inovação Joinville realizada pela Bluver.",
      ratio: "3:2",
      slot: "CASE — Expo Inovação Joinville: imagem de capa",
    },
    gallery: [
      { src: null, alt: "Registro do público durante a Expo Inovação Joinville.", ratio: "3:2", slot: "CASE Expo — 01 público" },
      { src: null, alt: "Entrevista captada durante a Expo Inovação Joinville.", ratio: "3:4", slot: "CASE Expo — 02 entrevista" },
      { src: null, alt: "Bastidor da equipe da Bluver na cobertura da Expo Inovação.", ratio: "3:2", slot: "CASE Expo — 03 bastidor" },
    ],
  },
  {
    slug: "eletroerosao-a-fio",
    client: "Cliente — eletroerosão a fio",
    sector: "Indústria — usinagem de precisão",
    headline: "Traduzir precisão de processo em percepção de capacidade técnica.",
    status: "placeholder",
    products: ["producao-de-conteudo", "criacao-de-sites"],
    segments: ["industrias"],
    narrative: {
      contexto: "",
      problema: "",
      diagnostico: "",
      direcao: "",
      criacao: "",
      distribuicao: "",
      impacto: { objetivo: "", comprovado: null },
    },
    cover: {
      src: null,
      alt: "Máquina de eletroerosão a fio em operação, registrada em detalhe.",
      ratio: "3:2",
      slot: "CASE — Eletroerosão: imagem de capa (detalhe de máquina)",
    },
    gallery: [
      { src: null, alt: "Detalhe de peça usinada por eletroerosão a fio.", ratio: "1:1", slot: "CASE Eletroerosão — 01 detalhe de peça" },
      { src: null, alt: "Operador acompanhando o processo de usinagem.", ratio: "3:4", slot: "CASE Eletroerosão — 02 operador" },
      { src: null, alt: "Vista geral do parque de máquinas.", ratio: "3:2", slot: "CASE Eletroerosão — 03 parque de máquinas" },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export const caseSlugs = cases.map((c) => c.slug);
export const publishedCases = cases.filter((c) => c.status === "published");

/** Depoimentos só aparecem no site com `approved: true`.
 *  Lista vazia por decisão: nenhum depoimento foi fornecido e
 *  nenhum será inventado. */
export const testimonials: Testimonial[] = [];
