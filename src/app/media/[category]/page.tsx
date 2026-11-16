import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import { CATEGORY_META, type MediaCategory } from "../mediaData";
import { getMediaItems } from "../seriesFromYoutube";
import SeriesBrowser from "../SeriesBrowser";
import { hasContent, toCard } from "../shared";

// Refresh YouTube-backed series hourly (must be a literal for Next).
export const revalidate = 3600;

function isCategory(x: string): x is MediaCategory {
  return x in CATEGORY_META;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  return { title: CATEGORY_META[category].title, description: CATEGORY_META[category].subtitle };
}

export default async function MediaCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const meta = CATEGORY_META[category];
  const items = (await getMediaItems()).filter((x) => x.category === category && hasContent(x));

  return (
    <main data-home>
      <section className="bg-white">
        <Container>
          <div className="pb-12 pt-14 md:pb-16 md:pt-20">
            <Link
              href="/media"
              className="sc-fade sc-link text-xs uppercase tracking-[0.2em] text-black/60"
              style={{ ["--i" as string]: 0 }}
            >
              <span aria-hidden="true">←</span>
              Sermons
            </Link>
            <h1 className="mt-8 text-[clamp(3rem,10vw,8.5rem)] font-black leading-[0.88] tracking-tight">
              <span className="sc-line" style={{ ["--i" as string]: 0 }}>
                <span>{meta.title}</span>
              </span>
            </h1>
            <p
              className="sc-fade mt-7 max-w-[34rem] text-lg leading-relaxed text-black/70 md:text-xl"
              style={{ ["--i" as string]: 2 }}
            >
              {meta.subtitle}
            </p>
          </div>

          <div className="pb-24 md:pb-32">
            {items.length === 0 ? (
              <p className="border-t border-black/10 pt-10 text-lg text-black/60">
                Nothing here yet.{" "}
                <Link href="/media/sermon-series" className="sc-link text-black">
                  See the sermon series
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            ) : (
              <SeriesBrowser cards={items.map(toCard)} noun="series" />
            )}
          </div>
        </Container>
      </section>

      <HomeMotion />
    </main>
  );
}
