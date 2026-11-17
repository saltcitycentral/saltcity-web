import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "@/app/who-we-are/AboutHero";
import NextPage from "@/app/who-we-are/NextPage";
import AccountList from "./AccountList";
import { INFO_DESK } from "./accounts";

export const metadata: Metadata = {
  title: "Giving",
  description: "The primary purpose of giving is for raising disciples through the spread of the gospel.",
};

const PARTNERSHIP = [
  {
    title: "Tithe Partners",
    desc: "Give your first 10% consistently as an act of worship and obedience to God’s Word.",
    commit: "Monthly commitment",
  },
  {
    title: "Project Partners",
    desc: "Support specific kingdom projects and help us expand our reach and impact.",
    commit: "One-time or recurring",
  },
  {
    title: "Mission Partners",
    desc: "Fund evangelism, outreach, and community impact initiatives across Nigeria.",
    commit: "Quarterly commitment",
  },
];

const PROJECTS = [
  {
    title: "New Church Property, Warri",
    description:
      "Partner with us to buy and build a permanent home for our Warri congregation to gather, worship, and grow together.",
    progress: 1,
  },
  {
    title: "Church Operations, Monthly",
    description:
      "Join us as we create a financial structure for seamless day-to-day church operations and weekly service execution.",
    progress: 40,
  },
  {
    title: "SaltWorship Projects",
    description:
      "Support our vision of saturating the earth (both physically and digitally) with the gospel through songs.",
    progress: 55,
  },
];

const SCRIPTURES = [
  {
    text: "Upon the first day of the week let every one of you lay by him in store, as God hath prospered him, that there be no gatherings when I come.",
    ref: "1 Corinthians 16:2",
  },
  {
    text: "Charge them that are rich in this world, that they be not highminded, nor trust in uncertain riches, but in the living God, who giveth us richly all things to enjoy; that they do good, that they be rich in good works, ready to distribute, willing to communicate; laying up in store for themselves a good foundation against the time to come, that they may lay hold on eternal life.",
    ref: "1 Timothy 6:17-19",
  },
];

