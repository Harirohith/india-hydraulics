"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

/**
 * Cut-away drawing of a crimped hose assembly — the product explained.
 * When it scrolls into view the assembly is drawn from the fitting end to
 * the hose (the order it is built in), then each part is called out 01→05.
 * Hovering a description highlights its marker on the drawing.
 *
 * Styling: .anatomy-* in globals.css. Without JS, everything is shown.
 */

// Callouts: marker position and the point on the part it refers to (viewBox units).
const PARTS = [
  {
    title: "Machined fitting",
    body: "CNC-machined in-house — BSP, JIC, ORFS, NPT, metric and JIS ends.",
    anchor: [170, 102],
    marker: [170, 38],
  },
  {
    title: "Crimped ferrule",
    body: "Crimped in-house to the OEM specification for the hose.",
    anchor: [322, 216],
    marker: [322, 284],
  },
  {
    title: "Outer cover",
    body: "Protects the reinforcement from abrasion and weather.",
    anchor: [574, 114],
    marker: [574, 38],
  },
  {
    title: "Wire reinforcement",
    body: "One or two steel-wire braids, or 4/6-wire spiral for higher pressure.",
    anchor: [787, 202],
    marker: [787, 284],
  },
  {
    title: "Inner tube",
    body: "Carries the fluid. Bore sizes from 1/4″ to 2″.",
    anchor: [856, 130],
    marker: [856, 38],
  },
] as const;

const W = 960;
const H = 320;
const METAL = "#D9D6CE";
const METAL_LINE = "#8D8A82";
const INK = "#121316";

// Ferrule outline with crimp dents along the top and bottom edges.
function ferrulePath() {
  const dents = [262, 286, 310, 334, 358, 382];
  let top = "M232 112 L242 104";
  for (const x of dents) top += ` L${x - 6} 104 L${x} 110 L${x + 6} 104`;
  top += " L398 104 L398 216";
  let bottom = "";
  for (const x of [...dents].reverse()) bottom += ` L${x + 6} 216 L${x} 210 L${x - 6} 216`;
  return `${top}${bottom} L242 216 L232 208 Z`;
}

export function HoseAnatomy({ className = "" }: { className?: string }) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.35 });
  const [built, setBuilt] = useState(false);
  const [shown, setShown] = useState(0);
  const [hot, setHot] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setBuilt(true);
      setShown(PARTS.length);
      return;
    }
    if (!inView) return;
    setBuilt(true);
    let i = 0;
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= PARTS.length) window.clearInterval(interval);
      }, 380);
    }, 1300);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [inView]);

  const threadLines = Array.from({ length: 10 }, (_, k) => 58 + 7 * k);
  const hatch = Array.from({ length: 14 }, (_, k) => 700 + 10 * k);

  return (
    <figure ref={ref} className={`anatomy ${className}`} data-built={built ? "" : undefined}>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="anatomy-drawing block h-auto w-full"
          role="img"
          aria-label="Cut-away drawing of a crimped hydraulic hose assembly: machined fitting, crimped ferrule, outer cover, wire reinforcement and inner tube."
        >
          <defs>
            <clipPath id="ih-braid-clip">
              <rect x="750" y="118" width="74" height="84" />
            </clipPath>
          </defs>

          <g stroke={INK} strokeWidth="1.5" strokeLinejoin="round">
            {/* 1 — male thread end */}
            <path d="M40 138 L50 128 L128 128 L128 192 L50 192 L40 182 Z" fill={METAL} />
            {threadLines.map((x) => (
              <line key={x} x1={x} y1="129" x2={x - 5} y2="191" stroke={METAL_LINE} strokeWidth="1.2" />
            ))}
            {/* hex nut */}
            <path d="M128 110 L136 102 L204 102 L212 110 L212 210 L204 218 L136 218 L128 210 Z" fill={METAL} />
            <line x1="128" y1="131" x2="212" y2="131" stroke={METAL_LINE} strokeWidth="1.2" />
            <line x1="128" y1="189" x2="212" y2="189" stroke={METAL_LINE} strokeWidth="1.2" />
            {/* neck */}
            <rect x="212" y="126" width="20" height="68" fill={METAL} />

            {/* 2 — ferrule with crimp dents */}
            <path d={ferrulePath()} fill={METAL} />
            {[262, 286, 310, 334, 358, 382].map((x) => (
              <line key={x} x1={x} y1="110" x2={x} y2="210" stroke={METAL_LINE} strokeWidth="1.2" />
            ))}

            {/* 3 — outer cover */}
            <rect x="398" y="114" width="352" height="92" fill="#1E1F23" />
            <line x1="398" y1="123" x2="750" y2="123" stroke="#45474D" strokeWidth="2" />

            {/* 4 — wire braid, exposed */}
            <rect x="750" y="118" width="74" height="84" fill="#A5A299" />
            <g clipPath="url(#ih-braid-clip)" stroke="#6F6C64" strokeWidth="1.1">
              {hatch.map((x) => (
                <g key={x}>
                  <line x1={x} y1="118" x2={x + 42} y2="202" />
                  <line x1={x + 42} y1="118" x2={x} y2="202" />
                </g>
              ))}
            </g>
            <rect x="750" y="118" width="74" height="84" fill="none" />

            {/* 5 — inner tube and open end */}
            <rect x="824" y="130" width="64" height="60" fill="#34363B" />
            <ellipse cx="888" cy="160" rx="9" ry="30" fill="#2A2B30" />
            <ellipse cx="889" cy="160" rx="5" ry="17" fill="#FFFFFF" />
          </g>

          {/* Centre line */}
          <line
            x1="22"
            y1="160"
            x2="938"
            y2="160"
            stroke="#5E6168"
            strokeWidth="1"
            strokeDasharray="16 4 3 4"
            opacity="0.8"
          />

          {/* Leaders */}
          {PARTS.map((p, i) => (
            <g key={p.title} className="anatomy-callout" data-on={shown > i ? "" : undefined}>
              <line
                x1={p.anchor[0]}
                y1={p.anchor[1]}
                x2={p.marker[0]}
                y2={p.marker[1]}
                stroke={hot === i ? "#2D1C80" : INK}
                strokeWidth="1.2"
              />
              <circle cx={p.anchor[0]} cy={p.anchor[1]} r="3.5" fill={hot === i ? "#2D1C80" : INK} />
            </g>
          ))}
        </svg>

        {PARTS.map((p, i) => (
          <span
            key={p.title}
            aria-hidden="true"
            className="anatomy-marker"
            data-on={shown > i ? "" : undefined}
            data-hot={hot === i ? "" : undefined}
            style={{ left: `${(p.marker[0] / W) * 100}%`, top: `${(p.marker[1] / H) * 100}%` }}
          >
            {i + 1}
          </span>
        ))}
      </div>

      <figcaption className="mt-10">
        <ol className="rule-grid sm:grid-cols-2 lg:grid-cols-5">
          {PARTS.map((p, i) => (
            <li
              key={p.title}
              className={`bg-paper p-5 transition-colors duration-200 ${hot === i ? "bg-brand-tint" : ""}`}
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(null)}
            >
              <span className="font-mono text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">{p.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
