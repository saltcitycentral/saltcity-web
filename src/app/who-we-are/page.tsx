import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "./AboutHero";
import LeadershipGrid from "./LeadershipGrid";
import BecomeMember from "./BecomeMember";
import NextPage from "./NextPage";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "SaltCity Church: transforming the distressed, indebted and discontented into mighty men. Our story and our leadership.",
};

export default function WhoWeArePage() {
  return (
    <main data-home>
      <AboutHero
        image="/images/about/mission.jpg"
        position="50% 60%"
        eyebrow="Our mission"
        lines={["Transforming the distressed,", "indebted and discontented", "into mighty men."]}
      >
        We raise disciples and disciple makers.
      </AboutHero>

      {/* Our story */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-5">
              <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-black/50">
                Since 2016
              </div>
              <h2
                data-reveal
                style={{ ["--d" as string]: 80 }}
                className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
              >
                Our Story
              </h2>
            </div>

            <div className="md:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-black/70">
                <p data-reveal className="text-2xl font-bold leading-snug tracking-tight text-black md:text-3xl">
                  SaltCity Church began in 2016 with a vision to transform lives in the city of Warri.
                </p>
                <p data-reveal style={{ ["--d" as string]: 80 }}>
                  What started as a small gathering has grown into a vibrant community of faith. As seen
                  in our documentary, our journey has been one of “Faith to Faith.” We are committed to
                  raising generations of leaders and making disciples who impact their world.
                </p>
                <p data-reveal style={{ ["--d" as string]: 160 }}>
                  We believe church is more than a building. It is a family where God’s Word is taught in
                  truth and lives are empowered for purpose.
                </p>
              </div>
              <div data-reveal style={{ ["--d" as string]: 240 }} className="mt-9">
                <Link href="/who-we-are/our-beliefs" className="sc-link text-sm">
                  Our beliefs
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div data-reveal="shutter" className="pb-24 md:pb-32">
            <div className="aspect-video overflow-hidden bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/y1u3T6ZtEjU"
                title="The SaltCity Church story"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="border-t border-black/10 bg-white">
        <Container>
          <div className="py-24 md:py-32">
            <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end md:gap-16">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight md:col-span-7"
              >
                Meet the Leadership
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 100 }}
                className="text-lg leading-relaxed text-black/65 md:col-span-5"
              >
                Meet the anointed men who labor over the flock in SaltCity night and day.
              </p>
            </div>
            <LeadershipGrid />
          </div>
        </Container>
      </section>

      <BecomeMember />
      <NextPage label="Next" title="What to Expect" href="/who-we-are/what-to-expect" />
      <HomeMotion />
    </main>
  );
}
