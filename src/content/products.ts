import type { Product } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   PRODUTOS — as quatro portas comerciais de entrada.
   Marca = Bluver · Tese = autoridade e crescimento · Produtos = entrada.
   Adicionar um quinto produto = adicionar um objeto aqui. A rota
   /solucoes/[slug] e o sitemap passam a existir automaticamente.
   ════════════════════════════════════════════════════════════════════════ */

export const products: Product[] = [
  /* ────────────────────────────────────────────────────────── 01 ─────── */
  {
    slug: "producao-de-conteudo",
    index: "01",
    name: "Produção de conteúdo",
    positioning:
      "Recorrência de construção de autoridade — não volume de publicação.",
    thesis: "Não é sobre postar mais. É sobre ser reconhecido.",
    thesisBody:
      "Uma empresa não se torna referência porque publicou muito. Torna-se referência porque, toda vez que aparece, aparece do mesmo jeito, dizendo coisas que só ela poderia dizer. Consistência é o que transforma presença em memória — e memória é o que faz o mercado lembrar de você no momento da decisão.",
    hero: {
      eyebrow: "Solução 01",
      headline: ["Presença coerente", "o suficiente", "para ser reconhecida."],
      sub: "Produção recorrente com direção: estratégia, roteiro, captação e distribuição operando como um sistema só — para que a autoridade da empresa se acumule em vez de recomeçar todo mês.",
      media: {
        src: null,
        alt: "Equipe da Bluver em dia de captação, com câmera, iluminação e direção acompanhando a cena.",
        ratio: "3:2",
        slot: "PRODUÇÃO/HERO — Dia de captação da Bluver (horizontal, cinematográfico)",
      preview: "https://t4.ftcdn.net/jpg/05/20/10/61/1000_F_520106169_SSx8xtkI4ogGfv4GTGM8o6FSpBL8RyxI.jpg",
      },
    },
    problem: {
      headline: "O problema raramente é falta de conteúdo.",
      body: [
        "Muitas empresas já publicam. Publicam com frequência, inclusive. O que falta não é quantidade — é direção.",
        "Quando cada peça é decidida na semana em que vai ao ar, o resultado é um arquivo de publicações que não constrói nada. O mercado vê movimento, mas não forma opinião. E movimento sem opinião não vira preferência.",
        "A diferença entre uma empresa que publica e uma empresa que é referência não está no calendário. Está na decisão que veio antes dele.",
      ],
    },
    scope: [
      {
        title: "Estratégia e pauta",
        body: "Definição dos territórios que a empresa vai ocupar, dos temas que sustentam a autoridade e do que fica de fora. A pauta nasce da posição, não do que está em alta.",
      },
      {
        title: "Roteiro e pré-produção",
        body: "Roteiro, decupagem, definição de locações, participantes e logística. A captação começa muito antes da câmera ligar.",
      },
      {
        title: "Direção e captação",
        body: "Direção de cena, fotografia, vídeo e som. Conduzimos quem está na frente da câmera — porque a maior parte dos nossos clientes não é atriz, é especialista.",
      },
      {
        title: "Pós-produção",
        body: "Edição, tratamento de cor, design e versionamento por canal. Um material captado, vários formatos — sem que nenhum pareça sobra do outro.",
      },
      {
        title: "Fotografia",
        body: "Banco de imagens próprio da empresa: equipe, operação, produto, ambiente. Fotografia real substitui banco de imagem genérico.",
      },
      {
        title: "Distribuição",
        body: "Publicação com cadência definida, adaptação por canal e integração com as campanhas pagas quando elas existem.",
      },
    ],
    process: [
      {
        index: "01",
        title: "Pré-produção",
        body: "Decidimos o que vale ser registrado antes de registrar qualquer coisa. Pauta, roteiro, locação, participantes e cronograma fechados.",
        detail: [
          "Pauta do ciclo alinhada à posição da empresa",
          "Roteiro e decupagem por peça",
          "Definição de locação, equipe e participantes",
          "Cronograma de captação concentrado",
        ],
      },
      {
        index: "02",
        title: "Captação",
        body: "Diárias concentradas para produzir o acervo de um ciclo inteiro. Menos interrupção na rotina do cliente, mais consistência no resultado.",
        detail: [
          "Direção de cena e condução de quem aparece",
          "Vídeo, fotografia e som na mesma diária",
          "Registro de bastidores e operação real",
          "Conferência de material ainda no set",
        ],
      },
      {
        index: "03",
        title: "Pós-produção",
        body: "Edição com direção, não montagem por template. Cada peça sai no formato do canal onde vai viver.",
        detail: [
          "Edição, cor e som",
          "Design e tipografia aplicados ao padrão da marca",
          "Versões horizontais, verticais e estáticas",
          "Legendas — acessibilidade e consumo sem áudio",
        ],
      },
      {
        index: "04",
        title: "Distribuição",
        body: "O material entra em circulação com cadência e propósito. O que precisa de alcance recebe investimento.",
        detail: [
          "Calendário de publicação por canal",
          "Integração com campanhas pagas",
          "Acompanhamento do que performa",
          "Realimentação da pauta do próximo ciclo",
        ],
      },
    ],
    cta: {
      label: "Conhecer produção recorrente",
      href: "/contato?interesse=producao-de-conteudo",
      event: "cta_click",
    },
    faq: [
      {
        q: "Vocês trabalham com contrato mensal?",
        a: "Sim. Produção de autoridade é um trabalho de acúmulo: o valor aparece na consistência, não na peça isolada. Trabalhamos em ciclos recorrentes para que cada mês construa sobre o anterior.",
      },
      {
        q: "Quantas peças estão incluídas?",
        a: "O volume é definido no diagnóstico, a partir dos canais que a empresa realmente sustenta e do ciclo de decisão do seu cliente. Não vendemos pacote fechado de quantidade — vendemos a consistência necessária para a posição que a empresa quer ocupar.",
      },
      {
        q: "Precisamos aparecer em vídeo?",
        a: "Na maioria dos casos, sim — autoridade em serviço e indústria costuma passar por pessoas. Mas conduzimos a direção para que isso funcione mesmo com quem nunca gravou. Também existem formatos que constroem autoridade sem exposição pessoal.",
      },
      {
        q: "Com que frequência vocês vão até a empresa?",
        a: "Concentramos a captação em diárias, para reduzir interrupção na sua operação. A frequência é definida no ciclo e varia conforme o volume e a natureza do material.",
      },
      {
        q: "Vocês atendem fora de Joinville?",
        a: "Sim. A base é Joinville, a atuação é nacional. Estratégia, pós-produção e distribuição são conduzidas remotamente; a captação é presencial, agendada em diárias.",
      },
    ],
    offer: null,
    seo: {
      title: "Produção de conteúdo recorrente para empresas",
      description:
        "Produção audiovisual e de conteúdo com direção estratégica: roteiro, captação, pós-produção e distribuição em ciclos recorrentes. Base em Joinville, atuação nacional.",
    },
  },

  /* ────────────────────────────────────────────────────────── 02 ─────── */
  {
    slug: "cobertura-de-eventos",
    index: "02",
    name: "Cobertura de eventos",
    positioning:
      "Eventos transformados em ativos de marca — não em um álbum de fotos.",
    thesis: "Um evento dura horas. O conteúdo pode trabalhar por meses.",
    thesisBody:
      "A maior parte do investimento em um evento é convertida em experiência para quem estava lá. É muito dinheiro para uma audiência que já é sua. O que decide o retorno é o que sobra depois: o material que continua circulando, abrindo conversa e provando posição para quem não pôde ir.",
    hero: {
      eyebrow: "Solução 02",
      headline: ["Se o evento acaba,", "o conteúdo não", "precisa acabar."],
      sub: "Transformamos eventos em ativos de conteúdo, relacionamento e percepção de marca — planejados antes, capturados durante e desdobrados depois.",
      media: {
        src: null,
        alt: "Cobertura de evento corporativo pela Bluver: câmera em movimento registrando o público durante uma palestra.",
        ratio: "3:2",
        slot: "EVENTOS/HERO — Cobertura real em evento (horizontal)",
      preview: "https://t3.ftcdn.net/jpg/02/45/54/34/1000_F_245543401_IipVKLuG4QfowFWu1vOXPiwztke9wPI4.jpg",
      },
    },
    problem: {
      headline: "O evento acabou. E agora?",
      body: [
        "Meses de planejamento, investimento significativo, uma operação inteira mobilizada — e, no dia seguinte, o que resta é uma pasta de fotos que ninguém abre.",
        "O problema não é a cobertura. É que a cobertura foi contratada como registro, e não como produção. Registrar é documentar o que aconteceu. Produzir é decidir, antes, o que aquele evento precisa provar sobre a empresa.",
        "Quando essa decisão é tomada antes, o mesmo evento gera material para os meses seguintes: prova para o comercial, presença para o digital e acervo para a marca.",
      ],
    },
    scope: [
      {
        title: "Planejamento de cobertura",
        body: "Antes do evento: o que precisa ser provado, quem precisa ser entrevistado, que momentos são inegociáveis e como o material será usado depois.",
      },
      {
        title: "Captação multiformato",
        body: "Vídeo, fotografia e som na mesma operação, com equipe dimensionada para o porte do evento e para os formatos que serão desdobrados.",
      },
      {
        title: "Entrevistas e depoimentos",
        body: "Captação conduzida com convidados, lideranças e clientes — a matéria-prima mais valiosa de um evento e a que mais se perde quando não é planejada.",
      },
      {
        title: "Conteúdo de ritmo rápido",
        body: "Cortes verticais e material para publicação durante ou logo após o evento, quando a atenção ainda está alta.",
      },
      {
        title: "Filme institucional",
        body: "Peça de fôlego, montada depois, que traduz o evento em posicionamento — a que continua sendo usada em apresentações e no comercial.",
      },
      {
        title: "Banco de imagens e desdobramento",
        body: "Acervo organizado e entregue, com plano de desdobramento para os meses seguintes.",
      },
    ],
    process: [
      {
        index: "01",
        title: "Antes — planejamento",
        body: "A cobertura é desenhada antes do evento existir. Sem isso, a equipe passa o dia reagindo ao que acontece em vez de construir o que foi decidido.",
        detail: [
          "Objetivo do evento e o que ele precisa provar",
          "Roteiro de cobertura e momentos inegociáveis",
          "Lista de entrevistas e alinhamento com os convidados",
          "Plano de uso do material após o evento",
        ],
      },
      {
        index: "02",
        title: "Durante — captação",
        body: "Equipe posicionada para cobrir simultaneamente o palco, os bastidores, as conversas e os detalhes que constroem atmosfera.",
        detail: [
          "Palco, público, bastidores e ambientação",
          "Entrevistas em espaço preparado",
          "Fotografia para institucional e para imprensa",
          "Material de ritmo rápido para publicação imediata",
        ],
      },
      {
        index: "03",
        title: "Depois — desdobramento",
        body: "É aqui que o investimento do evento se paga. O acervo vira uma sequência de conteúdos com vida própria.",
        detail: [
          "Filme institucional do evento",
          "Série de cortes e recortes temáticos",
          "Depoimentos editados individualmente",
          "Banco de imagens organizado e entregue",
        ],
      },
    ],
    cta: {
      label: "Quero transformar meu evento em conteúdo",
      href: "/contato?interesse=cobertura-de-eventos",
      event: "cta_click",
    },
    faq: [
      {
        q: "Com quanta antecedência vocês precisam ser acionados?",
        a: "Quanto antes, melhor — o valor desta solução está no planejamento anterior ao evento. Coberturas contratadas em cima da hora são possíveis, mas entregam registro, não desdobramento.",
      },
      {
        q: "Vocês entregam material durante o evento?",
        a: "Sim, quando isso faz parte do plano. Conteúdo de ritmo rápido pode ser entregue ao longo do dia, com equipe dimensionada para isso.",
      },
      {
        q: "O que exatamente é entregue no final?",
        a: "Depende do escopo definido no planejamento. O conjunto típico inclui filme institucional, cortes para redes, depoimentos editados e banco de imagens organizado.",
      },
      {
        q: "Vocês cobrem eventos fora de Santa Catarina?",
        a: "Sim. A base é Joinville e a atuação é nacional; deslocamento e logística entram no orçamento.",
      },
    ],
    offer: null,
    seo: {
      title: "Cobertura de eventos corporativos — vídeo e fotografia",
      description:
        "Cobertura de eventos planejada como ativo de marca: filme institucional, entrevistas, conteúdo vertical e banco de imagens. Base em Joinville, atuação nacional.",
    },
  },

  /* ────────────────────────────────────────────────────────── 03 ─────── */
  {
    slug: "midia-paga",
    index: "03",
    name: "Mídia paga",
    positioning:
      "Distribuição conectada a posicionamento, criativo e página — não gestão de tráfego isolada.",
    thesis: "Uma mensagem fraca não melhora quando é amplificada.",
    thesisBody:
      "Mídia é multiplicador. Multiplica o que já existe — inclusive a falta de clareza. Quando o posicionamento não está resolvido, o criativo não sustenta a promessa ou a página não conclui a conversa, aumentar o investimento apenas faz o problema custar mais caro. Por isso mídia, na Bluver, não é uma operação separada.",
    hero: {
      eyebrow: "Solução 03",
      headline: ["Mídia amplifica.", "Mas primeiro é preciso", "ter algo certo", "para amplificar."],
      sub: "Meta Ads e Google Ads operados junto com posicionamento, criativo e página — porque o resultado de uma campanha é decidido muito antes do leilão.",
      media: {
        src: null,
        alt: "Tela de operação de campanhas com estrutura de conta e painel de desempenho.",
        ratio: "3:2",
        slot: "MÍDIA/HERO — Operação real de mídia (tela, ambiente de trabalho)",
      preview: "https://t3.ftcdn.net/jpg/05/65/96/68/1000_F_565966895_ETolnr58K21AlFsM2oG35qWByjQWDwqY.jpg",
      },
    },
    problem: {
      headline: "Quase sempre, o problema não está na campanha.",
      body: [
        "Quando o custo por lead sobe, a reação habitual é mexer na campanha: trocar a segmentação, testar outro público, aumentar o orçamento.",
        "Mas a campanha é apenas a última etapa de uma cadeia. Se a mensagem não diferencia, se o criativo não sustenta a promessa, se a página não responde à objeção real — nenhum ajuste de leilão corrige isso.",
        "Amplificar antes de resolver é a forma mais cara de descobrir que havia um problema anterior.",
      ],
    },
    scope: [
      {
        title: "Meta Ads",
        body: "Estrutura de conta, públicos, criativos e testes. Campanhas de demanda, de captura e de remarketing operando com funções distintas.",
      },
      {
        title: "Google Ads",
        body: "Pesquisa, Performance Max, YouTube e Display conforme a intenção existente no mercado — não conforme o que está na moda.",
      },
      {
        title: "Criativos",
        body: "O criativo é produzido pela mesma casa que definiu a posição. Isso elimina a distância entre o que a marca diz e o que o anúncio promete.",
      },
      {
        title: "Landing pages",
        body: "Páginas construídas para a campanha, com a objeção certa respondida no lugar certo. Sem isso, o investimento vaza no último passo.",
      },
      {
        title: "Mensuração",
        body: "Instrumentação de eventos, integração de conversões e leitura honesta do que o dado permite afirmar — e do que não permite.",
      },
      {
        title: "Análise e evolução",
        body: "Rotina de leitura, decisão e ajuste. O que funciona vira padrão; o que não funciona sai da conta.",
      },
    ],
    process: [
      {
        index: "01",
        title: "Posicionamento",
        body: "Qual é a mensagem que diferencia — e qual é a objeção real que impede a compra.",
      },
      {
        index: "02",
        title: "Criativo",
        body: "A peça que carrega a mensagem sem enfraquecê-la. Produzida com a mesma direção do restante da marca.",
      },
      {
        index: "03",
        title: "Página",
        body: "O destino que conclui a conversa iniciada pelo anúncio, em vez de recomeçá-la.",
      },
      {
        index: "04",
        title: "Mídia",
        body: "Estrutura, verba e leilão. A etapa que quase todo mundo chama de 'tráfego' — e que só funciona apoiada nas três anteriores.",
      },
      {
        index: "05",
        title: "Dados",
        body: "Medição instrumentada. Sem evento configurado corretamente, não existe decisão — existe opinião com planilha.",
      },
      {
        index: "06",
        title: "Evolução",
        body: "Ciclo de revisão: mensagem, criativo, página e verba ajustados com base no que a operação mostrou.",
      },
    ],
    cta: {
      label: "Conversar sobre aquisição",
      href: "/contato?interesse=midia-paga",
      event: "cta_click",
    },
    faq: [
      {
        q: "Vocês assumem a conta de anúncios que já existe?",
        a: "Sim, e normalmente começamos por uma auditoria da estrutura atual. Em boa parte dos casos há histórico aproveitável — reconstruir do zero nem sempre é a decisão certa.",
      },
      {
        q: "Qual investimento mínimo em mídia?",
        a: "Depende do mercado, do ciclo de venda e do ticket. Definimos isso no diagnóstico: um valor que não sustente aprendizado gera custo sem informação, e isso não interessa a ninguém.",
      },
      {
        q: "Vocês garantem resultado?",
        a: "Não. Ninguém honesto garante. Garantimos método, instrumentação correta, leitura transparente e ajuste contínuo — e somos diretos quando o problema não está na mídia.",
      },
      {
        q: "Vocês produzem os criativos ou usamos os nossos?",
        a: "Podemos operar dos dois jeitos. Quando produzimos, a mensagem da campanha e a posição da marca nascem da mesma direção — o que costuma reduzir o atrito entre promessa e entrega.",
      },
      {
        q: "Como é feito o acompanhamento?",
        a: "Com rotina de leitura definida no início do trabalho e acesso direto aos painéis. Você enxerga o que nós enxergamos.",
      },
    ],
    offer: null,
    seo: {
      title: "Mídia paga — Meta Ads e Google Ads com estratégia",
      description:
        "Gestão de mídia paga conectada a posicionamento, criativo, landing page e mensuração. Meta Ads e Google Ads para negócios de alto valor.",
    },
  },

  /* ────────────────────────────────────────────────────────── 04 ─────── */
  {
    slug: "criacao-de-sites",
    index: "04",
    name: "Criação de sites",
    positioning:
      "O site como materialização digital do posicionamento — não como página institucional.",
    thesis: "Seu site é a primeira reunião que acontece sem você.",
    thesisBody:
      "Antes de qualquer conversa, o cliente já procurou sua empresa, abriu o site e formou uma percepção. Essa percepção define o tom da reunião que ainda vai acontecer: se você vai precisar provar que é grande, ou se já entrou na sala com isso resolvido.",
    hero: {
      eyebrow: "Solução 04",
      headline: ["Seu site é a", "primeira reunião", "que acontece", "sem você."],
      sub: "Estratégia, arquitetura, design e desenvolvimento de sites que traduzem o nível real da operação — rápidos, responsivos e construídos para converter.",
      media: {
        src: null,
        alt: "Site desenvolvido pela Bluver exibido em desktop e celular sobre mesa de trabalho.",
        ratio: "3:2",
        slot: "SITES/HERO — Projeto real em tela (desktop + mobile)",
      preview: "https://t4.ftcdn.net/jpg/05/72/28/77/1000_F_572287741_mN9PEgwgt1dPgj1GvwB47raIqKW995Hr.jpg",
      },
    },
    problem: {
      headline: "Antes de falar com sua empresa, o cliente já decidiu algo sobre ela.",
      body: [
        "Um site desatualizado não comunica apenas que o site está desatualizado. Comunica descuido, porte menor, tecnologia atrasada — conclusões que quem visita tira em segundos e raramente revisa.",
        "Para empresas que vendem caro, isso é caro. O site é o único ativo que trabalha com todo mundo que pesquisa sobre você: o cliente que vai comprar, o que está comparando, o parceiro que está avaliando, o profissional que está decidindo se quer trabalhar aí.",
        "Ele não precisa ser bonito. Precisa ser coerente com o tamanho real da operação.",
      ],
    },
    scope: [
      {
        title: "Estratégia",
        body: "Para quem o site fala, qual objeção precisa vencer e que ação precisa provocar. Antes de qualquer tela.",
      },
      {
        title: "Arquitetura",
        body: "Estrutura de páginas e de navegação preparada para crescer — novos serviços, segmentos e campanhas sem reconstruir o projeto.",
      },
      {
        title: "UX e UI",
        body: "Hierarquia, ritmo de leitura e direção de arte autoral. O site precisa parecer seu, não parecer um tema.",
      },
      {
        title: "Desenvolvimento",
        body: "Código próprio, performance como requisito e responsividade desenhada — não adaptada no final.",
      },
      {
        title: "SEO técnico",
        body: "Estrutura semântica, metadados, dados estruturados, sitemap e URLs limpas. A base que permite o site ser encontrado.",
      },
      {
        title: "Conversão e integração",
        body: "Formulários, WhatsApp, rotas de conversão e instrumentação de eventos prontos para receber mídia paga.",
      },
    ],
    process: [
      {
        index: "01",
        title: "Diagnóstico e escopo",
        body: "Entendimento do negócio, do público e do papel comercial que o site precisa cumprir.",
      },
      {
        index: "02",
        title: "Arquitetura e conteúdo",
        body: "Mapa de páginas, hierarquia de mensagem e redação orientada à decisão de quem lê.",
      },
      {
        index: "03",
        title: "Design",
        body: "Direção de arte e interface, desenhadas para desktop e mobile com o mesmo cuidado.",
      },
      {
        index: "04",
        title: "Desenvolvimento",
        body: "Construção, otimização de performance, SEO técnico e testes em dispositivos reais.",
      },
      {
        index: "05",
        title: "Publicação",
        body: "Publicação, instrumentação de analytics, verificação de indexação e entrega orientada.",
      },
    ],
    cta: {
      label: "Quero um novo site",
      href: "/contato?interesse=criacao-de-sites",
      event: "cta_click",
    },
    faq: [
      {
        q: "O que está incluído no valor inicial?",
        a: "Sites profissionais a partir de R$ 1.999 cobrem projeto, design e desenvolvimento de um site institucional de escopo definido. Estruturas maiores — mais páginas, integrações, e-commerce, áreas restritas — são orçadas conforme o projeto.",
      },
      {
        q: "Em quanto tempo o site fica pronto?",
        a: "O prazo é definido com o escopo, e depende principalmente da disponibilidade de conteúdo e de aprovações do seu lado. Preferimos combinar um prazo real no início a prometer um número redondo antes de conhecer o projeto.",
      },
      {
        q: "Vocês fazem o conteúdo e as fotos?",
        a: "Sim. Redação, fotografia e audiovisual podem entrar no escopo — e é o caminho mais comum quando a empresa quer que o site represente a operação de verdade, em vez de banco de imagens.",
      },
      {
        q: "O site fica preparado para anúncios?",
        a: "Sim. Entregamos com estrutura de eventos e rotas de conversão prontas para Meta Ads e Google Ads, e com landing pages de campanha quando isso faz parte do plano.",
      },
      {
        q: "Quem fica com o site depois?",
        a: "Você. Domínio, hospedagem e projeto ficam no seu nome. Manutenção e evolução podem ser contratadas à parte.",
      },
      {
        q: "Vocês fazem apenas landing pages?",
        a: "Sim, quando o objetivo é campanha. Uma LP tem função diferente de um site institucional — e funciona melhor quando é tratada assim.",
      },
    ],
    offer: {
      label: "Sites profissionais",
      value: "A partir de R$ 1.999",
      note: "Valor de entrada para site institucional de escopo definido. Projetos com mais páginas, integrações ou comércio eletrônico são orçados conforme o escopo.",
    },
    seo: {
      title: "Criação de sites profissionais para empresas",
      description:
        "Criação de sites com estratégia, design autoral, performance e SEO técnico. Sites profissionais a partir de R$ 1.999. Base em Joinville, atuação nacional.",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productSlugs = products.map((p) => p.slug);
