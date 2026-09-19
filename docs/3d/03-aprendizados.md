# Aprendizados

_Cada item aqui custou tempo. Não repita._

## 1. O teste de eliminação, antes de qualquer conta

Pergunte: **"isso pode ser feito em MDF cortado a laser, injetado em plástico, ou
importado da China?"** Se puder, descarte na hora. Não calcule, não pesquise preço.

Três casos que ensinaram isso:

| Produto | Preço no ML | O que era |
|---|---|---|
| Suporte de controle de videogame | R$ 23,75 · +10 mil vendidos | **Madeira cortada a laser.** Em 3D, só o filamento custaria R$ 18,90 |
| Suporte de vara de pesca | R$ 25 · frete grátis · FULL | Depois das taxas sobram R$ 3,25 para fabricar. Nenhuma peça de 120 g chega perto |
| Topo de bolo "Happy Birthday" | R$ 19,90 · +1000 vendidos | **Acrílico cortado a laser** |

**Sinais de que o produto é industrial** (qualquer um elimina):
- "+10 mil vendidos" ou selo "MAIS VENDIDO" no termo principal
- Preço abaixo de R$ 40 **com** frete grátis
- Selo FULL nos líderes — o próprio ML embala e despacha, mão de obra por pedido perto de zero
- Peça grande, maciça, geometricamente simples
- **Teste do filamento**: gramas × R$ 0,10. Passou de 35% do preço, ninguém está imprimindo aquilo

## 2. A impressão 3D só ganha em quatro situações

1. **Geometria que outro processo não faz** — vazado, orgânico, articulado print-in-place
2. **Volume baixo demais para molde** — vende 50 a 500 por mês, não 10 mil
3. **Encaixe específico** — suporte para *aquele* roteador, botão de *aquele* carro
4. **Reposição que não se acha** — a peça que quebrou e o fabricante não vende mais

**Sinal verde forte:** os anúncios que já existem no termo são visivelmente
impressos em 3D (camadas nas fotos) **e** o preço passa de R$ 79.

## 3. Não procure na lista de "Mais Vendidos"

Produto que vende 10 mil unidades atrai fabricação industrial por definição.

| Fuja | Procure |
|---|---|
| "+10 mil vendidos" | 50 a 500 vendidos |
| 1.800 anúncios no termo | menos de 200 anúncios |
| R$ 15 a R$ 30 | R$ 79 ou mais |
| Serve para todo mundo | Serve para *um* modelo específico |
| Frete grátis e FULL | Faixa de preço larga (sinal de comprador sem referência) |

**Faixa de preço larga é ouro**: um termo onde os resultados vão de R$ 29 a R$ 144
significa que o comprador não tem âncora — dá para posicionar em cima.

## 4. Kit dilui o que é fixo

Filamento, eletricidade, máquina e falhas multiplicam por peça. **Embalagem, frete,
logística e tarifa fixa são pagos uma vez por venda.**

Peça de 35 g vendida a R$ 21 dá prejuízo; as mesmas três num kit de R$ 63 pagam uma
tarifa fixa só e sobram alguns reais por unidade.

Vale para um anúncio que vende **o conjunto como um produto só**. Estoque de três
unidades no anúncio avulso não dilui nada — cada venda paga as taxas de novo.

Bônus: kit acima de R$ 79 zera a tarifa fixa **e** muda a vitrine. Na busca "topo de
bolo" você aparece ao lado de R$ 19; na busca "kit decoração de festa", ao lado de
R$ 60 a R$ 120.

## 5. Multicor sem AMS não existe — e com AMS tem purga

Cores lado a lado na mesma camada não se resolvem com troca manual de filamento
(que só funciona quando a cor muda por altura). Precisa de AMS.

E com AMS entra a **purga**: cada troca descarta filamento. Numa peça plana com 6
cores, a purga costuma render **2 a 3 vezes o peso da peça** — 20 g viram 60 g.

