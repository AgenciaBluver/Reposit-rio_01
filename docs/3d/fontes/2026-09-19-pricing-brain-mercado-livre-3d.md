# Cérebro de Precificação para Impressão 3D no Mercado Livre

> Documento-base para orientar análises, simulações, cadastro de produtos, criação de kits e decisões de preço no Mercado Livre.
>
> Versão de referência: 19 de setembro de 2026.
>
> Importante: o Mercado Livre altera tarifas, regras de frete e benefícios periodicamente. Antes de publicar ou reajustar um anúncio, confirmar os valores no simulador de custos do próprio anúncio. Este documento define a lógica de decisão, não substitui a simulação oficial.

## 1. Objetivo deste documento

Este arquivo deve funcionar como a fonte principal de raciocínio para precificar produtos de impressão 3D vendidos no Mercado Livre.

Ele deve ajudar a responder:

1. Qual é o preço mínimo sustentável de uma peça?
2. Quando vender uma peça individualmente?
3. Quando transformar peças em kit?
4. Quando é melhor ficar abaixo de R$ 79?
5. Quanto precisa ser cobrado ao ultrapassar R$ 79?
6. Quais custos precisam entrar antes de chamar uma venda de lucrativa?
7. Como comparar lucro por venda, margem e retorno por hora de impressora?

O objetivo não é encontrar o menor preço possível. O objetivo é encontrar um preço competitivo que preserve margem, remunere o trabalho e permita reinvestimento.

## 2. Regra de ouro

Para produtos leves e compactos, trabalhar prioritariamente em duas faixas:

| Tipo de oferta | Faixa estratégica inicial | Uso recomendado |
| --- | ---: | --- |
| Peça única | R$ 44,90 a R$ 78,90 | Produtos com bom valor percebido, baixo custo e embalagem compacta |
| Kit ou produto premium | R$ 99,90 a R$ 149,90 | Conjuntos, produtos maiores, personalização ou ofertas capazes de absorver o frete |

Faixa de atenção: **R$ 79 a R$ 99**.

Essa faixa não é automaticamente ruim, mas é perigosa porque o anúncio pode passar a oferecer frete grátis ao comprador e transferir parte relevante do custo logístico para o vendedor. Muitas vezes, uma venda a R$ 78,90 deixa mais dinheiro do que uma venda a R$ 79, R$ 89 ou até R$ 94,90.

Não utilizar essas faixas como resposta automática. O preço final deve ser validado pelas fórmulas e pelo simulador do anúncio.

## 3. O modelo mental mais simples

O Mercado Livre possui duas portas principais.

### Porta A: preço abaixo de R$ 79

Em condições normais, o comprador paga o frete. O vendedor paga:

1. Comissão percentual da categoria e do tipo de anúncio.
2. Custo fixo por unidade vendida, conforme a faixa de preço.
3. Impostos.
4. Publicidade, quando utilizada.
5. Custos do produto, embalagem, mão de obra, perdas e operação.

### Porta B: preço a partir de R$ 79

Produtos novos elegíveis passam a oferecer frete grátis ao comprador. O vendedor normalmente paga:

1. Comissão percentual da categoria e do tipo de anúncio.
2. Uma participação no custo do envio.
3. Impostos.
4. Publicidade, quando utilizada.
5. Custos do produto, embalagem, mão de obra, perdas e operação.

Nessa porta, o custo fixo dos produtos abaixo de R$ 79 deixa de existir, mas o custo de envio pode ser muito maior do que a economia obtida.

### Conclusão prática

O valor de R$ 79 não deve ser tratado como uma evolução natural de R$ 78,90. Ele representa uma possível mudança na estrutura de custos.

## 4. Custos cobrados pela plataforma

### 4.1 Comissão de venda

A comissão é aplicada sobre o preço de venda e varia de acordo com:

1. Categoria do produto.
2. Tipo de anúncio, como Clássico ou Premium.
3. Benefícios comerciais oferecidos.
4. Eventuais condições específicas da conta.

Como premissa provisória, utilizar a comissão exibida no simulador do anúncio. Nunca aplicar uma taxa genérica sem confirmar a categoria.

### 4.2 Custo fixo em produtos abaixo de R$ 79

