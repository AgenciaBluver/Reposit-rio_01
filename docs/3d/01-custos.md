# Custos — fonte da verdade

_Atualizado em 19/09/2026._

Estes são os números que a calculadora (`/calculadora`) usa como padrão. **Mudou
aqui, muda lá** — `src/lib/pricing/mercado-livre.ts`, em `DEFAULT_INPUTS`.

## Custo do produto

| Item | Valor | Observação |
|---|---|---|
| Filamento PLA | **R$ 100,00 / kg** | Compra real entre R$ 93 e R$ 100. Usa-se o **teto**: produto que fecha no rolo mais caro fecha em qualquer rolo |
| Perda de material | 5% | Purga, skirt, suporte, ponta de rolo |
| Consumo da impressora | 120 W | A1 com mesa aquecida |
| Custo da eletricidade | R$ 0,95 / kWh | Conta real, com impostos e bandeira |
| Custo da máquina | **R$ 1,50 / hora** | Preço da A1 dividido pela vida útil, mais bico, correia e placa |
| Taxa de falha | 6% | Quem perde 6% imprime 106 para vender 100 |
| Embalagem | R$ 2,50 por anúncio | Uma por venda, não por peça. Peça frágil precisa de caixa rígida |
| Insumos | por peça | Ímã, parafuso, LED, mosquetão, espuma. Sempre declarar qual e quanto |

Outros filamentos, para referência: PETG R$ 125, PLA Silk R$ 135, ABS R$ 115,
TPU R$ 190, resina R$ 230. **PETG é obrigatório** em peça que pega sol, calor ou
carga — e custa ~25% mais que PLA.

## Mão de obra não é custo

Decisão tomada em 18/09/2026. Numa operação de uma pessoa só, o trabalho de
imprimir, tirar suporte e embalar **não sai da conta bancária**. Cobrar isso como
despesa reprovava produto que dá dinheiro de verdade.

O gargalo da operação é a máquina, não a pessoa — por isso a métrica de
produtividade é **lucro por hora de impressora**, e não lucro por hora de trabalho.

Se um dia houver alguém contratado, isso vira custo normal e este parágrafo muda.

## Custos que só existem em anúncio novo

Não entram no padrão da calculadora, mas entram na conta de um anúncio que está
subindo agora:

| Item | Valor típico |
|---|---|
| Product Ads | 5% do preço (pode chegar a 15% em categoria disputada) |
| Devolução e avaria | 3% do preço |

Use os campos **Publicidade (%)** e **Outros custos (%)** da calculadora.

## O que move o lucro e o que não move

Medido num topo de bolo de 20 g vendido a R$ 43 com frete grátis:

| Mudança | Efeito no lucro |
|---|---|
| Preço de R$ 43 para R$ 49,90 | **+ R$ 5,66** |
| Desconto de frete de 50% para 60% | + R$ 2,40 |
| Peça de 20 g para 12 g | + R$ 1,75 |
| Embalagem de R$ 2,50 para R$ 1,20 | + R$ 1,30 |
| Filamento de R$ 100 para R$ 93 o quilo | **+ R$ 0,16** |

**Filamento é ~5% do preço de venda.** Negociar bobina não é onde está o dinheiro.
Preço e frete são.
