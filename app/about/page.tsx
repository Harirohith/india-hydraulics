import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTABand";
import { Quality } from "@/components/about/Quality";
import { Facilities } from "@/components/about/Facilities";
import { Engineering } from "@/components/about/Engineering";
import { Standards } from "@/components/about/Standards";
import { company, locations, mission, vision, yearsInBusiness } from "@/lib/content";

const floorArea = locations.reduce((n, l) => n + l.sqft, 0);

export const metadata: Metadata = {
  title: "About",
  description: `Founded in ${company.foundedYear} in Tiruchengode, Tamil Nadu. Two units, ${floorArea.toLocaleString(
    "en-IN"
  )} ft², ISO 9001:2015 certified. Hoses, fittings and assemblies designed, machined, crimped and pressure-tested in-house to ISO, SAE, DIN and JIS standards.`,
};

/**
 * About — the story a buyer reads before trusting a supplier with their
 * machines: who we are → what we promise → how quality is controlled →
 * where it is made → how it is engineered → the standards it is made to →
 * send an enquiry.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        kicker="About India Hydraulics"
        title={<>{yearsInBusiness} years of hydraulics, made in Tiruchengode.</>}
        intro={`Since ${company.foundedYear} we have designed, machined and assembled hydraulic hoses, fittings and seals in Tiruchengode, Tamil Nadu — and supplied them to industry across India and overseas.`}
        facts={[
          { label: "Founded", value: company.foundedYear },
          { label: "Units", value: locations.length },
          { label: "Floor area", value: `${floorArea.toLocaleString("en-IN")} ft²` },
          { label: "ISO certified", value: "9001:2015" },
        ]}
        image="/stock/hero-industrial.jpg"
        imageAlt=""
        imagePosition="50% 55%"
      />

      {/* ─── STORY ─── */}
      <section id="story" aria-labelledby="story-title" className="section bg-paper">
        <div className="container-edge grid gap-x-12 gap-y-10 md:gap-y-14 lg:grid-cols-12">
          <header data-reveal className="lg:col-span-8">
            <p className="t-kicker">Our story</p>
            <h2 id="story-title" className="t-h2 mt-3 text-ink">
              From local bore-well rigs to industry across India.
            </h2>
          </header>

          <div data-reveal className="max-w-[36rem] space-y-6 lg:col-span-6">
            <p className="t-lede text-ink">
              India Hydraulics was founded in {company.foundedYear} in Tiruchengode, Tamil Nadu, to make hydraulic
              hoses and fittings for the industrial belt around the town — bore wells, earth-moving equipment, cement
              and mining.
            </p>
            <p className="leading-relaxed text-ink-2">
              Over {yearsInBusiness} years the range has grown to include hose assemblies, adapters, seals, couplings,
              stainless steel corrugated hoses and ultra-high-pressure hoses, with components specified to ISO, SAE,
              DIN and JIS standards.
            </p>
            <p className="leading-relaxed text-ink-2">
              We have kept our small-industry roots. Design, machining and assembly are still done in-house, while
              we supply major industrial segments across India.
            </p>
          </div>

          <figure data-reveal className="max-w-[646px] lg:col-span-5 lg:col-start-8">
            <Image
              src="/im/factory_pic.jpg"
              alt="The Unit 1 manufacturing building in Tiruchengode: a long blue-clad shed with a roller-shutter bay"
              width={646}
              height={430}
              sizes="(min-width: 1024px) 490px, (min-width: 690px) 646px, 100vw"
              // Keyline: the pale sky would otherwise dissolve into the page.
              className="h-auto w-full border border-rule bg-paper-3"
            />
            <figcaption className="mt-4 grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-t border-ink pt-3">
              <span className="t-label">Unit 1</span>
              <span className="text-sm leading-relaxed text-ink-3">
                Manufacturing building, Sankari Road, Tiruchengode.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section aria-labelledby="principles-title" className="section-sm bg-paper-2">
        <div className="container-edge">
          <h2 id="principles-title" className="sr-only">
            Mission and vision
          </h2>
          <dl data-reveal-group className="border-t border-ink">
            {[
              { label: "Mission", text: mission },
              { label: "Vision", text: vision },
            ].map((row) => (
              <div
                key={row.label}
                className="grid gap-4 border-b border-rule py-10 md:py-14 lg:grid-cols-12 lg:gap-12"
              >
                <dt className="t-kicker lg:col-span-3 lg:pt-2">{row.label}</dt>
                <dd className="t-h3 max-w-[30ch] text-ink lg:col-span-9 lg:t-h2">{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Quality />
      <Facilities />
      <Engineering />
      <Standards />

      <CTABand />
    </>
  );
}
