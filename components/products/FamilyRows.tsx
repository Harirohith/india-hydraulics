import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Family, FamilyPhoto, FamilyRow, Tone } from "./families";
import { quoteHref } from "./families";

/*
 * The nine product families, set as catalogue sheets:
 *   spread — photo and data side by side, full width (core families)
 *   pair   — two half-page sheets whose rows line up (subgrid)
 *   strip  — photo, text and data in one band (closing family)
 * Each block reveals once as it scrolls in.
 */

const toneClass: Record<Tone, string> = {
  paper: "bg-paper",
  "paper-2": "bg-paper-2",
  carbon: "bg-carbon",
};

// The strong rule over each sheet sits under the family code.
function SheetHead({ family, dark, size }: { family: Family; dark?: boolean; size: "lg" | "md" }) {
  return (
    <>
      <div className={`border-t pt-3 ${dark ? "border-fog" : "border-ink"}`}>
        <p className={`t-label ${dark ? "!text-fog-2" : ""}`}>{family.code}</p>
      </div>
      <h2
        id={`${family.id}-title`}
        className={`${size === "lg" ? "t-h2 mt-5" : "t-h3 mt-4"} ${dark ? "text-white" : "text-ink"}`}
      >
        {family.label}
      </h2>
    </>
  );
}

function Photo({ photo, sizes, className = "" }: { photo: FamilyPhoto | null; sizes: string; className?: string }) {
  if (!photo) return null;
  const cover = photo.fit === "cover";
  const deepZoom = (photo.zoom?.scale ?? 1) >= 1.5;
  const imgClass = cover
    ? `object-cover ${photo.bw ? "photo-bw" : ""}`
    : `object-contain ${photo.pad ?? "p-8 sm:p-10"} ${photo.tone ?? ""}`;
  return (
    <div className={`relative overflow-hidden ${cover ? "bg-paper-3" : "photo-well"} ${photo.aspect} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        // A deep crop needs the full-size file to stay sharp.
        sizes={deepZoom ? "(min-width: 768px) 1200px, 200vw" : sizes}
        quality={photo.zoom ? 85 : undefined}
        className={imgClass}
        style={{
          objectPosition: photo.position ?? "50% 50%",
          ...(photo.zoom ? { transform: `scale(${photo.zoom.scale})`, transformOrigin: photo.zoom.origin } : {}),
        }}
      />
    </div>
  );
}

/*
 * A spec value wraps like normal text, except that a hyphenated word
 * ("food-grade") or a standard ("EN 856") is never split and a "·" never
 * starts a line. Only single words are held together, so every row's label
 * column still resolves to the same width and the values line up.
 */
function SpecValue({ value }: { value: string }) {
  const parts = value
    .replace(/ · /g, "\u00a0· ")
    // standard designations stay whole: "EN 856", "SAE 100R12", "SS 304"
    .replace(/\b([A-Z]{2,4}) ([A-Z]?\d)/g, "$1\u00a0$2")
    .split(/(\S+-\S+)/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

// On tablets and small laptops the sheets are narrow: hold the label column at
// its minimum so the values keep the width.
const narrowLabels = "sm:max-xl:[&_.spec-row]:grid-cols-[8.5rem_minmax(0,1fr)]";

function Specs({ family, dark, className = "" }: { family: Family; dark?: boolean; className?: string }) {
  return (
    <dl className={`spec-table ${dark ? "spec-table--dark" : ""} ${narrowLabels} ${className}`}>
      {family.specs.map(([k, v]) => (
        <div key={k} className="spec-row">
          <dt>{k}</dt>
          <dd>
            <SpecValue value={v} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Actions({ family, dark, className = "" }: { family: Family; dark?: boolean; className?: string }) {
  const { related } = family;
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-5 ${className}`}>
      <Link href={quoteHref(family.label)} className={`link-arrow ${dark ? "text-white hover:text-fog-2" : ""}`}>
        Ask about {family.ask}{" "}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </Link>
      {related && (
        <a
          href={`#cat-${related.slug}`}
          className={`group inline-flex min-h-11 items-center gap-2 text-[0.975rem] transition-colors ${
            dark ? "text-fog-2 hover:text-white" : "text-ink-3 hover:text-ink"
          }`}
        >
          {related.count} {related.count === 1 ? "item" : "items"} in the catalogue
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
      )}
    </div>
  );
}

