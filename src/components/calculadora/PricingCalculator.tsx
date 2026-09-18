"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_INPUTS,
  fullBreakEvenPrice,
  FILAMENT_PRESETS,
  LISTING_TYPES,
  breakEvenPrice,
  brl,
  calculate,
  solvePrice,
  type ListingType,
  type PricingInputs,
  type ShippingRule,
} from "@/lib/pricing/mercado-livre";
import { Button, NumberField, Panel, SelectField } from "./Fields";
import { KitEditor } from "./KitEditor";
import { Breakdown, PriceControl, ResultPanel } from "./Results";
import { Catalog, type SavedProduct } from "./Catalog";

/* ════════════════════════════════════════════════════════════════════════
   CALCULADORA — ORQUESTRAÇÃO
   ────────────────────────────────────────────────────────────────────────
   Todo o estado vive aqui e é persistido no navegador. A página é estática:
   não existe backend, banco nem envio de dados.
   ════════════════════════════════════════════════════════════════════════ */

const STORAGE_INPUTS = "bv-calc-ml:inputs:v1";
const STORAGE_CATALOG = "bv-calc-ml:catalogo:v1";

type Prefs = { targetMargin: number; monthlyUnits: number };

export function PricingCalculator() {
  const [inputs, setInputs] = useState<PricingInputs>(DEFAULT_INPUTS);
  const [prefs, setPrefs] = useState<Prefs>({ targetMargin: 25, monthlyUnits: 30 });
  const [catalog, setCatalog] = useState<SavedProduct[]>([]);
  // Só lemos o navegador depois da hidratação — o HTML servido é sempre o
  // mesmo, com os valores padrão, e o React não reclama de divergência.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawInputs = localStorage.getItem(STORAGE_INPUTS);
      if (rawInputs) {
        const parsed = JSON.parse(rawInputs) as Partial<PricingInputs> & Partial<Prefs>;
        // Mescla com o padrão: versões antigas do formato não quebram a tela.
        setInputs({ ...DEFAULT_INPUTS, ...parsed });
        setPrefs((p) => ({
          targetMargin: typeof parsed.targetMargin === "number" ? parsed.targetMargin : p.targetMargin,
          monthlyUnits: typeof parsed.monthlyUnits === "number" ? parsed.monthlyUnits : p.monthlyUnits,
        }));
      }
      const rawCatalog = localStorage.getItem(STORAGE_CATALOG);
      if (rawCatalog) setCatalog(JSON.parse(rawCatalog) as SavedProduct[]);
    } catch {
      // Navegador com storage bloqueado: a ferramenta funciona igual,
      // só não lembra dos valores.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_INPUTS, JSON.stringify({ ...inputs, ...prefs }));
    } catch {}
  }, [inputs, prefs, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_CATALOG, JSON.stringify(catalog));
    } catch {}
  }, [catalog, ready]);

  const set = <K extends keyof PricingInputs>(key: K) => (value: PricingInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => calculate(inputs), [inputs]);
  const suggested = useMemo(() => solvePrice(inputs, prefs.targetMargin), [inputs, prefs.targetMargin]);
  const breakEven = useMemo(() => breakEvenPrice(inputs), [inputs]);
  const fullBreakEven = useMemo(() => fullBreakEvenPrice(inputs), [inputs]);

  const freeShippingRisk =
    inputs.shippingRule === "comprador" && inputs.price >= inputs.fixedFeeThreshold;

  return (
    <div className="space-y-gutter">
      <div className="grid gap-gutter lg:grid-cols-[minmax(0,1fr)_25rem]">
        {/* Resultado vem antes no HTML: no celular, o preço é a primeira
            coisa que a pessoa quer mexer. No desktop, volta para a direita. */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-6 lg:self-start">
          <ResultPanel
            result={result}
            targetMargin={prefs.targetMargin}
            onTargetMargin={(n) => setPrefs((p) => ({ ...p, targetMargin: n }))}
            suggested={suggested}
            breakEven={breakEven}
            fullBreakEven={fullBreakEven}
            onUsePrice={(n) => set("price")(Math.round(n * 100) / 100)}
          >
            <PriceControl
              price={inputs.price}
              onChange={set("price")}
              suggested={suggested?.price ?? null}
              units={result.units}
              pricePerUnit={result.pricePerUnit}
            />
          </ResultPanel>
        </aside>

        <div className="space-y-gutter lg:col-start-1 lg:row-start-1">
          <Panel
            step="01"
            title="A peça"
            hint="O custo do material sai do preço do quilo: cada grama impressa vale preço do rolo dividido por mil."
          >
            <SelectField
              label="Material (preenche o preço de referência)"
              value={
                (FILAMENT_PRESETS.find((f) => f.pricePerKg === inputs.filamentPricePerKg)?.id ??
                  "custom") as string
              }
              onChange={(id) => {
                const preset = FILAMENT_PRESETS.find((f) => f.id === id);
                if (preset) set("filamentPricePerKg")(preset.pricePerKg);
              }}
              options={[
                ...FILAMENT_PRESETS.map((f) => ({ value: f.id as string, label: f.label })),
                { value: "custom", label: "Personalizado" },
              ]}
              span={2}
              hint="Valores de referência de mercado. Troque pelo preço da sua nota."
            />
            <NumberField
              label="Preço do quilo do filamento"
              value={inputs.filamentPricePerKg}
              onChange={set("filamentPricePerKg")}
              unit="R$"
              unitPosition="prefix"
            />
            <NumberField
              label="Peso da peça"
              value={inputs.partWeightG}
              onChange={set("partWeightG")}
              unit="g"
              hint={`Custo do material: ${brl(result.production.material)}`}
            />
            <NumberField
              label="Perda de material"
              value={inputs.wastePct}
              onChange={set("wastePct")}
              unit="%"
              max={90}
              hint="Purga, skirt, suporte e ponta de rolo."
            />
            <NumberField
              label="Tempo de impressão"
              value={inputs.printHours}
              onChange={set("printHours")}
              unit="h"
              hint="Use decimal: 1,5 = 1 h 30 min."
            />
            <NumberField
              label="Taxa de falha"
              value={inputs.failureRatePct}
              onChange={set("failureRatePct")}
              unit="%"
              max={95}
              hint="Peças que entopem, descolam ou saem fora de tolerância. Quem perde 10% imprime 11 para vender 10 — e as 10 pagam as 11."
            />
            <NumberField
              label="Unidades desta peça no anúncio"
              value={inputs.kitQty}
              onChange={set("kitQty")}
              min={1}
              hint="Kit de 3 unidades iguais? Coloque 3 — o preço passa a ser o do kit."
            />
            <KitEditor
              inputs={inputs}
              onChange={set("kitPieces")}
              unitCost={result.production.perUnit}
            />
          </Panel>

          <Panel
            step="02"
            title="Máquina, energia e trabalho"
            hint="A hora de impressora não é de graça: bico, correia, placa e a própria máquina se gastam imprimindo. Esse desgaste não sai do caixa hoje — sai quando alguma coisa quebrar."
          >
            <NumberField
              label="Consumo médio da impressora"
              value={inputs.printerWatts}
              onChange={set("printerWatts")}
              unit="W"
              hint="Mesa aquecida puxa mais: 100–150 W em FDM comum."
            />
            <NumberField
              label="Tarifa de energia"
              value={inputs.energyPricePerKwh}
              onChange={set("energyPricePerKwh")}
              unit="R$/kWh"
              hint="Some impostos e bandeira — é o valor da sua conta."
            />
            <NumberField
              label="Depreciação e manutenção"
              value={inputs.machineCostPerHour}
              onChange={set("machineCostPerHour")}
              unit="R$/h"
              hint="Preço da máquina ÷ horas de vida útil + peças de reposição."
            />
            <SelectField<"meu" | "pago">
              label="Quem faz o pós-processamento"
              value={inputs.laborMode}
              onChange={set("laborMode")}
              options={[
                { value: "meu", label: "Sou eu" },
                { value: "pago", label: "Pago alguém" },
              ]}
              span={2}
              hint={
                inputs.laborMode === "meu"
                  ? "O seu trabalho não sai do caixa — mas continua sendo medido, para responder se a venda paga o seu tempo."
                  : "Salário ou diária de quem faz entra como desembolso, igual ao filamento."
              }
            />
            <NumberField
              label="Pós-processamento por peça"
              value={inputs.laborMinutes}
              onChange={set("laborMinutes")}
              unit="min"
              hint="Remover suporte, lixar, montar, embalar."
            />
            <NumberField
              label={inputs.laborMode === "meu" ? "Quanto vale a sua hora" : "Custo da hora de quem faz"}
              value={inputs.laborCostPerHour}
              onChange={set("laborCostPerHour")}
              unit="R$/h"
              hint={
                inputs.laborMode === "meu"
                  ? "Serve de régua: abaixo disso, a venda não paga o seu tempo."
                  : undefined
              }
            />
            <NumberField
              label="Insumos extras por peça"
              value={inputs.extrasCost}
              onChange={set("extrasCost")}
              unit="R$"
              unitPosition="prefix"
              hint="Ímãs, parafusos, tinta, cola, encarte."
            />
            <NumberField
              label="Embalagem por anúncio"
              value={inputs.packagingCost}
              onChange={set("packagingCost")}
              unit="R$"
              unitPosition="prefix"
              span={2}
              hint="Caixa, plástico bolha, fita e etiqueta. Uma por venda, mesmo que o anúncio leve várias peças."
            />
          </Panel>

          <Panel
            step="03"
            title="Anúncio e frete"
            hint="Abaixo do limite de frete grátis o Mercado Livre cobra um custo fixo por unidade; acima dele, o frete passa a ser seu. É o degrau que decide se vale vender por R$ 75 ou por R$ 85."
          >
            <SelectField<ListingType>
              label="Tipo de anúncio"
              value={inputs.listingType}
              onChange={(t) =>
                setInputs((prev) => ({
                  ...prev,
                  listingType: t,
                  commissionPct: LISTING_TYPES[t].commission,
                }))
              }
              options={(Object.keys(LISTING_TYPES) as ListingType[]).map((k) => ({
                value: k,
                label: LISTING_TYPES[k].label,
              }))}
              hint={LISTING_TYPES[inputs.listingType].note}
            />
            <NumberField
              label="Comissão do anúncio"
              value={inputs.commissionPct}
              onChange={set("commissionPct")}
              unit="%"
              max={100}
              hint="Confira a sua categoria — ela varia. O valor real aparece no anúncio."
            />
            <SelectField<ShippingRule>
              label="Quem paga o frete"
              value={inputs.shippingRule}
              onChange={set("shippingRule")}
              options={[
                { value: "auto", label: `Automático (regra dos ${brl(inputs.fixedFeeThreshold)})` },
                { value: "vendedor", label: "Eu pago (frete grátis)" },
                { value: "comprador", label: "Comprador paga" },
              ]}
              hint={
                freeShippingRisk
                  ? `⚠ Acima de ${brl(inputs.fixedFeeThreshold)} o frete grátis é obrigatório na maioria das categorias — a conta está otimista.`
                  : undefined
              }
            />
            <NumberField
              label="Custo do frete"
              value={inputs.shippingCost}
              onChange={set("shippingCost")}
              unit="R$"
              unitPosition="prefix"
              hint="Valor cheio da tabela do Mercado Envios para o peso da peça."
            />
            <NumberField
              label="Desconto de reputação no frete"
              value={inputs.shippingDiscountPct}
              onChange={set("shippingDiscountPct")}
              unit="%"
              max={100}
              hint={`Frete no seu bolso hoje: ${brl(result.shipping)}.`}
            />
            <NumberField
              label="Logística por venda"
              value={inputs.logisticsCost}
              onChange={set("logisticsCost")}
              unit="R$"
              unitPosition="prefix"
              hint="Armazenagem no Full, coleta, deslocamento até a agência."
            />
          </Panel>

          <Panel
            step="04"
            title="Impostos e extras"
            hint="Percentuais que incidem sobre o preço de venda, não sobre o lucro."
          >
            <NumberField
              label="Imposto sobre a venda"
              value={inputs.taxPct}
              onChange={set("taxPct")}
              unit="%"
              max={100}
              hint="Simples Nacional costuma começar perto de 4% a 6%."
            />
            <NumberField
              label="Publicidade (Ads)"
              value={inputs.adsPct}
              onChange={set("adsPct")}
              unit="%"
              max={100}
              hint="Quanto do faturamento do anúncio volta como mídia."
            />
            <NumberField
              label="Outros custos"
              value={inputs.otherPct}
              onChange={set("otherPct")}
              unit="%"
              max={100}
              span={2}
              hint="Antecipação de recebíveis, devoluções, cupons — tudo que consome um percentual."
            />

            <details className="sm:col-span-2 border-t border-fg/10 pt-4">
              <summary className="cursor-pointer text-[0.8125rem] text-fg-muted hover:text-fg">
                Ajustar as faixas de custo fixo do Mercado Livre
              </summary>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-fg-muted">
                O Mercado Livre revisa esses valores periodicamente. Confira na sua conta e
                atualize aqui — o cálculo inteiro segue o que estiver escrito nestes campos.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <NumberField
                  label="Limite do frete grátis"
                  value={inputs.fixedFeeThreshold}
                  onChange={set("fixedFeeThreshold")}
                  unit="R$"
                  unitPosition="prefix"
                  hint="Acima deste preço não há custo fixo e o frete vira seu."
                />
                <NumberField
                  label="Custo fixo — até R$ 29"
                  value={inputs.fixedFees[0]}
                  onChange={(n) => set("fixedFees")([n, inputs.fixedFees[1], inputs.fixedFees[2]])}
                  unit="R$"
                  unitPosition="prefix"
                />
                <NumberField
                  label="Custo fixo — R$ 29 a R$ 50"
                  value={inputs.fixedFees[1]}
                  onChange={(n) => set("fixedFees")([inputs.fixedFees[0], n, inputs.fixedFees[2]])}
                  unit="R$"
                  unitPosition="prefix"
                />
                <NumberField
                  label="Custo fixo — R$ 50 até o limite"
                  value={inputs.fixedFees[2]}
                  onChange={(n) => set("fixedFees")([inputs.fixedFees[0], inputs.fixedFees[1], n])}
                  unit="R$"
                  unitPosition="prefix"
                />
              </div>
            </details>
          </Panel>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                setInputs(DEFAULT_INPUTS);
                setPrefs({ targetMargin: 25, monthlyUnits: 30 });
              }}
            >
              Restaurar valores padrão
            </Button>
            <p className="text-[0.75rem] text-fg-muted">
              Os campos são salvos automaticamente neste navegador.
            </p>
          </div>
        </div>
      </div>

      <Breakdown
        result={result}
        inputs={inputs}
        monthlyUnits={prefs.monthlyUnits}
        onMonthlyUnits={(n) => setPrefs((p) => ({ ...p, monthlyUnits: n }))}
      />

      <Catalog
        items={catalog}
        onSave={(name) =>
          setCatalog((prev) => [
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              name,
              savedAt: Date.now(),
              inputs: { ...inputs, kitPieces: inputs.kitPieces.map((p) => ({ ...p })) },
            },
            ...prev,
          ])
        }
        onLoad={(item) => {
          setInputs({
            ...DEFAULT_INPUTS,
            ...item.inputs,
            kitPieces: (item.inputs.kitPieces ?? []).map((p) => ({ ...p })),
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onDelete={(id) => setCatalog((prev) => prev.filter((p) => p.id !== id))}
      />
    </div>
  );
}
