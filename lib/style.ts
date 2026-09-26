import type { CSSProperties } from "react";

/**
 * Sequence delay for .load-rise / .load-fade / .ram-line (hero copy on page
 * load). Usage: <h1 className="load-rise" style={d(160)}>
 */
export const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * Extra delay for a scroll-revealed element ([data-reveal]).
 * Usage: <div data-reveal style={revealDelay(120)}>
 */
export const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
