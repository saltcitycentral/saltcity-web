import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return new NextResponse("Missing text", { status: 400 });
  }

  const buffer = await QRCode.toBuffer(text, {
    type: "png",
    margin: 1,
    scale: 8,
  });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
