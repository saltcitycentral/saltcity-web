import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const CREST = "#0B6E31"; // The CityBuilders' crest green

/**
 * Homepage link through to /citybuilders — the NGO the church founded.
 * Sits after "New to SaltCity?" so the story runs: who we are -> what we do
 * in the city.
 */
export default function CityBuildersStrip() {
  return (
    <section className="bg-white">
      <Container>
        <div className="grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* images */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <div className="col-span-3 overflow-hidden rounded-2xl">
              <Image
                src="/images/citybuilders/class-group.jpg"
                alt="Pupils of The Foundation Montessori standing together in the classroom"
                width={1600}
                height={1178}
                loading="lazy"
                sizes="(max-width: 1024px) 55vw, 330px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 overflow-hidden rounded-2xl">
              <Image
                src="/images/citybuilders/pupil-writing.jpg"
                alt="A pupil writing in a lined exercise book"
                width={1200}
                height={1447}
                loading="lazy"
                sizes="(max-width: 1024px) 35vw, 220px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* copy */}
          <div>
            <div
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: CREST }}
            >
              Our work in the city
            </div>

            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              The CityBuilders
            </h2>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-black/70">
              In 2024 we founded a non-governmental organisation to build
              thriving cities by building people — through education, mindset
              reformation and economic development.
            </p>

            <p className="mt-4 max-w-md text-lg leading-relaxed text-black/70">
              It runs{" "}
              <span className="font-semibold text-black">
                The Foundation Montessori
              </span>
              , a free school on Okumagba Avenue with 24 children enrolled.
            </p>

            <Link
              href="/citybuilders"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: CREST }}
            >
              Meet The CityBuilders
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
