# Bluver — site institucional e infraestrutura comercial

**Autoridade que movimenta negócios.**
Base em Joinville. Atuação nacional.

Site construído em Next.js 16 (App Router), React 19 e Tailwind CSS 4.
Todas as 22 rotas são geradas estaticamente no build.

---

## Antes de publicar — 4 pendências

Estas são as únicas coisas que faltam. Nenhuma exige mexer em código de
componente.

| # | Pendência | Onde resolver |
|---|---|---|
| 1 | **Licença da fonte.** Os arquivos da Atipla ND vieram com licença `Demo for Personal Use` (ifonts.xyz), que **não cobre uso comercial**. É preciso adquirir a licença webfont antes de o site ir ao ar. | `src/styles/fonts.css` |
| 2 | **Fotografia e vídeo.** Nenhuma imagem real existe no projeto. Todos os slots estão declarados e renderizam um placeholder editorial que descreve o material a produzir. | `src/content/*.ts` (campos `media`) |
| 3 | **IDs de analytics.** Nenhum ID fictício foi versionado. Sem `NEXT_PUBLIC_GTM_ID`, nada de terceiro é carregado. | `.env` (ver `.env.example`) |
| 4 | **Endpoint do formulário.** Sem `FORM_ENDPOINT`, o formulário não finge sucesso: avisa que o envio não está ligado e oferece os canais diretos. | `.env` |

---

## Rodando

```bash
npm install
cp .env.example .env     # preencha o que já existir
npm run dev              # http://localhost:3000
npm run build            # build de produção
npm run typecheck        # TypeScript estrito
```

---

## Identidade — um arquivo só

Toda a identidade vive em **`src/styles/tokens.css`**. Nenhuma cor,
tamanho ou família é declarado fora dele.

**Paleta oficial**

| Token | Valor | Uso |
|---|---|---|
| `--bv-ink` | `#070707` | Preto institucional, base e contraste |
| `--bv-paper` | `#F2F2F2` | Claro, respiro e leitura |
| `--bv-signal` | `#007AEE` | Azul Bluver — sinal sobre fundo claro |
| `--bv-signal-mid` | `#00B4CE` | Ciano — meio do gradiente |
| `--bv-signal-lift` | `#00FFE2` | Turquesa — acento sobre fundo escuro |

**Disciplina do gradiente.** Ele é um *sinal*, não um plano de fundo:
aparece em réguas de 2px, marcadores de etapa e uma única palavra por
página. Nunca como fundo de seção. Densidade alvo: ~5% da área visível.

**Contraste verificado.** Turquesa só sobre escuro (15:1); sobre o claro
é ilegível e está proibido no sistema. O azul sobre claro (4.0:1) é
reservado a título grande e elementos não textuais — nunca texto corrido.

**Para trocar a identidade:** edite os valores em `tokens.css`, a família
em `fonts.css` e `public/media/brand/logo.svg`. Nada mais.

---

## Conteúdo — nada é hardcoded nas páginas

Todo texto vive em `src/content/`, com contratos tipados em `types.ts`.

| Arquivo | O que guarda |
|---|---|
| `site.ts` | Marca, essência, tese, CTAs aprovados, ressalva institucional |
| `products.ts` | As 4 soluções, com página completa cada |
| `segments.ts` | Os 3 segmentos |
| `cases.ts` | Projetos e depoimentos |
| `campaigns.ts` | Landing pages de campanha |
| `leadership.ts` | Beatriz e Larissa |
| `method.ts` | As 5 etapas do método |
| `nav.ts` | Menu — derivado de produtos e segmentos |

**Adicionar um segmento** (ex.: `/segmentos/medicos`): acrescente um
objeto em `segments.ts`. A rota, o menu, o rodapé, o sitemap e os links
internos passam a existir automaticamente. O mesmo vale para produtos,
cases e campanhas.

### Regra inegociável: nada é inventado

