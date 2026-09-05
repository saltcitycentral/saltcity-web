import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  CB,
  CITYBUILDERS_URL,
  MISSION,
  PROGRAMS,
  SCHOOL,
  TIMELINE,
  VISION,
} from "@/lib/citybuilders";

const INK = "#0B1526";
const CREST = "#0B6E31"; // The CityBuilders' crest green

export const metadata: Metadata = {
  title: "The CityBuilders",
  description:
    "The CityBuilders is the NGO SaltCity Church founded in 2024 — building thriving cities by building people, through education, mindset reformation and economic development in Warri, Delta State.",
  alternates: { canonical: "/citybuilders" },
  openGraph: {
    title: "The CityBuilders — building cities by building people",
    description: CB.summary,
    images: ["/images/citybuilders/uniform-girls.jpg"],
  },
};

function Eyebrow({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`text-[11px] font-bold uppercase tracking-[0.3em] ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function CityBuildersPage() {
  return (
    <main className="bg-[#FAF8F2] font-sans text-[#0B1526]">
      {/* ───────────────────────────── hero */}
      <section className="border-b border-[#0B1526]/10">
        <Container>
          <div className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div>
              <Eyebrow style={{ color: CREST }}>An initiative of SaltCity Church</Eyebrow>
              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
                The CityBuilders
              </h1>
              <p className="mt-6 max-w-lg text-2xl font-semibold leading-snug">
                {CB.tagline}.
              </p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#0B1526]/70">
                A non-governmental organisation in Warri, Delta State, founded by
                SaltCity Church in {CB.founded}. Our goal is to build thriving
                cities by building people.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#get-involved"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: CREST }}
                >
                  Partner with us
                </a>
                <a
                  href="#school"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-[#0B1526]/75 ring-1 ring-[#0B1526]/20 transition hover:bg-white hover:text-[#0B1526]"
                >
                  Inside the school
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl lg:max-w-none">
              <Image
                src="/images/citybuilders/uniform-girls.jpg"
                alt="Two pupils in the school's yellow uniform giving a thumbs up"
                width={1400}
                height={2104}
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────── the premise */}
      <section className="border-b border-[#0B1526]/10 bg-white">
        <Container>
          <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-16 md:py-24">
            <div className="md:col-span-5">
              <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Strong cities do not just happen; people build them.
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <p className="text-lg leading-[1.75] text-[#0B1526]/75">
                The strength of a city begins with its people. Behind every strong
                city are dreamers, workers, parents, students, and builders —
                ordinary individuals carrying extraordinary hope.
              </p>
              <p className="mt-5 text-lg leading-[1.75] text-[#0B1526]/75">
                Change doesn’t begin with bricks or concrete. It begins with
                hearts, hands, and lives changed. When people grow, families
                grow; when families grow, communities thrive; and when
                communities thrive, cities rise.
              </p>

              <dl className="mt-10 grid gap-8 border-t border-[#0B1526]/10 pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B1526]/45">
                    Vision
                  </dt>
                  <dd className="mt-3 leading-relaxed text-[#0B1526]/75">{VISION}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B1526]/45">
                    Mission
                  </dt>
                  <dd className="mt-3 leading-relaxed text-[#0B1526]/75">{MISSION}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────── from relief to formation */}
      <section className="border-b border-[#0B1526]/10">
        <Container>
          <div className="py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <Eyebrow className="text-[#0B1526]/40">Our story</Eyebrow>
                <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  From relief to formation.
                </h2>
                <div className="mt-8 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/citybuilders/outreach.jpg"
                    alt="Adults and children gathered closely together at a community outreach"
                    width={1400}
                    height={933}
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="md:col-span-7">
                <ol className="border-t border-[#0B1526]/10">
                  {TIMELINE.map((t) => (
                    <li
                      key={t.period}
                      className="grid gap-2 border-b border-[#0B1526]/10 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
                    >
                      <div
                        className="text-sm font-bold tabular-nums tracking-wide"
                        style={{ color: CREST }}
                      >
                        {t.period}
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">{t.heading}</h3>
                        <p className="mt-2 leading-relaxed text-[#0B1526]/70">{t.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────── programs */}
      <section className="border-b border-[#0B1526]/10 bg-white">
        <Container>
          <div className="py-16 md:py-24">
            <Eyebrow className="text-[#0B1526]/40">Programs</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Everything we do is rooted in three thematic areas.
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#0B1526]/10 md:grid-cols-3">
              {PROGRAMS.map((p) => (
                <div key={p.title} className="bg-white p-7 md:p-8">
                  <div className="text-3xl font-black tabular-nums" style={{ color: CREST }}>
                    {p.n}
                  </div>
                  <h3 className="mt-4 text-xl font-black tracking-tight">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#0B1526]/70">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────── the school */}
      <section id="school" className="scroll-mt-24 border-b border-[#0B1526]/10">
        <Container>
          <div className="py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-6">
                <Eyebrow className="text-[#0B1526]/40">Education — our pilot</Eyebrow>
                <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  {SCHOOL.name}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#0B1526]/75">
                  {SCHOOL.body}
                </p>

                <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                  {SCHOOL.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="block text-5xl font-black tabular-nums leading-none">
                          {s.figure}
                        </span>
                        <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1526]/45">
                          {s.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="md:col-span-6">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/citybuilders/class-group.jpg"
                    alt="Pupils of The Foundation Montessori standing together in the classroom"
                    width={1600}
                    height={1178}
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 560px"
                    className="h-auto w-full"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src="/images/citybuilders/lesson.jpg"
                      alt="A teacher working with pupils around a table"
                      width={1600}
                      height={1214}
                      loading="lazy"
                      sizes="(max-width: 768px) 45vw, 270px"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src="/images/citybuilders/play-yard.jpg"
                      alt="Children playing together in the school yard"
                      width={1600}
                      height={1265}
                      loading="lazy"
                      sizes="(max-width: 768px) 45vw, 270px"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────────────── get involved */}
      <section id="get-involved" className="scroll-mt-24 bg-[#0B1526] text-white">
        <Container>
          <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-16 md:py-24">
            <div className="md:col-span-6">
              <Eyebrow style={{ color: "#8FD5A8" }}>Get involved</Eyebrow>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Build with us.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                The school runs free, and it runs on people who decide to be part
                of it — partners, volunteers and givers.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`mailto:${CB.email}?subject=Partnering%20with%20The%20CityBuilders`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0B1526] transition hover:bg-white/90"
                >
                  Partner with us
                </a>
                {CITYBUILDERS_URL ? (
                  <a
                    href={CITYBUILDERS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white/85 ring-1 ring-white/25 transition hover:bg-white/10"
                  >
                    Visit thecitybuilders.org →
                  </a>
                ) : null}
                <Link
                  href="/giving"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white/85 ring-1 ring-white/25 transition hover:bg-white/10"
                >
                  Give
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 md:pt-2">
              <dl className="divide-y divide-white/15 border-y border-white/15">
                {[
                  [CB.directorRole, CB.director],
                  ["Address", CB.address],
                  ["Email", CB.email],
                  ["Phone", CB.phone],
                  ["Instagram", CB.instagramHandle],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                      {k}
                    </dt>
                    <dd className="font-semibold sm:text-right">
                      {k === "Email" ? (
                        <a className="underline underline-offset-4" href={`mailto:${v}`}>{v}</a>
                      ) : k === "Phone" ? (
                        <a className="underline underline-offset-4" href={`tel:${CB.phoneHref}`}>{v}</a>
                      ) : k === "Instagram" ? (
                        <a
                          className="underline underline-offset-4"
                          href={CB.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
