"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type Slide = {
  image: string;
  alt: string;
  headline: string;
  subline?: string;
  primaryCta: { label: string; href: string; target?: string };
  secondaryCta?: { label: string; href: string; target?: string };
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/**
 * Types text once, then stays fully revealed.
 */
function TypingHeadline({
  text,
  enabled,
  speed = 22,
  className = "",
}: {
  text: string;
  enabled: boolean;
  speed?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const idxRef = useRef(0);

  useEffect(() => {
    if (!enabled || reduced) {
      setOut(text);
      return;
    }

    setOut("");
    idxRef.current = 0;

    const t = window.setInterval(() => {
      idxRef.current += 1;
      setOut(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) window.clearInterval(t);
    }, speed);

    return () => window.clearInterval(t);
  }, [text, enabled, speed, reduced]);

  return (
    <h1 className={className}>
      <span className="relative">
        {out}
        {enabled && !reduced && out.length < text.length ? (
          <span className="inline-block w-[10px] translate-y-[2px] ml-1">
            <span className="inline-block h-[1em] w-[2px] bg-white/90 animate-[blink_1s_infinite]" />
          </span>
        ) : null}
      </span>

      <style jsx>{`
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </h1>
  );
}

export default function HeroStage() {
  const SLIDES: Slide[] = useMemo(
    () => [
      {
        image: "/images/FAS_1160.jpg",
        alt: "Worship moment",
        headline: "Become Fit For Use",
        subline: "GOD created you in Christ Jesus to join Him in His good work.",
        primaryCta: {
          label: "Join A Live Service",
          href: "https://www.youtube.com/@saltcitycentral",
          target: "_blank",
        },
        secondaryCta: { label: "First Time Here?", href: "/new-here" },
      },
      {
        image: "/images/home2.jpg",
        alt: "Worship stage",
        headline: "Rooted in His Grace",
        subline:
          "Grow in the Word, build conviction, and live with JESUS as your example.",
        primaryCta: { label: "Watch Sermons", href: "/media/sermon-series" },
        secondaryCta: { label: "Grow With Us", href: "/next-steps" },
      },
      {
        image: "/images/home4.jpg",
        alt: "Church community",
        headline: "You Have a Place Here",
        subline: "Come as you are. We’ll help you connect and grow steadily.",
        primaryCta: { label: "Plan Your Visit", href: "/new-here" },
        secondaryCta: { label: "Who We Are", href: "/who-we-are" },
      },
      {
        image: "/images/home1.jpg",
        alt: "SaltCity service moment",
        headline: "Experience SaltCity",
        subline: "Join us in worship, the Word, and a community built on faith.",
        primaryCta: { label: "Plan Your Visit", href: "/new-here" },
        secondaryCta: { label: "Locations", href: "/locations" },
      },
      {
        image: "/images/FAS_0365.jpg.jpeg",
        alt: "SaltCity community moment",
        headline: "Built for Discipleship",
        subline: "Grow steadily with people who help you walk and win with JESUS.",
        primaryCta: { label: "Next Steps", href: "/next-steps" },
        secondaryCta: { label: "Who We Are", href: "/who-we-are" },
      },
    ],
    []
  );

  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  // typing only once per session (first slide)
  const [typingEnabled, setTypingEnabled] = useState(false);

  // slideshow timing
  const intervalMs = 5200;
  const fadeMs = 1100;

  const [paused, setPaused] = useState(false);

  // drift + scroll parallax
  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const slide = SLIDES[active];
  const progressKey = `progress-${active}`;

  const goNext = () => setActive((i) => (i + 1) % SLIDES.length);
  const goPrev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 30);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const key = "sc_hero_typing_played";
    const already = sessionStorage.getItem(key);

    if (!already) {
      setTypingEnabled(true);
      sessionStorage.setItem(key, "1");
    } else {
      setTypingEnabled(false);
    }
  }, [reduced]);

  // autoplay
  useEffect(() => {
    if (reduced || paused) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [SLIDES.length, reduced, paused, intervalMs]);

  // gentle drift for depth
  useEffect(() => {
    if (reduced) return;

    const id = window.setInterval(() => {
      setDrift({
        x: (Math.random() - 0.5) * 10, // -5..5
        y: (Math.random() - 0.5) * 8, // -4..4
      });
    }, 2200);

    return () => window.clearInterval(id);
  }, [reduced]);

  // ✅ keyboard nav (ignore when typing in inputs)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      const isTypingSurface =
        tag === "input" || tag === "textarea" || (t as any)?.isContentEditable;

      if (isTypingSurface) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SLIDES.length]);

  // ✅ parallax scroll (smooth rAF)
  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Parallax amounts (keep subtle)
  const parallaxY = reduced ? 0 : Math.min(scrollY * 0.12, 52); // cap to avoid over-shift
  const parallaxX = reduced ? 0 : Math.min(scrollY * 0.015, 10);

  return (
    <section
      className="relative overflow-hidden"
      data-header-overlay="true"
      
    >
      <div className="relative h-screen min-h-[100svh] w-full">
        {/* Slides */}
        {SLIDES.map((s, i) => {
          const isActive = i === active;

          return (
            <div
              key={s.image}
              className={[
                "absolute inset-0",
                "transition-opacity will-change-opacity",
                isActive ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{ transitionDuration: `${fadeMs}ms` }}
              aria-hidden={!isActive}
            >
              {/* Parallax + drift wrapper */}
              <div
                className="absolute inset-0 transition-transform duration-[2000ms] ease-out will-change-transform"
                style={
                  reduced
                    ? undefined
                    : {
                        transform: `translate3d(${drift.x + parallaxX}px, ${
                          drift.y + parallaxY
                        }px, 0)`,
                      }
                }
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={[
                    "object-cover",
                    !reduced && isActive
                      ? "animate-[slowZoom_10s_ease-in-out_infinite]"
                      : "",
                  ].join(" ")}
                />
              </div>

              {/* overlays */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-black/40" />

              {/* subtle texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.7),transparent_40%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.55),transparent_35%)]" />
            </div>
          );
        })}

        {/* Content */}
        <Container className="relative h-full">
          <div className="flex h-full items-end pb-14 lg:pb-20">
            <div
              className="max-w-3xl"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className={[
                  "text-xs font-bold uppercase tracking-[0.28em] text-white/75",
                  "drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]",
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  "transition-all duration-700",
                ].join(" ")}
              >
                SaltCity Central
              </div>

              <TypingHeadline
                text={slide.headline}
                enabled={typingEnabled && active === 0}
                className={[
                  "mt-6 text-5xl md:text-6xl lg:text-7xl font-black leading-[0.98] tracking-tight text-white",
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                  "transition-all duration-700",
                  "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
                ].join(" ")}
              />

              {slide.subline ? (
                <p
                  className={[
                    "mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl",
                    ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    "transition-all duration-700 delay-75",
                    "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
                  ].join(" ")}
                >
                  {slide.subline}
                </p>
              ) : null}

              <div
                className={[
                  "mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4",
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  "transition-all duration-700 delay-150",
                  "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
                ].join(" ")}
              >
                <Button
                  href={slide.primaryCta.href}
                  target={slide.primaryCta.target}
                  className="bg-white text-black hover:bg-white/90"
                  icon={
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  }
                >
                  {slide.primaryCta.label}
                </Button>

                {slide.secondaryCta ? (
                  <Button
                    href={slide.secondaryCta.href}
                    target={slide.secondaryCta.target}
                    variant="secondary"
                    className="bg-transparent text-white ring-1 ring-white/35 hover:ring-white/60 hover:bg-white/10"
                    icon={
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M5 12h12" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    }
                  >
                    {slide.secondaryCta.label}
                  </Button>
                ) : null}
              </div>

              {/* Progress + dots */}
              {!reduced ? (
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-[240px] max-w-[58vw]">
                    <div className="h-[2px] w-full bg-white/20 overflow-hidden rounded-full">
                      <div
                        key={progressKey}
                        className="h-full bg-white/75 origin-left animate-[heroProgress_var(--dur)_linear]"
                        style={
                          { ["--dur" as any]: `${intervalMs}ms` } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className={[
                          "h-2.5 w-2.5 rounded-full transition-all",
                          i === active
                            ? "bg-white/90 scale-110"
                            : "bg-white/35 hover:bg-white/60",
                        ].join(" ")}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <style jsx>{`
                    @keyframes heroProgress {
                      from {
                        transform: scaleX(0);
                      }
                      to {
                        transform: scaleX(1);
                      }
                    }
                    @keyframes slowZoom {
                      0% {
                        transform: scale(1);
                      }
                      50% {
                        transform: scale(1.06);
                      }
                      100% {
                        transform: scale(1);
                      }
                    }
                  `}</style>
                </div>
              ) : null}
            </div>
          </div>
        </Container>

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
      </div>
    </section>
  );
}