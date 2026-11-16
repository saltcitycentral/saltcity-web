import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

/**
 * The homepage hero: one photograph, held still, and a headline.
 *
 * The motion is in CSS (see .sc-hero-* in globals.css) and HomeMotion: the
 * photograph settles as the page opens, a soft light follows the pointer
 * across the room, and as you scroll the frame draws in from the edges while
 * the copy lifts away.
 */
export default function HeroStill() {
  return (
    <section data-hero data-header-overlay="true" className="relative h-[100svh] max-h-[64rem] min-h-[38rem] bg-white">
      <div className="sc-hero-frame bg-black">
        <div className="sc-hero-drift">
          <div className="sc-hero-settle">
            <Image
              src="/images/home/hero-pulpit.jpg"
              alt="Pastor Tobore David teaching at SaltCity Central"
              fill
              priority
              sizes="100vw"
              quality={75}
              className="object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>
        </div>

        <div aria-hidden="true" className="sc-hero-light" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35"
        />

        <Container className="relative h-full">
          <div className="sc-hero-copy flex h-full flex-col justify-end pb-10 lg:pb-14">
            <h1 className="max-w-[16ch] text-[clamp(3rem,9.4vw,8.5rem)] font-black leading-[0.9] tracking-tight text-white">
              <span className="sc-line" style={{ ["--i" as string]: 0 }}>
                <span>Become</span>
              </span>
              <span className="sc-line" style={{ ["--i" as string]: 1 }}>
                <span>Fit For Use</span>
              </span>
            </h1>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-t border-white/20 pt-7">
              <p className="sc-fade max-w-[30rem] text-lg leading-relaxed text-white/85" style={{ ["--i" as string]: 2 }}>
                GOD created you in Christ Jesus to join Him in His good work.
              </p>

              <div className="sc-fade flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ["--i" as string]: 3 }}>
                <a
                  href="https://www.youtube.com/@saltcitycentral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
                >
                  Join a live service
                </a>
                <Link href="/new-here" className="sc-link text-sm text-white">
                  First time here?
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div
              className="sc-fade mt-7 flex flex-wrap gap-x-8 gap-y-1 text-xs font-bold uppercase tracking-[0.22em] text-white/55"
              style={{ ["--i" as string]: 4 }}
            >
              <span>Sundays 9:00 AM</span>
              <span>20 Okumagba Avenue, Warri</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
