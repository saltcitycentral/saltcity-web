"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * A short opening: the rings hold, the theme lands, the veil lifts. It sits
 * over a page that is already rendered underneath, plays once per visit, and
 * is skipped for anyone who asks for less motion.
 */
const KEY = "tfc26-opened";
const HOLD = 1500;
const FADE = 700;

/** Decided once from the browser (a media query and sessionStorage), never re-read. */
let decision: boolean | null = null;

function shouldPlay() {
  if (decision === null) {
    let quiet = false;
    let seen = false;
    try {
      quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* no storage or no matchMedia — play it */
    }
    decision = !quiet && !seen;
  }
  return decision;
}

const subscribe = () => () => {};
const neverOnServer = () => false;

export default function Opening() {
  const play = useSyncExternalStore(subscribe, shouldPlay, neverOnServer);
  const [phase, setPhase] = useState<"holding" | "lifting" | "done">("holding");

  useEffect(() => {
    if (!play) return;

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    document.body.style.overflow = "hidden";
    const lift = setTimeout(() => setPhase("lifting"), HOLD);
    const done = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, HOLD + FADE);

    return () => {
      clearTimeout(lift);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, [play]);

  if (!play || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "tfc-field fixed inset-0 z-[100] grid place-items-center transition-opacity duration-700",
        phase === "lifting" ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      style={{ ["--tfc-y" as string]: "50%" }}
    >
      <div className="px-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.42em] text-white/80 [animation:tfc-rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          The Faith Convention
        </div>
        <div className="mt-4 text-6xl font-black tracking-tight text-white [animation:tfc-rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] sm:text-8xl">
          MULTIPLY
        </div>
      </div>
    </div>
  );
}
