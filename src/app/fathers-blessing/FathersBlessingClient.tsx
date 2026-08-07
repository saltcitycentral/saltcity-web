"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * "A Father's Blessing" — a simple registration for pastors and ministers.
 * Palette: cream #FBF7EF · ink #241B10 · gold #9A6A1C
 */
const ACCENT = "#9A6A1C";

type Status = "idle" | "submitting" | "done" | "error";

const TITLES = ["Pastor", "Apostle", "Bishop", "Reverend", "Prophet", "Evangelist", "Other"];
const ROLES = ["Senior Pastor", "Associate Pastor", "Other"];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#241B10]/55">
      {children}
    </div>
  );
}

const field =
  "mt-2 w-full rounded-xl border border-[#241B10]/15 bg-white px-4 py-3 text-[15px] text-[#241B10] " +
  "placeholder:text-[#241B10]/35 transition focus:outline-none focus:border-[#241B10]/35 " +
  "focus:ring-4 focus:ring-[#9A6A1C]/20";

export default function FathersBlessingClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [mounted, setMounted] = useState(false);

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
    try {
      const res = await fetch("/api/fathers-blessing", {
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
    <main className="min-h-screen bg-[#FBF7EF] font-sans text-[#241B10]">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* poster */}
          <div
            className="lg:sticky lg:top-24"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_24px_70px_rgba(36,27,16,0.18)]">
              <Image
                src="/images/fathers-blessing/poster.jpg"
                alt="A Father's Blessing — Wednesday, August 19, 2026, 5pm, 20 Okumagba Avenue, Warri. Host: Tobore David. Ministering: Tony Rapu."
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>

          {/* details + form */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(14px)",
              transition: "opacity 700ms ease 120ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
              SaltCity Central
            </div>
            <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl">
              A Father&apos;s Blessing
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#241B10]/70">
              An evening for pastors and ministers. Register below to join us.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-bold">Wednesday, August 19, 2026 · 5pm</span>
              <span className="text-[#241B10]/25">·</span>
              <span className="text-[#241B10]/70">20 Okumagba Avenue, Warri</span>
            </div>

            {/* form card */}
            <div className="mt-8 rounded-2xl border border-[#241B10]/10 bg-white p-6 shadow-[0_24px_70px_rgba(36,27,16,0.07)] md:p-8">
              {status === "done" ? (
                <div className="py-6 text-center">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-5 text-2xl font-black tracking-tight">You&apos;re registered.</h2>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#241B10]/65">
                    Thank you — we look forward to hosting you. We&apos;ll be in
                    touch with any details.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-bold underline underline-offset-4"
                    style={{ color: ACCENT }}
                  >
                    Register someone else
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  {/* honeypot */}
                  <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Leave this empty
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <Label>First name</Label>
                      <input name="firstName" required placeholder="First name" autoComplete="given-name" className={field} />
                    </label>
                    <label className="block">
                      <Label>Surname</Label>
                      <input name="surname" required placeholder="Surname" autoComplete="family-name" className={field} />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <Label>Title</Label>
                      <select name="title" defaultValue="" required className={field}>
                        <option value="" disabled>Select one</option>
                        {TITLES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <Label>Role</Label>
                      <select name="role" defaultValue="" required className={field}>
                        <option value="" disabled>Select one</option>
                        {ROLES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <Label>Email</Label>
                      <input name="email" type="email" required placeholder="you@email.com" autoComplete="email" className={field} />
                    </label>
                    <label className="block">
                      <Label>Phone · WhatsApp</Label>
                      <input name="phone" required placeholder="+234…" autoComplete="tel" className={field} />
                    </label>
                  </div>

                  <label className="block">
                    <Label>Church</Label>
                    <input name="church" required placeholder="Your church / ministry" className={field} />
                  </label>

                  <div className="mt-1 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {status === "submitting" ? "Registering…" : "Register"}
                    </button>
                    {status === "error" && (
                      <span className="text-sm font-medium text-red-600">
                        Something went wrong. Please try again.
                      </span>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-[#241B10]/45">
                    By registering you agree we may contact you about this program.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
