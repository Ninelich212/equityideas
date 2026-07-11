export async function GET() {
  const eodhdApiKey = process.env.EODHD_API_KEY;

  if (!eodhdApiKey) {
    return Response.json({ quotes: {}, updatedAt: null, error: "Источник котировок не настроен" }, { status: 503 });
  }

  // Токийская биржа пока не поддерживается подключенными источниками.
  // Эти цены обновляются вручную по последнему закрытию TSE.
  const quotes: Record<string, { price: number; date: string | null }> = {
    "7203.T": { price: 2823, date: "2026-07-10T15:30:00+09:00" },
    "7974.T": { price: 7030, date: "2026-07-10T15:30:00+09:00" },
    "6758.T": { price: 3359, date: "2026-07-10T15:30:00+09:00" },
    "7211.T": { price: 362, date: "2026-07-10T15:30:00+09:00" },

    // Резервные цены закрытия США на случай временной недоступности API.
    // Любая успешно загруженная автоматическая котировка ниже перезапишет их.
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

    // Резервные цены закрытия Китая и Гонконга на 10 июля 2026 года.
    // EODHD автоматически перезапишет их при следующем успешном обновлении.
    "002517.SZ": { price: 16.92, date: "2026-07-10T00:00:00+08:00" },
    "600570.SS": { price: 21.32, date: "2026-07-10T00:00:00+08:00" },
    "3033.HK": { price: 4.634, date: "2026-07-10T00:00:00+08:00" },
    "9999.HK": { price: 206.8, date: "2026-07-10T00:00:00+08:00" },
  };

  await Promise.all([
    (async () => {
      try {
        const response = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { data?: { amount?: string } };
        const price = Number(payload.data?.amount);
        if (Number.isFinite(price) && price > 0) {
          quotes["ETH-USD"] = { price, date: new Date().toISOString() };
        }
      } catch {
        // Котировка появится при следующем успешном обновлении источника.
      }
    })(),
    (async () => {
      try {
        const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { data?: { amount?: string } };
        const price = Number(payload.data?.amount);
        if (Number.isFinite(price) && price > 0) {
          quotes["BTC-USD"] = { price, date: new Date().toISOString() };
        }
      } catch {
        // Котировка появится при следующем успешном обновлении источника.
      }
    })(),
    ...Object.entries({
      "YDEX.MM": "YDEX",
      "AFKS.MM": "AFKS",
      "RTKM.MM": "RTKM",
      "RTKM_p.MM": "RTKMP",
      "HEAD.MM": "HEAD",
      "CNRU.MM": "CNRU",
      "MTSS.MM": "MTSS",
    }).map(async ([siteTicker, moexTicker]) => {
      const url = new URL(`https://iss.moex.com/iss/engines/stock/markets/shares/securities/${moexTicker}.json`);
      url.searchParams.set("iss.meta", "off");
      url.searchParams.set("iss.only", "marketdata");
      url.searchParams.set("marketdata.columns", "SECID,LAST,SYSTIME");

      try {
        const response = await fetch(url, { headers: { Accept: "application/json" } });
        if (!response.ok) return;
        const payload = (await response.json()) as { marketdata?: { columns?: string[]; data?: unknown[][] } };
        const columns = payload.marketdata?.columns ?? [];
        const priceIndex = columns.indexOf("LAST");
        const dateIndex = columns.indexOf("SYSTIME");
        const row = (payload.marketdata?.data ?? []).find((entry) => typeof entry[priceIndex] === "number");
        const price = row?.[priceIndex];
        if (typeof price === "number" && Number.isFinite(price) && price > 0) {
          const rawDate = typeof row?.[dateIndex] === "string" ? String(row[dateIndex]) : null;
          quotes[siteTicker] = { price, date: rawDate ? `${rawDate.replace(" ", "T")}+03:00` : null };
        }
      } catch {
        // Не подменяем недоступную официальную котировку старым значением.
      }
    }),
    ...Object.entries({
      "3033.HK": "3033.HK",
      "9999.HK": "9999.HK",
      "002517.SZ": "002517.SHE",
      "600570.SS": "600570.SHG",
      "ORCL.K": "ORCL.US",
      XLK: "XLK.US",
      "PINS.K": "PINS.US",
      "CIBR.O": "CIBR.US",
      "GOOGL.O": "GOOGL.US",
      "MSFT.O": "MSFT.US",
      "KOMP.K": "KOMP.US",
      CRM: "CRM.US",
      "BITQ.K": "BITQ.US",
      "NTES.O": "NTES.US",
      "WCLD.O": "WCLD.US",
    }).map(async ([siteTicker, eodhdTicker]) => {
      const from = new Date();
      from.setUTCDate(from.getUTCDate() - 10);
      const url = new URL(`https://eodhd.com/api/eod/${eodhdTicker}`);
      url.searchParams.set("api_token", eodhdApiKey);
      url.searchParams.set("fmt", "json");
      url.searchParams.set("from", from.toISOString().slice(0, 10));
      url.searchParams.set("order", "d");

      try {
        const response = await fetch(url, { headers: { Accept: "application/json" } });
        if (response.ok) {
          const rows = (await response.json()) as Array<{ date?: string; close?: number; adjusted_close?: number }>;
          const row = rows[0];
          const price = row?.adjusted_close ?? row?.close;
          if (typeof price === "number" && Number.isFinite(price) && price > 0) {
            quotes[siteTicker] = { price, date: row.date ? `${row.date}T00:00:00Z` : null };
          }
        }
      } catch {
        // Ниже попробуем резервный источник для американских инструментов.
      }

      // EODHD на бесплатном тарифе может исчерпать дневной лимит. Для бумаг и
      // ETF США используем публичную ленту Nasdaq как независимый резерв.
      if (
        (!quotes[siteTicker] || quotes[siteTicker]?.date === "2026-07-09T00:00:00Z") &&
        eodhdTicker.endsWith(".US")
      ) {
        const symbol = eodhdTicker.replace(/\.US$/, "");
        const etfs = new Set(["XLK", "CIBR", "KOMP", "BITQ", "WCLD"]);
        const assetClass = etfs.has(symbol) ? "etf" : "stocks";
        const fallbackUrl = `https://api.nasdaq.com/api/quote/${encodeURIComponent(symbol)}/info?assetclass=${assetClass}`;
        try {
          const response = await fetch(fallbackUrl, {
            headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0" },
          });
          if (!response.ok) return;
          const payload = (await response.json()) as {
            data?: { primaryData?: { lastSalePrice?: string; lastTradeTimestamp?: string } };
          };
          const rawPrice = payload.data?.primaryData?.lastSalePrice ?? "";
          const price = Number(rawPrice.replace(/[^0-9.-]/g, ""));
          const timestamp = payload.data?.primaryData?.lastTradeTimestamp;
          if (Number.isFinite(price) && price > 0) {
            quotes[siteTicker] = {
              price,
              date: timestamp ? new Date(timestamp).toISOString() : null,
            };
          }
        } catch {
          // Следующее обновление снова попробует оба источника.
        }
      }
    }),
  ]);

  return Response.json(
    { quotes, updatedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    },
  );
}
