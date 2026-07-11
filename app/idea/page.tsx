"use client";

import { useSearchParams } from "next/navigation";
import { coverage } from "../data";
import { displayTicker, formatQuote, formatQuoteDate, formatUpside, upsideClass, upsideFromQuote, useQuotes } from "../quote-utils";

export default function IdeaPage() {
  const params = useSearchParams();
  const ticker = params.get("ticker") ?? "";
  const item = coverage.find((entry) => entry.ticker === ticker);
  const { quotes, loading: quotesLoading } = useQuotes();

  if (!item) {
    return (
      <main className="detail-page">
        <a className="detail-back" href="/#ideas">← Вернуться к покрытию</a>
        <h1 className="detail-error">Рекомендация не найдена</h1>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <header className="detail-topbar">
        <a className="brand" href="/" aria-label="На главную">
          <span className="brand-mark">DL</span>
          <span className="brand-copy">
            <b>Дмитрий Лозовой</b>
            <small>Аналитик TMT · инвестиционные идеи</small>
          </span>
        </a>
        <div className="header-actions">
          <p className="header-email">Почта для связи: <span>lozovoi.dmitriy@mail.ru</span></p>
          <a className="detail-back" href="/#ideas">← Все рекомендации</a>
        </div>
      </header>

      <section className="detail-hero">
        <div className="detail-copy">
          <div className="detail-latest-summary">
            <span>КРАТКИЙ ВЫВОД · {item.note.date >= item.research.date ? "ПОСЛЕДНЯЯ ЗАПИСКА" : "ПОСЛЕДНИЙ РЕСЕРЧ"}</span>
            <p>{item.summary}</p>
          </div>
          <p className="eyebrow">{item.market} · {item.sector}</p>
          <h1 className="detail-title">{item.company}</h1>
        </div>
        <aside className="detail-quote">
          <span>{displayTicker(item.ticker)}</span>
          <strong>{item.rating}</strong>
          <p>Целевая цена</p>
          <b>{item.target}</b>
          <div className="detail-returns">
            <span><small>Текущая цена</small>{quotesLoading ? "…" : formatQuote(item, quotes[item.ticker])}</span>
            <span className={upsideClass(upsideFromQuote(item, quotes[item.ticker]))}><small>Апсайд</small>{formatUpside(upsideFromQuote(item, quotes[item.ticker]))}</span>
          </div>
          <small>Котировка на {formatQuoteDate(quotes[item.ticker]?.date ?? null)}</small>
          <small>Обновлено {item.updated}</small>
        </aside>
      </section>

      {item.isin && (
        <section className="detail-facts" aria-label="Параметры рекомендации">
          <div><span>Дата обновления</span><b>{item.updated}</b></div>
          <div><span>Дата комментария</span><b>{item.commentDate ?? item.updated}</b></div>
          <div><span>Валюта</span><b>{item.currencyCode}</b></div>
          <div><span>ISIN</span><b>{item.isin}</b></div>
          <div><span>Класс активов</span><b>{item.assetClass}</b></div>
          <div><span>Страна компании</span><b>{item.companyCountry}</b></div>
          <div><span>Страна биржи</span><b>{item.exchangeCountry}</b></div>
          <div><span>Аналитик</span><b>{item.analyst}</b></div>
        </section>
      )}

      <section className="materials-section">
        <div className="materials-heading">
          <p className="eyebrow">МАТЕРИАЛЫ ПО ИДЕЕ</p>
          <h2>Что открыть?</h2>
        </div>
        <div className="material-grid">
          {item.ticker === "ETH-USD" ? (
            <article className="material-card primary-material">
              <div className="material-meta"><span>ОСНОВА ОЦЕНКИ</span><time>{item.updated}</time></div>
              <h3>Мнение автора, основанное на техническом анализе и макроэкономическом прогнозе</h3>
              <p>Целевой уровень отражает авторский сценарий движения рынка и не является результатом фундаментальной оценки стоимости актива.</p>
            </article>
          ) : (
          <>
          <a className="material-card primary-material" href={item.research.url} target="_blank" rel="noreferrer">
            <div className="material-meta"><span>ПОЛНЫЙ РЕСЕРЧ</span><time>{item.research.date}</time></div>
            <h3>{item.research.title}</h3>
            <p>Развернутый инвестиционный кейс: бизнес, финансовые результаты, оценка, драйверы и риски.</p>
            <span className="material-link">Открыть на Финаме ↗</span>
          </a>
          <a className="material-card" href={item.note.url} target="_blank" rel="noreferrer">
            <div className="material-meta"><span>ПОСЛЕДНЯЯ ЗАПИСКА</span><time>{item.note.date}</time></div>
            <h3>{item.note.title}</h3>
            <p>Последнее опубликованное обновление взгляда, рекомендации или ключевого инвестиционного тезиса.</p>
            <span className="material-link">Открыть на Финаме ↗</span>
          </a>
          </>
          )}
        </div>
        {item.ticker !== "ETH-USD" && <p className="source-note">Материалы открываются на Finam.ru — официальном первоисточнике публикаций. Часть полного текста может быть доступна после авторизации на сайте.</p>}
      </section>
    </main>
  );
}
