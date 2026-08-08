import { NextRequest, NextResponse } from "next/server";
import { COMPANIES } from "@/app/evangelism/companies";

/**
 * Weekly evangelism invite reports.
 * Forwards to a DEDICATED Apps Script web app (its own spreadsheet), separate
 * from the other form pipelines.
 *
 * Env:
 *   EVANGELISM_WEBAPP_URL  — the Apps Script "/exec" URL (required)
 *   EVANGELISM_API_KEY     — optional shared secret, sent as ?key=
 */
const WEBAPP_URL = process.env.EVANGELISM_WEBAPP_URL || "";
const API_KEY = process.env.EVANGELISM_API_KEY || "";
const COMPANY_SET = new Set<string>(COMPANIES as readonly string[]);

// Best-effort in-memory rate limit. Note: on serverless this is per-instance
// and resets on cold start — it's a speed bump, not a hard guarantee.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function normalizeComing(v: unknown) {
  const s = String(v ?? "").trim().toLowerCase();
  return s === "yes" ? "Yes" : s === "no" ? "No" : s === "maybe" ? "Maybe" : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — bots fill this hidden field. Pretend success, drop it.
    if (body?.website) return NextResponse.json({ ok: true });
    // Time-trap — real people take more than a couple seconds to fill this in.
    if (typeof body?.elapsedMs === "number" && body.elapsedMs < 2500) {
      return NextResponse.json({ ok: true });
    }

    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again shortly." },
        { status: 429 }
      );
    }

    const memberName = String(body?.memberName ?? "").trim();
    const company = String(body?.company ?? "").trim();
    const serviceDate = String(body?.serviceDate ?? "").trim();

    if (!memberName) {
      return NextResponse.json({ ok: false, error: "Your name is required" }, { status: 400 });
    }
    if (!COMPANY_SET.has(company)) {
      return NextResponse.json({ ok: false, error: "Please select a valid company" }, { status: 400 });
    }

    const guests = (Array.isArray(body?.guests) ? body.guests : [])
      .map((g: any) => ({
        name: String(g?.name ?? "").trim(),
        phone: String(g?.phone ?? "").trim(),
        coming: normalizeComing(g?.coming),
      }))
      .filter((g: { name: string }) => g.name)
      .slice(0, 30);

    if (!guests.length) {
      return NextResponse.json({ ok: false, error: "Add at least one guest" }, { status: 400 });
    }

    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "Evangelism webapp URL not configured" },
        { status: 500 }
      );
    }

    const url = new URL(WEBAPP_URL);
    if (API_KEY) url.searchParams.set("key", API_KEY);

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 12_000);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": request.headers.get("user-agent") || "saltcity-web",
      },
      body: JSON.stringify({ serviceDate, memberName, company, guests }),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(t);

    const text = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Evangelism Apps Script non-JSON response:", text);
      return NextResponse.json({ ok: false, error: "Invalid response from server" }, { status: 500 });
    }

    if (!data?.ok) {
      return NextResponse.json({ ok: false, error: data?.error || "Submission failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const msg =
      error?.name === "AbortError" ? "Request timed out" : error?.message || "Server error";
    console.error("Evangelism submission error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
