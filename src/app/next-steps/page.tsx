"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";

type ActiveModal = "serve" | "counseling" | "company" | "discipleship" | null;

// Tiny helper
function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const STEPS = [
  {
    title: "Sign up for discipleship",
    desc: "Learn what it means and register for the next discipleship class.",
    kind: "modal" as const,
    modalKey: "discipleship" as const,
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
    kind: "link" as const,
    href: "/giving",
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
        open={active === "discipleship"}
        title="Sign up for Discipleship"
        description="Fill this and we'll reach out with the next steps."
        onClose={() => setActive(null)}
        footer={<div className="text-xs text-black/60">By submitting, you agree we may contact you about discipleship.</div>}
      >
        <DiscipleshipForm onDone={() => setActive(null)} />
      </Modal>

      <Modal
        open={active === "company"}
        title="Join a Company"
        description="Tell us where you are and what kind of community you're looking for."
        onClose={() => setActive(null)}
        footer={<div className="text-xs text-black/60">We'll connect you to a company lead near you.</div>}
      >
        <CompanyForm onDone={() => setActive(null)} />
      </Modal>

      <Modal
        open={active === "serve"}
        title="Serve Team"
        description="Tell us what you're interested in and we'll connect you."
        onClose={() => setActive(null)}
        footer={<div className="text-xs text-black/60">We'll help you find the perfect team.</div>}
      >
        <ServeForm onDone={() => setActive(null)} />
      </Modal>

      <Modal
        open={active === "counseling"}
        title="Counseling / Prayer"
        description="Share briefly and someone will reach out."
        onClose={() => setActive(null)}
        footer={<div className="text-xs text-black/60">All requests are kept confidential.</div>}
      >
        <CounselingForm onDone={() => setActive(null)} />
      </Modal>
    </>
  );
}

/* ---------- Shared UI Components ---------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">{label}</div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/40",
        "focus:outline-none focus:ring-2 focus:ring-black/15"
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black",
        "focus:outline-none focus:ring-2 focus:ring-black/15"
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cx(
        "w-full rounded-xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/40",
        "focus:outline-none focus:ring-2 focus:ring-black/15"
      )}
    />
  );
}

function SubmitRow({ onDone, loading }: { onDone: () => void; loading?: boolean }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        type="submit"
        disabled={loading}
        className={cx(
          "rounded-full bg-black px-6 py-3 text-sm font-semibold text-white",
          loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
        )}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button
        type="button"
        onClick={onDone}
        disabled={loading}
        className={cx(
          "rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black/70",
          loading ? "opacity-60 cursor-not-allowed" : "hover:border-black/25 hover:text-black"
        )}
      >
        Cancel
      </button>
    </div>
  );
}

/* ---------- Network Helper ---------- */

async function submitToWebApp(payload: Record<string, any>) {
  const res = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: any = null;

  try {
    data = JSON.parse(text);
  } catch {
    // ignore
  }

  if (!data?.ok) {
    throw new Error(data?.error || "Submission failed");
  }
}

/* ---------- Form Components ---------- */

function DiscipleshipForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
          await submitToWebApp({
            formType: "discipleship",
            fullName,
            phone,
            email,
            location,
            availability,
            notes,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setLocation(""); setAvailability(""); setNotes(""); setHp("");
          setTimeout(() => onDone(), 700);
        } catch (err: any) {
          setMsg(err?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }}
      className="grid gap-5"
    >
      <div className="hidden">
        <label>
          Leave this empty:
          <input value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Your name" />
        </Field>
        <Field label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+234..." />
        </Field>
      </div>

      <Field label="Email (optional)">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred Location">
          <Select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="" disabled>Select one</option>
            <option>SaltCity Central</option>
            <option>PTI Campus</option>
            <option>Online</option>
          </Select>
        </Field>
        <Field label="Availability">
          <Select value={availability} onChange={(e) => setAvailability(e.target.value)} required>
            <option value="" disabled>Select one</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Anytime</option>
          </Select>
        </Field>
      </div>

      <Field label="Anything we should know? (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Tell us briefly..." />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

function CompanyForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
          await submitToWebApp({
            formType: "company",
            fullName,
            phone,
            email,
            city,
            ageRange,
            notes,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setCity(""); setAgeRange(""); setNotes(""); setHp("");
          setTimeout(() => onDone(), 700);
        } catch (err: any) {
          setMsg(err?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }}
      className="grid gap-5"
    >
      <div className="hidden">
        <label>
          Leave this empty:
          <input value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Your name" />
        </Field>
        <Field label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+234..." />
        </Field>
      </div>

      <Field label="Email (optional)">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City / Area">
          <Input value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Warri, Effurun..." />
        </Field>
        <Field label="Age Range (optional)">
          <Select value={ageRange} onChange={(e) => setAgeRange(e.target.value)}>
            <option value="">Select one</option>
            <option>Under 18</option>
            <option>18–24</option>
            <option>25–34</option>
            <option>35–44</option>
            <option>45+</option>
          </Select>
        </Field>
      </div>

      <Field label="Notes (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Anything specific you're looking for..." />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

function ServeForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTeam, setPreferredTeam] = useState("");
  const [notes, setNotes] = useState("");
  const [hp, setHp] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
          await submitToWebApp({
            formType: "serve",
            fullName,
            phone,
            email,
            preferredTeam,
            notes,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setPreferredTeam(""); setNotes(""); setHp("");
          setTimeout(() => onDone(), 700);
        } catch (err: any) {
          setMsg(err?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }}
      className="grid gap-5"
    >
      <div className="hidden">
        <label>
          Leave this empty:
          <input value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Your name" />
        </Field>
        <Field label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+234..." />
        </Field>
      </div>

      <Field label="Email (optional)">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" />
      </Field>

      <Field label="Preferred Team (optional)">
        <Select value={preferredTeam} onChange={(e) => setPreferredTeam(e.target.value)}>
          <option value="">Select one</option>
          <option>Media/Tech</option>
          <option>Ushering</option>
          <option>Children's Ministry</option>
          <option>Worship Team</option>
          <option>Prayer Team</option>
          <option>Other</option>
        </Select>
      </Field>

      <Field label="Tell us about your interests (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="What are you passionate about?" />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

function CounselingForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
          await submitToWebApp({
            formType: "counseling",
            fullName,
            phone,
            email,
            message,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setMessage(""); setHp("");
          setTimeout(() => onDone(), 700);
        } catch (err: any) {
          setMsg(err?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }}
      className="grid gap-5"
    >
      <div className="hidden">
        <label>
          Leave this empty:
          <input value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Your name" />
        </Field>
        <Field label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+234..." />
        </Field>
      </div>

      <Field label="Email (optional)">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" />
      </Field>

      <Field label="How can we pray for you or support you?">
        <Textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
          rows={5} 
          placeholder="Share what's on your heart..." 
        />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}