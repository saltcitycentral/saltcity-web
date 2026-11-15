"use client";

import { useSyncExternalStore } from "react";

/**
 * Counts down to the first session, then changes its mind: during the week it
 * says we're in it, and afterwards it points at the recordings instead of
 * sitting on a row of zeros.
 */
const UNITS = [
  { key: "days", label: "days" },
  { key: "hours", label: "hrs" },
  { key: "minutes", label: "mins" },
  { key: "seconds", label: "secs" },
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
    return <div className="h-[62px]" aria-hidden="true" />;
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
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="text-sm font-bold text-white/70">Opens in</span>
      <div className="flex gap-1.5">
        {UNITS.map(({ key, label }) => (
          <div
            key={key}
            className="min-w-[3.6rem] border-b-2 border-[#F7B92F] bg-white/10 px-2.5 pb-1.5 pt-2 text-center sm:min-w-[4.2rem]"
          >
            <div className="text-2xl font-black leading-none tabular-nums sm:text-3xl">
              {String(t[key]).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
              {label}
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm font-bold text-white">Tue 8 Dec, 9:00 AM WAT</span>
    </div>
  );
}
