import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { industryDetails } from "@/lib/content";

/**
 * Who it is for: a typographic index of the ten industries supplied, set
 * like the index of a printed catalogue — read down the first column, then
 * the second. Each entry opens that industry on the industries page.
 */
export function IndustryIndex() {
  return (
    <section aria-labelledby="industries-title" className="section bg-paper">
      <div className="container-edge">
        <SectionHead
          id="industries-title"
          kicker="Industries"
          title="From borewell rigs to paper mills."
          intro="Hose assemblies, fittings and seals for ten industries — each with its own pressures, media and working temperatures."
          action={
            <Link href="/industries" className="link-arrow">
              All industries <span className="arrow" aria-hidden="true">→</span>
            </Link>
          }
        />

        <ol
          data-reveal-group
          className="border-t border-ink md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-x-12 lg:gap-x-16"
        >
          {industryDetails.map((ind, i) => (
            <li key={ind.id} className="border-b border-rule">
              <Link
                href={`/industries#${ind.id}`}
                className="group grid h-full grid-cols-[2.75rem_1fr] py-5 md:py-6"
              >
                <span className="pt-2 font-mono text-sm font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="t-h3 text-ink transition-colors duration-200 group-hover:text-brand">
                    {ind.label}
                    <span
                      aria-hidden="true"
                      className="ml-2.5 inline-block text-[0.75em] text-ink-3 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
                    >
                      →
                    </span>
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-ink-2">{ind.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
