import { NextRequest, NextResponse } from "next/server";

/**
 * Sign-ups for the prayer/teaching programs (Finding Your Assignment, Wildfire).
 * Posts to ONE dedicated Apps Script web app that routes by `program` to its
 * own tab. Separate from /api/conference, /api/forms and /api/first-time.
 *
 * Env:
 *   PROGRAMS_WEBAPP_URL  — the Apps Script "/exec" URL (required)
 *   PROGRAMS_API_KEY     — optional shared secret, sent as ?key=
 */
const WEBAPP_URL = process.env.PROGRAMS_WEBAPP_URL || "";
const API_KEY = process.env.PROGRAMS_API_KEY || "";
const ALLOWED = new Set(["assignment", "wildfire"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — bots fill this hidden field. Pretend success, drop it.
    if (body?.website) return NextResponse.json({ ok: true });

    const program = String(body?.program || "");
    if (!ALLOWED.has(program)) {
      return NextResponse.json({ ok: false, error: "Unknown program" }, { status: 400 });
    }
    if (!body?.fullName || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }
    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "Programs webapp URL not configured" },
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
      body: JSON.stringify({
        program,
        fullName: body.fullName ?? "",
        phone: body.phone ?? "",
        email: body.email ?? "",
        notes: body.notes ?? "",
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(t);

    const text = await response.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Programs Apps Script non-JSON response:", text);
      return NextResponse.json(
        { ok: false, error: "Invalid response from server" },
        { status: 500 }
      );
    }

    if (!data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Submission failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const msg =
      error?.name === "AbortError"
        ? "Request timed out"
        : error?.message || "Server error";
    console.error("Program signup error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
