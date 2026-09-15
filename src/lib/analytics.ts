/* ════════════════════════════════════════════════════════════════════════
   ANALYTICS — dataLayer organizado
   ────────────────────────────────────────────────────────────────────────
   Nenhum ID fictício é versionado. Se as variáveis de ambiente estiverem
   vazias, NADA é carregado — o site funciona integralmente sem scripts de
   terceiros, e o Lighthouse mede o site, não as tags.

   Eventos padronizados (contrato com o GTM):
     view_product · view_segment · case_view · cta_click
     whatsapp_click · form_start · form_submit · contact_click
   ════════════════════════════════════════════════════════════════════════ */

export type BluverEvent =
  | "view_product"
  | "view_segment"
  | "case_view"
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit"
  | "contact_click";

export type EventPayload = {
  /** Identificador do item (slug do produto, segmento ou case). */
  item_id?: string;
  /** Nome legível — facilita a leitura de relatórios no GA4. */
  item_name?: string;
  /** Onde o evento aconteceu: "hero", "footer", "nav", "sticky_cta"... */
  location?: string;
  /** Texto do elemento clicado. */
  label?: string;
  /** Destino do clique. */
  destination?: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const analyticsIds = {
  gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
} as const;

export const hasAnalytics = Boolean(analyticsIds.gtm);

/** Empurra um evento para o dataLayer. Seguro no servidor e seguro quando
 *  nenhuma tag está instalada — nesse caso vira no-op silencioso. */
export function track(event: BluverEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

/** Handler pronto para onClick — evita repetir a mesma closure. */
export function trackClick(event: BluverEvent, payload: EventPayload = {}) {
  return () => track(event, payload);
}
