"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { Music2, Search, ArrowUpDown, ExternalLink } from "lucide-react";

/** ---------------------------------------
 *  DATA (Albums + Singles)
 *  Replace links and covers as you add them.
 *  --------------------------------------*/

type Platforms = {
  youtube?: string;
  youtubeMusic?: string;
  spotify?: string;
  appleMusic?: string;
};

type Track = {
  title: string;
  platforms: Platforms;
};

type Album = {
  id: string;
  title: string;
  year?: string;
  cover: string;
  tracks: Track[];
};

type Single = {
  id: string;
  title: string;
  cover: string;
  year?: string;
  platforms: Platforms;
};

const ALBUMS: Album[] = [
  {
    id: "surrender-live",
    title: "Surrender (Live)",
    year: "2026",
    cover: "/images/surrender.jpeg",
    tracks: [
      {
        title: "Surrender (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Let Your Presence Fall (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Invade Us (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Thirsty Lord (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "One Encounter (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Living Water (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Running After You (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Jesus Loves You (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Apple of His Eyes (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "All Yours (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Closer (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Altar (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Holy Ghost and Fire (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Miracles (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "All the Way (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Jesus (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "Matchless One (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
      {
        title: "One Mic (Live)",
        platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
      },
    ],
  },
];

const SINGLES: Single[] = [
  {
    id: "rest-all-over-live",
    title: "Rest All Over (Live)",
    year: "2026",
    cover: "/images/rest_all_over.jpeg",
    platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
  },
  {
    id: "make-me-wise-live",
    title: "Make Me Wise (Live)",
    year: "2026",
    cover: "/images/make-me-wise.jpeg",
    platforms: { youtube: "#", youtubeMusic: "#", spotify: "#", appleMusic: "#" },
  },
];

/** ---------------------------------------
 *  UI helpers
 *  --------------------------------------*/

type Tab = "albums" | "singles" | "all";
type SortMode = "newest" | "az";

const cx = (...s: Array<string | false | undefined | null>) => s.filter(Boolean).join(" ");

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function hasAnyLink(p: Platforms) {
  return Boolean(p.youtube || p.youtubeMusic || p.spotify || p.appleMusic);
}

function PlatformRow({ platforms }: { platforms: Platforms }) {
  const items: Array<{ key: keyof Platforms; label: string; icon: React.ReactNode }> = [
    { key: "youtube", label: "YouTube", icon: <YouTubeIcon /> },
    { key: "youtubeMusic", label: "YT Music", icon: <YouTubeMusicIcon /> },
    { key: "spotify", label: "Spotify", icon: <SpotifyIcon /> },
    { key: "appleMusic", label: "Apple", icon: <AppleMusicIcon /> },
  ];

  const links = items.filter((x) => Boolean(platforms[x.key]));

  if (!links.length) {
    return <div className="text-xs text-black/45">Links coming soon</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((x) => (
        <a
          key={x.key}
          href={platforms[x.key] as string}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/20 hover:text-black transition"
          title={x.label}
        >
          <span className="h-4 w-4">{x.icon}</span>
          <span>{x.label}</span>
          <ExternalLink size={14} className="opacity-40" />
        </a>
      ))}
    </div>
  );
}

function PillTabs({
  value,
  onChange,
}: {
  value: Tab;
  onChange: (v: Tab) => void;
}) {
  const items: Array<{ key: Tab; label: string }> = [
    { key: "albums", label: "Albums" },
    { key: "singles", label: "Singles" },
    { key: "all", label: "All" },
  ];

  return (
    <div className="inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
      {items.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={cx(
            "rounded-full px-4 py-2 text-sm font-semibold transition",
            value === t.key
              ? "bg-black text-white"
              : "text-black/70 hover:text-black hover:bg-black/5"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function SortButton({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (v: SortMode) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value === "newest" ? "az" : "newest")}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 hover:text-black hover:border-black/20 transition"
      title="Sort"
    >
      <ArrowUpDown size={16} />
      {value === "newest" ? "Newest" : "A–Z"}
    </button>
  );
}

/** ---------------------------------------
 *  PAGE
 *  --------------------------------------*/

export default function SongsPage() {
  const [tab, setTab] = useState<Tab>("albums");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");

  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const activeAlbum = useMemo(
    () => ALBUMS.find((a) => a.id === activeAlbumId) || null,
    [activeAlbumId]
  );

  const q = normalize(query);

  const filteredAlbums = useMemo(() => {
    const base = ALBUMS.filter((a) => {
      if (!q) return true;
      const inTitle = normalize(a.title).includes(q);
      const inTrack = a.tracks.some((t) => normalize(t.title).includes(q));
      return inTitle || inTrack;
    });

    const sorted = [...base].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      // "newest": year desc fallback to title
      const ay = Number(a.year || 0);
      const by = Number(b.year || 0);
      if (by !== ay) return by - ay;
      return a.title.localeCompare(b.title);
    });

    return sorted;
  }, [q, sort]);

  const filteredSingles = useMemo(() => {
    const base = SINGLES.filter((s) => {
      if (!q) return true;
      return normalize(s.title).includes(q);
    });

    const sorted = [...base].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const ay = Number(a.year || 0);
      const by = Number(b.year || 0);
      if (by !== ay) return by - ay;
      return a.title.localeCompare(b.title);
    });

    return sorted;
  }, [q, sort]);

  const showAlbums = tab === "albums" || tab === "all";
  const showSingles = tab === "singles" || tab === "all";

  return (
    <main>
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <Container>
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Music2 size={24} className="text-white" />
              <span className="text-white font-semibold">SaltWorship</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Our Songs
            </h1>

            <p className="text-xl text-white/90 leading-relaxed">
              Find an album, open it, and listen on your platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://youtube.com/@saltcitycentral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                <span className="h-5 w-5 text-black">
                  <YouTubeIcon />
                </span>
                Follow on YouTube
              </a>

              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                <span className="h-5 w-5 text-white">
                  <SpotifyIcon />
                </span>
                Spotify
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                <span className="h-5 w-5 text-white">
                  <AppleMusicIcon />
                </span>
                Apple Music
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTROLS */}
      <section className="py-10 bg-white border-b border-black/10">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <PillTabs value={tab} onChange={setTab} />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div className="relative w-full sm:w-[360px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search songs or albums…"
                  className="w-full rounded-full border border-black/10 bg-white pl-11 pr-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-4 focus:ring-black/10"
                />
              </div>

              <SortButton value={sort} onChange={setSort} />
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <div className="space-y-14">
            {/* ALBUMS */}
            {showAlbums && (
              <div>
                <div className="flex items-end justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black">
                      Albums
                    </h2>
                    <p className="mt-1 text-sm text-black/60">
                      Open an album to see every track.
                    </p>
                  </div>

                  <div className="text-sm text-black/60">
                    {filteredAlbums.length} item{filteredAlbums.length === 1 ? "" : "s"}
                  </div>
                </div>

                {filteredAlbums.length === 0 ? (
                  <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
                    No albums match your search.
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAlbums.map((album) => (
                      <button
                        key={album.id}
                        type="button"
                        onClick={() => setActiveAlbumId(album.id)}
                        className={cx(
                          "group text-left rounded-2xl border border-black/10 bg-white overflow-hidden",
                          "shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.14)]",
                          "transition-all duration-300 hover:-translate-y-1"
                        )}
                      >
                        <div className="relative aspect-square bg-neutral-200">
                          <img
                            src={album.cover}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-xs font-semibold text-white/90">
                              {album.tracks.length} tracks
                            </div>
                            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                              Open
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-lg font-bold text-black leading-snug">
                                {album.title}
                              </div>
                              <div className="mt-1 text-xs text-black/55">
                                {album.year ? `${album.year} • ` : ""}
                                {album.tracks.length} tracks
                              </div>
                            </div>

                            <div className="shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                              Album
                            </div>
                          </div>

                          <div className="mt-4 text-sm text-black/60">
                            Tap to view tracklist.
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SINGLES */}
            {showSingles && (
              <div>
                <div className="flex items-end justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black">
                      Singles
                    </h2>
                    <p className="mt-1 text-sm text-black/60">
                      Quick picks, one track at a time.
                    </p>
                  </div>

                  <div className="text-sm text-black/60">
                    {filteredSingles.length} item{filteredSingles.length === 1 ? "" : "s"}
                  </div>
                </div>

                {filteredSingles.length === 0 ? (
                  <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70">
                    No singles match your search.
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSingles.map((s) => (
                      <div
                        key={s.id}
                        className={cx(
                          "rounded-2xl border border-black/10 bg-white overflow-hidden",
                          "shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                        )}
                      >
                        <div className="relative aspect-square bg-neutral-200">
                          <img
                            src={s.cover}
                            alt={s.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-lg font-bold text-black leading-snug">
                                {s.title}
                              </div>
                              <div className="mt-1 text-xs text-black/55">
                                {s.year ? s.year : "Single"}
                              </div>
                            </div>

                            <div className="shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                              Single
                            </div>
                          </div>

                          <div className="mt-4">
                            <PlatformRow platforms={s.platforms} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              Want More Worship?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Subscribe to our channels so you never miss a release.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://youtube.com/@saltcitycentral?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Subscribe on YouTube
              </a>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ALBUM MODAL */}
      
      <Modal
        open={Boolean(activeAlbum)}
        title={activeAlbum?.title ?? "Album"}
        description={
          activeAlbum
            ? `${activeAlbum.year ? activeAlbum.year + " • " : ""}${activeAlbum.tracks.length} tracks`
            : undefined
        }
        onClose={() => setActiveAlbumId(null)}
        footer={
          <div className="text-xs text-black/60">
            Tap a platform to listen. Missing links mean it’s not uploaded yet.
          </div>
        }
      >
        {activeAlbum ? (
          <div className="space-y-5">
            {/* Header row: small cover + meta */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="w-full sm:w-[120px]">
                <div className="aspect-square overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
                  <img
                    src={activeAlbum.cover}
                    alt={activeAlbum.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm font-semibold text-black/80">Album</div>
                <div className="mt-1 text-xs text-black/60">
                  {activeAlbum.year ? `${activeAlbum.year} • ` : ""}
                  {activeAlbum.tracks.length} tracks
                </div>
                <div className="mt-3 text-sm text-black/70">
                  Tracklist
                </div>
              </div>
            </div>

            {/* Track list: scroll inside modal */}
            <div className="max-h-[60vh] overflow-y-auto pr-1">
              <div className="space-y-3">
{activeAlbum.tracks.map((t, i) => {
  const hasLinks = Boolean(
    t.platforms.youtube ||
      t.platforms.youtubeMusic ||
      t.platforms.spotify ||
      t.platforms.appleMusic
  );

  return (
    <div
      key={`${activeAlbum.id}-${t.title}-${i}`}
      className="rounded-2xl border border-black/10 bg-white px-4 py-3"
    >
      {/* Number + Title */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5 text-sm font-semibold text-black/50">
          {String(i + 1).padStart(2, "0")}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-black leading-snug">
            {t.title}
          </div>

          {/* Links (always below title) */}
          <div className="mt-3">
            {!hasLinks ? (
              <div className="text-xs text-black/45">Links coming soon</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {t.platforms.youtube ? (
                  <a
                    href={t.platforms.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/20 hover:text-black transition"
                  >
                    <span className="h-4 w-4"><YouTubeIcon /></span>
                    YouTube
                    <ExternalLink size={14} className="opacity-40" />
                  </a>
                ) : null}

                {t.platforms.youtubeMusic ? (
                  <a
                    href={t.platforms.youtubeMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/20 hover:text-black transition"
                  >
                    <span className="h-4 w-4"><YouTubeMusicIcon /></span>
                    YT Music
                    <ExternalLink size={14} className="opacity-40" />
                  </a>
                ) : null}

                {t.platforms.spotify ? (
                  <a
                    href={t.platforms.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/20 hover:text-black transition"
                  >
                    <span className="h-4 w-4"><SpotifyIcon /></span>
                    Spotify
                    <ExternalLink size={14} className="opacity-40" />
                  </a>
                ) : null}

                {t.platforms.appleMusic ? (
                  <a
                    href={t.platforms.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/20 hover:text-black transition"
                  >
                    <span className="h-4 w-4"><AppleMusicIcon /></span>
                    Apple
                    <ExternalLink size={14} className="opacity-40" />
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
})}

              </div>
            </div>
          </div>
        ) : null}
      </Modal>

    </main>
  );
}

/** ---------------------------------------
 *  Platform icons (small, inline)
 *  --------------------------------------*/

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function YouTubeMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-11.904C9.684 7.2 7.8 9.084 7.8 11.4c0 1.392.684 2.628 1.74 3.384l5.46-3.156V8.844c-.54-.42-1.176-.744-1.884-.864-.252-.048-.516-.072-.78-.072-.18 0-.36.012-.54.036z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.135-.04 0-.083.005-.124.005H5.988c-.152 0-.303.01-.452.01-.536 0-1.058.06-1.57.18-.47.106-1.028.287-1.438.525-1.11.646-1.85 1.67-2.167 2.98-.184.77-.257 1.56-.257 2.355v11.736c0 .747.058 1.496.232 2.228.303 1.28 1.048 2.29 2.155 3.023.586.387 1.214.605 1.893.725.495.087.98.118 1.474.118h12.02c.593 0 1.181-.04 1.77-.15.68-.124 1.304-.34 1.89-.73 1.11-.733 1.854-1.743 2.168-3.024.174-.732.232-1.48.232-2.228V6.124z" />
    </svg>
  );
}
