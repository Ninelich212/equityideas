import {
  coverage,
  research,
  type CoverageItem,
} from "./data";

const finam = "https://www.finam.ru/publications/item";

const coverageUpdates: Record<string, Partial<CoverageItem>> = {
  "CNRU.MM": {
    rating: "Покупать",
    target: "₽831,74",
    status: "active",
    updated: "19.08.2026",
    commentDate: "19.08.2026",
    summary:
      "Циан превзошел ожидания по итогам 2К 2026: выручка и скорректированная EBITDA растут двузначными темпами, а чистая денежная позиция поддерживает устойчивость бизнеса.",
    note: {
      date: "19.08.2026",
      title: "Циан — уникальная компания на фондовом рынке России",
      url: `${finam}/tsian--unikalnaya-kompaniya-na-fondovom-rynke-rossii-20260820-1031/`,
    },
  },
  "YDEX.MM": {
    rating: "Покупать",
    target: "₽5 981,57",
    status: "active",
    updated: "21.08.2026",
    commentDate: "21.08.2026",
    summary:
      "Яндекс продолжает превращаться в высокомаржинальную технологическую экосистему: прибыль растет быстрее выручки, а регулярные дивиденды усиливают инвестиционный кейс.",
    research: {
      date: "21.08.2026",
      title: "Яндекс — экосистемный гигант на все случаи жизни",
      url: `${finam}/yandeks-ekosistemnyy-gigant-na-vse-sluchai-zhizni-20260824-1346/`,
    },
    note: {
      date: "21.08.2026",
      title: "Яндекс — экосистемный гигант на все случаи жизни",
      url: `${finam}/yandeks-ekosistemnyy-gigant-na-vse-sluchai-zhizni-20260824-1346/`,
    },
  },
  "HEAD.MM": {
    rating: "Покупать",
    target: "₽4 285,92",
    status: "active",
    updated: "21.08.2026",
    commentDate: "21.08.2026",
    summary:
      "2026 год может стать локальным дном для рынка найма: HeadHunter сохраняет высокую маржинальность и чистую денежную позицию, а восстановление ожидается по мере смягчения ДКП.",
    note: {
      date: "21.08.2026",
      title: "HeadHunter — 2026 год может стать локальным дном",
      url: `${finam}/headhunter--2026-god-mozhet-stat-lokalnym-dnom-20260824-1400/`,
    },
  },
  "RTKM.MM": {
    rating: "Покупать",
    target: "₽75,28",
    status: "active",
    updated: "24.08.2026",
    commentDate: "24.08.2026",
    summary:
      "Ростелеком сохраняет двузначный рост бизнеса, а облака, ЦОД и кибербезопасность увеличивают вклад в результаты. Ключевым ограничением остается высокая долговая нагрузка.",
    note: {
      date: "24.08.2026",
      title: "Ростелеком — устойчивые результаты при исторически низкой оценке акций",
      url: `${finam}/rostelekom-ustoychivye-rezultaty-pri-istoricheski-nizkoy-otsenke-aktsiy-20260825-1607/`,
    },
  },
  "RTKM_p.MM": {
    rating: "Покупать",
    target: "₽75,28",
    status: "active",
    updated: "24.08.2026",
    commentDate: "24.08.2026",
    summary:
      "Привилегированные акции Ростелекома сохраняют высокий потенциал переоценки на фоне роста цифровых направлений и постепенного снижения процентной нагрузки.",
    note: {
      date: "24.08.2026",
      title: "Ростелеком — устойчивые результаты при исторически низкой оценке акций",
      url: `${finam}/rostelekom-ustoychivye-rezultaty-pri-istoricheski-nizkoy-otsenke-aktsiy-20260825-1607/`,
    },
  },
  "MTSS.MM": {
    rating: "Покупать",
    target: "₽243,15",
    status: "active",
    updated: "25.08.2026",
    commentDate: "25.08.2026",
    summary:
      "МТС ускоряет качественный рост: основной бизнес устойчив, чистая прибыль восстанавливается, а снижение ставок постепенно уменьшает давление процентных расходов.",
    note: {
      date: "25.08.2026",
      title: "МТС — компания ускоряет качественный рост",
      url: `${finam}/mts--kompaniya-uskoryaet-kachestvennyy-rost-20260826-1306/`,
    },
  },
  CRM: {
    rating: "Держать",
    target: "$275,41",
    status: "active",
    updated: "27.08.2026",
    commentDate: "27.08.2026",
    summary:
      "Salesforce показала сильный квартал и ускорение ИИ-продуктов, однако после роста акций соотношение потенциальной доходности и риска стало менее привлекательным.",
    note: {
      date: "27.08.2026",
      title: "Salesforce — акции наконец начали догонять широкий IT-рынок",
      url: `${finam}/salesforce-aktsii-nakonets-nachali-dogonyat-shirokiy-it-rynok-20260828-1330/`,
    },
  },
  "9999.HK": {
    rating: "Покупать",
    target: "HK$276,95",
    status: "active",
    updated: "28.08.2026",
    commentDate: "28.08.2026",
    summary:
      "Игровой бизнес NetEase продолжает расти, рентабельность улучшается, а крупная чистая денежная позиция поддерживает дивиденды и обратный выкуп.",
    note: {
      date: "28.08.2026",
      title: "NetEase — игровой бизнес продолжает расти",
      url: `${finam}/netease--igrovoy-biznes-prodolzhaet-rasti-20260828-1927/`,
    },
  },
  "NTES.O": {
    rating: "Покупать",
    target: "$176,64",
    status: "active",
    updated: "28.08.2026",
    commentDate: "28.08.2026",
    summary:
      "ADR NetEase сохраняют тот же фундаментальный кейс: сильный игровой портфель, рост маржинальности и существенная чистая денежная позиция.",
    note: {
      date: "28.08.2026",
      title: "NetEase — игровой бизнес продолжает расти",
      url: `${finam}/netease--igrovoy-biznes-prodolzhaet-rasti-20260828-1927/`,
    },
  },
  "AFKS.MM": {
    rating: "Покупать",
    target: "₽10,48",
    status: "active",
    updated: "31.08.2026",
    commentDate: "31.08.2026",
    summary:
      "После реализации геополитического риска вокруг Ozon целевая цена снижена, но глубокий дисконт к NAV и сокращение долга корпоративного центра сохраняют потенциал восстановления.",
    research: {
      date: "31.08.2026",
      title: "АФК Система — геополитический риск ударил по оценке активов",
      url: `${finam}/afk-sistema-geopoliticheskiy-risk-udaril-po-otsenke-aktivov-20260901-1657/`,
    },
    note: {
      date: "31.08.2026",
      title: "АФК Система — геополитический риск ударил по оценке активов",
      url: `${finam}/afk-sistema-geopoliticheskiy-risk-udaril-po-otsenke-aktivov-20260901-1657/`,
    },
  },
  "WCLD.O": {
    rating: "Держать",
    target: "$43,53",
    status: "active",
    updated: "02.09.2026",
    commentDate: "02.09.2026",
    summary:
      "После роста более чем на 38% идея практически реализована: долгосрочный взгляд на облачный сектор остается позитивным, но краткосрочный потенциал ограничен.",
    note: {
      date: "02.09.2026",
      title: "WCLD — идея реализована, интерес снижается",
      url: `${finam}/wcld--ideya-realizovana-interes-snizhaetsya-20260902-1820/`,
    },
  },
  "6758.T": {
    rating: "Покупать",
    target: "¥4 514,39",
    status: "active",
    updated: "03.09.2026",
    commentDate: "03.09.2026",
    summary:
      "Sony возвращается к восходящему тренду: PlayStation, датчики изображения и сильный баланс поддерживают кейс, а жесткая ДКП Банка Японии не создает существенного давления.",
    research: {
      date: "03.09.2026",
      title: "Sony — восстановление акций на фоне жесткой ДКП",
      url: `${finam}/sony--vosstanovlenie-aktsiy-na-fone-zhestkoy-dkp-20260904-1331/`,
    },
    note: {
      date: "03.09.2026",
      title: "Sony — восстановление акций на фоне жесткой ДКП",
      url: `${finam}/sony--vosstanovlenie-aktsiy-na-fone-zhestkoy-dkp-20260904-1331/`,
    },
  },
  "7974.T": {
    rating: "Покупать",
    target: "¥10 387,47",
    status: "active",
    updated: "23.09.2026",
    commentDate: "23.09.2026",
    summary:
      "Switch 2 формирует новый цикл роста Nintendo: продажи новой консоли и цифрового контента поддерживают прибыль, а сильный каталог собственных франшиз создает базу для дальнейшего расширения экосистемы.",
    research: {
      date: "23.09.2026",
      title: "Nintendo — новый цикл роста на базе Switch 2",
      url: `${finam}/nintendo--novyy-tsikl-rosta-na-baze-switch-2-20260923-1639/`,
    },
    note: {
      date: "23.09.2026",
      title: "Nintendo — новый цикл роста на базе Switch 2",
      url: `${finam}/nintendo--novyy-tsikl-rosta-na-baze-switch-2-20260923-1639/`,
    },
  },
  "MSFT.O": {
    rating: "Покупать",
    target: "$579,20",
    status: "active",
    updated: "15.09.2026",
    commentDate: "15.09.2026",
    summary:
      "Microsoft остается одним из главных бенефициаров ИИ-революции: Azure растет двузначными темпами, а компания монетизирует ИИ через инфраструктуру, Copilot и партнерства с ведущими разработчиками моделей.",
    research: {
      date: "16.09.2026",
      title: "Microsoft — главный бенефициар ИИ-революции",
      url: `${finam}/microsoft--glavnyy-benefitsiar-ii-revolyutsii-20260916-1242/`,
    },
    note: {
      date: "16.09.2026",
      title: "Microsoft — главный бенефициар ИИ-революции",
      url: `${finam}/microsoft--glavnyy-benefitsiar-ii-revolyutsii-20260916-1242/`,
    },
  },
  "7211.T": {
    rating: "Покупать",
    target: "¥484,00",
    status: "active",
    updated: "09.09.2026",
    commentDate: "09.09.2026",
    summary:
      "Mitsubishi Motors постепенно восстанавливает прибыльность и делает ставку на ASEAN, внедорожники и обновление модельного ряда при сохраняющемся давлении китайской конкуренции.",
    note: {
      date: "09.09.2026",
      title: "Mitsubishi Motors — концентрация на флагманах",
      url: `${finam}/mitsubishi-motors--kontsentratsiya-na-flagmanakh-20260909-1847/`,
    },
  },
  "ORCL.K": {
    rating: "Покупать",
    target: "$224,00",
    status: "active",
    updated: "11.09.2026",
    commentDate: "11.09.2026",
    summary:
      "Oracle ускоряет рост облачной инфраструктуры и наращивает рекордный портфель контрактов. Главным риском остается масштаб капитальных затрат и отрицательный свободный денежный поток.",
    note: {
      date: "11.09.2026",
      title: "Oracle — недооцененные бумаги на фоне хорошего отчета",
      url: `${finam}/orcl--nedootsenennye-bumagi-na-fone-khoroshego-otcheta-20260912-0930/`,
    },
  },
  "GOOGL.O": {
    updated: "23.07.2026",
    commentDate: "23.07.2026",
    summary:
      "Alphabet сохраняет сильные темпы роста поиска и облачного бизнеса, но масштабная инвестиционная программа повышает требования к будущей отдаче от ИИ-инфраструктуры.",
    note: {
      date: "23.07.2026",
      title: "Alphabet в погоне за окупаемостью CAPEX",
      url: `${finam}/alphabet-v-pogone-za-okupaemostyu-kapeksa-20260723-1226/`,
    },
  },
};

