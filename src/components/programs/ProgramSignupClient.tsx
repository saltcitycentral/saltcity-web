"use client";

import { useState } from "react";

export type ProgramConfig = {
  program: "assignment" | "wildfire";
  kicker: string;
  title: string;
  tagline: string;
  schedule: { label: string; value: string }[];
  startNote: string;
  accent: string; // hex
};

type Status = "idle" | "submitting" | "done" | "error";

const INK = "#0B1526";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/55">
      {children}
    </div>
  );
}

const field =
  "mt-2 w-full rounded-xl border border-[#0B1526]/12 bg-white px-4 py-3 text-[15px] text-[#0B1526] " +
  "placeholder:text-[#0B1526]/35 transition focus:outline-none focus:border-[#0B1526]/30 " +
  "focus:ring-4 focus:ring-[#0B1526]/10";

export default function ProgramSignupClient({ config }: { config: ProgramConfig }) {
  const [status, setStatus] = useState<Status>("idle");
  const accent = config.accent;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (payload.website) {
      setStatus("done");
      form.reset();
      return;
    }
    payload.program = config.program;
    try {
      const res = await fetch("/api/program-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad_response");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] font-sans text-[#0B1526]">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — the program */}
          <div className="lg:sticky lg:top-28">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {config.kicker}
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
              {config.title}
            </h1>
            <div className="mt-6 h-1 w-16 rounded-full" style={{ backgroundColor: accent }} />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-[#0B1526]/70">
              {config.tagline}
            </p>

            <dl className="mt-10 border-t border-[#0B1526]/10">
              {config.schedule.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-[#0B1526]/10 py-4"
                >
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1526]/45">
                    {row.label}
                  </dt>
                  <dd className="text-right text-base font-bold">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
              {config.startNote}
            </p>
          </div>

          {/* RIGHT — sign up */}
          <div className="rounded-2xl border border-[#0B1526]/10 bg-white p-7 shadow-[0_24px_70px_rgba(11,21,38,0.07)] md:p-9">
            {status === "done" ? (
              <div className="py-6 text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: accent }}
                >
                  <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-5 text-2xl font-black tracking-tight">You’re in.</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#0B1526]/65">
                  We’ll send you the details. See you there — and feel free to
                  bring someone with you.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-bold underline underline-offset-4"
                  style={{ color: accent }}
                >
                  Sign up someone else
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black tracking-tight">Count me in</h2>
                <p className="mt-1 text-sm text-[#0B1526]/55">Takes a few seconds.</p>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
                  {/* honeypot */}
                  <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Leave this empty
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <label className="block">
                    <Label>Full name</Label>
                    <input name="fullName" required placeholder="Your name" autoComplete="name" className={field} />
                  </label>

                  <label className="block">
                    <Label>Phone · WhatsApp</Label>
                    <input name="phone" required placeholder="+234…" autoComplete="tel" className={field} />
                  </label>

                  <label className="block">
                    <Label>Email (optional)</Label>
                    <input name="email" type="email" placeholder="you@email.com" autoComplete="email" className={field} />
                  </label>

                  <label className="block">
                    <Label>Prayer request (optional)</Label>
                    <textarea name="notes" rows={3} placeholder="Anything you’d like us to stand with you on…" className={field} />
                  </label>

                  <div className="mt-1 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: accent }}
                    >
                      {status === "submitting" ? "Signing up…" : "Sign me up"}
                    </button>
                    {status === "error" && (
                      <span className="text-sm font-medium text-red-600">
                        Something went wrong. Please try again.
                      </span>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-[#0B1526]/45">
                    By signing up you agree we may contact you about this program.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
