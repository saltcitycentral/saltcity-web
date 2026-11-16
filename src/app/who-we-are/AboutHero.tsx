import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

/**
 * The opening photograph shared by the three Who We Are pages. Same motion as
 * the homepage hero: the photograph settles as the page opens, the headline
 * rises a line at a time, and the frame draws in as you scroll away.
 */
export default function AboutHero({
  image,
  position = "50% 50%",
  eyebrow,
  lines,
  children,
}: {
  image: string;
  position?: string;
  eyebrow: string;
  lines: string[];
  children?: ReactNode;
}) {
  return (
    <section data-hero className="relative h-[78svh] max-h-[52rem] min-h-[32rem] bg-white">
      <div className="sc-hero-frame bg-black">
        <div className="sc-hero-drift">
          <div className="sc-hero-settle">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={72}
              className="object-cover"
              style={{ objectPosition: position }}
            />
          </div>
        </div>
        <div aria-hidden="true" className="sc-hero-light" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30"
        />

        <Container className="relative h-full">
          <div className="sc-hero-copy flex h-full flex-col justify-end pb-10 lg:pb-14">
            <div
              className="sc-fade text-xs font-bold uppercase tracking-[0.28em] text-white/65"
              style={{ ["--i" as string]: 0 }}
            >
              {eyebrow}
            </div>
            <h1 className="mt-5 max-w-[24ch] text-[clamp(2.25rem,6.2vw,5.5rem)] font-black leading-[0.96] tracking-tight text-white">
              {lines.map((line, i) => (
                <span key={line} className="sc-line" style={{ ["--i" as string]: i }}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            {children ? (
              <div
                className="sc-fade mt-7 max-w-[38rem] border-t border-white/20 pt-6 text-lg leading-relaxed text-white/85"
                style={{ ["--i" as string]: lines.length + 1 }}
              >
                {children}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
