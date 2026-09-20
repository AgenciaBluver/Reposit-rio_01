# CLAUDE.md

Instruções que valem para qualquer sessão neste repositório.

## O que este repositório guarda

1. **Site institucional da Bluver** — Next.js 16, App Router. Ver `README.md`.
2. **Calculadora de precificação para Mercado Livre** (`/calculadora`) — ferramenta
   de uma operação de impressão 3D. Núcleo em `src/lib/pricing/mercado-livre.ts`.
3. **O cérebro da operação de impressão 3D** — `docs/3d/`. **Leia antes de
   responder qualquer coisa sobre produto, preço, custo ou estratégia de venda.**

## Antes de opinar sobre impressão 3D, leia nesta ordem

| Arquivo | O que resolve |
|---|---|
| `docs/3d/00-contexto.md` | Quem opera, qual máquina, quais restrições, o que já foi decidido |
| `docs/3d/01-custos.md` | Os números de custo. **Fonte da verdade** — a calculadora segue este arquivo |
| `docs/3d/02-regras-mercado-livre.md` | Comissão, tarifa fixa, o degrau dos R$ 79, frete |
| `docs/3d/03-aprendizados.md` | As lições que já custaram tempo. Não repita os erros listados |
| `docs/3d/04-produtos.md` | Diário do que já foi avaliado e o veredito de cada um |
| `docs/3d/05-glossario.md` | **O vocabulário aprovado.** Use só estes termos |
| `docs/3d/06-politica-de-preco.md` | Faixas de preço, o cálculo exato do degrau dos R$ 79, árvore de decisão, critérios de aprovação |
| `docs/3d/07-placa-e-kit.md` | Peças por placa, preço mínimo de venda avulsa, quando o kit é obrigatório |
| `docs/3d/08-termometro-de-preco.md` | **Se vale entrar na categoria.** Líder ÷ mediana. Vem antes de qualquer cálculo de preço |
| `docs/3d/09-canais.md` | Amazon, Shopee, Magalu, Americanas. Taxas por canal e onde cada ticket rende mais |

`docs/3d/fontes/` é onde entram documentos crus (prints do ML, tabelas de taxas,
PDFs). Leia quando a pergunta depender deles; não são leitura obrigatória.

## Regras de conduta nesta conversa

- **Vocabulário**: só o que está em `05-glossario.md`. Nada de "caixa",
  "desembolso", "desgaste" ou termos inventados. É custo do produto, custos da
  venda, lucro por produto, margem de lucro, markup.
- **Mão de obra não é custo.** Decisão tomada, não reabra.
- **Antes de sugerir qualquer produto**, aplique o teste de eliminação do
  `03-aprendizados.md`: se dá para fazer em MDF a laser, injetado ou importado,
  descarte sem calcular.
- **Nunca invente número de mercado.** Preço, vendas e número de anúncios vêm de
  página aberta e citada, ou vêm marcados como estimativa.
- **Peso, tempo e peças por placa são estimativa** até serem fatiados no Bambu
  Studio. Diga isso toda vez.
- **Sempre calcule por placa, não por peça.** O tempo de cada unidade é o tempo da
  placa dividido pelas peças que cabem nela (`07-placa-e-kit.md`).
- **Antes de precificar, passe no termômetro.** Se o anúncio mais vendido da
  categoria é dos mais baratos (razão abaixo de 0,80), não entre — por melhor que
  seja o lucro por hora (`08-termometro-de-preco.md`). Categoria vazia de
  concorrente 3D **não é oportunidade por si só**.
- **Nunca recomende R$ 79 sem comparar com R$ 78,90 e com um preço acima do ponto
  de equivalência** (`06-politica-de-preco.md`, seção 2).
- **Nunca trate comissão, tarifa fixa ou frete como número universal.** O valor
  oficial é o do simulador de custos do próprio anúncio.
- **Número que veio de estudo de fora é hipótese, não resultado.** Os estudos do
  Claude in Chrome usam régua própria (filamento R$ 95/kg, frete R$ 25, comissão
  13%). Recalcule na nossa (`01-custos.md`) antes de endossar qualquer preço.
- **Faturamento não é lucro.** Ao simular, mostre premissas, fórmula, lucro por
  produto, margem de lucro e lucro por hora de impressora.
- Quando um número novo virar decisão (custo, taxa, veredito de produto),
  **grave no arquivo certo de `docs/3d/`** em vez de deixar só no chat.

## Comandos

```bash
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```
