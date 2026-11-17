"use client";

import { useState } from "react";
import { ACCOUNT_NAME, ACCOUNTS } from "./accounts";

/**
 * The accounts as a list: what each is for, the bank, and the number large
 * enough to read off a screen, with a button that copies it.
 */
export default function AccountList({ dark = false, reveal = true }: { dark?: boolean; reveal?: boolean }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(number: string) {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(number);
      setTimeout(() => setCopied((c) => (c === number ? null : c)), 2200);
    } catch {
      /* clipboard blocked: the number is on screen to copy by hand */
    }
  }

  const line = dark ? "border-white/15" : "border-black/10";
  const soft = dark ? "text-white/55" : "text-black/50";

  return (
    <div>
      <ul className={`border-t ${line}`}>
        {ACCOUNTS.map((a, i) => (
          <li
            key={a.number}
            // Inside an answer that has just been opened, the rows are simply there.
            {...(reveal ? { "data-reveal": true, style: { ["--d" as string]: Math.min(i, 6) * 50 } } : {})}
            className={`flex flex-wrap items-center gap-x-8 gap-y-3 border-b py-6 ${line}`}
          >
            <div className="min-w-[11rem] flex-1">
              <div className="text-lg font-black leading-snug tracking-tight md:text-xl">
                {a.purpose}
                {a.currency !== "Naira" ? ` (${a.currency})` : ""}
              </div>
              <div className={`mt-1 text-xs font-bold uppercase tracking-[0.18em] ${soft}`}>
                {a.bank} · {a.currency}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-2xl font-black tabular-nums tracking-tight md:text-3xl">{a.number}</span>
              <button
                type="button"
                onClick={() => copy(a.number)}
                aria-label={`Copy ${a.bank} ${a.currency} account number`}
                className={`min-w-[5.5rem] rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                  dark
                    ? "border-white/30 hover:border-white hover:bg-white hover:text-black"
                    : "border-black/20 hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <span aria-live="polite">{copied === a.number ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className={`mt-5 text-sm ${soft}`}>Every account is in the name {ACCOUNT_NAME}.</p>
    </div>
  );
}
