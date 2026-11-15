"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The pastorate's invitation. The YouTube player only loads when someone
 * presses play, so the page doesn't pay for it up front. With no video id yet,
 * it shows the still on its own.
 */
export default function InviteVideo({ videoId, still }: { videoId: string; still: string }) {
  const [playing, setPlaying] = useState(false);
  const poster = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : still;

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden bg-black shadow-2xl">
        {playing && videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="An invitation to The Faith Convention"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {videoId ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <Image
                src={poster}
                alt="A member in prayer under the stage lights"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {videoId ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the invitation"
                className="group absolute inset-0 grid place-items-center"
              >
                <span className="grid h-20 w-24 -skew-x-[10deg] place-items-center bg-[#F7B92F] text-[#170504] transition group-hover:bg-[#ffd05a]">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 skew-x-[10deg]" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
              </button>
            ) : (
              <p className="absolute inset-x-0 bottom-0 p-6 text-sm font-semibold text-white/85">
                The invitation video will be here shortly.
              </p>
            )}
          </>
        )}
      </div>
      <figcaption className="mt-4 text-sm text-white/55">An invitation from the pastorate.</figcaption>
    </figure>
  );
}
