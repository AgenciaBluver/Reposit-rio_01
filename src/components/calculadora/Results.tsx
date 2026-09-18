"use client";

import { useId, type ReactNode } from "react";
import {
  FIXED_FEE_BANDS,
  LISTING_TYPES,
  brl,
  brl0,
  pct,
  marginVerdict,
  type PricingInputs,
  type PricingResult,
} from "@/lib/pricing/mercado-livre";
import { Button, useNumericDraft } from "./Fields";

/* ════════════════════════════════════════════════════════════════════════
   LEITURA DO RESULTADO
   ────────────────────────────────────────────────────────────────────────
   O painel responde três perguntas, nesta ordem: quanto sobra, para onde
   foi o resto e por quanto eu deveria vender.
   ════════════════════════════════════════════════════════════════════════ */

/** Cor de cada linha na barra de composição. Mora aqui, e não no núcleo de
 *  cálculo, porque é decisão de leitura visual — não de contabilidade. */
const SEGMENT_COLOR: Record<string, string> = {
  producao: "bg-data-cost",
  tempo: "bg-data-time",
  desgaste: "bg-data-wear",
  comissao: "bg-data-fee",
  fixo: "bg-data-fee/55",
  frete: "bg-data-ship",
  logistica: "bg-data-ship/55",
  imposto: "bg-data-tax",
  ads: "bg-data-ads",
  outros: "bg-data-tax/55",
};

const VERDICT_COLOR = {
  loss: "text-data-loss",
  warn: "text-data-ads",
  ok: "text-fg",
  good: "text-data-profit",
} as const;

