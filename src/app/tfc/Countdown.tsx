"use client";

import { useSyncExternalStore } from "react";

/**
 * Counts down to the first session, then changes its mind: during the week it
 * says we're in it, and afterwards it points at the recordings instead of
 * sitting on four zeros.
 */
const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

// The visitor's clock is an external store: read it, don't mirror it in state.
let tick = 0;

function subscribe(onChange: () => void) {
  const id = setInterval(() => {
    tick = Date.now();
    onChange();
  }, 1000);
  tick = Date.now();
  onChange();
  return () => clearInterval(id);
}

const getSnapshot = () => tick;
/** 0 on the server, so nothing is rendered until the real clock arrives. */
const getServerSnapshot = () => 0;

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown({ start, end }: { start: string; end: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === 0) {
    return <div className="h-[92px]" aria-hidden="true" />;
  }

  const startAt = new Date(start).getTime();
  const endAt = new Date(end).getTime();

  if (now >= startAt) {
    return (
      <p className="text-lg font-bold text-white sm:text-xl">
        {now <= endAt
          ? "Happening now. Sessions today at 9:00 AM and 4:30 PM."
          : "MULTIPLY has ended. The sessions are going up on YouTube."}
      </p>
    );
  }

  const t = split(startAt - now);

  return (
    <div>
      <div className="flex items-start gap-5 sm:gap-8">
        {UNITS.map(({ key, label }) => (
          <div key={key}>
            <div className="text-4xl font-black leading-none tabular-nums sm:text-5xl">
              {String(t[key]).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/60">Until the first session.</p>
    </div>
  );
}
