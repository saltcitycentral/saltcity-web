import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ListenToSermons() {
  return (
    <section className="bg-[#0b0b0b] py-24 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div data-reveal>
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">
              Sermons
            </div>
            <h2 className="mb-7 mt-6 text-[clamp(2.5rem,5vw,4.25rem)] font-black leading-[0.98] tracking-tight text-white">
              Listen to
              <br />
              our sermons.
            </h2>

            <p className="text-lg text-white/80 leading-relaxed max-w-[540px] mb-10">
              Grow in grace, build conviction and enter into true liberty with our rich audio sermons,
              covering every aspect of the faith.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                href="https://t.me/mysaltcity/2263"
                target="_blank"
                className="bg-white text-black hover:bg-white/90"
              >
                Listen on Telegram
              </Button>

              <Button
                href="https://open.spotify.com/episode/2Vxr3pAnoAnu7UoklzZS68?si=4d31e7a9449b41fc"
                target="_blank"
                variant="secondary"
                className="bg-transparent text-white ring-2 ring-white/30 hover:ring-white/60 hover:bg-white/10"
              >
                Open in Spotify
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div data-reveal style={{ ["--d" as string]: 120 }} className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] rounded-3xl bg-neutral-950 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">

            <iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/show/0ZH0Zaojh617RRjrGzQsMw?utm_source=generator&si=6d0f89df32c24383" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
