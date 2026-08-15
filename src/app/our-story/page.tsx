import type { Metadata } from "next";
import { company } from "@/data/company";
import { StoryTimeline } from "@/components/story/StoryTimeline";
import { QuoteCTA } from "@/components/story/QuoteCTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Three generations of cinnamon expertise from Kurundugaha, Sri Lanka — the story behind Jayaka Ceylon Cinnamon.",
};

export default function OurStoryPage() {
  return (
    <>
      <header className="relative overflow-hidden pt-40 pb-20 sm:pt-52 sm:pb-28">
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
    <div className="absolute inset-0 rounded-full bg-cinnamon/15 blur-3xl" />
    <Image
      src="/images/page-heroes/our-story.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-contain object-[77%_center] opacity-90"
    />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-velvet" />
  </div>

  <div className="container-edit relative z-10">
    <span className="text-eyebrow text-cinnamon drop-shadow-[0_1px_12px_rgba(248,246,242,0.9)]">
      Our Story
    </span>
    <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa [text-shadow:0_2px_28px_rgba(248,246,242,0.9),0_1px_3px_rgba(248,246,242,0.7)] sm:text-7xl">
      Founded on four decades of cinnamon expertise.
    </h1>
    <p className="text-editorial mt-8 max-w-xl text-cocoa/70 [text-shadow:0_1px_16px_rgba(248,246,242,0.85)]">
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