Como referência geral, o Mercado Livre utiliza custos por unidade que mudam conforme a faixa de preço. As faixas historicamente divulgadas incluem valores próximos aos seguintes:

| Faixa de preço | Referência de custo fixo por unidade |
| --- | ---: |
| Abaixo de R$ 12,50 | Regra proporcional específica |
| Entre R$ 12,50 e R$ 29 | Aproximadamente R$ 6,25 |
| Entre R$ 29 e R$ 50 | Aproximadamente R$ 6,50 |
| Entre R$ 50 e R$ 79 | Aproximadamente R$ 6,75 |
| A partir de R$ 79 | Sem esse custo fixo, sujeito ao custo de envio |

Os limites exatos, inclusões de centavos e valores devem ser confirmados no simulador. Para a estratégia, o ponto mais importante é que uma tarifa de aproximadamente R$ 6 a R$ 7 representa uma parcela enorme de uma peça de baixo preço.

Exemplo: uma tarifa de R$ 6,50 representa aproximadamente 22% de uma venda de R$ 29,90, antes de comissão, imposto, material, embalagem e mão de obra.

### 4.3 Frete grátis a partir de R$ 79

Frete grátis para o comprador não significa frete grátis para o vendedor.

O desconto efetivo do vendedor pode variar conforme:

1. Peso real do pacote.
2. Peso volumétrico.
3. Dimensões da embalagem.
4. Origem e destino da entrega.
5. Modalidade logística.
6. Categoria do produto.
7. Reputação da conta.
8. Benefícios ou subsídios vigentes.

O valor de R$ 25 utilizado em exemplos é apenas uma hipótese de simulação. Não deve ser cadastrado como custo universal.

### 4.4 Peso real e peso volumétrico

Peças 3D podem ser leves, mas ocupar bastante espaço. Nesse caso, a plataforma pode considerar o volume da embalagem, e não apenas os gramas na balança.

Portanto, reduzir o tamanho da embalagem pode ter mais impacto na margem do que economizar alguns gramas de filamento.

## 5. Todos os custos que devem entrar na conta

### 5.1 Custos diretamente ligados à peça

1. Filamento efetivamente utilizado.
2. Margem adicional para purga, brim, suporte e resíduos.
3. Energia elétrica.
4. Desgaste e manutenção da impressora.
5. Depreciação da máquina.
6. Falhas de impressão e refugo.
7. Pós-processamento.
8. Acabamento.
9. Montagem.
10. Itens complementares, como ímãs, parafusos, cola ou borracha.

### 5.2 Custos de embalagem e expedição

1. Caixa ou envelope.
2. Plástico-bolha, papel, espuma ou outro material de proteção.
3. Fita adesiva.
4. Etiqueta e papel de impressão.
5. Lacre de segurança.
6. Tempo de separação, conferência e embalagem.
7. Deslocamento ou custo de coleta, quando aplicável.

### 5.3 Custos comerciais e financeiros

1. Comissão do Mercado Livre.
2. Custo fixo por unidade, quando aplicável.
3. Participação no frete, quando aplicável.
4. Mercado Ads.
5. Cupons ou descontos bancados pelo vendedor.
6. Impostos.
7. Antecipação ou custo financeiro, quando houver.
8. Devoluções, extravios e avarias não integralmente ressarcidos.

### 5.4 Mão de obra

O tempo de máquina não substitui o tempo humano. Contabilizar separadamente:

1. Preparação do arquivo.
2. Fatiamento e configuração.
3. Troca e preparação de filamento.
4. Retirada da mesa.
5. Remoção de suportes.
6. Acabamento e montagem.
7. Embalagem.
8. Atendimento e personalização.

## 6. Fórmula oficial de decisão

### 6.1 Lucro líquido estimado por venda

```text
lucro_liquido = preco_venda
                - comissao
                - custo_fixo_ml
                - frete_vendedor
                - impostos
                - ads
                - custo_producao
                - embalagem
                - mao_de_obra
                - provisao_perdas
```

### 6.2 Custos percentuais

```text
comissao = preco_venda × taxa_comissao
impostos = preco_venda × taxa_imposto
ads = preco_venda × acos_ads
provisao_perdas_percentual = preco_venda × taxa_perdas
```

Não descontar Ads duas vezes. Se o ACOS já foi incluído como custo percentual, não adicionar novamente o gasto absoluto da mesma venda.

