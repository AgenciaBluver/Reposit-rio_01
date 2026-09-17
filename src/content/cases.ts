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
    sector: "Evento, inovação e tecnologia",
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
      slot: "CASE, Expo Inovação Joinville: imagem de capa",
      preview: "https://t3.ftcdn.net/jpg/02/38/88/60/1000_F_238886031_hFQ6F1YN2stEBttavKsW60zFrT5arEsO.jpg",
    },
    gallery: [
      { src: null, alt: "Registro do público durante a Expo Inovação Joinville.", ratio: "3:2", slot: "CASE Expo, 01 público", preview: "https://t3.ftcdn.net/jpg/02/45/54/34/1000_F_245543401_IipVKLuG4QfowFWu1vOXPiwztke9wPI4.jpg" },
      { src: null, alt: "Entrevista captada durante a Expo Inovação Joinville.", ratio: "3:4", slot: "CASE Expo, 02 entrevista", preview: "https://t3.ftcdn.net/jpg/03/21/22/68/1000_F_321226892_3xkCyGRF8Q3JjoW4OTBqSypJ2sV5ND9G.jpg" },
      { src: null, alt: "Bastidor da equipe da Bluver na cobertura da Expo Inovação.", ratio: "3:2", slot: "CASE Expo, 03 bastidor", preview: "https://t3.ftcdn.net/jpg/04/00/26/10/1000_F_400261057_x8kvCSM5oSZ3MMhL5hItFyfoaVRAbLHP.jpg" },
    ],
  },
  {
    slug: "eletroerosao-a-fio",
    client: "Cliente, eletroerosão a fio",
    sector: "Indústria, usinagem de precisão",
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
      slot: "CASE, Eletroerosão: imagem de capa (detalhe de máquina)",
      preview: "https://t4.ftcdn.net/jpg/04/80/10/27/1000_F_480102788_98monqK7hJqg0P5mXuz09O3Ndf0XeeFU.jpg",
    },
    gallery: [
      { src: null, alt: "Detalhe de peça usinada por eletroerosão a fio.", ratio: "1:1", slot: "CASE Eletroerosão, 01 detalhe de peça", preview: "https://t4.ftcdn.net/jpg/06/73/22/29/1000_F_673222900_VfN8IE6DFYQBoeRcK5iwVy0XKFXVpvBB.jpg" },
      { src: null, alt: "Operador acompanhando o processo de usinagem.", ratio: "3:4", slot: "CASE Eletroerosão, 02 operador", preview: "https://t4.ftcdn.net/jpg/05/78/31/89/1000_F_578318978_WTnZMEnr4hudQnTlwKfeILwM0S88Bp3j.jpg" },
      { src: null, alt: "Vista geral do parque de máquinas.", ratio: "3:2", slot: "CASE Eletroerosão, 03 parque de máquinas", preview: "https://t4.ftcdn.net/jpg/04/80/10/27/1000_F_480102788_98monqK7hJqg0P5mXuz09O3Ndf0XeeFU.jpg" },
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
