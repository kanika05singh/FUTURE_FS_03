import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/businessData";
import Reveal from "./ui/Reveal";

const AUTOPLAY_INTERVAL_MS = 5000;

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function getCards() {
    const track = trackRef.current;
    return track ? Array.from(track.querySelectorAll("[data-card]")) : [];
  }

  function scrollToIndex(index) {
    const track = trackRef.current;
    const cards = getCards();
    const card = cards[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const cards = getCards();
    const nearEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    const atStart = track.scrollLeft <= 8;

    if (direction > 0 && nearEnd) {
      scrollToIndex(0);
      return;
    }
    if (direction < 0 && atStart) {
      scrollToIndex(cards.length - 1);
      return;
    }
    const cardWidth = cards[0] ? cards[0].getBoundingClientRect().width + 20 : 320;
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  // Keep the pagination dots in sync with whatever the reader scrolls to,
  // whether that's the arrow buttons, a dot, or a manual swipe/drag.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      const cards = getCards();
      const trackLeft = track.getBoundingClientRect().left;
      let closest = 0;
      let minDistance = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });
      setActiveIndex(closest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle autoplay — pauses on hover/touch/focus, and never runs at all
  // for readers who've asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const id = setInterval(() => {
      if (!isPausedRef.current) scrollByCard(1);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" className="bg-paper-soft py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6" as="div">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What the regulars say.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ash">
              Six diners, six tables, one open kitchen.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          onTouchStart={() => (isPausedRef.current = true)}
          onFocus={() => (isPausedRef.current = true)}
          onBlur={() => (isPausedRef.current = false)}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              data-card
              className="w-[85%] shrink-0 snap-start rounded-2xl bg-paper p-6 shadow-sm ring-1 ring-line transition-shadow duration-300 hover:shadow-lg sm:w-[46%] lg:w-[31%]"
            >
              <Quote className="h-6 w-6 text-chili/40" />
              <div className="mt-3 flex items-center gap-1 text-saffron">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-saffron" : "text-line"}`} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ash">"{testimonial.review}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                  {initials(testimonial.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-ash">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-2 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to testimonial from ${testimonial.name}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-chili" : "w-2 bg-line hover:bg-ash/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
