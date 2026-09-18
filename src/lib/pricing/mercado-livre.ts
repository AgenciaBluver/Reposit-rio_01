/* ════════════════════════════════════════════════════════════════════════
   PRECIFICAÇÃO — MERCADO LIVRE × IMPRESSÃO 3D
   ────────────────────────────────────────────────────────────────────────
   Núcleo de cálculo puro: nenhuma função aqui conhece React, DOM ou
   formatação. A interface só lê o que este arquivo devolve.

   A conta tem dois lados que não se misturam:
   · CUSTO DO PRODUTO — não depende do preço de venda: material, eletricidade,
     máquina, peças perdidas, insumos e embalagem.
   · CUSTOS DA VENDA — dependem do preço: comissão, custo fixo por faixa,
     frete, imposto, publicidade.
   Preço menos os dois = LUCRO POR PRODUTO.

   MÃO DE OBRA NÃO É CUSTO AQUI. Quem imprime, tira o suporte e embala é o
   dono da operação: esse trabalho não sai da conta e não entra em custo.

   ⚠ VALORES PADRÃO: comissões e custo fixo mudam por categoria e por
   política do Mercado Livre. Todos os números são editáveis na interface —
   os defaults são ponto de partida, não verdade contratual.
   ════════════════════════════════════════════════════════════════════════ */

/** Acima deste preço o Mercado Livre deixa de cobrar o custo fixo por
 *  unidade e o frete grátis passa a ser obrigação do vendedor na maioria
 *  das categorias. É o degrau que distorce qualquer precificação ingênua. */
export const FREE_SHIPPING_THRESHOLD = 79;

/** Faixas do custo fixo por unidade, para vendas abaixo do limiar. */
export const FIXED_FEE_BANDS = [29, 50] as const;
export const DEFAULT_FIXED_FEES: [number, number, number] = [6.25, 6.5, 6.75];

export type ListingType = "gratuito" | "classico" | "premium";

export const LISTING_TYPES: Record<
  ListingType,
  { label: string; commission: number; note: string }
> = {
  gratuito: {
    label: "Grátis",
    commission: 0,
    note: "Sem comissão e sem custo fixo, mas com exposição baixa e prazo limitado.",
  },
  classico: {
    label: "Clássico",
    commission: 12,
    note: "Exposição alta. Comissão típica de 10% a 14% conforme a categoria.",
  },
  premium: {
    label: "Premium",
    commission: 17,
    note: "Parcelamento sem juros. Comissão típica de 15% a 19% conforme a categoria.",
  },
};

/** Preços de referência de filamento por quilo. Servem para preencher o
 *  campo rapidamente — o valor real é sempre o da sua nota fiscal. */
export const FILAMENT_PRESETS = [
  { id: "pla", label: "PLA", pricePerKg: 100 },
  { id: "pla-silk", label: "PLA Silk", pricePerKg: 135 },
  { id: "petg", label: "PETG", pricePerKg: 125 },
  { id: "abs", label: "ABS", pricePerKg: 115 },
  { id: "tpu", label: "TPU (flexível)", pricePerKg: 190 },
  { id: "resina", label: "Resina (kg)", pricePerKg: 230 },
] as const;

export type ShippingRule = "auto" | "vendedor" | "comprador";

/** Uma peça adicional dentro do mesmo anúncio. Um kit de 3 unidades da
 *  MESMA peça é `kitQty: 3`; um kit de peças diferentes soma linhas aqui. */
export type KitPiece = {
  id: string;
  label: string;
  weightG: number;
  printHours: number;
  qty: number;
};

