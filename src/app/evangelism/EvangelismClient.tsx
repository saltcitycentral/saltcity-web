"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANIES } from "./companies";

const ACCENT = "#2E7D50";

type Status = "idle" | "submitting" | "done" | "error";
type Guest = { id: number; name: string; phone: string; coming: string };

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
  "focus:ring-4 focus:ring-[#2E7D50]/20";

function nextSunday(): string {
  const d = new Date();
  const day = d.getDay(); // 0 = Sunday
  d.setDate(d.getDate() + (day === 0 ? 7 : 7 - day));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export default function EvangelismClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [memberName, setMemberName] = useState("");
  const [company, setCompany] = useState("");
  const [guests, setGuests] = useState<Guest[]>([{ id: 1, name: "", phone: "", coming: "" }]);
  const nextId = useRef(2);
  const mountedAt = useRef(0);

  // Set the default date on the client to avoid an SSR/CSR hydration mismatch.
  useEffect(() => {
    mountedAt.current = Date.now();
    setServiceDate(nextSunday());
  }, []);

  const addGuest = () =>
    setGuests((g) => [...g, { id: nextId.current++, name: "", phone: "", coming: "" }]);
  const removeGuest = (id: number) =>
    setGuests((g) => (g.length > 1 ? g.filter((x) => x.id !== id) : g));
  const updateGuest = (id: number, patch: Partial<Guest>) =>
    setGuests((g) => g.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const named = guests.map((g) => ({ ...g, name: g.name.trim(), phone: g.phone.trim() })).filter((g) => g.name);
    if (!memberName.trim() || !company || !named.length) {
      setErrorMsg("Add your name, company, and at least one guest.");
      return;
    }
    if (named.some((g) => !g.coming)) {
      setErrorMsg("Pick “Coming this Sunday?” for each guest.");
      return;
    }

    const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value || "";
    setStatus("submitting");
    try {
      const res = await fetch("/api/evangelism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceDate,
          memberName: memberName.trim(),
          company,
          guests: named.map((g) => ({ name: g.name, phone: g.phone, coming: g.coming })),
          elapsedMs: Date.now() - mountedAt.current,
          website: hp,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Submission failed");
      setStatus("done");
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong.");
      setStatus("error");
    }
  }

  function reset() {
    setMemberName("");
    setCompany("");
    setGuests([{ id: nextId.current++, name: "", phone: "", coming: "" }]);
    setServiceDate(nextSunday());
    setStatus("idle");
    setErrorMsg("");
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] font-sans text-[#0B1526]">
      <div className="mx-auto max-w-[720px] px-6 py-14 md:py-20">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          SaltCity Central · Evangelism
        </div>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl">
          Weekly Invite Report
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#0B1526]/70">
          Log the guest(s) you&apos;re bringing to church this Sunday. Add as many as you like.
        </p>

        <div className="mt-8 rounded-2xl border border-[#0B1526]/10 bg-white p-6 shadow-[0_24px_70px_rgba(11,21,38,0.06)] md:p-8">
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
              <h2 className="mt-5 text-2xl font-black tracking-tight">Submitted — thank you!</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#0B1526]/65">
                We&apos;ve logged your invites. Keep reaching out — see you Sunday.
              </p>
              <button
                onClick={reset}
                className="mt-6 text-sm font-bold underline underline-offset-4"
                style={{ color: ACCENT }}
              >
                Log another
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
                  <Label>Service date (this Sunday)</Label>
                  <input
                    type="date"
                    required
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className={field}
                  />
                </label>
                <label className="block">
                  <Label>Your name</Label>
                  <input
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Member name"
                    autoComplete="name"
                    className={field}
                  />
                </label>
              </div>

              <label className="block">
                <Label>Company</Label>
                <select required value={company} onChange={(e) => setCompany(e.target.value)} className={field}>
                  <option value="" disabled>Select your company</option>
                  {COMPANIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <div>
                <Label>Guests</Label>
                <div className="mt-3 grid gap-3">
                  {guests.map((g, i) => (
                    <div key={g.id} className="rounded-xl border border-[#0B1526]/10 bg-[#FAF8F2] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B1526]/45">
                          Guest {i + 1}
                        </span>
                        {guests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGuest(g.id)}
                            className="text-sm font-bold text-[#0B1526]/40 transition hover:text-red-600"
                            aria-label={`Remove guest ${i + 1}`}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <input
                        value={g.name}
                        onChange={(e) => updateGuest(g.id, { name: e.target.value })}
                        placeholder="Guest name"
                        className={`${field} mt-3`}
                      />
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          value={g.phone}
                          onChange={(e) => updateGuest(g.id, { phone: e.target.value })}
                          placeholder="Guest phone (optional)"
                          autoComplete="off"
                          className={field}
                        />
                        <select
                          value={g.coming}
                          onChange={(e) => updateGuest(g.id, { coming: e.target.value })}
                          className={field}
                        >
                          <option value="" disabled>Coming this Sunday?</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Maybe</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addGuest}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashed px-5 py-2.5 text-sm font-bold transition hover:bg-white"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  ＋ Add another guest
                </button>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: ACCENT }}
                >
                  {status === "submitting" ? "Submitting…" : "Submit report"}
                </button>
                {errorMsg && <span className="text-sm font-medium text-red-600">{errorMsg}</span>}
              </div>

              <p className="text-xs leading-relaxed text-[#0B1526]/45">
                One report per week — you can log everyone you&apos;re inviting in a single submission.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
