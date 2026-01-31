import Container from "@/components/ui/Container";
import FirstTimeClient from "./pageClient";

export default function FirstTimePage() {
  return (
    <section className="relative overflow-hidden bg-[#fafafa]">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute top-32 -right-24 h-96 w-96 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      </div>

      <Container>
        <div className="relative py-14 md:py-20">
          {/* header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70 shadow-sm">
              New guest
              <span className="h-1 w-1 rounded-full bg-black/30" />
              Quick welcome form
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-black">
              First Time Here?
            </h1>

            <p className="mt-4 text-base md:text-lg text-black/70 leading-relaxed">
              Fill this in and we’ll reach out with the next steps. You can also share the link or show the QR code after service.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <FirstTimeClient />
          </div>

          {/* footer note */}
          <div className="mt-10 text-xs text-black/50">
            By submitting, you agree we may contact you about follow-up and next steps.
          </div>
        </div>
      </Container>
    </section>
  );
}
