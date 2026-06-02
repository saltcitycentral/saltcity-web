import { NextRequest, NextResponse } from "next/server";
import { getApplication, updateApplicationAdminFields } from "@/lib/ebenezerGrant/supabaseServer";
import { GRANT_STATUSES, GrantStatus } from "@/lib/ebenezerGrant/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const application = await getApplication(id);
    if (!application) {
      return NextResponse.json({ ok: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, application });
  } catch (error) {
    console.error("Admin application fetch failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = String(body.status ?? "") as GrantStatus;
    const internalNotes = String(body.internal_notes ?? "");

    if (!GRANT_STATUSES.includes(status)) {
      return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 400 });
    }

    const application = await updateApplicationAdminFields(id, status, internalNotes);
    if (!application) {
      return NextResponse.json({ ok: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, application });
  } catch (error) {
    console.error("Admin application update failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
