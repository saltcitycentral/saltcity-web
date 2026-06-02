import { NextRequest, NextResponse } from "next/server";
import { createSignedDocumentUrl, getDocument } from "@/lib/ebenezerGrant/supabaseServer";

type RouteContext = {
  params: Promise<{ documentId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { documentId } = await context.params;
    const document = await getDocument(documentId);

    if (!document) {
      return NextResponse.json({ ok: false, error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      url: await createSignedDocumentUrl(document.storage_path),
    });
  } catch (error) {
    console.error("Signed document URL failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