Não há cliente, depoimento, número, prêmio ou resultado fictício no
projeto. Os dois cases (`expo-inovacao-joinville`, `eletroerosao-a-fio`)
estão marcados como `status: "placeholder"`: a página mostra a estrutura
narrativa definida, sinaliza "em produção" e fica `noindex` até ser
preenchida. No case, `impacto.objetivo` e `impacto.comprovado` são campos
separados por princípio — sem dado verificável, `comprovado` fica `null`.

### Slots de mídia

`src/content/types.ts` → `Media`. Com `src: null`, o componente renderiza
um placeholder que exibe o campo `slot` — o nome exato do material a
produzir. Ele funciona como briefing visível e some assim que o arquivo
real é apontado. O `alt` já está escrito, descrevendo o que a imagem deve
mostrar.

---

## Arquitetura

```
/                                    Home — função: MARCA
/solucoes                            Índice
  /producao-de-conteudo              ┐
  /cobertura-de-eventos              │ função: INTENÇÃO
  /midia-paga                        │
  /criacao-de-sites                  ┘
/segmentos                           Índice
  /industrias                        ┐
  /advocacia-e-servicos-profissionais│ função: IDENTIFICAÇÃO
  /construtoras-e-mercado-imobiliario┘
/metodo  /sobre  /projetos  /projetos/[slug]  /contato
/lp/[slug]                           função: CONVERSÃO (noindex)
/calculadora                         função: FERRAMENTA (chrome reduzido)
```

As LPs ficam fora do grupo de rotas `(site)`: não herdam menu nem rodapé
institucional — menos saída, mais intenção. São `noindex` para não
disputarem o orgânico com a página de solução, que é a versão canônica.

---

## Calculadora de precificação — `/calculadora`

Ferramenta aberta para quem vende **impressão 3D no Mercado Livre**.
Roda 100% no navegador: página estática, sem backend, sem banco e sem
envio de dados. O que a pessoa digita é salvo no `localStorage` dela.

**O que entra na conta**

| Bloco | Campos |
|---|---|
| O produto | preço do quilo do filamento (padrão R$ 100), peso em gramas, perda de material, tempo de impressão, taxa de falha, **composição do kit** |
| Custos de produção | consumo em watts, custo da eletricidade, custo da máquina por hora, insumos, embalagem |
| Anúncio e frete | tipo de anúncio (Grátis/Clássico/Premium), comissão, quem paga o frete, custo do frete, desconto de reputação, logística por unidade |
| Impostos e extras | imposto, publicidade, outros percentuais, faixas de custo fixo do marketplace |

**O que sai**: lucro por produto, margem de lucro, markup, **lucro por hora
de impressora**, composição visual do preço,
custo do produto linha a linha, projeção mensal por volume, preço mínimo e
o caminho inverso — o preço necessário para uma margem de lucro alvo.

**Vocabulário: o do balcão, não o da contabilidade**

A ferramenta usa os termos que quem vende usa, e só eles:

| Termo | O que é |
|---|---|
| **Custo do produto** | material, eletricidade, máquina, peças perdidas, insumos e embalagem |
| **Custos da venda** | comissão, custo fixo, frete, logística, imposto, publicidade |
| **Lucro por produto** | preço menos os dois |
| **Margem de lucro** | lucro ÷ preço |
| **Markup** | preço ÷ custo do produto |

**Mão de obra não é custo.** Numa operação de uma pessoa só, o trabalho de
imprimir, tirar suporte e embalar não sai da conta — cobrar isso como
despesa reprova produto que dá dinheiro de verdade. A linha não existe no
modelo. O gargalo é a máquina, não a pessoa: por isso a métrica de
produtividade é **lucro por hora de impressora**.

**Kit**

Um anúncio pode vender mais de uma peça: `kitQty` para N unidades da mesma
peça e `kitPieces[]` para peças diferentes no mesmo anúncio. A divisão que
faz o kit valer a pena está no custo de produção: filamento, energia,
máquina, falhas, acabamento e insumos são **por peça**; embalagem, frete,
logística e custo fixo do Mercado Livre são **por venda**. O preço passa a
ser o do anúncio, e o resultado aparece nas duas leituras — por anúncio e
por peça.

