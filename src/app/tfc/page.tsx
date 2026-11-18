import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import Container from "@/components/ui/Container";
import CopyAccount from "./CopyAccount";
import Countdown from "./Countdown";
import HeroSlices, { ReplayIntro } from "./HeroSlices";
import Intro from "./Intro";
import InviteVideo from "./InviteVideo";
import PastEditions from "./PastEditions";
import {
  CALENDAR_URL,
  COMMUNITY_URL,
  END,
  EXPECT,
  FAQS,
  INTRO,
  INVITE_STILL,
  INVITE_VIDEO_ID,
  JOIN,
  MAP_URL,
  PARTNER_ACCOUNT,
  PARTNER_IMAGE,
  PAST,
  START,
  TELEGRAM_URL,
  VENUE_ADDRESS,
  VENUE_NAME,
  YOUTUBE_URL,
} from "./data";

export const metadata: Metadata = {
  title: "The Faith Convention 2026 — MULTIPLY",
  description:
    "MULTIPLY. The Faith Convention 2026 holds 8–13 December at the Centre of Discipleship, " +
    "20 Okumagba Avenue, Warri. Mornings 9:00 AM, evenings 4:30 PM. " +
    "SaltCity's Prophetic Family Inheritance sharing meeting.",
  alternates: { canonical: "/tfc" },
  openGraph: {
    title: "MULTIPLY. The Faith Convention 2026",
    description:
      "8–13 December in Warri. SaltCity's Prophetic Family Inheritance sharing meeting.",
    images: ["/images/tfc/multiply-og.jpg"],
  },
};

/**
 * Runs before the hero paints: if the opening sequence is going to play, put a
 * plain cover up so the hero doesn't flash first. The timeout is a failsafe in
 * case the page's script never arrives.
 */
const COVER_SCRIPT =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('tfc26-intro')!=='1'){" +
  "var c=document.getElementById('tfc-cover');c.style.display='block';" +
  "setTimeout(function(){c.style.display='none'},8000)}}catch(e){}";

function Btn({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line" | "dark";
  external?: boolean;
}) {
  const cls = ["tfc-btn", variant === "line" ? "tfc-btn-line" : variant === "dark" ? "tfc-btn-dark" : ""].join(" ");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <span>{children}</span>
    </a>
  ) : (
    <a href={href} className={cls}>
      <span>{children}</span>
    </a>
  );
}

