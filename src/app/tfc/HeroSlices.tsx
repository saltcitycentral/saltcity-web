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
  // The furthest photo each slice has turned to. A slice holds those photos
  // plus the next one, so the page doesn't fetch all nine up front.
  const [reach, setReach] = useState<number[]>(() => HERO_SLICES.map(() => 0));
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => {
      if (document.visibilityState === "visible") {
        const slice = turn % HERO_SLICES.length;
        setShown((prev) =>
          prev.map((v, i) => (i === slice ? (v + 1) % HERO_SLICES[i].photos.length : v))
        );
        setReach((prev) => prev.map((v, i) => (i === slice ? v + 1 : v)));
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
            {slice.photos.map((photo, j) =>
              j > reach[i] + 1 ? null : (
              <Image
                key={photo.src}
                src={photo.src}
                alt=""
                fill
                priority={j === 0}
                // The slice is narrow but full height, and the photograph covers
                // it, so it renders about one and a half times the hero's height
                // wide. Ask for that, not for the slice's width.
                sizes="(max-width: 1023px) 40vh, 65vh"
                quality={72}
                className={["object-cover", j === shown[i] ? "opacity-100" : "opacity-0"].join(" ")}
                style={{ objectPosition: photo.position ?? "50% 50%" }}
              />
              )
            )}
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
