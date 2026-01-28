"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";

type ActiveModal = "baptism" | "serve" | "counseling" | "company" | "giving" | null;

const STEPS = [
  {
    title: "Sign up for discipleship",
    desc: "Learn what it means and register for the next discipleship class.",
    kind: "modal" as const,
    modalKey: "baptism" as const,
    cta: "Join the next class",
    color: "from-amber-900 to-amber-950",
    iconBg: "bg-amber-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    title: "Join a Company",
    desc: "Do life with a community of believers close to you.",
    kind: "modal" as const,
    modalKey: "company" as const,
    cta: "Find your company",
    color: "from-blue-900 to-blue-950",
    iconBg: "bg-blue-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4" />
        <circle cx="16" cy="9" r="3" />
        <path d="M2 21v-3c0-2 2-4 5-4h4c3 0 5 2 5 4v3" />
        <path d="M18 21v-2c0-2 1-3 3-3" />
      </svg>
    ),
  },
  {
    title: "Serve in a unit",
    desc: "Join a team and start serving with your gifts.",
    kind: "modal" as const,
    modalKey: "serve" as const,
    cta: "Explore serve teams",
    color: "from-green-900 to-green-950",
    iconBg: "bg-green-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Give Online",
    desc: "Support the ministry through generous giving.",
    kind: "modal" as const,
    modalKey: "giving" as const,
    cta: "Learn about giving",
    color: "from-purple-900 to-purple-950",
    iconBg: "bg-purple-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Counseling / Prayer",
    desc: "Request counseling or let us stand with you in prayer.",
    kind: "modal" as const,
    modalKey: "counseling" as const,
    cta: "Request prayer",
    color: "from-rose-900 to-rose-950",
    iconBg: "bg-rose-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Find a Location",
    desc: "See all locations and service times.",
    kind: "link" as const,
    href: "/locations",
    cta: "See locations",
    color: "from-orange-900 to-orange-950",
    iconBg: "bg-orange-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "What to Expect",
    desc: "If you're new, start here.",
    kind: "link" as const,
    href: "/who-we-are/what-to-expect",
    cta: "Learn what to expect",
    color: "from-teal-900 to-teal-950",
    iconBg: "bg-teal-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
  {
    title: "Listen to sermons",
    desc: "Browse sermons, teachings, and worship content.",
    kind: "link" as const,
    href: "/media/sermon-series",
    cta: "Browse media",
    color: "from-red-900 to-red-950",
    iconBg: "bg-red-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    title: "Contact Us",
    desc: "Questions? Reach out and we'll respond.",
    kind: "link" as const,
    href: "/contact",
    cta: "Reach out",
    color: "from-slate-900 to-slate-950",
    iconBg: "bg-slate-900/10",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function NextStepsPage() {
  const [active, setActive] = useState<ActiveModal>(null);

  return (
    <>
      <main className="pb-16">
        {/* Hero Section with Gradient */}
        <section className="relative py-24 bg-gradient-to-br from-amber-950 via-neutral-900 to-black overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span className="text-sm font-semibold text-white">Your Journey</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
                Take Your Next Step
              </h1>
              <p className="text-xl leading-relaxed text-white/90 mb-4">
                Growth is a journey, not a destination. Whether you're just starting or ready to go deeper, there's a step here for you.
              </p>
              <p className="text-lg leading-relaxed text-white/70">
                Everyone's next step looks different — choose the one that fits where you are.
              </p>

              <div className="mt-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back home
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Steps Grid */}
        <section className="py-20 bg-neutral-50">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((step) => {
                const cardClass =
                  "group relative bg-white rounded-2xl p-8 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden";

                const content = (
                  <>
                    {/* Gradient accent - top edge */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.iconBg} text-black group-hover:scale-110 transition-transform duration-500`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-black group-hover:text-amber-900 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base text-black/70 leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    {/* CTA with arrow */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-900 group-hover:gap-3 transition-all duration-300">
                      <span>{step.cta}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>

                    {/* Bottom gradient glow on hover */}
                    <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                  </>
                );

                if (step.kind === "link") {
                  return (
                    <Link key={step.title} href={step.href} className={cardClass}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActive(step.modalKey)}
                    className={cardClass + " text-left"}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Need Help Deciding?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                We're here to help you navigate your spiritual journey. Reach out and we'll guide you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-900 text-white hover:bg-amber-800 px-8 py-4 text-base font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <span>Talk to Someone</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      {/* Modals */}
      <Modal
        open={active === "baptism"}
        title="Water Baptism"
        description="Register and we'll share the next available date and class details."
        onClose={() => setActive(null)}
      >
        <SimpleForm
          onDone={() => setActive(null)}
          fields={[
            { label: "Full Name", required: true },
            { label: "Phone Number", required: true },
            { label: "Email (optional)" },
          ]}
        />
      </Modal>

      <Modal
        open={active === "company"}
        title="Join a Company"
        description="Tell us where you are and what kind of community you're looking for."
        onClose={() => setActive(null)}
      >
        <SimpleForm
          onDone={() => setActive(null)}
          fields={[
            { label: "Full Name", required: true },
            { label: "Phone Number", required: true },
            { label: "City / Area", required: true },
            { label: "Age Range (optional)" },
          ]}
        />
      </Modal>

      <Modal
        open={active === "serve"}
        title="Serve Team"
        description="Tell us what you're interested in and we'll connect you."
        onClose={() => setActive(null)}
      >
        <SimpleForm
          onDone={() => setActive(null)}
          fields={[
            { label: "Full Name", required: true },
            { label: "Phone Number", required: true },
            { label: "Preferred Team (optional)" },
          ]}
        />
      </Modal>

      <Modal
        open={active === "giving"}
        title="Give Online"
        description="Thank you for your generous heart. We'll guide you through the giving process."
        onClose={() => setActive(null)}
      >
        <SimpleForm
          onDone={() => setActive(null)}
          fields={[
            { label: "Full Name", required: true },
            { label: "Email", required: true },
            { label: "Message (optional)", textarea: true },
          ]}
        />
      </Modal>

      <Modal
        open={active === "counseling"}
        title="Counseling / Prayer"
        description="Share briefly and someone will reach out."
        onClose={() => setActive(null)}
      >
        <SimpleForm
          onDone={() => setActive(null)}
          fields={[
            { label: "Full Name", required: true },
            { label: "Phone Number", required: true },
            { label: "Message (optional)", textarea: true },
          ]}
        />
      </Modal>
    </>
  );
}

function SimpleForm({
  onDone,
  fields,
}: {
  onDone: () => void;
  fields: Array<{ label: string; required?: boolean; textarea?: boolean }>;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to an API route / form provider
        onDone();
      }}
      className="grid gap-5"
    >
      {fields.map((f) => (
        <label key={f.label} className="block">
          <div className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            {f.label}
          </div>
          {f.textarea ? (
            <textarea
              rows={4}
              required={f.required}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-amber-900/20"
            />
          ) : (
            <input
              required={f.required}
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-amber-900/20"
            />
          )}
        </label>
      ))}

      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-amber-900 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/70 hover:border-black/25 hover:text-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}