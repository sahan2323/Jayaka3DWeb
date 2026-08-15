"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

interface Testimonial {
  tempId: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

// Real testimonials published on jayakacinnamon.lk — nothing invented.
// No photography exists for these clients, so each gets an initials
// avatar rather than a stock or fabricated headshot.
const baseTestimonials: Omit<Testimonial, "tempId">[] = [
  {
    quote:
      "Working with Jayaka Cinnamon has been a game-changer for our business — reliable logistics, top-notch cinnamon, and pricing that stays competitive.",
    name: "M. Bhai",
    role: "Business Owner, Rajasthan, India",
    initials: "MB",
  },
  {
    quote:
      "We've sourced from Jayaka for several years and they never disappoint — the highest quality product paired with exceptional, detail-oriented service.",
    name: "John Deen",
    role: "Global Food Manufacturer, Texas, USA",
    initials: "JD",
  },
  {
    quote:
      "A loyal customer for over a decade — their commitment to sustainability and ethical sourcing shows in every shipment we receive.",
    name: "Sarah Powell",
    role: "Foods Retailer",
    initials: "SP",
  },
];

const initialTestimonials: Testimonial[] = baseTestimonials.map((t, i) => ({
  ...t,
  tempId: i,
}));

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

function TestimonialCard({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialCardProps) {
  const isCenter = position === 0;
  const corner = cardSize < 300 ? 32 : 44;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        isCenter
          ? "z-10 border-cocoa bg-cocoa text-velvet"
          : "z-0 border-cocoa/15 bg-white text-cocoa hover:border-cinnamon/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(${corner}px 0%, calc(100% - ${corner}px) 0%, 100% ${corner}px, 100% 100%, calc(100% - ${corner}px) 100%, ${corner}px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.7) * position}px)
          translateY(${isCenter ? -46 : position % 2 ? 12 : -12}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(43,26,16,0.14)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: corner,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? "rgba(248,246,242,0.25)" : "rgba(43,26,16,0.12)",
        }}
      />

      <div
        className={cn(
          "mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-12 sm:w-12 sm:text-sm",
          isCenter ? "bg-cinnamon text-white" : "bg-velvet text-cocoa"
        )}
      >
        {testimonial.initials}
      </div>

      <p
        className={cn(
          "line-clamp-5 text-sm font-medium leading-snug sm:line-clamp-6 sm:text-base",
          isCenter ? "text-velvet" : "text-cocoa"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <p
        className={cn(
          "absolute bottom-6 left-6 right-9 text-xs italic sm:bottom-8 sm:left-8 sm:right-11 sm:text-sm",
          isCenter ? "text-velvet/65" : "text-cocoa/50"
        )}
      >
        — {testimonial.name}, {testimonial.role}
      </p>
    </div>
  );
}

export function Testimonials() {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState(initialTestimonials);

  const handleMove = (steps: number) => {
    if (steps === 0) return;
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = next.shift();
          if (!item) return prev;
          next.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = 0; i > steps; i--) {
          const item = next.pop();
          if (!item) return prev;
          next.unshift({ ...item, tempId: Math.random() });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 400) setCardSize(272);
      else if (width < 640) setCardSize(300);
      else if (width < 1024) setCardSize(340);
      else setCardSize(370);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="overflow-hidden bg-velvet py-24 sm:py-32">
      <div className="container-edit mb-4 text-center">
        <span className="text-eyebrow text-cinnamon">What Our Clients Say</span>
      </div>

      <div
        className="relative w-full"
        style={{ height: cardSize + 132 }}
      >
        {list.map((testimonial, index) => {
          const position =
            list.length % 2
              ? index - (list.length - 1) / 2
              : index - list.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-3">
          <button
            type="button"
            onClick={() => handleMove(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/15 bg-white text-cocoa transition-colors hover:border-cinnamon hover:bg-cinnamon hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => handleMove(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/15 bg-white text-cocoa transition-colors hover:border-cinnamon hover:bg-cinnamon hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
