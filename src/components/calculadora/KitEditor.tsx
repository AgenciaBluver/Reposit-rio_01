"use client";

import { brl, type KitPiece, type PricingInputs } from "@/lib/pricing/mercado-livre";
import { Button, NumberField, TextField } from "./Fields";

/* ════════════════════════════════════════════════════════════════════════
   KIT
   ────────────────────────────────────────────────────────────────────────
   Um anúncio pode vender mais de uma peça. Isso muda a conta de um jeito
   que não é óbvio: filamento, energia, máquina e acabamento multiplicam
   por peça, mas EMBALAGEM, FRETE, CUSTO FIXO e LOGÍSTICA são pagos uma vez
   por venda. Vender três peças num anúncio de R$ 63 paga um custo fixo de
   R$ 6,75; vender as mesmas três a R$ 21 cada paga R$ 6,25 três vezes.
   ════════════════════════════════════════════════════════════════════════ */

export function KitEditor({
  inputs,
  onChange,
  unitCost,
}: {
  inputs: PricingInputs;
  onChange: (pieces: KitPiece[]) => void;
  /** Custo médio por peça — a leitura que justifica o kit. */
  unitCost: number;
}) {
  const pieces = inputs.kitPieces ?? [];
  const units =
    Math.max(1, Math.round(inputs.kitQty) || 1) +
    pieces.reduce((sum, p) => sum + Math.max(1, Math.round(p.qty) || 1), 0);

  const update = (id: string, patch: Partial<KitPiece>) =>
    onChange(pieces.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  return (
    <div className="sm:col-span-2 border-t border-fg/10 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-[0.875rem] font-medium">Outras peças no mesmo anúncio</h3>
        <p className="text-[0.75rem] text-fg-muted">
          {units} {units === 1 ? "peça" : "peças"} por venda · {brl(unitCost)} de custo por unidade
        </p>
      </div>
      <p className="mt-1.5 max-w-[62ch] text-[0.75rem] leading-relaxed text-fg-muted">
        Para um kit da mesma peça, use o campo de quantidade acima. Para um kit de peças
        diferentes, acrescente cada uma aqui. Embalagem, frete e custo fixo do Mercado Livre são
        pagos uma vez por venda — é daí que vem a economia do kit. Vale para um anúncio que vende
        o conjunto como um produto só; ter 3 unidades em estoque no anúncio avulso não dilui nada,
        porque cada venda paga as taxas de novo.
      </p>

      {pieces.length > 0 && (
        <ul className="mt-4 space-y-3">
          <li className="hidden gap-2 text-[0.75rem] text-fg-muted sm:grid sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_4.5rem_2.25rem]">
            <span>Peça</span>
            <span>Peso</span>
            <span>Tempo</span>
            <span>Qtd.</span>
            <span />
          </li>
          {pieces.map((piece) => (
            <li
              key={piece.id}
              className="grid grid-cols-2 items-end gap-2 sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_4.5rem_2.25rem]"
            >
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  label="Nome da peça"
                  labelHidden
                  value={piece.label}
                  placeholder="Ex.: tampa"
                  onChange={(v) => update(piece.id, { label: v })}
                />
              </div>
              <NumberField
                label="Peso da peça do kit"
                labelHidden
                unit="g"
                value={piece.weightG}
                onChange={(n) => update(piece.id, { weightG: n })}
              />
              <NumberField
                label="Tempo de impressão da peça do kit"
                labelHidden
                unit="h"
                value={piece.printHours}
                onChange={(n) => update(piece.id, { printHours: n })}
              />
              <NumberField
                label="Quantidade da peça do kit"
                labelHidden
                value={piece.qty}
                min={1}
                onChange={(n) => update(piece.id, { qty: n })}
              />
              <button
                type="button"
                onClick={() => onChange(pieces.filter((p) => p.id !== piece.id))}
                aria-label={`Remover ${piece.label || "peça"} do kit`}
                className="flex h-[2.85rem] w-full items-center justify-center border border-fg/15 text-fg-muted transition-colors hover:border-data-loss hover:text-data-loss"
              >
                <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <Button
          onClick={() =>
            onChange([
              ...pieces,
              {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                label: "",
                weightG: 20,
                printHours: 1,
                qty: 1,
              },
            ])
          }
        >
          Adicionar peça ao kit
        </Button>
      </div>
    </div>
  );
}
