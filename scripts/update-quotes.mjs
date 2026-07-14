import { readFile, writeFile } from "node:fs/promises";

const quotesPath = new URL("../app/quotes.generated.json", import.meta.url);
const quotes = JSON.parse(await readFile(quotesPath, "utf8"));

const yahooSymbols = {
  "BTC-USD": "BTC-USD",
  "ETH-USD": "ETH-USD",
  "ORCL.K": "ORCL",
  XLK: "XLK",
  "PINS.K": "PINS",
  "CIBR.O": "CIBR",
  "GOOGL.O": "GOOGL",
  "MSFT.O": "MSFT",
  "KOMP.K": "KOMP",
  CRM: "CRM",
  "BITQ.K": "BITQ",
  "NTES.O": "NTES",
  "WCLD.O": "WCLD",
  "002517.SZ": "002517.SZ",
  "600570.SS": "600570.SS",
  "3033.HK": "3033.HK",
  "9999.HK": "9999.HK",
  "6758.T": "6758.T",
  "7203.T": "7203.T",
  "7211.T": "7211.T",
  "7974.T": "7974.T",
  DIS: "DIS"
};

const moexSymbols = {
  "CNRU.MM": "CNRU",
  "HEAD.MM": "HEAD",
  "AFKS.MM": "AFKS",
  "RTKM_p.MM": "RTKMP",
  "YDEX.MM": "YDEX",
  "RTKM.MM": "RTKM",
  "MTSS.MM": "MTSS",
  FIAI: "DATA",
  DELI: "DELI"
};

async function getJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "equityideas.ru quote updater" },
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function yahooQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`;
  const json = await getJson(url);
  const result = json.chart?.result?.[0];
  const price = result?.meta?.regularMarketPrice;
  const timestamp = result?.meta?.regularMarketTime;
  if (!Number.isFinite(price)) throw new Error("price is missing");
  return {
    price,
    date: Number.isFinite(timestamp)
      ? new Date(timestamp * 1000).toISOString()
      : new Date().toISOString()
  };
}

async function moexQuote(secid) {
  const columns = "BOARDID,LAST,LCLOSE,MARKETPRICE,UPDATETIME,SYSTIME";
  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${secid}.json?iss.meta=off&iss.only=marketdata&marketdata.columns=${columns}`;
  const json = await getJson(url);
  const marketdata = json.marketdata;
  const rows = marketdata?.data ?? [];
  const names = marketdata?.columns ?? [];
  const values = rows.map((row) => Object.fromEntries(names.map((name, index) => [name, row[index]])));
  const preferred = values.find((row) => ["TQBR", "TQTF"].includes(row.BOARDID) && Number.isFinite(row.LAST))
    ?? values.find((row) => Number.isFinite(row.LAST))
    ?? values.find((row) => Number.isFinite(row.MARKETPRICE))
    ?? values.find((row) => Number.isFinite(row.LCLOSE));
  if (!preferred) throw new Error("price is missing");
  const price = preferred.LAST ?? preferred.MARKETPRICE ?? preferred.LCLOSE;
  const rawDate = preferred.SYSTIME || new Date().toISOString();
  return { price, date: new Date(rawDate).toISOString() };
}

let updated = 0;
let failed = 0;

for (const [siteTicker, sourceTicker] of Object.entries(yahooSymbols)) {
  try {
    quotes[siteTicker] = await yahooQuote(sourceTicker);
    updated += 1;
    console.log(`updated ${siteTicker}: ${quotes[siteTicker].price}`);
  } catch (error) {
    failed += 1;
    console.warn(`kept previous ${siteTicker}: ${error.message}`);
  }
}

for (const [siteTicker, sourceTicker] of Object.entries(moexSymbols)) {
  try {
    quotes[siteTicker] = await moexQuote(sourceTicker);
    updated += 1;
    console.log(`updated ${siteTicker}: ${quotes[siteTicker].price}`);
  } catch (error) {
    failed += 1;
    console.warn(`kept previous ${siteTicker}: ${error.message}`);
  }
}

const sortedQuotes = Object.fromEntries(Object.entries(quotes).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(quotesPath, `${JSON.stringify(sortedQuotes, null, 2)}\n`);

console.log(`done: ${updated} updated, ${failed} kept previous`);
if (updated === 0) process.exitCode = 1;
