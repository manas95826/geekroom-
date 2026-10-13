import Image from "next/image";
import { UserRound } from "lucide-react";
import SectionHead from "@/components/ui/SectionHead";
import { corporateTestimonials, participantTestimonials, type Testimonial } from "@/data/site";

/** Copies of each row in the track; the CSS loop shifts by exactly one copy (-25%). */
const COPIES = 4;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col justify-between gap-8 rounded-[1.5rem] border border-line bg-ink-2 p-6 md:w-[24rem] md:p-8">
      <blockquote className="text-base leading-relaxed text-paper md:text-lg">
        <span className="font-display text-3xl leading-none font-bold text-orange">&ldquo;</span>
        {t.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-3 font-mono text-xs text-orange">
          {t.name ? initials(t.name) : <UserRound className="size-4" />}
        </span>
        <span>
          <span className="block font-display text-base leading-tight font-extrabold uppercase [font-stretch:80%]">
            {t.name ?? "Participant"}
          </span>
          <span className="label mt-1 block">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Larger card for partner and industry voices: paper on ink, orange rule, quote set in the display face. */
function FeaturedCard({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.5rem] bg-paper p-7 text-ink md:p-9">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-orange" />
      <blockquote className="font-display text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.15] font-bold [font-stretch:85%]">
        <span className="text-orange">&ldquo;</span>
        {t.quote}
        <span className="text-orange">&rdquo;</span>
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-ink/15 pt-6">
        {t.image ? (
          <Image src={t.image} alt={t.name ?? ""} width={88} height={88} className="size-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs text-orange">
            {t.name ? initials(t.name) : <UserRound className="size-4" />}
          </span>
        )}
        <span>
          <span className="block font-display text-lg leading-tight font-extrabold uppercase [font-stretch:80%]">{t.name}</span>
          <span className="mt-1 block font-mono text-xs tracking-[0.04em] text-ink/65">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Partner and industry testimonials sit in a highlighted grid; hacker feedback
 * drifts past below as a marquee. The marquee repeats its list so the CSS loop
 * wraps without a seam, and hovering pauses it so a quote can be read.
 */
export default function Testimonials({ index = "07" }: { index?: string }) {
  const row = participantTestimonials;

  return (
    <section className="py-24 md:py-32">
      <div className="shell">
        <SectionHead
          index={index}
          title={
            <>
              Loved by <em>builders</em>
            </>
          }
          intro="Partners, mentors and hackers on what it's like to build with Geek Room."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {corporateTestimonials.map((t) => (
            <FeaturedCard key={t.name} t={t} />
          ))}
        </div>

        <p className="label mt-16">From the hackers</p>
      </div>

      <div className="testimonial-mask mt-6">
        <div className="testimonial-row flex overflow-hidden">
          <div className="testimonial-track flex">
            {Array.from({ length: COPIES }, () => row)
              .flat()
              .map((t, i) => (
                <div key={i} className="pr-4" aria-hidden={i >= row.length || undefined}>
                  <Card t={t} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
