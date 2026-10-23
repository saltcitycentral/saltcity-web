import MediaRail from "@/app/media/MediaRail";
import { CATEGORY_META, type MediaCategory } from "./mediaData";
import { getMediaItems } from "./seriesFromYoutube";
import { YOUTUBE_REVALIDATE } from "@/lib/youtube";

export const revalidate = YOUTUBE_REVALIDATE;

type RailConfig = {
  cardWidth: number;
  cardHeight: number;
  theme?: "light" | "dark";
};

const RAIL_CONFIG: Record<MediaCategory, RailConfig> = {
  "sermon-series": { cardWidth: 380, cardHeight: 220, theme: "light" },
  songs: { cardWidth: 280, cardHeight: 280, theme: "dark" },
  devotionals: { cardWidth: 380, cardHeight: 220, theme: "light" },
  "e-books": { cardWidth: 320, cardHeight: 220, theme: "light" },
  "school-of-ministry": { cardWidth: 380, cardHeight: 220, theme: "dark" },
  "the-faith-convention": { cardWidth: 380, cardHeight: 220, theme: "dark" },
  "faith-seminars": { cardWidth: 380, cardHeight: 220, theme: "light" },
  "school-of-marriage": { cardWidth: 380, cardHeight: 220, theme: "light" },
};

const CATEGORY_ORDER: MediaCategory[] = [
  "sermon-series",
  "songs",
  "devotionals",
  "e-books",
  "school-of-ministry",
  "the-faith-convention",
  "faith-seminars",
  "school-of-marriage",
];

export default async function MediaPage() {
  const all = await getMediaItems();

  return (
    <main className="pb-16">
      {CATEGORY_ORDER.map((cat) => {
        const meta = CATEGORY_META[cat];
        const cfg = RAIL_CONFIG[cat];

        const items = all.filter((x) => x.category === cat).map((x) => ({
          title: x.title,
          href: `/media/${x.category}/${x.slug}`,
          image: x.cardImage,
        }));

        return (
          <MediaRail
            key={cat}
            title={meta.title}
            subtitle={meta.subtitle}
            viewAllHref={`/media/${cat}`}
            items={items}
            cardWidth={cfg.cardWidth}
            cardHeight={cfg.cardHeight}
            theme={cfg.theme ?? meta.theme ?? "light"}
          />
        );
      })}
    </main>
  );
}
