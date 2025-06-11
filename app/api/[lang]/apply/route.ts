// app/api/consultation/route.ts

import { RegionKeySchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ✅ Zod schema for products
const productSchema = z.object({
  id: z.union([z.string(), z.number()]),
  price: z.union([z.string(), z.number()]),
  quantity: z.number().min(1),
});

// ✅ Main form schema
const formSchema = z.object({
  fullname: z.string().trim().min(3).max(50),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\+998\d{9}$/.test(val), {
      message: "Phone number format must be +998901234567",
    }),
  region: RegionKeySchema.pipe(z.string().trim()),
  products: z.array(productSchema).optional(),
});

// ✅ API body type
type ApiBody = {
  name: string;
  region: string;
  phone_number: string;
  products?: z.infer<typeof productSchema>[];
};

// ✅ Extracted logic to send request (real or mock)
async function submitApplyRequest(lang: string, apiBody: ApiBody) {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.USE_MOCK_API === "true";

  if (isDev) {
    console.log("[MOCK] Apply request body:", apiBody);
    return {
      ok: true,
      data: { message: "Mock apply request successful" },
    };
  }

  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined");
  }

  const res = await fetch(`${baseUrl}/${lang}/api/stores/order/new/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(apiBody),
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

// ✅ Final handler
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const body = await req.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullname, phone, region, products } = parsed.data;
    const { lang } = await params;

    const apiBody: ApiBody = {
      name: fullname,
      region,
      phone_number: phone,
      ...(products?.length && { products }),
    };

    const result = await submitApplyRequest(lang, apiBody);

    if (!result.ok) {
      console.error("Apply error:", result.data);
      return NextResponse.json(
        { error: result.data?.error || "Failed to submit apply request" },
        { status: result.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Apply request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
