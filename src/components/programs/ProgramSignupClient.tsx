"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type ProgramConfig = {
  program: "assignment" | "wildfire";
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  tagline: string;
  schedule: { label: string; value: string }[];
  accent: string; // hex
};

type Status = "idle" | "submitting" | "done" | "error";

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
  const [mounted, setMounted] = useState(false);
  const accent = config.accent;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

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
    <main className="bg-[#FAF8F2] font-sans text-[#0B1526]">
      {/* ───────────────────────── banner hero (the artwork) */}
      <section className="w-full overflow-hidden bg-[#0B1526]">
        <div className="relative mx-auto aspect-video w-full max-w-[1920px]">
          <Image
            src={config.image}
            alt={config.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ transform: mounted ? "scale(1)" : "scale(1.04)" }}
          />
        </div>
      </section>

      {/* ───────────────────────── signup */}
      <section
        className="mx-auto max-w-[660px] px-6 py-16 md:py-24"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(16px)",
          transition: "opacity 800ms ease 120ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 120ms",
        }}
      >
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
            {config.kicker}
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {config.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[#0B1526]/70">
            {config.tagline}
          </p>

          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            {config.schedule.map((s, i) => (
              <span key={s.label} className="inline-flex items-center">
                {i > 0 && <span className="mr-3 text-[#0B1526]/25">·</span>}
                <span className="font-bold text-[#0B1526]">{s.value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* form card */}
        <div className="mt-10 rounded-2xl border border-[#0B1526]/10 bg-white p-7 shadow-[0_24px_70px_rgba(11,21,38,0.07)] md:p-9">
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
      </section>
    </main>
  );
}
