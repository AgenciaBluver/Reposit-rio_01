import type { Media, Faq } from "./types";

/* ════════════════════════════════════════════════════════════════════════
   LANDING PAGES DE CONVERSÃO
   ────────────────────────────────────────────────────────────────────────
   Camada diferente das páginas de /segmentos, que existem para busca
   orgânica e identificação. Estas são apertadas: abrem pela DOR, provam
   que entendemos o mercado, mostram o que muda e pedem a conversa.

   Servem a dois usos ao mesmo tempo:
   · porta de entrada a partir da home, pelo seletor de realidade
   · destino de campanha de mídia paga, isoladamente

   REGRA MANTIDA: nada de número inventado. "Resultado" aqui é sempre o
   que muda de concreto na operação comercial, nunca percentual, ROAS ou
   faturamento que não podemos comprovar.
   ════════════════════════════════════════════════════════════════════════ */
export type Landing = {
  slug: string;
  label: string;
  audience: string;
  recognition: string;
  hero: { eyebrow: string; headline: string[]; sub: string; media: Media };
  pains: { pain: string; consequence: string }[];
  cost: { headline: string; body: string };
  shifts: { from: string; to: string }[];
  how: { index: string; title: string; body: string }[];
  includes: string[];
  proof: string[];
  faq: Faq[];
  cta: { label: string; sub: string };
  seo: { title: string; description: string };
};
const stock = (host: string, path: string, name: string) =>
  `https://${host}.ftcdn.net/jpg/${path}/1000_F_${name}.jpg`;
