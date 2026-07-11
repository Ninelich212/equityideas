"use client";

import { useEffect, useState } from "react";
import type { CoverageItem } from "./data";

export type Quote = { price: number; date: string | null };
export type QuoteMap = Record<string, Quote>;

export function useQuotes() {
  const [quotes, setQuotes] = useState<QuoteMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/quotes?v=4")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: { quotes?: QuoteMap }) => {
        if (active) setQuotes(payload.quotes ?? {});
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { quotes, loading };
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
