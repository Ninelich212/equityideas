import {
  coverage as baseCoverage,
  research as baseResearch,
  type CoverageItem,
} from "./data";

const finam = "https://www.finam.ru/publications/item";

const coverageUpdates: Record<string, Partial<CoverageItem>> = {
  "CNRU.MM": {
    rating: "Покупать",
    status: "active",
    updated: "18.08.2026",
    commentDate: "18.08.2026",
    summary:
      "Циан сохраняет сильный инвестиционный профиль: рост операционных показателей сочетается с чистой денежной позицией, которая поддерживает финансовый результат в условиях высоких ставок.",
    note: {
      date: "18.08.2026",
      title: "Циан может стать одной из лучших TMT-историй на текущем рынке",
      url: `${finam}/tsian-mozhet-stat-odnoy-iz-luchshikh-tmt-istoriy-na-tekushchem-rynke-20260818-1843/`,
    },
  },
  "MSFT.O": {
    updated: "31.07.2026",
    commentDate: "31.07.2026",
    summary:
      "Microsoft подтверждает эффективность масштабных инвестиций в ИИ и облачную инфраструктуру: Azure ускоряется, а рост бизнеса все лучше оправдывает высокий CAPEX.",
    note: {
      date: "31.07.2026",
      title: "Microsoft полностью оправдала капвложения",
      url: `${finam}/microsoft-polnostyu-opravdala-kapvlozheniya-20260731-2110/`,
    },
  },
  "YDEX.MM": {
    updated: "31.07.2026",
    commentDate: "31.07.2026",
    summary:
      "Яндекс вновь превысил ожидания рынка по ключевым финансовым показателям: прибыль и EBITDA растут быстрее выручки, а прежняя целевая цена находится на пересмотре.",
    note: {
      date: "31.07.2026",
      title: "Яндекс побил ожидания рынка: целевая цена на пересмотре",
      url: `${finam}/yandeks-pobil-ozhidaniya-rynka-tselevaya-tsena-na-peresmotre-20260731-1649/`,
    },
  },
  "GOOGL.O": {
    updated: "23.07.2026",
    commentDate: "23.07.2026",
    summary:
      "Alphabet сохраняет сильные темпы роста поиска и облачного бизнеса, но масштабная инвестиционная программа повышает требования к будущей отдаче от ИИ-инфраструктуры.",
    note: {
      date: "23.07.2026",
      title: "Alphabet в погоне за окупаемостью капекса",
      url: `${finam}/alphabet-v-pogone-za-okupaemostyu-kapeksa-20260723-1226/`,
    },
  },
};

function dateValue(value: string) {
  const [day, month, year] = value.split(".").map(Number);
  return Date.UTC(year, month - 1, day);
}

export const coverage: CoverageItem[] = baseCoverage
  .map((item) => ({
    ...item,
    ...coverageUpdates[item.ticker],
  }))
  .sort((a, b) => dateValue(b.updated) - dateValue(a.updated));

const latestResearch = [
  {
    date: "18.08.2026",
    label: "Компания",
    title: "Циан — одна из лучших TMT-историй текущего рынка",
    summary:
      "Ожидания сильного квартала, чистая денежная позиция и преимущества бизнес-модели в условиях высокой ставки.",
    url: `${finam}/tsian-mozhet-stat-odnoy-iz-luchshikh-tmt-istoriy-na-tekushchem-rynke-20260818-1843/`,
  },
  {
    date: "31.07.2026",
    label: "Компания",
    title: "Microsoft — капвложения начали оправдываться",
    summary:
      "Сильные результаты Azure и ИИ-направлений показывают, что масштабный инвестиционный цикл начинает давать заметную отдачу.",
    url: `${finam}/microsoft-polnostyu-opravdala-kapvlozheniya-20260731-2110/`,
  },
  {
    date: "31.07.2026",
    label: "Компания",
    title: "Яндекс — снова выше ожиданий рынка",
    summary:
      "Прибыль и EBITDA растут быстрее выручки, а сильный отчет стал основанием для пересмотра целевой цены.",
    url: `${finam}/yandeks-pobil-ozhidaniya-rynka-tselevaya-tsena-na-peresmotre-20260731-1649/`,
  },
  {
    date: "23.07.2026",
    label: "Компания",
    title: "Alphabet — в погоне за окупаемостью CAPEX",
    summary:
      "Поиск и Google Cloud продолжают расти, однако рынок все внимательнее оценивает отдачу от рекордных инвестиций в ИИ.",
    url: `${finam}/alphabet-v-pogone-za-okupaemostyu-kapeksa-20260723-1226/`,
  },
  {
    date: "14.07.2026",
    label: "Компания",
    title: "NetEase — китайский геймдев все лучше и лучше",
    summary:
      "Сильный игровой портфель, высокая денежная генерация и устойчивые позиции компании поддерживают позитивный взгляд на акции.",
    url: `${finam}/netease--kitayskiy-geymdev-vse-luchshe-i-luchshe-20260714-1148/`,
  },
];

const latestUrls = new Set(latestResearch.map((item) => item.url));

export const research = [
  ...latestResearch,
  ...baseResearch.filter((item) => !latestUrls.has(item.url)),
].sort((a, b) => dateValue(b.date) - dateValue(a.date));