export const landings: Landing[] = [
  {
    slug: "industria",
    label: "Indústria",
    audience: "Metalmecânica, usinagem, injeção, automação e fornecedores técnicos",
    recognition: "Minha operação é melhor do que a impressão que ela passa.",
    hero: {
      eyebrow: "Para indústrias",
      headline: ["Sua indústria é boa.", "O mercado só não", "consegue ver isso."],
      sub: "Tolerância de centésimo, processo maduro, equipe técnica. E uma apresentação que não conta nada disso. Traduzimos capacidade técnica em percepção de mercado.",
      media: {
        src: null,
        alt: "Centro de usinagem CNC em operação, detalhe do fuso e da peça.",
        ratio: "3:2",
        slot: "LP INDÚSTRIA, Chão de fábrica real",
        preview: stock("t4", "07/50/64/49", "750644919_ihpW16nbJEwk1k3SlM0WmySk342ZRYLt"),
      },
    },
    pains: [
      {
        pain: "Nosso melhor vendedor é a indicação.",
        consequence:
          "Indicação é o melhor canal que existe, e o único que você não controla. Quando ela desacelera, não há segundo canal para segurar o mês. A carteira fica refém de quem lembrou de você.",
      },
      {
        pain: "O comprador pesquisa antes de pedir orçamento.",
        consequence:
          "Ele procura pelo processo, pela tolerância, pela aplicação. Se não encontra nada seu, encontra do concorrente. Você nem soube que estava numa concorrência, foi eliminado antes de ser convidado.",
      },
      {
        pain: "Nosso site tem dez anos e o catálogo é um PDF.",
        consequence:
          "Quem chega ali conclui, em segundos, que a empresa é menor e mais atrasada do que é. Essa conclusão vira o tom da primeira reunião: você começa provando porte em vez de discutir projeto.",
      },
      {
        pain: "Um concorrente menor parece maior do que nós.",
        consequence:
          "Ele não tem máquina melhor. Tem apresentação melhor. E, na dúvida entre dois fornecedores, o comprador escolhe o que transmite menos risco, não o que usina melhor.",
      },
      {
        pain: "Não conseguimos contratar técnico qualificado.",
        consequence:
          "O profissional que você quer pesquisa a empresa antes de responder a vaga. Se o que ele encontra não corresponde ao nível da operação, ele vai para o concorrente que parece melhor lugar para trabalhar.",
      },
      {
        pain: "Feira custa caro e o retorno some.",
        consequence:
          "Três dias de estande, investimento alto, e o que sobra é uma pasta de fotos que ninguém abre. O contato esfria em duas semanas porque nada continuou circulando depois.",
      },
      {
        pain: "Dependemos de dois ou três clientes grandes.",
        consequence:
          "A concentração aparece no dia em que um deles reduz o volume. Diversificar exige ser encontrado por quem ainda não te conhece e é exatamente isso que a ausência de presença impede.",
      },
      {
        pain: "Já tentamos marketing e não funcionou.",
        consequence:
          "Quase sempre porque foi tratado como consumo: post bonito, linguagem de varejo, promessa de volume. Indústria tem ciclo longo, público restrito e decisão técnica, a lógica é outra, e quem não entende isso queima o orçamento.",
      },
    ],
    cost: {
      headline: "O custo de não resolver isso não aparece no balanço.",
      body: "Ele aparece na cotação que você não foi chamado para disputar, no cliente que escolheu o concorrente sem visitar sua planta e no técnico que não respondeu a vaga. Nada disso vira linha no relatório, mas todo mês acontece.",
    },
    shifts: [
      {
        from: "O comprador chega sem saber o que você faz",
        to: "Chega sabendo, e a conversa começa no projeto",
      },
      {
        from: "Fotos de celular e catálogo desatualizado",
        to: "Acervo próprio da planta, do processo e das peças",
      },
      {
        from: "A indicação não tem para onde mandar",
        to: "Tem site, material e conteúdo que sustentam a indicação",
      },
      {
        from: "Presença zero onde o decisor técnico está",
        to: "Autoridade construída junto a quem especifica",
      },
      {
        from: "Feira vira álbum de fotos",
        to: "Feira vira acervo que trabalha nos meses seguintes",
      },
      {
        from: "RH explica a empresa do zero em cada vaga",
        to: "O candidato chega já convencido do nível da operação",
      },
    ],
    how: [
      {
        index: "01",
        title: "Entendemos o processo",
        body: "Antes de produzir qualquer coisa, aprendemos o que sua indústria faz: aplicação, tolerância, material, diferencial real de processo.",
      },
      {
        index: "02",
        title: "Definimos a posição",
        body: "Que tipo de fornecedor você quer ser na cabeça do comprador e o que deixa de ser dito para isso ficar claro.",
      },
      {
        index: "03",
        title: "Captamos na planta",
        body: "Diárias concentradas, respeitando segurança e produção. Vídeo, fotografia e detalhe técnico no mesmo dia.",
      },
      {
        index: "04",
        title: "Colocamos em circulação",
        body: "Site, LinkedIn, material comercial e campanhas para a demanda de nicho que procura por processo.",
      },
    ],
    includes: [
      "Site institucional com linguagem de catálogo e rigor de engenharia",
      "Filme institucional e registro de processo produtivo",
      "Banco de imagens próprio: planta, maquinário, detalhe e equipe",
      "Conteúdo técnico para LinkedIn, dirigido a quem especifica",
      "Campanhas de mídia para busca por processo e aplicação",
      "Cobertura de feira planejada para gerar acervo, não registro",
    ],
    proof: [
      "Base em Joinville, atendimento presencial no maior polo industrial de Santa Catarina",
      "Captação planejada junto à produção, com EPI e áreas restritas respeitadas",
      "Acordo de confidencialidade quando o processo exigir",
      "Mais de R$ 30 milhões gerenciados em mídia pela liderança de estratégia",
    ],
    faq: [
      {
        q: "Vocês entendem de processo industrial?",
        a: "Entendemos de tradução. O conhecimento técnico é seu; nosso trabalho é fazer as perguntas certas e transformar o que você domina em material que o mercado compreende. Aprender seu processo faz parte do diagnóstico.",
      },
      {
        q: "Dá para gravar sem parar a produção?",
        a: "Sim. A captação é planejada junto com a produção, respeitando segurança, EPI, áreas restritas e janelas operacionais. Concentramos em diárias para reduzir interferência.",
      },
      {
        q: "E o que é confidencial?",
        a: "É definido antes da captação: o que pode ser mostrado, o que precisa de outro enquadramento e o que não entra. Trabalhamos sob acordo de confidencialidade quando necessário.",
      },
      {
        q: "Quanto tempo até aparecer resultado?",
        a: "Depende do seu ciclo de venda, que na indústria costuma ser longo. Os ativos ficam prontos em semanas; a mudança de percepção junto ao mercado se constrói em meses. Quem promete resultado rápido em B2B técnico está adivinhando.",
      },
      {
        q: "Vocês atendem fora de Joinville?",
        a: "Sim. A base é Joinville e a atuação é nacional. Estratégia e pós-produção são remotas; a captação é presencial, agendada em diárias.",
      },
    ],
    cta: {
      label: "Quero ser percebido no nível que opero",
      sub: "A primeira conversa é de diagnóstico: entender a operação, o comprador e a distância entre as duas coisas.",
    },
    seo: {
      title: "Marketing para indústrias, traduza capacidade técnica em mercado",
      description:
        "Site, audiovisual, conteúdo técnico e mídia para indústrias que operam em alto nível e são percebidas abaixo disso. Base em Joinville, atuação nacional.",
    },
  },
  {
    slug: "prestacao-de-servicos",
    label: "Prestação de serviço",
    audience:
      "Consultorias, clínicas, contabilidade, arquitetura, engenharia e serviços especializados",
    recognition: "Entrego mais que o concorrente, e ainda assim discuto preço.",
    hero: {
      eyebrow: "Para prestadores de serviço",
      headline: ["Quando ninguém vê", "a diferença,", "sobra o preço."],
      sub: "Serviço especializado não se compara por ficha técnica. Se o mercado não enxerga o que te diferencia, ele decide pelo único critério que consegue medir e esse critério é o mais barato.",
      media: {
        src: null,
        alt: "Reunião de consultoria em escritório, profissionais analisando material sobre a mesa.",
        ratio: "3:2",
        slot: "LP SERVIÇOS, Reunião profissional real",
        preview: stock("t3", "05/01/67/28", "501672880_moCm9LrdfE7BppTdjYybYOncrCYVrAWO"),
      },
    },
    pains: [
      {
        pain: "Toda negociação vira discussão de preço.",
        consequence:
          "Quando o cliente não consegue ver diferença entre você e a opção mais barata, ele está sendo racional ao escolher pelo preço. O desconto não é falha do comercial, é sintoma de que a diferença não foi comunicada antes da reunião.",
      },
      {
        pain: "Tudo depende de indicação.",
        consequence:
          "Indicação traz cliente bom, mas não traz previsão. Você não escolhe quando ela chega nem quantos virão. O mês seguinte é sempre uma aposta, e planejar contratação ou estrutura vira adivinhação.",
      },
      {
        pain: "Só o sócio consegue vender.",
        consequence:
          "Porque a confiança está na pessoa, não na empresa. Isso limita o crescimento ao número de reuniões que ele consegue fazer por semana, e transforma férias, doença ou saída em risco direto de receita.",
      },
      {
        pain: "Nosso conteúdo é genérico.",
        consequence:
          "Atendimento personalizado, equipe especializada, compromisso com o cliente, são frases verdadeiras em praticamente todos os concorrentes. Por isso não diferenciam nenhum. O que você publica poderia ter o logo de outra empresa sem ninguém notar.",
      },
      {
        pain: "Um concorrente pior cobra mais que a gente.",
        consequence:
          "Ele não entrega melhor. Ele é percebido melhor. Preço é consequência de percepção de valor, não de qualidade técnica. E percepção se constrói antes de a proposta chegar.",
      },
      {
        pain: "A agenda oscila demais.",
        consequence:
          "Mês cheio, mês vazio. Sem presença constante, você só existe para o mercado quando alguém lembra de procurar. Quem aparece com consistência é lembrado primeiro e ser lembrado primeiro é meio caminho da venda.",
      },
      {
        pain: "Atraímos cliente que não é o nosso.",
        consequence:
          "Comunicação que fala com todo mundo atrai quem só compara preço. Posicionamento também serve para repelir: quem não é seu cliente deveria entender isso sozinho, antes de ocupar sua agenda.",
      },
      {
        pain: "Temos autoridade técnica que ninguém conhece.",
        consequence:
          "Anos de repertório, casos difíceis resolvidos, conhecimento raro: tudo isso vive dentro do escritório e nunca chega a quem precisa contratar. Conhecimento que não circula não vira reputação.",
      },
    ],
    cost: {
      headline: "A diferença que ninguém vê é a que você paga.",
      body: "Ela aparece no desconto dado para fechar, no cliente que escolheu mais barato, na proposta que virou orçamento comparativo. Você entrega melhor e recebe pelo mesmo ou por menos.",
    },
    shifts: [
      {
        from: "A conversa começa justificando preço",
        to: "Começa no escopo, porque o valor já foi entendido antes",
      },
      { from: "Só o sócio vende", to: "A empresa sustenta parte da confiança sozinha" },
      {
        from: "Conteúdo que qualquer concorrente poderia publicar",
        to: "Conteúdo que só você poderia ter escrito",
      },
      {
        from: "Você aparece quando alguém lembra",
        to: "Você é lembrado primeiro porque aparece sempre",
      },
      { from: "Lead que só compara preço", to: "Lead que chega entendendo com quem está falando" },
      {
        from: "Repertório trancado dentro da operação",
        to: "Repertório circulando como prova pública",
      },
    ],
    how: [
      {
        index: "01",
        title: "Achamos o recorte",
        body: "Em que assunto você quer ser o primeiro nome lembrado. Autoridade exige escolha: quem fala de tudo não é referência em nada.",
      },
      {
        index: "02",
        title: "Damos forma",
        body: "Site, identidade de comunicação e material comercial no nível do trabalho que você entrega.",
      },
      {
        index: "03",
        title: "Colocamos você em cena",
        body: "Serviço é comprado de pessoas. Dirigimos vídeo e fotografia para que isso funcione mesmo com quem nunca gravou.",
      },
      {
        index: "04",
        title: "Damos ritmo",
        body: "Publicação constante e, quando fizer sentido, mídia para acelerar o alcance junto a quem decide.",
      },
    ],
    includes: [
      "Definição de posicionamento e do território de autoridade",
      "Site institucional que comunica nível, não apenas serviços",
      "Produção recorrente de conteúdo com roteiro e direção",
      "Audiovisual e retratos dos sócios e da equipe",
      "Materiais comerciais e apresentações coerentes com a promessa",
      "Mídia paga quando houver demanda com intenção de busca",
    ],
    proof: [
      "Trabalho conduzido por duas disciplinas: estratégia e direção criativa",
      "Método com diagnóstico antes de qualquer produção",
      "Respeito às regras de comunicação de profissões regulamentadas",
      "Mais de R$ 30 milhões gerenciados em mídia pela liderança de estratégia",
    ],
    faq: [
      {
        q: "Isso vale para o meu tipo de serviço?",
        a: "Vale para serviço especializado com ticket e margem que comportem investimento em posicionamento: consultoria, contabilidade, clínicas, arquitetura, engenharia, tecnologia e áreas correlatas. A lógica é a mesma, conhecimento como produto e reputação como ativo.",
      },
      {
        q: "Preciso aparecer em vídeo?",
        a: "Ajuda bastante, porque confiança se ancora em pessoas. Mas conduzimos a direção para funcionar com quem nunca gravou, e existe caminho institucional para quem prefere menor exposição.",
      },
      {
        q: "Minha profissão é regulamentada. Tem problema?",
        a: "Não, desde que o trabalho respeite os limites do seu conselho, sem promessa de resultado, sem mercantilização, sem captação indevida. Trabalhamos em registro informativo e institucional, e a validação final de cada peça é sua.",
      },
      {
        q: "Vocês garantem mais clientes?",
        a: "Não. Construímos autoridade e presença; a conversão em contrato depende também da sua operação comercial. Somos diretos quando o gargalo não está na comunicação.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Os ativos ficam prontos em semanas. A mudança de percepção é de médio prazo e é justamente por isso que ela se sustenta quando acontece.",
      },
    ],
    cta: {
      label: "Quero parar de competir por preço",
      sub: "A primeira conversa é de diagnóstico: entender o serviço, o cliente e por que a diferença não está chegando até ele.",
    },
    seo: {
      title: "Posicionamento para prestadores de serviço, saia da guerra de preço",
      description:
        "Posicionamento, conteúdo e presença digital para consultorias, clínicas, contabilidade, arquitetura e serviços especializados que competem por preço sem precisar.",
    },
  },
  {
    slug: "imobiliario",
    label: "Mercado imobiliário",
    audience: "Construtoras, incorporadoras, imobiliárias e lançamentos",
    recognition: "Meu empreendimento é melhor, mas parece igual aos outros.",
    hero: {
      eyebrow: "Para construção e mercado imobiliário",
      headline: ["Cinco lançamentos", "na mesma região.", "O que faz o seu", "ser escolhido?"],
      sub: "Metragem parecida, acabamento equivalente, lazer quase idêntico. O que decide não é a ficha técnica. É o conceito, e a consistência com que ele aparece do nome ao anúncio.",
      media: {
        src: null,
        alt: "Empreendimento residencial em construção registrado no fim de tarde.",
        ratio: "3:2",
        slot: "LP IMOBILIÁRIO, Empreendimento real",
        preview: stock("t4", "18/87/59/13", "1887591377_menbbHhJmDzmo5TIfjs3UMuqcHSwLnMb"),
      },
    },
    pains: [
      {
        pain: "Todo empreendimento da região parece igual.",
        consequence:
          "Quando a diferenciação fica só na ficha técnica, o comprador compara pelo que sabe medir: preço por metro e condição de pagamento. Você entra numa disputa que só quem tem margem para descontar vence.",
      },
      {
        pain: "O material chega em cima da hora.",
        consequence:
          "O corretor improvisa o discurso, cada um conta uma história diferente e o lançamento estreia com três versões de si mesmo. O comprador percebe a inconsistência mesmo sem saber nomear.",
      },
      {
        pain: "Contratamos conceito, imagem e mídia separados.",
        consequence:
          "Três fornecedores, três interpretações do mesmo produto. O anúncio promete uma coisa, o material do estande diz outra, o corretor fala uma terceira. O investimento é somado, a mensagem não.",
      },
      {
        pain: "A mídia traz lead que não converte.",
        consequence:
          "Quase sempre a campanha está certa e o problema está antes: a página não responde a objeção real, ou o criativo atrai quem nunca teria renda para comprar. Aumentar a verba multiplica o desperdício.",
      },
      {
        pain: "O lead chega e se perde.",
        consequence:
          "Sem rota definida e sem integração com o CRM, o contato esfria entre o clique e o corretor. Você pagou pelo lead duas vezes: na mídia e na oportunidade que evaporou.",
      },
      {
        pain: "Temos estoque remanescente parado.",
        consequence:
          "Unidade remanescente costuma ser tratada como sobra, com a comunicação do lançamento reciclada. Ela precisa de argumento próprio. Quem compra depois compra por outro motivo.",
      },
      {
        pain: "A obra avança e ninguém vê.",
        consequence:
          "Evolução de obra é a prova mais concreta de que a entrega vai acontecer. E é o ativo mais desperdiçado do setor. Sem registro, você perde o argumento que mais reduz o medo de comprar na planta.",
      },
      {
        pain: "Cada lançamento recomeça do zero.",
        consequence:
          "Quando a marca da construtora não acumula reputação, todo lançamento paga de novo a conta da confiança. Quem constrói marca chega ao próximo produto com meio caminho andado.",
      },
    ],
    cost: {
      headline: "Na planta, ninguém compra o imóvel. Compra a ideia dele.",
      body: "E se a ideia não foi construída, o comprador monta a dele: normalmente a mais simples e a mais comparável. É aí que seu empreendimento vira mais um na tabela de preço por metro quadrado.",
    },
    shifts: [
      {
        from: "Mais um empreendimento na mesma faixa",
        to: "Um produto com conceito que o comprador repete",
      },
      { from: "Cada corretor conta uma história", to: "Discurso único do anúncio ao estande" },
      {
        from: "Perspectiva bonita sem narrativa",
        to: "Imagem que constrói desejo e sustenta preço",
      },
      {
        from: "Lead que esfria entre o clique e a ligação",
        to: "Rota definida, integrada ao time de vendas",
      },
      { from: "Obra avançando sem ninguém ver", to: "Evolução registrada como prova de entrega" },
      {
        from: "Cada lançamento recomeça do zero",
        to: "A marca da construtora acumula credibilidade",
      },
    ],
    how: [
      {
        index: "01",
        title: "Definimos o conceito",
        body: "Para quem é, que vida representa e qual promessa a obra vai sustentar. Antes de qualquer peça.",
      },
      {
        index: "02",
        title: "Construímos a imagem",
        body: "Filme de conceito, fotografia, drone e registro de obra: o material que cria desejo e prova andamento.",
      },
      {
        index: "03",
        title: "Montamos a rota",
        body: "Hotsite e landing pages de campanha com a objeção certa respondida e integração com o CRM de vendas.",
      },
      {
        index: "04",
        title: "Distribuímos por fase",
        body: "Pré-lançamento, lançamento e sustentação com criativo e verba ajustados a cada momento.",
      },
    ],
    includes: [
      "Conceito e posicionamento do empreendimento",
      "Filme de conceito, registro de obra e captação aérea com drone",
      "Fotografia de decorado, entorno e estágio de obra",
      "Hotsite e landing pages de campanha por fase",
      "Campanhas de Meta Ads e Google Ads com mensuração",
      "Cobertura de lançamento, abertura de decorado e evento de entrega",
    ],
    proof: [
      "Conceito, audiovisual, página e mídia na mesma casa, uma interpretação só",
      "Rotas de conversão desenhadas junto com o time comercial e integradas ao CRM",
      "Experiência em campanhas de lançamento e operações de alto investimento",
      "Mais de R$ 30 milhões gerenciados em mídia pela liderança de estratégia",
    ],
    faq: [
      {
        q: "Vocês trabalham por empreendimento ou por contrato contínuo?",
        a: "Dos dois modos. O empreendimento tem começo, meio e fim; a marca da construtora é contínua. O trabalho mais consistente combina os dois: a marca sustenta a credibilidade que cada lançamento aproveita.",
      },
      {
        q: "Vocês fazem as perspectivas 3D?",
        a: "As perspectivas normalmente vêm do escritório de arquitetura ou de estúdio especializado. Nós conduzimos a direção de arte, a fotografia, o audiovisual e a integração desse material na campanha.",
      },
      {
        q: "Como integra com o nosso CRM?",
        a: "As rotas de conversão são desenhadas junto com o time comercial e integradas ao CRM já em uso. Lead que chega sem organização é mídia desperdiçada.",
      },
      {
        q: "Atendem imobiliária, e não só construtora?",
        a: "Sim. A lógica muda: a imobiliária constrói autoridade sobre a região e sobre o processo de compra; a construtora constrói sobre produto e entrega.",
      },
      {
        q: "Vocês garantem VGV?",
        a: "Não. Influenciamos demanda, qualificação e percepção do produto. A conversão em venda depende também da operação comercial, da tabela e do momento de mercado.",
      },
    ],
    cta: {
      label: "Quero diferenciar meu empreendimento",
      sub: "A primeira conversa é de diagnóstico: entender o produto, a praça e o que o comprador está comparando.",
    },
    seo: {
      title: "Marketing imobiliário, conceito, imagem e campanha de lançamento",
      description:
        "Conceito, audiovisual, hotsite e campanhas para construtoras, incorporadoras e imobiliárias. Diferencie o empreendimento antes da guerra de preço por metro.",
    },
  },
];
export const getLanding = (slug: string) => landings.find((l) => l.slug === slug);
export const landingSlugs = landings.map((l) => l.slug);
