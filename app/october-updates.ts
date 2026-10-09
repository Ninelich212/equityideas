import { coverage, publications, research } from "./data";

const finam = "https://www.finam.ru/publications/item";

function dateValue(value: string) {
  const [day, month, year] = value.split(".").map(Number);
  return Date.UTC(year, month - 1, day);
}

function updateCoverage(ticker: string, update: Record<string, unknown>) {
  const item = coverage.find((entry) => entry.ticker === ticker);
  if (item) Object.assign(item, update);
}

updateCoverage("600570.SS", {
  rating: "Покупать",
  target: "CNY 33,66",
  status: "active",
  updated: "30.09.2026",
  commentDate: "30.09.2026",
  summary:
    "Hundsun остается одним из главных бенефициаров обновления финансовой ИТ-инфраструктуры Китая: UF3.0, O45, Risk5 и ИИ-продукты поддерживают долгосрочный рост, а текущая оценка остается привлекательной.",
  research: {
    date: "30.09.2026",
    title: "Hundsun — перестройка бизнеса на фоне перепроданности акций",
    url: `${finam}/hundsun--perestroyka-biznesa-na-fone-pereprodannosti-aktsiy-20261001-1306/`,
  },
  note: {
    date: "30.09.2026",
    title: "Hundsun — перестройка бизнеса на фоне перепроданности акций",
    url: `${finam}/hundsun--perestroyka-biznesa-na-fone-pereprodannosti-aktsiy-20261001-1306/`,
  },
});

updateCoverage("CIBR.O", {
  rating: "Держать",
  target: "$116,80",
  status: "active",
  updated: "07.10.2026",
  commentDate: "07.10.2026",
  summary:
    "Кибербезопасность остается одной из наиболее сильных структурных тем в IT благодаря росту числа атак, развитию ИИ и миграции бизнеса в облако. После роста фонда потенциал ограничен, поэтому наиболее интересной точкой входа станет заметная коррекция.",
  research: {
    date: "07.10.2026",
    title: "CIBR — ИИ-бум подстегнул лихорадку кибербезопасности",
    url: `${finam}/cibr--ii-bum-podstegnul-likhoradku-kiberbezopasnosti-20261008-1549/`,
  },
  note: {
    date: "07.10.2026",
    title: "CIBR — ИИ-бум подстегнул лихорадку кибербезопасности",
    url: `${finam}/cibr--ii-bum-podstegnul-likhoradku-kiberbezopasnosti-20261008-1549/`,
  },
});

coverage.sort((a, b) => dateValue(b.updated) - dateValue(a.updated));

const octoberResearch = [
  {
    date: "07.10.2026",
    label: "ETF",
    title: "CIBR — ИИ-бум подстегнул лихорадку кибербезопасности",
    summary:
      "Целевая цена повышена до $116,80. Долгосрочные драйверы сектора остаются сильными, однако после роста фонда рейтинг сохранен на уровне «Держать», а более интересной точкой входа станет коррекция.",
    url: `${finam}/cibr--ii-bum-podstegnul-likhoradku-kiberbezopasnosti-20261008-1549/`,
  },
  {
    date: "30.09.2026",
    label: "Ресерч",
    title: "Hundsun — перестройка бизнеса на фоне перепроданности акций",
    summary:
      "Сохраняем рейтинг «Покупать» и целевую цену CNY 33,66: обновление ключевых платформ, рост риск-менеджмента и внедрение ИИ поддерживают инвестиционный кейс.",
    url: `${finam}/hundsun--perestroyka-biznesa-na-fone-pereprodannosti-aktsiy-20261001-1306/`,
  },
];

const octoberUrls = new Set(octoberResearch.map((item) => item.url));
const mergedResearch = [
  ...octoberResearch,
  ...research.filter((item) => !("url" in item && octoberUrls.has(item.url))),
].sort((a, b) => dateValue(b.date) - dateValue(a.date));

research.splice(0, research.length, ...mergedResearch);

if (!publications.some((item) => item.title === "CIBR — ИИ-бум подстегнул лихорадку кибербезопасности")) {
  publications.push({
    date: "07.10.2026",
    kind: "research",
    title: "CIBR — ИИ-бум подстегнул лихорадку кибербезопасности",
  });
}
