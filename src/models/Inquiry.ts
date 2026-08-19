import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  company: string;
  email: string;
  country: string;
  productInterest: string;
  message: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    company: { type: String, required: [true, "Company name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], lowercase: true, trim: true },
    country: { type: String, required: [true, "Country is required"], trim: true },
    productInterest: { type: String, required: [true, "Product interest is required"], trim: true },
    message: { type: String, required: [true, "Message is required"], trim: true },
  },
  { timestamps: true }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
