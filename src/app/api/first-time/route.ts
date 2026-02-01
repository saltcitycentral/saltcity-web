import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
    const token = process.env.GOOGLE_SHEETS_FORM_TOKEN;

    if (!webappUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing GOOGLE_SHEETS_WEBAPP_URL" },
        { status: 500 }
      );
    }

    const body = await req.json();

    // send token + your fields to Apps Script
    const payload = {
      token,
      fullName: body.fullName ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      location: body.location ?? "",
      source: body.source ?? "",
      notes: body.notes ?? "",
    };

    const r = await fetch(webappUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // avoid caching weirdness
      cache: "no-store",
    });

    const text = await r.text();

    // Apps Script sometimes returns text even when it's JSON
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, error: "Non-JSON response from Apps Script", raw: text };
    }

    if (!r.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Apps Script failed", raw: data?.raw },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
