import { NextRequest, NextResponse } from "next/server";
import {
  SB_URL,
  attachVoter,
  clientIp,
  isUuid,
  rateLimiter,
  readVoter,
  sbConfigured,
  sbHeaders,
  toPublic,
} from "@/lib/comments";

/**
 * Comments on blog articles — list and post comments/replies.
 * Comments publish immediately; set hidden = true in Supabase to remove one.
 * Returns ready:false (and the page hides the section) until
 * docs/blog-comments.sql has been run.
 */
export const dynamic = "force-dynamic";

const FIELDS = "id,parent_id,created_at,name,context,body,like_count";
const postLimited = rateLimiter(8, 10 * 60_000);

const notReady = () => NextResponse.json({ ok: true, ready: false, comments: [], liked: [], features: false });

const cleanPostId = (v: unknown) =>
  typeof v === "string" && /^[a-z0-9-]{1,120}$/i.test(v) ? v : null;

export async function GET(req: NextRequest) {
  const postId = cleanPostId(req.nextUrl.searchParams.get("thread"));
  if (!postId) return NextResponse.json({ ok: false, error: "Unknown article.", comments: [] }, { status: 400 });
  if (!sbConfigured()) return notReady();

  const existing = readVoter(req);
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/blog_comments?select=${FIELDS}&post_id=eq.${encodeURIComponent(postId)}` +
        `&hidden=eq.false&order=created_at.desc&limit=1000`,
      { headers: sbHeaders(), cache: "no-store" }
    );
    // 404 (and PostgREST's 400 for an unknown relation) means the table isn't there yet.
    if (res.status === 404 || res.status === 400) return notReady();
    if (!res.ok) {
      console.error("blog_comments read failed:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Couldn't load comments.", comments: [] }, { status: 502 });
    }
    const comments = ((await res.json()) as Record<string, unknown>[]).map(toPublic);

    let liked: string[] = [];
    if (existing) {
      const lr = await fetch(`${SB_URL}/rest/v1/blog_likes?select=comment_id&voter=eq.${existing}`, {
        headers: sbHeaders(),
        cache: "no-store",
      });
      if (lr.ok) liked = ((await lr.json()) as { comment_id: string }[]).map((l) => l.comment_id);
    }

    const out = NextResponse.json({ ok: true, ready: true, features: true, comments, liked });
    return existing ? out : attachVoter(out, crypto.randomUUID());
  } catch (err) {
    console.error("blog_comments read threw:", err);
    return NextResponse.json(
      { ok: false, error: "Comments are temporarily unavailable.", comments: [] },
      { status: 503 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (b?.website) return NextResponse.json({ ok: true }); // honeypot
    if (typeof b?.elapsedMs === "number" && b.elapsedMs < 1500) return NextResponse.json({ ok: true });

    const postId = cleanPostId(b?.thread);
    if (!postId) return NextResponse.json({ ok: false, error: "Unknown article." }, { status: 400 });
    if (!sbConfigured()) return NextResponse.json({ ok: false, error: "Comments are not set up yet." }, { status: 503 });
    if (postLimited(clientIp(req))) {
      return NextResponse.json(
        { ok: false, error: "You've posted a lot in a short time — please try again in a few minutes." },
        { status: 429 }
      );
    }

    const name = b?.anonymous === true ? "Anonymous" : String(b?.name ?? "").trim().slice(0, 60);
    const context = String(b?.context ?? "").trim().slice(0, 80);
    const body = String(b?.body ?? "").trim();
    if (!name) return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
    if (body.length < 2) return NextResponse.json({ ok: false, error: "Please write a little more." }, { status: 400 });
    if (body.length > 5000) {
      return NextResponse.json({ ok: false, error: "Please keep it under 5,000 characters." }, { status: 400 });
    }
    if ((body.match(/https?:\/\//g) ?? []).length > 2) {
      return NextResponse.json({ ok: false, error: "Please limit links in your comment." }, { status: 400 });
    }

    let parentId: string | null = null;
    if (b?.parentId != null) {
      if (!isUuid(b.parentId)) {
        return NextResponse.json({ ok: false, error: "That comment couldn't be found." }, { status: 400 });
      }
      const pr = await fetch(
        `${SB_URL}/rest/v1/blog_comments?select=id,parent_id,hidden,post_id&id=eq.${b.parentId}`,
        { headers: sbHeaders(), cache: "no-store" }
      );
      if (!pr.ok) return NextResponse.json({ ok: false, error: "Couldn't post right now." }, { status: 502 });
      const [parent] = (await pr.json()) as {
        id: string;
        parent_id: string | null;
        hidden: boolean;
        post_id: string;
      }[];
      if (!parent || parent.hidden || parent.post_id !== postId) {
        return NextResponse.json({ ok: false, error: "That comment is no longer available." }, { status: 404 });
      }
      // One level of threading: a reply to a reply joins the same thread.
      parentId = parent.parent_id ?? parent.id;
    }

    const payload: Record<string, unknown> = { post_id: postId, name, context: context || null, body };
    if (parentId) payload.parent_id = parentId;

    const res = await fetch(`${SB_URL}/rest/v1/blog_comments`, {
      method: "POST",
      headers: sbHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("blog_comments insert failed:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Couldn't post right now. Please try again." }, { status: 500 });
    }
    const [row] = (await res.json()) as Record<string, unknown>[];

    const out = NextResponse.json({ ok: true, comment: toPublic(row) });
    return readVoter(req) ? out : attachVoter(out, crypto.randomUUID());
  } catch (err) {
    console.error("blog_comments post threw:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