const paloAlto: CoverageItem = {
  ticker: "PANW.O",
  company: "Palo Alto Networks",
  market: "США",
  sector: "Кибербезопасность",
  rating: "Продавать",
  target: "$330,10",
  updated: "24.09.2026",
  commentDate: "24.09.2026",
  currencyCode: "USD",
  analyst: "Дмитрий Лозовой",
  isin: "US6974351057",
  assetClass: "Акции",
  companyCountry: "США",
  exchangeCountry: "США",
  status: "active",
  summary:
    "Сильный бизнес остается одним из лидеров рынка кибербезопасности, однако после резкого роста котировки заметно превысили нашу фундаментальную оценку. Целевая цена сохранена на уровне $330,10, рейтинг понижен до «Продавать».",
  research: {
    date: "08.09.2026",
    title: "Palo Alto — высокая оценка полностью справедлива",
    url: `${finam}/palo-alto--vysokaya-otsenka-polnostyu-spravedliva-20260909-1548/`,
  },
  note: {
    date: "08.09.2026",
    title: "Palo Alto — высокая оценка полностью справедлива",
    url: `${finam}/palo-alto--vysokaya-otsenka-polnostyu-spravedliva-20260909-1548/`,
  },
};

function dateValue(value: string) {
  const [day, month, year] = value.split(".").map(Number);
  return Date.UTC(year, month - 1, day);
}

