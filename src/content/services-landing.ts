import type { Media, Faq } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   LP DE SERVIÇOS
   Uma página só para os quatro serviços, pensada para ser navegada, não
   rolada: o visitante escolhe o serviço e a página troca de conteúdo no
   lugar. Assim quem chegou por "cobertura de evento" resolve a dúvida
   dele sem passar por três seções que não lhe dizem respeito, e quem
   chegou sem saber compara os quatro no mesmo enquadramento.
   ════════════════════════════════════════════════════════════════════════ */

export type ServiceCard = {
  key: string;
  index: string;
  name: string;
  /** Aparece no seletor, abaixo do nome. */
  tagline: string;
  /** A tese do serviço, em uma frase. */
  thesis: string;
  /** O erro comum que esta frente corrige. */
  mistake: { headline: string; body: string };
  /** O que entra. */
  includes: string[];
  /** Para quem faz mais sentido. */
  bestFor: string;
  /** Sinal comercial, quando existir. */
  note?: string;
  media: Media;
  cta: string;
};

const stock = (host: string, path: string, name: string) =>
  `https://${host}.ftcdn.net/jpg/${path}/1000_F_${name}.jpg`;

export const servicesLanding = {
  hero: {
    eyebrow: "Serviços",
    headline: ["Quatro frentes.", "Escolha por onde", "começar."],
    sub: "Conteúdo recorrente, cobertura de eventos, mídia paga e sites. Cada uma resolve um problema diferente, e todas constroem a mesma coisa: a percepção que o seu negócio ainda não tem.",
  },
  services: [
    {
      key: "conteudo",
      index: "01",
      name: "Conteúdo recorrente",
      tagline: "Presença que constrói autoridade nas redes",
      thesis: "Não é sobre postar mais. É sobre ser reconhecido.",
      mistake: {
        headline: "O erro é tratar conteúdo como calendário.",
        body: "Quando cada peça é decidida na semana em que vai ao ar, o resultado é um arquivo de publicações que não constrói nada. O mercado vê movimento e não forma opinião. E movimento sem opinião nunca vira preferência. A diferença entre quem publica e quem é referência está na decisão que veio antes do calendário.",
      },
      includes: [
        "Estratégia de pauta e territórios de autoridade",
        "Roteiro, direção e captação em diárias concentradas",
        "Edição, cor, design e versões por canal",
        "Fotografia para banco de imagens próprio",
        "Legendas e adaptação para consumo sem áudio",
        "Publicação com cadência definida",
      ],
      bestFor:
        "Empresas e profissionais que dependem de reputação e precisam ser lembrados antes da hora da decisão.",
      media: {
        src: null,
        alt: "Edição de vídeo em andamento, linha do tempo e correção de cor na tela.",
        ratio: "4:3",
        slot: "LP SERVIÇOS, conteúdo",
        preview: stock("t4", "05/20/10/61", "520106169_SSx8xtkI4ogGfv4GTGM8o6FSpBL8RyxI"),
      },
      cta: "Quero construir presença recorrente",
    },
    {
      key: "eventos",
      index: "02",
      name: "Cobertura de eventos",
      tagline: "O evento acaba, o conteúdo continua",
      thesis: "Um evento dura horas. O conteúdo pode trabalhar por meses.",
      mistake: {
        headline: "O erro é contratar registro quando se precisa de produção.",
        body: "Registrar é documentar o que aconteceu. Produzir é decidir, antes, o que aquele evento precisa provar sobre a empresa. Sem essa decisão, meses de planejamento e um investimento alto viram uma pasta de fotos que ninguém abre. Com ela, o mesmo evento gera material para os meses seguintes.",
      },
      includes: [
        "Planejamento de cobertura antes do evento",
        "Vídeo, fotografia e som na mesma operação",
        "Entrevistas com lideranças, convidados e clientes",
        "Cortes verticais para publicar durante o evento",
        "Filme institucional montado depois",
        "Banco de imagens organizado e plano de desdobramento",
      ],
      bestFor:
        "Quem investe em feira, congresso, lançamento ou evento próprio e quer que o retorno dure mais que o dia.",
      media: {
        src: null,
        alt: "Palestrante no palco durante evento corporativo, plateia ao fundo.",
        ratio: "4:3",
        slot: "LP SERVIÇOS, eventos",
        preview: stock("t3", "02/45/54/34", "245543401_IipVKLuG4QfowFWu1vOXPiwztke9wPI4"),
      },
      cta: "Quero transformar meu evento em conteúdo",
    },
    {
      key: "midia",
      index: "03",
      name: "Mídia paga",
      tagline: "Meta Ads e Google Ads ligados ao posicionamento",
      thesis: "Uma mensagem fraca não melhora quando é amplificada.",
      mistake: {
        headline: "O erro é mexer na campanha quando o problema veio antes dela.",
        body: "Quando o custo por lead sobe, a reação habitual é trocar a segmentação e aumentar o orçamento. Mas a campanha é a última etapa de uma cadeia. Se a mensagem não diferencia, se o criativo não sustenta a promessa ou se a página não responde à objeção real, nenhum ajuste de leilão corrige isso. Amplificar antes de resolver é a forma mais cara de descobrir o problema.",
      },
      includes: [
        "Estrutura de conta, públicos e testes no Meta Ads",
        "Pesquisa, Performance Max e YouTube no Google Ads",
        "Criativos produzidos pela mesma casa que definiu a posição",
        "Landing pages construídas para a campanha",
        "Instrumentação de eventos e integração de conversões",
        "Rotina de leitura, decisão e ajuste",
      ],
      bestFor:
        "Quem já tem o que dizer e precisa que a mensagem chegue às pessoas certas, na quantidade que o negócio suporta.",
      note: "Mais de R$ 30 milhões gerenciados em mídia pela liderança de estratégia.",
      media: {
        src: null,
        alt: "Painel de campanha digital sendo analisado em tela de computador.",
        ratio: "4:3",
        slot: "LP SERVIÇOS, mídia",
        preview: stock("t3", "05/65/96/68", "565966895_ETolnr58K21AlFsM2oG35qWByjQWDwqY"),
      },
      cta: "Quero conversar sobre aquisição",
    },
    {
      key: "sites",
      index: "04",
      name: "Sites",
      tagline: "A primeira reunião acontece sem você",
      thesis: "Antes de falar com sua empresa, o cliente já formou uma percepção sobre ela.",
      mistake: {
        headline: "O erro é achar que o site precisa ser bonito.",
        body: "Precisa ser coerente com o tamanho real da operação. Um site desatualizado não comunica só que o site está velho: comunica descuido, porte menor e tecnologia atrasada. Para quem vende caro, isso sai caro. É o único ativo que trabalha com todo mundo que pesquisa sobre você, inclusive quem está comparando.",
      },
      includes: [
        "Estratégia, arquitetura de páginas e redação",
        "Design autoral, sem tema pronto",
        "Desenvolvimento com performance como requisito",
        "Responsividade desenhada, não adaptada no fim",
        "SEO técnico, dados estruturados e sitemap",
        "Formulários, WhatsApp e eventos prontos para mídia",
      ],
      bestFor:
        "Quem precisa que o site sustente o preço que cobra, e não que o contradiga.",
      note: "Sites profissionais a partir de R$ 1.999, para escopo institucional definido.",
      media: {
        src: null,
        alt: "Site exibido em desktop e celular sobre mesa de trabalho.",
        ratio: "4:3",
        slot: "LP SERVIÇOS, sites",
        preview: stock("t4", "05/72/28/77", "572287741_mN9PEgwgt1dPgj1GvwB47raIqKW995Hr"),
      },
      cta: "Quero um novo site",
    },
  ] satisfies ServiceCard[],

  /* Como as frentes se combinam. Evita que a página vire cardápio. */
  combine: {
    headline: "Separadas funcionam. Juntas se multiplicam.",
    body: "Cada frente resolve o seu problema sozinha. Mas o conteúdo alimenta a mídia, a mídia leva para o site, o site converte o que o evento gerou. Quando tudo nasce da mesma direção, o investimento para de competir consigo mesmo.",
    chain: ["Posicionamento", "Conteúdo", "Mídia", "Site", "Conversão"],
  },

  faq: [
    {
      q: "Preciso contratar as quatro?",
      a: "Não. A maioria dos clientes começa por uma e acrescenta conforme o negócio pede. O diagnóstico existe justamente para dizer por onde começar, e o que não faz sentido agora.",
    },
    {
      q: "Vocês trabalham por projeto ou por recorrência?",
      a: "Dos dois modos. Site e evento têm começo, meio e fim. Conteúdo e mídia funcionam em recorrência, porque o valor deles é de acúmulo.",
    },
    {
      q: "Qual o investimento?",
      a: "Depende do escopo, do ciclo de venda e do mercado. Sites partem de R$ 1.999 para escopo institucional definido; as demais frentes são orçadas depois do diagnóstico. Preferimos um número real a um número redondo.",
    },
    {
      q: "Vocês atendem fora de Joinville?",
      a: "Sim. A base é Joinville e a atuação é nacional. Estratégia, pós-produção e mídia são conduzidas remotamente; a captação é presencial, agendada em diárias.",
    },
    {
      q: "Vocês garantem resultado?",
      a: "Não. Garantimos método, instrumentação correta e leitura transparente. A Bluver influencia demanda e oportunidades, mas parte do resultado depende da operação comercial do cliente.",
    },
  ] satisfies Faq[],

  seo: {
    title: "Serviços da Bluver: conteúdo, eventos, mídia paga e sites",
    description:
      "Produção de conteúdo recorrente, cobertura de eventos, mídia paga e criação de sites. Quatro frentes que constroem a percepção do seu negócio.",
  },
} as const;
