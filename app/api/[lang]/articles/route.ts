import { ApiCategoriesSchema } from "@/schemas";
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
  const searchParams = req.nextUrl.searchParams;

  // Query parametrlari
  const category = searchParams.get("category");
  const is_pinned = searchParams.get("is_pinned");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const search = searchParams.get("search");
  const tag = searchParams.get("translations__tags__name");
  const youtube = searchParams.get("youtube");

  if (category) {
    const results = ApiCategoriesSchema.safeParse(category);
    if (!results.success) {
      return NextResponse.json(
        { error: "Invalid category parameter" },
        { status: 400 }
      );
    }
  }

  // Paramlarni URL sifatida yig‘amiz
  const url = new URL(`${baseUrl}/${lang}/api/articles/all/`);
  if (category) url.searchParams.append("category", category);
  if (is_pinned) url.searchParams.append("is_pinned", is_pinned);
  if (offset) url.searchParams.append("offset", offset);
  if (search) url.searchParams.append("search", search);
  if (tag) url.searchParams.append("translations__tags__name", tag);
  if (youtube) url.searchParams.append("youtube", youtube);
  if (limit) url.searchParams.append("limit", limit);

  try {
    // console.log("Fetching articles from:", url.toString());
    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", details: err },
      { status: 500 }
    );
  }
}
