"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";

type ActiveModal = "firstTime" | "discipleship" | "company" | null;

// tiny helper
function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NextSteps() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const pathname = usePathname();

  // The /new-here short link opens the First Time form directly.
  useEffect(() => {
    if (pathname === "/new-here") setActiveModal("firstTime");
  }, [pathname]);

  const NEXT_STEPS = useMemo(
    () => [
      {
        title: "First Time Here?",
        desc: "Let us know you came — we'll help you settle in and connect quickly.",
        action: () => setActiveModal("firstTime"),
        cta: "Let us know",
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" />
            <path d="M4 21v-1c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1" />
            <path d="M18 8h4" />
            <path d="M20 6v4" />
          </svg>
        ),
      },
      {
        title: "Sign up for Discipleship",
        desc: "Learn the foundations of faith and grow in your walk with Christ.",
        action: () => setActiveModal("discipleship"),
        cta: "Join the next class",
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ),
      },
      {
        title: "Join a Company",
        desc: "Do life with a community of believers close to you.",
        action: () => setActiveModal("company"),
        cta: "Find your community",
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="7" r="4" />
            <circle cx="16" cy="9" r="3" />
            <path d="M2 21v-3c0-2 2-4 5-4h4c3 0 5 2 5 4v3" />
            <path d="M18 21v-2c0-2 1-3 3-3" />
          </svg>
        ),
      },
      {
        title: "More Steps",
        desc: "Find out more about our growth structures.",
        href: "/next-steps",
        cta: "See all steps",
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        ),
      },
    ],
    []
  );

  return (
    <>
      <section className="bg-white py-24 md:py-36" data-next-steps>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-black/45">
                Next steps
              </div>
              <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.25rem)] font-black leading-[0.98] tracking-tight">
                Take your
                <br />
                next step.
              </h2>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-black/60">
                Pick the one that matches where you are right now.
              </p>
            </div>

            <ul className="border-t border-black/10">
              {NEXT_STEPS.map((step, idx) => {
                const inner = (
                  <>
                    <span className="w-9 flex-none self-start pt-1.5 text-sm font-bold tabular-nums text-black/35">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                        {step.title}
                      </span>
                      <span className="mt-2 block max-w-md text-base leading-relaxed text-black/60">
                        {step.desc}
                      </span>
                    </span>
                    <span aria-hidden="true" className="sc-step-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </>
                );

                return (
                  <li key={step.title} data-reveal style={{ ["--d" as string]: idx * 70 }}>
                    {"href" in step && step.href ? (
                      <Link href={step.href} className="sc-step">
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" onClick={step.action} className="sc-step">
                        {inner}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <Modal
        open={activeModal === "firstTime"}
        title="First Time Here?"
        description="Fill this and we'll help you connect quickly."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">We'll reach out within 24–48 hours.</div>}
      >
        <FirstTimeForm onDone={() => setActiveModal(null)} />
      </Modal>

      {/* Discipleship Modal */}
      <Modal
        open={activeModal === "discipleship"}
        title="Sign up for Discipleship"
        description="Classes hold every Sunday at 7am at SaltCity Central. Fill this and we'll reach out with the next steps."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">By submitting, you agree we may contact you about discipleship.</div>}
      >
        <DiscipleshipForm onDone={() => setActiveModal(null)} />
      </Modal>

      {/* Company Modal */}
      <Modal
        open={activeModal === "company"}
        title="Join a Company"
        description="Tell us where you are and what kind of community you're looking for."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">We'll connect you to a company lead near you.</div>}
      >
        <CompanyForm onDone={() => setActiveModal(null)} />
      </Modal>
    </>
  );
}

/* ---------- shared UI ---------- */

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

/* ---------- network helper ---------- */

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

/* ---------- First Time Form ---------- */

function FirstTimeForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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
            formType: "firstTime",
            fullName,
            phone,
            email,
            location,
            notes,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setLocation(""); setNotes(""); setHp("");
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

      <Field label="Which service did you attend? (optional)">
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="SaltCity Central, PTI Campus..." />
      </Field>

      <Field label="Question / Comment / Prayer Request (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Ask a question, leave a comment, or share a prayer request…" />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

/* ---------- Discipleship Form ---------- */
// Classes: every Sunday at 7am, SaltCity Central. No location or availability fields.

function DiscipleshipForm({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
            notes,
            hp,
          });

          setMsg("Submitted. We'll reach out soon.");
          setFullName(""); setPhone(""); setEmail(""); setNotes(""); setHp("");
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

      <Field label="Anything we should know? (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Tell us briefly..." />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

/* ---------- Company Form ---------- */

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