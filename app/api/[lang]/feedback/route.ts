import { Story } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type RegionResult = {
  region: string;
  results: Story[];
  error: string | null;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Base URL is not defined" },
      { status: 500 }
    );
  }

  const { lang } = await params;

  const regions = [
    "tash",
    "and",
    "bukh",
    "jiz",
    "kashk",
    "nav",
    "nam",
    "sam",
    "surkh",
    "sir",
    "tash_reg",
    "fer",
    "khor",
    "kar",
    "other",
  ];

  // Promise.allSettled - parallel + fail-proof
  const fetchPromises = regions.map((region) =>
    fetch(`${baseUrl}/${lang}/api/pages/feedback/?region=${region}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }
        const data = await res.json();
        return {
          region,
          results: Array.isArray(data.results) ? data.results : [],
          error: null,
        } as RegionResult;
      })
      .catch((err) => {
        console.error(`Error fetching region "${region}":`, err);
        return {
          region,
          results: [],
          error: err instanceof Error ? err.message : String(err),
        } as RegionResult;
      })
  );

  const settledResults = await Promise.allSettled(fetchPromises);

  // Response object to hold results for each region
  const responseObject: Record<string, Story[] | null> & {
    error: string | null;
  } = {
    error: null,
  };

  const errors: string[] = [];

  settledResults.forEach((result) => {
    if (result.status === "fulfilled") {
      const { region, results, error } = result.value;
      responseObject[region] = results;
      if (error) {
        errors.push(`${region}: ${error}`);
      }
    } else {
      // Handle unexpected rejections
      console.error("Unexpected rejected promise:", result.reason);
    }
  });

  // global error field to‘ldirish
  responseObject.error = errors.length > 0 ? errors.join("; ") : null;

  return NextResponse.json(responseObject, { status: 200 });
}
