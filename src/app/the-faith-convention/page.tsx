import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Countdown from "./Countdown";
import Opening from "./Opening";

/** First session: Tuesday 8 December 2026, 9:00 AM WAT. Last: Sunday 13th. */
const START = "2026-12-08T09:00:00+01:00";
const END = "2026-12-13T21:00:00+01:00";

const VENUE = "20 Okumagba Avenue, Warri";
const MAP =
  "https://www.google.com/maps/search/?api=1&query=20+Okumagba+Avenue+Warri+Delta+State";
const CALENDAR =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=The+Faith+Convention+2026+%E2%80%94+MULTIPLY" +
  "&dates=20261208T080000Z/20261213T200000Z" +
  "&details=Mornings+9%3A00+AM+and+evenings+4%3A30+PM.+School+of+Ministry+Saturday+9%3A00+AM." +
  "&location=20+Okumagba+Avenue%2C+Warri%2C+Delta+State";

export const metadata: Metadata = {
  title: "The Faith Convention 2026 — MULTIPLY",
  description:
    "MULTIPLY. The Faith Convention 2026 holds 8–13 December at 20 Okumagba Avenue, Warri. " +
    "Mornings 9:00 AM, evenings 4:30 PM, School of Ministry on Saturday morning. " +
    "SaltCity's Prophetic Family Inheritance sharing meeting. " +
    "Teaching by Pastor Tobore David and Pastor Seun Tobore David.",
  alternates: { canonical: "/the-faith-convention" },
  openGraph: {
    title: "MULTIPLY. The Faith Convention 2026",
    description:
      "8–13 December in Warri. SaltCity's Prophetic Family Inheritance sharing meeting.",
    images: ["/images/tfc/multiply-og.jpg"],
  },
};

const DAYS = [
  { day: "Tue", date: "8" },
  { day: "Wed", date: "9" },
  { day: "Thu", date: "10" },
  { day: "Fri", date: "11" },
  { day: "Sat", date: "12", note: "School of Ministry" },
  { day: "Sun", date: "13" },
];

const SESSIONS = [
  { time: "9:00 AM", title: "Mornings", body: "Teaching, Tuesday through Sunday." },
  { time: "4:30 PM", title: "Evenings", body: "Worship, then the evening session." },
  { time: "Sat 9:00 AM", title: "School of Ministry", body: "For members who serve in the house." },
];

export default function FaithConventionPage() {
  return (
    <main className="bg-[#170504] font-sans text-white">
      <Opening />

      {/* Hero — the flyer's rings, rebuilt in CSS */}
      <section className="tfc-field tfc-breathe relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#170504]" />

        <Container className="relative">
          <div className="flex min-h-[86vh] flex-col justify-center py-20 md:min-h-[90vh]">
            <div className="tfc-rise">
              <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/80">
                The Faith Convention · 2026
              </div>

              <h1 className="mt-6 text-[clamp(4rem,19vw,13rem)] font-black leading-[0.82] tracking-tight">
                MULTIPLY
              </h1>

              <p className="mt-7 max-w-[34rem] text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                SaltCity&apos;s Prophetic Family Inheritance sharing meeting. Six days,
                mornings and evenings, in Warri.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-bold sm:text-lg">
                <span>8–13 December</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>Tue–Sun</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
                <span className="w-full font-medium text-white/80 sm:w-auto">{VENUE}</span>
              </div>

              <div className="mt-12">
                <Countdown start={START} end={END} />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={CALENDAR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#170504] transition hover:bg-white/90"
                >
                  Add to calendar
                </a>
                <a
                  href={MAP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The week */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Six days.
                <br />
                Mornings and evenings.
              </h2>
              <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-white/70">
                The School of Ministry sits inside the week, on Saturday morning. It is the
                biggest programme in our year.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-6">
                {DAYS.map((d) => (
                  <div key={d.date} className="bg-[#170504] px-3 py-5 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {d.day}
                    </div>
                    <div className="mt-1.5 text-2xl font-black tabular-nums">{d.date}</div>
                    {d.note && (
                      <div className="mt-2 text-[9px] font-bold uppercase leading-tight tracking-wider text-[#F7B92F]">
                        School of
                        <br />
                        Ministry
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/50">December 2026</p>
            </div>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {SESSIONS.map((s) => (
                <li key={s.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-7">
                  <span className="w-[7.5rem] shrink-0 text-xl font-black tabular-nums text-[#F7B92F]">
                    {s.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold">{s.title}</span>
                    <span className="mt-1 block text-white/65">{s.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why we gather */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="max-w-[36rem]">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F7B92F]">
                What it is
              </div>
              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Prophetic Family
                <br />
                Inheritance.
              </h2>

              <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/75">
                <p>
                  SaltCity calls it a sharing meeting: the annual gathering of the family, where
                  believers sit under biblical teaching and receive specific instructions.
                </p>
                <p>
                  Members keep a Faithlist, the things they are trusting GOD for, and come back to
                  it long after December. Last year the theme was INFLUENCE.
                </p>
              </div>

              <blockquote className="mt-9 border-l-2 border-[#F7B92F] pl-6 text-lg italic leading-relaxed text-white/85">
                We teach believers how to live victoriously by practicing the Written Word of GOD
                and living everyday with JESUS as our EXAMPLE.
                <span className="mt-3 block text-sm font-bold uppercase not-italic tracking-[0.18em] text-white/45">
                  SaltCity Church
                </span>
              </blockquote>

              <div className="mt-10 border-t border-white/10 pt-8">
                <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Ministering
                </div>
                <p className="mt-3 text-xl font-bold">
                  Pastor Tobore David
                  <span className="mx-3 text-white/30">&middot;</span>
                  Pastor Seun Tobore David
                </p>
              </div>
            </div>

            <div>
              <Image
                src="/images/tfc/multiply-poster.jpg"
                alt="MULTIPLY — The Faith Convention 2026, 8–13 December, 20 Okumagba Avenue, Warri"
                width={1100}
                height={1560}
                className="h-auto w-full rounded-2xl shadow-2xl"
              />
              <a
                href="/images/tfc/multiply-poster.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-white/60 underline decoration-white/25 underline-offset-4 transition hover:text-white"
              >
                Open the flyer
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Visit / watch */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Join us in Warri</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                20 Okumagba Avenue, Warri, Delta State.
                <br />
                Bring someone with you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={MAP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#170504] transition hover:bg-white/90"
                >
                  Get directions
                </a>
                <Link
                  href="/locations"
                  className="rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-bold transition hover:border-white/70"
                >
                  All locations
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Watching from elsewhere</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                We keep an online community for people who cannot be in Warri, and the sessions
                go up on our YouTube channel. Last year&apos;s convention, INFLUENCE, is there in
                full.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://youtube.com/@saltcitycentral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-bold transition hover:border-white/70"
                >
                  YouTube channel
                </a>
                <Link
                  href="/media/the-faith-convention"
                  className="rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-bold transition hover:border-white/70"
                >
                  Past conventions
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
