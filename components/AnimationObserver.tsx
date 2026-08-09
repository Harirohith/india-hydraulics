"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll-triggered animation system.
 *
 *  - Every <main section> after the first gets .anim-ready (section-level fade-up).
 *  - Elements marked data-stagger get sequential delays (default 80ms,
 *    override per-container with data-stagger-step="<ms>").
 *  - Elements marked data-anim (fade-up | fade | slide-left | slide-right) get
 *    the matching animation when they enter the viewport.
 *  - data-delay="<ms>" sets an explicit pre-delay on a single element
 *    (wired via the --delay CSS variable on [data-delay]).
 *
 * The effect re-runs on every pathname change so client-side navigations
 * pick up the new page's sections + data-anim nodes. A 2s safety net force-
 * reveals anything still hidden, so a slow scroll or off-screen content
 * never strands a section at opacity 0.
 */
export function AnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Mark the html as JS-ready so the .anim-ready opacity-0 rule can apply.
    document.documentElement.classList.add("js-loaded");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;

          // Honour explicit pre-delay
          const explicitDelay = el.dataset.delay;
          if (explicitDelay) {
            el.style.setProperty("--delay", `${explicitDelay}ms`);
          }

          el.classList.add("anim-visible");
          observer.unobserve(el);

          // Stagger children inside this section
          const step = Number(el.dataset.staggerStep) || 80;
          el.querySelectorAll<HTMLElement>("[data-stagger]").forEach((child, i) => {
            const childDelay = child.dataset.delay;
            if (childDelay) {
              child.style.setProperty("--delay", `${childDelay}ms`);
            } else {
              child.style.animationDelay = `${i * step}ms`;
            }
            child.classList.add("anim-visible");
          });
        }
      },
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );

    // Section-level fade-up (skip the very first section — hero uses its own entrance)
    const sections = [...document.querySelectorAll("main section")].slice(1);
    sections.forEach((s) => {
      s.classList.add("anim-ready");
      observer.observe(s);
    });

    // Per-element animations (works inside the hero too)
    document.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
      const explicitDelay = el.dataset.delay;
      if (explicitDelay) {
        el.style.setProperty("--delay", `${explicitDelay}ms`);
      }
      observer.observe(el);
    });

    // Safety net — if anything is still .anim-ready (no .anim-visible) after
    // 2s, force-reveal. Catches: very tall sections that never reach 7%
    // threshold, sections already fully on screen at mount (rare race),
    // elements that scroll past too fast.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".anim-ready:not(.anim-visible)")
        .forEach((el) => el.classList.add("anim-visible"));
      document
        .querySelectorAll<HTMLElement>("[data-anim]:not(.anim-visible)")
        .forEach((el) => el.classList.add("anim-visible"));
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
