"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { INTRO } from "./data";

/**
 * The opening sequence. Three columns of photographs arrive from alternating
 * directions, each under one of the convention's colours and carrying one word.
 * Then the title, then the whole stage lifts away on a diagonal.
 *
 * The choreography is CSS, timed with delays; this component only decides
 * whether to play, when to leave, and listens for "replay". It plays once per
 * visit, can always be skipped, and never plays for reduced motion.
 */
const KEY = "tfc26-intro";
const LENGTH = 6050;
export const REPLAY_EVENT = "tfc:replay-intro";

let decision: boolean | null = null;

function shouldPlay() {
  if (decision === null) {
    let quiet = false;
    let seen = false;
    try {
      quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* no storage: play it */
    }
    decision = !quiet && !seen;
  }
  return decision;
}

const subscribe = () => () => {};
const neverOnServer = () => false;

export default function Intro() {
  const auto = useSyncExternalStore(subscribe, shouldPlay, neverOnServer);
  const [mode, setMode] = useState<"auto" | "off" | "replay">("auto");
  const [run, setRun] = useState(0);

  const playing = mode === "replay" || (mode === "auto" && auto);

  // The page paints a plain cover before hydration so the hero never flashes
  // ahead of the opening. Once this component is in charge, take it away.
  useEffect(() => {
    // While the sequence is up it does the covering itself; otherwise there is
    // nothing to wait for. Either way the plain cover can go.
    const cover = document.getElementById("tfc-cover");
    if (cover) cover.style.display = "none";
  }, [playing]);

  useEffect(() => {
    const replay = () => {
      setRun((n) => n + 1);
      setMode("replay");
    };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  useEffect(() => {
    if (!playing) return;

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    document.body.style.overflow = "hidden";
    const end = setTimeout(() => setMode("off"), LENGTH);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("off");
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing, run]);

  if (!playing) return null;

  return (
    <div key={run} className="tfc-intro" role="dialog" aria-modal="true" aria-label="The Faith Convention opening sequence">
      <div aria-hidden="true" className="tfc-intro-edge" />

      <div className="tfc-intro-stage">
        <div aria-hidden="true" className="tfc-intro-cols">
          {INTRO.map((col) => (
            <div key={col.word} className={`tfc-intro-col tfc-${col.tint}`}>
              {/* Plain <img>: these exact files are preloaded by the page. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.photos[0].src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: col.photos[0].position ?? "50% 50%" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.photos[1].src}
                alt=""
                className="tfc-intro-second absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: col.photos[1].position ?? "50% 50%" }}
              />
              <p className="tfc-intro-word">
                <span>{col.word}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="tfc-intro-title">
          <div>
            <p className="tfc-intro-t1 text-[clamp(1.1rem,2.6vw,2.4rem)] font-black tracking-tight text-white">
              The Faith Convention 2026
            </p>
            <p className="tfc-intro-t2 mt-1 text-[clamp(3.6rem,17vw,15rem)] font-black leading-[0.86] tracking-tight text-[#F7B92F]">
              MULTIPLY
            </p>
            <p className="tfc-intro-t3 mt-6 text-sm font-bold uppercase tracking-[0.3em] text-white/80 sm:text-base">
              8–13 December · Warri
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="tfc-intro-bar" />

        <button
          type="button"
          onClick={() => setMode("off")}
          className="absolute right-5 top-5 z-[5] text-xs font-bold uppercase tracking-[0.22em] text-white/75 underline decoration-white/30 underline-offset-4 transition hover:text-white"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
