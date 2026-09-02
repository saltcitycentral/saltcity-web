"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { WeekdayClass } from "@/lib/weekdayClasses";

type Status = "idle" | "submitting" | "done" | "error";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B1526]/55">
      {children}
    </div>
  );
}

const field =
  "mt-2 w-full rounded-xl border border-[#0B1526]/15 bg-white px-4 py-3 text-[15px] text-[#0B1526] " +
  "placeholder:text-[#0B1526]/35 transition focus:outline-none focus:border-[#0B1526]/35 " +
  "focus:ring-4 focus:ring-black/5";

export default function ClassSignupClient({ config }: { config: WeekdayClass }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const accent = config.accent;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (payload.website) {
      setStatus("done");
      form.reset();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/class-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, classKey: config.key }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Submission failed");
      setStatus("done");
      form.reset();
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong.");
      setStatus("error");
    }
  }

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(14px)",
    transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <main className="min-h-screen bg-[#FAF8F2] font-sans text-[#0B1526]">
      {/* artwork — portrait on mobile, landscape on desktop */}
      <section className="w-full overflow-hidden bg-[#0B1526]" style={fade()}>
        <div className="relative aspect-[4/5] w-full sm:hidden">
          <Image
            src={config.portrait}
            alt={`${config.title} with ${config.teacher} — ${config.time}, ${config.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative hidden aspect-video w-full sm:block">
          <Image
            src={config.landscape}
            alt={`${config.title} with ${config.teacher} — ${config.time}, ${config.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* details + form */}
      <section className="mx-auto max-w-[640px] px-6 py-14 md:py-20" style={fade(120)}>
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
            SaltCity Central · Weekday Class
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {config.title}
          </h1>
          <p className="mt-2 text-lg font-semibold text-[#0B1526]/80">with {config.teacher}</p>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#0B1526]/65">
            {config.blurb}
          </p>

          <dl className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0B1526]/12 bg-[#0B1526]/12">
            <div className="bg-[#FAF8F2] px-4 py-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/45">
                Time
              </dt>
              <dd className="mt-1 text-sm font-bold leading-snug">{config.time}</dd>
            </div>
            <div className="bg-[#FAF8F2] px-4 py-4">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/45">
                Location
              </dt>
              <dd className="mt-1 text-sm font-bold leading-snug">{config.location}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 rounded-2xl border border-[#0B1526]/10 bg-white p-6 shadow-[0_24px_70px_rgba(11,21,38,0.06)] md:p-8">
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
              <h2 className="mt-5 text-2xl font-black tracking-tight">You&apos;re registered.</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#0B1526]/65">
                We&apos;ll send you the Telegram link and a reminder before class.
                See you Thursday.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-bold underline underline-offset-4"
                style={{ color: accent }}
              >
                Register someone else
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-black tracking-tight">Register</h2>
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
                  <Label>Phone number</Label>
                  <input name="phone" required placeholder="+234…" autoComplete="tel" className={field} />
                </label>

                <label className="block">
                  <Label>Email (optional)</Label>
                  <input name="email" type="email" placeholder="you@email.com" autoComplete="email" className={field} />
                </label>

                <div className="mt-1 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: accent }}
                  >
                    {status === "submitting" ? "Registering…" : "Register"}
                  </button>
                  {errorMsg && <span className="text-sm font-medium text-red-600">{errorMsg}</span>}
                </div>

                <p className="text-xs leading-relaxed text-[#0B1526]/45">
                  By registering you agree we may contact you about this class.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
