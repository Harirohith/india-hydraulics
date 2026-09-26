import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content";
import { catalogueStats, hsnCodes } from "@/lib/products";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { CTABand } from "@/components/CTABand";
import { ProductSearch } from "@/components/ProductSearch";
import { FamilyIndex } from "@/components/products/FamilyIndex";
import { FamilyRows } from "@/components/products/FamilyRows";
import { families, familyRows } from "@/components/products/families";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Hydraulic hoses, crimped hose assemblies, fittings and adapters, seals, couplings, stainless steel corrugated and ultra-high-pressure hoses — specifications, full catalogue and HSN codes.",
};

/*
 * Story: a buyer arrives knowing roughly what they need.
 *   1. What we make, and how to ask (hero)
 *   2. The nine families at a glance (contents / sticky family bar)
 *   3. Each family's specification, set as catalogue sheets
 *   4. Every listed item, searchable, each with its own quote link
 *   5. HSN codes for the purchase team
 *   6. Ask for a price
 */

const WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];
const spelled = (n: number) => WORDS[n] ?? String(n);

// All four listed HSN codes share the same heading; state it once.
const hsnParts = hsnCodes.map((h) => {
  const [head, ...rest] = h.description.split(" — ");
  return { code: h.code, head, detail: rest.join(" — ") };
});
const hsnHead = hsnParts.every((p) => p.detail && p.head === hsnParts[0].head) ? hsnParts[0].head : null;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        kicker="Product catalogue"
        title="Hoses, fittings and assemblies, built to your drawing."
        intro={`${spelled(families.length)} product families, stocked or made to order. The final specification depends on the duty, the medium and the standard you work to.`}
        image="/stock/hydraulic-tubes.jpg"
        imageAlt="Braided and corrugated hoses and metal tubes on an engine"
        imagePosition="50% 85%"
        facts={[
          { label: "Product families", value: families.length },
          { label: "Catalogue items", value: catalogueStats.totalProducts },
          { label: "Rated up to", value: "10,000 psi" },
          {
            label: "Standards",
            // Breaks as a pair of pairs until the column is wide enough for one line.
            value: (
              <>
                <span className="whitespace-nowrap">ISO · SAE</span>
                <span className="hidden xl:inline"> · </span>
                <br className="xl:hidden" />
                <span className="whitespace-nowrap">DIN · JIS</span>
              </>
            ),
          },
        ]}
      >
        <Link href="/contact#enquiry" className="btn btn-primary max-sm:w-full">
          Request a quote{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline max-sm:w-full">
          Message on WhatsApp
        </a>
      </PageHero>

      {/* Families — the contents bar sticks (desktop) while these scroll past */}
      <div>
        <FamilyIndex
          entries={families.map((f) => ({ id: f.id, code: f.code, label: f.label, short: f.short }))}
          catalogueCount={catalogueStats.totalProducts}
        />
        <FamilyRows rows={familyRows} />
      </div>

      {/* Full catalogue */}
      {/* Negative scroll margin: a jump here clears the family bar out from under the header */}
      <section id="catalogue" aria-labelledby="catalogue-title" className="section -scroll-mt-4 bg-paper">
        <div className="container-edge">
          <SectionHead
            id="catalogue-title"
            kicker="Full catalogue"
            title="Every listed item, with a quote link."
            intro="Search by name, thread or type, or filter by group. Each quote link names the part on the enquiry form, so we know exactly what you are asking about."
          />
          <ProductSearch />
        </div>
      </section>

      {/* HSN codes */}
      <section id="hsn" aria-labelledby="hsn-title" className="section-sm border-t border-rule bg-paper-2">
        <div className="container-edge grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="t-kicker">For purchase and accounts teams</p>
            <h2 id="hsn-title" className="t-h2 mt-3 text-ink">
              HSN codes
            </h2>
            <p className="mt-5 max-w-[44ch] text-ink-2">
              The codes our hoses are listed under, for purchase orders and GST invoices. If you are not sure which one
              applies to your item, ask us when you order.
            </p>
          </div>
          <div data-reveal className="lg:col-span-7">
            {hsnHead && <p className="mb-4 text-ink-2">{hsnHead}:</p>}
            <dl className="spec-table sm:[&_.spec-row]:grid-cols-[8.5rem_minmax(0,1fr)]">
              {hsnParts.map((h) => (
                <div key={h.code} className="spec-row">
                  <dt className="!pt-0 !text-base !font-medium !tracking-[0.04em] !text-ink">{h.code}</dt>
                  <dd className="!font-normal first-letter:uppercase">
                    {hsnHead ? h.detail : hsnCodes.find((c) => c.code === h.code)?.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTABand
        title="Found what you need? Ask for a price."
        body="Send the item name, part number, drawing or sample, with the duty — pressure, medium, temperature, end fittings — and the quantity. We confirm the specification with you and reply within one working day."
      />
    </>
  );
}