### 6.3 Preço mínimo para atingir um lucro desejado

```text
preco_minimo = (custos_absolutos + lucro_desejado) ÷ (1 - taxas_percentuais)
```

Onde:

```text
custos_absolutos = custo_producao
                   + embalagem
                   + mao_de_obra
                   + custo_fixo_ml
                   + frete_vendedor
                   + provisao_perdas_absoluta

taxas_percentuais = taxa_comissao
                    + taxa_imposto
                    + acos_ads
                    + taxa_perdas_percentual
```

### 6.4 Métricas obrigatórias

```text
margem_liquida = lucro_liquido ÷ preco_venda

lucro_por_hora_de_impressora = lucro_liquido ÷ horas_de_impressao

lucro_por_hora_humana = lucro_liquido ÷ horas_de_trabalho_humano

retorno_sobre_custo = lucro_liquido ÷ custo_total
```

Uma peça pode ter margem percentual boa e, ainda assim, utilizar a impressora por tempo demais. Por isso, margem e lucro por hora de máquina devem ser avaliados juntos.

## 7. Parâmetros editáveis do projeto

Atualizar este bloco sempre que houver mudança de tarifa, operação ou meta financeira.

```yaml
mercado_livre:
  data_validacao: "2026-09-19"
  limite_referencia_frete_gratis: 79.00
  comissao_percentual: null
  tipo_anuncio: null
  categoria: null
  custo_fixo_12_50_a_29: 6.25
  custo_fixo_29_a_50: 6.50
  custo_fixo_50_a_79: 6.75
  frete_vendedor_estimado: null

operacao:
  imposto_percentual: null
  acos_ads_meta: null
  perdas_percentual: null
  custo_hora_humana: null
  custo_hora_impressora: null
  margem_liquida_minima: null
  lucro_minimo_por_venda: 8.00
  lucro_minimo_por_hora_impressora: null

faixas_estrategicas_iniciais:
  peca_unica_minima: 44.90
  peca_unica_maxima: 78.90
  kit_minimo: 99.90
  kit_maximo_inicial: 149.90
  faixa_de_atencao_inicio: 79.00
  faixa_de_atencao_fim: 99.00
```

Valores `null` são informações obrigatórias ainda não preenchidas. Nenhuma automação deve inventá-los.

## 8. Estratégia para peças únicas

### 8.1 Faixa principal recomendada

Trabalhar inicialmente entre **R$ 44,90 e R$ 78,90**.

Essa faixa tende a funcionar melhor quando:

1. O produto é leve e compacto.
2. O comprador aceita pagar o frete.
3. O valor percebido é suficiente para sustentar o preço.
4. A tarifa fixa não destrói a margem.
5. O tempo de impressão permite bom lucro por hora.

### 8.2 Faixa preferencial dentro da faixa principal

Quando o mercado permitir, priorizar **R$ 54,90 a R$ 74,90**.

Essa região costuma equilibrar melhor:

1. Conversão.
2. Diluição da tarifa fixa.
3. Margem absoluta.
4. Distância segura do gatilho de frete grátis.

### 8.3 Quando aceitar preço abaixo de R$ 44,90

Somente quando pelo menos uma das condições abaixo for verdadeira:

1. O custo de produção é muito baixo.
2. A impressão é rápida.
3. Não há dependência de Ads.
4. O produto gera recompra ou venda de outros itens.
5. O anúncio possui variações ou quantidade mínima.
6. O lucro líquido e o lucro por hora continuam acima das metas.

Peças abaixo de R$ 39,90 devem ser tratadas como candidatas a kit, e não como produtos individuais padrão.

### 8.4 Quando uma peça individual pode passar de R$ 99

Quando possui um ou mais dos seguintes fatores:

1. Personalização.
2. Design diferenciado ou exclusivo.
3. Função específica difícil de substituir por produto injetado.
4. Acabamento superior.
5. Tamanho ou complexidade maiores.
6. Alto valor percebido.
7. Baixa concorrência comparável.

Nesse caso, ela deve ser tratada financeiramente como produto premium, mesmo sendo uma única peça.

## 9. Estratégia para kits

### 9.1 Faixa inicial recomendada

Trabalhar inicialmente entre **R$ 99,90 e R$ 149,90**.

