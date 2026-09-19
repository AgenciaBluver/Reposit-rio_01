# Política de preço

_Destilado de `fontes/2026-09-19-pricing-brain-mercado-livre-3d.md`, reconciliado
com o que já estava decidido aqui. A fonte fica na pasta como comprovante; este
arquivo é o que vale._

## 1. Faixas de partida

Ponto de partida para simular, **não resposta automática**. O preço final sai da
conta e do que o mercado daquele termo pratica.

| Tipo de oferta | Faixa inicial | Quando usar |
|---|---|---|
| Peça única | **R$ 44,90 a R$ 78,90** | Peça leve e compacta, bom valor percebido |
| Peça única — região preferida | **R$ 54,90 a R$ 74,90** | Equilibra conversão, diluição da tarifa fixa e distância do degrau |
| Kit ou premium | **R$ 99,90 a R$ 149,90** | Conjunto, peça grande, personalização — ticket que absorve o frete |

**Faixa de atenção: R$ 79 a R$ 99.** Não é proibida, é a região onde a tarifa fixa
já sumiu mas o ticket ainda não paga o frete. Ver a seção 2.

**Abaixo de R$ 39,90**: trate como candidata a kit, não como produto individual.

## 2. O degrau dos R$ 79 — a regra exata

Duas coisas verdadeiras ao mesmo tempo, que antes estavam confundidas neste
repositório:

**a) O degrau é real.** R$ 79,00 deixa menos dinheiro que R$ 78,90. Nunca suba de
R$ 78,90 para R$ 79 e pouco achando que é evolução natural — é troca de estrutura
de custo.

**b) O degrau não é motivo para nunca passar.** Existe um preço a partir do qual
atravessar paga mais. Ele se calcula:

```text
preco_equivalente = [preco_abaixo × (1 − taxas_percentuais) − tarifa_fixa + frete]
                    ÷ (1 − taxas_percentuais)
```

Com os nossos números (comissão 12%, imposto 6%, ads 5%, perdas 3% e frete de
R$ 16 líquidos):

| Preço hoje, comprador pagando frete | Só compensa atravessar acima de |
|---|---|
| R$ 69,00 | **R$ 81,50** |
| R$ 78,90 | **R$ 91,40** |

Com frete real de R$ 25 em vez de R$ 16, o equivalente de R$ 78,90 sobe para
**R$ 103,56** — que é exatamente o "perto de R$ 100" da fonte. **O número depende
inteiramente do frete real do seu pacote.** Calcule, não chute.

**Regra final:** ou a peça fica abaixo de R$ 79 com margem saudável, ou sobe o
suficiente para absorver o frete. Ficar no meio sem simular é descobrir depois que
o Mercado Livre ganhou mais que você.

## 3. O preço que o comprador vê

A conta acima é a sua. Existe uma segunda, que decide a venda: **abaixo de R$ 79 o
comprador paga o frete por fora**, e ele compara o total.

Você paga o frete **com desconto de reputação**; ele pagaria a **tabela cheia**.
Por isso embutir o frete costuma deixar o produto mais barato para ele sem mudar o
seu lucro:

| Estratégia | Comprador paga | Você fica com |
|---|---|---|
| R$ 35,00 + frete | R$ 59,00 | R$ 16,31 |
| R$ 49,90 com frete grátis | **R$ 49,90** | R$ 16,53 |

**Nunca deixe o comprador pagar frete em produto leve.** Quando simular uma faixa
abaixo de R$ 79, escreva sempre as duas linhas: o seu lucro e o total que aparece
para o comprador.

## 4. Peso volumétrico

Peça 3D é leve e ocupa espaço. O Mercado Envios cobra pelo maior entre peso real e
peso volumétrico — então **reduzir a caixa pode valer mais que economizar gramas**.

Consequência de projeto: peça que desmonta, encaixa ou empilha vende melhor que
peça única volumosa. Vale conferir a dimensão da embalagem antes de fechar o
desenho, não depois.

## 5. Árvore de decisão para produto novo

1. **Teste de eliminação** — `03-aprendizados.md`. Dá para fazer em MDF a laser,
   injetado ou importado? Descarte sem calcular.
2. **Custo real** — material, tempo de máquina, insumos, embalagem, perdas.
   Gramas e horas do fatiador, não da estimativa.
3. **Preço possível no mercado** — faixa observada no termo, número de anúncios,
   volume do líder. Faixa larga é sinal de comprador sem referência.
4. **Simule abaixo de R$ 79**: R$ 44,90 · R$ 54,90 · R$ 64,90 · R$ 74,90 · R$ 78,90.
5. **Não atingiu a meta? Não pule automaticamente para R$ 79.** Avalie kit,
   personalização ou reposicionamento premium.
6. **Simule kit ou premium**: R$ 99,90 · R$ 119,90 · R$ 139,90, com o frete real.
7. **Compare quatro indicadores**: lucro por produto, margem de lucro, lucro por
   hora de impressora, e chance de conversão no preço escolhido.

## 6. Aprovar ou reprovar

**Aprova quando:** bate a meta de lucro por produto (R$ 10), o lucro por hora de
impressora é competitivo com as outras peças, a embalagem protege sem inflar o
peso volumétrico, a produção aguenta o volume, o preço faz sentido diante da
concorrência, e ainda sobra espaço para ads ou desconto sem virar prejuízo.

**Reprova, redesenha ou vira kit quando:** depende de preço muito baixo para
vender, a tarifa fixa come parcela excessiva do preço, o frete destrói a margem ao
passar de R$ 79, o lucro por hora fica abaixo da meta, a peça é frágil ou falha
muito, ou o produto é facilmente substituído por injetado barato.

## 7. Onde este arquivo discorda da fonte

| Assunto | A fonte diz | O que vale aqui |
|---|---|---|
| **Mão de obra** | Entra como custo (seções 5.4, 6.1, 11 e 12) | **Não entra.** Operação de uma pessoa só; ver `01-custos.md`. Decisão tomada |
| **Faixa R$ 79–99** | "Perigosa", evitar | Perigosa **até o ponto de equivalência calculado**, que pode ser R$ 91 ou R$ 104 conforme o frete. Calcule em vez de evitar |
| **Frete de R$ 25** | Hipótese de simulação | Concordamos que não é universal. Nosso padrão é R$ 32 de tabela com 50% de desconto = R$ 16 líquidos, e muda com peso, volume e destino |
| **Preço final para o comprador** | Não trata | Trata: abaixo de R$ 79 ele paga frete por fora, e é o total que decide a venda |

## 8. Antes de publicar um anúncio

Confirme no **simulador de custos do próprio anúncio**: comissão da categoria,
tarifa fixa e frete do seu pacote. Tudo que está aqui é lógica de decisão — o
número oficial é o do simulador.

Hierarquia quando houver conflito: simulador do anúncio → Central de Vendedores →
relatório financeiro real da conta → estes arquivos → conteúdo de terceiros.

## 9. Quando revisar

Mudança anunciada pelo ML, mudança de reputação, mudança de regime tributário,
variação relevante no preço do filamento, troca de embalagem, entrada no Full,
mudança no ACOS, aumento de devolução ou falha, compra de nova impressora.

Revisão mínima: mensal nos primeiros seis meses, trimestral depois.