for (const item of coverage) {
  const update = coverageUpdates[item.ticker];
  if (update) Object.assign(item, update);
}

const existingPaloAlto = coverage.find((item) => item.ticker === paloAlto.ticker);
if (existingPaloAlto) Object.assign(existingPaloAlto, paloAlto);
else coverage.push(paloAlto);

coverage.sort((a, b) => dateValue(b.updated) - dateValue(a.updated));

const latestResearch = [
  {
    date: "24.09.2026",
    label: "Ресерч",
    title: "Palo Alto Networks — сильный бизнес по высокой цене",
    summary:
      "Целевая цена сохранена на уровне $330,10, однако после сильного роста котировок рейтинг снижен с «Держать» до «Продавать».",
    url: "",
  },
  {
    date: "23.09.2026",
    label: "Ресерч",
    title: "Nintendo — новый цикл роста на базе Switch 2",
    summary:
      "Switch 2 формирует новый цикл роста компании; целевая цена обновлена до ¥10 387,47 при сохранении рейтинга «Покупать».",
    url: `${finam}/nintendo--novyy-tsikl-rosta-na-baze-switch-2-20260923-1639/`,
  },
  {
    date: "16.09.2026",
    label: "Ресерч",
    title: "Microsoft — главный бенефициар ИИ-революции",
    summary:
      "Новая оценка Microsoft с целевой ценой $579,20: Azure, Copilot и участие в ведущих ИИ-экосистемах формируют долгосрочный драйвер роста.",
    url: `${finam}/microsoft--glavnyy-benefitsiar-ii-revolyutsii-20260916-1242/`,
  },
  {
    date: "11.09.2026",
    label: "Компания",
    title: "Oracle — недооцененные бумаги на фоне хорошего отчета",
    summary:
      "OCI ускорилась, контрактная база достигла рекордного уровня, а авансы клиентов частично снижают риски финансирования инвестиционной программы.",
    url: `${finam}/orcl--nedootsenennye-bumagi-na-fone-khoroshego-otcheta-20260912-0930/`,
  },
  {
    date: "09.09.2026",
    label: "Компания",
    title: "Mitsubishi Motors — концентрация на флагманах",
    summary:
      "Ставка на восстановление маржинальности, ASEAN и обновление линейки внедорожников при высокой конкуренции со стороны китайских производителей.",
    url: `${finam}/mitsubishi-motors--kontsentratsiya-na-flagmanakh-20260909-1847/`,
  },
  {
    date: "08.09.2026",
    label: "Новая компания",
    title: "Palo Alto — высокая оценка полностью справедлива",
    summary:
      "Начало покрытия мирового лидера кибербезопасности: сильный рост и денежный поток компенсируются высокой оценкой и рисками интеграции крупных приобретений.",
    url: `${finam}/palo-alto--vysokaya-otsenka-polnostyu-spravedliva-20260909-1548/`,
  },
  {
    date: "08.09.2026",
    label: "Компания",
    title: "Microsoft — инвестидея реализовала свой потенциал",
    summary:
      "Сильная динамика Azure сохраняется, но после роста котировок старая целевая цена перестала давать достаточный потенциал и модель была отправлена на обновление.",
    url: `${finam}/invest-ideya-po-aktsiyam-microsoft-realizovala-svoy-potentsial-20260908-1812/`,
  },
  {
    date: "03.09.2026",
    label: "Компания",
    title: "Sony — восстановление акций на фоне жесткой ДКП",
    summary:
      "PlayStation, датчики изображения и сильный баланс поддерживают восстановление акций; целевая цена обновлена до ¥4 514,39.",
    url: `${finam}/sony--vosstanovlenie-aktsiy-na-fone-zhestkoy-dkp-20260904-1331/`,
  },
  {
    date: "02.09.2026",
    label: "ETF",
    title: "WCLD — идея реализована, интерес снижается",
    summary:
      "После сильного ралли фонд почти достиг целевой цены $43,53, поэтому рейтинг снижен до «Держать».",
    url: `${finam}/wcld--ideya-realizovana-interes-snizhaetsya-20260902-1820/`,
  },
  {
    date: "31.08.2026",
    label: "Компания",
    title: "АФК Система — геополитический риск ударил по оценке активов",
    summary:
      "Целевая цена снижена до 10,48 руб. после переоценки Ozon, однако глубокий дисконт к NAV сохраняет потенциал восстановления.",
    url: `${finam}/afk-sistema-geopoliticheskiy-risk-udaril-po-otsenke-aktivov-20260901-1657/`,
  },
  {
    date: "28.08.2026",
    label: "Компания",
    title: "NetEase — игровой бизнес продолжает расти",
    summary:
      "Сильная операционная динамика, рост маржинальности и чистая денежная позиция поддерживают позитивный взгляд на акции и ADR.",
    url: `${finam}/netease--igrovoy-biznes-prodolzhaet-rasti-20260828-1927/`,
  },
  {
    date: "27.08.2026",
    label: "Компания",
    title: "Salesforce — акции наконец начали догонять широкий IT-рынок",
    summary:
      "Выручка и контрактная база продолжают расти, Agentforce ускоряется, но после ралли рейтинг снижен до «Держать».",
    url: `${finam}/salesforce-aktsii-nakonets-nachali-dogonyat-shirokiy-it-rynok-20260828-1330/`,
  },
  {
    date: "25.08.2026",
    label: "Компания",
    title: "МТС — компания ускоряет качественный рост",
    summary:
      "Основной бизнес улучшается, снижение ставки постепенно сокращает процентную нагрузку, целевая цена сохранена на уровне 243,15 руб.",
    url: `${finam}/mts--kompaniya-uskoryaet-kachestvennyy-rost-20260826-1306/`,
  },
  {
    date: "24.08.2026",
    label: "Компания",
    title: "Ростелеком — устойчивые результаты при исторически низкой оценке",
    summary:
      "Двузначный рост выручки и цифровых сервисов сохраняется, а снижение процентной нагрузки поддерживает инвестиционный кейс.",
    url: `${finam}/rostelekom-ustoychivye-rezultaty-pri-istoricheski-nizkoy-otsenke-aktsiy-20260825-1607/`,
  },
  {
    date: "21.08.2026",
    label: "Ресерч",
    title: "Яндекс — экосистемный гигант на все случаи жизни",
    summary:
      "Новая DCF-оценка учитывает рост экосистемы, повышение маржинальности и Яндекс Банк; целевая цена повышена до 5 981,57 руб.",
    url: `${finam}/yandeks-ekosistemnyy-gigant-na-vse-sluchai-zhizni-20260824-1346/`,
  },
  {
    date: "21.08.2026",
    label: "Компания",
    title: "HeadHunter — 2026 год может стать локальным дном",
    summary:
      "Рынок найма остается слабым, но высокая маржинальность, чистая денежная позиция и дальнейшее смягчение ДКП создают базу для восстановления.",
    url: `${finam}/headhunter--2026-god-mozhet-stat-lokalnym-dnom-20260824-1400/`,
  },
  {
    date: "19.08.2026",
    label: "Компания",
    title: "Циан — уникальная компания на фондовом рынке России",
    summary:
      "Компания превзошла ожидания по выручке и EBITDA, сохранив сильный баланс и привлекательную чувствительность к будущему восстановлению рынка недвижимости.",
    url: `${finam}/tsian--unikalnaya-kompaniya-na-fondovom-rynke-rossii-20260820-1031/`,
  },
  {
    date: "18.08.2026",
    label: "Пререпорт",
    title: "Циан может стать одной из лучших TMT-историй текущего рынка",
    summary:
      "Перед отчетностью ожидались сильный рост выручки, расширение маржи и сохранение преимуществ чистой денежной позиции.",
    url: `${finam}/tsian-mozhet-stat-odnoy-iz-luchshikh-tmt-istoriy-na-tekushchem-rynke-20260818-1843/`,
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

const latestUrls = new Set(latestResearch.map((item) => item.url).filter(Boolean));
const mergedResearch = [
  ...latestResearch,
  ...research.filter((item) => !latestUrls.has(item.url)),
].sort((a, b) => dateValue(b.date) - dateValue(a.date));

research.splice(0, research.length, ...mergedResearch);
