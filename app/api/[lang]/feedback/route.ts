import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Base URL is not defined" },
      { status: 500 }
    );
  }

  const { lang } = await params;

  const region = req.nextUrl.searchParams.get("region");

  if (!region) {
    return NextResponse.json({ error: "Region is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${baseUrl}/${lang}/api/pages/feedback/?region=${region}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    } else {
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback data" },
      { status: 500 }
    );
  }
}
