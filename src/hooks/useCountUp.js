import { useEffect, useRef, useState } from "react";

/**
 * useCountUp
 * Animates a number from 0 up to `target` once `start` becomes true.
 * Used to give the About section stats a subtle counter animation when
 * they scroll into view.
 */
export function useCountUp(target, start, { duration = 1400, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, decimals]);

  return value;
}
