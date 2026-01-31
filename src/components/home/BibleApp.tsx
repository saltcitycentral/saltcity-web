import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ListenToSermons() {
  return (
    <section className="py-20 bg-neutral-900">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-white/10 grid place-items-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm12-2c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
                </svg>
              </div>

              <h2 className="text-3xl font-black text-white">
                Listen to Our Sermons
              </h2>
            </div>

            <p className="text-lg text-white/80 leading-relaxed max-w-[540px] mb-10">
              Grow in grace, build conviction and enter into true liberty with our rich audio sermons,
              covering every aspect of the faith.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                href="https://t.me/mysaltcity"
                target="_blank"
                className="bg-white text-black hover:bg-white/90"
              >
                Listen on Telegram
              </Button>

              <Button
                href="https://open.spotify.com/show/0ZH0Zaojh617RRjrGzQsMw"
                target="_blank"
                variant="secondary"
                className="bg-transparent text-white ring-2 ring-white/30 hover:ring-white/60 hover:bg-white/10"
              >
                Open in Spotify
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] rounded-3xl bg-neutral-950 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/show/0ZH0Zaojh617RRjrGzQsMw?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
