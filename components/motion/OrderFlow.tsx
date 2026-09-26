"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

type Step = { title: string; body: string };

/**
 * How an order moves through the works: numbered stations joined by a line.
 * When the section scrolls into view the line fills from one station to the
 * next and each station switches on as the order reaches it.
 * Horizontal from lg, vertical below. Styling: .flow-* in globals.css.
 */
export function OrderFlow({
  steps,
  tone = "light",
  className = "",
}: {
  steps: readonly Step[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLOListElement>({ threshold: 0.3 });
  const [active, setActive] = useState(-1);
  const n = steps.length;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setActive(n - 1);
      return;
    }
    if (!inView) return;
    let i = 0;
    setActive(0);
    const id = window.setInterval(() => {
      i += 1;
      setActive(i);
      if (i >= n - 1) window.clearInterval(id);
    }, 600);
    return () => window.clearInterval(id);
  }, [inView, n]);

  const dark = tone === "dark";

  return (
    <ol
      ref={ref}
      className={`flow ${dark ? "flow--dark" : ""} grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-x-8 ${className}`}
      style={{ ["--n" as string]: n }}
    >
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0">
          {i < n - 1 && (
            <span className="flow-link" aria-hidden="true" data-filled={active >= i + 1 ? "" : undefined}>
              <span className="flow-link-fill" />
            </span>
          )}
          <span className="flow-node" aria-hidden="true" data-on={active >= i ? "" : undefined}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 pt-2.5 lg:mt-6 lg:pt-0">
            <h3 className={`font-display text-2xl font-semibold leading-tight ${dark ? "text-white" : "text-ink"}`}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={`mt-2 text-[0.975rem] leading-relaxed ${dark ? "text-fog-2" : "text-ink-2"}`}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
