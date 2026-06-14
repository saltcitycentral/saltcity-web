import { NextRequest, NextResponse } from "next/server";

/**
 * Spirit of Faith conference registrations.
 * Posts to a DEDICATED Google Apps Script web app (its own spreadsheet),
 * completely separate from the existing /api/forms and /api/first-time flows.
 *
 * Env:
 *   CONFERENCE_WEBAPP_URL  — the Apps Script "/exec" web app URL (required)
 *   CONFERENCE_API_KEY     — optional shared secret, sent as ?key=
 */
const WEBAPP_URL = process.env.CONFERENCE_WEBAPP_URL || "";
const API_KEY = process.env.CONFERENCE_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot: a filled "website" field means a bot bypassed the form.
    // Pretend success and silently drop it — never reaches the sheet.
    if (body?.website) {
      return NextResponse.json({ ok: true });
    }

    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "Conference webapp URL not configured" },
        { status: 500 }
      );
    }

    // minimal guard
    if (!body?.fullName || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required" },
        { status: 400 }
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
        formType: "spiritOfFaith",
        fullName: body.fullName ?? "",
        phone: body.phone ?? "",
        email: body.email ?? "",
        source: body.source ?? "",
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
      console.error("Conference Apps Script non-JSON response:", text);
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
    console.error("Conference submission error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
