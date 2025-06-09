import { RegionKeySchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(3).max(50),
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\+998\d{9}$/.test(val), {
      message: "Phone number format must be +998901234567",
    }),
  region: RegionKeySchema,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = formSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  } else {
    const { fullname, phone, region } = parsed.data;

    // Here you would typically handle the form submission,
    // e.g., save to a database or send an email.

    return NextResponse.json(
      {
        message: "Consultation request submitted successfully",
        data: { fullname, phone, region },
      },
      { status: 200 }
    );
  }
}