O preço mínimo real do kit deve ser calculado considerando o frete do pacote completo.

### 9.2 Por que o kit é estratégico

O kit permite:

1. Diluir embalagem e mão de obra de expedição.
2. Aumentar o ticket sem multiplicar proporcionalmente o frete.
3. Aumentar o valor percebido.
4. Diluir custos fixos da operação.
5. Evitar vender uma peça barata com margem irrelevante.
6. Criar combinações difíceis de comparar diretamente com concorrentes.

### 9.3 Como montar bons kits

Priorizar combinações que:

1. Tenham uso complementar.
2. Compartilhem a mesma ocasião ou ambiente.
3. Caibam em uma embalagem compacta.
4. Não aumentem muito o peso volumétrico.
5. Sejam fáceis de entender na imagem principal.
6. Entreguem economia perceptível sem sacrificar a margem.

Exemplos conceituais:

1. Kit com duas unidades da mesma peça.
2. Kit com três tamanhos complementares.
3. Kit de organização para um mesmo ambiente.
4. Kit presenteável.
5. Kit com peça principal e acessórios de baixo custo.

### 9.4 Desconto máximo do kit

O desconto do kit deve nascer da economia operacional real, e não de um percentual arbitrário.

```text
economia_do_kit = custos_separados
                  - custos_do_pacote_unico
```

É possível repassar apenas parte dessa economia ao cliente e preservar a outra parte como ganho de margem.

## 10. A faixa perigosa entre R$ 79 e R$ 99

### 10.1 Por que ela pode destruir margem

Imagine duas ofertas com comissão de 14% e frete estimado de R$ 25.

| Preço | Comissão | Custo fixo | Frete do vendedor | Sobra antes dos demais custos |
| ---: | ---: | ---: | ---: | ---: |
| R$ 78,90 | R$ 11,05 | R$ 6,75 | R$ 0 | R$ 61,10 |
| R$ 79,00 | R$ 11,06 | R$ 0 | R$ 25,00 | R$ 42,94 |
| R$ 90,00 | R$ 12,60 | R$ 0 | R$ 25,00 | R$ 52,40 |
| R$ 99,90 | R$ 13,99 | R$ 0 | R$ 25,00 | R$ 60,91 |

Nesse exemplo, somente perto de R$ 100 a oferta volta a deixar aproximadamente o mesmo valor que a venda de R$ 78,90.

Esse resultado muda quando comissão, frete, reputação ou embalagem mudam. O exemplo demonstra a lógica, não define o preço final.

### 10.2 Fórmula do ponto de equivalência

Para descobrir qual preço acima de R$ 79 gera a mesma contribuição de um preço abaixo de R$ 79:

```text
preco_acima × (1 - taxas_percentuais) - frete
=
preco_abaixo × (1 - taxas_percentuais) - custo_fixo
```

Isolando o preço acima:

```text
preco_acima = [preco_abaixo × (1 - taxas_percentuais)
               - custo_fixo
               + frete]
              ÷ (1 - taxas_percentuais)
```

Essa fórmula deve ser usada para definir o piso de um kit ou produto premium.

## 11. Exemplo completo de peça única

Hipóteses ilustrativas:

| Item | Valor |
| --- | ---: |
| Preço de venda | R$ 69,90 |
| Comissão | 14% |
| Impostos | 6% |
| Ads | 8% |
| Custo fixo | R$ 6,75 |
| Produção | R$ 12,00 |
| Embalagem | R$ 3,50 |
| Mão de obra | R$ 6,00 |
| Provisão de perdas | R$ 2,00 |

```text
comissao = 69,90 × 14% = 9,79
impostos = 69,90 × 6% = 4,19
ads = 69,90 × 8% = 5,59

lucro = 69,90 - 9,79 - 4,19 - 5,59 - 6,75 - 12,00 - 3,50 - 6,00 - 2,00
lucro = R$ 20,08

margem_liquida = 20,08 ÷ 69,90
margem_liquida = 28,7%
```

Se a impressão levar duas horas:

```text
lucro_por_hora_de_impressora = 20,08 ÷ 2
lucro_por_hora_de_impressora = R$ 10,04
```

## 12. Exemplo completo de kit

Hipóteses ilustrativas:

