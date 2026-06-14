"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import RegisterModal from "./RegisterModal";

/**
 * The Spirit of Faith — A Holy Ghost Meeting
 * Long-form editorial event page. All body copy is verbatim from the
 * conference brochure (punctuation normalised; nothing removed).
 *
 * Palette:  ink #0B1526 · paper #FAF8F2 · lime #CEDD0E
 */
const INK = "#0B1526";
const LIME = "#CEDD0E";
const EVENT_START = new Date("2026-06-26T09:00:00+01:00");
const EASE = "cubic-bezier(0.16,1,0.3,1)";

/* ------------------------------------------------------------ motion bits */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold: 0.15, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-[11px] font-bold uppercase tracking-[0.3em] ${className}`}>
      {children}
    </div>
  );
}

/* block fade + rise */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const on = inView || reduced;
  return (
    <div
      ref={ref}
      style={{
        transform: on ? "none" : "translateY(22px)",
        opacity: on ? 1 : 0,
        transition: reduced
          ? undefined
          : `transform 800ms ${EASE} ${delay}ms, opacity 800ms ease ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* masked line-by-line reveal (the "buttery" heading effect) */
function MaskReveal({
  lines,
  className = "",
  lineClassName = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 95,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  const reduced = usePrefersReducedMotion();
  const on = inView || reduced;
  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((ln, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span
            aria-hidden
            className={`block will-change-transform ${lineClassName}`}
            style={{
              transform: on ? "translateY(0)" : "translateY(115%)",
              opacity: on ? 1 : 0,
              transition: reduced
                ? undefined
                : `transform 950ms ${EASE} ${delay + i * stagger}ms, opacity 600ms ease ${
                    delay + i * stagger
                  }ms`,
            }}
          >
            {ln}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* image that scales + fades in on view */
function RevealMedia({
  src,
  alt,
  className = "",
  sizes,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  position?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const on = inView || reduced;
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          transform: on ? "scale(1)" : "scale(1.08)",
          opacity: on ? 1 : 0,
          transition: reduced ? undefined : `transform 1200ms ${EASE}, opacity 900ms ease`,
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} className="object-cover" style={{ objectPosition: position }} />
      </div>
    </div>
  );
}

/* slim reading-progress bar */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full origin-left transition-transform duration-150 ease-out"
        style={{ backgroundColor: LIME, transform: `scaleX(${p})` }}
      />
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

/* a single number that rolls when it changes */
function Rolling({ value }: { value: number | string }) {
  const reduced = usePrefersReducedMotion();
  const str = typeof value === "number" ? String(value).padStart(2, "0") : value;
  const prev = useRef(str);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (reduced) return;
    if (prev.current !== str) {
      setAnim(true);
      const t = setTimeout(() => setAnim(false), 360);
      prev.current = str;
      return () => clearTimeout(t);
    }
  }, [str, reduced]);
  return (
    <span className="relative block overflow-hidden">
      <span
        className="block tabular-nums"
        style={{
          transform: anim ? "translateY(-8%)" : "translateY(0)",
          opacity: anim ? 0.6 : 1,
          transition: reduced ? undefined : `transform 360ms ${EASE}, opacity 360ms ease`,
        }}
      >
        {str}
      </span>
    </span>
  );
}

function Countdown() {
  const c = useCountdown(EVENT_START);
  const cells: [string, number | string][] = [
    ["Days", c ? c.d : "—"],
    ["Hours", c ? c.h : "—"],
    ["Minutes", c ? c.m : "—"],
    ["Seconds", c ? c.s : "—"],
  ];
  return (
    <div className="inline-flex items-stretch divide-x divide-[#0B1526]/12 rounded-2xl border border-[#0B1526]/12 bg-white/60 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
      {cells.map(([label, val]) => (
        <div key={label} className="px-5 py-3 text-center sm:px-6">
          <div className="text-2xl font-black leading-none text-[#0B1526] sm:text-3xl">
            <Rolling value={val} />
          </div>
          <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/45">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* parallax + slow cinematic zoom for full-bleed art */
function ParallaxArt({
  src,
  alt,
  position = "50% 38%",
  amount = 50,
}: {
  src: string;
  alt: string;
  position?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [y, setY] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const r = el.getBoundingClientRect();
          const prog = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          setY(Math.max(-1, Math.min(1, prog)) * -amount);
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [amount, reduced]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${y}px, 0) scale(1.14)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={reduced ? "object-cover" : "object-cover animate-[sof-zoom_22s_ease-in-out_infinite]"}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- the page UI */
export default function SpiritOfFaithClient() {
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // staggered hero entrance
  const step = (i: number): React.CSSProperties => ({
    transform: loaded ? "none" : "translateY(18px)",
    opacity: loaded ? 1 : 0,
    transition: `transform 900ms ${EASE} ${i * 110}ms, opacity 900ms ease ${i * 110}ms`,
  });

  return (
    <main className="bg-[#FAF8F2] font-sans text-[#0B1526]">
      <ReadingProgress />

      {/* ============================================ HERO (warm white) */}
      <section ref={heroRef as React.Ref<HTMLElement>} className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 50% 0%, rgba(206,221,14,0.12), transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1180px] flex-col items-center justify-center px-6 py-28 text-center">
          <div style={step(0)}>
            <div className="inline-flex items-center gap-2.5 text-[#0B1526]/60">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LIME }} />
              <Eyebrow>A Holy Ghost Meeting</Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LIME }} />
            </div>
          </div>

          <div className="mt-9 w-full" style={{ ...step(1), filter: loaded ? "blur(0)" : "blur(8px)" }}>
            <img
              src="/images/spirit-of-faith/logo-spirit-of-faith.svg"
              alt="The Spirit of Faith — June 26–28"
              className="mx-auto w-full max-w-[680px]"
            />
          </div>

          <div className="mt-10" style={step(2)}>
            <div className="flex flex-col items-center gap-1 text-base font-semibold text-[#0B1526] sm:flex-row sm:gap-3 sm:text-lg">
              <span>June 26 – 28, 2026</span>
              <span className="hidden text-[#0B1526]/30 sm:inline">/</span>
              <span className="text-[#0B1526]/70">The Centre of Discipleship, Warri</span>
            </div>
          </div>

          <div className="mt-9" style={step(3)}>
            <Countdown />
          </div>

          <div className="mt-10" style={step(4)}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={openModal}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0B1526] px-9 py-4 text-sm font-bold tracking-wide text-white shadow-[0_10px_30px_rgba(11,21,38,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B1526]/90 hover:shadow-[0_16px_40px_rgba(11,21,38,0.26)]"
              >
                Register
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollTo("vision")}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-wide text-[#0B1526]/70 underline-offset-8 transition hover:text-[#0B1526] hover:underline"
              >
                Read the vision
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollTo("vision")}
            aria-label="Scroll to read"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#0B1526]/30 transition hover:text-[#0B1526]/60"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 1200ms ease 700ms" }}
          >
            <svg className="h-6 w-6 animate-bounce motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </div>
      </section>

      {/* ============================================ PULL QUOTE (Hagin) */}
      <section className="border-y border-[#0B1526]/10 bg-white">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32">
          <Reveal>
            <span className="mx-auto block text-7xl font-black leading-none" style={{ color: LIME }}>
              “
            </span>
          </Reveal>
          <MaskReveal
            as="blockquote"
            lines={["The move of the Spirit will be lost in a", "generation unless it’s taught."]}
            className="mx-auto mt-2 max-w-3xl text-3xl font-black leading-[1.18] tracking-tight text-[#0B1526] sm:text-4xl md:text-5xl"
          />
          <Reveal delay={200}>
            <figcaption className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1526]/55">
              Reverend Kenneth E. Hagin
              <span className="ml-2 font-normal normal-case tracking-normal text-[#0B1526]/40">
                (of blessed memory)
              </span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* ============================================ THE VISION (intro) */}
      <section id="vision" className="scroll-mt-24 bg-[#FAF8F2]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow className="text-[#0B1526]/40">The Vision</Eyebrow>
              </Reveal>
              <MaskReveal
                lines={["A Holy Ghost", "Meeting."]}
                className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl"
              />
            </div>
            <div className="md:col-span-8 md:pt-2">
              <Reveal delay={120}>
                <p className="text-xl font-semibold leading-[1.6] text-[#0B1526] sm:text-2xl">
                  A Holy Ghost Meeting is a charismatic gathering of believers,
                  where emphasis is placed on the teaching, ministry, and power
                  of the Holy Spirit.
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-[#0B1526]/70">
                  The Spirit of Faith Conference is a Holy Ghost Meeting called
                  by GOD for spiritual renewal and city revival. We firmly
                  believe that the Holy Spirit is active today just as much as He
                  was 2,000 years ago in the early church, and at the Spirit of
                  Faith Conference, we will all flow and move with the Holy
                  Spirit, witnessing lives transformed, healing released,
                  addictions broken, and freedom established in people’s lives.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ FULL-BLEED KEY ART */}
      <section className="relative bg-[#0B1526]">
        <div className="relative h-[78svh] min-h-[520px] w-full">
          <ParallaxArt
            src="/images/spirit-of-faith/hero-water.jpg"
            alt="A man standing in the sea, arms open, face lifted to the sky"
            position="50% 38%"
            amount={50}
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1180px] px-6 pb-12 md:pb-16">
              <Reveal>
                <Eyebrow className="text-white/70">The Spirit of Faith · 2026</Eyebrow>
              </Reveal>
              <MaskReveal
                lines={["Spiritual renewal", "& city revival."]}
                className="mt-4 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] sm:text-7xl lg:text-8xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ THREE ELEMENTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
          <Reveal>
            <Eyebrow className="text-[#0B1526]/40">The Practice</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.0] tracking-tight sm:text-6xl">
              A Holy Ghost meeting consists of three essential elements.
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
            <Element
              n="01"
              title="The teaching of the Word"
              paras={[
                'In the ministry of the Holy Spirit, the Word must be taught. Jesus commanded in Mark 16:15, “Go ye into all the world and preach the gospel to every creature,” which is our primary mandate. The preaching and teaching of God’s Word come first. Matthew 28:18-19 echoes this, instructing us to teach all nations.',
                'Brother Hagin, in 1939, conducted Deliverance, Getting Free, and Loosening Meetings, but saw no change after nine months—people remained bound. Through prayer and fasting, GOD revealed that His Word alone has the power to set free. He emphasized John 8:32, “You shall know the truth, and the truth shall make you free.” When the Word was effectively preached, people experienced lasting freedom. The Word of GOD is anointed and active (Psalm 107:20).',
              ]}
            />

            <Reveal>
              <RevealMedia
                src="/images/spirit-of-faith/choir-duo.jpg"
                alt="The choir leading worship"
                sizes="(max-width: 1180px) 100vw, 1180px"
                position="50% 35%"
                className="aspect-[16/7] w-full rounded-2xl"
              />
            </Reveal>

            <Element
              n="02"
              title="Edification, manifestations, and ministrations of the Holy Spirit"
              paras={[
                'Holy Ghost meetings are both precept and practice. As one minister said, “With just the Word, you might dry up; with just the Spirit, you might blow up; but with both, you will grow up.” We prioritize the Word but are equally committed to following the Holy Spirit’s leading, trusting Him to guide, lead, and direct. The manifestations of the Spirit, described in 1 Corinthians 12:7-11, occur as the Spirit wills to bless lives. We create an environment conducive to the Spirit’s move by cooperating with Him. These manifestations belong to the body of Christ, and are also to be demonstrated through Spirit-filled believers.',
                'Additionally, demonstrations of the Spirit are tangible signs of His power—like Paul’s delivery of the gospel (as seen in 1 Corinthians 2:4), and joyful expressions (as seen in Psalm 126:1-3). We are seated with Christ (Ephesians 2:6), and rejoice in the Holy Spirit, causing the power of GOD to manifest visibly.',
                'Rejoicing in the Spirit blesses us and brings GOD’s power into action. As 1 Peter 1:8 declares, “In whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory.” This joy often manifests as laughter, dancing, running, or even hilarity.',
              ]}
            />

            <Element
              n="03"
              title="Needs are met, and our joy is full"
              paras={[
                'The Holy Spirit may manifest through worship, prayer burdens, or silent reverence, guiding us into GOD’s best. While walking by faith is ideal, some people require tangible manifestations for healing, deliverance, or salvation—especially those whose situations are desperate.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ============================================ YOKES (text on image) */}
      <section className="relative bg-[#0B1526]">
        <div className="relative min-h-[70svh] w-full">
          <ParallaxArt
            src="/images/spirit-of-faith/preacher-duo.jpg"
            alt="Minister preaching under stage light"
            position="62% center"
            amount={40}
          />
          <div className="relative mx-auto flex min-h-[70svh] max-w-[1180px] items-center px-6 py-24">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow className="text-[#CEDD0E]">The Promise</Eyebrow>
              </Reveal>
              <MaskReveal
                lines={["GOD’s power", "destroys yokes."]}
                className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-7xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* laying on of hands + expectation */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-28">
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow className="text-[#0B1526]/40">The laying on of hands</Eyebrow>
                <p className="mt-5 text-2xl font-bold leading-snug text-[#0B1526] sm:text-3xl">
                  Five ways GOD moves when hands are laid.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={120}>
                <ul className="divide-y divide-[#0B1526]/10 border-y border-[#0B1526]/10">
                  {[
                    ["ministers healing", "Mark 16:17-18"],
                    ["baptizes in the Holy Spirit", "Acts 19:6"],
                    ["dedicates individuals to GOD’s call", "Acts 13:1-4"],
                    ["imparts spiritual gifts", "Deuteronomy 34:9; 1 Timothy 4:14; 2 Timothy 1:6"],
                    ["releases blessings", "Mark 10:16"],
                  ].map(([what, ref]) => (
                    <li
                      key={what}
                      className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-[padding] duration-300 hover:pl-3"
                    >
                      <span className="flex items-baseline gap-3 text-lg font-semibold text-[#0B1526]">
                        <span
                          className="h-1.5 w-1.5 shrink-0 -translate-x-2 rounded-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          style={{ backgroundColor: LIME }}
                        />
                        {what}
                      </span>
                      <span className="text-sm italic text-[#0B1526]/45">{ref}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-2xl font-black leading-snug tracking-tight text-[#0B1526]">
                  Expect to be blessed, to have your needs met, and to be filled
                  with joy at the Conference.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ HOW TO PREPARE */}
      <section className="border-t border-[#0B1526]/10 bg-[#FAF8F2]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow className="text-[#0B1526]/40">How to Prepare</Eyebrow>
              </Reveal>
              <MaskReveal
                lines={["Come ready", "to receive."]}
                className="mt-5 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl"
              />
              <Reveal delay={120}>
                <p className="mt-8 max-w-xl text-lg leading-[1.75] text-[#0B1526]/75">
                  Participate in preparatory classes and fast from June 19th to
                  25th via Mixlr at 6pm daily. Join the All-night Prayers on
                  Friday, June 20th, 2026, at 10pm at the Centre of Discipleship.
                </p>
                <p className="mt-5 max-w-xl text-lg leading-[1.75] text-[#0B1526]/75">
                  Release any grudges or offenses, and increase your acts of
                  kindness through giving. Pray fervently in the Spirit.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {["Pray", "Publicize", "Partner"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#0B1526]/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0B1526] transition-colors duration-300 hover:border-[#0B1526]/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="self-stretch">
              <RevealMedia
                src="/images/spirit-of-faith/worship-duo.jpg"
                alt="Worshippers with hands lifted in prayer"
                sizes="(max-width: 1024px) 100vw, 50vw"
                position="50% 30%"
                className="h-full min-h-[360px] rounded-2xl"
              />
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-16 block">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0B1526]/12 bg-[#0B1526]/12 sm:grid-cols-3">
              {[
                ["Preparatory Classes & Fast", "June 19 – 25 · 6pm daily (Mixlr)"],
                ["All-Night Prayers", "Friday, June 20, 2026 · 10pm"],
                ["The Conference", "June 26 – 28, 2026 · Warri"],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#FAF8F2] p-6 transition-colors duration-300 hover:bg-white">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/45">
                    {k}
                  </dt>
                  <dd className="mt-2 text-lg font-bold leading-snug text-[#0B1526]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============================================ REGISTER (lime) */}
      <section id="register" className="scroll-mt-20 bg-[#CEDD0E] text-[#0B1526]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow className="text-[#0B1526]/60">Pray · Publicize · Partner</Eyebrow>
              </Reveal>
              <MaskReveal
                lines={["Save your", "seat."]}
                className="mt-6 text-6xl font-black leading-[0.86] tracking-tight sm:text-8xl"
              />
              <Reveal delay={150}>
                <p className="mt-8 max-w-md text-lg font-medium leading-relaxed text-[#0B1526]/80">
                  Registration is open. Invite a friend, partner with the
                  conference, and come ready to walk in liberty.
                </p>
                <button
                  onClick={openModal}
                  className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-[#0B1526] px-10 py-5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_30px_rgba(11,21,38,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B1526]/90 hover:shadow-[0_18px_44px_rgba(11,21,38,0.3)]"
                >
                  Register now
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <p className="mt-6 text-sm font-medium text-[#0B1526]/65">
                  To register, visit{" "}
                  <span className="font-bold text-[#0B1526]">saltcitycentral.org/conference</span>
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:pt-2">
              <Reveal delay={120}>
                <dl>
                  {[
                    ["Dates", "June 26 – 28, 2026"],
                    ["Venue", "The Centre of Discipleship"],
                    ["Address", "20 Okumagba Avenue, Warri"],
                    ["Classes & Fast", "June 19 – 25 · 6pm daily (Mixlr)"],
                    ["All-Night Prayers", "Friday, June 20, 2026 · 10pm"],
                  ].map(([k, v], i, arr) => (
                    <div
                      key={k}
                      className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between ${
                        i === arr.length - 1 ? "" : "border-b border-[#0B1526]/20"
                      }`}
                    >
                      <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1526]/55">
                        {k}
                      </dt>
                      <dd className="text-base font-bold sm:text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* mobile sticky CTA */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 z-40 border-t border-[#0B1526]/10 bg-[#FAF8F2]/95 px-4 py-3 backdrop-blur-md md:hidden",
          "transition-transform duration-500",
          showSticky ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        style={{ transitionTimingFunction: EASE }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="leading-tight">
            <div className="text-sm font-black text-[#0B1526]">June 26 – 28, 2026</div>
            <div className="text-xs text-[#0B1526]/55">The Centre of Discipleship</div>
          </div>
          <button onClick={openModal} className="rounded-full bg-[#0B1526] px-6 py-3 text-sm font-bold text-white">
            Register
          </button>
        </div>
      </div>

      <RegisterModal open={open} onClose={() => setOpen(false)} />

      <style jsx global>{`
        @keyframes sof-zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.07);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}

/* a single numbered element block */
function Element({ n, title, paras }: { n: string; title: string; paras: string[] }) {
  return (
    <Reveal className="grid gap-x-12 gap-y-6 md:grid-cols-12">
      <div className="md:col-span-4">
        <div className="flex items-start gap-5 md:flex-col md:gap-4">
          <span
            className="text-6xl font-black leading-none tracking-tight sm:text-7xl"
            style={{ color: LIME, WebkitTextStroke: `1.5px ${INK}` }}
          >
            {n}
          </span>
          <h3 className="text-2xl font-black leading-tight tracking-tight text-[#0B1526] sm:text-3xl">
            {title}
          </h3>
        </div>
      </div>
      <div className="md:col-span-8">
        {paras.map((p, i) => (
          <p key={i} className={`text-lg leading-[1.78] text-[#0B1526]/75 ${i === 0 ? "" : "mt-5"}`}>
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
