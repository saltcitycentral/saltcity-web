import { NextRequest, NextResponse } from "next/server";

/**
 * Dear Governor '26 public conversation. Stores comments in Supabase
 * (table dg_comments — see docs/dear-governor-comments.sql).
 * Moderation: comments publish immediately; set hidden = true in Supabase to remove one.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const headers = (extra?: Record<string, string>) => ({
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
  ...extra,
});

// Best-effort per-IP limit (per server instance).
const HITS = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > 5;
}

export const dynamic = "force-dynamic";

export async function GET() {
  if (!SUPABASE_URL || !KEY) return NextResponse.json({ ok: false, comments: [] }, { status: 500 });
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/dg_comments?select=id,created_at,name,context,body&hidden=eq.false&order=created_at.desc&limit=300`,
    { headers: headers(), cache: "no-store" }
  );
  if (!res.ok) return NextResponse.json({ ok: false, comments: [] }, { status: 500 });
  return NextResponse.json({ ok: true, comments: await res.json() });
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (b?.website) return NextResponse.json({ ok: true }); // honeypot
    if (typeof b?.elapsedMs === "number" && b.elapsedMs < 3000) return NextResponse.json({ ok: true });

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (limited(ip)) {
      return NextResponse.json({ ok: false, error: "You've posted a lot — please try again later." }, { status: 429 });
    }

    const name = String(b?.name ?? "").trim().slice(0, 60);
    const context = String(b?.context ?? "").trim().slice(0, 80);
    const body = String(b?.body ?? "").trim().slice(0, 2000);
    if (!name) return NextResponse.json({ ok: false, error: "Please add your name." }, { status: 400 });
    if (body.length < 3) return NextResponse.json({ ok: false, error: "Please write a little more." }, { status: 400 });
    if ((body.match(/https?:\/\//g) ?? []).length > 2) {
      return NextResponse.json({ ok: false, error: "Please limit links in your comment." }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/dg_comments`, {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({ name, context: context || null, body }),
    });
    if (!res.ok) {
      console.error("dg_comments insert failed:", await res.text());
      return NextResponse.json({ ok: false, error: "Couldn't post right now. Please try again." }, { status: 500 });
    }
    const [comment] = await res.json();
    return NextResponse.json({ ok: true, comment });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
