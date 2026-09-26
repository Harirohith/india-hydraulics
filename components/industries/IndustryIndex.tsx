import { industryDetails } from "@/lib/content";
import { ProductLinks } from "./ProductLinks";

/**
 * All ten segments as a ruled index: number, name, what we supply, and the
 * products used. Each row carries the segment id, so /industries#cement
 * lands on (and marks) that row.
 *
 *   phone   number | name, description, products (stacked)
 *   tablet  number | name, description | products
 *   desktop 12 columns — number 1 · name 3 · description 4 · products 4
 */
export function IndustryIndex() {
  return (
    <div>
      {/* Column heads (desktop). Rows carry their own labels for small screens and screen readers. */}
      <div aria-hidden="true" className="hidden border-b border-ink pb-3 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <span className="t-label">No.</span>
        <span className="t-label lg:col-span-3">Industry</span>
        <span className="t-label lg:col-span-4">What we supply</span>
        <span className="t-label lg:col-span-4">Products used</span>
      </div>

      <ol className="border-t border-ink lg:border-t-0">
        {industryDetails.map((industry, i) => (
          <li
            key={industry.id}
            id={industry.id}
            className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-rule py-8 before:absolute before:inset-y-8 before:-left-4 before:w-[3px] before:bg-brand before:opacity-0 target:before:opacity-100 md:grid-cols-[2.5rem_minmax(0,1fr)_16rem] md:grid-rows-[auto_1fr] md:gap-x-6 lg:grid-cols-12 lg:grid-rows-none lg:gap-x-12 lg:before:-left-6 [&:target_h3]:text-brand"
          >
            <span className="font-mono text-sm font-semibold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="t-h3 text-ink lg:col-span-3">{industry.label}</h3>
            <p className="col-start-2 mt-2 max-w-[60ch] text-ink-2 md:row-start-2 lg:col-span-4 lg:col-start-auto lg:row-start-auto lg:mt-0">
              {industry.desc}
            </p>
            <div className="col-start-2 mt-4 md:col-start-3 md:row-span-2 md:row-start-1 md:mt-0 lg:col-span-4 lg:col-start-auto lg:row-span-1 lg:row-start-auto">
              <p className="t-label lg:sr-only">Products used</p>
              <ProductLinks products={industry.products} className="mt-1 lg:mt-0" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
