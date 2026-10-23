import "server-only";

/**
 * Reads sermon series straight from the church's YouTube playlists.
 *
 * A playlist on the channel = a series on the site. Set YOUTUBE_API_KEY to
 * switch it on; without it every helper here returns nothing and the site
 * falls back to the hand-written entries in mediaData.ts.
 *
 * Setup: docs/youtube-sync.md
 */
const KEY = process.env.YOUTUBE_API_KEY ?? "";
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UCUO7U5yQxfcigge00IC4-JA";
const API = "https://www.googleapis.com/youtube/v3";

/** How long a page may serve cached YouTube data before refetching. */
export const YOUTUBE_REVALIDATE = 3600;
const MAX_VIDEOS_PER_SERIES = 200;

export const youtubeConfigured = () => Boolean(KEY);

export type YoutubeVideo = {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  publishedAt: string;
};

export type YoutubeSeries = {
  playlistId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videos: YoutubeVideo[];
};

type Thumbnails = Record<string, { url?: string } | undefined>;

function bestThumb(thumbs: Thumbnails | undefined): string {
  if (!thumbs) return "";
  for (const size of ["maxres", "standard", "high", "medium", "default"]) {
    const url = thumbs[size]?.url;
    if (url) return url;
  }
  return "";
}

/** "PT1H10M54S" -> "1:10:54", "PT9M5S" -> "9:05" */
export function formatDuration(iso: string | undefined): string {
  const m = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso ?? "");
  if (!m) return "";
  const [h, min, s] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)];
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
}

async function api<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const qs = new URLSearchParams({ ...params, key: KEY }).toString();
  const res = await fetch(`${API}/${path}?${qs}`, { next: { revalidate: YOUTUBE_REVALIDATE } });
  if (!res.ok) {
    // Quota exhausted, bad key, deleted playlist — log and let the caller fall back.
    console.error(`YouTube ${path} failed:`, res.status, (await res.text()).slice(0, 300));
    return null;
  }
  return (await res.json()) as T;
}

type PageOf<T> = { items?: T[]; nextPageToken?: string };

async function pages<T>(
  path: string,
  params: Record<string, string>,
  limit = 500
): Promise<T[]> {
  const out: T[] = [];
  let pageToken: string | undefined;
  do {
    const data: PageOf<T> | null = await api<PageOf<T>>(path, {
      ...params,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });
    if (!data) break;
    out.push(...(data.items ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken && out.length < limit);
  return out.slice(0, limit);
}

type PlaylistRow = {
  id: string;
  snippet?: { title?: string; description?: string; publishedAt?: string; thumbnails?: Thumbnails };
  contentDetails?: { itemCount?: number };
};

type PlaylistItemRow = {
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    thumbnails?: Thumbnails;
    resourceId?: { videoId?: string };
  };
  contentDetails?: { videoId?: string; videoPublishedAt?: string };
};

type VideoRow = { id: string; contentDetails?: { duration?: string } };

/** Every public playlist on the channel, newest first, with all of its videos. */
export async function getYoutubeSeries(): Promise<YoutubeSeries[]> {
  if (!youtubeConfigured()) return [];

  try {
    const playlists = await pages<PlaylistRow>("playlists", {
      part: "snippet,contentDetails",
      channelId: CHANNEL_ID,
    });

    const series = await Promise.all(
      playlists
        .filter((p) => (p.contentDetails?.itemCount ?? 0) > 0)
        .map(async (p) => {
          const videos = await getPlaylistVideos(p.id);
          return {
            playlistId: p.id,
            title: p.snippet?.title?.trim() ?? "",
            description: p.snippet?.description?.trim() ?? "",
            thumbnail: bestThumb(p.snippet?.thumbnails) || videos[0]?.thumbnail || "",
            publishedAt: videos[0]?.publishedAt ?? p.snippet?.publishedAt ?? "",
            videos,
          };
        })
    );

    return series
      .filter((s) => s.title && s.videos.length > 0)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (err) {
    console.error("YouTube series fetch threw:", err);
    return [];
  }
}

/** Videos of one playlist, in playlist order, with durations filled in. */
export async function getPlaylistVideos(playlistId: string): Promise<YoutubeVideo[]> {
  if (!youtubeConfigured()) return [];

  const items = await pages<PlaylistItemRow>(
    "playlistItems",
    { part: "snippet,contentDetails", playlistId },
    MAX_VIDEOS_PER_SERIES
  );

  const videos: YoutubeVideo[] = items
    .map((it) => ({
      videoId: it.contentDetails?.videoId ?? it.snippet?.resourceId?.videoId ?? "",
      title: it.snippet?.title?.trim() ?? "",
      description: it.snippet?.description?.trim() ?? "",
      thumbnail: bestThumb(it.snippet?.thumbnails),
      duration: "",
      publishedAt: it.contentDetails?.videoPublishedAt ?? it.snippet?.publishedAt ?? "",
    }))
    // Deleted and private videos come through with no title or no id.
    .filter((v) => v.videoId && v.title && v.title !== "Deleted video" && v.title !== "Private video");

  // Durations need a second call; 50 ids per request.
  const durations = new Map<string, string>();
  for (let i = 0; i < videos.length; i += 50) {
    const batch = videos.slice(i, i + 50).map((v) => v.videoId);
    const data = await api<{ items?: VideoRow[] }>("videos", {
      part: "contentDetails",
      id: batch.join(","),
    });
    for (const row of data?.items ?? []) {
      durations.set(row.id, formatDuration(row.contentDetails?.duration));
    }
  }

  return videos.map((v) => ({ ...v, duration: durations.get(v.videoId) ?? "" }));
}
