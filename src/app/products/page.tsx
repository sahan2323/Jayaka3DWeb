import type { Metadata } from "next";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";
import { QuoteCTA } from "@/components/story/QuoteCTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full Jayaka Cinnamon range — sticks from H1 to Alba, bark and leaf oils, powder, quillings, chips and dried leaves.",
};

export default function ProductsPage() {
  return (
    <>
      <header className="pt-40 pb-16 sm:pt-52 sm:pb-20">
        <div className="container-edit">
          <span className="text-eyebrow text-cinnamon">Products</span>
          <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa sm:text-7xl">
            A premium catalogue of Ceylon cinnamon.
          </h1>
          <p className="text-editorial mt-8 max-w-xl text-cocoa/60">
            Graded, cut and packed on our own estate in Karandeniya — from
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