| Item | Valor |
| --- | ---: |
| Preço de venda | R$ 139,90 |
| Comissão | 14% |
| Impostos | 6% |
| Ads | 8% |
| Frete do vendedor | R$ 25,00 |
| Produção | R$ 27,00 |
| Embalagem | R$ 5,00 |
| Mão de obra | R$ 9,00 |
| Provisão de perdas | R$ 3,00 |

```text
comissao = 139,90 × 14% = 19,59
impostos = 139,90 × 6% = 8,39
ads = 139,90 × 8% = 11,19

lucro = 139,90 - 19,59 - 8,39 - 11,19 - 25,00 - 27,00 - 5,00 - 9,00 - 3,00
lucro = R$ 31,73

margem_liquida = 31,73 ÷ 139,90
margem_liquida = 22,7%
```

O kit deixa mais lucro absoluto, mas pode ocupar mais horas de máquina. Comparar sempre o lucro por hora.

## 13. Árvore de decisão para novos produtos

### Etapa 1: calcular o custo real

Registrar filamento, tempo de máquina, mão de obra, embalagem e provisão de perdas.

### Etapa 2: observar o preço possível no mercado

Comparar produtos equivalentes, qualidade, avaliações, volume de vendas, prazo, material, tamanho e diferenciais. Não comparar apenas a fotografia.

### Etapa 3: simular abaixo de R$ 79

Testar R$ 44,90, R$ 54,90, R$ 64,90, R$ 74,90 e R$ 78,90, conforme o valor percebido.

### Etapa 4: avaliar a margem

Se o produto não atingir a meta abaixo de R$ 79, não aumentar automaticamente para R$ 79. Avaliar kit, personalização ou reposicionamento premium.

### Etapa 5: simular kit ou premium

Testar R$ 99,90, R$ 119,90, R$ 139,90 e R$ 149,90 com o custo real do frete.

### Etapa 6: comparar quatro indicadores

1. Lucro líquido por venda.
2. Margem líquida.
3. Lucro por hora de impressora.
4. Conversão esperada e competitividade.

### Etapa 7: escolher a oferta

Escolher a opção que entrega lucro sustentável e boa chance de conversão, não apenas a maior margem teórica.

## 14. Regras para a inteligência artificial do repositório

Ao analisar ou sugerir preços, a inteligência artificial deve seguir estas regras:

1. Ler este documento antes de recomendar qualquer preço.
2. Não tratar R$ 25 como custo fixo universal de frete.
3. Não tratar comissão como uma porcentagem universal.
4. Não afirmar que um produto é lucrativo apenas porque preço menos filamento é positivo.
5. Não recomendar R$ 79 sem comparar com R$ 78,90 e com um preço acima de R$ 99.
6. Não recomendar produto individual abaixo de R$ 44,90 sem calcular tarifa fixa e lucro por hora.
7. Sugerir kit quando a tarifa fixa representar parcela excessiva do preço.
8. Considerar peso volumétrico, não apenas peso em gramas.
9. Separar tempo de impressão de tempo humano.
10. Informar claramente quando uma variável estiver ausente.
11. Usar o simulador do anúncio como fonte final dos custos do Mercado Livre.
12. Mostrar premissas, fórmula, lucro líquido, margem e lucro por hora.
13. Comparar pelo menos três cenários de preço quando houver dúvida.
14. Nunca usar faturamento como sinônimo de lucro.

## 15. Informações obrigatórias antes de fechar um preço

```yaml
produto:
  nome: null
  categoria_mercado_livre: null
  material: null
  gramas_de_filamento: null
  custo_por_kg_filamento: null
  horas_de_impressao: null
  minutos_de_trabalho_humano: null
  custo_de_componentes: null
  custo_de_embalagem: null
  peso_embalado_kg: null
  comprimento_embalagem_cm: null
  largura_embalagem_cm: null
  altura_embalagem_cm: null

plataforma:
  tipo_de_anuncio: null
  comissao_percentual: null
  custo_fixo: null
  frete_cobrado_do_vendedor: null
  imposto_percentual: null
  acos_ads_estimado: null

metas:
  lucro_minimo_por_venda: null
  margem_liquida_minima: null
  lucro_minimo_por_hora_impressora: null
```

Se qualquer campo crítico estiver vazio, apresentar uma simulação por cenários e solicitar o dado faltante. Não preencher silenciosamente com suposições.

