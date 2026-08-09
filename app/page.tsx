import Link from "next/link";
import Image from "next/image";
import { company, industries, productCategories, positioningPoints, standards } from "@/lib/content";
import { ISOBadge } from "@/components/ISOBadge";
import { HeroBg } from "@/components/HeroSlideshow";

const capabilityImages = [
  // lmw_tuning: full-frame CNC shop — centre crop is fine
  { src: "/im/lmw_tuning.jpg",                 pos: "object-center" },
  // Hydraulic_hose: product on left half, text on right — crop left
  { src: "/im/Hydraulic_hose.jpg",             pos: "object-left"   },
  // Pressure_testing machine: machine centred — centre crop is fine
  { src: "/im/Pressure_testing machine.jpg",   pos: "object-center" },
  // Hose_fittings: fittings on left half, text on right — crop left
  { src: "/im/Hose_fittings.jpg",              pos: "object-left"   },
];

export default function HomePage() {
  const featuredCategories = productCategories;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[65dvh] flex flex-col justify-end">
        <HeroBg />

        {/* Content sits above a fading bottom strip */}
        <div className="relative z-10 w-full">
          <div className="container-edge pt-28 pb-10">
            {/* Headline + CTAs — full width */}
            <div className="max-w-3xl">
              <div
                className="flex flex-wrap gap-2 mb-5"
                data-anim="fade-up"
                data-delay="80"
              >
                <span className="bg-white/10 border border-white/25 text-white px-3 py-1 text-xs font-medium">
                  Est. {company.foundedYear} · Tiruchengode
                </span>
                <span className="bg-brand text-white px-3 py-1 text-xs font-semibold">
                  ISO 9001:2015 Certified
                </span>
              </div>
              <h1
                data-anim="fade-up"
                data-delay="180"
                className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-medium text-white leading-[1.12]"
              >
                Precision hydraulic fittings,
                <br />
                hose assemblies &amp; fluid components —
                <br />
                <span className="text-blue-300">supplied across India and globally.</span>
              </h1>
              <div className="mt-7" data-anim="fade-up" data-delay="320">
                <Link
                  href="/products"
                  className="press group inline-flex flex-col items-start gap-2"
                >
                  <span className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-6 py-3 transition-colors duration-180 group-hover:border-white group-hover:bg-white/5">
                    Browse catalogue
                    <span aria-hidden="true" className="transition-transform duration-180 group-hover:translate-x-1">→</span>
                  </span>
                  <span className="hero-ram" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats strip — staggered */}
          <div className="bg-black/50 border-t border-white/10">
            <dl
              className="container-edge flex flex-wrap gap-x-10 gap-y-2 py-3"
              data-stagger
              data-stagger-step="90"
              data-anim="fade"
            >
              {[
                { label: "Founded",     value: String(company.foundedYear) },
                { label: "Facility",    value: "8,000 ft²" },
                { label: "Max pressure", value: "10,000 psi" },
                { label: "Standards",   value: "ISO · SAE · DIN · JIS" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <dt className="text-[10px] uppercase tracking-wider text-white/40">{s.label}</dt>
                  <dd className="text-xs font-medium text-white/80">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 md:py-28">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className="section-num"
                data-anim="fade"
                data-delay="100"
              >
                01 / Catalogue
              </span>
              <h2
                data-anim="fade-up"
                data-delay="180"
                className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight2 text-ink-1"
              >
                Product categories
              </h2>
              <p
                data-anim="fade-up"
                data-delay="280"
                className="mt-3 max-w-[54ch] text-base md:text-lg leading-relaxed text-ink-2"
              >
                Hydraulic components across multiple categories. Each conforms to international standards; bespoke builds available on request.
              </p>
            </div>
            <Link
              href="/products"
              data-anim="fade-up"
              data-delay="380"
              className="btn-ghost press shrink-0"
            >
              View full catalogue <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-stagger
            data-stagger-step="60"
          >
            {featuredCategories.map((p) => (
              <Link
                key={p.id}
                href={`/products#${p.id}`}
                className="group lift-hover block bg-surface-1 border border-line-1 p-6 hover:border-brand hover:bg-surface-0"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-brand">
                  {p.code}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium text-ink-1 group-hover:text-brand transition-colors">
                  {p.label}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-2">
                  {p.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-220">
                  View products
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENGINEERING CALLOUT ─── */}
      <section className="bg-surface-1 py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="section-num" data-anim="fade" data-delay="100">
              02 / Engineering
            </span>
            <h2
              data-anim="fade-up"
              data-delay="180"
              className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight2 text-ink-1"
            >
              Built to spec, section by section.
            </h2>
            <p
              data-anim="fade-up"
              data-delay="280"
              className="mt-5 max-w-[44ch] text-base md:text-lg leading-relaxed text-ink-2"
            >
              Every hose assembly we ship is matched to its duty — inner tube,
              reinforcement braid, outer jacket, end fitting. We don&apos;t
              guess. We specify.
            </p>
            <dl className="mt-8" data-stagger data-stagger-step="50">
              {standards.map((s) => (
                <div key={s} className="spec-row">
                  <dt>{s}</dt>
                  <dd>International standard · documented</dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            data-anim="slide-right"
            data-delay="220"
            className="relative aspect-[4/3] w-full bg-surface-0 border border-line-1 overflow-hidden group"
          >
            <Image
              src="/products/c2at-g2-two-wire-braid-hose.png"
              alt="Two wire braid hose cross-section"
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Tag on the corner — the schematic identity */}
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-label uppercase text-ink-3 bg-surface-2/90 px-2 py-1 border border-line-1">
              HOSE-2WB · ISO 1436
            </div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section className="py-20 md:py-28">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="100">
            03 / Sectors
          </span>
          <h2
            data-anim="fade-up"
            data-delay="180"
            className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight2 text-ink-1"
          >
            Industries we serve
          </h2>
          <p
            data-anim="fade-up"
            data-delay="280"
            className="mt-3 max-w-[54ch] text-base md:text-lg leading-relaxed text-ink-2"
          >
            Ten industrial segments supplied regularly — from earth-moving equipment to defence and oil &amp; gas.
          </p>

          <ul
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            data-stagger
            data-stagger-step="50"
          >
            {industries.map((ind) => (
              <li
                key={ind}
                className="lift-hover bg-surface-1 border border-line-1 px-5 py-5 text-base font-medium text-ink-1 hover:border-brand hover:text-brand"
              >
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="bg-surface-1 py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-num" data-anim="fade" data-delay="100">
              04 / Why us
            </span>
            <h2
              data-anim="fade-up"
              data-delay="180"
              className="mt-3 font-display text-3xl md:text-4xl font-medium tracking-tight2 text-ink-1"
            >
              Why India Hydraulics?
            </h2>
          </div>
          <div className="md:col-span-8">
            <ol className="space-y-0" data-stagger data-stagger-step="80">
              {positioningPoints.map((p, i) => (
                <li
                  key={i}
                  className="group flex gap-5 border-t border-line-1 py-6 transition-colors duration-180 hover:bg-surface-3/50"
                >
                  <span className="num-pop shrink-0 flex items-center justify-center w-8 h-8 bg-brand text-brand-ink text-sm font-medium rounded-full">
                    {i + 1}
                  </span>
                  <p className="text-base md:text-lg leading-relaxed text-ink-2">
                    {p}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
