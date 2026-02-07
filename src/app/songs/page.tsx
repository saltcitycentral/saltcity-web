// src/app/songs/page.tsx

import Container from "@/components/ui/Container";
import Link from "next/link";
import { Music2 } from "lucide-react";
import Image from "next/image";
import { ALBUMS, SINGLES } from "./songsData";

/** ---------------------------------------
 *  PLATFORM ICONS
 *  --------------------------------------*/

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

export default function SongsPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />

        <Container>
          <div className="relative py-20 md:py-28 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2.5 mb-6">
              <Music2 className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white">SaltWorship</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Our Songs
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Worship music from our live gatherings. Listen on your favorite platform.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://youtube.com/@saltcitycentral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition shadow-lg"
              >
                <span className="h-5 w-5">
                  <YouTubeIcon />
                </span>
                YouTube
              </a>

              <a
                href="https://open.spotify.com/user/mysaltcity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/25 transition"
              >
                <span className="h-5 w-5">
                  <SpotifyIcon />
                </span>
                Spotify
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/25 transition"
              >
                <span className="h-5 w-5">
                  <AppleMusicIcon />
                </span>
                Apple Music
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ALBUMS */}
      {ALBUMS.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                Albums
              </h2>
              <p className="mt-2 text-base text-black/60">
                Full collections from our live worship sessions
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {ALBUMS.map((album) => (
                <Link
                  key={album.id}
                  href={`/songs/${album.id}`}
                  className="group text-left rounded-2xl bg-white border border-black/10 overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={album.id === ALBUMS[0]?.id}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-semibold text-white drop-shadow-lg mb-2">
                        {album.tracks.length} tracks
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <span>View Album</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-black tracking-tight line-clamp-1 mb-1">
                          {album.title}
                        </h3>
                        <div className="text-sm text-black/60">
                          {album.year ?? "—"} • {album.tracks.length} songs
                        </div>
                      </div>

                      <div className="shrink-0 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                        Album
                      </div>
                    </div>

                    <div className="text-sm text-black/50">
                      Click to view all tracks
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* SINGLES */}
      {SINGLES.length > 0 && (
        <section className="py-16 md:py-20 bg-neutral-50">
          <Container>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                Singles
              </h2>
              <p className="mt-2 text-base text-black/60">
                Individual worship songs released separately
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {SINGLES.map((single) => (
                <div
                  key={single.id}
                  className="rounded-2xl bg-white border border-black/10 overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.10)]"
                >
                  <div className="relative aspect-square bg-neutral-100">
                    <Image
                      src={single.cover}
                      alt={single.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-black tracking-tight line-clamp-1 mb-1">
                          {single.title}
                        </h3>
                        <div className="text-sm text-black/60">
                          {single.year ?? "—"}
                        </div>
                      </div>

                      <div className="shrink-0 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                        Single
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {single.platforms.youtube && (
                        <a
                          href={single.platforms.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/90 transition"
                        >
                          <span className="h-3.5 w-3.5"><YouTubeIcon /></span>
                          YouTube
                        </a>
                      )}

                      {single.platforms.spotify && (
                        <a
                          href={single.platforms.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-neutral-50 transition"
                        >
                          <span className="h-3.5 w-3.5"><SpotifyIcon /></span>
                          Spotify
                        </a>
                      )}

                      {single.platforms.appleMusic && (
                        <a
                          href={single.platforms.appleMusic}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black/70 hover:bg-neutral-50 transition"
                        >
                          <span className="h-3.5 w-3.5"><AppleMusicIcon /></span>
                          Apple
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-neutral-900 to-black">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-white/80 mb-10">
              Subscribe to never miss new worship releases
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://youtube.com/@saltcitycentral?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition shadow-xl"
              >
                Subscribe on YouTube
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
