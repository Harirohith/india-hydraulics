import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { d } from "@/lib/style";

/**
 * Opener for inner pages, set like a catalogue chapter: breadcrumb, a big
 * title on the left, the intro and actions on the right, then a full-width
 * photograph. Copy arrives in reading order on load.
 */
export function PageHero({
  crumb,
  kicker,
  title,
  intro,
  children,
  image,
  imageAlt = "",
  imagePosition = "50% 50%",
  imageBw = true,
  facts,
}: {
  /** Breadcrumb label for this page, e.g. "Products" */
  crumb: string;
  /** Short label above the title (plain words) */
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Action buttons under the intro */
  children?: React.ReactNode;
  /** Full-width photo under the title block */
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Render the photo in black & white (default true) */
  imageBw?: boolean;
  /** Optional row of key facts between title block and photo */
  facts?: { label: string; value: React.ReactNode }[];
}) {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="container-edge pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="load-fade text-sm text-ink-3" style={d(0)}>
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 pb-12 pt-10 md:pb-16 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            {kicker && (
              <p className="t-kicker load-rise" style={d(60)}>
                {kicker}
              </p>
            )}
            <h1 className="t-h1 load-rise mt-4 text-ink" style={d(120)}>
              {title}
            </h1>
          </div>
          <div className="lg:col-span-5">
            {intro && (
              <p className="t-lede load-rise" style={d(220)}>
                {intro}
              </p>
            )}
            {children && (
              <div className="load-rise mt-8 flex flex-wrap gap-3" style={d(300)}>
                {children}
              </div>
            )}
          </div>
        </div>

        {facts && facts.length > 0 && (
          <dl
            className="load-rise grid grid-cols-2 border-t border-ink md:grid-cols-4"
            style={d(380)}
          >
            {facts.map((f) => (
              <div
                key={f.label}
                className="border-rule py-5 pr-4 max-md:[&:nth-child(n+3)]:border-t md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <dt className="t-label">{f.label}</dt>
                <dd className="mt-2 font-display text-3xl font-semibold leading-none text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {image && (
        <div className="load-fade relative h-[38vh] min-h-[240px] max-h-[520px] w-full overflow-hidden bg-paper-3" style={d(300)}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imageBw ? "photo-bw" : ""}`}
            style={{ objectPosition: imagePosition }}
          />
        </div>
      )}
    </section>
  );
}