export default function FaithConventionPage() {
  // The opening columns' first photos, fetched early so they are there when the columns land.
  for (const col of INTRO) preload(col.photos[0].src, { as: "image", fetchPriority: "high" });

  return (
    <main className="bg-[#170504] font-sans text-white">
      {/* The script changes this element before React hydrates it, hence the suppression. */}
      <div id="tfc-cover" aria-hidden="true" className="tfc-cover" suppressHydrationWarning />
      <script dangerouslySetInnerHTML={{ __html: COVER_SCRIPT }} />
      <Intro />

      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-[min(100svh,58rem)] items-center overflow-hidden bg-[#170504]">
        <HeroSlices />
        {/* Keeps the copy readable where it crosses the photographs. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-t from-[#170504] via-[#170504]/55 to-[#170504]/10 lg:bg-[linear-gradient(90deg,#170504_0%,#170504_30%,rgba(23,5,4,0.6)_50%,rgba(23,5,4,0)_76%)]"
        />

        <Container className="relative z-[2]">
          <div className="max-w-[44rem] pb-16 pt-32 lg:py-28">
            <div className="text-sm font-bold text-[#F7B92F]">SaltCity · The Faith Convention</div>

            <h1 className="mt-3 text-[clamp(3.6rem,13vw,9.5rem)] font-black leading-[0.84] tracking-tight">
              MULTIPLY
              <span className="block text-[#F7B92F]">2026</span>
            </h1>

            <p className="mt-7 max-w-[30rem] text-xl font-bold leading-snug sm:text-2xl">
              SaltCity&apos;s Prophetic Family Inheritance sharing meeting.
            </p>
            <p className="mt-3 text-base font-medium text-white/75">
              8–13 December · Tue–Sun · {VENUE_NAME}, {VENUE_ADDRESS}
            </p>

            <div className="mt-9">
              <Countdown start={START} end={END} />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-4">
              <Btn href={CALENDAR_URL} external>
                Add to calendar
              </Btn>
              <Btn href="#partner" variant="line">
                Partner
              </Btn>
              <span className="ml-2">
                <ReplayIntro />
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What it is ── */}
      <section id="about" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div className="max-w-[36rem]">
              <div className="tfc-label">What it is</div>
              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Our Prophetic Entrance Into The New Year
              </h2>

              <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/75">
                <p>
                  The Faith Convention is SaltCity&apos;s family inheritance-sharing meeting and our
                  prophetic gateway into the New Year.
                </p>
                <p>
                  It is a special gathering where all expressions of SaltCity Central come together
                  physically to feast on the Word of GOD, and to give and receive from the gifts,
                  graces, and unique supplies within our family.
                </p>
                <p>
                  This year&apos;s theme, &ldquo;MULTIPLY,&rdquo; is at the heart of our gathering. We
                  will be receiving the wisdom, understanding, and power of GOD to multiply as a
                  church, in our families, in our businesses, and in every other sphere of life where
                  GOD&apos;s Word applies.
                </p>
              </div>

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

            <InviteVideo videoId={INVITE_VIDEO_ID} still={INVITE_STILL} />
          </div>
        </Container>
      </section>

      {/* ── What to expect ── */}
      <section id="expect" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="tfc-label">What to expect</div>
              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Six days of camping
                <br />
                around the Word of GOD
              </h2>
            </div>
            <p className="max-w-[24rem] text-white/60">
              From Tuesday, 8th December, through Saturday, we will gather for morning sessions at
              9am and evening sessions at 4:30pm, culminating in a special Thanksgiving Service on
              Sunday.
            </p>
          </div>

          <div className="tfc-expect-grid mt-12">
            {EXPECT.map((card) => (
              <article key={card.key} tabIndex={0} className="tfc-photo tfc-expect">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 760px"
                  quality={78}
                  className="object-cover"
                  style={{ objectPosition: card.position ?? "50% 50%" }}
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-[2] p-6 sm:p-7">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F7B92F]">
                    {card.when}
                  </div>
                  <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    {card.title}
                  </h3>

                  <div className="tfc-expect-more">
                    <div>
                      {card.list && (
                        <p className="pt-3 text-sm font-bold text-white">{card.list.join(" · ")}</p>
                      )}
                      <p className="max-w-[34rem] pt-3 leading-relaxed text-white/85">{card.body}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How to take part ── */}
      <section id="take-part" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
        <Container>
          <div className="tfc-label">How to participate</div>
          <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            All roads lead to 20 Okumagba Avenue.
          </h2>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="tfc-photo relative flex min-h-[30rem] flex-col justify-end">
              <Image
                src={JOIN.ground.image}
                alt={JOIN.ground.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                quality={78}
                className="object-cover"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="relative z-[2] p-7 sm:p-9">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F7B92F]">
                  Physically
                </div>
                <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fellowship With Us</h3>
                <p className="mt-4 max-w-[30rem] leading-relaxed text-white/85">
                  If you are in Warri or its environs, you can join us physically at The{" "}
                  {VENUE_NAME}, {VENUE_ADDRESS}.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Btn href={CALENDAR_URL} external>
                    Add to calendar
                  </Btn>
                  <Btn href={MAP_URL} variant="line" external>
                    Get directions
                  </Btn>
                </div>
              </div>
            </div>

            <div className="tfc-photo relative flex min-h-[30rem] flex-col justify-end">
              <Image
                src={JOIN.online.image}
                alt={JOIN.online.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                quality={78}
                className="object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="relative z-[2] p-7 sm:p-9">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F7B92F]">
                  Online
                </div>
                <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Join From Where You Are
                </h3>
                <p className="mt-4 max-w-[30rem] leading-relaxed text-white/85">
                  If you are located outside Warri, you can join the convention&apos;s online community
                  on WhatsApp, for livestream links, updates, and further inquiries.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Btn href={COMMUNITY_URL} external>
                    Join the community
                  </Btn>
                  <Btn href={YOUTUBE_URL} variant="line" external>
                    Watch on YouTube
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Partner ── */}
      <section id="partner" className="tfc-cut scroll-mt-10 bg-[#F7B92F] text-[#170504]">
        <Container>
          <div className="grid items-center gap-10 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden shadow-2xl">
              <Image
                src={PARTNER_IMAGE.src}
                alt={PARTNER_IMAGE.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                quality={78}
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>

            <div>
              <div className="tfc-label" style={{ color: "rgba(23,5,4,0.7)" }}>
                Give
              </div>
              <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
                Partner
                <br />
                With Us
              </h2>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#170504]/80">
                Partner with us to create a befitting experience for everyone that will be a part of
                The Convention.
              </p>

              <div className="mt-9 border-t border-[#170504]/20 pt-7">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#170504]/60">
                  {PARTNER_ACCOUNT.bank} · {PARTNER_ACCOUNT.name}
                </div>
                <div className="mt-3">
                  <CopyAccount number={PARTNER_ACCOUNT.number} />
                </div>
              </div>

              <Link
                href="/giving"
                className="mt-8 inline-block text-sm font-bold underline decoration-[#170504]/35 underline-offset-4 transition hover:decoration-[#170504]"
              >
                Other ways to give
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Past conventions ── */}
      <section id="past" className="scroll-mt-16 py-20 md:py-28">
        <Container>
          <div className="tfc-label">Past conventions</div>
          <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Have A Feel Of Previous TFCs
          </h2>
          <div className="mt-12">
            <PastEditions editions={PAST} telegram={TELEGRAM_URL} />
          </div>
        </Container>
      </section>

      {/* ── Questions ── */}
      <section id="questions" className="scroll-mt-16 border-t border-white/10 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="tfc-label">Questions</div>
              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
                Before you come.
              </h2>
            </div>

            <div className="divide-y divide-white/12 border-y border-white/12">
              {FAQS.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-[#F7B92F] after:absolute after:left-1/2 after:top-0 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-[#F7B92F] after:transition-transform group-open:after:rotate-90"
                    />
                  </summary>
                  <p className="max-w-[40rem] pb-6 leading-relaxed text-white/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
