import { NextRequest, NextResponse } from "next/server";

/**
 * "A Father's Blessing" — minister/pastor registrations.
 * Posts to a DEDICATED Apps Script web app (its own spreadsheet), separate
 * from /api/conference, /api/program-signup, /api/forms and /api/first-time.
 *
 * Env:
 *   FATHERS_BLESSING_WEBAPP_URL  — the Apps Script "/exec" URL (required)
 *   FATHERS_BLESSING_API_KEY     — optional shared secret, sent as ?key=
 */
const WEBAPP_URL = process.env.FATHERS_BLESSING_WEBAPP_URL || "";
const API_KEY = process.env.FATHERS_BLESSING_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — bots fill this hidden field. Pretend success, drop it.
    if (body?.website) return NextResponse.json({ ok: true });

    if (!body?.firstName || !body?.surname || !body?.email || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "First name, surname, email and phone are required" },
        { status: 400 }
      );
    }
    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "A Father's Blessing webapp URL not configured" },
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
        firstName: body.firstName ?? "",
        surname: body.surname ?? "",
        title: body.title ?? "",
        email: body.email ?? "",
        phone: body.phone ?? "",
        church: body.church ?? "",
        role: body.role ?? "",
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
      console.error("A Father's Blessing Apps Script non-JSON response:", text);
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
    console.error("A Father's Blessing submission error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
