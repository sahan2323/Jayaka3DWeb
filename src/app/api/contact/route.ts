import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { quoteFormSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = quoteFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, company, email, country, productInterest, message } = validationResult.data;

    if (process.env.MONGODB_URI?.includes("<db_username>")) {
      return NextResponse.json(
        { success: false, error: "MongoDB Atlas username placeholder found in connection string. Please update MONGODB_URI in .env.local with your actual database username." },
        { status: 500 }
      );
    }

    await connectDB();

    const newInquiry = await Inquiry.create({ name, company, email, country, productInterest, message });

    return NextResponse.json(
      { success: true, message: "Inquiry saved successfully", id: newInquiry._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error processing contact form submission:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
