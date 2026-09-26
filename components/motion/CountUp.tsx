"use client";

import { useEffect, useState } from "react";
import { easeOut, prefersReducedMotion, useInView } from "./useInView";

/**
 * A number that counts up once when it scrolls into view — used only for
 * numbers that prove something (years, psi, floor area, industries).
 *
 * Rests at 0 until it is 60% visible, then counts once. Crawlers, screen
 * readers and no-JS visitors get the final value (sr-only / .nojs-only);
 * reduced-motion visitors see the final value immediately.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(value * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const format = (n: number) => n.toLocaleString("en-IN");

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true" className="nojs-only">
        {prefix}
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden="true" className="js-only">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
    </span>
  );
}
