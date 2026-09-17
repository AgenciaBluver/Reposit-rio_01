# Fotografia do site

Cada imagem do site é um **slot** declarado no conteúdo. Enquanto o slot
não tem arquivo, a página mostra um placeholder que descreve o material a
produzir. Quando o arquivo chega, o placeholder some sozinho.

## Como colocar uma foto

**1.** Salve o arquivo nesta pasta (`public/media/`) com o nome exato da
tabela abaixo.

**2.** Abra o arquivo de conteúdo indicado, ache o slot e troque a linha:

```ts
src: null,                        // antes
src: "/media/nome-do-arquivo.jpg" // depois
```

**3.** Publique. Se o site estiver na Vercel ligada ao GitHub, basta enviar
a alteração para a branch: o deploy acontece sozinho.

## Antes de salvar o arquivo

- **Proporção**: respeite a da tabela. O recorte é automático (`object-cover`),
  mas uma foto na proporção errada perde as bordas.
- **Peso**: até 600 KB por imagem. O Next converte para AVIF/WebP no
  servidor, então não precisa otimizar antes, só não mandar o original de
  40 MB da câmera.
- **Nome**: sem acento, sem espaço, sempre minúsculo.
- **Tratamento**: o site já aplica um leve ajuste cinematográfico
  (contraste e dessaturação discretos). Mande a foto natural, sem filtro
  pesado, para os dois tratamentos não brigarem.

## Alt text

Cada slot já tem um `alt` escrito, descrevendo o que a imagem deve
mostrar. Ele serve de briefing para a produção e de acessibilidade depois.
Se a foto final mostrar outra coisa, ajuste o `alt` junto.

---

## Os slots


### `src/app/(site)/metodo/page.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `metodo-hero.jpg` | vertical, 1500×2000 | Mesa de trabalho da Bluver com roteiro, referências impressas e anotações de direção. |

### `src/app/(site)/projetos/page.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `projetos-hero.jpg` | vertical, 1500×2000 | Seleção de materiais produzidos pela Bluver para clientes. |

### `src/app/(site)/segmentos/page.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `segmentos-hero.jpg` | vertical, 1500×2000 | Ambiente empresarial de cliente da Bluver registrado em luz natural. |

### `src/app/(site)/sobre/page.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `sobre-hero.jpg` | vertical, 1500×2000 | Equipe da Bluver trabalhando no escritório em Joinville. |

### `src/app/(site)/solucoes/page.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `solucoes-hero.jpg` | vertical, 1500×2000 | Equipe da Bluver em reunião de direção, com material de projeto sobre a mesa. |

### `src/components/blocks/HomeHero.tsx`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `home-hero.jpg` | vertical, 1500×2000 | Equipe da Bluver em produção: direção acompanhando a captação em ambiente de cliente. |

### `src/content/cases.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `case.jpg` | horizontal, 2400×1600 | Cobertura da Expo Inovação Joinville realizada pela Bluver. |
| `case-expo.jpg` | horizontal, 2400×1600 | Registro do público durante a Expo Inovação Joinville. |
| `case-expo.jpg` | vertical, 1500×2000 | Entrevista captada durante a Expo Inovação Joinville. |
| `case-expo.jpg` | horizontal, 2400×1600 | Bastidor da equipe da Bluver na cobertura da Expo Inovação. |
| `case.jpg` | horizontal, 2400×1600 | Máquina de eletroerosão a fio em operação, registrada em detalhe. |
| `case-eletroerosao.jpg` | quadrada, 1600×1600 | Detalhe de peça usinada por eletroerosão a fio. |
| `case-eletroerosao.jpg` | vertical, 1500×2000 | Operador acompanhando o processo de usinagem. |
| `case-eletroerosao.jpg` | horizontal, 2400×1600 | Vista geral do parque de máquinas. |

