# Termômetro de preço — quem decide a venda na categoria

_Destilado de `fontes/2026-09-20-quem-decide-o-preco.html` (569 anúncios lidos na
primeira página de dez buscas no ML em 19/09/2026). 20/09/2026._

Este arquivo entra **antes** do cálculo de preço. Não adianta a conta fechar numa
categoria onde o comprador só olha preço.

## 1. O teste, em uma linha

```text
termômetro = preço do anúncio mais vendido ÷ preço mediano da categoria
```

| Razão | O que significa | O que fazer |
|---|---|---|
| **abaixo de 0,80** | O campeão de vendas é dos mais baratos. O comprador decide por preço | **Não entre.** Contra injetado você nunca vai ser o mais barato |
| **0,80 a 1,00** | Preço não é o decisor. Foto, forma e descrição mandam | Entra, se tiver forma diferenciada |
| **acima de 1,00** | O mais vendido é **mais caro** que a mediana. O mercado paga por produto melhor | Melhor cenário. Entra |

Um segundo sinal vale quase tanto: **piso de preço alto**. Se nenhum anúncio da
primeira página está abaixo de R$ 30, existe uma barreira natural contra guerra de
preço. Suporte de cabo de carro elétrico: 228 anúncios, nenhum abaixo de R$ 30.

Como medir: abra a busca exata, leia a **primeira página inteira**, anote preço e
selo de volume de cada anúncio. Mediana do conjunto, preço do anúncio com mais
vendas acumuladas, divide. O selo de volume do ML é faixa (`+1000`), não número —
use o piso da faixa.

## 2. Categoria vazia de 3D não é oportunidade. É sintoma.

Em **8 das 10 categorias medidas, nenhum** dos ~57 anúncios da primeira página se
identifica como impresso em 3D. Só 3 anúncios em 569.

Isso corta dos dois lados:

- **A favor:** você não vai brigar com outro impressor clonando o mesmo arquivo.
- **Contra:** o seu concorrente é injeção plástica e importado, com custo unitário
  muito menor que o seu.

**Por isso o termômetro importa mais que a contagem de anúncios.** Categoria vazia
de 3D com termômetro baixo quer dizer que ninguém imprime ali porque não dá.

## 3. O erro do vaso de parede — registrado de propósito

O estudo anterior colocou vaso de parede entre os melhores, com o argumento de que
os três marketplaces mostravam demanda alta e **zero** concorrente impresso em 3D.
O argumento estava certo e a conclusão estava errada.

Lendo a página inteira: o anúncio mais vendido move **5 mil unidades a R$ 21**,
contra mediana de R$ 55. **Razão de 0,38 — a pior das dez.** O mais barato ali é
fibra de coco, que custa uma fração do filamento.

Fica como lição: **lacuna de concorrência sem termômetro é meia informação.**

## 4. As dez categorias medidas (19/09/2026)

| Produto | Anúncios | Piso | Mediana | Líder | Vendas | Razão | Anúncios 3D | Veredito |
|---|---|---|---|---|---|---|---|---|
| Vaso decorativo geométrico | 2.059 | R$ 20 | R$ 43 | R$ 59 | +5 mil | **1,37** | 1 | ✅ entrar |
| Porta-caneta decorativo temático | 3.696 | R$ 15 | R$ 37 | R$ 45 | +10 mil | 1,22 | 2 | ⚠️ talvez, só com tema forte |
| Organizador de cabos de mesa | 4.442 | R$ 13 | R$ 33 | R$ 37 | +10 mil | 1,12 | 0 | ⚠️ só como entrada (kit de 10) |
| Expositor de brincos | **18** | R$ 19 | R$ 67 | R$ 62 | +5 mil | 0,93 | 0 | ✅ entrar |
| Porta-óculos de mesa | 548 | R$ 19 | R$ 45 | R$ 32 | +1 mil | 0,71 | 0 | ⚠️ com ressalva |
| Suporte de cabo de carro elétrico Tipo 2 | 228 | **R$ 30** | R$ 60 | R$ 40 | +1 mil | 0,67 | 0 | ✅ entrar (piso alto) |
| Porta-incenso decorativo | 2.017 | R$ 17 | R$ 38 | R$ 25 | +5 mil | 0,66 | 0 | ❌ não agora |
| Organizador de gaveta divisória | 10 mil+ | R$ 19 | R$ 40 | R$ 26 | +10 mil | 0,65 | 0 | ❌ não |
| Suporte de carregador de tomada | 159 | R$ 10 | R$ 30 | R$ 19 | +100 | 0,63 | 0 | ❌ não |
| Vaso de parede para planta | 10 mil+ | R$ 14 | R$ 55 | R$ 21 | +5 mil | **0,38** | 0 | ❌ não — erro corrigido |

## 5. O que isso derruba da fila anterior

A fila de `04-produtos.md` foi montada por **lucro por hora de placa**, antes de
existir o termômetro. Dois dos três primeiros colocados reprovam agora:

| Estava | R$/h placa | Razão | O que acontece |
|---|---|---|---|
| 1º Suporte de carregador de tomada | R$ 19,55 | 0,63 | ❌ Cai. Mediana R$ 30 e líder a R$ 19 |
| 2º Porta-incenso decorativo | R$ 15,22 | 0,66 | ❌ Cai. Líder a R$ 25 com 5 mil vendas |

**Lucro por hora de placa é critério de eficiência, não de entrada.** Ele responde
"quanto rende se vender", não "vai vender". O termômetro vem primeiro; o R$/h
ordena o que passou.

## 6. Ordem de avaliação, atualizada

1. **Teste de eliminação** (`03-aprendizados.md`) — dá para fazer em MDF, injetado
   ou importado? Descarta.
2. **Termômetro** (este arquivo) — o líder é caro ou barato? Abaixo de 0,80, descarta.
3. **Peças por placa** (`07-placa-e-kit.md`) — quantas cabem, quanto dura a placa.
4. **Preço e degrau** (`06-politica-de-preco.md`) — onde cair na faixa, nunca R$ 79.
5. **Lucro por hora de placa** — ordena o que sobrou.
