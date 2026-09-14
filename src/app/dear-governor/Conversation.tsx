"use client";

import { useEffect, useRef, useState } from "react";

type Comment = { id: string; created_at: string; name: string; context: string | null; body: string };

const field =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#1F2328] " +
  "placeholder:text-black/35 transition focus:outline-none focus:border-black/35 focus:ring-4 focus:ring-[#1BA3D6]/20";

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

export default function Conversation() {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    fetch("/api/dear-governor/comments", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => setComments([]));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value ?? "";
    setStatus("sending");
    try {
      const res = await fetch("/api/dear-governor/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, context, body, website: hp, elapsedMs: Date.now() - mountedAt.current }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn't post.");
      if (data.comment) setComments((c) => [data.comment, ...(c ?? [])]);
      setBody("");
      setMsg({ ok: true, text: "Thank you — your voice has been added." });
    } catch (err: any) {
      setMsg({ ok: false, text: err?.message || "Something went wrong." });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="mt-10">
      <form onSubmit={submit} className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="block">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">Your comment</span>
          <textarea
            required
            minLength={3}
            maxLength={2000}
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Why do gifted people leave Warri — and is there anything we can do about it?"
            className={`${field} mt-2`}
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">Your name</span>
            <input required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" className={`${field} mt-2`} />
          </label>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">What you do (optional)</span>
            <input maxLength={80} value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g. Engineer, now in Lagos" className={`${field} mt-2`} />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-[#1F2328] px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Posting…" : "Post comment"}
          </button>
          {msg && <span className={`text-sm font-medium ${msg.ok ? "text-[#1B8F4B]" : "text-red-600"}`}>{msg.text}</span>}
        </div>
        <p className="mt-4 text-xs text-black/45">Comments are public. Be respectful — abusive posts will be removed.</p>
      </form>

      <div className="mt-10 flex items-baseline justify-between border-b border-black/10 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-black/55">Voices</h3>
        {comments && <span className="text-sm text-black/45">{comments.length}</span>}
      </div>

      {comments === null ? (
        <p className="py-8 text-black/45">Loading…</p>
      ) : comments.length === 0 ? (
        <p className="py-8 text-black/55">No comments yet — be the first to speak.</p>
      ) : (
        <ul className="divide-y divide-black/10">
          {comments.map((c) => (
            <li key={c.id} className="py-6">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-bold">{c.name}</span>
                {c.context && <span className="text-sm text-black/55">· {c.context}</span>}
                <span className="text-sm text-black/40">· {timeAgo(c.created_at)}</span>
              </div>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-[#1F2328]/85">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
