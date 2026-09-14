import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Conversation from "./Conversation";

export const metadata: Metadata = {
  title: "Dear Governor '26 — City Builders",
  description:
    "#DEARGOVERNOR2026 — CITYBUILDERS. Why do gifted people leave Warri? Join the conversation ahead of the Citizens' Town Hall on 1 Oct 2026, 10AM, COD, 20 Okumagba Avenue, Warri.",
  alternates: { canonical: "/dear-governor" },
  openGraph: {
    title: "Why do gifted people leave Warri? — #DEARGOVERNOR2026",
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
              #DEARGOVERNOR2026
            </div>
            <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl">
              CITYBUILDERS — A Warri We&apos;d live in not a Warri We&apos;d leaving.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#1F2328]/75">
              <p>
                <strong className="font-bold text-[#1F2328]">#DEARGOVERNOR</strong> is a
                Citizens&apos; Town Hall where local thought leaders share knowledge and
                experience, providing practical solutions to the challenges facing our city.
                The goal is to broaden perspectives, foster dialogue with policymakers and
                stakeholders as we initiate a process of real urban development.
              </p>
              <p>
                While many citizens advocate for their rights and try to hold the government
                to a standstill, we are embracing our responsibilities as citizens and
                starting the conversation about growth.
              </p>
              <p>
                We want to reinvent our city&apos;s economic structure, transition into a
                smart, inclusive city, and approach urban challenges systematically.
              </p>
              <p>
                DearGovernor is for the thought leaders, decision-makers, and people who seek
                change and improvement in the city.
              </p>
              <p>
                For the 2026 edition, happening on October 1st, we are starting a conversation
                about why the wealth of highly skilled and gifted locals leaves the city sooner
                or later for cities like Lagos, Abuja, Port Harcourt, London, New York, etc.
                And is there anything we can do about it?
              </p>
            </div>

            <div className="mt-12 border-t border-black/10 pt-10">
              <p className="text-sm font-semibold text-[#1F2328]/60">
                To the best of your knowledge, the question is simple:
              </p>
              <h3 className="mt-2 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
                Why do gifted people leave Warri?
              </h3>
            </div>

            <Conversation />
          </div>
        </Container>
      </section>
    </main>
  );
}
