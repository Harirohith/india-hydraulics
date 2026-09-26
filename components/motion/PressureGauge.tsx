"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { easeOut, prefersReducedMotion, useInView } from "./useInView";

/**
 * A test-bench pressure gauge. When it scrolls into view the red needle
 * climbs to the rated pressure, the readout counts with it, and the QC stamp
 * lands — the hydrostatic test every assembly goes through before despatch.
 *
 * Rests at 0 until in view. Reduced motion → final state at once. Without JS,
 * CSS (.gauge-* in globals.css) shows the final state. Screen readers get the
 * real value via sr-only text.
 */
export function PressureGauge({
  value = 10000,
  max = 10000,
  unit = "psi",
  label = "Rated working pressure",
  tone = "light",
  className = "",
}: {
  value?: number;
  max?: number;
  unit?: string;
  label?: string;
  /** Colour of the text around the dial: light (on paper) or dark (on carbon) */
  tone?: "light" | "dark";
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setP(1);
      setDone(true);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const duration = 2400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setP(easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const dark = tone === "dark";
  const C = 120;
  const finalFrac = Math.min(1, value / max);
  const frac = finalFrac * p;
  const angle = (f: number) => -135 + 270 * f;
  const at = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    // Rounded so server and browser trig results match exactly (hydration).
    const round = (v: number) => Math.round(v * 100) / 100;
    return [round(C + r * Math.sin(rad)), round(C - r * Math.cos(rad))] as const;
  };
  const reading = Math.round(value * p);
  const noJs = { "--nojs-rot": `${angle(finalFrac)}deg` } as React.CSSProperties;

  // 0–10 major divisions, 5 minor divisions each
  const ticks = Array.from({ length: 51 }, (_, i) => {
    const f = i / 50;
    const major = i % 5 === 0;
    const [x1, y1] = at(angle(f), 98);
    const [x2, y2] = at(angle(f), major ? 84 : 92);
    return { i, x1, y1, x2, y2, major };
  });
  const labels = Array.from({ length: 11 }, (_, i) => {
    const [x, y] = at(angle(i / 10), 71);
    return { i, x, y };
  });

  return (
    <div ref={ref} className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[21rem]">
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true">
          {/* Bezel and dial face */}
          <circle cx={C} cy={C} r="118" fill="#1B1C20" />
          <circle cx={C} cy={C} r="110" fill="#F5F4F0" stroke="#2C2E33" strokeWidth="1" />
          {/* Scale */}
          {ticks.map((t) => (
            <line
              key={t.i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#121316"
              strokeWidth={t.major ? 2.2 : 0.9}
            />
          ))}
          {labels.map((l) => (
            <text
              key={l.i}
              x={l.x}
              y={l.y + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-mono), monospace"
              fill="#121316"
            >
              {l.i}
            </text>
          ))}
          <text
            x={C}
            y="160"
            textAnchor="middle"
            fontSize="8.5"
            letterSpacing="1.2"
            fontFamily="var(--font-mono), monospace"
            fill="#5E6168"
          >
            PSI × 1000
          </text>
          {/* Needle */}
          <g className="gauge-needle" style={noJs} transform={`rotate(${angle(frac)} ${C} ${C})`}>
            <path d={`M ${C - 2.6} ${C + 18} L ${C} ${C - 92} L ${C + 2.6} ${C + 18} Z`} fill="#D92D20" />
          </g>
          <circle cx={C} cy={C} r="9" fill="#121316" />
          <circle cx={C} cy={C} r="2.5" fill="#5E6168" />
        </svg>

        {/* QC stamp lands once the needle settles */}
        <span
          className="gauge-stamp stamp absolute bottom-[7%] left-1/2 -ml-[4rem] w-[6.8rem] bg-[#F5F4F0] text-success"
          data-on={done ? "" : undefined}
        >
          <span className="text-[0.95rem] tracking-[0.18em]">Passed</span>
          <span className="text-[0.55rem] tracking-[0.12em]">Hydrostatic test</span>
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <p
          className={`inline-flex items-baseline gap-2 border px-4 py-2 font-mono text-2xl font-semibold tabular-nums ${
            dark ? "border-carbon-3 bg-carbon-2 text-white" : "border-ink bg-paper text-ink"
          }`}
        >
          <span aria-hidden="true" className="js-only">
            {reading.toLocaleString("en-IN")}
          </span>
          <span aria-hidden="true" className="nojs-only">
            {value.toLocaleString("en-IN")}
          </span>
          <span className="sr-only">{value.toLocaleString("en-IN")}</span>
          <span className={`text-sm font-medium ${dark ? "text-fog-2" : "text-ink-3"}`}>{unit}</span>
        </p>
        <p className={`text-sm ${dark ? "text-fog-2" : "text-ink-3"}`}>{label}</p>
      </div>
    </div>
  );
}
