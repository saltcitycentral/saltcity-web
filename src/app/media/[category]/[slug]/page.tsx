import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import { CATEGORY_META, type MediaCategory } from "../../mediaData";
import { getMediaItems } from "../../seriesFromYoutube";
import SeriesCard from "../../SeriesCard";
import { episodeThumb, hasContent, messageCount, toCard } from "../../shared";

// Refresh YouTube-backed series hourly (must be a literal for Next).
export const revalidate = 3600;

function isCategory(x: string): x is MediaCategory {
  return x in CATEGORY_META;
}

function isReal(href: string | undefined): href is string {
  return Boolean(href) && href !== "#";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const item = (await getMediaItems()).find((x) => x.category === category && x.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function MediaDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ play?: string }>;
}) {
  const { category, slug } = await params;
  const { play } = await searchParams;

  if (!isCategory(category)) notFound();

  const meta = CATEGORY_META[category];
  const allItems = await getMediaItems();
  const item = allItems.find((x) => x.category === category && x.slug === slug);
  if (!item) notFound();

  const episodes = item.episodes ?? [];
  const activeIndex = play ? episodes.findIndex((ep) => ep.slug === play) : -1;
  const active = activeIndex >= 0 ? episodes[activeIndex] : null;
  const first = episodes[0];
  const base = `/media/${category}/${slug}`;

  const related = allItems
    .filter((x) => x.category === category && x.slug !== slug && hasContent(x))
    .slice(0, 3);

  return (
    <main data-home>
      {/* The player, or the artwork with a way in */}
      <section className="bg-black text-white">
        <Container>
          <div className="pb-12 pt-8 md:pb-16 md:pt-10">
            <Link
              href={`/media/${category}`}
              className="sc-fade sc-link text-xs uppercase tracking-[0.2em] text-white/60"
              style={{ ["--i" as string]: 0 }}
            >
              <span aria-hidden="true">←</span>
              {meta.title}
            </Link>

            <div className="mt-8 grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={active ? "lg:col-span-12" : "lg:col-span-7"}>
                <div className="relative aspect-video overflow-hidden bg-white/10">
                  {active ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${active.youtubeID}?autoplay=1&rel=0&modestbranding=1`}
                      title={active.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="sc-hero-settle">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.heroImage} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className={active ? "lg:col-span-9" : "lg:col-span-5"}>
                <div
                  className="sc-fade text-xs font-bold uppercase tracking-[0.24em] text-white/55"
                  style={{ ["--i" as string]: 1 }}
                >
                  {active
                    ? `${item.title} · Part ${activeIndex + 1} of ${episodes.length}`
                    : messageCount(item) || meta.title}
                </div>
                <h1 className="mt-4 text-[clamp(2.25rem,5vw,4.25rem)] font-black leading-[0.98] tracking-tight">
                  <span className="sc-line" style={{ ["--i" as string]: 1 }}>
                    <span>{active ? active.title : item.title}</span>
                  </span>
                </h1>
                <p
                  className="sc-fade mt-6 max-w-[40rem] text-lg leading-relaxed text-white/70"
                  style={{ ["--i" as string]: 3 }}
                >
                  {item.summary}
                </p>

                <div
                  className="sc-fade mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
                  style={{ ["--i" as string]: 4 }}
                >
                  {!active && first ? (
                    <Link
                      href={`${base}?play=${first.slug}`}
                      scroll={false}
                      className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
                    >
                      <PlayIcon />
                      Play part 1
                    </Link>
                  ) : null}
                  {isReal(item.primaryCta?.href) ? (
                    <a
                      href={item.primaryCta!.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-link text-sm text-white"
                    >
                      {item.primaryCta!.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {isReal(item.secondaryCta?.href) ? (
                    <a
                      href={item.secondaryCta!.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sc-link text-sm text-white"
                    >
                      {item.secondaryCta!.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The messages, in order */}
      <section className="bg-white">
        <Container>
          <div className="py-20 md:py-28">
            <h2
              data-reveal
              className="mb-8 text-[clamp(2.25rem,5.4vw,4.5rem)] font-black leading-[0.95] tracking-tight"
            >
              In This Series
            </h2>

            {episodes.length ? (
              <ol className="border-t border-black/10">
                {episodes.map((ep, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={`${ep.slug}-${i}`} data-reveal style={{ ["--d" as string]: Math.min(i, 6) * 50 }}>
                      <Link
                        href={`${base}?play=${ep.slug}`}
                        aria-current={isActive ? "true" : undefined}
                        className="sc-step group"
                        style={{ padding: "1.1rem 0", gap: "1.25rem" }}
                      >
                        <span className="hidden w-8 text-xs font-bold tabular-nums tracking-[0.2em] text-black/40 sm:block">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="relative block aspect-video w-28 shrink-0 overflow-hidden bg-neutral-200 sm:w-40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ep.youtubeID ? episodeThumb(ep.youtubeID) : ep.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                          {isActive ? (
                            <span className="absolute inset-0 grid place-items-center bg-black/60 text-white">
                              <PlayIcon />
                            </span>
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-black leading-snug tracking-tight md:text-xl">
                            {ep.title}
                          </span>
                          <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                            {isActive ? "Now playing" : `Part ${i + 1}`}
                            {ep.duration ? ` · ${ep.duration}` : ""}
                          </span>
                        </span>
                        <span className="sc-step-arrow hidden sm:grid" aria-hidden="true">
                          <PlayIcon />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="border-t border-black/10 pt-10 text-lg text-black/60">
                No messages are available for this series yet.
              </p>
            )}

            {item.resources?.filter((r) => isReal(r.href)).length ? (
              <div className="mt-16">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-black/50">
                  Additional resources
                </div>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                  {item.resources
                    .filter((r) => isReal(r.href))
                    .map((r) => (
                      <a key={r.label} href={r.href} className="sc-link text-sm">
                        {r.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="border-t border-black/10 bg-white">
          <Container>
            <div className="py-20 md:py-28">
              <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                <h2
                  data-reveal
                  className="text-[clamp(2.25rem,5.4vw,4.5rem)] font-black leading-[0.95] tracking-tight"
                >
                  More {meta.title}
                </h2>
                <div data-reveal style={{ ["--d" as string]: 100 }}>
                  <Link href={`/media/${category}`} className="sc-link text-sm">
                    View all
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                {related.map((r, i) => (
                  <SeriesCard key={r.slug} card={toCard(r)} delay={i * 70} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <HomeMotion />
    </main>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
