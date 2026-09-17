import type { Segment } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   SEGMENTOS — função: IDENTIFICAÇÃO.
   O visitante precisa pensar "eles entendem empresas como a minha".
   Adicionar /medicos, /clinicas, /contabilidade, /incorporadoras etc.
   = adicionar um objeto aqui. A rota e o sitemap seguem automaticamente.
   ════════════════════════════════════════════════════════════════════════ */

export const segments: Segment[] = [
  /* ──────────────────────────────────────────────── INDÚSTRIAS ───────── */
  {
    slug: "industrias",
    name: "Indústrias",
    navLabel: "Indústrias",
    hero: {
      eyebrow: "Segmento",
      headline: ["Sua indústria pode ter", "uma operação de alto nível", "e ainda parecer menor", "do que realmente é."],
      sub: "Capacidade técnica não se comunica sozinha. Traduzimos processo, precisão e engenharia em percepção de mercado, para clientes, para parceiros e para quem você quer contratar.",
      media: {
        src: null,
        alt: "Interior de indústria em operação: máquina de precisão em funcionamento, registrada em luz natural.",
        ratio: "3:2",
        slot: "INDÚSTRIAS/HERO, Chão de fábrica real de cliente (horizontal)",
      preview: "https://t4.ftcdn.net/jpg/05/78/31/89/1000_F_578318978_WTnZMEnr4hudQnTlwKfeILwM0S88Bp3j.jpg",
      },
    },
    thesis:
      "O mercado não avalia sua indústria pela tolerância que você entrega. Avalia pelo que consegue ver.",
    reality: {
      headline: "A distância entre o que a operação é e o que o mercado enxerga.",
      body: [
        "Uma indústria com maquinário de precisão, processo maduro e equipe técnica qualificada frequentemente se apresenta ao mercado com três fotos desatualizadas, um site de dez anos atrás e um catálogo em PDF.",
        "Isso tem consequência comercial concreta. O comprador que nunca visitou a planta forma sua opinião pelo que encontra antes da visita. O engenheiro que vai especificar o fornecedor pesquisa e compara. O profissional qualificado que você quer contratar avalia a empresa pelo que ela aparenta ser.",
        "A operação é de alto nível. A percepção, muitas vezes, ficou parada, e é a percepção que abre ou fecha a porta antes da primeira reunião.",
      ],
    },
    translation: [
      { from: "Maquinário de alta precisão", to: "Prova visual de capacidade técnica" },
      { from: "Processo e controle de qualidade", to: "Confiabilidade demonstrada, não afirmada" },
      { from: "Conhecimento da engenharia", to: "Conteúdo técnico que gera autoridade no setor" },
      { from: "Certificações e conformidade", to: "Redução de risco percebido pelo comprador" },
      { from: "Equipe e cultura", to: "Atração de profissionais qualificados" },
      { from: "Portfólio de aplicações", to: "Argumento comercial concreto e reutilizável" },
    ],
    fronts: [
      {
        title: "Site institucional",
        body: "A primeira verificação que um comprador técnico faz. Precisa comunicar porte, capacidade, aplicações atendidas e como iniciar uma conversa, com clareza de catálogo e rigor de engenharia.",
        product: "criacao-de-sites",
      },
      {
        title: "Audiovisual industrial",
        body: "Filme institucional e registro de processo. Mostrar a operação funcionando é o argumento mais forte que uma indústria tem, e o menos usado.",
        product: "producao-de-conteudo",
      },
      {
        title: "Fotografia de operação",
        body: "Banco de imagens próprio: planta, maquinário, detalhe técnico, equipe. Substitui definitivamente a foto de banco de imagem que não é a sua fábrica.",
        product: "producao-de-conteudo",
      },
      {
        title: "Conteúdo técnico e LinkedIn",
        body: "O decisor B2B está no LinkedIn. Conteúdo que explica aplicação, tolerância, material e processo constrói autoridade junto a quem especifica.",
        product: "producao-de-conteudo",
      },
      {
        title: "Mídia paga B2B",
        body: "Campanhas para demanda de nicho: quem procura um fornecedor por processo ou aplicação específica. Volume menor, intenção muito maior.",
        product: "midia-paga",
      },
      {
        title: "Feiras e eventos setoriais",
        body: "Feira é o momento de maior concentração de compradores do ano. Cobertura planejada transforma três dias de estande em material para os meses seguintes.",
        product: "cobertura-de-eventos",
      },
    ],
    faq: [
      {
        q: "Vocês entendem de processo industrial?",
        a: "Entendemos de tradução. O conhecimento técnico é seu; nosso trabalho é fazer perguntas certas e transformar o que você domina em material que o mercado compreende. Parte do diagnóstico é justamente aprender seu processo antes de produzir qualquer coisa.",
      },
      {
        q: "Podemos gravar dentro da planta sem parar a produção?",
        a: "Sim. A captação é planejada junto com a produção, respeitando segurança, EPI, áreas restritas e janelas operacionais. Concentramos em diárias para reduzir interferência.",
      },
      {
        q: "E as informações confidenciais?",
        a: "São definidas antes da captação: o que pode ser mostrado, o que precisa ser enquadrado de outra forma e o que não entra. Trabalhamos com acordo de confidencialidade quando necessário.",
      },
      {
        q: "Marketing funciona para indústria?",
        a: "Da forma que costuma ser vendida, frequentemente não. O ciclo é longo, o público é restrito e a decisão é técnica. O que funciona é construir autoridade junto a quem especifica e estar visível quando a necessidade aparece, que é uma lógica diferente da de consumo.",
      },
    ],
    cta: {
      label: "Conversar sobre a presença da sua empresa",
      href: "/contato?segmento=industrias",
      event: "cta_click",
    },
    seo: {
      title: "Marketing para indústrias, posicionamento e audiovisual industrial",
      description:
        "Site, audiovisual, fotografia e conteúdo técnico para indústrias que precisam traduzir capacidade técnica em percepção de mercado. Base em Joinville, atuação nacional.",
    },
  },

  /* ──────────────────────────────────────── ADVOCACIA E SERVIÇOS ─────── */
  {
    slug: "advocacia-e-servicos-profissionais",
    name: "Advocacia e serviços profissionais",
    navLabel: "Advocacia e serviços profissionais",
    hero: {
      eyebrow: "Segmento",
      headline: ["O conhecimento pode ser", "excelente e ainda ser", "comunicado de forma", "genérica."],
      sub: "Para bancas e escritórios de serviço profissional, a reputação é o ativo. Trabalhamos autoridade com a sobriedade que a profissão exige, sem promessa de resultado, sem sensacionalismo.",
      media: {
        src: null,
        alt: "Ambiente de escritório de advocacia: mesa de reunião, luz natural e profissionais em conversa.",
        ratio: "3:2",
        slot: "ADVOCACIA/HERO, Escritório real de cliente (horizontal, sóbrio)",
      preview: "https://t4.ftcdn.net/jpg/04/91/27/69/1000_F_491276991_JstXDupJLypMZKoHEHppgIBntYhhxtTn.jpg",
      },
    },
    thesis:
      "Reputação se constrói pelo que se demonstra com consistência, não pelo que se promete.",
    reality: {
      headline: "Quando todo mundo diz a mesma coisa, ninguém diz nada.",
      body: [
        "Atendimento personalizado. Equipe especializada. Compromisso com o cliente. Tradição e inovação. São frases verdadeiras na maioria dos escritórios, e por isso não diferenciam nenhum.",
        "Quem procura um advogado ou um profissional para uma questão relevante não está comparando serviços: está tentando reduzir risco. Quer entender quem domina aquele assunto específico, como essa pessoa pensa e se vai ser compreendido.",
        "O que diferencia não é o adjetivo. É a demonstração de raciocínio, visível, consistente e reconhecível ao longo do tempo.",
      ],
    },
    translation: [
      { from: "Especialização real em uma matéria", to: "Autoridade reconhecível em um território" },
      { from: "Experiência acumulada", to: "Repertório demonstrado com consistência" },
      { from: "Forma de pensar do profissional", to: "Critério que o cliente consegue avaliar antes" },
      { from: "Estrutura e equipe", to: "Percepção de solidez e continuidade" },
      { from: "Rede e reputação", to: "Indicação qualificada e recorrente" },
    ],
    fronts: [
      {
        title: "Posicionamento e território",
        body: "Definir a matéria em que o escritório quer ser lembrado primeiro. Autoridade exige recorte: quem fala de tudo não é referência em nada.",
      },
      {
        title: "Site institucional",
        body: "Clareza sobre áreas de atuação, sócios e forma de contato. Para serviço profissional, sobriedade e organização comunicam mais do que efeito.",
        product: "criacao-de-sites",
      },
      {
        title: "Conteúdo de autoridade",
        body: "Explicar o que a lei ou a norma significa na prática para o cliente, sem prometer desfecho, sem prospectar caso concreto. Ensinar é a forma mais sólida de demonstrar domínio.",
        product: "producao-de-conteudo",
      },
      {
        title: "Audiovisual e retrato",
        body: "Serviço profissional é comprado de pessoas. Retratos e vídeos bem dirigidos aproximam sem informalizar.",
        product: "producao-de-conteudo",
      },
      {
        title: "Presença institucional",
        body: "LinkedIn, participação em eventos, materiais e apresentações com padrão coerente ao nível do trabalho entregue.",
      },
      {
        title: "Mídia quando aplicável",
        body: "Nem toda atuação comporta anúncio, e regras profissionais variam por conselho. Quando aplicável, trabalhamos com contenção, presença institucional, não captação agressiva.",
        product: "midia-paga",
      },
    ],
    faq: [
      {
        q: "O marketing jurídico não é restrito pelo Código de Ética da OAB?",
        a: "É regulado, não proibido. Há limites claros sobre mercantilização, captação de clientela e promessa de resultado. Trabalhamos dentro de uma lógica informativa e institucional, e a validação final de cada peça é feita pelo escritório, que responde perante seu conselho.",
      },
      {
        q: "Vocês prometem aumento de clientes?",
        a: "Não. Construímos autoridade e presença; conversão em contratação depende de fatores que não controlamos, e, em profissões reguladas, prometer resultado é justamente o que não se deve fazer.",
      },
      {
        q: "Isso vale para outros serviços profissionais?",
        a: "Sim. Contabilidade, consultoria, arquitetura, engenharia, medicina e áreas correlatas compartilham a mesma lógica: conhecimento como produto, reputação como ativo e regulação a respeitar.",
      },
      {
        q: "Os sócios precisam aparecer?",
        a: "Ajuda bastante, porque a confiança se ancora em pessoas. Mas existe caminho institucional para quem prefere menor exposição, é uma decisão de direção, definida no início.",
      },
    ],
    cta: {
      label: "Conversar sobre posicionamento",
      href: "/contato?segmento=advocacia-e-servicos-profissionais",
      event: "cta_click",
    },
    seo: {
      title: "Posicionamento para advocacia e serviços profissionais",
      description:
        "Autoridade, conteúdo e presença digital para escritórios de advocacia e serviços profissionais, com a sobriedade que profissões reguladas exigem.",
    },
  },

  /* ────────────────────────────── CONSTRUÇÃO E MERCADO IMOBILIÁRIO ───── */
  {
    slug: "construtoras-e-mercado-imobiliario",
    name: "Construção e mercado imobiliário",
    navLabel: "Construção e mercado imobiliário",
    hero: {
      eyebrow: "Segmento",
      headline: ["O empreendimento é", "vendido muito antes", "de existir."],
      sub: "Para construtoras, incorporadoras e imobiliárias: conceito, imagem e distribuição trabalhando juntos, da definição do posicionamento do produto até a campanha de vendas.",
      media: {
        src: null,
        alt: "Obra de empreendimento em estágio avançado, registrada em luz de fim de tarde.",
        ratio: "3:2",
        slot: "IMOBILIÁRIO/HERO, Empreendimento real (horizontal, hora dourada)",
      preview: "https://t4.ftcdn.net/jpg/18/87/59/13/1000_F_1887591377_menbbHhJmDzmo5TIfjs3UMuqcHSwLnMb.jpg",
      },
    },
    thesis:
      "Quem compra na planta não compra o imóvel. Compra a percepção do que ele será.",
    reality: {
      headline: "Um empreendimento não se diferencia por metragem.",
      body: [
        "Na mesma região, no mesmo padrão e na mesma faixa de preço, os concorrentes oferecem plantas semelhantes, acabamentos equivalentes e listas de lazer quase idênticas.",
        "O que faz um empreendimento ser desejado antes de existir não é a ficha técnica. É o conceito: a ideia de vida que ele representa, e a consistência com que essa ideia aparece no nome, no material, no estande, no anúncio e na conversa do corretor.",
        "Quando conceito, imagem e mídia são contratados separadamente, o empreendimento chega ao mercado com três versões de si mesmo. E o comprador percebe.",
      ],
    },
    translation: [
      { from: "Localização e implantação", to: "Conceito de vida que o produto representa" },
      { from: "Projeto arquitetônico", to: "Desejo construído antes da entrega" },
      { from: "Padrão de acabamento", to: "Percepção de valor que sustenta o preço" },
      { from: "Histórico da construtora", to: "Segurança na compra de longo prazo" },
      { from: "Estágio de obra", to: "Prova de entrega e argumento de urgência" },
      { from: "Estande e decorado", to: "Experiência convertida em conteúdo e campanha" },
    ],
    fronts: [
      {
        title: "Conceito e posicionamento do produto",
        body: "A definição que vem antes de qualquer peça: para quem é, que vida representa, o que o diferencia de fato e qual a promessa que a obra vai sustentar.",
      },
      {
        title: "Audiovisual e fotografia",
        body: "Filme de conceito, registro de obra, decorado e entorno. Material que constrói desejo e, ao mesmo tempo, prova andamento.",
        product: "producao-de-conteudo",
      },
      {
        title: "Captação aérea",
        body: "Drone para implantação, entorno, vista e evolução de obra, o argumento visual mais direto sobre localização.",
        product: "producao-de-conteudo",
      },
      {
        title: "Site e landing pages",
        body: "Hotsite do empreendimento e páginas de campanha preparadas para receber mídia, com rotas de conversão para o time de vendas.",
        product: "criacao-de-sites",
      },
      {
        title: "Campanhas de lançamento",
        body: "Mídia paga estruturada por fase, pré-lançamento, lançamento e sustentação, com criativo e página construídos junto.",
        product: "midia-paga",
      },
      {
        title: "Eventos e ativações",
        body: "Lançamento, abertura de decorado e evento de entrega transformados em conteúdo e relacionamento, não apenas em registro.",
        product: "cobertura-de-eventos",
      },
    ],
    faq: [
      {
        q: "Vocês trabalham por empreendimento ou por contrato contínuo?",
        a: "Dos dois modos. Empreendimento tem começo, meio e fim; a marca da construtora é contínua. O trabalho mais consistente combina os dois, a marca sustenta a credibilidade que cada lançamento aproveita.",
      },
      {
        q: "Vocês fazem perspectivas e imagens 3D?",
        a: "As perspectivas normalmente vêm do escritório de arquitetura ou de um estúdio especializado. Nós conduzimos a direção de arte, a fotografia, o audiovisual e a integração desse material na campanha.",
      },
      {
        q: "Como integram com a equipe de vendas e o CRM?",
        a: "As rotas de conversão são desenhadas junto com o time comercial e integradas ao CRM que já está em uso. Lead que chega sem organização vira desperdício de mídia.",
      },
      {
        q: "Atendem imobiliárias, e não só construtoras?",
        a: "Sim. A lógica muda: a imobiliária constrói autoridade sobre a região e o processo de compra, enquanto a construtora constrói sobre produto e entrega.",
      },
    ],
    cta: {
      label: "Conversar sobre o seu empreendimento",
      href: "/contato?segmento=construtoras-e-mercado-imobiliario",
      event: "cta_click",
    },
    seo: {
      title: "Marketing para construtoras, incorporadoras e imobiliárias",
      description:
        "Conceito, audiovisual, site e campanhas para construtoras, incorporadoras e imobiliárias. Posicionamento de empreendimentos e lançamentos.",
    },
  },
];

export const getSegment = (slug: string) => segments.find((s) => s.slug === slug);
export const segmentSlugs = segments.map((s) => s.slug);
