"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type FormState } from "@/app/(site)/contato/actions";
import { track } from "@/lib/analytics";
import { products } from "@/content/products";
import { segments } from "@/content/segments";
import { site } from "@/content/site";

/* ════════════════════════════════════════════════════════════════════════
   FORMULÁRIO PROGRESSIVO
   A conversão precisa parecer uma conversa estratégica, não um cadastro.
   Três passos: identificação → contexto → qualificação. Só o primeiro é
   obrigatório; quem quiser pode enviar já no passo 1.

   Todos os campos vivem no DOM o tempo todo (os passos inativos ficam
   ocultos): assim um envio a partir do passo 1 não perde o que já foi
   digitado, e o formulário continua funcionando sem JavaScript.
   ════════════════════════════════════════════════════════════════════════ */

const initial: FormState = { status: "idle" };

const investimento = [
  "Ainda não definido",
  "Até R$ 3 mil/mês",
  "R$ 4 mil a R$ 6 mil/mês",
  "R$ 8 mil a R$ 15 mil/mês",
  "Acima de R$ 15 mil/mês",
  "Projeto pontual",
];

const prazos = ["O quanto antes", "Nos próximos 30 dias", "Neste trimestre", "Ainda pesquisando"];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [step, setStep] = useState(1);
  const started = useRef(false);

  // form_start dispara uma única vez, na primeira interação real.
  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { location: "contato" });
  };

  useEffect(() => {
    if (state.status === "success" || state.status === "unconfigured") {
      track("form_submit", { location: "contato" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return <Confirmation />;
  }

  return (
    <form action={action} onInput={onFirstInput} className="w-full">
      {/* Progresso: a régua de gradiente cresce a cada passo. */}
      <div className="flex items-center gap-4">
        <div className="h-0.5 flex-1 bg-line">
          <div
            className="h-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${(step / 3) * 100}%`, background: "var(--bv-gradient)" }}
          />
        </div>
        <span aria-hidden className="bv-numeral text-[0.75rem] tracking-[0.1em] text-fg-muted">
          {String(step).padStart(2, "0")} / 03
        </span>
      </div>

      <p aria-live="polite" className="sr-only">
        Passo {step} de 3
      </p>

      {/* ── Passo 1 — identificação ────────────────────────────── */}
      <fieldset hidden={step !== 1} className="mt-10 border-0 p-0">
        <legend className="bv-display text-title">Quem está falando</legend>
        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          <Field name="nome" label="Nome" required autoComplete="name" />
          <Field name="empresa" label="Empresa" autoComplete="organization" />
          <Field name="email" label="E-mail" type="email" required autoComplete="email" />
          <Field name="telefone" label="WhatsApp" type="tel" autoComplete="tel" />
        </div>
      </fieldset>

      {/* ── Passo 2 — contexto ─────────────────────────────────── */}
      <fieldset hidden={step !== 2} className="mt-10 border-0 p-0">
        <legend className="bv-display text-title">O contexto do negócio</legend>
        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          <Field name="cargo" label="Cargo" autoComplete="organization-title" />
          <Field name="cidade" label="Cidade" autoComplete="address-level2" />
          <Select
            name="segmento"
            label="Segmento"
            options={[...segments.map((s) => s.name), "Outro"]}
          />
          <Field name="site" label="Site ou Instagram" placeholder="bluver.com.br" />
        </div>
        <div className="mt-7">
          <Textarea
            name="contexto"
            label="O que sua empresa faz"
            hint="Em poucas linhas. É o que nos permite chegar na conversa já tendo estudado o negócio."
          />
        </div>
      </fieldset>

      {/* ── Passo 3 — qualificação ─────────────────────────────── */}
      <fieldset hidden={step !== 3} className="mt-10 border-0 p-0">
        <legend className="bv-display text-title">O que você quer resolver</legend>
        <div className="mt-8 grid gap-7">
          <Textarea
            name="objetivo"
            label="Objetivo atual"
            hint="O que precisa mudar na forma como o mercado percebe a sua empresa."
          />
          <div className="grid gap-7 sm:grid-cols-2">
            <Select
              name="interesse"
              label="Solução de interesse"
              options={[...products.map((p) => p.name), "Ainda não sei"]}
            />
            <Select name="prazo" label="Prazo para início" options={prazos} />
          </div>
          <Select name="investimento" label="Faixa de investimento" options={investimento} />
        </div>
      </fieldset>

      {/* Honeypot — invisível para pessoas, irresistível para robôs. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Não preencher</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="mt-8 border-l-2 border-accent pl-4 text-[0.9375rem] text-fg">
          {state.message}
        </p>
      )}

      {state.status === "unconfigured" && <Unconfigured />}

      {/* ── Navegação ──────────────────────────────────────────── */}
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="bv-link text-[0.9375rem] text-fg-muted"
          >
            Voltar
          </button>
        )}

        {step < 3 && (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="bv-link text-[0.9375rem] font-medium"
          >
            Continuar — passo {step + 1}
          </button>
        )}

        <button
          type="submit"
          disabled={pending}
          className="ml-auto inline-flex items-center gap-3 bg-action px-7 py-4 text-[0.9375rem] font-medium text-on-action transition-[filter] duration-200 hover:brightness-110 disabled:opacity-50"
        >
          {pending ? "Enviando…" : "Apresente seu desafio"}
        </button>
      </div>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-fg-muted">
        Você pode enviar já no primeiro passo. Os passos seguintes existem para que a primeira
        conversa comece com contexto, não com apresentação.
      </p>
    </form>
  );
}

/* ── Campos ──────────────────────────────────────────────────────────── */

const fieldBase =
  "w-full border-0 border-b border-line bg-transparent pb-3 pt-2 text-[1.0625rem] text-fg outline-none transition-colors placeholder:text-fg-muted/60 focus:border-accent";

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="bv-eyebrow block text-fg-muted">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${fieldBase} mt-2`}
      />
    </div>
  );
}

function Textarea({ name, label, hint }: { name: string; label: string; hint?: string }) {
  return (
    <div>
      <label htmlFor={name} className="bv-eyebrow block text-fg-muted">
        {label}
      </label>
      {hint && <p className="mt-2 text-[0.8125rem] leading-snug text-fg-muted">{hint}</p>}
      <textarea id={name} name={name} rows={3} className={`${fieldBase} mt-2 resize-y`} />
    </div>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="bv-eyebrow block text-fg-muted">
        {label}
      </label>
      <select id={name} name={name} defaultValue="" className={`${fieldBase} mt-2`}>
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-ink text-paper">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Estados finais ──────────────────────────────────────────────────── */

function Confirmation() {
  return (
    <div role="status" className="border-t border-line pt-10">
      <span aria-hidden className="bv-rule-signal block w-24" />
      <h2 className="bv-display mt-8 max-w-[18ch] text-display-3">Recebemos. Obrigada.</h2>
      <p className="bv-measure mt-6 text-lead leading-relaxed text-fg-muted">
        Vamos estudar o contexto antes de responder — normalmente retornamos em até um dia útil,
        já com uma leitura inicial em vez de uma apresentação padrão.
      </p>
    </div>
  );
}

/* Endpoint ainda não configurado: em vez de fingir que enviou, o
   formulário assume a limitação e entrega os canais diretos. */
function Unconfigured() {
  const whatsapp = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div role="alert" className="mt-10 border-t border-line pt-8">
      <span aria-hidden className="bv-rule-signal block w-16" />
      <h2 className="bv-display mt-6 text-title">O envio automático ainda não está ligado.</h2>
      <p className="bv-measure mt-4 leading-relaxed text-fg-muted">
        Este site foi entregue sem o endpoint de formulário configurado — defina{" "}
        <code className="text-fg">FORM_ENDPOINT</code> no ambiente para ativá-lo. Enquanto isso,
        fale direto com a gente:
      </p>
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          onClick={() => track("contact_click", { location: "form_fallback" })}
          className="bv-link text-[0.9375rem] font-medium"
        >
          {site.email}
        </a>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "form_fallback" })}
            className="bv-link text-[0.9375rem] font-medium"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
