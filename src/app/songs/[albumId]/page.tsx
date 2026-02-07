"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ALBUMS } from "../songsData";

/** ---------------------------------------
 * SIMPLE PLATFORM ICONS
 * --------------------------------------*/

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

type PlatformKey = "youtube" | "spotify" | "appleMusic";

interface PlatformData {
  youtube?: string;
  spotify?: string;
  appleMusic?: string;
}

// Fixed the return type from JSX.Element to React.ReactNode
function getPlatformItems(platforms: PlatformData | undefined) {
  const items: Array<{ key: PlatformKey; label: string; icon: React.ReactNode; url: string }> = [];

  if (platforms?.youtube) items.push({ key: "youtube", label: "YouTube", icon: <YouTubeIcon />, url: platforms.youtube });
  if (platforms?.spotify) items.push({ key: "spotify", label: "Spotify", icon: <SpotifyIcon />, url: platforms.spotify });
  if (platforms?.appleMusic) items.push({ key: "appleMusic", label: "Apple Music", icon: <AppleMusicIcon />, url: platforms.appleMusic });

  return items;
}

export default function AlbumDetailPage() {
  const params = useParams();
  const albumId = params?.albumId as string;

  const album = useMemo(() => ALBUMS.find((a) => a.id === albumId) ?? null, [albumId]);

  const [openTrackIndex, setOpenTrackIndex] = useState<number | null>(null);

  if (!album) {
    return (
      <main className="bg-white min-h-screen">
        <Container>
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold text-black mb-4">Album not found</h1>
            <Link
              href="/songs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Songs
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Back Navigation */}
      <div className="border-b border-black/5 bg-white sticky top-[73px] z-20">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <Link
              href="/songs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/60 hover:text-black transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Songs
            </Link>

            <div className="text-xs font-semibold text-black/40">
              {album.tracks.length} tracks
            </div>
          </div>
        </Container>
      </div>

      {/* Album Header */}
      <section className="py-14 md:py-18 bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[340px_1fr] items-start">
            <div className="w-full max-w-[340px] mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={340}
                  height={340}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-widest text-black/40 mb-3">
                ALBUM
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                {album.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-black/60">
                <span className="font-semibold text-black/70">SaltCity Worship</span>
                <span>•</span>
                <span>{album.year ?? "—"}</span>
                <span>•</span>
                <span>{album.tracks.length} tracks</span>
              </div>

              {album.description ? (
                <p className="mt-6 text-base text-black/70 leading-relaxed max-w-2xl">
                  {album.description}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {/* Tracklist */}
      <section className="py-14 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-black">Tracklist</h2>
              <div className="text-sm text-black/50">
                Tap “Listen” only when you need links
              </div>
            </div>

            <div className="divide-y divide-black/10 rounded-2xl border border-black/10 overflow-hidden bg-white">
              {album.tracks.map((track, index) => {
                const items = getPlatformItems(track.platforms);
                const isOpen = openTrackIndex === index;

                return (
                  <div key={`${album.id}-${index}`} className="relative">
                    <div className="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                      <div className="w-10 shrink-0 text-sm font-bold text-black/35">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-base md:text-lg font-semibold text-black line-clamp-1">
                          {track.title}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {items.length === 0 ? (
                          <div className="text-xs font-semibold text-black/35">
                            Links soon
                          </div>
                        ) : (
                          <button
                            onClick={() => setOpenTrackIndex(isOpen ? null : index)}
                            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-neutral-50 hover:border-black/25 transition"
                          >
                            Listen
                            <span className="text-black/35">({items.length})</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isOpen && items.length > 0 && (
                      <div className="px-5 pb-5 md:px-6">
                        <div className="rounded-xl border border-black/10 bg-neutral-50 p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs font-semibold text-black/50">
                              Choose a platform
                            </div>
                            <button
                              onClick={() => setOpenTrackIndex(null)}
                              className="inline-flex items-center gap-2 text-xs font-semibold text-black/60 hover:text-black transition"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {items.map((p) => (
                              <a
                                key={p.key}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white border border-black/10 px-3 py-2 text-xs font-semibold text-black/70 hover:border-black/25 hover:bg-white transition"
                              >
                                <span className="h-4 w-4">{p.icon}</span>
                                {p.label}
                                <ExternalLink className="h-3 w-3 opacity-50" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Explore More Music
            </h2>
            <p className="text-base text-black/60 mb-8">
              Discover more worship songs and albums
            </p>
            <Link
              href="/songs"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-base font-semibold text-white hover:bg-black/90 transition"
            >
              View All Songs
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}