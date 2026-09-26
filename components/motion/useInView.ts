"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (never flips back). */
export function useInView<T extends Element>({
  threshold = 0.35,
  rootMargin = "0px",
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Ease-out cubic — the same curve the CSS uses (--ease-out ≈ this). */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
