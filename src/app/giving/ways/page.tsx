import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "@/app/who-we-are/AboutHero";
import NextPage from "@/app/who-we-are/NextPage";
import AccountList from "../AccountList";
import { INFO_DESK } from "../accounts";

export const metadata: Metadata = {
  title: "How to Give",
  description: "SaltCity Church accounts for partnership, property partnership and offerings.",
};

const STEPS = [
  { title: "Choose an account", desc: "Partnership, Property Partnership, or Offerings, in Naira, Dollar or Pound." },
  { title: "Make the transfer", desc: "From your bank app or at any branch. Every account is in the name SaltCity Church." },
  {
    title: "Send your confirmation",
    desc: "After making a transfer, please send your confirmation receipt to our official WhatsApp line for record purposes.",
  },
];

export default function GivingWaysPage() {
  return (
    <main data-home>
      <AboutHero image="/images/giving/how.jpg" position="50% 35%" eyebrow="How to give" lines={["Ways to Give"]}>
        Thank you for partnering with SaltCity. Your generosity helps us reach more lives.
      </AboutHero>

      {/* Three steps */}
      <section className="bg-white">
        <Container>
          <ol className="grid gap-12 border-b border-black/10 py-20 md:grid-cols-3 md:gap-10 md:py-24">
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--d" as string]: i * 100 }} className="border-t border-black pt-6">
                <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">0{i + 1}</span>
                <h2 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">{s.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-black/65">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The accounts */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-28">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-40">
                <h2
                  data-reveal
                  className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
                >
                  Official Accounts
                </h2>
                <p data-reveal style={{ ["--d" as string]: 80 }} className="mt-6 text-lg text-black/65">
                  SaltCity Church accounts.
                </p>
              </div>
            </div>
            <div className="md:col-span-8">
              <AccountList />
            </div>
          </div>
        </Container>
      </section>

      {/* Confirmation */}
      <section className="bg-black text-white">
        <Container>
          <div className="py-24 md:py-32">
            <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-white/55">
              After you give
            </div>
            <p
              data-reveal
              style={{ ["--d" as string]: 80 }}
              className="mt-7 max-w-[22ch] text-[clamp(2rem,4.8vw,4.25rem)] font-black leading-[1.02] tracking-tight"
            >
              Send your confirmation receipt to our WhatsApp line.
            </p>
            <p
              data-reveal
              style={{ ["--d" as string]: 140 }}
              className="mt-7 max-w-[32rem] text-lg leading-relaxed text-white/70"
            >
              It is for record purposes, so every gift is accounted for.
            </p>
            <div
              data-reveal
              style={{ ["--d" as string]: 200 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <a
                href={INFO_DESK.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
              >
                WhatsApp {INFO_DESK.display}
              </a>
              <a href={INFO_DESK.tel} className="sc-link text-sm text-white">
                Or call the info desk
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <NextPage label="Questions?" title="Giving FAQ" href="/giving/faq" />
      <HomeMotion />
    </main>
  );
}