## 16. Política inicial de portfólio

### Produtos de entrada

Preço sugerido para teste: **R$ 44,90 a R$ 54,90**.

Objetivo: atrair primeiras vendas e avaliações sem operar com prejuízo.

### Produtos principais

Preço sugerido para teste: **R$ 59,90 a R$ 78,90**.

Objetivo: concentrar volume e margem em peças individuais com bom valor percebido.

### Kits principais

Preço sugerido para teste: **R$ 99,90 a R$ 149,90**.

Objetivo: aumentar ticket, diluir operação e absorver o custo de envio.

### Produtos premium ou personalizados

Preço definido por valor percebido, complexidade e capacidade produtiva. Pode ultrapassar R$ 149,90 desde que a demanda aceite e o lucro por hora seja saudável.

## 17. Critérios para aprovar ou reprovar um produto

Um produto só deve ser aprovado quando:

1. A margem líquida atingir a meta definida.
2. O lucro por venda atingir a meta mínima.
3. O lucro por hora de impressora for competitivo com outras peças.
4. A embalagem proteger o produto sem elevar demais o peso volumétrico.
5. A capacidade de produção suportar o volume esperado.
6. O preço fizer sentido diante do valor percebido e da concorrência.
7. Houver espaço para Ads, desconto ou aumento de custo sem transformar a venda em prejuízo.

Um produto deve ser reprovado, redesenhado ou convertido em kit quando:

1. Depender de preço muito baixo para vender.
2. A tarifa fixa consumir parcela excessiva do faturamento.
3. O frete consumir a margem ao ultrapassar R$ 79.
4. O tempo de impressão gerar lucro por hora inferior à meta.
5. A peça for frágil ou tiver alta taxa de falha.
6. O produto puder ser facilmente substituído por um item injetado muito mais barato.

## 18. Rotina de revisão

Revisar este documento e os parâmetros quando ocorrer:

1. Mudança anunciada pelo Mercado Livre.
2. Alteração da reputação da conta.
3. Mudança no regime tributário.
4. Alteração relevante no preço do filamento.
5. Mudança de embalagem.
6. Entrada no Full ou em outra modalidade logística.
7. Mudança no ACOS médio.
8. Aumento da taxa de devolução ou falha.
9. Compra de nova impressora com custo e produtividade diferentes.

Revisão mínima recomendada: mensal nos primeiros seis meses e trimestral após estabilização da operação.

## 19. Hierarquia das fontes

Quando houver conflito entre informações, obedecer à seguinte ordem:

1. Simulador de custos dentro do anúncio específico.
2. Central de Ajuda e Central de Vendedores do Mercado Livre.
3. Relatório financeiro de vendas reais da conta.
4. Este documento.
5. Conteúdos de terceiros.

Fontes oficiais de referência:

https://vendedores.mercadolivre.com.br/nota/como-funcionam-as-taxas-do-mercado-livre

https://www.mercadolivre.com.br/ajuda/Custos-de-frete-gratis-pelo-Mercado-Envios_3362

https://vendedores.mercadolivre.com.br/nota/como-usar-o-simulador-de-custos-do-mercado-livre

## 20. Resumo executivo

1. Evitar depender de peças abaixo de R$ 39,90.
2. Trabalhar peças únicas principalmente entre R$ 44,90 e R$ 78,90.
3. Priorizar R$ 54,90 a R$ 74,90 quando o mercado aceitar.
4. Tratar R$ 79 a R$ 99 como faixa de atenção, nunca como escolha automática.
5. Trabalhar kits inicialmente entre R$ 99,90 e R$ 149,90.
6. Usar o custo real do frete para definir o piso acima de R$ 79.
7. Converter peças baratas em kits sempre que a tarifa fixa destruir a margem.
8. Avaliar lucro por venda, margem e lucro por hora de impressora.
9. Confirmar comissão, tarifa e frete no simulador de cada anúncio.
10. Nenhuma peça deve ser aprovada apenas porque sobra dinheiro depois do filamento.

> Regra final: ou a peça permanece abaixo de R$ 79 com margem saudável, ou sobe o suficiente para absorver o frete. Ficar no meio sem simular é vender mais para descobrir depois que o Mercado Livre ganhou melhor do que a empresa.
