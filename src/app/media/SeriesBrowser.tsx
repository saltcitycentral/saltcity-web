"use client";

import { useMemo, useState } from "react";
import SeriesCard from "./SeriesCard";
import type { CardData } from "./shared";

/**
 * Every series in a category, with a box to find one by name. Cards that don't
 * match are hidden rather than removed, so the ones that have already arrived
 * on screen don't have to arrive again.
 */
export default function SeriesBrowser({ cards, noun }: { cards: CardData[]; noun: string }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.map((c) => !q || c.title.toLowerCase().includes(q));
  }, [cards, query]);

  const shown = matches.filter(Boolean).length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-black pb-4">
        <label className="flex min-w-0 flex-1 items-center gap-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">Find a {noun}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Find a ${noun}`}
            className="w-full min-w-0 bg-transparent text-xl font-bold tracking-tight outline-none placeholder:text-black/30 md:text-2xl"
          />
        </label>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-black/50" aria-live="polite">
          {shown} of {cards.length}
        </div>
      </div>

      {shown === 0 ? (
        <p className="py-16 text-lg text-black/60">
          Nothing by that name.{" "}
          <button type="button" onClick={() => setQuery("")} className="sc-link text-black">
            Show all
          </button>
        </p>
      ) : null}

      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
        {cards.map((card, i) => (
          <SeriesCard key={card.href} card={card} delay={(i % 3) * 70} hidden={!matches[i]} />
        ))}
      </div>
    </>
  );
}
