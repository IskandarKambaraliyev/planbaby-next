// app/api/proxy/image/route.ts
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_DOMAINS = [
  "cp.plan-baby.uz",
  "your.other-domain.com", // Add more if needed
];

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");

  if (!urlParam) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  let imageUrl: URL;

  try {
    imageUrl = new URL(urlParam);
  } catch {
    return new NextResponse("Invalid URL format", { status: 400 });
  }

  if (!ALLOWED_DOMAINS.includes(imageUrl.hostname)) {
    return new NextResponse("Domain not allowed", { status: 403 });
  }

  const imageRes = await fetch(imageUrl.toString());

  if (!imageRes.ok) {
    return new NextResponse("Image fetch failed", { status: 500 });
  }

  const contentType =
    imageRes.headers.get("Content-Type") || "application/octet-stream";
  const buffer = await imageRes.arrayBuffer();

  const response = new NextResponse(buffer);
  response.headers.set("Content-Type", contentType);
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return response;
}
