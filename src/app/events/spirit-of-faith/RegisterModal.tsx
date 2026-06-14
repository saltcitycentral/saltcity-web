"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type Status = "idle" | "submitting" | "done" | "error";

const LIME = "#CEDD0E";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B1526]/55">
      {children}
    </div>
  );
}

const fieldCls =
  "mt-2 w-full rounded-xl border border-[#0B1526]/12 bg-white px-4 py-3 text-[15px] text-[#0B1526] " +
  "placeholder:text-[#0B1526]/35 transition focus:outline-none focus:border-[#0B1526]/30 " +
  "focus:ring-4 focus:ring-[#CEDD0E]/40";

export default function RegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // Honeypot: humans never fill this hidden field. If it's set, it's a bot —
    // fake a success so it moves on, and never hit the sheet.
    if (payload.website) {
      setStatus("done");
      form.reset();
      return;
    }
    try {
      const res = await fetch("/api/conference", {
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
    <Modal
      open={open}
      onClose={onClose}
      title="Register — The Spirit of Faith"
      description="June 26–28, 2026 · The Centre of Discipleship, Warri. Takes under a minute."
    >
      {status === "done" ? (
        <div className="py-6 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: LIME }}
          >
            <svg className="h-7 w-7 text-[#0B1526]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="mt-5 text-2xl font-black tracking-tight text-[#0B1526]">
            You’re registered.
          </h4>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#0B1526]/65">
            We’ll be in touch with the conference details. Come ready to walk in
            liberty — and bring someone with you.
          </p>
          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-[#0B1526] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#0B1526]/85"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* honeypot — hidden from humans, irresistible to bots */}
          <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Leave this field empty
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <Label>Full name</Label>
              <input name="fullName" required placeholder="Your name" autoComplete="name" className={fieldCls} />
            </label>
            <label className="block">
              <Label>Phone · WhatsApp</Label>
              <input name="phone" required placeholder="+234…" autoComplete="tel" className={fieldCls} />
            </label>
          </div>

          <label className="block">
            <Label>Email (optional)</Label>
            <input name="email" type="email" placeholder="you@email.com" autoComplete="email" className={fieldCls} />
          </label>

          <label className="block">
            <Label>How did you hear about this?</Label>
            <select name="source" defaultValue="" required className={fieldCls}>
              <option value="" disabled>Select one</option>
              <option>A friend or family</option>
              <option>Social media</option>
              <option>Church announcement</option>
              <option>Flyer or invite</option>
              <option>Other</option>
            </select>
          </label>

          <label className="block">
            <Label>Anything we should know? (optional)</Label>
            <textarea name="notes" rows={3} placeholder="Prayer request, partnership, group size…" className={fieldCls} />
          </label>

          <div className="mt-1 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-full bg-[#0B1526] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B1526]/85 disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Complete registration"}
            </button>
            {status === "error" && (
              <span className="text-sm font-medium text-red-600">
                Something went wrong. Please try again.
              </span>
            )}
          </div>

          <p className="text-xs leading-relaxed text-[#0B1526]/45">
            By registering you agree we may contact you about the conference and
            next steps.
          </p>
        </form>
      )}
    </Modal>
  );
}
