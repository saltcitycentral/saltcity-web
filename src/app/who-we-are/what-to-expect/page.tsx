import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import HomeMotion from "@/components/home/HomeMotion";
import AboutHero from "../AboutHero";
import NextPage from "../NextPage";

export const metadata: Metadata = {
  title: "What to Expect",
  description:
    "Church with us in Warri or online, and find the expression of SaltCity that fits your age and location.",
};

const SERVICE = [
  "Sincere, communal worship",
  "Guided prayers",
  "Simple but powerfully instructive teaching of GOD’s Word",
  "Fellowship after fellowship",
];

type Expression = {
  title: string;
  description: string;
  image: string;
  position?: string;
  href?: string;
};

const EXPRESSIONS: Expression[] = [
  {
    title: "SaltCity Warri",
    description: "Our main location in Warri where we gather to worship, hear GOD’s Word, and fellowship.",
    image: "/images/about/x-warri.jpg",
    href: "/locations",
  },
  {
    title: "Cityzens Churches",
    description: "Our campus expressions, located at FUPRE and PTI.",
    image: "/images/about/x-cityzens.jpg",
    position: "60% 50%",
    href: "/locations",
  },
  {
    title: "LifeCity",
    description: "The vibrant youthful expression of SALTCITY.",
    image: "/images/about/x-lifecity.jpg",
    position: "50% 60%",
    href: "https://instagram.com/thisislifecity",
  },
  {
    title: "CityCenter",
    description: "Teenage church for young believers between 13-20 years.",
    image: "/images/about/x-citycentre.jpg",
    position: "50% 30%",
    href: "https://instagram.com/mycitycentre",
  },
  {
    title: "Sapele Bible Study",
    description: "Satellite study center that holds every Thursday.",
    image: "/images/about/x-sapele.jpg",
    position: "50% 25%",
    href: "/locations",
  },
  {
    title: "SaltCity Capital",
    description: "Training institute for raising human capital.",
    image: "/images/about/x-capital.jpg",
  },
  {
    title: "SaltWorship",
    description: "A platform for communicating the gospel through songs.",
    image: "/images/about/x-worship.jpg",
    position: "50% 65%",
    href: "/worship",
  },
  {
    title: "SaltCity Online Church",
    description: "Virtual community for members in diaspora.",
    image: "/images/about/x-online.jpg",
    position: "40% 40%",
    href: "https://www.youtube.com/@saltcitycentral",
  },
];

