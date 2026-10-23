import Link from "next/link";
import { CATEGORY_META, type MediaCategory } from "../mediaData";
import { getMediaItems } from "../seriesFromYoutube";
import { YOUTUBE_REVALIDATE } from "@/lib/youtube";

export const revalidate = YOUTUBE_REVALIDATE;

function isCategory(x: string): x is MediaCategory {
  return x in CATEGORY_META;
}

export default async function MediaCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isCategory(category)) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-12">
        <h1 className="text-3xl font-extrabold">Not found</h1>
        <p className="mt-3 text-black/70">Unknown media category.</p>
      </main>
    );
  }

  const meta = CATEGORY_META[category];
  const items = (await getMediaItems()).filter((x) => x.category === category);

  const isDark = meta.theme === "dark";

  return (
    <main className="pb-16">
      {/* Hero */}
      <section
        className={[
          "border-b",
          isDark ? "bg-black text-white border-white/10" : "bg-white text-black border-black/10",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="text-xs font-semibold tracking-wide opacity-70">
            {meta.title.toUpperCase()}
          </div>

          <h1 className="mt-3 text-[44px] font-extrabold leading-[1.05] tracking-tight">
            {meta.title}
          </h1>

          <p className={["mt-4 max-w-[720px] text-[16px] leading-[28px]", isDark ? "text-white/80" : "text-black/70"].join(" ")}>
            {meta.subtitle}
          </p>

          {/* Simple “chips” row (optional) */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className={chipClass(isDark)}>Latest</span>
            <span className={chipClass(isDark)}>Most Played</span>
            <span className={chipClass(isDark)}>Topics</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1200px] px-6 pt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold">All {meta.title}</h2>

          <Link
            href="/media"
            className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold hover:border-black/25"
          >
            Back to Media
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 text-black/70">
            No items yet. Add entries in <code>mediaData.ts</code>.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <Link
                key={it.slug}
                href={`/media/${it.category}/${it.slug}`}
                className="group"
              >
                <div
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white"
                  style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.12)" }}
                >
                  <div className="relative h-[200px]">
                    <img
                      src={it.cardImage}
                      alt={it.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="text-sm font-extrabold">{it.title}</div>
                    <div className="mt-2 text-sm leading-[22px] text-black/70 line-clamp-3">
                      {it.summary}
                    </div>

                    <div className="mt-4 text-xs font-semibold text-black/60">
                      {it.episodes?.length ? `${it.episodes.length} items` : "Open"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function chipClass(isDark: boolean) {
  return [
    "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold",
    "border",
    isDark ? "border-white/20 bg-white/10 text-white" : "border-black/15 bg-black/5 text-black",
  ].join(" ");
}