**A purga é por mesa, não por peça.** Seis pedidos na mesma impressão dividem a
purga por seis: o custo cai de R$ 14,35 para R$ 8,13 por peça. Multicor
personalizado só fecha em lote — o que exige prazo de 3 a 5 dias no anúncio para
acumular pedidos.

## 6. Licença mata mais modelo bonito que qualquer outra coisa

Numa varredura de 7 categorias, **em 5 delas o modelo mais popular era CC-BY-NC** —
ou seja, quem está vendendo aquilo no Mercado Livre está infringindo.

Só serve: CC-BY, CC-BY-SA, CC0, domínio público, licença comercial paga, ou modelo
desenhado por você. E modelo próprio é também o que impede o concorrente de clonar
o anúncio.

### Onde procurar — três das quatro plataformas óbvias não servem

| Plataforma | Como funciona | Serve? |
|---|---|---|
| **Cults3D** | `CULTS CU` permite vender impresso e modificar. `CULTS CU-ND` permite vender impresso mas **não modificar**. `CULTS PU` é uso pessoal. O direito comercial vem na compra do arquivo, sem mensalidade | **Sim — é o caminho limpo** |
| CGTrader | A cláusula 21A.1 dos termos proíbe literalmente vender os modelos *"in 3D printed physical form"* | **Não** |
| MyMiniFactory | Licença padrão da loja é não comercial. O direito de vender vem do designer, em listagem separada ou assinatura Tribe — e some se cancelar | Caso a caso |
| Thangs | A plataforma não define licença. Designers vendem assinatura própria (US$ 10 a 25/mês), válida só enquanto ativa | Alugado, não comprado |

**Atalho que economiza horas:** o Cults tem filtro de licença escondido em
`MORE FILTERS → LICENSES`. Sem ele, ~80% dos resultados são uso pessoal. Cole e
troque o termo no fim:

```
cults3d.com/en/search?licenses[]=cults_cu&licenses[]=cults_cu_nd&sort=downloads_count&q=desk organizer
```

**CU-ND não deixa você mexer.** Nada de gravar sua marca, furar, remixar ou mudar
geometria. Se quiser personalizar, filtre só por CU.

**Licença válida não cobre marca de terceiro.** Aparecem no Cults porta-cartões do
Mickey e organizadores do Mario com licença comercial válida — a licença cobre o
desenho do autor, não a propriedade intelectual do personagem.

## 7. Personalizar quebra a comparação de preço

Dois topos de bolo com o mesmo nome não existem. Quando o produto é personalizado,
o comprador para de comparar com o genérico de R$ 19 — e é isso que destrava a
faixa de R$ 43 a R$ 49,90.

O custo: alguns minutos de arquivo por pedido, e erro de grafia é perda total.
Confirme o nome por mensagem antes de imprimir. Em fonte cursiva, confira se as
letras se tocam de verdade — senão a peça sai em pedaços.

## 8. Relatório de pesquisa: onde eles erram

Auditoria do relatório de 30 produtos (18/09/2026):

- **Assumiu que o comprador paga o frete abaixo de R$ 79.** É a regra, mas não é a
  prateleira: quase todo anúncio tem frete grátis. Refazendo com frete grátis,
  **24 de 30 aprovados viraram 3**.
- **Leu o degrau dos R$ 79 ao contrário** — precificou em R$ 78,90 de propósito.
  Ver `02-regras-mercado-livre.md`: atravessar para cima ganha dos dois lados.
- **Custo de máquina a R$ 0,80/h** é otimista. São R$ 1,50.
- **Calculou tudo com PLA** mesmo nos produtos que exigem PETG (calor, sol, carga).
- **Estimativas de peso e tempo fora da própria premissa** — um item a 39 g/h
  quando o documento declarava 22 a 28 g/h.

Peso e tempo de relatório são sempre estimativa. Fatie antes de anunciar.
