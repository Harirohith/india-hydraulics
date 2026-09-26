import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { CTABand } from "@/components/CTABand";
import { KeyApplications } from "@/components/industries/KeyApplications";
import { IndustryIndex } from "@/components/industries/IndustryIndex";
import { NotListed } from "@/components/industries/NotListed";
import { industries, standards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries served",
  description: `Hydraulic hoses, fittings and crimped hose assemblies for ${industries.length} industries: ${industries.join(", ")}.`,
};

/**
 * Industries — the buyer's question is "do they understand my kind of
 * machine, and what would I buy from them?"
 *   1. Hero: ten industries, one supplier.
 *   2. Key applications: three machines in photographs, and what each uses.
 *   3. All ten segments: a ruled index linking each to its products.
 *   4. Not listed: every order starts from the duty.
 *   5. CTA: tell us about your machine.
 */
export default function IndustriesPage() {
  // "ISO · SAE ·" / "DIN · JIS" — wraps as balanced pairs in a narrow fact cell.
  const half = Math.ceil(standards.length / 2);
  const standardsValue = (
    <>
      <span className="whitespace-nowrap">{standards.slice(0, half).join(" · ")} ·</span>{" "}
      <span className="whitespace-nowrap">{standards.slice(half).join(" · ")}</span>
    </>
  );

  return (
    <>
      <PageHero
        crumb="Industries"
        kicker="Industries served"
        title="Hoses, fittings and assemblies for ten industries."
        intro="From earth-moving equipment to defence vehicles, we supply the hose, fittings and crimped assemblies each machine needs, built to its duty. Every assembly is pressure-tested before despatch."
        facts={[
          { label: "Industries served", value: String(industries.length) },
          { label: "Assemblies rated to", value: "10,000 psi" },
          { label: "Standards", value: standardsValue },
          { label: "Supply", value: "India & export" },
        ]}
        image="/stock/hydraulic-cylinder.jpg"
        imageAlt="A hydraulic cylinder mounted on a machine frame, its polished rod extended"
        imagePosition="50% 55%"
      >
        <a href="#segments" className="btn btn-outline">
          Find your industry <span className="arrow" aria-hidden="true">→</span>
        </a>
      </PageHero>

      <KeyApplications />

      <section id="segments" aria-labelledby="segments-title" className="section bg-paper-2">
        <div className="container-edge">
          <SectionHead
            id="segments-title"
            kicker="All ten segments"
            title="Ten industries and the products they use."
            intro="Find your industry, see what we supply for it, and go straight to those products in the catalogue."
          />
          <IndustryIndex />
          <NotListed />
        </div>
      </section>

      <CTABand
        title="Tell us about your machine."
        body="Send a drawing, sample or part number, and the duty if you know it. We confirm the specification with you and reply within one working day."
      />
    </>
  );
}
