import { NextRequest, NextResponse } from "next/server";
import {
  LEGACY_FIELDS,
  PUBLIC_FIELDS,
  SB_URL,
  attachVoter,
  clientIp,
  isUuid,
  rateLimiter,
  readVoter,
  sbConfigured,
  sbHeaders,
  toPublic,
} from "@/lib/dearGovernor";

/**
 * Dear Governor '26 public conversation — list and post comments/replies.
 * Comments publish immediately; set hidden = true in Supabase to remove one.
 * Works before docs/dear-governor-conversation.sql has run (replies/likes off).
 */
export const dynamic = "force-dynamic";

const postLimited = rateLimiter(8, 10 * 60_000);

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error, comments: [], liked: [], features: false }, { status });

export async function GET(req: NextRequest) {
  if (!sbConfigured()) return fail("Comments are not configured.", 500);

  const existing = readVoter(req);
  try {
    let features = true;
    const list = (fields: string) =>
      fetch(
        `${SB_URL}/rest/v1/dg_comments?select=${fields}&hidden=eq.false&order=created_at.desc&limit=1000`,
        { headers: sbHeaders(), cache: "no-store" }
      );

    let res = await list(PUBLIC_FIELDS);
    if (res.status === 400) {
      // parent_id / like_count don't exist yet — migration not run.
      features = false;
      res = await list(LEGACY_FIELDS);
    }
    if (!res.ok) {
      console.error("dg_comments read failed:", res.status, await res.text());
      return fail("Couldn't load comments.", 502);
    }
    const comments = ((await res.json()) as Record<string, unknown>[]).map(toPublic);

    let liked: string[] = [];
    if (features && existing) {
      const lr = await fetch(`${SB_URL}/rest/v1/dg_likes?select=comment_id&voter=eq.${existing}`, {
        headers: sbHeaders(),
        cache: "no-store",
      });
      if (lr.ok) liked = ((await lr.json()) as { comment_id: string }[]).map((l) => l.comment_id);
    }

    const out = NextResponse.json({ ok: true, features, comments, liked });
    return existing ? out : attachVoter(out, crypto.randomUUID());
  } catch (err) {
    console.error("dg_comments read threw:", err);
    return fail("Comments are temporarily unavailable.", 503);
  }
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (b?.website) return NextResponse.json({ ok: true }); // honeypot
    if (typeof b?.elapsedMs === "number" && b.elapsedMs < 1500) return NextResponse.json({ ok: true });

    if (!sbConfigured()) return NextResponse.json({ ok: false, error: "Comments are not configured." }, { status: 500 });
    if (postLimited(clientIp(req))) {
      return NextResponse.json(
        { ok: false, error: "You've posted a lot in a short time — please try again in a few minutes." },
        { status: 429 }
      );
    }

    const name = String(b?.name ?? "").trim().slice(0, 60);
    const context = String(b?.context ?? "").trim().slice(0, 80);
    const body = String(b?.body ?? "").trim().slice(0, 2000);
    if (!name) return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
    if (body.length < 2) return NextResponse.json({ ok: false, error: "Please write a little more." }, { status: 400 });
    if ((body.match(/https?:\/\//g) ?? []).length > 2) {
      return NextResponse.json({ ok: false, error: "Please limit links in your comment." }, { status: 400 });
    }

    let parentId: string | null = null;
    if (b?.parentId != null) {
      if (!isUuid(b.parentId)) {
        return NextResponse.json({ ok: false, error: "That comment couldn't be found." }, { status: 400 });
      }
      const pr = await fetch(`${SB_URL}/rest/v1/dg_comments?select=id,parent_id,hidden&id=eq.${b.parentId}`, {
        headers: sbHeaders(),
        cache: "no-store",
      });
      if (pr.status === 400) {
        return NextResponse.json({ ok: false, error: "Replies aren't switched on yet." }, { status: 409 });
      }
      if (!pr.ok) return NextResponse.json({ ok: false, error: "Couldn't post right now." }, { status: 502 });
      const [parent] = (await pr.json()) as { id: string; parent_id: string | null; hidden: boolean }[];
      if (!parent || parent.hidden) {
        return NextResponse.json({ ok: false, error: "That comment is no longer available." }, { status: 404 });
      }
      // One level of threading: a reply to a reply joins the same thread.
      parentId = parent.parent_id ?? parent.id;
    }

    const payload: Record<string, unknown> = { name, context: context || null, body };
    if (parentId) payload.parent_id = parentId;

    const res = await fetch(`${SB_URL}/rest/v1/dg_comments`, {
      method: "POST",
      headers: sbHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("dg_comments insert failed:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Couldn't post right now. Please try again." }, { status: 500 });
    }
    const [row] = (await res.json()) as Record<string, unknown>[];

    const out = NextResponse.json({ ok: true, comment: toPublic(row) });
    return readVoter(req) ? out : attachVoter(out, crypto.randomUUID());
  } catch (err) {
    console.error("dg_comments post threw:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
