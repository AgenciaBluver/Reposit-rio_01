/* ════════════════════════════════════════════════════════════════════════
   PERGUNTAS SEM RESPOSTA
   ────────────────────────────────────────────────────────────────────────
   O device mais forte da home. Não são dores declaradas em terceira
   pessoa: são perguntas que o dono já se fez sozinho, no carro, depois de
   uma reunião ruim, e não conseguiu responder.

   Funcionam porque nenhuma delas se responde com o dado que a empresa
   tem hoje. O visitante percebe isso enquanto lê, e a conclusão vem dele,
   não da Bluver. É a demonstração do diagnóstico antes de vender o
   diagnóstico.

   Regra de escrita: primeira pessoa do plural, linguagem falada, sem
   marketingês. Se a pergunta puder ser respondida com "sim" ou "não" sem
   incomodar, ela não entra.
   ════════════════════════════════════════════════════════════════════════ */

export type QuestionSet = {
  key: string;
  label: string;
  /** Contexto curto do setor, exibido ao lado das perguntas. */
  context: string;
  /** Para onde vai quem se reconheceu. */
  href: string;
  questions: { q: string; note: string }[];
};

export const questionSets: QuestionSet[] = [
  {
    key: "industria",
    label: "Indústria",
    context: "Metalmecânica, usinagem, injeção, automação e fornecedores técnicos.",
    href: "/lp/industria",
    questions: [
      {
        q: "Quantos compradores pesquisaram a gente este mês e desistiram antes de ligar?",
        note: "Você não tem esse número. Ninguém tem. Mas ele existe, e todo mês.",
      },
      {
        q: "Se tirarem nosso logo do material, dá para saber que é a nossa empresa?",
        note: "Se a resposta demora, a marca ainda não tem forma própria.",
      },
      {
        q: "Por que o concorrente que usina pior consegue cobrar mais caro?",
        note: "Preço é consequência de percepção de valor, não de tolerância.",
      },
      {
        q: "O que o comprador encontra quando digita o nome da nossa empresa?",
        note: "Abra numa aba anônima agora. É essa a primeira reunião.",
      },
      {
        q: "Quantos técnicos bons não se candidataram porque pesquisaram antes?",
        note: "O candidato avalia a empresa pelo que ela aparenta ser.",
      },
      {
        q: "Se a indicação parar amanhã, o que sustenta o mês que vem?",
        note: "Indicação é o melhor canal que existe, e o único que você não controla.",
      },
    ],
  },
  {
    key: "servicos",
    label: "Prestação de serviço",
    context: "Consultorias, clínicas, contabilidade, arquitetura, engenharia e serviços especializados.",
    href: "/lp/prestacao-de-servicos",
    questions: [
      {
        q: "Por que o cliente pede desconto antes mesmo de entender o escopo?",
        note: "Porque o preço foi a única coisa que ele conseguiu comparar.",
      },
      {
        q: "O que a gente faz que o concorrente não faz? Em uma frase.",
        note: "Se levou mais de uma frase, o cliente não vai chegar lá sozinho.",
      },
      {
        q: "Se eu parar de vender por um mês, quantos clientes novos entram?",
        note: "Essa conta mede quanto da empresa ainda depende de uma pessoa só.",
      },
      {
        q: "Nosso conteúdo poderia ser publicado pelo concorrente sem ninguém notar?",
        note: "Conteúdo que serve para qualquer um não posiciona ninguém.",
      },
      {
        q: "Quem procura o que a gente faz encontra a gente, ou encontra outro?",
        note: "Não ser encontrado e não existir produzem o mesmo resultado comercial.",
      },
      {
        q: "Por que os melhores clientes vieram por indicação, e nunca pelo digital?",
        note: "Porque a indicação carrega a confiança que o digital ainda não constrói.",
      },
    ],
  },
  {
    key: "imobiliario",
    label: "Mercado imobiliário",
    context: "Construtoras, incorporadoras, imobiliárias e lançamentos.",
    href: "/lp/imobiliario",
    questions: [
      {
        q: "Tirando o nome, o que separa nosso empreendimento dos outros quatro da região?",
        note: "Se a resposta for metragem e acabamento, a disputa vai ser por preço.",
      },
      {
        q: "O corretor conta a mesma história que o anúncio?",
        note: "Três fornecedores diferentes produzem três versões do mesmo produto.",
      },
      {
        q: "Quantos leads chegaram esta semana e ninguém ligou de volta?",
        note: "Você pagou por eles duas vezes: na mídia e na oportunidade perdida.",
      },
      {
        q: "Por que o comprador visita o decorado e depois some?",
        note: "Entre a visita e a decisão existe um silêncio que ninguém preencheu.",
      },
      {
        q: "A obra avançou três meses. Quem viu?",
        note: "Evolução de obra é a prova de entrega mais concreta, e a mais desperdiçada.",
      },
      {
        q: "No próximo lançamento, a marca ajuda ou começamos do zero de novo?",
        note: "Construtora que não acumula reputação paga a conta da confiança sempre.",
      },
    ],
  },
];

/** Fechamento do bloco. A honestidade é o argumento: também não sabemos,
 *  e é exatamente por isso que existe um diagnóstico antes de produzir. */
export const questionsClosing = {
  headline: "Nenhuma dessas se responde com achismo.",
  body: "Nós também não sabemos as respostas. A diferença é que temos um jeito de descobrir, e é sempre por aí que o trabalho começa.",
};
