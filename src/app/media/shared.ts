import type { MediaItem } from "./mediaData";

/**
 * YouTube serves several sizes of every thumbnail. The full-size one is about
 * 250 KB, which is fine for one large picture and far too much for a grid of
 * ninety. "hqdefault" is about a tenth of that and always exists; it is 4:3
 * with black bars, which a 16:9 box set to cover crops away exactly.
 */
export function smallThumb(url: string) {
  return url.replace(/(i\.ytimg\.com\/vi\/[^/]+\/)[a-z0-9]+\.jpg/i, "$1hqdefault.jpg");
}

export function episodeThumb(youtubeID: string) {
  return `https://i.ytimg.com/vi/${youtubeID}/hqdefault.jpg`;
}

export function messageCount(item: MediaItem) {
  const n = item.episodes?.length ?? 0;
  if (n === 0) return "";
  return `${n} ${n === 1 ? "message" : "messages"}`;
}

/** Entries with nothing to play are placeholders and stay off the listings. */
export function hasContent(item: MediaItem) {
  return (item.episodes?.length ?? 0) > 0;
}

export type CardData = {
  title: string;
  href: string;
  image: string;
  meta: string;
};

export function toCard(item: MediaItem): CardData {
  return {
    title: item.title,
    href: `/media/${item.category}/${item.slug}`,
    image: smallThumb(item.cardImage),
    meta: messageCount(item),
  };
}
