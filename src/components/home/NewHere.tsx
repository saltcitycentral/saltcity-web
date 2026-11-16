import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

/**
 * "New to SaltCity?" The church's own statement, set large over a photograph
 * that drifts slowly against the scroll.
 */
export default function NewHere() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div data-parallax="0.9" className="absolute inset-x-0 -inset-y-[14%]">
        <Image
          src="/images/home/new-here.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <Container className="relative">
        <div className="py-28 md:py-40">
          <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
            New to SaltCity?
          </div>

          <p
            data-reveal
            style={{ ["--d" as string]: 80 }}
            className="mt-7 max-w-[20ch] text-[clamp(2rem,5.2vw,4.5rem)] font-black leading-[1.02] tracking-tight text-white sm:max-w-[24ch]"
          >
            We teach believers how to live victoriously by practicing the Written Word of GOD and
            living everyday with JESUS as our EXAMPLE.
          </p>

          <div
            data-reveal
            style={{ ["--d" as string]: 160 }}
            className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/who-we-are"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
            >
              Who we are
            </Link>
            <Link href="/next-steps" className="sc-link text-sm text-white">
              Grow with us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
