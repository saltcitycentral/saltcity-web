"use client";

import { useMemo, useState } from "react";

const TEAL = "#1f71be";

type GivingChannel = {
  label: string;
  detail: string;
  sub?: string;
  status?: "ok" | "info";
  currencySymbol?: string;
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={onCopy}
      className={[
        "mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all",
        copied
          ? "bg-emerald-50 text-emerald-700"
          : "border hover:bg-black/5",
      ].join(" ")}
      style={!copied ? { borderColor: TEAL, color: TEAL } : undefined}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function GivingWaysPage() {
  const CHANNELS: GivingChannel[] = useMemo(
    () => [
      { label: "Partnership Account", detail: "1015095018", sub: "Zenith Bank", currencySymbol: "₦", status: "ok" },
      { label: "Property Partnership", detail: "4150051597", sub: "Fidelity Bank", currencySymbol: "₦", status: "ok" },
      { label: "Offerings (Access)", detail: "0073530847", sub: "Access Bank", currencySymbol: "₦", status: "info" },
      { label: "Offerings (GTBank ₦)", detail: "0431944413", sub: "GTBank Naira", currencySymbol: "₦", status: "info" },
      { label: "Offerings (GTBank $)", detail: "0469266462", sub: "GTBank Dollar", currencySymbol: "$", status: "info" },
      { label: "Offerings (GTBank £)", detail: "0469266479", sub: "GTBank Pound", currencySymbol: "£", status: "info" },
    ],
    []
  );

  return (
    <main>
      {/* HERO */}
      <section>
        <div
          className="h-[360px]"
          style={{ background: `linear-gradient(135deg, ${TEAL}, #0fbfb1)` }}
        >
          <div className="mx-auto max-w-[1200px] px-6 h-full flex items-center justify-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-white">
                Ways to give
              </h1>
              <p className="mt-4 text-white/90 text-lg">
                Thank you for partnering with SaltCity. Your generosity helps us reach more lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900">Official Accounts</h2>
            <p className="text-slate-500 mt-2">SaltCity Church Accounts</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((c) => (
              <div
                key={c.detail}
                className="rounded-2xl bg-white p-6 border border-black/5"
                style={{
                  boxShadow: "0 12px 40px rgba(8,182,166,0.12)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl grid place-items-center font-black text-white"
                      style={{ background: TEAL }}
                    >
                      {c.currencySymbol || "₦"}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{c.label}</div>
                      {c.sub && (
                        <div className="text-xs text-black/50 font-medium">{c.sub}</div>
                      )}
                    </div>
                  </div>

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: c.status === "ok" ? "#22c55e" : "#fbbf24" }}
                  />
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-4 text-center">
                  <div className="text-xl font-black tracking-widest text-slate-800">
                    {c.detail}
                  </div>
                </div>

                <CopyButton value={c.detail} />
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center max-w-2xl mx-auto border border-dashed border-slate-200">
            <p className="text-sm font-medium text-slate-600">
              After making a transfer, please send your confirmation receipt to our official WhatsApp line for record purposes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}