### `src/content/landings.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `lp-industria.jpg` | horizontal, 2400×1600 | Centro de usinagem CNC em operação, detalhe do fuso e da peça. |
| `lp-servicos.jpg` | horizontal, 2400×1600 | Reunião de consultoria em escritório, profissionais analisando material sobre a mesa. |
| `lp-imobiliario.jpg` | horizontal, 2400×1600 | Empreendimento residencial em construção registrado no fim de tarde. |

### `src/content/leadership.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `lideranca.jpg` | vertical, 1500×2000 | Retrato editorial de Beatriz, cofundadora da Bluver, responsável por estratégia e crescimento. |
| `lideranca.jpg` | vertical, 1500×2000 | Retrato editorial de Larissa, cofundadora da Bluver, responsável pela direção criativa. |

### `src/content/method.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `metodo-01.jpg` | horizontal, 2000×1500 | Reunião de diagnóstico da Bluver com material impresso sobre a mesa e anotações à mão. |
| `metodo-02.jpg` | horizontal, 2000×1500 | Prancha de direção de arte com referências visuais impressas e recortes. |
| `metodo-03.jpg` | horizontal, 2000×1500 | Equipe da Bluver em captação: câmera em tripé e direção acompanhando o monitor. |
| `metodo-04.jpg` | horizontal, 2000×1500 | Tela com estrutura de campanha e painel de distribuição de conteúdo. |
| `metodo-05.jpg` | horizontal, 2000×1500 | Reunião de revisão de resultados entre a Bluver e o cliente. |

### `src/content/products.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `producao-hero.jpg` | horizontal, 2400×1600 | Equipe da Bluver em dia de captação, com câmera, iluminação e direção acompanhando a cena. |
| `eventos-hero.jpg` | horizontal, 2400×1600 | Cobertura de evento corporativo pela Bluver: câmera em movimento registrando o público durante uma palestra. |
| `midia-hero.jpg` | horizontal, 2400×1600 | Tela de operação de campanhas com estrutura de conta e painel de desempenho. |
| `sites-hero.jpg` | horizontal, 2400×1600 | Site desenvolvido pela Bluver exibido em desktop e celular sobre mesa de trabalho. |

### `src/content/segments.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `industrias-hero.jpg` | horizontal, 2400×1600 | Interior de indústria em operação: máquina de precisão em funcionamento, registrada em luz natural. |
| `advocacia-hero.jpg` | horizontal, 2400×1600 | Ambiente de escritório de advocacia: mesa de reunião, luz natural e profissionais em conversa. |
| `imobiliario-hero.jpg` | horizontal, 2400×1600 | Obra de empreendimento em estágio avançado, registrada em luz de fim de tarde. |

### `src/content/services-landing.ts`

| Arquivo a salvar | Proporção | O que a imagem deve mostrar |
| --- | --- | --- |
| `lp-servicos.jpg` | horizontal, 2000×1500 | Edição de vídeo em andamento, linha do tempo e correção de cor na tela. |
| `lp-servicos.jpg` | horizontal, 2000×1500 | Palestrante no palco durante evento corporativo, plateia ao fundo. |
| `lp-servicos.jpg` | horizontal, 2000×1500 | Painel de campanha digital sendo analisado em tela de computador. |
| `lp-servicos.jpg` | horizontal, 2000×1500 | Site exibido em desktop e celular sobre mesa de trabalho. |

---

## Retratos das lideranças

Os dois slots de retrato (Beatriz e Larissa) continuam vazios de
propósito. Não foram preenchidos com banco de imagem porque apresentar
uma pessoa desconhecida como fundadora seria inventar uma pessoa.

Quando as fotos existirem, salve como `lideranca-retrato-beatriz.jpg` e
`lideranca-retrato-larissa.jpg`, ambas verticais (1500×2000), e aponte os
slots em `src/content/leadership.ts`.

## Vídeo

Um slot aceita vídeo no lugar de imagem:

```ts
{
  src: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",  // obrigatório: evita tela preta
  kind: "video",
  alt: "...",
}
```

O vídeo entra sem som, em laço, e só carrega quando entra na tela.
Mantenha abaixo de 4 MB.
