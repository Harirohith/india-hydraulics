"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { catalogue } from "@/lib/products";
import { Icon } from "@/components/Icon";
import { groupName, itemName } from "@/components/products/catalogueNames";
import { cellImage } from "@/components/products/catalogueImages";

/**
 * The full catalogue: a search field and a group filter (sticky beside the
 * results from lg), then every listed item grouped by catalogue group, each
 * with its own quote link that names the part on the enquiry form.
 *
 * Group sections keep the ids other pages link to (#cat-<slug>). Items rise
 * in on the first scroll only; once the visitor searches or filters, results
 * change instantly with no motion.
 */

type Item = { key: string; name: string; image: string | null; note?: string; haystack: string };
type Group = { slug: string; code: string; name: string; blurb: string; items: Item[] };

const ALL = "all";

const GROUPS: Group[] = catalogue.map((g) => {
  const gName = groupName(g);
  return {
    slug: g.slug,
    code: g.code,
    name: gName,
    blurb: g.blurb,
    items: g.products.map((p) => {
      const name = itemName(p);
      return {
        key: `${g.slug}:${p.id ?? p.name}`,
        name,
        image: p.image,
        // Without a photo the well already says so; the note only repeats it.
        note: p.image ? p.note : undefined,
        haystack: [name, p.name, gName, g.name, g.code, p.note ?? ""].join(" ").toLowerCase(),
      };
    }),
  };
});

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const quoteHref = (name: string) => `/contact?product=${encodeURIComponent(name)}#enquiry`;

function CellPhoto({ src, name }: { src: string | null; name: string }) {
  if (!src) {
    return (
      <div className="photo-well relative grid aspect-[4/3] place-items-center p-4 text-center">
        <span className="t-label">Image on request</span>
      </div>
    );
  }
  const t = cellImage(src);
  const cover = t.fit === "cover";
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${cover ? "bg-paper-3" : "photo-well"}`}>
      <Image
        src={src}
        alt={name}
        fill
        sizes="(min-width: 1280px) 310px, (min-width: 1024px) 31vw, (min-width: 768px) 33vw, 50vw"
        className={`${cover ? "object-cover" : "object-contain p-4 sm:p-5"} ${t.tone ?? ""}`}
        style={{
          objectPosition: t.position ?? "50% 50%",
          ...(t.zoom ? { transform: `scale(${t.zoom.scale})`, transformOrigin: t.zoom.origin } : {}),
        }}
      />
    </div>
  );
}

function GroupHeader({ g, className = "" }: { g: Group; className?: string }) {
  return (
    <header className={`border-t border-ink pt-3 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-label">{g.code}</p>
        <p className="t-label">{plural(g.items.length, "item")}</p>
      </div>
      <h3 id={`cat-${g.slug}-title`} className="t-h3 mt-3 text-ink">
        {g.name}
      </h3>
      <p className="mt-2 max-w-[60ch] text-ink-2">{g.blurb}</p>
    </header>
  );
}

