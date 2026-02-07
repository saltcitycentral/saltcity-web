"use client";

import * as React from "react";
import type { LocationItem } from "./locationsData";
import { googleMapsDirectionsUrl, isLiveNowLagos } from "./utils";

type Props = {
  items: LocationItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export default function LocationsList({ items, selectedId, onSelect }: Props) {
  const [query, setQuery] = React.useState("");

  const online = items.filter((x) => x.type === "online");
  const physical = items.filter((x) => x.type === "physical");

  const q = query.trim().toLowerCase();

  const filteredPhysical = physical.filter((l) => {
    const hay = `${l.name} ${l.address ?? ""} ${l.city ?? ""} ${l.region ?? ""} ${l.country ?? ""}`.toLowerCase();
    return q ? hay.includes(q) : true;
  });

  const grouped = filteredPhysical.reduce<Record<string, LocationItem[]>>((acc, cur) => {
    const key = cur.region ?? "Other";
    acc[key] = acc[key] ?? [];
    acc[key].push(cur);
    return acc;
  }, {});

  const regions = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  const liveNow = isLiveNowLagos();

  return (
    <div className="rounded-xl border border-black/10 bg-white">
      <div className="border-b border-black/10 p-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, state, or address"
          className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/30"
        />
      </div>

      {/* Online pinned */}
      <div id="online" className="border-b border-black/10 p-3">
        {online.map((o) => (
          <div key={o.id} className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">{o.name}</div>
                {liveNow && (
                  <span className="rounded-md bg-[#ffebe3] px-2 py-0.5 text-[10px] font-semibold text-[#c2452d]">
                    LIVE NOW
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-black/60">{o.serviceTimes}</div>
            </div>
            
            <a
              href={o.ctaUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/15 px-3 py-2 text-xs font-medium hover:border-black/30"
            >
              Join Our Community
            </a>
          </div>
        ))}
      </div>

      {/* Grouped physical */}
      <div className="max-h-[460px] overflow-auto">
        {regions.map((region) => (
          <div key={region} className="border-b border-black/10">
            <div className="bg-black/[0.02] px-4 py-3 text-xs font-semibold tracking-wide text-black/70">
              {region}
            </div>

            <div>
              {grouped[region].map((l) => {
                const active = selectedId === l.id;
                const hasCoords = typeof l.lat === "number" && typeof l.lng === "number";

                return (
                  <button
                    key={l.id}
                    onClick={() => onSelect(l.id)}
                    className={[
                      "w-full text-left px-4 py-4 transition",
                      "hover:bg-black/[0.03]",
                      active ? "bg-black/[0.05]" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{l.name}</div>
                        <div className="mt-1 text-xs text-black/60">{l.address}</div>
                        <div className="mt-2 text-xs text-black/60">{l.serviceTimes}</div>
                      </div>

                      {hasCoords ? (
                        <a
                          className="shrink-0 rounded-full border border-black/15 px-3 py-2 text-xs font-medium hover:border-black/30"
                          href={googleMapsDirectionsUrl(l.lat!, l.lng!, l.address ?? l.name)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Get directions
                        </a>
                      ) : (
                        <span className="shrink-0 rounded-full border border-black/10 px-3 py-2 text-xs text-black/50">
                          No map pin
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {regions.length === 0 && (
          <div className="p-6 text-sm text-black/60">No locations match your search.</div>
        )}
      </div>
    </div>
  );
}