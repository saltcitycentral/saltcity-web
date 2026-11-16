"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The hero's photographs. The pulpit comes first; the rest turn over one at a
 * time, each wiping in across the last and settling slowly while it is up.
 * No dots, no bar: the photographs change and that is all.
 *
 * Only the current and next photo are mounted, so a phone never downloads five
 * to show one. Holds still for reduced motion and while the tab is hidden.
 */
const HOLD = 6500;

const PHOTOS = [
  { src: "/images/home/hero-pulpit.jpg", alt: "Pastor Tobore David teaching at SaltCity Central", position: "50% 45%" },
  { src: "/images/home/hero-together.jpg", alt: "Members of SaltCity together after a service", position: "50% 30%" },
  { src: "/images/home/hero-joy.jpg", alt: "A member laughing during worship", position: "50% 22%" },
  { src: "/images/home/hero-word.jpg", alt: "Members following a teaching with their notebooks open", position: "40% 30%" },
  { src: "/images/home/hero-friends.jpg", alt: "Three friends laughing together outside the church", position: "62% 35%" },
];

export default function HeroPhotos() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([0, 1]);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => {
      if (document.visibilityState === "visible") {
        const next = (active + 1) % PHOTOS.length;
        const after = (next + 1) % PHOTOS.length;
        setPrev(active);
        setActive(next);
        setSeen((s) => Array.from(new Set([...s, next, after])));
      }
      setBeat((b) => b + 1);
    }, HOLD);

    return () => clearTimeout(id);
  }, [active, beat]);

  return (
    <>
      {PHOTOS.map((photo, i) =>
        seen.includes(i) ? (
          <div
            key={photo.src}
            className={[
              "sc-slide",
              i === active ? "is-active" : "",
              i === prev ? "is-prev" : "",
              // The very first photo is simply there; it doesn't wipe in.
              i === 0 && prev === null ? "is-first" : "",
            ].join(" ")}
          >
            <div className="sc-slide-img">
              <Image
                src={photo.src}
                alt={i === active ? photo.alt : ""}
                fill
                priority={i === 0}
                sizes="100vw"
                quality={75}
                className="object-cover"
                style={{ objectPosition: photo.position }}
              />
            </div>
          </div>
        ) : null
      )}
    </>
  );
}
