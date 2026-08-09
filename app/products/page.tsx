import Link from "next/link";
import Image from "next/image";
import { productCategories, company } from "@/lib/content";
import { catalogue, hsnCodes, catalogueStats } from "@/lib/products";
import { ISOBadge } from "@/components/ISOBadge";
import { ProductSearch } from "@/components/ProductSearch";

const categoryImages: Record<string, string> = {
  hoses:                  "/im/Hydraulic_hose.jpg",
  // front_page_1 shows a drilling rig — UHP hoses are the primary fluid circuit in borewell rigs
  assemblies:             "/products/assy-hose-assembly.png",
  fittings:               "/im/Hose_fittings.jpg",
  seals:                  "/im/orings.jpg",
  couplings:              "/im/couplings.jpg",
  "air-water-gas":        "/products/cement-hose-assembly.png",
  "stainless-corrugated": "/stock/factory-pipes.jpg",
  uhp:                    "/im/front_page_1.jpg",
  general:                "/products/hose-guard-20mm-safety.png",
};

export const metadata = {
  title: "Products",
  description:
    "Hydraulic hoses, hose assemblies, fittings, adapters, seals, couplings, stainless steel corrugated hoses and ultra-high-pressure hoses. ISO, SAE, DIN, JIS.",
};

export default function ProductsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-20 md:py-32 flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/stock/machinery-valves.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-950/75" />
        </div>
        <div className="container-edge relative z-10">
          <div
            className="flex flex-wrap items-center gap-3 mb-5"
            data-anim="fade-up"
            data-delay="80"
          >
            <span className="inline-block bg-white/10 border border-white/25 text-white px-3 py-1 text-sm font-medium">
              Product catalogue
            </span>
            <ISOBadge />
          </div>
          <h1
            data-anim="fade-up"
            data-delay="180"
            className="max-w-3xl font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight3 text-white leading-[1.1]"
          >
            Multiple product categories. One standard of build.
          </h1>
          <p
            data-anim="fade-up"
            data-delay="300"
            className="mt-5 max-w-[58ch] text-base md:text-lg leading-relaxed text-white/75"
          >
            Every category below is stocked or made-to-order. Final spec depends on duty, medium and standard reference.
          </p>
        </div>
      </section>

      {/* ─── TOC ─── */}
      <section className="border-b border-line-1 bg-surface-0">
        <div className="container-edge py-5">
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
            data-stagger
            data-stagger-step="40"
          >
            {productCategories.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="ram text-ink-2 hover:text-brand font-medium"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── CATEGORIES WITH IMAGES ─── */}
      {productCategories.map((cat, i) => {
        const isOdd = i % 2 === 1;
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-16 md:py-24 ${isOdd ? "bg-surface-1" : "bg-surface-0"}`}
          >
            <div className="container-edge">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 items-center">
                {/* Image */}
                <div
                  className={`md:col-span-4 ${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                  data-anim={i % 2 === 0 ? "slide-left" : "slide-right"}
                >
                  <div className="relative aspect-square w-full bg-surface-2 border border-line-1 overflow-hidden group">
                    <Image
                      src={categoryImages[cat.id] || "/products/connectors.jpg"}
                      alt={cat.label}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 font-mono text-[10px] tracking-label uppercase text-ink-3 bg-surface-0/90 px-2 py-1 border border-line-1">
                      {cat.code}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`md:col-span-8 ${i % 2 === 0 ? "md:order-2" : "md:order-1"}`}
                  data-stagger
                  data-stagger-step="70"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-xs uppercase tracking-wide font-medium text-brand">
                      {cat.code}
                    </span>
                    <span className="text-xs text-ink-3 font-mono tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(productCategories.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-ink-1">
                    {cat.label}
                  </h2>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-ink-2 max-w-[54ch]">
                    {cat.description}
                  </p>

                  <dl className="mt-6">
                    {cat.specs.map(([label, value]) => (
                      <div key={label} className="spec-row">
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── PRODUCT CATALOGUE GRID — Search + Filter (Features 5 & 8) ─── */}
      <section id="catalogue" className="py-20 md:py-28 bg-surface-0">
        <div className="container-edge">
          <span className="section-num" data-anim="fade" data-delay="80">
            Reference / Full catalogue
          </span>
          <h2
            data-anim="fade-up"
            data-delay="180"
            className="mt-3 font-display text-3xl md:text-4xl font-medium text-ink-1"
          >
            Full product range
          </h2>
          <p
            data-anim="fade-up"
            data-delay="280"
            className="mt-3 text-base md:text-lg text-ink-2 mb-12"
          >
            {catalogueStats.totalProducts} products across {catalogueStats.totalCategories} categories.
            Search or filter below — click <span className="text-brand font-medium">Request quote</span> on any product to start an enquiry.
          </p>

          <ProductSearch />
        </div>
      </section>

      {/* ─── HSN CODES ─── */}
      <section className="bg-surface-1 py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="section-num" data-anim="fade" data-delay="80">
              Reference / HSN
            </span>
            <h2
              data-anim="fade-up"
              data-delay="160"
              className="mt-3 font-display text-2xl font-medium text-ink-1"
            >
              HSN codes
            </h2>
            <p
              data-anim="fade-up"
              data-delay="260"
              className="mt-3 text-base text-ink-2"
            >
              Harmonised System codes for customs, GST and procurement.
            </p>
          </div>
          <div className="md:col-span-8">
            <dl data-stagger data-stagger-step="60">
              {hsnCodes.map((h) => (
                <div key={h.code} className="spec-row">
                  <dt className="font-mono tabular-nums">{h.code}</dt>
                  <dd>{h.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
