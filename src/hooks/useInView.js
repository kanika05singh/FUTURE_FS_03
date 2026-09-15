import { useEffect, useRef, useState } from "react";

/**
 * useInView
 * Tracks whether an element has scrolled into the viewport, using
 * IntersectionObserver. Once triggered it stays "true" (elements fade/slide
 * in once and stay put — they don't re-animate every time you scroll past).
 *
 * @param {Object} options
 * @param {number} options.threshold - fraction of the element that must be visible (0-1)
 * @param {string} options.rootMargin - shrinks/grows the viewport used for the check
 */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -80px 0px" } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the browser can't do IntersectionObserver, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
