import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems } from "../data/businessData";
import GraphicTile from "./ui/GraphicTile";
import Reveal from "./ui/Reveal";

const SWIPE_THRESHOLD = 45;

function Lightbox({ items, activeIndex, onClose, onNavigate, onSelect }) {
  const item = items[activeIndex];
  const touchStartX = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate]);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      onNavigate(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  }

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <span className="absolute left-5 top-5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold tabular-nums text-paper/90">
        {activeIndex + 1} / {items.length}
      </span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        className="animate-scale-in flex w-full max-w-2xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="w-full overflow-hidden rounded-3xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div key={item.id} className="animate-fade-in">
            <GraphicTile art={item.art} label={item.caption} className="aspect-[4/3] w-full" iconClassName="h-10 w-10" />
          </div>
        </div>

        {/* Thumbnail strip for quick jumping between images */}
        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto px-1 pb-1">
          {items.map((thumb, index) => (
            <button
              key={thumb.id}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(index);
              }}
              aria-label={`Go to image: ${thumb.caption}`}
              aria-current={index === activeIndex}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                index === activeIndex
                  ? "opacity-100 ring-2 ring-saffron ring-offset-2 ring-offset-ink"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <GraphicTile art={thumb.art} className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-paper transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  function navigate(delta) {
    setActiveIndex((current) => (current + delta + galleryItems.length) % galleryItems.length);
  }

  return (
    <section id="gallery" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A look inside the kitchen.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ash">
            Tap any tile for a closer look at the space, the fire and the bar.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.id}
              as="button"
              type="button"
              delay={Math.min(index, 8) * 50}
              onClick={() => setActiveIndex(index)}
              className="group relative overflow-hidden rounded-2xl text-left focus-visible:ring-2 focus-visible:ring-chili"
              aria-label={`Open image: ${item.caption}`}
            >
              <GraphicTile
                art={item.art}
                label={item.caption}
                className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg scale-90 transition-transform duration-300 group-hover:scale-100">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {isOpen && (
        <Lightbox
          items={galleryItems}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={navigate}
          onSelect={setActiveIndex}
        />
      )}
    </section>
  );
}
