import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { company } from "@/data/company";

export function StoryTeaser() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-edit grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <span className="text-eyebrow text-cinnamon">Our Story</span>
          <h2 className="text-display mt-4 text-4xl text-cocoa sm:text-5xl">
            Three generations of cinnamon expertise.
          </h2>
          <p className="mt-6 text-cocoa/60">{company.founderNote}</p>
          <Link
            href="/our-story"
            className="text-eyebrow group mt-8 inline-flex items-center gap-2 text-cocoa"
          >
            Read Our Full Story
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
          <Image
            src="/images/story-teaser.jpg"
            alt="Our Story"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
