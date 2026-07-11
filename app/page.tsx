"use client";

import { useMemo, useState } from "react";
import { coverage, research, type Market } from "./data";
import { displayTicker, formatQuote, formatQuoteDate, formatUpside, upsideClass, upsideFromQuote, useQuotes } from "./quote-utils";

const markets: Array<"Все" | Market> = [
  "Все",
  "Россия",
  "США",
  "Япония",
  "Китай",
  "Гонконг",
  "Криптовалюты",
];

const coverageMarketOrder: Record<Market, number> = {
  Россия: 0,
  США: 1,
  Криптовалюты: 2,
  Япония: 3,
  Гонконг: 4,
  Китай: 5,
};

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [market, setMarket] = useState<(typeof markets)[number]>("Все");
  const [coverageMode, setCoverageMode] = useState<"current" | "all">("current");
  const { quotes, loading: quotesLoading } = useQuotes();

  const visibleCoverage = useMemo(
    () => coverage
      .filter((idea) =>
        (market === "Все" || idea.market === market) &&
        (coverageMode === "all" || idea.status === "active"),
      )
      .sort((a, b) => coverageMarketOrder[a.market] - coverageMarketOrder[b.market]),
    [market, coverageMode],
  );

  const activeRecommendations = coverage.filter(
    (item) => item.status === "active",
  ).length;
  const activeMarkets = new Set(
    coverage.filter((item) => item.status === "active").map((item) => item.market),
  ).size;
  const tapeItems = coverage
    .filter((item) => item.status === "active")
    .slice(0, 13);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-mark">DL</span>
          <span className="brand-copy">
            <b>Дмитрий Лозовой</b>
            <small>Аналитик TMT · инвестиционные идеи</small>
          </span>
        </a>
        <div className="header-actions">
          <p className="header-email">Почта для связи: <span>lozovoi.dmitriy@mail.ru</span></p>
          <nav aria-label="Основная навигация">
            <a href="#ideas">Идеи</a>
            <a href="#research">Ресерчи</a>
            <a className="nav-cta" href="#ideas">
              Смотреть покрытие ↘
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">АВТОРСКОЕ ПОКРЫТИЕ · РОССИЯ / США / АЗИЯ</p>
          <h1>
            Инвестиционные идеи
            <br />
            <span>в секторе TMT</span>
          </h1>
          <p className="hero-text">
            Личный хаб инвестиционных идей: целевые цены, потенциал роста,
            ключевые драйверы и риски — без лишнего информационного шума.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#ideas">
              Открыть идеи <span>↓</span>
            </a>
            <span className="as-of">Срез данных: июль 2026</span>
          </div>
        </div>

        <div className="hero-panel" aria-label="Об аналитике">
          <div className="panel-label">ОБ АНАЛИТИКЕ</div>
          <div className="analyst-bio">
            <h2>Дмитрий Лозовой</h2>
            <p>
              Ведущий инвестиционный аналитик Финама, специализирующийся на
              компаниях технологического, медийного и телекоммуникационного
              секторов России, США и Азии.
            </p>
            <p>
              Более шести лет занимается торговлей на финансовых рынках и
              управлением активами. До работы в Финаме получил опыт в Т-Банке
              и на Московской бирже, где занимался инвестиционной аналитикой и
              проектами, связанными с первичными размещениями акций.
            </p>
            <p>
              Автор исследований и комментариев для Forbes, РБК, Интерфакса,
              Коммерсанта и Российской газеты. География публикаций охватывает
              Россию, США, Китай, Японию, Канаду и Южную Корею.
            </p>
          </div>
          <div className="hero-metric split">
            <div>
              <strong>{activeRecommendations}</strong>
              <span>активные рекомендации</span>
            </div>
            <div>
              <strong>{activeMarkets}</strong>
              <span>рынков</span>
            </div>
          </div>
          <div className="panel-foot">
            <span className="live-dot" /> Покрытие обновлено
          </div>
        </div>
      </section>

      <div className="ticker-band">
        <div className="ticker-label">Апсайды по оценкам аналитика</div>
        <div className="ticker-strip" aria-label="Апсайды по текущим рекомендациям">
          <div>
            {tapeItems.concat(tapeItems).map((idea, index) => (
              <span key={`${idea.ticker}-${index}`}>
              {displayTicker(idea.ticker)} <b className={upsideClass(upsideFromQuote(idea, quotes[idea.ticker]))}>{formatUpside(upsideFromQuote(idea, quotes[idea.ticker]))}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="ideas-section" id="ideas">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / АКТИВНЫЕ ИДЕИ</p>
            <h2>Покрытие</h2>
          </div>
          <p>
            Полный архив авторских рекомендаций. Нажмите на инструмент, чтобы
            выбрать большой ресерч или последнюю аналитическую записку.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Фильтр по рынку">
          {markets.map((item) => (
            <button
              className={item === market ? "active" : ""}
              key={item}
              onClick={() => setMarket(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="coverage-mode" role="group" aria-label="Статус покрытия">
          <button className={coverageMode === "current" ? "active" : ""} onClick={() => setCoverageMode("current")} type="button">Текущее покрытие</button>
          <button className={coverageMode === "all" ? "active" : ""} onClick={() => setCoverageMode("all")} type="button">Весь архив</button>
          <a href="https://www.finam.ru/authors/4499/" target="_blank" rel="noreferrer">Профиль на Финаме ↗</a>
        </div>

        <div className="ideas-list">
          <div className="idea-header" aria-hidden="true">
            <span>Эмитент</span>
            <span>Рейтинг</span>
            <span>Текущая цена</span>
            <span>Целевая цена</span>
            <span>Апсайд</span>
          </div>
          {visibleCoverage.map((idea, index) => (
              <article className="idea-row" key={idea.ticker}>
                <a className="idea-main" href={`${basePath}/idea/?ticker=${encodeURIComponent(idea.ticker)}`}>
                  <span className="idea-name">
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <span>
                      <b>{idea.company}</b>
                      <small>
                        {displayTicker(idea.ticker)} · {idea.sector}
                      </small>
                    </span>
                  </span>
                  <span className="coverage-rating">
                    {idea.rating}
                  </span>
                  <span className="current-price">
                    <b>{quotesLoading ? "…" : formatQuote(idea, quotes[idea.ticker])}</b>
                    <small>{quotes[idea.ticker] ? `на ${formatQuoteDate(quotes[idea.ticker].date)}` : "котировка недоступна"}</small>
                  </span>
                  <span className="target-price">
                    <b>{idea.target}</b>
                    <small>оценка аналитика</small>
                  </span>
                  <span className={`potential-label ${upsideClass(upsideFromQuote(idea, quotes[idea.ticker]))}`}>
                    <b>{formatUpside(upsideFromQuote(idea, quotes[idea.ticker]))}</b>
                  </span>
                </a>
              </article>
          ))}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-heading inverse">
          <div>
            <p className="eyebrow">02 / АНАЛИТИЧЕСКИЕ МАТЕРИАЛЫ</p>
            <h2>Последние ресерчи</h2>
          </div>
          <p>
            Полные инвестиционные кейсы: от финансовой модели и драйверов до
            рисков и технической картины.
          </p>
        </div>

        <div className="research-grid">
          {research.map((item, index) => (
            <article className="research-card" key={item.title}>
              <div className="research-meta">
                <span>{item.label}</span>
                <time>{item.date}</time>
              </div>
              <span className="research-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a
                href={("url" in item && item.url) ? item.url : "#ideas"}
                target={("url" in item && item.url) ? "_blank" : undefined}
                rel={("url" in item && item.url) ? "noreferrer" : undefined}
                aria-label={`Открыть материал: ${item.title}`}
              >
                {("url" in item && item.url) ? "ОТКРЫТЬ ПУБЛИКАЦИЮ" : "СМОТРЕТЬ ТЕЗИС"} <span>↗</span>
              </a>
            </article>
          ))}
        </div>

        <footer>
          <div>
            <span>ДМИТРИЙ ЛОЗОВОЙ · TMT</span>
            <p>Инвестиционные идеи и аналитические материалы по технологическому сектору.</p>
          </div>
          <p className="disclaimer">
            Материалы носят информационный характер и не являются
            индивидуальной инвестиционной рекомендацией.
          </p>
          <a href="#top">Наверх ↑</a>
        </footer>
      </section>
    </main>
  );
}
