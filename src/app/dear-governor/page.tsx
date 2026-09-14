import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Conversation from "./Conversation";

export const metadata: Metadata = {
  title: "Dear Governor '26 — City Builders",
  description:
    "Why are brilliant minds leaving Warri? Join the conversation ahead of Dear Governor '26 — City Builders: Building the Delta we want. 1 Oct 2026, 10AM, COD, 20 Okumagba Avenue, Warri.",
  alternates: { canonical: "/dear-governor" },
  openGraph: {
    title: "Why are brilliant minds leaving Warri?",
    description: "Join the conversation — Dear Governor '26: City Builders, 1 Oct 2026, Warri.",
    images: ["/images/dear-governor-wordmark.png"],
  },
};

export default function DearGovernorPage() {
  return (
    <main className="bg-white font-sans text-[#1F2328]">
      {/* hero — mirrors the flyer */}
      <section className="border-b border-black/10">
        <Container>
          <div className="flex flex-col items-center py-16 text-center md:py-24">
            <div className="flex items-center gap-4 text-[#5B6068]">
              <span className="text-lg font-black tracking-tight">SaltCity</span>
              <span className="h-7 w-px bg-[#5B6068]/60" />
              <span className="text-lg font-bold uppercase tracking-wide">Dear Governor&apos;26</span>
            </div>

            <h1 className="sr-only">City Builders — Dear Governor &apos;26</h1>
            <Image
              src="/images/dear-governor-wordmark.png"
              alt="City Builders"
              width={2000}
              height={226}
              priority
              className="mt-10 h-auto w-full max-w-[860px]"
            />

            <p className="mt-6 text-lg font-semibold text-[#5B6068]">Building the Delta we want</p>

            <div className="mt-10 text-[#5B6068]">
              <p className="text-2xl font-black tracking-tight sm:text-3xl">1st Oct 2026 \\ 10AM</p>
              <p className="mt-1 text-lg uppercase tracking-wide sm:text-xl">COD, 20 Okumagba Avenue, Warri.</p>
            </div>

            <a
              href="#conversation"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1F2328] px-8 py-4 text-sm font-bold text-white transition hover:opacity-90"
            >
              Join the conversation ↓
            </a>
          </div>
        </Container>
      </section>

      {/* the question + conversation */}
      <section id="conversation" className="scroll-mt-20 bg-[#F6F7F8]">
        <Container>
          <div className="mx-auto max-w-[760px] py-16 md:py-20">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1BA3D6]">
              The conversation
            </div>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              Why are brilliant minds leaving Warri?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#1F2328]/70">
              Talent, founders and professionals keep moving out. Tell us why — from
              your own story or what you&apos;ve seen — and what would make them stay.
              The voices here help shape the conversation at Dear Governor &apos;26.
            </p>

            <Conversation />
          </div>
        </Container>
      </section>
    </main>
  );
}
