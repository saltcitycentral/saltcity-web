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
} from "@/lib/dearGovernor";

/** Toggle a like on a Dear Governor '26 comment for the current (anonymous) visitor. */
type RouteContext = { params: Promise<{ id: string }> };

const likeLimited = rateLimiter(60, 60_000);

export async function POST(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  if (!isUuid(id)) return NextResponse.json({ ok: false, error: "That comment couldn't be found." }, { status: 400 });
  if (!sbConfigured()) return NextResponse.json({ ok: false, error: "Likes are not configured." }, { status: 500 });
  if (likeLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "Slow down a little and try again." }, { status: 429 });
  }

  const existing = readVoter(req);
  const voter = existing ?? crypto.randomUUID();

  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/dg_toggle_like`, {
      method: "POST",
      headers: sbHeaders(),
      body: JSON.stringify({ p_comment: id, p_voter: voter }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 404) {
        return NextResponse.json({ ok: false, error: "Likes aren't switched on yet." }, { status: 409 });
      }
      if (text.includes("23503")) {
        return NextResponse.json({ ok: false, error: "That comment is no longer available." }, { status: 404 });
      }
      console.error("dg_toggle_like failed:", res.status, text);
      return NextResponse.json({ ok: false, error: "Couldn't save your like." }, { status: 502 });
    }

    const data = (await res.json()) as { is_liked: boolean; likes: number }[] | { is_liked: boolean; likes: number };
    const row = Array.isArray(data) ? data[0] : data;

    const out = NextResponse.json({ ok: true, liked: Boolean(row?.is_liked), like_count: Number(row?.likes ?? 0) });
    return existing ? out : attachVoter(out, voter);
  } catch (err) {
    console.error("dg_toggle_like threw:", err);
    return NextResponse.json({ ok: false, error: "Couldn't save your like." }, { status: 503 });
  }
}
