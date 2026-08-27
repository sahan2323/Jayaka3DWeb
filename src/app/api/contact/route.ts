import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { quoteFormSchema } from "@/lib/validations";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = quoteFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, company, email, country, productInterest, message } =
      validationResult.data;

    // Check placeholder in connection string
    if (process.env.MONGODB_URI?.includes("<db_username>")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "MongoDB Atlas username placeholder found in connection string. Please update MONGODB_URI in .env.local with your actual database username.",
        },
        { status: 500 }
      );
    }

    // Connect to MongoDB Atlas
    await connectDB();

    // Save Inquiry record to database
    const newInquiry = await Inquiry.create({
      name,
      company,
      email,
      country,
      productInterest,
      message,
    });

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || `"Jayaka Cinnamon Website" <${process.env.SMTP_USER}>`,
        to: "info@jayakacinnamon.lk",
        subject: `New Inquiry from ${name} (${company || 'No Company'})`,
        text: `
New Inquiry Details:
--------------------
Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Country: ${country}
Product Interest: ${productInterest || 'N/A'}

Message:
${message}
        `,
        html: `
<h2>New Inquiry Details</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Company:</strong> ${company || 'N/A'}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Country:</strong> ${country}</p>
<p><strong>Product Interest:</strong> ${productInterest || 'N/A'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email notification sent successfully");
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // We don't fail the whole request if email fails, as the DB save succeeded
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry saved successfully",
        id: newInquiry._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error processing contact form submission:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}