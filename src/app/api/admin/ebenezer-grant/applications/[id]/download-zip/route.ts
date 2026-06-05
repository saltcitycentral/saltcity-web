import { NextRequest, NextResponse } from "next/server";
import {
  cleanGrantDocumentFileName,
  downloadPrivateFile,
  getApplication,
  slugify,
} from "@/lib/ebenezerGrant/supabaseServer";
import { createZip } from "@/lib/ebenezerGrant/zip";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function uniqueFileName(name: string, usedNames: Set<string>) {
  if (!usedNames.has(name)) {
    usedNames.add(name);
    return name;
  }

  const dotIndex = name.lastIndexOf(".");
  const base = dotIndex > -1 ? name.slice(0, dotIndex) : name;
  const extension = dotIndex > -1 ? name.slice(dotIndex) : "";
  let counter = 2;

  while (usedNames.has(`${base}-${counter}${extension}`)) {
    counter += 1;
  }

  const uniqueName = `${base}-${counter}${extension}`;
  usedNames.add(uniqueName);
  return uniqueName;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const application = await getApplication(id);

    if (!application) {
      return NextResponse.json({ ok: false, error: "Application not found" }, { status: 404 });
    }

    const ownerSlug = slugify(application.owner_director_name, "applicant");
    const businessSlug = slugify(application.business_name, "business");
    const folderName = `${application.reference_number}-${ownerSlug}-${businessSlug}`;
    const zipFileName = `${folderName}.zip`;
    const entries: { name: string; data: Buffer }[] = [];
    const errors: string[] = [];
    const usedNames = new Set<string>();

    for (const document of application.documents) {
      const cleanName = uniqueFileName(
        cleanGrantDocumentFileName(
          application.owner_director_name,
          document.document_type,
          document.original_filename
        ),
        usedNames
      );

      try {
        const data = await downloadPrivateFile(document.storage_path);
        entries.push({
          name: `${folderName}/${cleanName}`,
          data,
        });
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown error";
        errors.push(`${cleanName}: ${reason}`);
      }
    }

    if (errors.length > 0) {
      entries.push({
        name: `${folderName}/download-errors.txt`,
        data: Buffer.from(errors.join("\n"), "utf8"),
      });
    }

    if (entries.length === 0) {
      entries.push({
        name: `${folderName}/download-errors.txt`,
        data: Buffer.from("No documents were available for download.", "utf8"),
      });
    }

    const zip = createZip(entries);

    return new NextResponse(zip, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Ebenezer Grant ZIP download failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
