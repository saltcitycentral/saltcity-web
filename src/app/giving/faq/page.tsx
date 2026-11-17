import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "@/app/who-we-are/AboutHero";
import AccountList from "../AccountList";
import { INFO_DESK, PASTOR_EMAIL } from "../accounts";

export const metadata: Metadata = {
  title: "Giving FAQ",
  description: "Answers to common questions about giving to SaltCity Church.",
};

const FAQS: { category: string; questions: { q: string; a: ReactNode }[] }[] = [
  {
    category: "The Purpose of Giving",
    questions: [
      {
        q: "How do I give?",
        a: (
          <>
            <p>
              Biblically, the primary purpose of giving is for raising disciples through the spread of the
              gospel. God gave us the ultimate gift of His Son generously, and that is how He expects His
              children to give. Here at SaltCity, we teach that everyone should give now and again, as God has
              prospered them.
            </p>
            <p>You can partner with the work SaltCity Church is doing around the world through our accounts.</p>
            <Link href="/giving/ways" className="sc-link text-sm text-black">
              Ways to give
              <span aria-hidden="true">→</span>
            </Link>
          </>
        ),
      },
      {
        q: "What does the Bible say about partnership and giving?",
        a: (
          <>
            <p>
              “Now you Philippians know also that in the beginning of the gospel, when I departed from
              Macedonia, no church shared with me concerning giving and receiving but you only. For even in
              Thessalonica you sent aid once and again for my necessities. Not that I seek the gift, but I seek
              the fruit that abounds to your account. Indeed I have all and abound. I am full, having received
              from Epaphroditus the things sent from you, a sweet-smelling aroma, an acceptable sacrifice, well
              pleasing to God. And my God shall supply all your need according to His riches in glory by Christ
              Jesus.”
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">Philippians 4:15-19</p>
          </>
        ),
      },
    ],
  },
  {
    category: "Banking Channels",
    questions: [
      {
        q: "What are the account details for giving?",
        a: <AccountList reveal={false} />,
      },
    ],
  },
  {
    category: "Partnership & Commitment",
    questions: [
      {
        q: "Why should I partner with SaltCity?",
        a: (
          <p>
            Just as Paul had these partners, as you will see in Luke 8:2-3, Jesus also had partners who
            ministered their substance to His ministry while He was on the earth. Since the Lord has assigned us
            this task of raising disciples to fulfill their ministry we have set our faith for everything we
            need to be successful in teaching the Word. So, decide prayerfully, what you will give to the work
            monthly as we obey the Lord.
          </p>
        ),
      },
    ],
  },
  {
    category: "Ministry Focus",
    questions: [
      {
        q: "What is the focus of SaltCity Church?",
        a: (
          <p>
            SaltCity Church is a Bible-teaching church focused on Discipling Believers and Perfecting them for
            the Fulfillment of the Work of Ministry.
          </p>
        ),
      },
    ],
  },
];

const CONTACT = [
  { label: "Email Pastor Tobore", note: PASTOR_EMAIL, href: `mailto:${PASTOR_EMAIL}`, external: false },
  { label: "WhatsApp the info desk", note: INFO_DESK.display, href: INFO_DESK.whatsapp, external: true },
  { label: "Call the info desk", note: INFO_DESK.display, href: INFO_DESK.tel, external: false },
];

export default function GivingFAQPage() {
  return (
    <main data-home>
      <AboutHero image="/images/giving/faq.jpg" position="60% 35%" eyebrow="Giving FAQ" lines={["Giving FAQs"]}>
        Find answers to common questions about giving to SaltCity Church.
      </AboutHero>

      <section className="bg-white">
        <Container>
          <div className="py-24 md:py-32">
            <p
              data-reveal
              className="max-w-[44rem] text-2xl font-bold leading-snug tracking-tight md:text-3xl"
            >
              Whether you’re exploring giving as a next step in your relationship with Christ or you’re a
              long-time giver looking for ways to invest in what God is doing, we’re here to help.
            </p>

            <div className="mt-20 space-y-20 md:mt-28">
              {FAQS.map((group, gi) => (
                <div key={group.category} className="grid gap-8 md:grid-cols-12 md:gap-16">
                  <div className="md:col-span-4">
                    <div data-reveal className="text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{gi + 1}
                    </div>
                    <h2
                      data-reveal
                      style={{ ["--d" as string]: 60 }}
                      className="mt-3 text-2xl font-black leading-tight tracking-tight md:text-3xl"
                    >
                      {group.category}
                    </h2>
                  </div>
                  <div className="border-t border-black/10 md:col-span-8">
                    {group.questions.map((faq) => (
                      <details key={faq.q} data-reveal className="group border-b border-black/10">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold tracking-tight md:text-xl [&::-webkit-details-marker]:hidden">
                          <span>{faq.q}</span>
                          <span
                            aria-hidden="true"
                            className="relative h-4 w-4 shrink-0 transition-transform duration-500 group-open:rotate-45"
                          >
                            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-black" />
                            <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-black" />
                          </span>
                        </summary>
                        <div className="max-w-[42rem] space-y-4 pb-8 text-base leading-relaxed text-black/70">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Still have questions */}
      <section className="border-t border-black/10 bg-white">
        <Container>
          <div className="py-24 md:py-32">
            <h2
              data-reveal
              className="mb-10 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
            >
              Still Have Questions?
            </h2>
            <div className="border-t border-black/10">
              {CONTACT.map((c, i) => (
                <div key={c.label} data-reveal style={{ ["--d" as string]: i * 60 }}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="sc-step"
                  >
                    <span className="w-8 text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-2xl font-black tracking-tight md:text-3xl">{c.label}</span>
                      <span className="mt-1 block break-all text-base text-black/60">{c.note}</span>
                    </span>
                    <span className="sc-step-arrow" aria-hidden="true">
                      {c.external ? "↗" : "→"}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <HomeMotion />
    </main>
  );
}