**As três decisões de modelagem que merecem atenção**

1. **Taxa de falha.** Quem perde 10% das impressões produz onze peças
   para vender dez. O custo é diluído nas peças boas
   (`custo × f / (1 − f)`), não somado como percentual simples — e incide
   só sobre material, energia e máquina, nunca sobre o acabamento de uma
   peça que não existiu.
2. **O kit não é estoque.** A diluição só existe quando o anúncio vende o
   conjunto como um produto só. Manter três unidades em estoque num anúncio
   avulso não dilui nada: cada venda paga as taxas de novo.
3. **O degrau dos R$ 79.** Abaixo do limite há custo fixo por unidade;
   acima dele o custo fixo some e o frete vira do vendedor. Como as duas
   taxas são funções em degrau do próprio preço, o preço-alvo não sai de
   uma fórmula fechada: `solvePrice()` resolve a equação dentro de cada
   faixa e fica com a menor solução coerente com a sua própria faixa —
   caindo na fronteira quando o degrau pula a solução.

**Onde mexer**

| Arquivo | O que guarda |
|---|---|
| `src/lib/pricing/mercado-livre.ts` | Todo o cálculo e os valores padrão. Puro: não conhece React nem DOM |
| `src/components/calculadora/` | Campos, painel de resultado, detalhamento e catálogo |
| `src/app/calculadora/` | Rota, chrome reduzido e as perguntas do `FAQPage` |

⚠ **Comissões, custo fixo e limite de frete grátis são definidos pelo
Mercado Livre** e mudam por categoria e por período. Os defaults são
ponto de partida — todos editáveis na própria tela, inclusive as faixas
de custo fixo.

---

## Analytics

Só o GTM é carregado; GA4, Meta Pixel e Google Ads são configurados
dentro dele. Eventos padronizados no `dataLayer` (`src/lib/analytics.ts`):

`view_product` · `view_segment` · `case_view` · `cta_click` ·
`whatsapp_click` · `form_start` · `form_submit` · `contact_click`

Cada evento carrega `item_id`, `item_name`, `location`, `label` e
`destination` quando aplicável.

---

## SEO

Title e description únicos por página, canonical, Open Graph e Twitter
Card, imagem social gerada no build (`opengraph-image.tsx`), dados
estruturados (`ProfessionalService`, `Service`, `BreadcrumbList`,
`FAQPage`), `sitemap.xml` e `robots.txt` derivados do conteúdo, URLs
limpas sem acento e malha de links internos gerada a partir das relações
entre produtos, segmentos e cases.

---

## Acessibilidade e performance

HTML semântico com um `<h1>` por página, skip link, foco visível em todo
o site, `aria-label` onde não há heading visível, alt text real em toda
imagem, FAQ em `<details>` nativo (funciona sem JS e é indexável).

`prefers-reduced-motion` desliga todo movimento via CSS. As revelações de
scroll têm estado padrão **visível**: sem JavaScript, nada desaparece.

Fonte auto-hospedada em WOFF2 (3 pesos, ~29 KB cada) com preload do peso
crítico; imagens em AVIF/WebP com `sizes` corretos e proporção reservada
(sem CLS); nenhuma dependência de animação; zero script de terceiro
quando o GTM não está configurado.

Verificado em 375, 390, 430, 768, 1024 e 1440px — sem overflow horizontal
em nenhum breakpoint.

---

## Origem do conteúdo

Posicionamento, tese, arquétipos, paleta, método, lideranças, mensagens
aprovadas e regras de copy vêm do **Direcional Estratégico da Bluver**.
A arquitetura comercial de 4 produtos e 3 segmentos atualiza a proposta
de 3 aplicações do documento, conforme briefing posterior.