function ItemCell({ it }: { it: Item }) {
  return (
    <li className="-ml-px -mt-px flex flex-col border border-rule bg-paper">
      <CellPhoto src={it.image} name={it.name} />
      <div className="flex flex-1 flex-col px-4 pb-2 pt-4 sm:px-5 sm:pt-5">
        <h4 className="font-sans text-base font-medium leading-snug text-ink">{it.name}</h4>
        {it.note && <p className="mt-1.5 font-mono text-sm text-ink-2">{it.note}</p>}
        <Link
          href={quoteHref(it.name)}
          className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-[0.9375rem] font-medium text-brand"
        >
          <span className="underline decoration-brand/30 underline-offset-4 group-hover:decoration-brand">
            Request quote
          </span>
          <span className="sr-only"> for {it.name}</span>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </li>
  );
}

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(ALL);
  const [interacted, setInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingScroll = useRef<string | null>(null);

  const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const matched = useMemo(
    () => GROUPS.map((g) => ({ ...g, items: g.items.filter((it) => terms.every((t) => it.haystack.includes(t))) })),
    [terms],
  );
  const counts = useMemo(() => new Map(matched.map((g) => [g.slug, g.items.length])), [matched]);
  const matchedTotal = matched.reduce((n, g) => n + g.items.length, 0);
  const shown = matched.filter((g) => g.items.length > 0 && (active === ALL || g.slug === active));
  const shownTotal = shown.reduce((n, g) => n + g.items.length, 0);
  const activeGroup = GROUPS.find((g) => g.slug === active);

  function search(value: string) {
    setQuery(value);
    setInteracted(true);
  }
  function choose(slug: string) {
    setActive(slug);
    setInteracted(true);
  }
  function reset() {
    setQuery("");
    setActive(ALL);
    setInteracted(true);
  }

  // "/" jumps to the search field from anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A link to #cat-<slug> while a search or filter hides that group: show
  // everything again, then scroll to it once it has rendered.
  useEffect(() => {
    function onHash() {
      const m = /^#cat-(.+)$/.exec(window.location.hash);
      if (!m || !GROUPS.some((g) => g.slug === m[1])) return;
      if (document.getElementById(`cat-${m[1]}`)) return; // visible: the browser has scrolled
      pendingScroll.current = `cat-${m[1]}`;
      reset();
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    if (!pendingScroll.current) return;
    document.getElementById(pendingScroll.current)?.scrollIntoView({ block: "start" });
    pendingScroll.current = null;
  });

  const q = query.trim();
  let status: string;
  if (!q) {
    status = activeGroup
      ? `${plural(shownTotal, "item")} in ${activeGroup.name.toLowerCase()}`
      : `${plural(TOTAL, "item")} in ${plural(GROUPS.length, "group")}`;
  } else {
    const where = activeGroup ? ` in ${activeGroup.name.toLowerCase()}` : "";
    status =
      shownTotal === 0
        ? `No items${where} match “${q}”`
        : `${plural(shownTotal, "item")}${where} ${shownTotal === 1 ? "matches" : "match"} “${q}”`;
  }

  // Consecutive one-item groups are gathered so they can share a row.
  const blocks: { kind: "group" | "singles"; groups: Group[] }[] = [];
  for (const g of shown) {
    const last = blocks[blocks.length - 1];
    if (g.items.length === 1 && last?.kind === "singles") last.groups.push(g);
    else blocks.push({ kind: g.items.length === 1 ? "singles" : "group", groups: [g] });
  }
  // Items rise in on the first scroll only; after a search or filter they change instantly.
  const reveal = interacted ? undefined : "";

  const filters = [
    { slug: ALL, name: "All groups", count: matchedTotal },
    ...GROUPS.map((g) => ({ slug: g.slug, name: g.name, count: counts.get(g.slug) ?? 0 })),
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
      {/* Controls */}
      <div className="lg:col-span-4 xl:col-span-3">
        {/* Sticky beside the results only on screens tall enough to show all of it */}
        <div className="lg:[@media(min-height:46rem)]:sticky lg:[@media(min-height:46rem)]:top-[calc(var(--nav-h)+2rem)]">
          <label htmlFor="catalogue-search" className="t-label block">
            Search the catalogue
          </label>
          <div className="relative mt-3">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3"
            />
            <input
              ref={inputRef}
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(e) => search(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") return;
                if (query) search("");
                else inputRef.current?.blur();
              }}
              placeholder="Name, thread or type"
              autoComplete="off"
              spellCheck={false}
              aria-describedby="catalogue-status"
              className={`input pl-12 [&::-webkit-search-cancel-button]:appearance-none ${query ? "pr-[4.75rem]" : "pr-4 lg:pr-11"}`}
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  search("");
                  inputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 px-4 text-[0.9375rem] font-medium text-ink-2 hover:text-ink"
              >
                Clear
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 border border-rule-2 px-1.5 py-0.5 font-mono text-xs leading-none text-ink-3 lg:block"
              >
                /
              </kbd>
            )}
          </div>

          <p id="catalogue-groups" className="t-label mt-8">
            Filter by group
          </p>
          <div
            role="group"
            aria-labelledby="catalogue-groups"
            className="mt-3 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-1"
          >
            {filters.map((f) => {
              const on = active === f.slug;
              const empty = f.count === 0 && !on;
              return (
                <button
                  key={f.slug}
                  type="button"
                  aria-pressed={on}
                  disabled={empty}
                  onClick={() => choose(f.slug)}
                  className={`flex min-h-11 items-center justify-between gap-3 border-b border-r border-rule px-3 py-2 text-left text-[0.9375rem] leading-snug transition-colors duration-150 ${
                    // three columns on tablets: "All" takes the first row, the nine groups fill three
                    f.slug === ALL ? "sm:col-span-3 lg:col-span-1" : ""
                  } ${
                    on
                      ? "bg-ink font-medium text-white"
                      : empty
                        ? "cursor-default bg-paper text-ink-3/60"
                        : "bg-paper text-ink-2 hover:bg-paper-2 hover:text-ink"
                  }`}
                >
                  <span className="min-w-0">{f.name}</span>
                  <span className={`font-mono text-xs tabular-nums ${on ? "text-white/70" : "text-ink-3"}`}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-8 xl:col-span-9">
        <p id="catalogue-status" aria-live="polite" className="font-mono text-sm text-ink-2">
          {status}
        </p>

        {shownTotal === 0 ? (
          <div className="mt-6 border-t border-ink pt-8">
            <p className="t-h3 max-w-[24ch] text-ink">Not in the list? We may still make it.</p>
            <p className="mt-4 max-w-[52ch] text-ink-2">
              The catalogue shows our standard items; we also make to order. Send the part number, a drawing or a sample
              and we will check it for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={quoteHref(q)} className="btn btn-primary">
                Ask about “{q.length > 24 ? `${q.slice(0, 24)}…` : q}”{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <button type="button" onClick={reset} className="btn btn-outline">
                Show all items
              </button>
            </div>
          </div>
        ) : (
          blocks.map((b, bi) => {
            const top = bi === 0 ? "mt-6" : "mt-16";
            if (b.kind === "group") {
              const g = b.groups[0];
              return (
                <section key={g.slug} id={`cat-${g.slug}`} aria-labelledby={`cat-${g.slug}-title`} className={top}>
                  <GroupHeader g={g} />
                  <ul
                    data-reveal-group={reveal}
                    className="mt-6 grid grid-cols-2 pl-px pt-px md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
                  >
                    {g.items.map((it) => (
                      <ItemCell key={it.key} it={it} />
                    ))}
                  </ul>
                </section>
              );
            }
            if (b.groups.length === 1) {
              // A lone one-item group is set as a table row: its heading beside the item.
              const g = b.groups[0];
              return (
                <section
                  key={g.slug}
                  id={`cat-${g.slug}`}
                  aria-labelledby={`cat-${g.slug}-title`}
                  className={`${top} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3`}
                >
                  <GroupHeader g={g} className="pr-4 sm:pr-8 md:col-span-2 lg:col-span-1 xl:col-span-2" />
                  <ul data-reveal-group={reveal} className="grid grid-cols-1 pl-px pt-px">
                    <ItemCell it={g.items[0]} />
                  </ul>
                </section>
              );
            }
            // One-item groups that follow each other sit side by side as small sheets;
            // subgrid lines up their headings, and their cells.
            return (
              <div
                key={b.groups.map((g) => g.slug).join("+")}
                className={`${top} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3`}
              >
                {b.groups.map((g, i) => {
                  // A sheet left alone on the last line takes the table-row form instead:
                  // with two columns (phones, lg) when the count is odd, with three (md, xl)
                  // when one is left over.
                  const last = i === b.groups.length - 1;
                  const alone2 = last && b.groups.length % 2 === 1;
                  const alone3 = last && b.groups.length % 3 === 1;
                  return (
                    <section
                      key={g.slug}
                      id={`cat-${g.slug}`}
                      aria-labelledby={`cat-${g.slug}-title`}
                      className={`row-span-2 grid grid-rows-subgrid pb-12 ${
                        alone2
                          ? "max-md:col-span-2 max-md:row-span-1 max-md:grid-cols-2 max-md:grid-rows-none lg:max-xl:col-span-2 lg:max-xl:row-span-1 lg:max-xl:grid-cols-2 lg:max-xl:grid-rows-none"
                          : ""
                      } ${
                        alone3
                          ? "md:max-lg:col-span-3 md:max-lg:row-span-1 md:max-lg:grid-cols-3 md:max-lg:grid-rows-none xl:col-span-3 xl:row-span-1 xl:grid-cols-3 xl:grid-rows-none"
                          : ""
                      }`}
                    >
                      <GroupHeader
                        g={g}
                        className={`pr-4 sm:pr-6 ${alone3 ? "md:max-lg:col-span-2 md:max-lg:pr-8 xl:col-span-2 xl:pr-8" : ""}`}
                      />
                      <ul
                        data-reveal-group={reveal}
                        className={`mt-6 grid grid-cols-1 pl-px pt-px ${alone2 ? "max-md:mt-0 lg:max-xl:mt-0" : ""} ${
                          alone3 ? "md:max-lg:mt-0 xl:mt-0" : ""
                        }`}
                      >
                        <ItemCell it={g.items[0]} />
                      </ul>
                    </section>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
