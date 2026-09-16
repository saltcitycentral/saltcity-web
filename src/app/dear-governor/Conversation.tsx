"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Row = {
  id: string;
  parent_id: string | null;
  created_at: string;
  name: string;
  context: string | null;
  body: string;
  like_count: number;
};
type Thread = Row & { replies: Row[] };
type Identity = { name: string; context: string };
type Sort = "top" | "new";
type ReplyTarget = { threadId: string; commentId: string; name: string };

const API = "/api/dear-governor/comments";
const IDENTITY_KEY = "dg_identity";
const MAX = 2000;
const REPLY_PREVIEW = 2;
// Pulled from the City Builders wordmark
const PALETTE = ["#1BA3D6", "#12A38A", "#6FAE2A", "#E07B18", "#2F6FDB", "#0E8FA8"];

const field =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#1F2328] " +
  "placeholder:text-black/35 transition focus:outline-none focus:border-black/35 focus:ring-4 focus:ring-[#1BA3D6]/20";

/* ─────────────────────────────── helpers */

function timeAgo(iso: string) {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 604800) return `${Math.floor(s / 86400)}d`;
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function colorFor(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function buildThreads(rows: Row[]): Thread[] {
  const byParent = new Map<string, Row[]>();
  const tops: Row[] = [];
  for (const r of rows) {
    if (r.parent_id) {
      const list = byParent.get(r.parent_id) ?? [];
      list.push(r);
      byParent.set(r.parent_id, list);
    } else {
      tops.push(r);
    }
  }
  // Replies to a hidden comment have no top-level parent here, so they drop out too.
  return tops.map((t) => ({
    ...t,
    replies: (byParent.get(t.id) ?? []).sort((a, b) => a.created_at.localeCompare(b.created_at)),
  }));
}

function sortThreads(list: Thread[], sort: Sort) {
  const newest = (a: Row, b: Row) => b.created_at.localeCompare(a.created_at);
  return [...list].sort(
    sort === "new"
      ? newest
      : (a, b) => b.like_count - a.like_count || b.replies.length - a.replies.length || newest(a, b)
  );
}

function readIdentity(): Identity | null {
  try {
    const raw = localStorage.getItem(IDENTITY_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p?.name ? { name: String(p.name), context: String(p.context ?? "") } : null;
  } catch {
    return null;
  }
}

function writeIdentity(i: Identity) {
  try {
    localStorage.setItem(IDENTITY_KEY, JSON.stringify(i));
  } catch {
    /* storage unavailable */
  }
}

function commentFromHash(rows: Row[]) {
  const m = window.location.hash.match(/^#c-([0-9a-f-]{36})$/i);
  return (m && rows.find((r) => r.id === m[1])) || null;
}

/* ─────────────────────────────── icons */

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.6 7.9 3.8 4.5 7.3 4.5c2 0 3.5 1.1 4.7 2.7 1.2-1.6 2.7-2.7 4.7-2.7 3.5 0 5.7 3.4 4.5 6.7-1.7 4.7-9.2 9.3-9.2 9.3Z" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8.5 8.5 0 0 1-12.2 7.7L3 21l1.4-5.3A8.5 8.5 0 1 1 21 12Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </svg>
  );
}

/* ─────────────────────────────── pieces */

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${small ? "h-8 w-8 text-[11px]" : "h-10 w-10 text-sm"} flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white`}
      style={{ backgroundColor: name.trim() ? colorFor(name) : "#C9CDD2" }}
    >
      {initials(name)}
    </span>
  );
}

function Body({ text }: { text: string }) {
  const long = text.length > 480;
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <p className={`whitespace-pre-line break-words leading-relaxed text-[#1F2328]/85 ${long && !open ? "line-clamp-6" : ""}`}>
        {text}
      </p>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-1 text-sm font-semibold text-[#1F2328]/60 hover:text-[#1F2328]">
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function Composer({
  parentId,
  replyTo,
  prefill = "",
  identity,
  onIdentity,
  onPosted,
  onCancel,
  autoFocus,
}: {
  parentId?: string;
  replyTo?: string;
  prefill?: string;
  identity: Identity;
  onIdentity: (i: Identity) => void;
  onPosted: (row: Row) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}) {
  const isReply = Boolean(parentId);
  const [body, setBody] = useState(prefill);
  const [name, setName] = useState(identity.name);
  const [context, setContext] = useState(identity.context);
  const [editing, setEditing] = useState(!identity.name);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef(0);
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    if (autoFocus && textarea.current) {
      const el = textarea.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [autoFocus]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const text = body.trim();
    if (text.length < 2) return setError("Please write a little more.");
    if (!name.trim()) {
      setEditing(true);
      return setError("Please add your name.");
    }
    const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    setSending(true);
    const wait = 1600 - (Date.now() - mountedAt.current);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          context: context.trim(),
          body: text,
          parentId: parentId ?? null,
          website: hp,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok || !data.comment) throw new Error(data.error || "Couldn't post right now. Please try again.");
      onIdentity({ name: name.trim(), context: context.trim() });
      setEditing(false);
      setBody("");
      onPosted(data.comment as Row);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className={isReply ? "mt-4" : "rounded-2xl border border-black/10 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-6"}
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex gap-3">
        <Avatar name={name} small={isReply} />
        <div className="min-w-0 flex-1">
          <textarea
            ref={textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={MAX}
            rows={isReply ? 3 : 4}
            aria-label={isReply ? `Reply to ${replyTo}` : "Your comment"}
            placeholder={
              isReply ? `Reply to ${replyTo}…` : "Why are the brilliant minds leaving Warri — and is there anything we can do about it?"
            }
            className={`${field} resize-y`}
          />

          {editing ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="Your name"
                aria-label="Your name"
                autoComplete="name"
                className={field}
              />
              <input
                value={context}
                onChange={(e) => setContext(e.target.value)}
                maxLength={80}
                placeholder="What you do (optional)"
                aria-label="What you do (optional)"
                className={field}
              />
            </div>
          ) : (
            <p className="mt-2 text-sm text-black/55">
              Posting as <span className="font-semibold text-[#1F2328]">{name}</span>
              {context && <> · {context}</>} ·{" "}
              <button type="button" onClick={() => setEditing(true)} className="font-semibold text-[#1BA3D6] hover:underline">
                Change
              </button>
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="submit"
              disabled={sending || body.trim().length < 2}
              className="rounded-full bg-[#1F2328] px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {sending ? "Posting…" : isReply ? "Reply" : "Post comment"}
            </button>
            {onCancel && (
              <button type="button" onClick={onCancel} className="rounded-full px-4 py-2.5 text-sm font-semibold text-black/60 transition hover:bg-black/5">
                Cancel
              </button>
            )}
            <span className={`ml-auto text-xs tabular-nums ${body.length > MAX - 150 ? "text-[#E07B18]" : "text-black/35"}`}>
              {body.length}/{MAX}
            </span>
          </div>

          {error && (
            <p role="alert" className="mt-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      {!isReply && <p className="mt-4 text-xs text-black/45">Comments are public. Be respectful — abusive posts will be removed.</p>}
    </form>
  );
}

function CommentItem({
  row,
  isReply = false,
  liked,
  likePending,
  features,
  highlighted,
  onLike,
  onReply,
}: {
  row: Row;
  isReply?: boolean;
  liked: boolean;
  likePending: boolean;
  features: boolean;
  highlighted: boolean;
  onLike: (id: string) => void;
  onReply: (row: Row) => void;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#c-${row.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.hash = `c-${row.id}`;
    }
  }

  const action =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold transition disabled:opacity-60";

  return (
    <article
      id={`c-${row.id}`}
      className={`flex scroll-mt-28 gap-3 rounded-xl transition-[background-color,box-shadow] duration-700 ${
        highlighted ? "bg-[#1BA3D6]/[0.08] shadow-[0_0_0_10px_rgba(27,163,214,0.08)]" : ""
      }`}
    >
      <Avatar name={row.name} small={isReply} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-sm">
          <span className="font-bold text-[#1F2328]">{row.name}</span>
          {row.context && <span className="text-black/55">· {row.context}</span>}
          <a href={`#c-${row.id}`} className="text-black/40 hover:underline">
            <time dateTime={row.created_at} title={new Date(row.created_at).toLocaleString("en-NG")}>
              · {timeAgo(row.created_at)}
            </time>
          </a>
        </div>

        <Body text={row.body} />

        <div className="-ml-2.5 mt-1.5 flex flex-wrap items-center gap-0.5">
          {features && (
            <button
              type="button"
              onClick={() => onLike(row.id)}
              disabled={likePending}
              aria-pressed={liked}
              aria-label={`${liked ? "Unlike" : "Like"} — ${row.like_count} ${row.like_count === 1 ? "like" : "likes"}`}
              className={`${action} ${liked ? "text-[#E0245E] hover:bg-[#E0245E]/10" : "text-black/50 hover:bg-black/5 hover:text-[#1F2328]"}`}
            >
              <HeartIcon filled={liked} />
              <span className="min-w-[1ch] tabular-nums">{row.like_count > 0 ? row.like_count : ""}</span>
            </button>
          )}
          {features && (
            <button type="button" onClick={() => onReply(row)} className={`${action} text-black/50 hover:bg-black/5 hover:text-[#1F2328]`}>
              <ReplyIcon />
              Reply
            </button>
          )}
          <button type="button" onClick={share} className={`${action} text-black/50 hover:bg-black/5 hover:text-[#1F2328]`}>
            <LinkIcon />
            {copied ? "Link copied" : "Share"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Skeleton() {
  return (
    <ul className="divide-y divide-black/10" aria-label="Loading comments">
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex animate-pulse gap-3 py-6">
          <span className="h-10 w-10 shrink-0 rounded-full bg-black/10" />
          <div className="flex-1 space-y-2.5 pt-1">
            <span className="block h-3 w-40 rounded bg-black/10" />
            <span className="block h-3 w-full rounded bg-black/[0.07]" />
            <span className="block h-3 w-2/3 rounded bg-black/[0.07]" />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────── conversation */

export default function Conversation() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [features, setFeatures] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("top");
  const [order, setOrder] = useState<string[]>([]);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [identity, setIdentityState] = useState<Identity>({ name: "", context: "" });
  const [identityReady, setIdentityReady] = useState(false);
  const sortRef = useRef(sort);

  const setIdentity = useCallback((i: Identity) => {
    setIdentityState(i);
    writeIdentity(i);
  }, []);

  const likedRef = useRef(liked);
  const pendingRef = useRef(pending);
  useEffect(() => {
    likedRef.current = liked;
    pendingRef.current = pending;
  }, [liked, pending]);

  const load = useCallback(async (initial = false) => {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Couldn't load comments.");
      const list = data.comments as Row[];
      setRows(list);
      setLiked(new Set(data.liked as string[]));
      setFeatures(Boolean(data.features));
      setLoadError(null);

      if (initial) {
        // Order is fixed here and on sort change — liking something doesn't
        // make the conversation jump around under the reader.
        setOrder(sortThreads(buildThreads(list), sortRef.current).map((t) => t.id));

        // Arriving via a shared link (#c-<id>): open its thread and highlight it.
        const target = commentFromHash(list);
        if (target) {
          if (target.parent_id) setExpanded((s) => new Set(s).add(target.parent_id as string));
          setHighlightId(target.id);
        }
      }
    } catch (err) {
      if (initial) {
        setRows([]);
        setLoadError(err instanceof Error ? err.message : "Couldn't load comments.");
      }
    } finally {
      if (initial) {
        const saved = readIdentity();
        if (saved) setIdentityState(saved);
        setIdentityReady(true);
      }
    }
  }, []);

  // First load, then refresh quietly while the tab is visible.
  useEffect(() => {
    load(true);
    const id = setInterval(() => {
      if (document.visibilityState === "visible" && pendingRef.current.size === 0) load();
    }, 45_000);
    return () => clearInterval(id);
  }, [load]);

  const treeList = useMemo(() => (rows ? buildThreads(rows) : []), [rows]);

  const changeSort = (s: Sort) => {
    sortRef.current = s;
    setSort(s);
    setOrder(sortThreads(treeList, s).map((t) => t.id));
  };

  const threads = useMemo(() => {
    const byId = new Map(treeList.map((t) => [t.id, t]));
    const seen = new Set<string>();
    const out: Thread[] = [];
    for (const id of order) {
      const t = byId.get(id);
      if (t) {
        out.push(t);
        seen.add(id);
      }
    }
    // Anything new since the order was fixed goes to the top.
    const fresh = treeList.filter((t) => !seen.has(t.id)).sort((a, b) => b.created_at.localeCompare(a.created_at));
    return [...fresh, ...out];
  }, [treeList, order]);

  const voiceCount = threads.reduce((n, t) => n + 1 + t.replies.length, 0);

  useEffect(() => {
    if (!highlightId) return;
    const scroll = setTimeout(
      () => document.getElementById(`c-${highlightId}`)?.scrollIntoView({ behavior: "smooth", block: "center" }),
      80
    );
    const clear = setTimeout(() => setHighlightId(null), 3500);
    return () => {
      clearTimeout(scroll);
      clearTimeout(clear);
    };
  }, [highlightId]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const toggleLike = useCallback(async (id: string) => {
    if (pendingRef.current.has(id)) return;
    const wasLiked = likedRef.current.has(id);

    const apply = (isLiked: boolean, count?: number) => {
      setLiked((s) => {
        const next = new Set(s);
        if (isLiked) next.add(id);
        else next.delete(id);
        return next;
      });
      setRows((rs) =>
        rs
          ? rs.map((r) =>
              r.id === id ? { ...r, like_count: count ?? Math.max(0, r.like_count + (isLiked ? 1 : -1)) } : r
            )
          : rs
      );
    };

    apply(!wasLiked);
    setPending((s) => new Set(s).add(id));
    try {
      const res = await fetch(`${API}/${id}/like`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Couldn't save your like.");
      apply(Boolean(data.liked), Number(data.like_count));
    } catch (err) {
      apply(wasLiked);
      setNotice(err instanceof Error ? err.message : "Couldn't save your like.");
    } finally {
      setPending((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const startReply = useCallback((row: Row) => {
    const threadId = row.parent_id ?? row.id;
    setReplyTarget({ threadId, commentId: row.id, name: row.name });
    setExpanded((s) => new Set(s).add(threadId));
  }, []);

  const handlePosted = useCallback((row: Row) => {
    setRows((rs) => [row, ...(rs ?? [])]);
    if (row.parent_id) {
      setExpanded((s) => new Set(s).add(row.parent_id as string));
      setReplyTarget(null);
    }
    setHighlightId(row.id);
  }, []);

  const toggleExpanded = (threadId: string) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(threadId)) next.delete(threadId);
      else next.add(threadId);
      return next;
    });

  return (
    <div className="mt-10">
      {/* Remounts once saved name/context is read, so the form starts pre-filled. */}
      <Composer key={identityReady ? "ready" : "init"} identity={identity} onIdentity={setIdentity} onPosted={handlePosted} />

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-black/55">
          Voices
          {rows && voiceCount > 0 && <span className="ml-2 font-semibold normal-case tracking-normal text-black/40">{voiceCount}</span>}
        </h3>
        {features && threads.length > 1 && (
          <div role="group" aria-label="Sort comments" className="flex rounded-full bg-black/[0.05] p-1 text-sm">
            {(["top", "new"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sort === s}
                onClick={() => changeSort(s)}
                className={`rounded-full px-3.5 py-1.5 font-semibold transition ${
                  sort === s ? "bg-white text-[#1F2328] shadow-sm" : "text-black/50 hover:text-[#1F2328]"
                }`}
              >
                {s === "top" ? "Top" : "Newest"}
              </button>
            ))}
          </div>
        )}
      </div>

      {rows === null ? (
        <Skeleton />
      ) : loadError ? (
        <p className="py-10 text-center text-black/55">{loadError}</p>
      ) : threads.length === 0 ? (
        <p className="py-10 text-center text-black/55">No voices yet — be the first to speak.</p>
      ) : (
        <ul className="divide-y divide-black/10">
          {threads.map((thread) => {
            const isOpen = expanded.has(thread.id);
            const extra = thread.replies.length - REPLY_PREVIEW;
            const shown = isOpen || extra <= 0 ? thread.replies : thread.replies.slice(0, REPLY_PREVIEW);
            const replyingHere = replyTarget?.threadId === thread.id;

            const itemProps = (row: Row) => ({
              row,
              liked: liked.has(row.id),
              likePending: pending.has(row.id),
              features,
              highlighted: highlightId === row.id,
              onLike: toggleLike,
              onReply: startReply,
            });

            return (
              <li key={thread.id} className="py-6">
                <CommentItem {...itemProps(thread)} />

                {(thread.replies.length > 0 || replyingHere) && (
                  <div className="ml-5 mt-4 border-l-2 border-black/[0.08] pl-4 sm:pl-5">
                    {shown.length > 0 && (
                      <ul className="space-y-5">
                        {shown.map((reply) => (
                          <li key={reply.id}>
                            <CommentItem {...itemProps(reply)} isReply />
                          </li>
                        ))}
                      </ul>
                    )}

                    {extra > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(thread.id)}
                        aria-expanded={isOpen}
                        className="mt-4 text-sm font-semibold text-[#1BA3D6] hover:underline"
                      >
                        {isOpen ? "Show fewer replies" : `View ${extra} more ${extra === 1 ? "reply" : "replies"}`}
                      </button>
                    )}

                    {replyingHere && replyTarget && (
                      <Composer
                        key={replyTarget.commentId}
                        parentId={thread.id}
                        replyTo={replyTarget.name}
                        prefill={replyTarget.commentId !== thread.id ? `@${replyTarget.name} ` : ""}
                        identity={identity}
                        onIdentity={setIdentity}
                        onPosted={handlePosted}
                        onCancel={() => setReplyTarget(null)}
                        autoFocus
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {notice && (
          <div className="pointer-events-auto rounded-full bg-[#1F2328] px-5 py-3 text-sm font-medium text-white shadow-lg">
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
