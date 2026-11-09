"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * A short opening: the rings hold, the theme lands, the veil lifts. It sits
 * over a page that is already rendered underneath, plays once per visit, and
 * is skipped for anyone who asks for less motion.
 */
const KEY = "tfc26-opened";
const HOLD = 1700;
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
        // Above the site header (z-40) so the screen is genuinely full.
        "tfc-field fixed inset-0 z-[200] grid place-items-center transition-opacity duration-700",
        phase === "lifting" ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      style={{ ["--tfc-y" as string]: "50%" }}
    >
      <div className="tfc-hue" />
      <div className="tfc-ring" />
      <div className="tfc-ring tfc-ring-late" />

      {/* The logo sits at the centre of the rings, the way it does on the flyer. */}
      <div className="tfc-above flex flex-col items-center px-6 text-center">
        <Image
          src="/logo-white.svg"
          alt=""
          width={190}
          height={58}
          priority
          className="tfc-settle h-auto w-[160px] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:w-[200px]"
        />
        <div className="tfc-settle mt-6 text-[10px] font-bold uppercase tracking-[0.42em] text-white/85 [animation-delay:0.12s] sm:text-[11px]">
          The Faith Convention
        </div>
      </div>
    </div>
  );
}
