import { Section, Shell } from "@/components/primitives/Section";
import { Eyebrow, Rule } from "@/components/primitives/Type";
import { Reveal } from "@/components/primitives/Reveal";

/* ════════════════════════════════════════════════════════════════════════
   O PROBLEMA
   Em vez de uma lista de bullets, a seção mostra literalmente a distância
   que a Bluver existe para reduzir: à esquerda o que a empresa É, à
   direita o que o mercado LÊ. A régua entre as colunas é o próprio
   espaço da distorção — e é esse desenho, não o texto, que faz o
   argumento em dois segundos.
   ════════════════════════════════════════════════════════════════════════ */

const gap = [
  { real: "Excelência técnica", perceived: "Mais um fornecedor" },
  { real: "Estrutura e capacidade", perceived: "Empresa menor do que é" },
  { real: "Conhecimento acumulado", perceived: "Uma opinião entre outras" },
  { real: "Reputação construída", perceived: "Desconhecida fora do círculo" },
  { real: "Produto superior", perceived: "Simplesmente caro" },
];

export function Problem() {
  return (
    <Section surface="ink" density="lg" id="problema">
      <Shell>
        <Rule />
        <div className="grid grid-cols-6 gap-x-gutter pt-6 lg:grid-cols-12">
          <Eyebrow className="col-span-6 lg:col-span-3">O problema</Eyebrow>

          <h2 className="bv-display col-span-6 mt-5 text-display-2 lg:col-span-9 lg:col-start-4 lg:mt-0">
            <span className="block">Sua empresa pode ser</span>
            <span className="block bv-gradient-text">excelente</span>
            <span className="block">e ainda parecer comum.</span>
          </h2>
        </div>

        {/* ── A distância ──────────────────────────────────────────── */}
        <div className="mt-[clamp(3.5rem,8vw,7rem)]">
          <div
            aria-hidden
            className="grid grid-cols-6 gap-x-gutter pb-4 lg:grid-cols-12"
          >
            <Eyebrow className="col-span-3 lg:col-span-5">O que a empresa é</Eyebrow>
            <Eyebrow className="col-span-3 lg:col-span-5 lg:col-start-8">
              O que o mercado lê
            </Eyebrow>
          </div>

          <ul>
            {gap.map((row, i) => (
              <li key={row.real}>
                <Reveal delay={i * 60}>
                  <div className="grid grid-cols-6 items-baseline gap-x-gutter border-t border-line py-[clamp(1.25rem,2.5vw,2rem)] lg:grid-cols-12">
                    <p className="bv-display col-span-3 text-[clamp(1.0625rem,2.2vw,1.875rem)] leading-tight lg:col-span-5">
                      {row.real}
                    </p>

                    {/* Marca de distância — o intervalo entre as colunas. */}
                    <span
                      aria-hidden
                      className="col-span-6 hidden h-px self-center bg-line lg:col-span-2 lg:col-start-6 lg:block"
                    />

                    <p className="bv-serif col-span-3 text-[clamp(1.0625rem,2.2vw,1.875rem)] leading-tight text-fg-muted lg:col-span-5 lg:col-start-8">
                      {row.perceived}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Rule />
        </div>

        {/* ── Explicação ───────────────────────────────────────────── */}
        <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-6 gap-x-gutter gap-y-8 lg:grid-cols-12">
          <p className="col-span-6 text-lead leading-relaxed lg:col-span-5 lg:col-start-4">
            Quando posicionamento, imagem e distribuição são tratados como projetos
            separados, o mercado não recebe uma mensagem incompleta. Recebe várias — e
            monta sozinho a versão mais simples da sua empresa.
          </p>
          <p className="col-span-6 leading-relaxed text-fg-muted lg:col-span-4 lg:col-start-9">
            Essa versão simplificada é a que circula: é ela que chega ao comprador antes da
            reunião, ao parceiro antes da proposta e ao profissional que você quer contratar.
            Corrigi-la não é questão de fazer mais material. É questão de decidir, primeiro,
            o que precisa ficar visível.
          </p>
        </div>
      </Shell>
    </Section>
  );
}
