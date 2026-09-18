import { PricingCalculator } from "@/components/calculadora/PricingCalculator";
import { Shell } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Type";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Calculadora de precificação para Mercado Livre — impressão 3D",
  description:
    "Calcule o preço e a margem real de cada peça impressa em 3D no Mercado Livre: filamento por grama, energia, hora de máquina, taxa de falha, comissão do anúncio, custo fixo, frete e imposto.",
  path: "/calculadora",
});

const faq = [
  {
    q: "Como calcular o custo do filamento por peça?",
    a: "Divida o preço do quilo por mil para chegar ao preço da grama e multiplique pelo peso da peça fatiada. Some a perda de purga, skirt e suporte — a calculadora faz isso no campo de perda de material.",
  },
  {
    q: "Por que existe um degrau de preço em torno de R$ 79?",
    a: "Abaixo desse limite o Mercado Livre cobra um custo fixo por unidade vendida. Acima dele o custo fixo desaparece, mas o frete grátis passa a ser obrigação do vendedor na maioria das categorias. Por isso vender a R$ 75 pode deixar menos lucro do que vender a R$ 85.",
  },
  {
    q: "O que é a taxa de falha e por que ela entra no preço?",
    a: "É o percentual de impressões que não viram produto. Se 10% falham, você imprime onze peças para vender dez — e o custo das onze precisa caber no preço das dez.",
  },
  {
    q: "Devo contar a minha própria hora no custo?",
    a: "As duas coisas, em contas separadas. O caixa é o dinheiro que entra: preço menos filamento, embalagem, taxas e imposto. O seu trabalho não está aí, porque ele não sai da sua conta bancária. Mas ele sai de você — por isso a ferramenta mostra quanto a sua hora rendeu naquela venda. Se o caixa é positivo e a sua hora rende bem, a venda vale a pena. Se o caixa só fica de pé porque você não se paga, você tem um emprego mal pago, não um produto.",
  },
  {
    q: "Vender em kit compensa?",
    a: "Quase sempre, em peça barata. Filamento, energia, máquina e acabamento multiplicam por peça, mas embalagem, frete, logística e custo fixo do Mercado Livre são pagos uma vez por venda. Uma peça de 35 g vendida a R$ 21 pode dar prejuízo; as mesmas três num kit de R$ 63 pagam um custo fixo só e sobram alguns reais por unidade. Vale para um anúncio que vende o conjunto como um produto só — manter estoque de três unidades no anúncio avulso não dilui nada.",
  },
  {
    q: "Qual margem é saudável para impressão 3D no Mercado Livre?",
    a: "Abaixo de 10% de margem de caixa qualquer devolução, reajuste de frete ou mudança de comissão apaga o lucro. Entre 10% e 20% a operação se sustenta; acima de 20% há folga para promoções e para investir em anúncios.",
  },
];

export default function CalculadoraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faq)) }}
      />

      <section className="pt-pad-xs pb-8">
        <Shell>
          <Eyebrow>Ferramenta aberta</Eyebrow>
          <h1 className="bv-display mt-4 max-w-[22ch] text-display-3">
            Precificação para <span className="bv-gradient-text">Mercado Livre</span>
          </h1>
          <p className="bv-serif mt-5 max-w-[60ch] text-lead text-fg-muted">
            Feita para quem vende impressão 3D: do grama de filamento ao lucro por hora de
            impressora, com todas as taxas do marketplace na conta.
          </p>
          <hr className="bv-rule-signal mt-8 max-w-[7rem]" />
        </Shell>
      </section>

      <section className="pb-pad-sm">
        <Shell>
          <PricingCalculator />
        </Shell>
      </section>

      <section className="border-t border-fg/12 py-pad-xs">
        <Shell>
          <h2 className="bv-display text-title">Como a conta é feita</h2>
          <div className="mt-8 grid gap-x-gutter gap-y-8 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-[1rem] font-medium">{item.q}</h3>
                <p className="bv-serif mt-2 max-w-[54ch] text-[0.9375rem] leading-relaxed text-fg-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}
