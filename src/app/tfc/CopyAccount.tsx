"use client";

import { useState } from "react";

/** The account number, with a button that copies it. */
export default function CopyAccount({ number }: { number: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked: the number is on screen to copy by hand */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <span className="text-4xl font-black tabular-nums tracking-tight sm:text-5xl">{number}</span>
      <button type="button" onClick={copy} className="tfc-btn tfc-btn-dark">
        <span>{copied ? "Copied" : "Copy number"}</span>
      </button>
    </div>
  );
}
