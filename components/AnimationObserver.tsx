"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives scroll reveals (see the MOTION block in app/globals.css).
 *
 *  - [data-reveal]        the element rises into place once it is 12% visible
 *  - [data-reveal-group]  its children rise in reading order, 70ms apart
 *
 * Marks elements with the `data-revealed` attribute (not a class, so React
 * re-renders never wipe it). A MutationObserver picks up nodes mounted later
 * (filtered product lists, client navigation), so nothing is left hidden.
 */
export function AnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Tell the inline boot script in layout.tsx that reveals are live.
    (window as unknown as { __ihReveal?: boolean }).__ihReveal = true;

    const SELECTOR = "[data-reveal]:not([data-revealed]), [data-reveal-group]:not([data-revealed])";
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const watch = (root: ParentNode) =>
      root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
