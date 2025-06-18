import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ORIGIN_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get("url");
  const isLocal = req.nextUrl.searchParams.get("local") === "true";

  if (!urlParam) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  if (!BASE_URL || !ORIGIN_URL) {
    return new NextResponse("Required environment variables are missing", {
      status: 500,
    });
  }

  if (isLocal) {
    try {
      const imagePath = join(
        process.cwd(),
        "public",
        decodeURIComponent(urlParam)
      );
      const buffer = await readFile(imagePath);
      const extension = urlParam.split(".").pop() || "";
      const mimeType = getMimeType(extension);

      const response = new NextResponse(buffer);
      response.headers.set("Content-Type", mimeType);
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable"
      );

      return response;
    } catch {
      return new NextResponse("Local image not found", { status: 404 });
    }
  }

  // Remote image from BASE_URL
  const isRelative = urlParam.startsWith("/");
  const finalUrl = isRelative ? `${BASE_URL}${urlParam}` : urlParam;

  try {
    const imageUrl = new URL(finalUrl);
    const imageRes = await fetch(imageUrl.toString());

    if (!imageRes.ok) {
      return new NextResponse("Image fetch failed", { status: 500 });
    }

    const contentType =
      imageRes.headers.get("Content-Type") || "application/octet-stream";
    const buffer = await imageRes.arrayBuffer();

    const response = new NextResponse(buffer);
    response.headers.set("Content-Type", contentType);
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );

    return response;
  } catch {
    return new NextResponse("Fetch error", { status: 500 });
  }
}

// Helper: Get MIME type by file extension
function getMimeType(ext: string): string {
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}
