"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
}

interface UseCountUpReturn {
  count: string;
  ref: React.RefObject<HTMLElement>;
}

// Scratch-built count-up: requestAnimationFrame + IntersectionObserver.
// Easing: easeOutCubic — t => 1 - (1 - t)^3. Fires once on viewport enter.
export function useCountUp({
  end,
  duration = 1800,
  decimals = 0,
}: UseCountUpOptions): UseCountUpReturn {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReduced) {
        setValue(end);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(end * eased);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          setValue(end);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count: value.toFixed(decimals), ref };
}