export default function GivingPage() {
  return (
    <main data-home>
      <AboutHero
        image="/images/giving/why.jpg"
        position="50% 45%"
        eyebrow="Why we give"
        lines={["Why Should", "The Believer Give?"]}
      >
        <p>The primary purpose of giving is for raising disciples through the spread of the gospel.</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/giving/ways"
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
          >
            Give now
          </Link>
          <a href="#accounts" className="sc-link text-sm text-white">
            See the accounts
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </AboutHero>

      {/* Our mandate */}
      <section className="bg-white">
        <Container>
          <div className="py-24 md:py-32">
            <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-black/50">
              Our mandate on giving
            </div>
            <p
              data-reveal
              style={{ ["--d" as string]: 80 }}
              className="mt-7 max-w-[24ch] text-[clamp(2rem,4.8vw,4.25rem)] font-black leading-[1.02] tracking-tight"
            >
              GOD, our primary EXAMPLE, gave us the ultimate gift of His Son generously, and that is how He
              expects His children to give.
            </p>
            <p
              data-reveal
              style={{ ["--d" as string]: 160 }}
              className="mt-8 max-w-[34rem] text-lg leading-relaxed text-black/70"
            >
              Here at SaltCity, we teach that everyone should give now and again, as GOD has prospered them.
            </p>
          </div>
        </Container>
      </section>

      {/* A word from Pastor */}
      <section className="border-t border-black/10 bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-5">
              <div data-reveal="shutter">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <div data-parallax="0.25" className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src="/images/leaders/tobore.jpg"
                      alt="Pastor Tobore David"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      quality={75}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:pt-6">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
              >
                A Word from Pastor
              </h2>
              <blockquote
                data-reveal
                style={{ ["--d" as string]: 80 }}
                className="mt-9 border-l border-black/25 pl-6 text-lg font-bold leading-snug tracking-tight md:text-xl"
              >
                “…and certain women, which had been healed of evil spirits and infirmities, Mary called
                Magdalene, out of whom went seven devils, and Joanna the wife of Chuza Herod’s steward, and
                Susanna, and many others, which ministered unto him of their substance.”
                <footer className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-black/50">
                  Luke 8:2-3
                </footer>
              </blockquote>
              <div className="mt-9 space-y-5 text-lg leading-relaxed text-black/70">
                <p data-reveal style={{ ["--d" as string]: 120 }}>
                  In Luke 8:2-3, we see the partners of Jesus, who gave their time, presence and substance to
                  His ministry while He was on the earth.
                </p>
                <p data-reveal style={{ ["--d" as string]: 160 }}>
                  Since the LORD has assigned us this task of raising disciples to fulfill their ministry, I
                  believe strongly that He has divinely positioned partners to give towards all we need for
                  the propagation of GOD’s Message in SaltCity Church.
                </p>
              </div>
              <div data-reveal style={{ ["--d" as string]: 200 }} className="mt-8 font-black tracking-tight">
                Pastor Tobore David
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What the Bible says */}
      <section className="bg-black text-white">
        <Container>
          <div className="py-24 md:py-32">
            <h2
              data-reveal
              className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
            >
              What the Bible Says About Giving
            </h2>
            <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-16">
              {SCRIPTURES.map((s, i) => (
                <blockquote
                  key={s.ref}
                  data-reveal
                  style={{ ["--d" as string]: i * 120 }}
                  className="border-t border-white/20 pt-8 text-xl font-bold leading-snug tracking-tight md:text-2xl"
                >
                  “{s.text}”
                  <footer className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
                    {s.ref}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Partnership structure */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-5">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
              >
                Partnership Structure
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 80 }}
                className="mt-7 max-w-[28rem] text-lg leading-relaxed text-black/65"
              >
                At SaltCity, we believe in partnership: walking together in faith and supporting God’s work
                through consistent, committed giving.
              </p>
            </div>
            <ol className="border-t border-black/10 md:col-span-7">
              {PARTNERSHIP.map((p, i) => (
                <li
                  key={p.title}
                  data-reveal
                  style={{ ["--d" as string]: i * 70 }}
                  className="flex gap-6 border-b border-black/10 py-7"
                >
                  <span className="pt-1.5 text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight md:text-3xl">{p.title}</h3>
                    <p className="mt-2 max-w-[32rem] text-base leading-relaxed text-black/65">{p.desc}</p>
                    <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                      {p.commit}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Ongoing projects */}
      <section className="bg-[#0b0b0b] text-white">
        <Container>
          <div className="py-24 md:py-32">
            <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end md:gap-16">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight md:col-span-7"
              >
                Ongoing Projects
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 100 }}
                className="text-lg leading-relaxed text-white/65 md:col-span-5"
              >
                Your giving is making these kingdom projects a reality. Join us in building for God’s glory.
              </p>
            </div>

            <div className="grid gap-14 md:grid-cols-3 md:gap-10">
              {PROJECTS.map((p, i) => (
                <div key={p.title} data-reveal style={{ ["--d" as string]: i * 100 }}>
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                    <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-white/45">
                      0{i + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                      {p.progress}% there
                    </span>
                  </div>
                  {/* How far along: a hairline that fills from the left. */}
                  <div aria-hidden="true" className="relative -mt-px h-px">
                    <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${p.progress}%` }} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black leading-snug tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/65">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Accounts */}
      <section id="accounts" className="scroll-mt-32 bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-40">
                <h2
                  data-reveal
                  className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
                >
                  Accounts to Give To
                </h2>
                <p
                  data-reveal
                  style={{ ["--d" as string]: 80 }}
                  className="mt-7 max-w-[24rem] text-lg leading-relaxed text-black/65"
                >
                  You can give directly to any of these accounts. Please send confirmation of payment to our
                  WhatsApp line.
                </p>
                <div data-reveal style={{ ["--d" as string]: 140 }} className="mt-8">
                  <a href={INFO_DESK.whatsapp} target="_blank" rel="noopener noreferrer" className="sc-link text-sm">
                    WhatsApp {INFO_DESK.display}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <AccountList />
            </div>
          </div>
        </Container>
      </section>

      <div className="border-t border-black/10">
        <NextPage label="Next" title="How to Give" href="/giving/ways" />
      </div>
      <HomeMotion />
    </main>
  );
}
