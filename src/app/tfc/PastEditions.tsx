"use client";

import Image from "next/image";
import { useState } from "react";
import type { PastEdition } from "./data";

/** Past conventions, one tab per year: the theme, photographs, and where to hear it again. */
export default function PastEditions({ editions, telegram }: { editions: PastEdition[]; telegram: string }) {
  const [year, setYear] = useState(editions[0].year);
  const edition = editions.find((e) => e.year === year) ?? editions[0];

  return (
    <div>
      <div role="tablist" aria-label="Past conventions" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-white/15">
        {editions.map((e) => {
          const on = e.year === year;
          return (
            <button
              key={e.year}
              role="tab"
              type="button"
              id={`tfc-tab-${e.year}`}
              aria-selected={on}
              aria-controls={`tfc-panel-${e.year}`}
              onClick={() => setYear(e.year)}
              className={[
                "-mb-px border-b-2 pb-3 text-2xl font-black tabular-nums tracking-tight transition sm:text-3xl",
                on ? "border-[#F7B92F] text-white" : "border-transparent text-white/35 hover:text-white/70",
              ].join(" ")}
            >
              {e.year}
            </button>
          );
        })}
      </div>

      <div
        key={edition.year}
        role="tabpanel"
        id={`tfc-panel-${edition.year}`}
        aria-labelledby={`tfc-tab-${edition.year}`}
        className="pt-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[36rem]">
            <h3 className="text-4xl font-black leading-none tracking-tight sm:text-6xl">
              {edition.theme || `TFC ${edition.year}`}
            </h3>
            <p className="mt-4 text-lg leading-[1.45] text-white/70">{edition.note}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href={edition.youtube} target="_blank" rel="noopener noreferrer" className="tfc-btn">
              <span>Watch on YouTube</span>
            </a>
            <a href={telegram} target="_blank" rel="noopener noreferrer" className="tfc-btn tfc-btn-line">
              <span>Listen on Telegram</span>
            </a>
          </div>
        </div>

        {edition.photos.length > 0 && (
          <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {edition.photos.map((p) => (
              <div
                key={p.src}
                className={[
                  "tfc-photo relative mb-3 break-inside-avoid overflow-hidden sm:mb-4",
                  p.tall ? "aspect-[3/4]" : "aspect-[3/2]",
                ].join(" ")}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 380px"
                  quality={75}
                  className="object-cover"
                  style={{ objectPosition: p.position ?? "50% 50%" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
