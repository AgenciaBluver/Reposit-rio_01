import type { ProcessStep } from "./types";

/** MÉTODO BLUVER — cinco etapas. Demonstra que existe pensamento antes
 *  da execução. Referenciado pela home, pela página /metodo e por produtos. */
export const method: ProcessStep[] = [
  {
    index: "01",
    title: "Diagnóstico",
    body: "Começamos entendendo o negócio antes da comunicação: como vende, para quem, com que margem, com que ciclo e onde a percepção trabalha contra o preço.",
    detail: [
      "Leitura do modelo comercial e do ciclo de decisão",
      "Análise do que o mercado hoje percebe, e do que deixa de perceber",
      "Mapeamento de concorrência direta e de referência",
      "Identificação dos ativos que a empresa já tem e não usa",
    ],
    media: {
      src: null,
      alt: "Reunião de diagnóstico da Bluver com material impresso sobre a mesa e anotações à mão.",
      ratio: "4:3",
      slot: "METODO/01, Diagnóstico: reunião real, mesa de trabalho",
      preview: "https://t3.ftcdn.net/jpg/03/21/22/68/1000_F_321226892_3xkCyGRF8Q3JjoW4OTBqSypJ2sV5ND9G.jpg",
    },
  },
  {
    index: "02",
    title: "Direção",
    body: "Definimos a posição a ocupar e a direção de arte que vai sustentá-la. É aqui que decidimos o que a empresa vai parecer, e o que ela deixa de parecer.",
    detail: [
      "Território de posicionamento e mensagens centrais",
      "Direção de arte, referências e limites visuais",
      "Arquitetura de conteúdo por canal",
      "Critérios de recusa: o que não faremos",
    ],
    media: {
      src: null,
      alt: "Prancha de direção de arte com referências visuais impressas e recortes.",
      ratio: "4:3",
      slot: "METODO/02, Direção: prancha de referências, moodboard físico",
      preview: "https://t3.ftcdn.net/jpg/05/01/67/28/1000_F_501672880_moCm9LrdfE7BppTdjYybYOncrCYVrAWO.jpg",
    },
  },
  {
    index: "03",
    title: "Construção",
    body: "Produzimos os ativos que materializam a posição: audiovisual, fotografia, design, site e linguagem. Execução com direção, não execução por demanda.",
    detail: [
      "Pré-produção: roteiro, decupagem, casting interno, logística",
      "Captação: direção, fotografia, vídeo, som",
      "Pós-produção: edição, cor, design, versionamento por canal",
      "Site, landing pages e materiais comerciais",
    ],
    media: {
      src: null,
      alt: "Equipe da Bluver em captação: câmera em tripé e direção acompanhando o monitor.",
      ratio: "4:3",
      slot: "METODO/03, Construção: set de captação real",
      preview: "https://t3.ftcdn.net/jpg/02/21/78/14/1000_F_221781426_8KnD8ffIP26hahDfwCZe1NisICA7B2HA.jpg",
    },
  },
  {
    index: "04",
    title: "Distribuição",
    body: "Colocamos os ativos em circulação onde a decisão acontece, orgânico e pago trabalhando na mesma direção, com a mesma mensagem.",
    detail: [
      "Calendário e cadência por canal",
      "Campanhas de Meta Ads e Google Ads",
      "Landing pages e rotas de conversão",
      "Instrumentação de medição e eventos",
    ],
    media: {
      src: null,
      alt: "Tela com estrutura de campanha e painel de distribuição de conteúdo.",
      ratio: "4:3",
      slot: "METODO/04, Distribuição: operação de mídia, tela real",
      preview: "https://t4.ftcdn.net/jpg/04/81/99/15/1000_F_481991563_regpqRnLhdizuUTxHGSsiKLIBUKMwlSI.jpg",
    },
  },
  {
    index: "05",
    title: "Evolução",
    body: "O que funciona vira padrão, o que não funciona sai. A posição se mantém; a execução amadurece com os dados que a operação produz.",
    detail: [
      "Leitura de desempenho por ativo e por canal",
      "Revisão de mensagem e criativo",
      "Ajuste de investimento e de cadência",
      "Próximo ciclo de produção",
    ],
    media: {
      src: null,
      alt: "Reunião de revisão de resultados entre a Bluver e o cliente.",
      ratio: "4:3",
      slot: "METODO/05, Evolução: reunião de revisão com cliente",
      preview: "https://t3.ftcdn.net/jpg/02/80/84/60/1000_F_280846031_1dCzkNKW1pjIFaB8RFlJiqpbDQSgb2HS.jpg",
    },
  },
];
