import type { Metadata } from "next";
import { company } from "@/data/company";
import { StoryTimeline } from "@/components/story/StoryTimeline";
import { QuoteCTA } from "@/components/story/QuoteCTA";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Three generations of cinnamon expertise from Kurundugaha, Sri Lanka — the story behind Jayaka Ceylon Cinnamon.",
};

export default function OurStoryPage() {
  return (
    <>
      <header className="pt-40 pb-20 sm:pt-52 sm:pb-28">
        <div className="container-edit">
          <span className="text-eyebrow text-cinnamon">Our Story</span>
          <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa sm:text-7xl">
            Founded on four decades of cinnamon expertise.
          </h1>
          <p className="text-editorial mt-8 max-w-xl text-cocoa/60">
            {company.legalName} was established in {company.founded} as a family
            company offering world-class, premium Ceylon cinnamon to the world.
          </p>
        </div>
      </header>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-edit grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-eyebrow text-cinnamon">The Founder</span>
            <p className="text-editorial mt-4 text-2xl leading-relaxed text-cocoa sm:text-3xl">
              {company.founderNote}
            </p>
          </div>
          <div>
            <span className="text-eyebrow text-cinnamon">Registration</span>
            <p className="text-editorial mt-4 text-2xl leading-relaxed text-cocoa sm:text-3xl">
              {company.registration}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-velvet py-20 sm:py-28">
        <div className="container-edit grid gap-10 sm:grid-cols-2">
          <div className="rounded-3xl border border-cocoa/10 bg-white p-10">
            <span className="text-eyebrow text-cinnamon">Vision</span>
            <p className="text-editorial mt-4 text-xl text-cocoa">{company.vision}</p>
          </div>
          <div className="rounded-3xl border border-cocoa/10 bg-white p-10">
            <span className="text-eyebrow text-cinnamon">Mission</span>
            <p className="text-editorial mt-4 text-xl text-cocoa">{company.mission}</p>
          </div>
        </div>
      </section>

      <StoryTimeline />
      <QuoteCTA />
    </>
  );
}