export type PricingInputs = {
  /* ── Peça ── */
  filamentPricePerKg: number;
  partWeightG: number;
  /** Purga, brim, suporte e sobra de bobina — material que sai do rolo e
   *  não vira produto. */
  wastePct: number;
  printHours: number;
  /** Quantas unidades DESTA peça vão no mesmo anúncio. */
  kitQty: number;
  /** Outras peças que compõem o mesmo anúncio. */
  kitPieces: KitPiece[];
  /** Percentual de impressões perdidas. Quem falha 10% das vezes imprime
   *  11 peças para vender 10 — o custo das 11 recai sobre as 10. */
  failureRatePct: number;

  /* ── Máquina e trabalho ── */
  printerWatts: number;
  energyPricePerKwh: number;
  /** Depreciação + manutenção + bicos/correias, diluídos por hora. */
  machineCostPerHour: number;
  extrasCost: number;
  packagingCost: number;

  /* ── Anúncio ── */
  price: number;
  listingType: ListingType;
  commissionPct: number;
  fixedFeeThreshold: number;
  fixedFees: [number, number, number];
  shippingRule: ShippingRule;
  shippingCost: number;
  /** Desconto do Mercado Envios conforme reputação/modalidade. */
  shippingDiscountPct: number;
  /** Custo logístico por unidade que não é frete: armazenagem Full,
   *  etiqueta, coleta. */
  logisticsCost: number;

  /* ── Impostos e extras ── */
  taxPct: number;
  adsPct: number;
  otherPct: number;
};

export const DEFAULT_INPUTS: PricingInputs = {
  filamentPricePerKg: 100,
  partWeightG: 85,
  wastePct: 5,
  printHours: 4.5,
  kitQty: 1,
  kitPieces: [],
  failureRatePct: 6,

  printerWatts: 120,
  energyPricePerKwh: 0.95,
  machineCostPerHour: 1.5,
  extrasCost: 0,
  packagingCost: 2.5,

  price: 119.9,
  listingType: "classico",
  commissionPct: LISTING_TYPES.classico.commission,
  fixedFeeThreshold: FREE_SHIPPING_THRESHOLD,
  fixedFees: DEFAULT_FIXED_FEES,
  shippingRule: "auto",
  shippingCost: 32,
  shippingDiscountPct: 50,
  logisticsCost: 0,

  taxPct: 6,
  adsPct: 0,
  otherPct: 0,
};

/* ── Custo de produção ──────────────────────────────────────────────── */

export type ProductionCost = {
  material: number;
  energy: number;
  machine: number;
  failure: number;
  extras: number;
  packaging: number;
  /** Custo do produto: soma de tudo que é preciso para a peça existir. */
  total: number;
  /** Peças impressas neste anúncio (soma das quantidades do kit). */
  units: number;
  /** Gramas e horas somadas de todas as peças do anúncio. */
  weightG: number;
  hours: number;
  /** Custo de uma unidade isolada — o que muda quando vira kit. */
  perUnit: number;
};

