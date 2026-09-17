"use client";

import { useState } from "react";
import { brl, calculate, pct, marginVerdict, type PricingInputs } from "@/lib/pricing/mercado-livre";
import { Button } from "./Fields";

/* ════════════════════════════════════════════════════════════════════════
   CATÁLOGO
   ────────────────────────────────────────────────────────────────────────
   A calculadora só vira ferramenta de gestão quando os produtos ficam lado
   a lado: é comparando margem por peça que se decide o que continua no ar.
   Tudo vive no navegador de quem usa (localStorage). Nada sai daqui.
   ════════════════════════════════════════════════════════════════════════ */

export type SavedProduct = {
  id: string;
  name: string;
  savedAt: number;
  inputs: PricingInputs;
};

const TONE = {
  loss: "text-data-loss",
  warn: "text-data-ads",
  ok: "text-fg",
  good: "text-data-profit",
} as const;

export function Catalog({
  items,
  onSave,
  onLoad,
  onDelete,
}: {
  items: SavedProduct[];
  onSave: (name: string) => void;
  onLoad: (item: SavedProduct) => void;
  onDelete: (id: string) => void;
}) {
  const [name, setName] = useState("");

  const save = () => {
    const clean = name.trim();
    if (!clean) return;
    onSave(clean);
    setName("");
  };

  return (
    <section className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="bv-display text-[1.0625rem] font-medium">Meus produtos</h2>
          <p className="mt-1 text-[0.8125rem] text-fg-muted">
            Salvos no seu navegador. Nenhum dado é enviado para servidor algum.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="Nome do produto"
            aria-label="Nome do produto a salvar"
            className="w-56 border border-fg/15 bg-bg px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-accent"
          />
          <Button variant="solid" onClick={save} disabled={!name.trim()}>
            Salvar cenário atual
          </Button>
          {items.length > 0 && (
            <Button onClick={() => exportCsv(items)}>Exportar CSV</Button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 border border-dashed border-fg/15 px-4 py-8 text-center text-[0.875rem] text-fg-muted">
          Nenhum produto salvo ainda. Ajuste os campos acima, dê um nome e salve — dá para
          comparar margem entre as peças do seu catálogo.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[46rem] text-[0.875rem]">
            <thead>
              <tr className="border-b border-fg/20 text-left text-[0.75rem] uppercase tracking-[0.1em] text-fg-muted">
                <th scope="col" className="py-2.5 pr-3 font-medium">Produto</th>
                <th scope="col" className="py-2.5 pr-3 text-right font-medium">Peso</th>
                <th scope="col" className="py-2.5 pr-3 text-right font-medium">Custo</th>
                <th scope="col" className="py-2.5 pr-3 text-right font-medium">Preço</th>
                <th scope="col" className="py-2.5 pr-3 text-right font-medium">Lucro</th>
                <th scope="col" className="py-2.5 pr-3 text-right font-medium">Margem</th>
                <th scope="col" className="py-2.5 text-right font-medium">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const r = calculate(item.inputs);
                const verdict = marginVerdict(r.marginPct);
                return (
                  <tr key={item.id} className="border-b border-fg/10 last:border-0">
                    <th scope="row" className="py-3 pr-3 text-left font-normal">
                      {item.name}
                    </th>
                    <td className="py-3 pr-3 text-right tabular-nums text-fg-muted">
                      {item.inputs.partWeightG} g
                    </td>
                    <td className="py-3 pr-3 text-right tabular-nums">{brl(r.production.total)}</td>
                    <td className="py-3 pr-3 text-right tabular-nums">{brl(r.price)}</td>
                    <td className={`py-3 pr-3 text-right tabular-nums ${TONE[verdict.tone]}`}>
                      {brl(r.profit)}
                    </td>
                    <td className={`py-3 pr-3 text-right tabular-nums ${TONE[verdict.tone]}`}>
                      {pct(r.marginPct, 1)}
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onLoad(item)}
                        className="bv-link text-[0.8125rem] text-accent"
                      >
                        Abrir
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="bv-link ml-4 text-[0.8125rem] text-fg-muted hover:text-data-loss"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/** CSV em ponto e vírgula com decimal por vírgula — é o que o Excel
 *  brasileiro abre sem pedir importação. */
function exportCsv(items: SavedProduct[]) {
  const num = (n: number) => n.toFixed(2).replace(".", ",");
  const head = [
    "Produto",
    "Peso (g)",
    "Horas de impressão",
    "Custo de produção",
    "Preço de venda",
    "Taxas do Mercado Livre",
    "Imposto",
    "Publicidade",
    "Lucro por unidade",
    "Margem (%)",
  ];
  const lines = items.map((item) => {
    const r = calculate(item.inputs);
    return [
      `"${item.name.replace(/"/g, '""')}"`,
      num(item.inputs.partWeightG),
      num(item.inputs.printHours),
      num(r.production.total),
      num(r.price),
      num(r.marketplaceTotal + r.logistics),
      num(r.tax),
      num(r.ads),
      num(r.profit),
      num(r.marginPct),
    ].join(";");
  });

  const csv = `﻿${head.join(";")}\n${lines.join("\n")}\n`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "precificacao-mercado-livre.csv";
  a.click();
  URL.revokeObjectURL(url);
}
