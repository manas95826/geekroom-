"use client";

import Image from "next/image";
import { useRef } from "react";
import SectionHead from "@/components/ui/SectionHead";
import type { EventItem } from "@/data/events";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Event title plus a cover that opens along the slash; its blurred backdrop drifts on scroll. */
export default function EventHero({ event }: { event: EventItem }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-cover]",
        { clipPath: "polygon(0 0, 0 0, -30% 100%, -30% 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.3, delay: 0.5, ease: "power4.inOut" },
      );
      gsap.fromTo(
        "[data-cover-bg]",
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: "[data-cover]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <SectionHead as="h1" index={event.code} title={event.title} intro={event.tagline} />
      <div data-cover className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-2 sm:aspect-[16/9] md:aspect-[21/9]">
        {/* Covers are mostly posters: show the whole image over a blurred, drifting fill of itself */}
        <Image data-cover-bg src={event.image} alt="" aria-hidden fill sizes="200px" className="scale-125 object-cover opacity-70 blur-3xl" />
        <div className="absolute inset-0 p-4 md:p-6">
          <div className="relative h-full w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(min-width: 768px) 80vw, 100vw"
              className="object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
