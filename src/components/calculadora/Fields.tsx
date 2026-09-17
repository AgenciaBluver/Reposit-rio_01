"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

/* ════════════════════════════════════════════════════════════════════════
   CAMPOS DA CALCULADORA
   ────────────────────────────────────────────────────────────────────────
   Todo campo numérico aceita vírgula — é como brasileiro digita dinheiro.
   O estado externo é sempre `number`; a string digitada mora aqui dentro.
   ════════════════════════════════════════════════════════════════════════ */

/** "1.234,56" · "1234,56" · "R$ 12" → número. Nunca devolve NaN. */
export function parseNumber(raw: string): number {
  const cleaned = raw
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "") // ponto de milhar
    .replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

const toDraft = (n: number) => String(Math.round(n * 1e6) / 1e6).replace(".", ",");

/** Mantém a string digitada separada do número do estado.
 *
 *  Sem isso, digitar "119,90" volta como "119,9" no mesmo instante — o
 *  número já não guarda o zero à direita — e a vírgula sozinha ("1,")
 *  nunca chega a ser digitável. */
export function useNumericDraft(
  value: number,
  onChange: (n: number) => void,
  {
    min = 0,
    max,
    /** Casas fixas ao sair do campo — usado em dinheiro, para "89,9"
     *  voltar a ser "89,90". */
    decimalsOnBlur,
  }: { min?: number; max?: number; decimalsOnBlur?: number } = {},
) {
  const [draft, setDraft] = useState(() => toDraft(value));

  // Sincroniza quando o valor muda por fora (preset, preço sugerido, reset).
  useEffect(() => {
    if (parseNumber(draft) !== value) setDraft(toDraft(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    value: draft,
    onChange: (raw: string) => {
      setDraft(raw);
      let n = parseNumber(raw);
      if (min !== undefined) n = Math.max(n, min);
      if (max !== undefined) n = Math.min(n, max);
      onChange(n);
    },
    onBlur: () => {
      const n = parseNumber(draft);
      setDraft(decimalsOnBlur === undefined ? toDraft(n) : n.toFixed(decimalsOnBlur).replace(".", ","));
    },
  };
}

export function Panel({
  title,
  step,
  children,
  hint,
}: {
  title: string;
  step?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <section className="border border-fg/12 bg-fg/[0.03] p-5 sm:p-6">
      <header className="mb-5 flex items-baseline gap-3">
        {step && (
          <span className="bv-numeral text-[0.8125rem] text-accent" aria-hidden>
            {step}
          </span>
        )}
        <h2 className="bv-display text-[1.0625rem] font-medium tracking-[-0.01em]">{title}</h2>
      </header>
      {hint && <p className="mb-5 text-[0.8125rem] leading-relaxed text-fg-muted">{hint}</p>}
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/** Campo numérico com unidade. `unit` aparece dentro da caixa, não no rótulo:
 *  quem preenche precisa ver "g" e "R$" na hora de digitar, não antes. */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  unitPosition = "suffix",
  hint,
  min = 0,
  max,
  span = 1,
  labelHidden = false,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  unit?: string;
  unitPosition?: "prefix" | "suffix";
  hint?: string;
  min?: number;
  max?: number;
  span?: 1 | 2;
  /** Mantém o rótulo para leitores de tela quando a coluna já o nomeia. */
  labelHidden?: boolean;
}) {
  const id = useId();
  const field = useNumericDraft(value, onChange, { min, max });

  return (
    <div className={span === 2 ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={id}
        className={
          labelHidden ? "sr-only" : "mb-1.5 block text-[0.8125rem] leading-tight text-fg-muted"
        }
      >
        {label}
      </label>
      <div className="flex items-center border border-fg/15 bg-bg transition-colors focus-within:border-accent">
        {unit && unitPosition === "prefix" && (
          <span className="pl-3 text-[0.8125rem] text-fg-muted" aria-hidden>
            {unit}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full bg-transparent px-3 py-2.5 text-[0.9375rem] tabular-nums outline-none"
        />
        {unit && unitPosition === "suffix" && (
          <span className="pr-3 text-[0.8125rem] text-fg-muted" aria-hidden>
            {unit}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[0.75rem] leading-snug text-fg-muted">{hint}</p>}
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
  span = 1,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
  span?: 1 | 2;
}) {
  const id = useId();
  return (
    <div className={span === 2 ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1.5 block text-[0.8125rem] leading-tight text-fg-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full appearance-none border border-fg/15 bg-bg bg-[length:0.7rem] bg-[right_0.85rem_center] bg-no-repeat px-3 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-accent"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none' stroke='%239A9A9E' stroke-width='1.4'%3E%3Cpath d='M1 1l4 4 4-4'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-raised text-fg">
            {o.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1.5 text-[0.75rem] leading-snug text-fg-muted">{hint}</p>}
    </div>
  );
}

/** Botão discreto do sistema. Sem raio, como todo CTA da marca. */
export function Button({
  children,
  onClick,
  variant = "ghost",
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[0.8125rem] font-medium tracking-[-0.005em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const skin =
    variant === "solid"
      ? "bg-fg text-bg hover:opacity-85"
      : "border border-fg/20 hover:border-fg/50";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${skin} ${className}`}>
      {children}
    </button>
  );
}

/** Campo de texto curto. Existe só para nomear as peças de um kit. */
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  labelHidden = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  labelHidden?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className={
          labelHidden ? "sr-only" : "mb-1.5 block text-[0.8125rem] leading-tight text-fg-muted"
        }
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-fg/15 bg-bg px-3 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
