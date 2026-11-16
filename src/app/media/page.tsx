import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import { CATEGORY_META, type MediaCategory } from "./mediaData";
import { getMediaItems } from "./seriesFromYoutube";
import SeriesCard from "./SeriesCard";
import { hasContent, messageCount, toCard } from "./shared";

// Refresh YouTube-backed series hourly (must be a literal for Next).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sermons",
  description: "Scripture-rich teaching that builds conviction and trains believers for victory.",
};

const CATEGORY_ORDER: MediaCategory[] = [
  "sermon-series",
  "the-faith-convention",
  "faith-seminars",
  "school-of-ministry",
  "school-of-marriage",
  "devotionals",
  "songs",
  "e-books",
];

const ELSEWHERE = [
  { label: "Watch live", note: "Services on our YouTube channel", href: "https://www.youtube.com/@saltcitycentral" },
  { label: "Listen", note: "Messages on Telegram", href: "https://t.me/mysaltcity" },
  { label: "Songs", note: "Worship and sound doctrine", href: "/songs" },
  { label: "Resources", note: "Tools and guides to grow", href: "/resources" },
];

export default async function MediaPage() {
  const all = (await getMediaItems()).filter(hasContent);

  const series = all.filter((x) => x.category === "sermon-series");
  const featured = series[0];
  const featuredHref = featured ? `/media/${featured.category}/${featured.slug}` : "";

  const groups = CATEGORY_ORDER.map((cat) => {
    const items = all.filter((x) => x.category === cat);
    // The featured series has its own block above; don't show it twice.
    const rest = cat === "sermon-series" ? items.slice(1) : items;
    return { cat, meta: CATEGORY_META[cat], total: items.length, items: rest.slice(0, 6) };
  }).filter((g) => g.items.length > 0);

  return (
    <main data-home>
      {/* Opening */}
      <section className="bg-white">
        <Container>
          <div className="pb-14 pt-16 md:pb-20 md:pt-24">
            <div
              className="sc-fade text-xs font-bold uppercase tracking-[0.28em] text-black/50"
              style={{ ["--i" as string]: 0 }}
            >
              Media
            </div>
            <h1 className="mt-5 text-[clamp(3.5rem,13vw,11rem)] font-black leading-[0.86] tracking-tight">
              <span className="sc-line" style={{ ["--i" as string]: 0 }}>
                <span>Sermons</span>
              </span>
            </h1>
            <p
              className="sc-fade mt-8 max-w-[34rem] text-lg leading-relaxed text-black/70 md:text-xl"
              style={{ ["--i" as string]: 2 }}
            >
              {CATEGORY_META["sermon-series"].subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* The newest series */}
      {featured ? (
        <section className="bg-black text-white">
          <Container>
            <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-14 md:py-24">
              <Link href={featuredHref} className="group block md:col-span-7" data-reveal="shutter">
                <div className="relative aspect-video overflow-hidden bg-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.heroImage}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
              </Link>

              <div className="md:col-span-5">
                <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-white/55">
                  Latest series
                </div>
                <h2
                  data-reveal
                  style={{ ["--d" as string]: 80 }}
                  className="mt-5 text-[clamp(2.25rem,4.6vw,4rem)] font-black leading-[0.98] tracking-tight"
                >
                  {featured.title}
                </h2>
                <p
                  data-reveal
                  style={{ ["--d" as string]: 160 }}
                  className="mt-6 line-clamp-4 text-lg leading-relaxed text-white/70"
                >
                  {featured.summary}
                </p>
                <div
                  data-reveal
                  style={{ ["--d" as string]: 240 }}
                  className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
                >
                  <Link
                    href={featuredHref}
                    className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
                  >
                    Watch the series
                  </Link>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    {messageCount(featured)}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Each kind of teaching that has something in it */}
      {groups.map((g) => (
        <section key={g.cat} className="border-b border-black/10 bg-white">
          <Container>
            <div className="py-20 md:py-28">
              <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-16">
                <div>
                  <h2
                    data-reveal
                    className="text-[clamp(2.25rem,5.4vw,4.5rem)] font-black leading-[0.95] tracking-tight"
                  >
                    {g.meta.title}
                  </h2>
                  {g.cat !== "sermon-series" ? (
                    <p data-reveal style={{ ["--d" as string]: 80 }} className="mt-5 max-w-[32rem] text-lg text-black/65">
                      {g.meta.subtitle}
                    </p>
                  ) : null}
                </div>
                <div data-reveal style={{ ["--d" as string]: 120 }}>
                  <Link href={`/media/${g.cat}`} className="sc-link text-sm">
                    All {g.total}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {g.items.map((item, i) => (
                  <SeriesCard key={item.slug} card={toCard(item)} delay={(i % 3) * 70} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Other places to watch and listen */}
      <section className="bg-white">
        <Container>
          <div className="py-20 md:py-28">
            <h2
              data-reveal
              className="mb-8 text-[clamp(2.25rem,5.4vw,4.5rem)] font-black leading-[0.95] tracking-tight"
            >
              More
            </h2>
            <div className="border-t border-black/10">
              {ELSEWHERE.map((x, i) => {
                const inner = (
                  <>
                    <span className="w-8 text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-2xl font-black tracking-tight md:text-3xl">{x.label}</span>
                      <span className="mt-1 block text-base text-black/60">{x.note}</span>
                    </span>
                    <span className="sc-step-arrow" aria-hidden="true">
                      →
                    </span>
                  </>
                );
                return (
                  <div key={x.label} data-reveal style={{ ["--d" as string]: i * 60 }}>
                    {x.href.startsWith("http") ? (
                      <a href={x.href} target="_blank" rel="noopener noreferrer" className="sc-step">
                        {inner}
                      </a>
                    ) : (
                      <Link href={x.href} className="sc-step">
                        {inner}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <HomeMotion />
    </main>
  );
}
