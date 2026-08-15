import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuoteCTA() {
  return (
    <section className="bg-cinnamon py-24 sm:py-32">
      <div className="container-edit flex flex-col items-center gap-8 text-center">
        <h2 className="text-display max-w-2xl text-4xl text-white sm:text-6xl">
          Let&apos;s bring Ceylon cinnamon to your shelves.
        </h2>
        <p className="text-editorial max-w-md text-white/80">
          Tell us your grade, quantity and destination — we&apos;ll send a quote
          within one business day.
        </p>
        <Link
          href="/contact"
          className="text-eyebrow group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-cocoa transition-transform hover:scale-[1.03]"
        >
          Request a Quote
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
