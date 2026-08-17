import { CinnamonScrollHero } from "@/components/hero/CinnamonScrollHero";
import { RangeCardStack } from "@/components/products/RangeCardStack";
import { BadgeCloud } from "@/components/story/BadgeCloud";
import { ScrollStatement } from "@/components/animations/ScrollStatement";
import { CinnamonJourney } from "@/components/cinnamon/CinnamonJourney";
import { StoryTeaser } from "@/components/story/StoryTeaser";
import { QualityReach } from "@/components/story/QualityReach";
import { Testimonials } from "@/components/story/Testimonials";
import { QuoteCTA } from "@/components/story/QuoteCTA";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic hero — includes its own "FROM CEYLON. CRAFTED FOR
          THE WORLD." closing beat, synced to the footage, so it hands
          off to the Range section directly with no separate transition
          section and no gap. */}
      <CinnamonScrollHero />

      {/* 2. Certification badges — sits just above the Range section */}
      <BadgeCloud />

      {/* 3. Featured product range — interactive card stack */}
      <RangeCardStack />

      {/* 4. Cultivate / Harvest / Process / Craft / Refine / Export */}
      <ScrollStatement />

      {/* 5. Cinnamon journey */}
      <CinnamonJourney />

      {/* 6. Ceylon cinnamon story */}
      <StoryTeaser />

      {/* 7. Quality / global reach */}
      <QualityReach />

      <Testimonials />

      {/* 8. Request a quote */}
      <QuoteCTA />
    </>
  );
}