import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/content";

export const metadata = {
  title: "Industries served",
  description:
    "Construction machinery, cement, water well drilling rigs, injection moulding, paper industry, machine tools, surface & underground mining, defence, oil & gas, automobile.",
};

// ── Enhanced industries with icons + linked product categories ──────────────
const industries = [
  {
    label: "Construction machinery",
    icon: "🏗️",
    desc: "Hydraulic hoses and fittings for excavators, cranes, bulldozers and earth-moving equipment.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
  {
    label: "Cement",
    icon: "🏭",
    desc: "Heavy-duty assemblies for cement plant conveyors, mixers and slurry pump circuits.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    label: "Water well drilling rigs",
    icon: "💧",
    desc: "High-pressure hose assemblies for borewell and water well rig circuits rated to 10,000 psi.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
  {
    label: "Injection moulding",
    icon: "⚙️",
    desc: "Precision hydraulic lines for injection moulding press circuits and temperature control systems.",
    products: [
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Seals & O-rings", href: "/products#seals" },
      { label: "Straight adapters", href: "/products#straight-adapter" },
    ],
  },
  {
    label: "Paper industry",
    icon: "📄",
    desc: "Chemical-resistant hoses and stainless steel corrugated lines for paper mill hydraulic systems.",
    products: [
      { label: "Stainless steel corrugated hoses", href: "/products#stainless-corrugated" },
      { label: "General purpose hoses", href: "/products#general" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    label: "Machine tools",
    icon: "🔧",
    desc: "Precision fittings and fluid lines for CNC machines, lathes and industrial plant equipment.",
    products: [
      { label: "Fittings & adapters", href: "/products#fittings" },
      { label: "Hydraulic hoses", href: "/products#hoses" },
      { label: "Hose assemblies", href: "/products#assemblies" },
    ],
  },
  {
    label: "Surface & underground mining",
    icon: "⛏️",
    desc: "Ultra-high-pressure assemblies for rock breakers, drill rigs and mining equipment hydraulic circuits.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
    ],
  },
  {
    label: "Defence",
    icon: "🛡️",
    desc: "High-specification hydraulic lines for defence vehicle systems and military equipment.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Fittings & adapters", href: "/products#fittings" },
      { label: "Seals & O-rings", href: "/products#seals" },
    ],
  },
  {
    label: "Oil & gas",
    icon: "🛢️",
    desc: "Flame-resistant, stainless and high-pressure assemblies for upstream, midstream and downstream oil & gas operations.",
    products: [
      { label: "Ultra-high-pressure hoses", href: "/products#uhp" },
      { label: "Stainless steel corrugated hoses", href: "/products#stainless-corrugated" },
      { label: "Couplings & quick-release", href: "/products#couplings" },
    ],
  },
  {
    label: "Automobile",
    icon: "🚗",
    desc: "OEM and aftermarket hydraulic assemblies for automotive manufacturing and repair systems.",
    products: [
      { label: "Hose assemblies", href: "/products#assemblies" },
      { label: "Air, water & gas hoses", href: "/products#air-water-gas" },
      { label: "Fittings & adapters", href: "/products#fittings" },
    ],
  },
];

// Three key industries shown as visual image cards
const featured = [
  {
    label: "Water well drilling rigs",
    desc: "High-pressure hose assemblies for borewell and water well rig circuits.",
    src: "/im/Borewell_truck.jpg",
  },
  {
    label: "Construction machinery",
    desc: "Hoses and fittings for excavators, cranes and earth-moving equipment.",
    src: "/stock/excavator-hydraulic.jpg",
  },
  {
    label: "Machine tools & manufacturing",
    desc: "Precision fittings and fluid lines for CNC machines and industrial plant.",
    src: "/im/lmw_tuning.jpg",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[55dvh] flex flex-col justify-end">
        <div className="absolute inset-0">
          <Image
            src="/im/Borewell_truck.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/55 to-gray-950/30" />
        </div>
        <div className="relative z-10 container-edge pb-12 pt-28">
          <span
            className="inline-block bg-white/10 border border-white/25 text-white px-3 py-1 text-xs font-medium mb-4"
            data-anim="fade-up"
            data-delay="80"
          >
            Industries
          </span>
          <h1
            data-anim="fade-up"
            data-delay="180"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-[1.1]"
          >
            Ten segments. One supply partner.
          </h1>
          <p
            data-anim="fade-up"
            data-delay="320"
            className="mt-4 max-w-[52ch] text-base text-white/70"
          >
            Hydraulic hoses, fittings and assemblies regularly supplied to the
            industries below — from earth-moving equipment to defence.
          </p>
        </div>
      </section>

      {/* ─── FEATURED INDUSTRIES ─── */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="80">
            01 / Applications
          </span>
          <h2
            data-anim="fade-up"
            data-delay="160"
            className="mt-3 font-display text-2xl font-medium text-ink-1 mb-8"
          >
            Key applications
          </h2>
          <div
            className="grid grid-cols-1 gap-0 sm:grid-cols-3"
            data-stagger
            data-stagger-step="90"
          >
            {featured.map((item) => (
              <div
                key={item.label}
                className="group relative overflow-hidden lift-hover"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/25 to-transparent transition-opacity duration-220 group-hover:from-gray-950/95" />
                  <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-220 group-hover:-translate-y-1">
                    <h3 className="font-display text-base font-semibold text-white leading-snug">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      {item.desc}
                    </p>
                    <Link
                      href="/products"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-220"
                    >
                      View products <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENHANCED INDUSTRIES DIRECTORY (Feature 10) ─── */}
      <section className="bg-surface-1 py-14 md:py-20">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="80">
            02 / Directory
          </span>
          <h2
            data-anim="fade-up"
            data-delay="160"
            className="mt-3 font-display text-2xl font-medium text-ink-1 mb-3"
          >
            All segments supplied
          </h2>
          <p
            data-anim="fade-up"
            data-delay="240"
            className="mb-10 text-base text-ink-2 max-w-[56ch]"
          >
            Click any industry card to see which products we supply for that segment.
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-stagger
            data-stagger-step="50"
          >
            {industries.map((ind, i) => (
              <div
                key={ind.label}
                className="group bg-surface-0 border border-line-1 p-6 hover:border-brand transition-colors duration-180 relative overflow-hidden"
              >
                {/* Left accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-220"
                />

                {/* Header row */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl leading-none mt-0.5" aria-hidden="true">
                    {ind.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-brand/70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-base font-medium text-ink-1 group-hover:text-brand transition-colors">
                        {ind.label}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                {/* Product cross-links */}
                <div className="mt-4 pt-4 border-t border-line-1">
                  <p className="text-[10px] uppercase tracking-wider font-mono text-ink-3 mb-2">
                    Products used
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {ind.products.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-brand border border-brand/30 px-2.5 py-1 hover:bg-brand hover:text-white hover:border-brand transition-colors duration-180"
                        >
                          {p.label}
                          <span aria-hidden="true" className="text-[10px]">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUPPLY NOTE ─── */}
      <section className="py-14 md:py-20">
        <div className="container-edge max-w-3xl">
          <span className="section-num" data-anim="fade" data-delay="80">
            03 / Spec
          </span>
          <h2
            data-anim="fade-up"
            data-delay="180"
            className="mt-3 font-display text-2xl md:text-3xl font-medium text-ink-1"
          >
            Every segment has its own spec.
          </h2>
          <p
            data-anim="fade-up"
            data-delay="280"
            className="mt-4 text-base md:text-lg leading-relaxed text-ink-2"
          >
            A borewell rig hose assembly and a defence vehicle hydraulic line
            share a category but not a build. We supply to both — because
            every order starts from the duty, not the catalogue.
          </p>
          <p
            data-anim="fade-up"
            data-delay="380"
            className="mt-4 text-base leading-relaxed text-ink-2"
          >
            If your segment isn&apos;t listed but the work is hydraulic, call
            us. We&apos;ll tell you straight whether it&apos;s a build we can take.
          </p>
          <div data-anim="fade-up" data-delay="480" className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary press">
              Contact us <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products" className="btn-ghost press">
              Browse products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
