import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
    const token = process.env.GOOGLE_SHEETS_FORM_TOKEN;

    if (!url) {
      return NextResponse.json({ ok: false, error: "Missing GOOGLE_SHEETS_WEBAPP_URL" }, { status: 500 });
    }

    const payload = { ...body, token };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Sheet write failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
