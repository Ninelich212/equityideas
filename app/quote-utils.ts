"use client";

import type { CoverageItem } from "./data";
import generatedQuotes from "./quotes.generated.json";

export type Quote = { price: number; date: string | null };
export type QuoteMap = Record<string, Quote>;

// Файл обновляется ежедневно через GitHub Actions.
// Японские бумаги остаются ручными и сохраняются при каждом обновлении.
export const manualQuotes: QuoteMap = generatedQuotes satisfies QuoteMap;

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
