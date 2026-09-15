import type { Leader } from "./types";

/** Lideranças — competências complementares, não organograma.
 *  Bios curtas por decisão editorial. */
export const leadership: Leader[] = [
  {
    slug: "beatriz",
    name: "Beatriz",
    role: "Cofundadora e Diretora de Estratégia e Crescimento",
    discipline: "Estratégia e Crescimento",
    bio: "Trabalha do lado onde a comunicação encontra o negócio: como a empresa vende, quanto custa adquirir um cliente e o que precisa mudar para que a conta feche. Vem de operações de mídia de grande volume — e traz para a Bluver o rigor de quem responde por investimento.",
    territories: [
      "Estratégia",
      "Mídia paga",
      "Growth",
      "Funis",
      "Performance",
      "Gestão",
      "Processos",
    ],
    /* Credenciais verificáveis — informadas pela própria liderança.
       Usadas como redução de risco, nunca como seção de ego. */
    credentials: [
      "Mais de R$ 30 milhões gerenciados em mídia",
      "Operações com investimento superior a R$ 1 milhão/mês",
      "Experiência em B2B, B2C e e-commerce",
      "Geração de leads e lançamentos",
      "Campanhas internacionais com veiculação em mais de 100 países",
    ],
    portrait: {
      src: null,
      alt: "Retrato editorial de Beatriz, cofundadora da Bluver, responsável por estratégia e crescimento.",
      ratio: "3:4",
      slot: "LIDERANÇA — Retrato Beatriz (vertical, luz natural, ambiente real)",
    },
    linkedin: null,
  },
  {
    slug: "larissa",
    name: "Larissa",
    role: "Cofundadora e Diretora Criativa",
    discipline: "Direção Criativa",
    bio: "Decide o que a marca mostra e o que ela recusa mostrar. Conduz a direção do audiovisual da Bluver do roteiro ao corte final, e responde pelo padrão visual que separa um material que informa de um material que posiciona.",
    territories: [
      "Direção criativa",
      "Audiovisual",
      "Narrativa visual",
      "Pré-produção",
      "Direção",
      "Captação",
      "Pós-produção",
    ],
    portrait: {
      src: null,
      alt: "Retrato editorial de Larissa, cofundadora da Bluver, responsável pela direção criativa.",
      ratio: "3:4",
      slot: "LIDERANÇA — Retrato Larissa (vertical, luz natural, ambiente real)",
    },
    linkedin: null,
  },
];
