import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { businessData } from "../data/businessData";
import EmberMark from "./ui/EmberMark";

export default function Hero() {
  const sectionRef = useRef(null);
  const emberARef = useRef(null);
  const emberBRef = useRef(null);

  // Subtle pointer-driven parallax on the two background embers — desktop
  // with a precise pointer only, and never when the reader prefers less motion.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    let frame = null;

    function onPointerMove(event) {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (emberARef.current) {
          emberARef.current.style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0)`;
        }
        if (emberBRef.current) {
          emberBRef.current.style.transform = `translate3d(${x * -16}px, ${y * -16}px, 0)`;
        }
      });
    }

    section.addEventListener("pointermove", onPointerMove);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-charcoal pt-28 text-paper"
    >
      {/* Background ember marks — the site's one recurring graphic motif */}
      <div
        ref={emberARef}
        className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] opacity-[0.07] transition-transform duration-500 ease-out will-change-transform"
      >
        <EmberMark className="h-full w-full" color="#F0A202" />
      </div>
      <div
        ref={emberBRef}
        className="pointer-events-none absolute -bottom-32 left-[-140px] h-[420px] w-[420px] opacity-[0.05] transition-transform duration-500 ease-out will-change-transform"
      >
        <EmberMark className="h-full w-full" color="#E6402A" />
      </div>

      <div className="relative mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Copy */}
        <div>
          <p
            className="animate-fade-up text-sm font-semibold tracking-wide text-saffron opacity-0"
            style={{ animationDelay: "60ms" }}
          >
            {businessData.location}
          </p>

          <h1
            className="animate-fade-up mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight opacity-0 sm:text-6xl lg:text-[3.6rem]"
            style={{ animationDelay: "140ms" }}
          >
            Everything we cook
            <br />
            answers to fire.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-paper/75 opacity-0"
            style={{ animationDelay: "220ms" }}
          >
            {businessData.name} is a wood-fired grill and bar in{" "}
            {businessData.location} — charcoal mains, coastal seafood and a
            cocktail list built around what's on the grill.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 opacity-0 sm:flex-row sm:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-chili px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-chili-dark hover:shadow-lg hover:shadow-chili/30"
            >
              View Our Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-paper/60 hover:bg-white/5"
            >
              Reserve a Table
            </a>
          </div>

          {/* Trust indicators */}
          <dl
            className="animate-fade-up mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6 opacity-0"
            style={{ animationDelay: "380ms" }}
          >
            <div>
              <dt className="sr-only">Years on the block</dt>
              <dd className="font-display text-2xl font-semibold">6+</dd>
              <dd className="mt-1 text-xs text-paper/60">Years on the Block</dd>
            </div>
            <div>
              <dt className="sr-only">Covers served monthly</dt>
              <dd className="font-display text-2xl font-semibold">12k+</dd>
              <dd className="mt-1 text-xs text-paper/60">Covers Monthly</dd>
            </div>
            <div>
              <dt className="sr-only">Average rating</dt>
              <dd className="flex items-center gap-1 font-display text-2xl font-semibold">
                4.8
                <Star className="h-4 w-4 fill-saffron text-saffron" />
              </dd>
              <dd className="mt-1 text-xs text-paper/60">Average Rating</dd>
            </div>
          </dl>
        </div>

        {/* Graphic panel */}
        <div
          className="animate-fade-up relative order-first h-[340px] opacity-0 sm:h-[420px] lg:order-none lg:h-[520px]"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-3xl bg-charcoal-soft ring-1 ring-white/10">
            <EmberMark className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2" color="#E6402A" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-paper p-5 text-ink shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:left-8 sm:right-auto sm:w-64">
            <div className="flex items-center gap-1 text-saffron">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-saffron" />
              ))}
            </div>
            <p className="mt-2 text-sm leading-snug text-ash">
              "Best live-fire cooking in Koramangala, full stop."
            </p>
            <p className="mt-2 text-xs font-semibold text-ink">Karthik Iyer, Food Blogger</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-paper/45 transition-colors hover:text-paper/80 lg:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
