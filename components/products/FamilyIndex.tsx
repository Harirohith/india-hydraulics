"use client";

import { useEffect, useState } from "react";

type Entry = { id: string; code: string; label: string; short: string };

/**
 * Contents of the product families.
 *
 *  - Below lg: a ruled list set like a catalogue contents page.
 *  - lg and up: a slim bar that sticks under the header while the families
 *    scroll past (it must be a direct child of the element that wraps the
 *    family blocks). The family in the middle of the screen is underlined,
 *    so the reader always knows where they are in the catalogue.
 *
 * Returns two siblings (no wrapper) so the bar's sticky range is the whole
 * families section.
 */
export function FamilyIndex({ entries, catalogueCount }: { entries: Entry[]; catalogueCount: number }) {
  const [current, setCurrent] = useState<string[]>([]);

  useEffect(() => {
    const els = entries.map((e) => document.getElementById(e.id)).filter((el): el is HTMLElement => el !== null);
    if (!("IntersectionObserver" in window) || els.length === 0) return;

    const inBand = new Set<string>();
    // A thin band 35–40% down the viewport: whatever family crosses it is "here".
    // Half-page sheets sit side by side, so two families can be current at once.
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) inBand.add(r.target.id);
          else inBand.delete(r.target.id);
        }
        setCurrent(entries.map((e) => e.id).filter((id) => inBand.has(id)));
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [entries]);

  return (
    <>
      {/* Contents list — phones and tablets */}
      <nav aria-labelledby="families-contents" className="bg-paper lg:hidden">
        <div className="container-edge pb-4 pt-12 sm:pt-14">
          <h2 id="families-contents" className="t-kicker">
            Product families
          </h2>
          <ol className="mt-4 border-t border-ink sm:grid sm:grid-cols-2 sm:gap-x-10">
            {entries.map((e) => (
              <li key={e.id} className="border-b border-rule">
                <a href={`#${e.id}`} className="group flex min-h-[3.5rem] items-center gap-4 py-2">
                  <span className="t-label w-[4.5rem] shrink-0">{e.code}</span>
                  <span className="flex-1 text-[1.0625rem] font-medium leading-snug text-ink group-hover:text-brand">
                    {e.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ink-3 transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <a href="#catalogue" className="link-arrow">
              Search all {catalogueCount} catalogue items <span aria-hidden="true">↓</span>
            </a>
            <a href="#hsn" className="link-arrow">
              HSN codes <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>
      </nav>

      {/* Family bar — desktop, sticks under the site header */}
      <nav
        aria-label="Product families"
        className="sticky top-[var(--nav-h)] z-30 hidden border-b border-rule bg-paper lg:block"
      >
        <div className="container-edge">
          <ol className="flex h-12 items-stretch">
            {entries.map((e, i) => {
              const on = current.includes(e.id);
              return (
                <li key={e.id} className={i > 0 ? "border-l border-rule" : ""}>
                  <a
                    href={`#${e.id}`}
                    aria-current={on ? "true" : undefined}
                    title={e.label}
                    className={`relative flex h-full items-center whitespace-nowrap text-[0.875rem] font-medium transition-colors duration-200 xl:text-[0.9375rem] ${
                      i === 0 ? "pr-3 xl:pr-4" : "px-3 xl:px-4"
                    } ${on ? "text-ink" : "text-ink-3 hover:text-ink"}`}
                  >
                    {e.short}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-px h-[3px] bg-brand transition-opacity duration-200 ${
                        i === 0 ? "left-0 right-3 xl:right-4" : "inset-x-3 xl:inset-x-4"
                      } ${on ? "opacity-100" : "opacity-0"}`}
                    />
                  </a>
                </li>
              );
            })}
            <li className="ml-auto hidden xl:block">
              <a
                href="#catalogue"
                className="group flex h-full items-center gap-2 whitespace-nowrap pl-4 text-[0.9375rem] font-medium text-brand"
              >
                Full catalogue
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </>
  );
}
