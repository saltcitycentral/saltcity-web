import "server-only";
import type { NextRequest, NextResponse } from "next/server";

/**
 * Shared server helpers for the Dear Governor '26 conversation.
 * Schema: docs/dear-governor-comments.sql + docs/dear-governor-conversation.sql
 */
export const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const sbConfigured = () => Boolean(SB_URL && KEY);

export function sbHeaders(extra?: Record<string, string>) {
  return {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/** Columns once replies + likes are enabled. */
export const PUBLIC_FIELDS = "id,parent_id,created_at,name,context,body,like_count";
/** Columns available before the conversation migration has run. */
export const LEGACY_FIELDS = "id,created_at,name,context,body";

export type PublicComment = {
  id: string;
  parent_id: string | null;
  created_at: string;
  name: string;
  context: string | null;
  body: string;
  like_count: number;
};

export function toPublic(r: Record<string, unknown>): PublicComment {
  return {
    id: String(r.id),
    parent_id: typeof r.parent_id === "string" ? r.parent_id : null,
    created_at: String(r.created_at),
    name: String(r.name ?? ""),
    context: typeof r.context === "string" && r.context ? r.context : null,
    body: String(r.body ?? ""),
    like_count: typeof r.like_count === "number" ? r.like_count : 0,
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v: unknown): v is string => typeof v === "string" && UUID.test(v);

/** Anonymous visitor id, used only to stop a person liking the same comment twice. */
export const VOTER_COOKIE = "dg_vid";

export function readVoter(req: NextRequest) {
  const v = req.cookies.get(VOTER_COOKIE)?.value;
  return isUuid(v) ? v : null;
}

export function attachVoter(res: NextResponse, id: string) {
  res.cookies.set(VOTER_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 730,
  });
  return res;
}

export function clientIp(req: NextRequest) {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}

/** Best-effort in-memory limiter (per server instance). Returns true when over the limit. */
export function rateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string) => {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    }
    return recent.length > max;
  };
}
