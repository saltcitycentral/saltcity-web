"use client";

import { useEffect } from "react";

/**
 * All of the homepage's motion, in one place and outside React's render cycle.
 *
 *  - [data-reveal]    arrives when it scrolls into view (gets .is-in)
 *  - [data-parallax]  drifts against the scroll; the value is its strength
 *  - [data-hero]      gets --p (0 → 1 as it scrolls away) and --mx/--my for
 *                     the light that follows the pointer
 *
 * It only writes CSS variables and classes, on animation frames, so scrolling
 * never causes a re-render. Renders nothing.
 */
export default function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home]");
    if (!root) return;

    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Arriving on scroll
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    let io: IntersectionObserver | null = null;

    if (quiet || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      root.classList.add("sc-motion");
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io?.observe(el));
    }

    if (quiet) return;

    // ── Scroll: hero progress and parallax, at most once per frame
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const drifters = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;

    const onFrame = () => {
      frame = 0;
      const vh = window.innerHeight;

      if (hero) {
        const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || vh)));
        hero.style.setProperty("--p", p.toFixed(4));
      }

      for (const el of drifters) {
        const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        // -1 when the element is just below the screen, 1 when just above it.
        const offset = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
        const strength = Number(el.dataset.parallax) || 0.1;
        el.style.setProperty("--y", `${(-offset * strength * 100).toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(onFrame);
    };

    onFrame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ── Pointer: the light in the hero eases toward the cursor
    let light = 0;
    let tx = 48;
    let ty = 42;
    let cx = tx;
    let cy = ty;

    const ease = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hero?.style.setProperty("--mx", `${cx.toFixed(2)}%`);
      hero?.style.setProperty("--my", `${cy.toFixed(2)}%`);
      light = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(ease) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!hero || e.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0) return;
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
      if (!light) light = requestAnimationFrame(ease);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      if (light) cancelAnimationFrame(light);
      root.classList.remove("sc-motion");
    };
  }, []);

  return null;
}
