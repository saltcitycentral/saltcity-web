"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Modal from "@/components/ui/Modal";

type ActiveModal = "firstTime" | "discipleship" | "company" | null;



// tiny helper
function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NextSteps() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.querySelector("[data-next-steps]");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const NEXT_STEPS = useMemo(
    () => [
      {
        title: "First Time Here?",
        desc: "Let us know you came — we’ll help you settle in and connect quickly.",
        action: () => setActiveModal("firstTime"),
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
      <section className="py-16 bg-white" data-next-steps>
        <Container>
          <div className={cx("transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <h2 className="text-center text-4xl font-black mb-12 tracking-tight">Start Growing</h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {NEXT_STEPS.map((step, idx) => {
                const CardInner = (
                  <div
                    className={cx(
                      "relative h-full flex flex-col",
                      "rounded-2xl p-8 border border-black/5 bg-white",
                      "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                      "transition-all duration-300",
                      "hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.14)]",
                      "active:translate-y-0.5 active:shadow-[0_8px_22px_rgba(0,0,0,0.12)]",
                      "group"
                    )}
                    style={{ transitionDelay: inView ? `${idx * 70}ms` : "0ms" }}
                  >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-black/0 group-hover:bg-black/5 blur-2xl transition-colors duration-300" />
                      <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-black/0 group-hover:bg-black/5 blur-2xl transition-colors duration-300" />
                    </div>

                    <div className="w-16 h-16 rounded-xl bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-black leading-snug min-h-[3.2rem]">{step.title}</h3>
                    <p className="text-base text-black/70 leading-relaxed min-h-[4.5rem]">{step.desc}</p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-black/70">
                      <span className="transition-colors duration-300 group-hover:text-black">Continue</span>
                      <span className="relative overflow-hidden w-6 h-4">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                );

                if ("href" in step && step.href) {
                  return (
                    <Link key={step.title} href={step.href} className="block">
                      <div
                        className={cx("transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
                        style={{ transitionDelay: inView ? `${idx * 70}ms` : "0ms" }}
                      >
                        {CardInner}
                      </div>
                    </Link>
                  );
                }

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={step.action}
                    className="text-left block"
                  >
                    <div
                      className={cx("transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}
                      style={{ transitionDelay: inView ? `${idx * 70}ms` : "0ms" }}
                    >
                      {CardInner}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* First Time Modal */}
      <Modal
        open={activeModal === "firstTime"}
        title="First Time Here?"
        description="Fill this and we’ll help you connect quickly."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">We’ll reach out within 24–48 hours.</div>}
      >
        <FirstTimeForm onDone={() => setActiveModal(null)} />
      </Modal>

      {/* Discipleship Modal */}
      <Modal
        open={activeModal === "discipleship"}
        title="Sign up for Discipleship"
        description="Fill this and we’ll reach out with the next steps."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">By submitting, you agree we may contact you about discipleship.</div>}
      >
        <DiscipleshipForm onDone={() => setActiveModal(null)} />
      </Modal>

      {/* Company Modal */}
      <Modal
        open={activeModal === "company"}
        title="Join a Company"
        description="Tell us where you are and what kind of community you’re looking for."
        onClose={() => setActiveModal(null)}
        footer={<div className="text-xs text-black/60">We’ll connect you to a company lead near you.</div>}
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

function SubmitRow({
  onDone,
  loading,
}: {
  onDone: () => void;
  loading?: boolean;
}) {
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
  const [hp, setHp] = useState(""); // honeypot

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

          setMsg("Submitted. We’ll reach out soon.");
          // optional reset
          setFullName(""); setPhone(""); setEmail(""); setLocation(""); setNotes(""); setHp("");

          // close after a beat
          setTimeout(() => onDone(), 700);
        } catch (err: any) {
          setMsg(err?.message || "Something went wrong.");
        } finally {
          setLoading(false);
        }
      }}
      className="grid gap-5"
    >
      {/* honeypot (hidden) */}
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

      <Field label="Preferred Location (optional)">
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="SaltCity Central, PTI Campus..." />
      </Field>

      <Field label="Anything we should know? (optional)">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Tell us briefly..." />
      </Field>

      {msg && <div className="text-sm font-semibold text-black/70">{msg}</div>}

      <SubmitRow onDone={onDone} loading={loading} />
    </form>
  );
}

/* ---------- Discipleship Form ---------- */

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

          setMsg("Submitted. We’ll reach out soon.");
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

          setMsg("Submitted. We’ll reach out soon.");
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
