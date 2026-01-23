import Container from "@/components/ui/Container";

export default function OpenNetworkStrip() {
  return (
    <section className="border-t border-black/10 bg-white">
      <Container>
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-black/70">
            Listen to any SaltWorship songs in one click
          </p>

          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-black/90"
          >
            Listen Now
          </a>
        </div>
      </Container>
    </section>
  );
}
