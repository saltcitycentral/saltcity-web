import { NextRequest, NextResponse } from "next/server";
import { CLASS_KEYS, WEEKDAY_CLASSES } from "@/lib/weekdayClasses";

/**
 * Weekday class registrations (Learn How To Pray / How To Read Your Bible).
 * Forwards to a DEDICATED Apps Script web app that routes each class to its
 * own tab. Separate from the other form pipelines.
 *
 * Env:
 *   CLASSES_WEBAPP_URL  — the Apps Script "/exec" URL (required)
 *   CLASSES_API_KEY     — optional shared secret, sent as ?key=
 */
const WEBAPP_URL = process.env.CLASSES_WEBAPP_URL || "";
const API_KEY = process.env.CLASSES_API_KEY || "";
const ALLOWED = new Set<string>(CLASS_KEYS);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot — bots fill this hidden field. Pretend success, drop it.
    if (body?.website) return NextResponse.json({ ok: true });

    const classKey = String(body?.classKey ?? "");
    if (!ALLOWED.has(classKey)) {
      return NextResponse.json({ ok: false, error: "Unknown class" }, { status: 400 });
    }

    const fullName = String(body?.fullName ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const email = String(body?.email ?? "").trim();

    if (!fullName || !phone) {
      return NextResponse.json(
        { ok: false, error: "Full name and phone number are required" },
        { status: 400 }
      );
    }
    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "Classes webapp URL not configured" },
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
        classKey,
        className: WEEKDAY_CLASSES[classKey as keyof typeof WEEKDAY_CLASSES].title,
        fullName,
        phone,
        email,
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
      console.error("Classes Apps Script non-JSON response:", text);
      return NextResponse.json({ ok: false, error: "Invalid response from server" }, { status: 500 });
    }

    if (!data?.ok) {
      return NextResponse.json({ ok: false, error: data?.error || "Submission failed" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    const msg =
      error?.name === "AbortError" ? "Request timed out" : error?.message || "Server error";
    console.error("Class signup error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