function Spread({ family, photoSide, tone }: { family: Family; photoSide: "left" | "right"; tone: Tone }) {
  const dark = tone === "carbon";
  const narrow = family.photo?.aspect === "aspect-[4/5]";
  const left = photoSide === "left";
  // md: photo in five columns, text in seven. lg: portrait photos drop to four
  // columns (the small source files stay sharp) and wide ones leave a
  // one-column gutter before the text.
  const photoCols = left
    ? `md:col-span-5 md:col-start-1 ${narrow ? "lg:col-span-4" : ""}`
    : `md:col-span-5 md:col-start-8 ${narrow ? "lg:col-span-4 lg:col-start-9" : ""}`;
  const textCols = left
    ? `md:col-span-7 md:col-start-6 ${narrow ? "" : "lg:col-span-6 lg:col-start-7"}`
    : `md:col-span-7 md:col-start-1 ${narrow ? "" : "lg:col-span-6"}`;
  // On the dark spread the family's pressure rating is set large under the photo.
  const rating = dark ? family.rating : null;

  return (
    <section className={toneClass[tone]}>
      <div className="container-edge py-16 md:py-20 lg:py-28">
        <article
          id={family.id}
          aria-labelledby={`${family.id}-title`}
          data-reveal
          className="grid scroll-mt-4 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8 lg:scroll-mt-14 lg:gap-x-12"
        >
          <header className={`md:row-start-1 ${textCols}`}>
            <SheetHead family={family} dark={dark} size="lg" />
          </header>
          {/* Stacked on a phone the photo keeps a modest width: the source files are small */}
          <div
            className={`mt-8 md:row-span-2 md:row-start-1 md:mt-0 md:max-w-none ${
              narrow ? "max-w-sm" : "max-w-md"
            } ${photoCols}`}
          >
            <Photo photo={family.photo} sizes="(min-width: 768px) 490px, 100vw" />
            {rating && (
              <p className="mt-6 border-b border-carbon-3 pb-6">
                <span className="t-label block !text-fog-2">Maximum working pressure</span>
                <span className="mt-3 flex flex-wrap items-baseline gap-x-3 font-display font-semibold leading-[0.85] text-white">
                  <span className="text-[clamp(4rem,3rem+3.2vw,6.25rem)]">{rating}</span>
                  <span className="text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] text-fog-2">psi</span>
                </span>
              </p>
            )}
          </div>
          <div className={`mt-8 md:row-start-2 md:mt-6 ${textCols}`}>
            <p className={`t-lede max-w-[46ch] ${dark ? "!text-fog-2" : ""}`}>{family.description}</p>
            <Specs family={family} dark={dark} className="mt-8" />
            <Actions family={family} dark={dark} className="mt-9" />
          </div>
        </article>
      </div>
    </section>
  );
}

function Pair({ families, tone }: { families: [Family, Family]; tone: Tone }) {
  return (
    <section className={toneClass[tone]}>
      <div className="container-edge py-16 md:py-20 lg:py-24">
        <div
          data-reveal-group
          className="grid gap-y-20 md:grid-cols-2 md:grid-rows-[repeat(5,auto)] md:gap-x-10 md:gap-y-0 lg:gap-x-12"
        >
          {families.map((f) => (
            <article
              key={f.id}
              id={f.id}
              aria-labelledby={`${f.id}-title`}
              className="scroll-mt-4 md:row-span-5 md:grid md:grid-rows-subgrid lg:scroll-mt-14"
            >
              <header>
                <SheetHead family={f} size="md" />
              </header>
              <Photo photo={f.photo} sizes="(min-width: 768px) 50vw, 100vw" className="mt-6" />
              <p className="mt-6 max-w-[48ch] text-ink-2">{f.description}</p>
              <Specs family={f} className="mt-6" />
              <Actions family={f} className="mt-8 self-start" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * md–lg: photo left, everything else stacked beside it.
 * xl: photo | name, description and link | specification, in one band.
 */
function Strip({ family, tone }: { family: Family; tone: Tone }) {
  return (
    <section className={toneClass[tone]}>
      <div className="container-edge py-16 md:py-20 lg:py-24">
        <article
          id={family.id}
          aria-labelledby={`${family.id}-title`}
          data-reveal
          className="grid scroll-mt-4 md:grid-cols-12 md:grid-rows-[auto_auto_auto_1fr] md:gap-x-8 lg:scroll-mt-14 lg:gap-x-12 xl:grid-rows-[auto_auto_1fr]"
        >
          <header className="md:col-span-8 md:col-start-5 md:row-start-1 xl:col-span-4 xl:col-start-4">
            <SheetHead family={family} size="md" />
          </header>
          <Photo
            photo={family.photo}
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 25vw, 100vw"
            className="mt-6 max-w-md md:col-span-4 md:col-start-1 md:row-span-4 md:row-start-1 md:mt-0 md:max-w-none xl:col-span-3 xl:row-span-3"
          />
          <p className="mt-6 max-w-[40ch] text-ink-2 md:col-span-8 md:col-start-5 md:row-start-2 xl:col-span-4 xl:col-start-4">
            {family.description}
          </p>
          <Specs
            family={family}
            className="mt-8 md:col-span-8 md:col-start-5 md:row-start-3 xl:col-span-5 xl:col-start-8 xl:row-span-3 xl:row-start-1 xl:mt-0 xl:self-start"
          />
          {/* After the data until xl; under the description in the three-column band */}
          <Actions
            family={family}
            className="mt-8 md:col-span-8 md:col-start-5 md:row-start-4 md:self-start xl:col-span-4 xl:col-start-4 xl:row-start-3"
          />
        </article>
      </div>
    </section>
  );
}

export function FamilyRows({ rows }: { rows: FamilyRow[] }) {
  return (
    <>
      {rows.map((row) => {
        if (row.kind === "pair") {
          return <Pair key={row.families.map((f) => f.id).join("+")} families={row.families} tone={row.tone} />;
        }
        if (row.kind === "strip") {
          return <Strip key={row.family.id} family={row.family} tone={row.tone} />;
        }
        return <Spread key={row.family.id} family={row.family} photoSide={row.photoSide} tone={row.tone} />;
      })}
    </>
  );
}
