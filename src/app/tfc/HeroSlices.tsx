"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLICES } from "./data";
import { REPLAY_EVENT } from "./Intro";

/**
 * The hero's photographs: three slanted slices, each with its own small set.
 * One slice turns over at a time, so there is always movement somewhere but
 * never all at once.
 */
const BEAT = 2200;

export default function HeroSlices() {
  // shown[i] is which photo slice i is on.
  const [shown, setShown] = useState<number[]>(() => HERO_SLICES.map(() => 0));
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => {
      if (document.visibilityState === "visible") {
        const slice = turn % HERO_SLICES.length;
        setShown((prev) =>
          prev.map((v, i) => (i === slice ? (v + 1) % HERO_SLICES[i].photos.length : v))
        );
      }
      setTurn((t) => t + 1);
    }, BEAT);

    return () => clearTimeout(id);
  }, [turn]);

  return (
    <div aria-hidden="true" className="tfc-slices">
      {HERO_SLICES.map((slice, i) => (
        <div key={i} className={`tfc-slice tfc-${slice.tint}`}>
          <div className="tfc-slice-inner">
            {slice.photos.map((photo, j) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt=""
                fill
                priority={j === 0}
                sizes="(max-width: 1023px) 60vw, 26vw"
                quality={70}
                className={["object-cover", j === shown[i] ? "opacity-100" : "opacity-0"].join(" ")}
                style={{ objectPosition: photo.position ?? "50% 50%" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The quiet link under the hero buttons that plays the opening again. */
export function ReplayIntro() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}
      className="text-xs font-bold uppercase tracking-[0.2em] text-white/55 underline decoration-white/25 underline-offset-4 transition hover:text-white"
    >
      Replay intro
    </button>
  );
}
