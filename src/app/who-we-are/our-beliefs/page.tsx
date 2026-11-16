import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "../AboutHero";

export const metadata: Metadata = {
  title: "Our Beliefs",
  description: "Every local church has doctrinal beliefs that makes it unique. Here are some of ours.",
};

const BELIEFS = [
  {
    title: "School of Tyrannus (Foundation School)",
    content:
      "We believe the Apostle Paul when by the spirit he said, “GOD wants all men to be saved and come to the knowledge of the truth…” We believe that teaching is the primary tool for making disciples, so here in SaltCity Church, we have the School of Tyrannus with three colleges:\n\nCollege of Doctrinal Alignment: aimed at establishing and reminding believers of foundational principles in various areas of the Faith. The College of Doctrinal Alignment holds every quarter in all our Centres. To attend please reach our info desk on 08030597015.\n\nCollege of Membership: aimed at establishing members on spiritual home training. This equips members with the Biblical principles of doing life with other believers.\n\nCollege of Maturity: aimed at equipping believers to know their ministry, know their ministry graces, understand their call and fulfill it.",
  },
  {
    title: "How do I begin a courtship?",
    content:
      "Inform your interest to the FamilyLife Pastor or your Centre Pastor. Pray for 90 days during which you should abstain from any form of communication with your intended. Fill the spousal selection form prayerfully. Ask your company or trusted believing friends to pray for you even as you believe GOD for a life partner.",
  },
  {
    title: "Premarital Counselling & Marriage",
    content:
      "Premarital Counselling is designed to prepare couples seriously considering marriage based on biblical principles to guide them into this lifelong commitment to each other. The Premarital Counselling sessions provide guidance and information on the concept of a marriage that glorifies God, self discovery, setting reasonable expectations for each other and responsibilities in marriage. Inform the FamilyLife Pastor or your Centre Pastor and register for the next premarital class. The Premarital Counselling classes run for 3 months. SaltCity Church is licensed under The Federal Government Marriage Registry.",
  },
  {
    title: "How do I join a company?",
    content:
      "A company is a group of homogeneous believers who support you in your daily obedience of the Word of GOD. To join a company, speak to your FamilyLife fellowship leader (Unmarried women, Married women, Married men, Married women).",
  },
  {
    title: "How do I join morning prayers?",
    content:
      "We believe that the biggest spiritual discipline is to read your Bible and pray everyday. We pray together on Mixlr every Monday, Wednesday and Friday. We pray together in our companies on Tuesdays and Thursdays.",
  },
  {
    title: "What about my children?",
    content:
      "Establishing children in the Word of GOD from their early age makes them wise. Our Children Chapel is designed to help your children grow in their faith in GOD. Through age specific lessons and activities, children are taught Biblical truths and real life lessons every week in love. The Children Chapel is open to all learners between the ages of 0-12years during church services.",
  },
];

export default function OurBeliefsPage() {
  return (
    <main data-home>
      <AboutHero
        image="/images/about/beliefs.jpg"
        position="40% 50%"
        eyebrow="Our beliefs"
        lines={["What Does", "SaltCity Believe?"]}
      >
        Every local church has doctrinal beliefs that makes it unique. Here are some of ours.
      </AboutHero>

      {/* Beliefs */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-4">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight md:sticky md:top-40"
              >
                Our Beliefs
              </h2>
            </div>

            <div className="border-t border-black/10 md:col-span-8">
              {BELIEFS.map((belief, i) => (
                <details
                  key={belief.title}
                  data-reveal
                  style={{ ["--d" as string]: i * 50 }}
                  className="group border-b border-black/10"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{i + 1}
                    </span>
                    <span className="flex-1 text-lg font-bold leading-snug tracking-tight md:text-xl">
                      {belief.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 transition-transform duration-500 group-open:rotate-45"
                    >
                      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-black" />
                      <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-black" />
                    </span>
                  </summary>
                  <div className="max-w-[42rem] whitespace-pre-line pb-8 text-base leading-relaxed text-black/70 md:pl-12">
                    {belief.content}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Primary and secondary focus */}
      <section className="bg-black text-white">
        <Container>
          <div className="py-24 md:py-32">
            <h2
              data-reveal
              className="max-w-[14ch] text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
            >
              Our Primary And Secondary Focus
            </h2>

            <blockquote
              data-reveal
              className="mt-16 max-w-[52rem] border-l border-white/30 pl-6 text-xl font-bold leading-snug tracking-tight md:mt-20 md:pl-10 md:text-3xl"
            >
              “Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of
              the Son, and of the Holy Ghost: teaching them to observe all things whatsoever I have
              commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.”
              <footer className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-white/55">
                Matthew 28:19-20
              </footer>
            </blockquote>

            <div className="mt-16 grid gap-14 border-t border-white/15 pt-14 md:mt-20 md:grid-cols-2 md:gap-16 md:pt-16">
              <div data-reveal>
                <div className="text-xs font-bold tabular-nums tracking-[0.2em] text-white/45">01</div>
                <h3 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">What SaltCity Is About</h3>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70">
                  <p>
                    GOD’s mandate for His Church worldwide is to ensure the salvation of all men, and to
                    equip and train them for His purpose. SaltCity church obeys this divine mandate
                    through what we call “Company Groups”.
                  </p>
                  <p>
                    The company is a geographical grouping of devoted Believers, united to inspire one
                    another in daily sanctification, Spiritual growth and Service to the Almighty GOD. We
                    are big on discipleship, and a large part of discipleship is training, and for
                    training to be effective, it must be structured.
                  </p>
                </div>
              </div>

              <div data-reveal style={{ ["--d" as string]: 120 }}>
                <div className="text-xs font-bold tabular-nums tracking-[0.2em] text-white/45">02</div>
                <h3 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">What Is About SaltCity</h3>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70">
                  <p>
                    As we are changed by the Word, this growth is supposed to be effected in the state of
                    our biological families, human relationships, environmental care and work culture.
                  </p>
                  <p>
                    To this end, periodically, we organize special meetings, focusing on areas like
                    Marriage, Family, Work, Friendship, Politics, Skill Acquisition, Health and Finance.
                  </p>
                  <p>
                    The end goal is to have a well-rounded believer, who is knowledgeable and proficient
                    in every area of their lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="bg-white">
        <Container>
          <div className="py-24 md:py-32">
            <h2
              data-reveal
              className="max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
            >
              Ready to Experience SaltCity?
            </h2>
            <p
              data-reveal
              style={{ ["--d" as string]: 80 }}
              className="mt-7 max-w-[34rem] text-lg leading-relaxed text-black/70"
            >
              Join us as we grow together in faith and become the people God created us to be.
            </p>
            <div
              data-reveal
              style={{ ["--d" as string]: 160 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href="/locations"
                className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/85"
              >
                Find a Location
              </Link>
              <Link href="/who-we-are/what-to-expect" className="sc-link text-sm">
                What to expect
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <HomeMotion />
    </main>
  );
}
