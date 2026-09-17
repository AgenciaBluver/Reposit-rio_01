# Bluver — site institucional e infraestrutura comercial

**Autoridade que movimenta negócios.**
Base em Joinville. Atuação nacional.

Site construído em Next.js 16 (App Router), React 19 e Tailwind CSS 4.
Todas as 22 rotas são geradas estaticamente no build.

---

## Antes de publicar — 3 pendências

Nenhuma exige mexer em código de componente.

| # | Pendência | Onde resolver |
|---|---|---|
| 1 | **Fotografia e vídeo.** Nenhuma imagem real existe no projeto. Todos os slots estão declarados e renderizam um placeholder editorial que descreve o material a produzir. | `src/content/*.ts` (campos `media`) |
| 2 | **IDs de analytics.** Nenhum ID fictício foi versionado. Sem `NEXT_PUBLIC_GTM_ID`, nada de terceiro é carregado. | `.env` (ver `.env.example`) |
| 3 | **Endpoint do formulário.** Sem `FORM_ENDPOINT`, o formulário não finge sucesso: avisa que o envio não está ligado e oferece os canais diretos. | `.env` |

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

## Tipografia

**Figtree**, sob SIL Open Font License 1.1 — uso comercial liberado e
auto-hospedagem permitida. Arquivo único variável de 27 KB em
`public/fonts/`, licença em `public/fonts/OFL-Figtree.txt`.

A tipografia da marca é a **Atipla ND**, mas os arquivos disponíveis
vinham com licença `Demo for Personal Use`, que não cobre um site
comercial. A Figtree foi escolhida por proximidade de desenho —
verificada em espécime lado a lado: mesma geometria arredondada, mesma
largura e mesma quebra de linha na headline principal.

Para voltar à Atipla ND depois de licenciada, troque os arquivos em
`public/fonts/` e o nome da família em `src/styles/fonts.css` e
`tokens.css`. Nenhum componente cita fonte diretamente.

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

### Modo de visualização (comps)

Cada slot pode declarar um `preview`: uma imagem de banco (Adobe Stock)
que só aparece quando `NEXT_PUBLIC_PREVIEW_IMAGES=1`. Serve para mostrar
o site com fotografia antes de o material real existir.

Em produção a variável fica desligada e os slots voltam ao placeholder
editorial — nenhuma imagem de banco vai ao ar por acidente. Os comps são
de baixa resolução e **não licenciados**: para usá-los de verdade é
preciso licenciar na Adobe Stock, mas a intenção é substituí-los por
fotografia real da Bluver e dos clientes.

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
```

As LPs ficam fora do grupo de rotas `(site)`: não herdam menu nem rodapé
institucional — menos saída, mais intenção. São `noindex` para não
disputarem o orgânico com a página de solução, que é a versão canônica.

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

Fonte auto-hospedada em WOFF2 variável (27 KB para todos os pesos) com
preload; imagens em AVIF/WebP com `sizes` corretos e proporção reservada
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
