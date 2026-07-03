import { NextRequest, NextResponse } from "next/server";
import {
  applicationSummaryFileName,
  generateApplicationSummaryDocx,
} from "@/lib/ebenezerGrant/applicationSummaryDocx";
import { getApplication } from "@/lib/ebenezerGrant/supabaseServer";

export const runtime = "nodejs";

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

    const docx = await generateApplicationSummaryDocx(application);

    return new NextResponse(docx, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${applicationSummaryFileName(
          application
        )}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Ebenezer Grant summary DOCX failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
