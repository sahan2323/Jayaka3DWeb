"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validations";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
  });

  const productOptions = categories.filter((c) => c.id !== "all");

  const onSubmit = async (values: QuoteFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(errorMessage);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-cocoa/10 bg-white px-8 py-16 text-center shadow-sm">
        <CheckCircle2 className="text-cinnamon" size={40} />
        <h3 className="text-editorial text-2xl text-cocoa">Inquiry sent successfully!</h3>
        <p className="max-w-sm text-cocoa/60">
          Thank you — your inquiry has been stored. Our team will get back to you within one business day with pricing and availability.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setServerError(null);
          }}
          className="text-eyebrow mt-2 text-cinnamon underline underline-offset-4 hover:opacity-80"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
      {serverError && (
        <div className="col-span-full flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="mt-0.5 shrink-0 text-red-600" size={20} />
          <div className="text-sm">
            <p className="font-semibold">Submission Error</p>
            <p className="mt-0.5 text-red-700">{serverError}</p>
          </div>
        </div>
      )}

      <Field label="Name" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
          placeholder="Jane Cooper"
        />
      </Field>

      <Field label="Company" error={errors.company?.message}>
        <input
          type="text"
          autoComplete="organization"
          {...register("company")}
          className={inputClass(!!errors.company)}
          placeholder="Your company"
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className={inputClass(!!errors.email)}
          placeholder="you@company.com"
        />
      </Field>

      <Field label="Country" error={errors.country?.message}>
        <input
          type="text"
          autoComplete="country-name"
          {...register("country")}
          className={inputClass(!!errors.country)}
          placeholder="Country"
        />
      </Field>

      <Field label="Product Interest" error={errors.productInterest?.message} full>
        <select
          {...register("productInterest")}
          defaultValue=""
          className={inputClass(!!errors.productInterest)}
        >
          <option value="" disabled>
            Select a product category
          </option>
          {productOptions.map((c) => (
            <option key={c.id} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message?.message} full>
        <textarea
          rows={5}
          {...register("message")}
          className={inputClass(!!errors.message)}
          placeholder="Quantity, target grade, shipping destination — anything that helps us quote accurately."
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-eyebrow col-span-full mt-2 w-full rounded-full bg-cinnamon px-8 py-4 text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit cursor-pointer"
      >
        {isSubmitting ? "Sending to Database…" : "Send Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", full && "sm:col-span-2")}>
      <label className="text-eyebrow text-cocoa/60">{label}</label>
      {children}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-velvet/40 px-4 py-3.5 text-cocoa outline-none transition-colors placeholder:text-cocoa/35",
    "focus:border-cinnamon focus:bg-white",
    hasError ? "border-red-400" : "border-cocoa/15"
  );
}
