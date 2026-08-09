"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { catalogue, type CatalogueCategory, type CatalogueProduct } from "@/lib/products";

type FlatProduct = CatalogueProduct & { categoryName: string; categorySlug: string; };

function flattenCatalogue(): FlatProduct[] {
  return catalogue.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      categoryName: cat.name,
      categorySlug: cat.slug,
    }))
  );
}

const ALL_SLUG = "__all__";

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(ALL_SLUG);
  const inputRef = useRef<HTMLInputElement>(null);

  const allProducts = useMemo(() => flattenCatalogue(), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allProducts.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.note?.toLowerCase().includes(q) ?? false);
      const matchesCategory =
        activeSlug === ALL_SLUG || p.categorySlug === activeSlug;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeSlug, allProducts]);

  // Group results back by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, { cat: CatalogueCategory; products: FlatProduct[] }>();
    for (const p of filtered) {
      if (!map.has(p.categorySlug)) {
        const cat = catalogue.find((c) => c.slug === p.categorySlug)!;
        map.set(p.categorySlug, { cat, products: [] });
      }
      map.get(p.categorySlug)!.products.push(p);
    }
    return [...map.values()];
  }, [filtered]);

  const isEmpty = filtered.length === 0;

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setQuery("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div>
      {/* ── Search bar ── */}
      <div className="relative mb-8">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <div className="relative flex items-center">
          <svg
            className="absolute left-4 w-4 h-4 text-ink-3 pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="6.5" cy="6.5" r="5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products… (press / to focus)"
            className="w-full bg-surface-0 border border-line-1 pl-11 pr-24 py-3 text-base text-ink-1 placeholder:text-ink-3 outline-none focus:border-brand transition-colors duration-180 font-body"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-4 text-ink-3 hover:text-ink-1 transition-colors text-sm font-mono tracking-wide"
              aria-label="Clear search"
            >
              CLEAR
            </button>
          )}
          {!query && (
            <kbd className="absolute right-4 font-mono text-[10px] tracking-widest text-ink-3 border border-line-2 px-1.5 py-0.5 pointer-events-none">
              /
            </kbd>
          )}
        </div>
        {query && (
          <p className="mt-2 text-sm text-ink-3 font-mono">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* ── Category filter tabs ── */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-line-1 pb-6">
        <button
          onClick={() => setActiveSlug(ALL_SLUG)}
          className={`px-4 py-1.5 text-sm font-medium border transition-colors duration-180 ${
            activeSlug === ALL_SLUG
              ? "bg-brand text-white border-brand"
              : "bg-surface-0 text-ink-2 border-line-1 hover:border-brand hover:text-brand"
          }`}
        >
          All
        </button>
        {catalogue.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveSlug(cat.slug === activeSlug ? ALL_SLUG : cat.slug)}
            className={`px-4 py-1.5 text-sm font-medium border transition-colors duration-180 ${
              activeSlug === cat.slug
                ? "bg-brand text-white border-brand"
                : "bg-surface-0 text-ink-2 border-line-1 hover:border-brand hover:text-brand"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ── Results ── */}
      {isEmpty ? (
        <div className="py-20 text-center">
          <p className="font-display text-xl text-ink-3">No products found.</p>
          <p className="mt-2 text-base text-ink-3">
            Try a different search or{" "}
            <button
              onClick={() => { setQuery(""); setActiveSlug(ALL_SLUG); }}
              className="text-brand hover:underline"
            >
              reset filters
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {grouped.map(({ cat, products }) => (
            <div key={cat.slug} id={`cat-${cat.slug}`}>
              <div className="mb-6" data-anim="fade-up">
                <h3 className="font-display text-2xl font-medium text-ink-1">
                  {cat.name}
                  <span className="ml-3 text-base text-ink-3 font-mono tabular-nums">
                    ({products.length} {products.length === 1 ? "item" : "items"})
                  </span>
                </h3>
                <p className="mt-2 max-w-[60ch] text-base text-ink-2">{cat.blurb}</p>
              </div>

              <ul
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                data-stagger
                data-stagger-step="35"
              >
                {products.map((p) => (
                  <li
                    key={p.name}
                    className="lift-hover group bg-surface-1 border border-line-1 overflow-hidden hover:border-brand flex flex-col"
                  >
                    <div className="relative aspect-square w-full bg-surface-2 overflow-hidden">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-6 text-center">
                          <span className="text-sm text-ink-3">Image on request</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-line-1 flex flex-col flex-1 gap-3">
                      <p className="font-medium text-base text-ink-1 group-hover:text-brand transition-colors flex-1">
                        {p.name}
                      </p>
                      {p.note && (
                        <p className="text-sm text-ink-3">{p.note}</p>
                      )}
                      {/* Feature 5 — quick-quote button */}
                      <Link
                        href={`/contact?product=${encodeURIComponent(p.name)}`}
                        className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-brand border border-brand/40 px-3 py-1.5 hover:bg-brand hover:text-white hover:border-brand transition-colors duration-180"
                      >
                        Request quote
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
