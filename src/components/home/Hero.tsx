// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Container from "@/components/ui/Container";
// import Button from "@/components/ui/Button";

// export default function Hero() {
//   const [ready, setReady] = useState(false);

//   // tiny, once-only intro (no heavy libs)
//   useEffect(() => {
//     // optional: only animate once per session
//     const key = "sc_intro_played";
//     const played = typeof window !== "undefined" && sessionStorage.getItem(key);

//     if (played) {
//       setReady(true);
//       return;
//     }

//     // let layout settle, then animate in
//     const t = window.setTimeout(() => {
//       setReady(true);
//       sessionStorage.setItem(key, "1");
//     }, 60);

//     return () => window.clearTimeout(t);
//   }, []);

//   return (
//     <section className="py-16 lg:py-20">
//       <Container>
//         <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
//           {/* IMAGE */}
//           <div
//             className={[
//               "overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
//               "transition-all duration-700 will-change-transform",
//               "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
//               ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
//             ].join(" ")}
//           >
//             <div className="relative h-[420px] w-full lg:h-[540px]">
//               <Image
//                 src="/images/homey.jpeg"
//                 alt="Welcome"
//                 fill
//                 priority
//                 sizes="(min-width: 1024px) 520px, 100vw"
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           {/* COPY */}
//           <div
//             className={[
//               "transition-all duration-700 delay-100 will-change-transform",
//               "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
//               ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
//             ].join(" ")}
//           >
//             <h1 className="text-5xl lg:text-7xl leading-tight font-black mb-6 tracking-tight">
//               Become <br /> Fit For Use
//             </h1>

//             <p className="text-lg lg:text-xl text-black/75 leading-relaxed max-w-[540px] mb-8">
//               GOD created you in Christ Jesus to join Him in His good work, and we are here to help you in doing so.
//             </p>

//             <div
//               className={[
//                 "flex flex-wrap gap-4",
//                 "transition-all duration-700 delay-200",
//                 ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
//                 "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
//               ].join(" ")}
//             >
//               <Button
//                 href="https://www.youtube.com/@saltcitycentral"
//                 target="_blank"
//                 className="bg-black text-white hover:bg-black/90"
//                 icon={
//                   <svg
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                   </svg>
//                 }
//               >
//                 Join A Live Service
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }


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
 * - Uses a single interval (cheap)
 * - Respects prefers-reduced-motion
 * - Can be disabled via `enabled={false}`
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
        image: "/images/home1.jpg",
        alt: "Worship moment",
        headline: "Become Fit For Use",
        subline: "GOD created you in Christ Jesus to join Him in His good work.",
        primaryCta: {
          label: "Join A Live Service",
          href: "https://www.youtube.com/@saltcitycentral",
          target: "_blank",
        },
        secondaryCta: { label: "First Time Here?", href: "/first-time" },
      },
      {
        image: "/images/home2.jpg",
        alt: "Worship stage",
        headline: "Rooted in His Grace",
        subline:
          "Grow in the Word, build conviction, and live with JESUS as your example.",
        primaryCta: {
          label: "Watch Sermons",
          href: "/media/sermon-series",
        },
        secondaryCta: { label: "Grow With Us", href: "/next-steps" },
      },
      {
        image: "/images/home4.jpg",
        alt: "Church community",
        headline: "You Have a Place Here",
        subline: "Come as you are. We’ll help you connect and grow steadily.",
        primaryCta: { label: "Plan Your Visit", href: "/first-time" },
        secondaryCta: { label: "Who We Are", href: "/who-we-are" },
      },
    ],
    []
  );

  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  // typing only once per session
  const [typingEnabled, setTypingEnabled] = useState(false);

  // slideshow timing (slow + calm)
  const intervalMs = 2000;
  const fadeMs = 1100;

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

  useEffect(() => {
    if (reduced) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [SLIDES.length, reduced]);

  const progressKey = `progress-${active}`;
  const slide = SLIDES[active];

  return (
    <section className="relative overflow-hidden" data-header-overlay="true">
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
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* soft vignette + tint */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/25 to-black/35" />

              {/* subtle texture sweep */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.7),transparent_40%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.55),transparent_35%)]" />
            </div>
          );
        })}

        {/* Content */}
        <Container className="relative h-full">
          <div className="flex h-full items-end pb-14 lg:pb-20">
            <div className="max-w-3xl">
              <div
                className={[
                  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2",
                  "text-xs font-semibold uppercase tracking-wide text-white/85",
                  "backdrop-blur-sm",
                  ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  "transition-all duration-700",
                ].join(" ")}
              >
                <span className="h-2 w-2 rounded-full bg-white/80" />
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

              {!reduced ? (
                <div className="mt-8 w-[260px] max-w-[70vw]">
                  <div className="h-[2px] w-full bg-white/20 overflow-hidden rounded-full">
                    <div
                      key={progressKey}
                      className="h-full bg-white/75 origin-left animate-[heroProgress_var(--dur)_linear]"
                      style={
                        {
                          ["--dur" as any]: `${intervalMs}ms`,
                        } as React.CSSProperties
                      }
                    />
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
                  `}</style>
                </div>
              ) : null}
            </div>
          </div>
        </Container>

        {/* ✅ FIX: bottom fade that doesn't bleach the image */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
      </div>
    </section>
  );
}