const FAQS: { question: string; answer: string; link?: { label: string; href: string } }[] = [
  {
    question: "How do I become a member?",
    answer: "Fill the membership form and we will take it from there.",
    link: { label: "Membership form", href: "/membership" },
  },
  {
    question: "What is a company group?",
    answer:
      "A company is a group of homogeneous believers who support you in your daily obedience of the Word of GOD. It is one of the accountability structures of SaltCity Church.",
    link: { label: "Join a company", href: "/company" },
  },
  {
    question: "How do I register for premarital class?",
    answer:
      "Inform the FamilyLife Pastor or your Centre Pastor and register for the next premarital class. The classes run for 3 months.",
    link: { label: "Marriage form", href: "/marriage" },
  },
  {
    question: "How do I give?",
    answer: "All the ways to give are on the giving page.",
    link: { label: "Give", href: "/giving" },
  },
  {
    question: "Can I come with my kids?",
    answer:
      "Yes. Our Children Chapel is open to all learners between the ages of 0-12 years during church services. Through age specific lessons and activities, children are taught Biblical truths and real life lessons every week in love.",
  },
  {
    question: "How do I speak to a Pastor?",
    answer: "Reach our info desk on 08030597015, or send us a message.",
    link: { label: "Contact us", href: "/contact" },
  },
  {
    question: "What service unit can I join?",
    answer: "Tell us where you would like to serve and we will follow up with you.",
    link: { label: "Serve in a unit", href: "/serve" },
  },
  {
    question: "How can I find church sermons?",
    answer: "Teaching series and messages are on the sermons page, and services are on our YouTube channel.",
    link: { label: "Sermons", href: "/media/sermon-series" },
  },
  {
    question: "Is there SaltCity outside Warri?",
    answer:
      "Yes. There are Cityzens Churches at FUPRE and PTI, a Bible study in Sapele every Thursday, and SaltCity Online for members in diaspora.",
    link: { label: "Find a location", href: "/locations" },
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

function ExpressionCard({ x, index }: { x: Expression; index: number }) {
  const body = (
    <>
      <div data-reveal="shutter" style={{ ["--d" as string]: (index % 4) * 90 }}>
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          <Image
            src={x.image}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            quality={70}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            style={{ objectPosition: x.position ?? "50% 50%" }}
          />
        </div>
      </div>
      <div data-reveal style={{ ["--d" as string]: (index % 4) * 90 + 120 }} className="mt-4">
        <h3 className="flex items-baseline justify-between gap-3 text-lg font-black tracking-tight text-white md:text-xl">
          {x.title}
          {x.href ? (
            <span
              aria-hidden="true"
              className="text-base font-normal text-white/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white"
            >
              {isExternal(x.href) ? "↗" : "→"}
            </span>
          ) : null}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{x.description}</p>
      </div>
    </>
  );

  if (!x.href) return <div className="group">{body}</div>;
  if (isExternal(x.href)) {
    return (
      <a href={x.href} target="_blank" rel="noopener noreferrer" className="group block">
        {body}
      </a>
    );
  }
  return (
    <Link href={x.href} className="group block">
      {body}
    </Link>
  );
}

export default function WhatToExpectPage() {
  return (
    <main data-home>
      <AboutHero
        image="/images/about/calling.jpg"
        position="50% 55%"
        eyebrow="What to expect"
        lines={["Fulfill Your", "Calling!"]}
      >
        GOD loves us all equally but trusts us to the level we have taken training. Here at SaltCity, we
        put together different regimen for spiritual growth and character development, to make you fit
        for GOD’s use on the earth.
      </AboutHero>

      {/* Church with us */}
      <section className="bg-white">
        <Container>
          <div className="grid items-center gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-5">
              <div data-reveal="shutter">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  <div data-parallax="0.25" className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src="/images/about/church-with-us.jpg"
                      alt="A member of the welcome team waving at the entrance"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      quality={72}
                      className="object-cover"
                      style={{ objectPosition: "50% 30%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight"
              >
                Church With Us
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 80 }}
                className="mt-7 max-w-[36rem] text-lg leading-relaxed text-black/70"
              >
                No matter your age, demography, tribe or location, we have a church close to you to cater
                to your spiritual needs. Our service comprises of:
              </p>

              <ol className="mt-8 border-t border-black/10">
                {SERVICE.map((item, i) => (
                  <li
                    key={item}
                    data-reveal
                    style={{ ["--d" as string]: 120 + i * 70 }}
                    className="flex items-baseline gap-6 border-b border-black/10 py-5"
                  >
                    <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-black/40">
                      0{i + 1}
                    </span>
                    <span className="text-lg font-bold leading-snug tracking-tight md:text-xl">{item}</span>
                  </li>
                ))}
              </ol>

              <div data-reveal style={{ ["--d" as string]: 420 }} className="mt-10">
                <Link
                  href="/locations"
                  className="inline-block rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/85"
                >
                  Find a Location
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SaltCity Online */}
      <section className="relative overflow-hidden bg-black">
        <div data-parallax="0.9" className="absolute inset-x-0 -inset-y-[14%]">
          <Image
            src="/images/about/online.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover"
            style={{ objectPosition: "60% 50%" }}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

        <Container className="relative">
          <div className="py-28 md:py-40">
            <div data-reveal className="text-xs font-bold uppercase tracking-[0.28em] text-white/60">
              On YouTube and Mixlr
            </div>
            <h2
              data-reveal
              style={{ ["--d" as string]: 80 }}
              className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight text-white"
            >
              SaltCity Online
            </h2>
            <p
              data-reveal
              style={{ ["--d" as string]: 160 }}
              className="mt-7 max-w-[36rem] text-lg leading-relaxed text-white/80"
            >
              A community of believers in diaspora experiencing services virtually (on YouTube and
              Mixlr), and keeping up with our growth structure through accountability and systematic
              follow up.
            </p>
            <div data-reveal style={{ ["--d" as string]: 240 }} className="mt-10">
              <a
                href="https://www.youtube.com/@saltcitycentral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90"
              >
                Watch Online
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Expressions */}
      <section className="bg-[#0b0b0b]">
        <Container>
          <div className="py-24 md:py-32">
            <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end md:gap-16">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight text-white md:col-span-7"
              >
                Expressions of SaltCity
              </h2>
              <p
                data-reveal
                style={{ ["--d" as string]: 100 }}
                className="text-lg leading-relaxed text-white/65 md:col-span-5"
              >
                There’s a place for everyone at SaltCity. Discover our various expressions designed for
                every stage of your faith journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
              {EXPRESSIONS.map((x, i) => (
                <ExpressionCard key={x.title} x={x} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-4">
              <h2
                data-reveal
                className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tight md:sticky md:top-40"
              >
                First Time FAQ
              </h2>
            </div>

            <div className="border-t border-black/10 md:col-span-8">
              {FAQS.map((faq, i) => (
                <details
                  key={faq.question}
                  data-reveal
                  style={{ ["--d" as string]: Math.min(i, 5) * 50 }}
                  className="group border-b border-black/10"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold tracking-tight md:text-xl [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 transition-transform duration-500 group-open:rotate-45"
                    >
                      <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-black" />
                      <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-black" />
                    </span>
                  </summary>
                  <div className="max-w-[40rem] pb-7 text-base leading-relaxed text-black/70">
                    <p>{faq.answer}</p>
                    {faq.link ? (
                      <Link href={faq.link.href} className="sc-link mt-4 text-sm text-black">
                        {faq.link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="border-t border-black/10">
        <NextPage label="Next" title="Our Beliefs" href="/who-we-are/our-beliefs" />
      </div>
      <HomeMotion />
    </main>
  );
}
