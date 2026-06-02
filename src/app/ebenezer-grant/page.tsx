import { existsSync } from "fs";
import path from "path";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { isEbenezerGrantClosed } from "@/lib/ebenezerGrant/deadline";
import EbenezerGrantForm from "./EbenezerGrantForm";

const eligibility = [
  {
    title: "Church Membership",
    text: "The owner/director of the enterprise must be an active member of SaltCity Church.",
  },
  {
    title: "Legal Registration",
    text: "The enterprise must be formally incorporated.",
  },
  {
    title: "Operational History",
    text: "The enterprise must have been actively doing business for a minimum of one (1) year.",
  },
  {
    title: "Growth Demonstration",
    text: "The enterprise must clearly demonstrate how the provided financing will directly lead to an increase in revenue.",
  },
];

const documents = [
  {
    title: "Incorporation Documents",
    text: "Official corporate registration filings.",
  },
  {
    title: "Financial Reports",
    text: "Recent financial statements. Audited reports are not required.",
  },
  {
    title: "Revenue Projections",
    text: "A detailed projection showing expected revenue growth following the injection of the grant financing.",
  },
];

const conditions = [
  {
    title: "Monthly Financial Reporting",
    text: "Submission of a monthly Financial Report alongside an updated Projected Financial Report.",
  },
  {
    title: "Review & Training Attendance",
    text: "Mandatory attendance at all scheduled Monthly Reviews and training sessions.",
  },
];

const faqs = [
  [
    "Are audited financial reports required?",
    "No. Recent financial statements or business account statements are acceptable.",
  ],
  ["Can one business apply more than once?", "No. Only one application is allowed per business."],
  [
    "What happens after submission?",
    "Applications will be reviewed by the church office. Shortlisted applicants may be invited for a physical defence.",
  ],
  [
    "What are the obligations if selected?",
    "Beneficiaries must submit monthly financial reports and attend monthly review/training sessions for one year.",
  ],
];

export const metadata = {
  title: "The Ebenezer Grant | SaltCity Central",
  description: "Financing support for eligible SaltCity member-owned enterprises.",
};

export const dynamic = "force-dynamic";

const wordmarkExists = existsSync(
  path.join(process.cwd(), "public", "images", "ebenezer-grant-wordmark.svg")
);

function BriefSection({
  number,
  title,
  intro,
  children,
}: {
  number: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/10 py-8 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-xl font-black text-[#240F0D]">
        <span className="text-sm font-bold text-[#9C7A49]">{number}</span>
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-black/68">{intro}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}

function SimpleList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="pl-4 text-[15px] leading-7 text-black/72">
          <span className="font-bold text-[#240F0D]">{item.title}:</span> {item.text}
        </li>
      ))}
    </ul>
  );
}

export default function EbenezerGrantPage() {
  const isClosed = isEbenezerGrantClosed();

  return (
    <main className="bg-white text-[#240F0D]">
      <section className="border-b border-black/8 bg-white">
        <Container className="max-w-[1060px] pb-14 pt-24 md:pb-16 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            {wordmarkExists ? (
              <img
                src="/images/ebenezer-grant-wordmark.svg"
                alt="The Ebenezer Grant"
                className="mx-auto h-auto w-full max-w-[520px]"
              />
            ) : (
              <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">
                <span className="block text-[#6F1D1B]">The Ebenezer</span>
                <span className="block text-[#9C7A49]">Grant</span>
              </h1>
            )}
            
            <div className="mx-auto mt-7 max-w-xl border-y border-[#7B1E1E]/15 py-4">
              <p className="text-sm font-bold text-[#240F0D]">
                Applications close Friday, 5 June 2026, 23:59 WAT.
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7B1E1E]/70">
                {isClosed ? "Applications closed" : "Applications open"}
              </p>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#application-form"
                className="inline-flex items-center justify-center rounded-full bg-[#6F1D1B] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#531412]"
              >
                Apply now
              </Link>
              <Link
                href="#requirements"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-bold text-[#240F0D] transition hover:border-[#7B1E1E]/35"
              >
                Review requirements
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="requirements" className="py-14 md:py-16">
        <Container className="max-w-[1060px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h1 className="text-3xl font-black leading-tight md:text-4xl">
                Grant requirements
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-7 text-black/65">
                Please review the requirements before beginning your application.
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-6 md:p-8">
              <BriefSection
                number="01"
                title="Purpose of the Grant"
                intro="The primary objective of the Ebenezer Grant is to provide targeted financing to enterprises to help them scale operations and successfully increase their revenue."
              />

              <BriefSection
                number="02"
                title="Eligibility Criteria"
                intro="To be considered for the grant, applicant enterprises must meet all of the following requirements:"
              >
                <SimpleList items={eligibility} />
              </BriefSection>

              <BriefSection
                number="03"
                title="Required Proof of Qualification"
                intro="Applicants must submit the following documentation to verify their eligibility:"
              >
                <SimpleList items={documents} />
              </BriefSection>

              <BriefSection
                number="04"
                title="Post-Acceptance Conditions"
                intro="Upon receiving the grant, beneficiaries are required to fulfill the following accountability and development obligations for a period of one (1) year:"
              >
                <SimpleList items={conditions} />
              </BriefSection>
            </div>
          </div>
        </Container>
      </section>

      <section id="application-form" className="border-y border-black/8 bg-[#F8F8F7] py-14 md:py-16">
        <Container className="max-w-[980px]">
          <div className="mb-7">
            <h2 className="text-3xl font-black text-[#240F0D] md:text-4xl">
              Application form
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-black/65">
              Incomplete or inaccurate information may affect consideration.
            </p>
          </div>
          <EbenezerGrantForm closed={isClosed} />
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container className="max-w-[980px]">
          <h2 className="text-2xl font-black text-[#240F0D]">FAQs</h2>
          <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-bold text-[#240F0D]">
                  {question}
                  <span className="shrink-0 text-lg text-[#9C7A49] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-7 text-black/65">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
