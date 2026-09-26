import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { company, locations } from "@/lib/content";
import { CountUp } from "@/components/motion/CountUp";
import { d } from "@/lib/style";

const totalSqft = locations.reduce((n, l) => n + l.sqft, 0);

/*
 * From lg the photograph starts on the 8/12 line of the container and bleeds
 * to the right edge of the window. The same line is the left edge of the last
 * cell in the facts row below, so photo and rule line up exactly.
 * (100% = the hero's width; 1320px / 2.5rem = --container / --gutter-lg.)
 */
const splitLine = {
  "--split": "calc(max(2.5rem, (100% - 1320px) / 2 + 2.5rem) + (min(100%, 1320px) - 5rem) * 8 / 12)",
} as CSSProperties;

type Fact = { label: string; value: ReactNode };

const facts: Fact[] = [
  { label: "Established", value: company.foundedYear },
  {
    label: "Rated up to",
    value: (
      <>
        <CountUp value={10000} /> <Unit>psi</Unit>
      </>
    ),
  },
  {
    label: "Two units",
    value: (
      <>
        <CountUp value={totalSqft} /> <Unit>ft²</Unit>
      </>
    ),
  },
  { label: "Certified", value: "ISO 9001:2015" },
];

/* Phones: a ruled label / value list. sm–lg: 2 × 2. lg: one row of four. */
const factCell = (i: number) =>
  [
    "flex items-baseline justify-between gap-4 border-carbon-3 py-4",
    i > 0 ? "max-sm:border-t" : "",
    "sm:block sm:py-6 sm:pr-4",
    i % 2 === 1 ? "sm:max-lg:border-l sm:max-lg:pl-6" : "",
    i >= 2 ? "sm:max-lg:border-t" : "",
    "lg:border-l lg:pl-7 lg:first:border-l-0 lg:first:pl-0",
  ].join(" ");

function Unit({ children }: { children: ReactNode }) {
  return <span className="text-[0.55em] font-medium text-fog-2">{children}</span>;
}

/**
 * Home opener: who we are and why a buyer can trust us, in one screen.
 * Copy arrives in reading order; the facts row closes the hero like the
 * data strip at the foot of a catalogue cover.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className="relative bg-carbon text-white" style={splitLine}>
      <div className="relative">
        <div className="container-edge">
          <div className="pb-12 pt-11 md:pb-16 md:pt-14 lg:w-8/12 lg:pb-16 lg:pr-14 lg:pt-14">
            <h1 id="home-title">
              <span className="t-kicker load-rise block font-sans text-fog-2" style={d(40)}>
                Hydraulic hose assemblies
              </span>
              <span className="t-display load-rise mt-5 block text-white" style={d(110)}>
                Built to your drawing, tested before despatch.
              </span>
            </h1>
            <p className="t-lede load-rise mt-6 max-w-[47rem] text-fog-2" style={d(220)}>
              Hydraulic hoses, CNC-machined fittings, adapters and seals from Tiruchengode, Tamil Nadu — supplied
              across India and for export since {company.foundedYear}.
            </p>
            <div className="load-rise mt-8 flex flex-col gap-3 sm:flex-row" style={d(300)}>
              <Link href="/contact#enquiry" className="btn btn-light btn-lg">
                Request a quote <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-lg"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div
          className="load-fade relative aspect-[3/2] bg-carbon-2 sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:left-[var(--split)] lg:right-0 lg:aspect-auto"
          style={d(180)}
        >
          <Image
            src="/stock/engine-room.jpg"
            alt="Flanged pipework and valves in an engine room"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="photo-bw object-cover"
            style={{ objectPosition: "18% 50%" }}
          />
        </div>
      </div>

      <div className="container-edge">
        <dl
          className="load-rise grid border-t border-carbon-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,8fr))_minmax(0,12fr)]"
          style={d(380)}
        >
          {facts.map((f, i) => (
            <div key={f.label} className={factCell(i)}>
              <dt className="t-label text-fog-2">{f.label}</dt>
              <dd className="whitespace-nowrap font-display text-[1.75rem] font-semibold leading-none text-white sm:mt-3 sm:text-[2.6rem] md:text-5xl">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
