import "server-only";
import { getYoutubeSeries, youtubeConfigured, type YoutubeSeries } from "@/lib/youtube";
import { MEDIA_ITEMS, type MediaCategory, type MediaItem } from "./mediaData";

/**
 * Turns YouTube playlists into media items, so a new series shows up on the
 * site simply by existing on the channel. Hand-written entries in
 * mediaData.ts always win — a playlist that matches one of them is skipped.
 *
 * Control what appears with OVERRIDES below. Setup: docs/youtube-sync.md
 */
type Override = {
  /** Keep this playlist off the site. */
  hide?: boolean;
  /** Show it under a different heading than Sermon Series. */
  category?: MediaCategory;
  /** Use this instead of the playlist's own name. */
  title?: string;
  /** The paragraph under the title. YouTube descriptions rarely read well here. */
  summary?: string;
  /** Your own artwork (e.g. "/images/series/company-of-prophets.jpg"). */
  image?: string;
};

/**
 * Keyed by playlist name, loosely matched: case, punctuation and spacing are
 * ignored, so "A COMPANY OF PROPHETS" matches "a-company-of-prophets".
 */
const OVERRIDES: Record<string, Override> = {
  // "faith-fest-2025": { category: "the-faith-convention" },
  // "a-company-of-prophets": { summary: "Your own words here.", image: "/images/series/cop.jpg" },
};

/** Playlists whose names contain any of these are left off the site. */
const SKIP_WORDS = ["shorts", "trailer", "promo", "test"];

const DEFAULT_CATEGORY: MediaCategory = "sermon-series";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** For matching only: "THE INESCAPABLE WORK" and "Inescapable Work" are the same series. */
function matchKey(s: string) {
  return slugify(s).replace(/^the-/, "");
}

/**
 * A playlist description makes a far better summary than anything generated,
 * so it wins when there is one. Links, hashtags and boilerplate are dropped.
 */
function summaryFromDescription(description: string) {
  const first = description
    .split(/\n\s*\n/)[0]
    .split("\n")
    .filter((line) => !/https?:\/\/|^#|^subscribe\b|^follow us\b/i.test(line.trim()))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (first.length < 20) return null;
  if (first.length <= 400) return first;
  const cut = first.slice(0, 400);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** "NEW TESTAMENT GIVING" -> "New Testament Giving"; mixed-case names are left alone. */
export function tidyTitle(raw: string) {
  const name = raw.split("|")[0].trim();
  if (!/^[^a-z]*$/.test(name)) return name;
  const small = new Set(["a", "an", "and", "the", "of", "in", "on", "to", "for", "is", "or"]);
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

/** Strips "| SALTCITY CENTRAL" and the series name from an episode title. */
function tidyEpisodeTitle(raw: string, seriesTitle: string) {
  const first = raw.split("|")[0].trim();
  const cleaned = tidyTitle(first);
  return cleaned && cleaned.toLowerCase() !== seriesTitle.toLowerCase() ? cleaned : seriesTitle;
}

function toMediaItem(series: YoutubeSeries, override: Override): MediaItem {
  const title = override.title ?? tidyTitle(series.title);
  const image = override.image ?? series.thumbnail;
  const count = series.videos.length;

  return {
    category: override.category ?? DEFAULT_CATEGORY,
    slug: slugify(series.title),
    title,
    summary:
      override.summary ??
      summaryFromDescription(series.description) ??
      `${count} ${count === 1 ? "message" : "messages"} from the ${title} series, straight from our YouTube channel.`,
    heroImage: image,
    cardImage: image,
    primaryCta: {
      label: "Watch on YouTube",
      href: `https://www.youtube.com/playlist?list=${series.playlistId}`,
    },
    episodes: series.videos.map((v, i) => ({
      slug: v.videoId,
      title: tidyEpisodeTitle(v.title, title),
      part: `PART ${i + 1}`,
      duration: v.duration,
      image: v.thumbnail,
      youtubeID: v.videoId,
    })),
  };
}

/** Normalised names of the series already written by hand. */
function manualKeys() {
  const keys = new Set<string>();
  for (const item of MEDIA_ITEMS) {
    keys.add(matchKey(item.slug));
    keys.add(matchKey(item.title));
  }
  return keys;
}

/**
 * Hand-written items plus any playlist that isn't one of them, newest first.
 * Returns the hand-written list untouched when YouTube is off or unreachable.
 */
export async function getMediaItems(): Promise<MediaItem[]> {
  if (!youtubeConfigured()) return MEDIA_ITEMS;

  const series = await getYoutubeSeries();
  if (series.length === 0) return MEDIA_ITEMS;

  const taken = manualKeys();
  const added: MediaItem[] = [];

  for (const s of series) {
    const key = matchKey(s.title);
    const override = OVERRIDES[slugify(s.title)] ?? OVERRIDES[key] ?? {};
    const lower = s.title.toLowerCase();

    if (override.hide) continue;
    if (SKIP_WORDS.some((w) => lower.includes(w))) continue;
    if (taken.has(key)) continue; // already written by hand

    taken.add(key);
    added.push(toMediaItem(s, override));
  }

  // New series lead; everything already on the site keeps its order below.
  return [...added, ...MEDIA_ITEMS];
}

export async function getMediaItem(category: string, slug: string) {
  const items = await getMediaItems();
  return items.find((x) => x.category === category && x.slug === slug) ?? null;
}
