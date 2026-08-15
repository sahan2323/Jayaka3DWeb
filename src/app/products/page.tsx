import type { Metadata } from "next";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { QuoteCTA } from "@/components/story/QuoteCTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full Jayaka Cinnamon range — sticks from H1 to Alba, bark and leaf oils, powder, quillings, chips and dried leaves.",
};

export default function ProductsPage() {
  return (
    <>
      <header className="relative overflow-hidden pt-40 pb-16 sm:pt-52 sm:pb-20">
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
    <div className="absolute inset-0 rounded-full bg-cinnamon/15 blur-3xl" />
    <Image
      src="/images/page-heroes/products.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-contain object-[74%_center] opacity-90"
    />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-velvet" />
  </div>

  <div className="container-edit relative z-10">
    <span className="text-eyebrow text-cinnamon drop-shadow-[0_1px_12px_rgba(248,246,242,0.9)]">
      Products
    </span>
    <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa [text-shadow:0_2px_28px_rgba(248,246,242,0.9),0_1px_3px_rgba(248,246,242,0.7)] sm:text-7xl">
      A premium catalogue of Ceylon cinnamon.
    </h1>
    <p className="text-editorial mt-8 max-w-xl text-cocoa/70 [text-shadow:0_1px_16px_rgba(248,246,242,0.85)]">
      Graded, cut and packed on our own estate in Kurundugaha — from
      the finest Alba sticks to bark oil and powder.
    </p>
  </div>
</header>

      <section className="bg-velvet pb-24 sm:pb-32">
        <div className="container-edit">
          <ProductCatalogue />
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
