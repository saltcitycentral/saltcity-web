import { NextResponse } from "next/server";
import { listApplications } from "@/lib/ebenezerGrant/supabaseServer";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, applications: await listApplications() });
  } catch (error) {
    console.error("Admin applications fetch failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
