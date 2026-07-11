"use client";

import type { CoverageItem } from "./data";

export type Quote = { price: number; date: string | null };
export type QuoteMap = Record<string, Quote>;

// Котировки для бесплатной статической версии на GitHub Pages.
// Чтобы обновить цену, измените price и date у нужного тикера.
export const manualQuotes: QuoteMap = {
  "BTC-USD": { price: 63851.815, date: "2026-07-11T23:56:52.948Z" },
  "ETH-USD": { price: 1789.265, date: "2026-07-11T23:56:52.985Z" },
  "CNRU.MM": { price: 509.2, date: "2026-07-11T19:00:13+03:00" },
  "HEAD.MM": { price: 2593, date: "2026-07-11T19:00:13+03:00" },
  "AFKS.MM": { price: 9.5, date: "2026-07-11T19:00:11+03:00" },
  "RTKM_p.MM": { price: 42.25, date: "2026-07-11T19:00:13+03:00" },
  "YDEX.MM": { price: 3520.5, date: "2026-07-11T19:00:13+03:00" },
  "RTKM.MM": { price: 38.81, date: "2026-07-11T19:00:11+03:00" },
  "MTSS.MM": { price: 179.5, date: "2026-07-11T19:00:11+03:00" },
  "7203.T": { price: 2823, date: "2026-07-10T15:30:00+09:00" },
  "7974.T": { price: 7030, date: "2026-07-10T15:30:00+09:00" },
  "6758.T": { price: 3359, date: "2026-07-10T15:30:00+09:00" },
  "7211.T": { price: 362, date: "2026-07-10T15:30:00+09:00" },
  "ORCL.K": { price: 140.64, date: "2026-07-09T00:00:00Z" },
  XLK: { price: 185.78, date: "2026-07-09T00:00:00Z" },
  "PINS.K": { price: 22.52, date: "2026-07-09T00:00:00Z" },
  "CIBR.O": { price: 91.88, date: "2026-07-09T00:00:00Z" },
  "GOOGL.O": { price: 357.18, date: "2026-07-09T00:00:00Z" },
  "MSFT.O": { price: 385.1, date: "2026-07-09T00:00:00Z" },
  "KOMP.K": { price: 68.4341, date: "2026-07-09T00:00:00Z" },
  CRM: { price: 163.32, date: "2026-07-09T00:00:00Z" },
  "BITQ.K": { price: 23.93, date: "2026-07-09T00:00:00Z" },
  "NTES.O": { price: 128.03, date: "2026-07-09T00:00:00Z" },
  "WCLD.O": { price: 33.86, date: "2026-07-09T00:00:00Z" },
  "002517.SZ": { price: 16.92, date: "2026-07-10T00:00:00+08:00" },
  "600570.SS": { price: 21.32, date: "2026-07-10T00:00:00+08:00" },
  "3033.HK": { price: 4.634, date: "2026-07-10T00:00:00+08:00" },
  "9999.HK": { price: 206.8, date: "2026-07-10T00:00:00+08:00" },
};

export function useQuotes() {
  return { quotes: manualQuotes, loading: false };
}

export function targetValue(target: string) {
  const normalized = target.replace(/[^0-9,.-]/g, "").replace(/\s/g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function upsideFromQuote(item: CoverageItem, quote?: Quote) {
  const target = targetValue(item.target);
  if (!quote || target === null || quote.price <= 0) return null;
  return (target / quote.price - 1) * 100;
}

export function formatUpside(value: number | null) {
  if (value === null) return "—";
  return `${value.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export function displayTicker(ticker: string) {
  return ticker.replace(/\.[A-Za-z]+$/, "");
}

export function upsideClass(value: number | null) {
  if (value === null) return "upside-neutral";
  return value >= 0 ? "upside-positive" : "upside-negative";
}

export function formatQuote(item: CoverageItem, quote?: Quote) {
  if (!quote) return "—";
  const formatted = quote.price.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const prefix: Record<string, string> = { RUB: "₽", USD: "$", JPY: "¥", HKD: "HK$", CNY: "CNY " };
  return `${prefix[item.currencyCode ?? ""] ?? ""}${formatted}`;
}

export function formatQuoteDate(date: string | null) {
  if (!date) return "последнее закрытие";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "последнее закрытие" : parsed.toLocaleDateString("ru-RU");
}
