import Link from "next/link";
import Image from "next/image";
import { company, capabilities, locations, mission, vision, positioningPoints, cadTools } from "@/lib/content";
import { ISOBadge } from "@/components/ISOBadge";

export const metadata = {
  title: "About",
  description:
    "India Hydraulics — founded 1996 in Tiruchengode, Tamil Nadu. In-house hydraulic design on SolidWorks and EdgeCAM; 8,000 sq ft of facilities; ISO, SAE, DIN and JIS compliance.",
};

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section>
        {/* Image-only banner — no text overlay */}
        <div className="relative w-full aspect-[16/6] overflow-hidden">
          <Image
            src="/stock/excavator-hydraulic.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Heading below the image */}
        <div className="container-edge py-12 md:py-16">
          <div data-anim="fade-up" data-delay="60">
            <ISOBadge size="lg" />
          </div>
          <h1
            data-anim="fade-up"
            data-delay="180"
            className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight3 text-ink-1 leading-[1.1]"
          >
            Three decades of hydraulics.
            <br />
            Two facilities. One town.
          </h1>
          <p
            data-anim="fade-up"
            data-delay="300"
            className="mt-6 max-w-[54ch] text-base md:text-lg leading-relaxed text-ink-2"
          >
            India Hydraulics designs, manufactures and supplies hydraulic hoses,
            hose assemblies, fittings, adapters, seals and quick-release
            couplings from Tiruchengode, Tamil Nadu. Founded in {company.foundedYear}.
          </p>
        </div>
      </section>

      {/* ─── ISO 9001:2015 CERTIFICATION ─── */}
      <section className="py-16 md:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
            <div>
              <span className="section-num" data-anim="fade" data-delay="80">
                01 / Certification
              </span>
              <h2
                data-anim="fade-up"
                data-delay="160"
                className="mt-3 font-display text-3xl font-medium text-ink-1"
              >
                Quality you can document.
              </h2>
              <p
                data-anim="fade-up"
                data-delay="260"
                className="mt-4 text-base md:text-lg leading-relaxed text-ink-2 max-w-[50ch]"
              >
                India Hydraulics is <strong className="text-ink-1">ISO 9001:2015 certified</strong> — the international standard for quality management systems. Every process, from design through despatch, conforms to documented, auditable procedures.
              </p>
              <ul
                className="mt-8 space-y-3"
                data-stagger
                data-stagger-step="70"
              >
                {[
                  "Customer requirements documented at order stage",
                  "In-process quality checks at fabrication and assembly",
                  "Hydrostatic pressure test on every hose assembly before despatch",
                  "Traceability records maintained for materials and builds",
                  "Continual improvement process — corrective and preventive actions logged",
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3 text-base text-ink-2"
                  >
                    <span className="num-pop mt-1 shrink-0 w-5 h-5 flex items-center justify-center bg-brand text-brand-ink rounded-full text-xs">
                      ✓
                    </span>
                    <span className="transition-colors duration-180 group-hover:text-ink-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="grid grid-cols-2 gap-4"
              data-stagger
              data-stagger-step="70"
            >
              {[
                { label: "Standard",   value: "ISO 9001:2015" },
                { label: "Scope",      value: "Design, manufacture & supply" },
                { label: "Industry",   value: "Hydraulic systems" },
                { label: "Audited by", value: "Third-party certifying body" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="lift-hover bg-surface-1 border border-line-1 p-5"
                >
                  <span className="text-xs uppercase tracking-wide text-ink-3">{label}</span>
                  <p className="mt-1 font-display text-base font-medium text-ink-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="lift-hover bg-surface-1 border border-line-1 p-8 md:p-12"
            data-anim="slide-left"
            data-delay="100"
          >
            <span className="text-xs uppercase tracking-wide font-medium text-brand">Mission</span>
            <p className="mt-5 font-display text-xl md:text-2xl font-medium leading-snug text-ink-1">
              &ldquo;{mission}&rdquo;
            </p>
          </div>
          <div
            className="lift-hover bg-surface-1 border border-line-1 p-8 md:p-12"
            data-anim="slide-right"
            data-delay="200"
          >
            <span className="text-xs uppercase tracking-wide font-medium text-brand">Vision</span>
            <p className="mt-5 font-display text-xl md:text-2xl font-medium leading-snug text-ink-1">
              &ldquo;{vision}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="bg-surface-1 py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-num" data-anim="fade" data-delay="80">
              02 / Story
            </span>
            <h2
              data-anim="fade-up"
              data-delay="160"
              className="mt-3 font-display text-3xl font-medium tracking-tight2 text-ink-1"
            >
              Our story
            </h2>
          </div>
          <div
            className="md:col-span-8 space-y-5 text-base md:text-lg leading-relaxed text-ink-2"
            data-stagger
            data-stagger-step="80"
          >
            <p>
              India Hydraulics was founded in {company.foundedYear} in
              Tiruchengode, Tamil Nadu, as a manufacturer of hydraulic hoses and
              fittings for the surrounding industrial belt — bore wells,
              earth-moving equipment, cement and mining.
            </p>
            <p>
              Over three decades the catalogue has expanded to include hose
              assemblies, adapters, seals, couplings, stainless steel
              corrugated hoses and ultra-high-pressure hoses, with components
              specified to ISO, SAE, DIN and JIS standards.
            </p>
            <p>
              The company retains its small-industry roots — design, machining
              and assembly are kept in-house — while supplying major industrial
              segments across India.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE ─── */}
      <section className="py-16 md:py-24">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="80">
            03 / In action
          </span>
          <h2
            data-anim="fade-up"
            data-delay="160"
            className="mt-3 font-display text-3xl font-medium tracking-tight2 text-ink-1 mb-10"
          >
            Our products in action
          </h2>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-stagger
            data-stagger-step="70"
          >
            {[
              { src: "/products/boom-hose-assembly.png",     label: "Boom Hose Assembly" },
              { src: "/products/rock-breaker.png",            label: "Rock Breaker" },
              { src: "/products/cement-hose-assembly.png",   label: "Cement Hose Assembly" },
              { src: "/products/assy-hose-assembly.png",      label: "Hose Assembly" },
            ].map((item) => (
              <div
                key={item.label}
                className="lift-hover group border border-line-1 bg-surface-1 overflow-hidden"
              >
                <div className="relative aspect-square bg-surface-0 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                <p className="px-4 py-3 text-sm font-medium text-ink-1 border-t border-line-1 group-hover:text-brand transition-colors">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FACILITIES ─── */}
      <section className="bg-surface-1 py-16 md:py-24">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="80">
            04 / Facilities
          </span>
          <h2
            data-anim="fade-up"
            data-delay="160"
            className="mt-3 font-display text-3xl font-medium tracking-tight2 text-ink-1"
          >
            Two units in Tiruchengode
          </h2>
          <p
            data-anim="fade-up"
            data-delay="260"
            className="mt-3 text-base md:text-lg text-ink-2"
          >
            6,000 sq ft of manufacturing (Unit 1) and 2,000 sq ft of assembly (Unit 2).
          </p>

          {/* Factory photo */}
          <div
            data-anim="fade-up"
            data-delay="360"
            className="mt-8 relative w-full aspect-[16/6] overflow-hidden border border-line-1 group"
          >
            <Image
              src="/im/factory_pic.jpg"
              alt="India Hydraulics factory — Tiruchengode"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-label uppercase text-white bg-black/60 px-2 py-1 border border-white/20">
              UNIT 1 / 6,000 ft²
            </div>
          </div>

          <div
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
            data-stagger
            data-stagger-step="100"
          >
            {locations.map((loc, i) => (
              <div
                key={loc.id}
                className="lift-hover bg-surface-0 border border-line-1 p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wide font-medium text-brand">
                    Unit {i + 1}
                  </span>
                  <span className="text-sm text-ink-3">
                    {loc.sqft.toLocaleString("en-IN")} ft²
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-medium text-ink-1">
                  {loc.label}
                </h3>
                <address className="mt-3 not-italic text-base leading-relaxed text-ink-2">
                  {loc.address.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h3
              className="font-display text-xl font-medium text-ink-1"
              data-anim="fade-up"
              data-delay="100"
            >
              Engineering capability
            </h3>
            <p
              className="mt-2 text-base text-ink-2"
              data-anim="fade-up"
              data-delay="200"
            >
              In-house engineering and design using:
            </p>
            <div
              className="mt-6 flex flex-wrap gap-4"
              data-stagger
              data-stagger-step="70"
            >
              {cadTools.map((t) => (
                <div
                  key={t}
                  className="lift-hover group bg-surface-0 border border-line-1 px-6 py-4 hover:border-brand"
                >
                  <span className="text-xs uppercase tracking-wide text-brand">Tool</span>
                  <p className="mt-1 font-display text-lg font-medium text-ink-1 group-hover:text-brand transition-colors">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STANDARDS ─── */}
      <section className="py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-num" data-anim="fade" data-delay="80">
              05 / Standards
            </span>
            <h2
              data-anim="fade-up"
              data-delay="160"
              className="mt-3 font-display text-3xl font-medium tracking-tight2 text-ink-1"
            >
              International standards
            </h2>
            <p
              data-anim="fade-up"
              data-delay="260"
              className="mt-3 text-base text-ink-2"
            >
              Components supplied to the following standard references. Documentation provided on request.
            </p>
          </div>
          <div className="md:col-span-8">
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              data-stagger
              data-stagger-step="60"
            >
              {["ISO", "SAE", "DIN", "JIS"].map((s) => (
                <div
                  key={s}
                  className="lift-hover group bg-surface-1 border border-line-1 p-6 text-center hover:border-brand"
                >
                  <span className="text-xs uppercase tracking-wide text-ink-3">Standard</span>
                  <p className="mt-2 font-display text-3xl font-medium text-ink-1 group-hover:text-brand transition-colors">
                    {s}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10" data-stagger data-stagger-step="80">
              {positioningPoints.map((p, i) => (
                <div
                  key={i}
                  className="group flex gap-4 border-t border-line-1 py-5 transition-colors duration-180 hover:bg-surface-3/40"
                >
                  <span className="num-pop shrink-0 w-8 h-8 flex items-center justify-center bg-brand text-brand-ink text-sm font-medium rounded-full">
                    {i + 1}
                  </span>
                  <p className="text-base leading-relaxed text-ink-2">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
