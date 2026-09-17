"use server";

/* ════════════════════════════════════════════════════════════════════════
   ENVIO DO FORMULÁRIO
   Server action: os dados não passam pelo bundle do cliente e o endpoint
   real nunca é exposto ao navegador.

   Sem FORM_ENDPOINT configurado, a action NÃO finge sucesso — retorna um
   estado explícito de "não configurado" e a interface oferece os canais
   diretos (e-mail/WhatsApp). Um lead perdido em silêncio é pior do que
   um formulário que admite que ainda não está ligado.
   ════════════════════════════════════════════════════════════════════════ */

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "unconfigured"; payload: string }
  | { status: "error"; message: string };

const FIELDS = [
  "nome",
  "empresa",
  "email",
  "telefone",
  "cargo",
  "cidade",
  "segmento",
  "site",
  "objetivo",
  "interesse",
  "investimento",
  "prazo",
  "contexto",
] as const;

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: campo invisível que só um robô preenche.
  if (formData.get("website")) return { status: "success" };

  const data: Record<string, string> = {};
  for (const field of FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string" && value.trim()) data[field] = value.trim();
  }

  if (!data.nome || !data.email) {
    return { status: "error", message: "Informe pelo menos nome e e-mail." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return { status: "error", message: "O e-mail informado não parece válido." };
  }

  const endpoint = process.env.FORM_ENDPOINT;
  if (!endpoint) {
    return {
      status: "unconfigured",
      payload: `${data.nome} · ${data.empresa?? " "} · ${data.email}`,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, origem: "site", recebidoEm: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message:
        "Não conseguimos enviar agora. Tente novamente ou fale direto pelos canais abaixo.",
    };
  }
}
