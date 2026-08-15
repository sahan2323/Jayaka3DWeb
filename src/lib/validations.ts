import { z } from "zod";

export const quoteFormSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  company: z.string().min(2, "Enter your company name."),
  email: z.string().email("Enter a valid email address."),
  country: z.string().min(2, "Enter your country."),
  productInterest: z.string().min(1, "Select a product you're interested in."),
  message: z.string().min(10, "Tell us a little more about what you need."),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
