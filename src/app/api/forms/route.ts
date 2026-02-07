import { NextRequest, NextResponse } from "next/server";

const WEBAPP_URL = process.env.FORMS_WEBAPP_URL || "";
const API_KEY = process.env.FORMS_API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    if (!WEBAPP_URL) {
      return NextResponse.json(
        { ok: false, error: "Webapp URL not configured" },
        { status: 500 }
      );
    }

    // Forward to Google Apps Script with API key
    const url = new URL(WEBAPP_URL);
    if (API_KEY) {
      url.searchParams.set("key", API_KEY);
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    let data: any = null;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse response:", text);
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
    console.error("Form submission error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}