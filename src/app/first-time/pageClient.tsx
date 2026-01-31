"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-black/60">
          {label}
        </div>
        {hint ? <div className="text-xs text-black/40">{hint}</div> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-2xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/35",
        "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        "focus:outline-none focus:ring-4 focus:ring-black/10 focus:border-black/20",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-2xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black",
        "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        "focus:outline-none focus:ring-4 focus:ring-black/10 focus:border-black/20",
      ].join(" ")}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-2xl border border-black/10 bg-white px-4 py-3",
        "text-sm text-black placeholder:text-black/35",
        "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
        "focus:outline-none focus:ring-4 focus:ring-black/10 focus:border-black/20",
      ].join(" ")}
    />
  );
}

export default function FirstTimeClient() {
  const [status, setStatus] = useState<Status>("idle");

  // Use /new as the permanent share URL
  const shareUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    return base ? `${base}/new` : "/new";
  }, []);

  const qrImgSrc = useMemo(() => {
    return `/api/qr?text=${encodeURIComponent(shareUrl)}`;
  }, [shareUrl]);

  return (
    <div className="grid gap-8 lg:grid-cols-5 items-start">
      {/* FORM CARD */}
      <div className="lg:col-span-3 rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-7 md:p-9">
        <div className="mb-7">
          <div className="text-lg font-black text-black">Welcome</div>
          <div className="mt-1 text-sm text-black/60">
            Takes less than a minute.
          </div>
        </div>

        <form
          className="grid gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus("submitting");

            const form = e.currentTarget;
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            try {
              const res = await fetch("/api/first-time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              if (!res.ok) throw new Error("bad_response");

              setStatus("done");
              form.reset();
              setTimeout(() => setStatus("idle"), 4000);
            } catch {
              setStatus("error");
              setTimeout(() => setStatus("idle"), 5000);
            }
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <Input name="fullName" required placeholder="Your name" autoComplete="name" />
            </Field>

            <Field label="Phone Number" hint="WhatsApp preferred">
              <Input name="phone" required placeholder="+234..." autoComplete="tel" />
            </Field>
          </div>

          <Field label="Email (optional)">
            <Input name="email" type="email" placeholder="you@email.com" autoComplete="email" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Closest Location">
              <Select name="location" defaultValue="" required>
                <option value="" disabled>Select one</option>
                <option>SaltCity Central</option>
                <option>PTI Campus</option>
                <option>Online</option>
              </Select>
            </Field>

            <Field label="How did you hear about us?">
              <Select name="source" defaultValue="" required>
                <option value="" disabled>Select one</option>
                <option>Friend / Family</option>
                <option>Social Media</option>
                <option>Invite / Flyer</option>
                <option>Walk-in</option>
                <option>Other</option>
              </Select>
            </Field>
          </div>

          <Field label="Anything we should know? (optional)">
            <Textarea name="notes" rows={4} placeholder="Tell us briefly..." />
          </Field>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting..." : "Submit"}
            </button>

            {status === "done" && (
              <span className="text-sm text-emerald-700">
                Submitted. Welcome — we’ll reach out shortly.
              </span>
            )}

            {status === "error" && (
              <span className="text-sm text-red-600">
                Something went wrong. Try again.
              </span>
            )}
          </div>
        </form>
      </div>

      {/* SHARE CARD */}
      <div className="lg:col-span-2 lg:sticky lg:top-24 rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-7 md:p-9">
        <div className="text-lg font-black text-black">Share this form</div>
        <p className="mt-2 text-sm text-black/65 leading-relaxed">
          Show the QR after service or share the link. It always points to the First-Time form.
        </p>

        <div className="mt-5 rounded-2xl border border-black/10 bg-[#fafafa] p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            Link
          </div>
          <div className="text-sm text-black break-all">{shareUrl}</div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black/80 hover:border-black/25"
            >
              Copy link
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`First Time Form: ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/15 px-5 py-2 text-sm font-semibold text-black/80 hover:border-black/25"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            QR code
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrImgSrc} alt="QR code for first-time form" className="w-44 h-44" />
          </div>

          <a
            href={qrImgSrc}
            download="saltcity-first-time-qr.png"
            className="mt-4 inline-flex w-full justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Download QR (PNG)
          </a>

          <div className="mt-4 text-xs text-black/45">
            Tip: For service screens, use the short link <span className="font-semibold text-black/70">/new</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
