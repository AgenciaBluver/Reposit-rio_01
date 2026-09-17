"use client";

import { useId, type ReactNode } from "react";
import {
  brl,
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
}: {
  price: number;
  onChange: (n: number) => void;
  suggested: number | null;
}) {
  const id = useId();
  const field = useNumericDraft(price, onChange, { decimalsOnBlur: 2 });
  // O fim da régua acompanha o preço: sempre sobra espaço para explorar
  // acima do valor atual, sem esmagar a escala nos produtos baratos.
  const max = Math.max(50, Math.ceil(Math.max(price * 1.8, (suggested ?? 0) * 1.4, 100) / 10) * 10);
  return (
    <div>
      <label htmlFor={id} className="bv-eyebrow text-fg-muted">
        Preço de venda
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
    </div>
  );
}

export function ResultPanel({
  result,
  targetMargin,
  onTargetMargin,
  suggested,
  breakEven,
  onUsePrice,
  children,
}: {
  result: PricingResult;
  targetMargin: number;
  onTargetMargin: (n: number) => void;
  suggested: { price: number; atBoundary: boolean } | null;
  breakEven: { price: number; atBoundary: boolean } | null;
  onUsePrice: (n: number) => void;
  /** Controle de preço — renderizado no topo do painel. */
  children: ReactNode;
}) {
  const verdict = marginVerdict(result.marginPct);
  const loss = result.profit < 0;

  return (
    <div className="border border-fg/12 bg-fg/[0.03]">
      <div className="border-b border-fg/12 p-5 sm:p-6">{children}</div>

      {/* ── O número que importa ── */}
      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="bv-eyebrow text-fg-muted">
            {loss ? "Prejuízo por unidade" : "Lucro por unidade"}
          </span>
          <span className={`text-[0.8125rem] font-medium ${VERDICT_COLOR[verdict.tone]}`}>
            {verdict.label}
          </span>
        </div>
        <p
          className={`bv-numeral mt-3 text-[clamp(2.5rem,7vw,3.25rem)] ${
            loss ? "text-data-loss" : "text-data-profit"
          }`}
        >
          {brl(result.profit)}
        </p>
        <hr className="bv-rule-signal mt-4 opacity-60" />

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
          <Metric label="Margem líquida" value={pct(result.marginPct)} />
          <Metric label="Markup sobre o custo" value={`${result.markup.toFixed(2)}×`} />
          <Metric label="Lucro por hora de impressora" value={brl(result.profitPerPrintHour)} />
          <Metric label="Retorno sobre o custo" value={pct(result.roiPct, 0)} />
          <Metric label="Custo de produção" value={brl(result.production.total)} />
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
              className={`h-2.5 w-2.5 shrink-0 ${loss ? "bg-data-loss" : "bg-data-profit"}`}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate">{loss ? "Prejuízo" : "Lucro"}</span>
            <span className="tabular-nums">{brl(result.profit)}</span>
            <span className="w-12 text-right tabular-nums">{pct(result.marginPct, 0)}</span>
          </li>
        </ul>
      </div>

      {/* ── Caminho inverso ── */}
      <div className="border-t border-fg/12 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="alvo" className="bv-eyebrow text-fg-muted">
            Preço para a margem desejada
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
        <p className="mt-4 flex items-baseline justify-between gap-3 border-t border-fg/12 pt-4 text-[0.8125rem] text-fg-muted">
          <span>Preço de equilíbrio (lucro zero)</span>
          <span className="tabular-nums text-fg">{breakEven ? brl(breakEven.price) : "—"}</span>
        </p>
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
  const loss = result.profit < 0;
  const denom = Math.max(result.price, result.totalCost, 0.01);
  const segments = [
    ...result.deductions.map((d) => ({ key: d.key, value: d.value, cls: SEGMENT_COLOR[d.key] })),
    {
      key: "resultado",
      value: Math.abs(result.profit),
      cls: loss ? "bg-data-loss" : "bg-data-profit",
    },
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
  const rows: { label: string; value: number; note?: string }[] = [
    {
      label: "Filamento",
      value: p.material,
      note: `${inputs.partWeightG} g a ${brl(inputs.filamentPricePerKg / 1000)}/g + ${pct(
        inputs.wastePct,
        0,
      )} de perda`,
    },
    {
      label: "Energia",
      value: p.energy,
      note: `${inputs.printerWatts} W × ${inputs.printHours} h × ${brl(
        inputs.energyPricePerKwh,
      )}/kWh`,
    },
    {
      label: "Máquina",
      value: p.machine,
      note: `${inputs.printHours} h × ${brl(inputs.machineCostPerHour)}/h`,
    },
    {
      label: "Impressões perdidas",
      value: p.failure,
      note: `${pct(inputs.failureRatePct, 0)} de falha diluídos nas peças boas`,
    },
    {
      label: "Mão de obra",
      value: p.labor,
      note: `${inputs.laborMinutes} min × ${brl(inputs.laborCostPerHour)}/h`,
    },
    { label: "Insumos extras", value: p.extras },
    { label: "Embalagem", value: p.packaging },
  ].filter((r) => r.value > 0.0001);

  const monthly = monthlyUnits * result.profit;

  return (
    <div className="grid gap-gutter lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
        <h2 className="bv-display text-[1.0625rem] font-medium">Custo de produção, linha a linha</h2>
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
                Custo por unidade
              </th>
              <td className="py-3 text-right font-medium tabular-nums">{brl(p.total)}</td>
              <td className="py-3 text-right tabular-nums text-fg-muted">100%</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-muted">
          Custo por grama impresso: {brl(inputs.partWeightG > 0 ? p.total / inputs.partWeightG : 0)}.
          Custo por hora de impressão: {brl(inputs.printHours > 0 ? p.total / inputs.printHours : 0)}.
        </p>
      </div>

      <div className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
        <h2 className="bv-display text-[1.0625rem] font-medium">Projeção mensal</h2>
        <label htmlFor="volume" className="mt-4 block text-[0.8125rem] text-fg-muted">
          Unidades vendidas por mês
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
        <p className="bv-numeral text-[1.5rem] tabular-nums">{monthlyUnits} un.</p>
        <dl className="mt-5 space-y-3">
          <Line label="Faturamento" value={brl(monthlyUnits * result.price)} />
          <Line label="Custo total" value={brl(monthlyUnits * result.totalCost)} />
          <Line
            label={monthly < 0 ? "Prejuízo no mês" : "Lucro no mês"}
            value={brl(monthly)}
            strong
            tone={monthly < 0 ? "loss" : "profit"}
          />
          <Line
            label="Horas de impressora"
            value={`${(monthlyUnits * inputs.printHours).toFixed(0)} h`}
          />
        </dl>
        <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-muted">
          A projeção não desconta custos fixos do negócio (aluguel, software, pró-labore). Ela
          mostra o que sobra das vendas — não o lucro da empresa.
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
