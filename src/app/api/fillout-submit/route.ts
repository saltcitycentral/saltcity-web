import { NextResponse } from "next/server";

type Body = {
  form: "firstTime" | "discipleship" | "company";
  answers: Record<string, any>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const map: Record<Body["form"], string | undefined> = {
      firstTime: process.env.FILLOUT_FORM_FIRST_TIME,
      discipleship: process.env.FILLOUT_FORM_DISCIPLESHIP,
      company: process.env.FILLOUT_FORM_COMPANY,
    };

    const formId = map[body.form];
    if (!formId) {
      return NextResponse.json({ ok: false, error: "Missing form id" }, { status: 500 });
    }

    // IMPORTANT:
    // Fillout needs "answers" in the shape it expects.
    // Easiest path: use Fillout question "Field IDs" and submit by those.
    // We'll send as-is and you map keys to Fillout field ids on your side.
    const res = await fetch(`https://api.fillout.com/v1/forms/${formId}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
      },
      body: JSON.stringify({
        // You’ll map keys to Fillout's field IDs (next step below)
        answers: body.answers,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, error: text }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