export function PriceControl({
  price,
  onChange,
  suggested,
  units,
  pricePerUnit,
}: {
  price: number;
  onChange: (n: number) => void;
  suggested: number | null;
  /** Peças no anúncio. Acima de 1, o preço é do kit. */
  units: number;
  pricePerUnit: number;
}) {
  const id = useId();
  const field = useNumericDraft(price, onChange, { decimalsOnBlur: 2 });
  // O fim da régua acompanha o preço: sempre sobra espaço para explorar
  // acima do valor atual, sem esmagar a escala nos produtos baratos.
  const max = Math.max(50, Math.ceil(Math.max(price * 1.8, (suggested ?? 0) * 1.4, 100) / 10) * 10);
  return (
    <div>
      <label htmlFor={id} className="bv-eyebrow text-fg-muted">
        {units > 1 ? "Preço do anúncio (kit)" : "Preço de venda"}
      </label>
      <div className="mt-2 flex items-center gap-2 border border-fg/20 bg-bg px-4 py-3 focus-within:border-accent">
        <span className="text-[0.9375rem] text-fg-muted" aria-hidden>
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full bg-transparent bv-numeral text-[1.75rem] tabular-nums outline-none"
          aria-label="Preço de venda em reais"
        />
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={Math.min(price, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-accent"
        aria-label="Ajustar preço de venda"
      />
      <div className="flex justify-between text-[0.75rem] text-fg-muted tabular-nums">
        <span>R$ 0</span>
        <span>{brl(max)}</span>
      </div>
      {units > 1 && (
        <p className="mt-2 text-[0.75rem] leading-snug text-fg-muted">
          Kit com {units} peças — {brl(pricePerUnit)} por unidade.
        </p>
      )}
    </div>
  );
}

export function ResultPanel({
  result,
  targetMargin,
  onTargetMargin,
  suggested,
  breakEven,
  fullBreakEven,
  onUsePrice,
  children,
}: {
  result: PricingResult;
  targetMargin: number;
  onTargetMargin: (n: number) => void;
  suggested: { price: number; atBoundary: boolean } | null;
  breakEven: { price: number; atBoundary: boolean } | null;
  /** Preço em que a venda também paga o seu tempo e o desgaste. */
  fullBreakEven: { price: number; atBoundary: boolean } | null;
  onUsePrice: (n: number) => void;
  /** Controle de preço — renderizado no topo do painel. */
  children: ReactNode;
}) {
  // O número de cima é o CAIXA: é ele que aparece no extrato. O lucro
  // cheio vem logo abaixo, porque é ele que diz se o negócio se paga.
  const verdict = marginVerdict(result.cashMarginPct);
  const noCash = result.cashProfit < 0;
  const loss = result.profit < 0;
  const meuTempo = result.timeCost > 0;

  return (
    <div className="border border-fg/12 bg-fg/[0.03]">
      <div className="border-b border-fg/12 p-5 sm:p-6">{children}</div>

      {/* ── O número que importa ── */}
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="bv-eyebrow text-fg-muted">
            {noCash ? "Falta no caixa" : "Entra no caixa"}
            {result.units > 1 ? " por anúncio" : " por venda"}
          </span>
          <span className={`text-[0.8125rem] font-medium ${VERDICT_COLOR[verdict.tone]}`}>
            {verdict.label}
          </span>
        </div>
        <p
          className={`bv-numeral mt-3 text-[clamp(2.5rem,7vw,3.25rem)] ${
            noCash ? "text-data-loss" : "text-data-profit"
          }`}
        >
          {brl(result.cashProfit)}
        </p>
        <p className="mt-2 text-[0.75rem] leading-snug text-fg-muted">
          Dinheiro que sobra depois do filamento, da embalagem, das taxas e do imposto.
          {meuTempo ? " Seu trabalho ainda está aqui dentro." : ""}
        </p>
        <hr className="bv-rule-signal mt-4 opacity-60" />

        <div className="mt-4 flex items-baseline justify-between gap-3 border border-fg/12 px-3 py-2.5">
          <span className="text-[0.75rem] leading-snug text-fg-muted">
            Lucro cheio
            <span className="block">
              {meuTempo ? "depois de pagar sua hora e o desgaste" : "depois do desgaste da máquina"}
            </span>
          </span>
          <span
            className={`bv-numeral text-[1.25rem] tabular-nums ${
              loss ? "text-data-loss" : "text-fg"
            }`}
          >
            {brl(result.profit)}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
          <Metric label="Margem de caixa" value={pct(result.cashMarginPct)} />
          {result.units > 1 && (
            <Metric label="Caixa por unidade" value={brl(result.cashProfitPerUnit)} />
          )}
          <Metric label="Caixa por hora de impressora" value={brl(result.cashPerPrintHour)} />
          {meuTempo ? (
            <Metric
              label="Quanto sua hora rende"
              value={`${brl0(result.cashPerLaborHour)}/h`}
            />
          ) : (
            <Metric label="Markup sobre o desembolso" value={`${result.markup.toFixed(2)}×`} />
          )}
          <Metric label="Margem cheia" value={pct(result.marginPct)} />
          <Metric
            label={result.units > 1 ? "Desembolso do kit" : "Desembolso de produção"}
            value={brl(result.cashCost)}
          />
          <Metric label="Mercado Livre retém" value={brl(result.marketplaceTotal)} />
        </dl>
      </div>

      {/* ── Composição do preço ── */}
      <div className="border-t border-fg/12 p-5 sm:p-6">
        <span className="bv-eyebrow text-fg-muted">Para onde vai cada real</span>
        <CompositionBar result={result} />
        <ul className="mt-4 space-y-2">
          {result.deductions.map((d) => (
            <li key={d.key} className="flex items-center gap-2.5 text-[0.8125rem]">
              <span className={`h-2.5 w-2.5 shrink-0 ${SEGMENT_COLOR[d.key]}`} aria-hidden />
              <span className="min-w-0 flex-1 truncate text-fg-muted">{d.label}</span>
              <span className="tabular-nums">{brl(d.value)}</span>
              <span className="w-12 text-right tabular-nums text-fg-muted">
                {result.price > 0 ? pct((d.value / result.price) * 100, 0) : "—"}
              </span>
            </li>
          ))}
          <li className="flex items-center gap-2.5 border-t border-fg/12 pt-2 text-[0.8125rem] font-medium">
            <span
              className={`h-2.5 w-2.5 shrink-0 ${noCash ? "bg-data-loss" : "bg-data-profit"}`}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate">Caixa</span>
            <span className="tabular-nums">{brl(result.cashProfit)}</span>
            <span className="w-12 text-right tabular-nums">{pct(result.cashMarginPct, 0)}</span>
          </li>
          {meuTempo && (
            <li className="flex items-center gap-2.5 pl-3 text-[0.8125rem]">
              <span className="h-2.5 w-2.5 shrink-0 bg-data-time" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-fg-muted">└ seu tempo dentro dele</span>
              <span className="tabular-nums text-fg-muted">{brl(result.timeCost)}</span>
              <span className="w-12 text-right tabular-nums text-fg-muted">
                {result.price > 0 ? pct((result.timeCost / result.price) * 100, 0) : "—"}
              </span>
            </li>
          )}
          <li className="flex items-center gap-2.5 pl-3 text-[0.8125rem]">
            <span className="h-2.5 w-2.5 shrink-0 bg-data-wear" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-fg-muted">└ desgaste da máquina</span>
            <span className="tabular-nums text-fg-muted">{brl(result.wearCost)}</span>
            <span className="w-12 text-right tabular-nums text-fg-muted">
              {result.price > 0 ? pct((result.wearCost / result.price) * 100, 0) : "—"}
            </span>
          </li>
        </ul>
      </div>

      {/* ── Caminho inverso ── */}
      <div className="border-t border-fg/12 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="alvo" className="bv-eyebrow text-fg-muted">
            Preço para a margem de caixa
          </label>
          <span className="bv-numeral text-[0.9375rem] text-accent tabular-nums">
            {pct(targetMargin, 0)}
          </span>
        </div>
        <input
          id="alvo"
          type="range"
          min={0}
          max={70}
          step={1}
          value={targetMargin}
          onChange={(e) => onTargetMargin(Number(e.target.value))}
          className="mt-3 w-full accent-accent"
        />
        {suggested ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="bv-numeral text-[1.75rem] tabular-nums">{brl(suggested.price)}</p>
            <Button onClick={() => onUsePrice(suggested.price)}>Usar este preço</Button>
          </div>
        ) : (
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-data-loss">
            Impossível: comissão, imposto e publicidade somados à margem desejada já consomem
            100% do preço. Reduza a margem alvo ou os percentuais.
          </p>
        )}
        {suggested?.atBoundary && (
          <p className="mt-2 text-[0.75rem] leading-snug text-fg-muted">
            Preço travado na fronteira de faixa: logo abaixo dela o custo fixo por unidade
            inviabiliza a margem.
          </p>
        )}
        <div className="mt-4 space-y-2 border-t border-fg/12 pt-4 text-[0.8125rem] text-fg-muted">
          <p className="flex items-baseline justify-between gap-3">
            <span>Abaixo disto você tira do bolso</span>
            <span className="tabular-nums text-fg">{breakEven ? brl(breakEven.price) : "—"}</span>
          </p>
          <p className="flex items-baseline justify-between gap-3">
            <span>{meuTempo ? "Abaixo disto você trabalha de graça" : "Preço que cobre o desgaste"}</span>
            <span className="tabular-nums text-fg">
              {fullBreakEven ? brl(fullBreakEven.price) : "—"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.75rem] leading-snug text-fg-muted">{label}</dt>
      <dd className="bv-numeral mt-1 text-[1.125rem] tabular-nums">{value}</dd>
    </div>
  );
}

/** Barra de composição. É decorativa: os mesmos números aparecem na
 *  legenda logo abaixo, em texto. */
export function CompositionBar({ result }: { result: PricingResult }) {
  const noCash = result.cashProfit < 0;
  const denom = Math.max(result.price, result.totalCost, 0.01);
  // Depois dos desembolsos vem a cauda: o seu tempo e o desgaste saem de
  // dentro do caixa, e só o que fica depois deles é lucro de verdade.
  const segments = [
    ...result.deductions.map((d) => ({ key: d.key, value: d.value, cls: SEGMENT_COLOR[d.key] })),
    ...(noCash
      ? [{ key: "semcaixa", value: Math.abs(result.cashProfit), cls: "bg-data-loss" }]
      : [
          { key: "tempo", value: result.timeCost, cls: "bg-data-time" },
          { key: "desgaste", value: result.wearCost, cls: "bg-data-wear" },
          {
            key: "resultado",
            value: Math.abs(result.profit),
            cls: result.profit < 0 ? "bg-data-loss" : "bg-data-profit",
          },
        ]),
  ];

  return (
    <div aria-hidden className="mt-3 flex h-9 w-full overflow-hidden bg-fg/10">
      {segments
        .filter((s) => s.value > 0)
        .map((s) => (
          <span
            key={s.key}
            className={`${s.cls} h-full transition-[width] duration-300 ease-bv`}
            style={{ width: `${(s.value / denom) * 100}%` }}
          />
        ))}
    </div>
  );
}

/* ── Detalhamento e volume ──────────────────────────────────────────── */

export function Breakdown({
  result,
  inputs,
  monthlyUnits,
  onMonthlyUnits,
}: {
  result: PricingResult;
  inputs: PricingInputs;
  monthlyUnits: number;
  onMonthlyUnits: (n: number) => void;
}) {
  const p = result.production;
  const kit = p.units > 1;
  const loss = result.profit < 0;
  const noCash = result.cashProfit < 0;
  const meuTempo = result.timeCost > 0;
  /** Número curto em português: 4,53 h, 135 g. */
  const n = (x: number) => x.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  const perPiece = kit ? ` × ${p.units} peças` : "";

  const rows: { label: string; value: number; note?: string }[] = [
    {
      label: "Filamento",
      value: p.material,
      note: `${n(p.weightG)} g${kit ? " somadas" : ""} a ${brl(
        inputs.filamentPricePerKg / 1000,
      )}/g + ${pct(inputs.wastePct, 0)} de perda`,
    },
    {
      label: "Energia",
      value: p.energy,
      note: `${inputs.printerWatts} W × ${n(p.hours)} h × ${brl(inputs.energyPricePerKwh)}/kWh`,
    },
    {
      label: "Máquina",
      value: p.machine,
      note: `${n(p.hours)} h × ${brl(inputs.machineCostPerHour)}/h — desgaste, não sai do caixa`,
    },
    {
      label: "Impressões perdidas",
      value: p.failure,
      note: `${pct(inputs.failureRatePct, 0)} de falha diluídos nas peças boas`,
    },
    {
      label: "Mão de obra",
      value: p.labor,
      note: `${inputs.laborMinutes} min${perPiece} × ${brl(inputs.laborCostPerHour)}/h${
        meuTempo ? " — seu tempo, não sai do caixa" : ""
      }`,
    },
    {
      label: "Insumos extras",
      value: p.extras,
      note: kit ? `${brl(inputs.extrasCost)} por peça${perPiece}` : undefined,
    },
    { label: "Embalagem", value: p.packaging, note: "Uma por venda, não por peça" },
  ].filter((r) => r.value > 0.0001);

  const monthly = monthlyUnits * result.cashProfit;
  const monthlyFull = monthlyUnits * result.profit;

  const threshold = inputs.fixedFeeThreshold;
  const isFree = inputs.listingType === "gratuito";
  const sellerPaysShipping =
    inputs.shippingRule === "vendedor" ||
    (inputs.shippingRule === "auto" && !isFree && result.price >= threshold);
  const band =
    result.price < FIXED_FEE_BANDS[0]
      ? `abaixo de ${brl(FIXED_FEE_BANDS[0])}`
      : result.price < FIXED_FEE_BANDS[1]
        ? `de ${brl(FIXED_FEE_BANDS[0])} a ${brl(FIXED_FEE_BANDS[1])}`
        : `de ${brl(FIXED_FEE_BANDS[1])} a ${brl(threshold)}`;

  // Cada dedução ganha uma linha e o motivo de estar ali — inclusive quando
  // é zero: saber por que uma taxa NÃO está sendo cobrada vale tanto quanto
  // saber o valor das outras. O custo fixo é o caso clássico: some acima do
  // limite e, abaixo dele, morde uma fatia que nenhum percentual denuncia.
  const saleRows: { label: string; value: number; note: string }[] = [
    {
      label: "Produção (o que sai do bolso)",
      value: p.cash,
      note: kit
        ? `As ${p.units} peças do anúncio: filamento, energia, perdas, insumos e embalagem`
        : "Filamento, energia, perdas, insumos e embalagem",
    },
    {
      label: "Comissão do anúncio",
      value: result.commission,
      note: isFree
        ? "Anúncio grátis não paga comissão"
        : `${LISTING_TYPES[inputs.listingType].label} · ${pct(inputs.commissionPct, 0)} sobre o preço`,
    },
    {
      label: "Custo fixo por venda",
      value: result.fixedFee,
      note: isFree
        ? "Anúncio grátis não tem custo fixo"
        : result.price >= threshold
          ? `Não incide: preço a partir de ${brl(threshold)}`
          : `Valor fixo por venda na faixa ${band} — não é percentual, e por isso pesa tanto em peça barata`,
    },
    {
      label: "Frete pago pelo vendedor",
      value: result.shipping,
      note: sellerPaysShipping
        ? `${brl(inputs.shippingCost)} de tabela menos ${pct(inputs.shippingDiscountPct, 0)} de desconto de reputação`
        : inputs.shippingRule === "comprador"
          ? "Comprador paga o frete"
          : `Comprador paga: preço abaixo de ${brl(threshold)}`,
    },
    {
      label: "Logística por venda",
      value: result.logistics,
      note: "Armazenagem no Full, coleta e deslocamento — uma vez por venda",
    },
    {
      label: "Imposto",
      value: result.tax,
      note: `${pct(inputs.taxPct, 0)} sobre o preço de venda`,
    },
    {
      label: "Publicidade",
      value: result.ads,
      note: `${pct(inputs.adsPct, 0)} do preço aplicados em mídia`,
    },
    {
      label: "Outros custos",
      value: result.other,
      note: `${pct(inputs.otherPct, 0)} do preço`,
    },
  ];

  return (
    <div className="grid gap-gutter lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="flex flex-col gap-gutter">
      <div className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
        <h2 className="bv-display text-[1.0625rem] font-medium">Custo de produção, linha a linha</h2>
        {kit && (
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg-muted">
            Anúncio com {p.units} peças: {n(p.weightG)} g e {n(p.hours)} h no total.
          </p>
        )}
        <table className="mt-4 w-full text-[0.875rem]">
          <caption className="sr-only">
            Composição do custo de produção de uma unidade
          </caption>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-fg/10 last:border-0">
                <th scope="row" className="py-2.5 pr-3 text-left font-normal align-top">
                  {r.label}
                  {r.note && (
                    <span className="mt-0.5 block text-[0.75rem] leading-snug text-fg-muted">
                      {r.note}
                    </span>
                  )}
                </th>
                <td className="py-2.5 text-right tabular-nums align-top">{brl(r.value)}</td>
                <td className="w-16 py-2.5 text-right tabular-nums text-fg-muted align-top">
                  {p.total > 0 ? pct((r.value / p.total) * 100, 0) : "—"}
                </td>
              </tr>
            ))}
            <tr className="border-t border-fg/25">
              <th scope="row" className="py-3 text-left font-medium">
                Sai do bolso{kit ? " por anúncio" : ""}
              </th>
              <td className="py-3 text-right font-medium tabular-nums">{brl(p.cash)}</td>
              <td className="py-3 text-right tabular-nums text-fg-muted">
                {p.total > 0 ? pct((p.cash / p.total) * 100, 0) : "—"}
              </td>
            </tr>
            <tr>
              <th scope="row" className="py-2 text-left font-normal text-fg-muted">
                Não sai do bolso ({meuTempo ? "seu tempo + desgaste" : "desgaste"})
              </th>
              <td className="py-2 text-right tabular-nums text-fg-muted">
                {brl(p.time + p.wear)}
              </td>
              <td className="py-2 text-right tabular-nums text-fg-muted">
                {p.total > 0 ? pct(((p.time + p.wear) / p.total) * 100, 0) : "—"}
              </td>
            </tr>
            <tr className="border-t border-fg/15">
              <th scope="row" className="py-3 text-left font-medium">
                Custo cheio{kit ? " do anúncio" : " por unidade"}
              </th>
              <td className="py-3 text-right font-medium tabular-nums">{brl(p.total)}</td>
              <td className="py-3 text-right tabular-nums text-fg-muted">100%</td>
            </tr>
            {kit && (
              <tr>
                <th scope="row" className="py-3 text-left font-normal text-fg-muted">
                  Custo cheio por peça
                </th>
                <td className="py-3 text-right tabular-nums">{brl(p.perUnit)}</td>
                <td className="py-3 text-right tabular-nums text-fg-muted">
                  {pct(100 / p.units, 0)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-muted">
          Custo por grama impresso: {brl(p.weightG > 0 ? p.total / p.weightG : 0)}. Custo por hora
          de impressão: {brl(p.hours > 0 ? p.total / p.hours : 0)}.
        </p>
      </div>

      <div className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
        <h2 className="bv-display text-[1.0625rem] font-medium">Do preço ao lucro, linha a linha</h2>
        <p className="mt-2 max-w-[62ch] text-[0.8125rem] leading-relaxed text-fg-muted">
          Tudo que sai do preço antes de sobrar alguma coisa. As linhas zeradas continuam à vista
          de propósito: saber por que uma taxa não está sendo cobrada vale tanto quanto saber o
          valor das outras.
        </p>
        <table className="mt-4 w-full text-[0.875rem]">
          <caption className="sr-only">Do preço de venda ao lucro</caption>
          {kit && (
            <thead>
              <tr className="text-[0.75rem] text-fg-muted">
                <th scope="col" className="pb-2 text-left font-normal">
                  <span className="sr-only">Linha</span>
                </th>
                <th scope="col" className="pb-2 text-right font-normal">
                  Por anúncio
                </th>
                <th scope="col" className="w-24 pb-2 text-right font-normal">
                  Por peça
                </th>
                <th scope="col" className="w-16 pb-2 text-right font-normal">
                  % do preço
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            <tr className="border-b border-fg/25">
              <th scope="row" className="py-2.5 pr-3 text-left font-medium">
                {kit ? "Preço do anúncio" : "Preço de venda"}
              </th>
              <td className="py-2.5 text-right font-medium tabular-nums">{brl(result.price)}</td>
              {kit && (
                <td className="w-24 py-2.5 text-right font-medium tabular-nums">
                  {brl(result.pricePerUnit)}
                </td>
              )}
              <td className="w-16 py-2.5 text-right tabular-nums text-fg-muted">100%</td>
            </tr>
            {saleRows.map((r) => (
              <tr
                key={r.label}
                className={`border-b border-fg/10 ${r.value <= 0.0001 ? "opacity-55" : ""}`}
              >
                <th scope="row" className="py-2.5 pr-3 text-left font-normal align-top">
                  {r.label}
                  <span className="mt-0.5 block max-w-[46ch] text-[0.75rem] leading-snug text-fg-muted">
                    {r.note}
                  </span>
                </th>
                <td className="py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                  {r.value > 0.0001 ? `− ${brl(r.value)}` : brl(0)}
                </td>
                {kit && (
                  <td className="w-24 py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                    {r.value > 0.0001 ? `− ${brl(r.value / p.units)}` : brl(0)}
                  </td>
                )}
                <td className="w-16 py-2.5 text-right tabular-nums text-fg-muted align-top">
                  {result.price > 0 ? pct((r.value / result.price) * 100, 0) : "—"}
                </td>
              </tr>
            ))}
            {/* O caixa fecha aqui: daqui para baixo nada sai da conta hoje. */}
            <tr className="border-t border-fg/25">
              <th scope="row" className="py-3 text-left font-medium">
                {noCash ? "Falta no caixa" : "Entra no caixa"}
              </th>
              <td
                className={`py-3 text-right font-medium tabular-nums ${
                  noCash ? "text-data-loss" : "text-data-profit"
                }`}
              >
                {brl(result.cashProfit)}
              </td>
              {kit && (
                <td
                  className={`w-24 py-3 text-right font-medium tabular-nums ${
                    noCash ? "text-data-loss" : "text-data-profit"
                  }`}
                >
                  {brl(result.cashProfitPerUnit)}
                </td>
              )}
              <td
                className={`py-3 text-right tabular-nums ${
                  noCash ? "text-data-loss" : "text-data-profit"
                }`}
              >
                {pct(result.cashMarginPct, 0)}
              </td>
            </tr>

            {meuTempo && (
              <tr className="border-b border-fg/10">
                <th scope="row" className="py-2.5 pr-3 text-left font-normal align-top">
                  Seu tempo
                  <span className="mt-0.5 block max-w-[46ch] text-[0.75rem] leading-snug text-fg-muted">
                    {inputs.laborMinutes} min{kit ? ` × ${p.units} peças` : ""} a{" "}
                    {brl(inputs.laborCostPerHour)}/h — não sai da conta, sai de você
                  </span>
                </th>
                <td className="py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                  − {brl(result.timeCost)}
                </td>
                {kit && (
                  <td className="w-24 py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                    − {brl(result.timeCost / p.units)}
                  </td>
                )}
                <td className="w-16 py-2.5 text-right tabular-nums text-fg-muted align-top">
                  {result.price > 0 ? pct((result.timeCost / result.price) * 100, 0) : "—"}
                </td>
              </tr>
            )}
            <tr className="border-b border-fg/10">
              <th scope="row" className="py-2.5 pr-3 text-left font-normal align-top">
                Desgaste da máquina
                <span className="mt-0.5 block max-w-[46ch] text-[0.75rem] leading-snug text-fg-muted">
                  {n(p.hours)} h a {brl(inputs.machineCostPerHour)}/h, mais as perdas — não sai
                  hoje, sai quando o bico ou a máquina morrer
                </span>
              </th>
              <td className="py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                − {brl(result.wearCost)}
              </td>
              {kit && (
                <td className="w-24 py-2.5 text-right tabular-nums align-top whitespace-nowrap">
                  − {brl(result.wearCost / p.units)}
                </td>
              )}
              <td className="w-16 py-2.5 text-right tabular-nums text-fg-muted align-top">
                {result.price > 0 ? pct((result.wearCost / result.price) * 100, 0) : "—"}
              </td>
            </tr>

            <tr className="border-t border-fg/25">
              <th scope="row" className="py-3 text-left font-medium">
                {loss ? "Prejuízo cheio" : "Lucro cheio"}
                {kit ? " por anúncio" : ""}
              </th>
              <td
                className={`py-3 text-right font-medium tabular-nums ${
                  loss ? "text-data-loss" : "text-fg"
                }`}
              >
                {brl(result.profit)}
              </td>
              {kit && (
                <td
                  className={`w-24 py-3 text-right font-medium tabular-nums ${
                    loss ? "text-data-loss" : "text-fg"
                  }`}
                >
                  {brl(result.profitPerUnit)}
                </td>
              )}
              <td
                className={`py-3 text-right tabular-nums ${loss ? "text-data-loss" : "text-fg"}`}
              >
                {pct(result.marginPct, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <div className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
        <h2 className="bv-display text-[1.0625rem] font-medium">Projeção mensal</h2>
        <label htmlFor="volume" className="mt-4 block text-[0.8125rem] text-fg-muted">
          {kit ? "Anúncios (kits) vendidos por mês" : "Unidades vendidas por mês"}
        </label>
        <input
          id="volume"
          type="range"
          min={1}
          max={300}
          step={1}
          value={Math.min(monthlyUnits, 300)}
          onChange={(e) => onMonthlyUnits(Number(e.target.value))}
          className="mt-2 w-full accent-accent"
        />
        <p className="bv-numeral text-[1.5rem] tabular-nums">
          {monthlyUnits} {kit ? "kits" : "un."}
        </p>
        <dl className="mt-5 space-y-3">
          <Line label="Faturamento" value={brl(monthlyUnits * result.price)} />
          <Line
            label="Sai do bolso"
            value={brl(monthlyUnits * (result.cashCost + result.marketplaceTotal + result.logistics + result.tax + result.ads + result.other))}
          />
          <Line
            label={monthly < 0 ? "Falta no caixa" : "Entra no caixa"}
            value={brl(monthly)}
            strong
            tone={monthly < 0 ? "loss" : "profit"}
          />
          <Line
            label={monthlyFull < 0 ? "Prejuízo cheio" : "Lucro cheio"}
            value={brl(monthlyFull)}
          />
          {meuTempo && (
            <Line
              label="Seu trabalho no mês"
              value={`${((monthlyUnits * inputs.laborMinutes * p.units) / 60).toFixed(1)} h`}
            />
          )}
          {kit && <Line label="Peças impressas" value={`${monthlyUnits * p.units} un.`} />}
          <Line label="Horas de impressora" value={`${(monthlyUnits * p.hours).toFixed(0)} h`} />
        </dl>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-muted">
          A projeção não desconta custos fixos do negócio (aluguel, software, pró-labore). E
          vender {monthlyUnits} por mês é demanda, não impressão — a máquina aguentar não
          significa o mercado comprar.
        </p>
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  strong = false,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: "loss" | "profit";
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-fg/10 pb-3 last:border-0">
      <dt className="text-[0.8125rem] text-fg-muted">{label}</dt>
      <dd
        className={`bv-numeral tabular-nums ${strong ? "text-[1.25rem]" : "text-[1rem]"} ${
          tone === "loss" ? "text-data-loss" : tone === "profit" ? "text-data-profit" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
