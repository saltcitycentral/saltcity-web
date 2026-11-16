import Link from "next/link";
import type { CardData } from "./shared";

/** One series: its artwork, its name, how many messages are in it. */
export default function SeriesCard({
  card,
  delay = 0,
  dark = false,
  hidden = false,
}: {
  card: CardData;
  delay?: number;
  dark?: boolean;
  hidden?: boolean;
}) {
  return (
    <Link
      href={card.href}
      hidden={hidden}
      data-reveal
      style={{ ["--d" as string]: delay }}
      className="group block"
    >
      <div className={`relative aspect-video overflow-hidden ${dark ? "bg-white/10" : "bg-neutral-200"}`}>
        {/* YouTube artwork, already small; next/image would only re-encode it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3
          className={`text-lg font-black leading-snug tracking-tight md:text-xl ${dark ? "text-white" : "text-black"}`}
        >
          {card.title}
        </h3>
        <span
          aria-hidden="true"
          className={`transition-transform duration-500 group-hover:translate-x-1 ${dark ? "text-white/40 group-hover:text-white" : "text-black/30 group-hover:text-black"}`}
        >
          →
        </span>
      </div>
      {card.meta ? (
        <div
          className={`mt-1 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-white/45" : "text-black/45"}`}
        >
          {card.meta}
        </div>
      ) : null}
    </Link>
  );
}
