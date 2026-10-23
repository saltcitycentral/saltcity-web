import Link from "next/link";
import {
  CATEGORY_META,
  type MediaCategory,
  type MediaItem,
} from "../../mediaData";
import { getMediaItems } from "../../seriesFromYoutube";

// Refresh YouTube-backed series hourly (must be a literal for Next).
export const revalidate = 3600;

function isCategory(x: string): x is MediaCategory {
  return x in CATEGORY_META;
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

  if (!isCategory(category)) {
    return notFoundUI();
  }

  const meta = CATEGORY_META[category];
  const allItems = await getMediaItems();
  const item = allItems.find((x) => x.category === category && x.slug === slug);

  if (!item) {
    return notFoundUI();
  }

  // Find the episode to play based on the ?play= slug
  const activeEpisode = item.episodes?.find((ep) => ep.slug === play);

  const related = allItems
    .filter((x) => x.category === category && x.slug !== slug)
    .slice(0, 6);

  return (
    <main className="pb-16">
      {/* Video Player OR Banner */}
      <section className="bg-black">
        {activeEpisode && activeEpisode.youtubeID ? (
          <div className="mx-auto max-w-[1200px]">
            <div className="relative aspect-video w-full overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeEpisode.youtubeID}?autoplay=1&rel=0&modestbranding=1`}
                title={activeEpisode.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="h-[210px] w-full overflow-hidden opacity-80 sm:h-[350px]">
            <img
              src={item.heroImage}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </section>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Top section (title + summary) */}
        <div className="pt-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-black/60">
            <span>{meta.title.toUpperCase()}</span>
            {activeEpisode && (
              <>
                <span className="h-1 w-1 rounded-full bg-black/20" />
                <span className="text-sky-600">NOW PLAYING: {activeEpisode.part}</span>
              </>
            )}
          </div>

          <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-[40px]">
            {activeEpisode ? activeEpisode.title : item.title}
          </h1>

          <p className="mt-4 max-w-[760px] text-[16px] leading-[28px] text-black/70">
            {item.summary}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {item.primaryCta && !activeEpisode ? (
              <a
                href={item.primaryCta.href}
                className="rounded-full bg-black px-6 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-105"
              >
                {item.primaryCta.label}
              </a>
            ) : null}

            {item.secondaryCta ? (
              <a
                href={item.secondaryCta.href}
                className="rounded-full border border-black/15 px-6 py-2 text-[13px] font-semibold text-black hover:bg-black/5"
              >
                {item.secondaryCta.label}
              </a>
            ) : null}

            <Link
              href={`/media/${category}`}
              className="rounded-full border border-black/10 px-6 py-2 text-[13px] font-semibold text-black/70 hover:border-black/20"
            >
              View all {meta.title}
            </Link>
          </div>
        </div>

        {/* In This Series (Episode Switcher) */}
        <div className="mt-12">
          <div className="text-sm font-extrabold">In This Series</div>

          {item.episodes?.length ? (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {item.episodes.map((ep) => {
                const isActive = play === ep.slug;
                return (
                  <Link
                    key={ep.slug}
                    href={`/media/${category}/${slug}?play=${ep.slug}`}
                    scroll={false} // Prevents jarring scroll to top
                    className="group"
                  >
                    <div
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isActive 
                          ? "border-sky-500 ring-2 ring-sky-500/20" 
                          : "border-black/10 bg-white hover:border-black/30"
                      }`}
                      style={{ boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.15)" : "0 14px 34px rgba(0,0,0,0.12)" }}
                    >
                      <div className="relative h-[170px]">
                        <img
                          src={ep.image}
                          alt={ep.title}
                          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isActive ? 'opacity-40' : ''}`}
                        />
                        {/* Play Overlay for active item */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-sky-500 p-3 text-white">
                               <PlayIcon />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[11px] font-semibold text-white">
                          {ep.duration ?? "—"}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className={`text-[14px] font-extrabold leading-snug ${isActive ? 'text-sky-600' : ''}`}>
                          {ep.title}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[11px] font-semibold tracking-wide text-black/45">
                            {ep.part}
                          </span>
                          {isActive && <span className="text-[10px] font-bold text-sky-500 uppercase">Playing</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-black/10 bg-white p-6 text-black/70">
              No episodes available for this series.
            </div>
          )}
        </div>

        {/* Resources & Related - Same as before */}
        {item.resources?.length ? (
          <div className="mt-12 border-t border-black/5 pt-10">
            <div className="text-sm font-extrabold">Additional Resources</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.resources.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  className="rounded-full border border-black/15 px-5 py-2 text-xs font-semibold hover:border-black/25 transition-colors"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {related.length ? (
          <div className="mt-14 border-t border-black/5 pt-10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold">More from {meta.title}</div>
              <Link
                href={`/media/${category}`}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RelatedCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-14">
          <Link
            href="/media"
            className="text-sm font-semibold text-black/70 hover:text-black transition-colors"
          >
            ← Back to Media
          </Link>
        </div>
      </div>
    </main>
  );
}

// Small helper components
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function RelatedCard({ item }: { item: MediaItem }) {
  return (
    <Link href={`/media/${item.category}/${item.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white transition-all hover:shadow-md">
        <div className="h-[150px]">
          <img src={item.cardImage} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <div className="text-[14px] font-extrabold group-hover:text-sky-600 transition-colors line-clamp-1">{item.title}</div>
        </div>
      </div>
    </Link>
  );
}

function notFoundUI() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-20 text-center">
      <h1 className="text-4xl font-black">404</h1>
      <p className="mt-3 text-black/60">We couldn't find that message.</p>
      <Link
        href="/media"
        className="mt-8 inline-flex rounded-full bg-black px-8 py-3 text-sm font-bold text-white"
      >
        Back to Media
      </Link>
    </main>
  );
}