/** Todas as peças do anúncio: a principal mais as adicionais do kit. */
export function kitPieces(i: PricingInputs): { label: string; weightG: number; printHours: number; qty: number }[] {
  const main = {
    label: "Peça principal",
    weightG: safe(i.partWeightG),
    printHours: safe(i.printHours),
    qty: Math.max(1, Math.round(safe(i.kitQty)) || 1),
  };
  const extra = (i.kitPieces ?? []).map((p) => ({
    label: p.label || "Peça do kit",
    weightG: safe(p.weightG),
    printHours: safe(p.printHours),
    qty: Math.max(1, Math.round(safe(p.qty)) || 1),
  }));
  return [main, ...extra];
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
const safe = (n: number) => (Number.isFinite(n) ? n : 0);

export function productionCost(i: PricingInputs): ProductionCost {
  const pieces = kitPieces(i);
  const units = pieces.reduce((sum, p) => sum + p.qty, 0);
  const weightG = pieces.reduce((sum, p) => sum + p.weightG * p.qty, 0);
  const hours = pieces.reduce((sum, p) => sum + p.printHours * p.qty, 0);

  const material = (safe(i.filamentPricePerKg) / 1000) * weightG * (1 + safe(i.wastePct) / 100);
  const energy = (safe(i.printerWatts) / 1000) * hours * safe(i.energyPricePerKwh);
  const machine = safe(i.machineCostPerHour) * hours;

  // Quem perde 6% das impressões produz 106 para vender 100: o custo das
  // perdidas entra no preço das boas.
  const f = clamp(safe(i.failureRatePct) / 100, 0, 0.95);
  const failure = (material + energy + machine) * (f / (1 - f));

  // Insumos são POR PEÇA; embalagem é POR ANÚNCIO — é o que faz o kit sair
  // mais barato por unidade do que três vendas separadas.
  const extras = safe(i.extrasCost) * units;
  const packaging = safe(i.packagingCost);

  const total = material + energy + machine + failure + extras + packaging;

  return {
    material,
    energy,
    machine,
    failure,
    extras,
    packaging,
    total,
    units,
    weightG,
    hours,
    perUnit: units > 0 ? total / units : total,
  };
}

/* ── Custos que dependem do preço ───────────────────────────────────── */

/** Custo fixo por unidade da faixa em que o preço cai. */
export function fixedFeeFor(price: number, i: PricingInputs): number {
  if (price <= 0 || i.listingType === "gratuito") return 0;
  if (price >= safe(i.fixedFeeThreshold)) return 0;
  const [a, b, c] = i.fixedFees;
  if (price < FIXED_FEE_BANDS[0]) return safe(a);
  if (price < FIXED_FEE_BANDS[1]) return safe(b);
  return safe(c);
}

/** Frete que o vendedor paga. */
export function shippingFor(price: number, i: PricingInputs): number {
  const sellerPays =
    i.shippingRule === "vendedor" ||
    (i.shippingRule === "auto" && i.listingType !== "gratuito" && price >= safe(i.fixedFeeThreshold));
  if (!sellerPays) return 0;
  return safe(i.shippingCost) * (1 - clamp(safe(i.shippingDiscountPct), 0, 100) / 100);
}

/** Soma dos percentuais que incidem direto sobre o preço de venda. */
export function percentualLoad(i: PricingInputs): number {
  const commission = i.listingType === "gratuito" ? 0 : safe(i.commissionPct);
  return (commission + safe(i.taxPct) + safe(i.adsPct) + safe(i.otherPct)) / 100;
}

/* ── Resultado ──────────────────────────────────────────────────────── */

export type Deduction = {
  key: string;
  label: string;
  value: number;
  /** Grupo usado na leitura visual da composição do preço. */
  tone: "cost" | "fee" | "ship" | "tax" | "ads";
};

export type PricingResult = {
  price: number;
  production: ProductionCost;
  commission: number;
  fixedFee: number;
  shipping: number;
  logistics: number;
  tax: number;
  ads: number;
  other: number;
  /** Tudo que o Mercado Livre retém do preço. */
  marketplaceTotal: number;
  /** Preço menos o lucro: custo do produto somado aos custos da venda. */
  totalCost: number;
  /** O que o Mercado Livre repassa antes dos custos do vendedor. */
  netReceipt: number;
  /** LUCRO POR PRODUTO: preço menos o custo do produto e os custos da venda. */
  profit: number;
  /** Margem de lucro: o lucro sobre o preço de venda. */
  marginPct: number;
  /** Preço dividido pelo custo do produto. */
  markup: number;
  /** Retorno sobre o custo do produto. */
  roiPct: number;
  /** Quanto cada hora de impressora deixa de lucro nesta venda. */
  profitPerPrintHour: number;
  /** Peças no anúncio. 1 quando não é kit. */
  units: number;
  /** O anúncio dividido pelo número de peças — a leitura que compara um
   *  kit com a venda avulsa da mesma peça. */
  pricePerUnit: number;
  profitPerUnit: number;
  deductions: Deduction[];
};

export function calculate(i: PricingInputs): PricingResult {
  const price = Math.max(safe(i.price), 0);
  const production = productionCost(i);

  const commission = i.listingType === "gratuito" ? 0 : price * (safe(i.commissionPct) / 100);
  const fixedFee = fixedFeeFor(price, i);
  const shipping = shippingFor(price, i);
  const logistics = safe(i.logisticsCost);
  const tax = price * (safe(i.taxPct) / 100);
  const ads = price * (safe(i.adsPct) / 100);
  const other = price * (safe(i.otherPct) / 100);

  const marketplaceTotal = commission + fixedFee + shipping;
  const totalCost = production.total + marketplaceTotal + logistics + tax + ads + other;

  const profit = price - totalCost;

  return {
    price,
    production,
    commission,
    fixedFee,
    shipping,
    logistics,
    tax,
    ads,
    other,
    marketplaceTotal,
    totalCost,
    netReceipt: price - marketplaceTotal,
    profit,
    marginPct: price > 0 ? (profit / price) * 100 : 0,
    markup: production.total > 0 ? price / production.total : 0,
    roiPct: production.total > 0 ? (profit / production.total) * 100 : 0,
    profitPerPrintHour: production.hours > 0 ? profit / production.hours : 0,
    units: production.units,
    pricePerUnit: production.units > 0 ? price / production.units : price,
    profitPerUnit: production.units > 0 ? profit / production.units : profit,
    deductions: ([
      { key: "producao", label: "Custo do produto", value: production.total, tone: "cost" },
      { key: "comissao", label: "Comissão do anúncio", value: commission, tone: "fee" },
      { key: "fixo", label: "Custo fixo do anúncio", value: fixedFee, tone: "fee" },
      { key: "frete", label: "Custo de frete", value: shipping, tone: "ship" },
      { key: "logistica", label: "Custo de logística", value: logistics, tone: "ship" },
      { key: "imposto", label: "Imposto", value: tax, tone: "tax" },
      { key: "ads", label: "Publicidade", value: ads, tone: "ads" },
      { key: "outros", label: "Outros custos", value: other, tone: "tax" },
    ] as const satisfies readonly Deduction[]).filter((d) => d.value > 0.0001),
  };
}

/* ── Caminho inverso: do lucro desejado para o preço ─────────────────── */

/** Preço mínimo que entrega a margem alvo.
 *
 *  Não dá para isolar o preço numa fórmula só: custo fixo e frete são
 *  funções em degrau do próprio preço. Então resolvemos a equação dentro
 *  de cada faixa e ficamos com a menor solução coerente com a sua faixa.
 *  Quando nenhuma é coerente (o degrau "pula" a solução), o preço correto
 *  é a própria fronteira do degrau. */
export function solvePrice(
  i: PricingInputs,
  targetMarginPct: number,
): { price: number; atBoundary: boolean } | null {
  const k = 1 - percentualLoad(i) - targetMarginPct / 100;
  if (k <= 0.0001) return null; // taxas + margem desejada consomem 100% do preço

  const base = productionCost(i).total + safe(i.logisticsCost);
  const threshold = Math.max(safe(i.fixedFeeThreshold), 0.01);
  const bounds = Array.from(
    new Set([0, FIXED_FEE_BANDS[0], FIXED_FEE_BANDS[1], threshold]),
  )
    .filter((b) => b < threshold || b === threshold)
    .sort((a, b) => a - b);

  const candidates: number[] = [];
  for (let n = 0; n < bounds.length; n++) {
    const lo = bounds[n];
    const hi = n + 1 < bounds.length ? bounds[n + 1] : Number.POSITIVE_INFINITY;
    const probe = lo + 0.01; // o degrau é contínuo à direita
    const p = (base + fixedFeeFor(probe, i) + shippingFor(probe, i)) / k;
    if (p >= lo - 1e-9 && p < hi) candidates.push(p);
  }
  if (candidates.length) return { price: Math.min(...candidates), atBoundary: false };

  // Sem solução dentro das faixas: a menor fronteira que já entrega a
  // margem é o preço certo.
  for (const b of bounds.slice(1)) {
    if (calculate({ ...i, price: b }).marginPct >= targetMarginPct - 1e-9) {
      return { price: b, atBoundary: true };
    }
  }
  return null;
}

/** Preço mínimo: abaixo dele a venda dá prejuízo. */
export function breakEvenPrice(i: PricingInputs) {
  return solvePrice(i, 0);
}

/* ── Formatação ─────────────────────────────────────────────────────── */

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const brl = (n: number) => brlFormatter.format(Number.isFinite(n) ? n : 0);

export const pct = (n: number, digits = 1) =>
  `${(Number.isFinite(n) ? n : 0).toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;

/** Leitura honesta da margem de lucro. Os limites vêm da prática de
 *  marketplace: abaixo de 10% qualquer devolução ou reajuste de frete
 *  come o lucro. */
export function marginVerdict(marginPct: number) {
  if (marginPct < 0) return { label: "Prejuízo", tone: "loss" as const };
  if (marginPct < 10) return { label: "Apertado", tone: "warn" as const };
  if (marginPct < 20) return { label: "Aceitável", tone: "ok" as const };
  return { label: "Saudável", tone: "good" as const };
}
