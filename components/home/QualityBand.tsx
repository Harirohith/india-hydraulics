import { ISOBadge } from "@/components/ISOBadge";
import { PressureGauge } from "@/components/motion/PressureGauge";

// The ISO 9001:2015 process, in the order an assembly meets it.
const checks = [
  { stage: "Order", text: "Customer requirements documented at order stage." },
  { stage: "Build", text: "In-process checks at fabrication and assembly." },
  { stage: "Test", text: "Hydrostatic pressure test on every assembly." },
  { stage: "Records", text: "Traceability records for materials and builds." },
];

/**
 * Why the quality can be trusted: the checks every order passes, and the
 * test-bench gauge that climbs to rated pressure before the QC stamp lands.
 */
export function QualityBand() {
  return (
    <section aria-labelledby="quality-title" className="section bg-carbon text-white">
      <div className="container-edge grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-7">
          <p className="t-kicker text-fog-2">Quality and testing</p>
          <h2 id="quality-title" className="t-h2 mt-3 max-w-[7.4em] text-white">
            Every assembly is <span className="whitespace-nowrap">pressure-tested</span> before it ships.
          </h2>
          <p className="mt-6 max-w-[37rem] text-lg leading-relaxed text-fog-2">
            The hydrostatic test is one step in an ISO 9001:2015 quality system that follows each order from the
            first drawing to despatch.
          </p>

          <dl className="spec-table spec-table--dark mt-10 sm:[&_.spec-row]:grid-cols-[6.5rem_1fr]">
            {checks.map((c) => (
              <div key={c.stage} className="spec-row">
                <dt>{c.stage}</dt>
                <dd>{c.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <ISOBadge size="lg" tone="dark" />
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
          <PressureGauge tone="dark" label="Maximum rated working pressure" />
        </div>
      </div>
    </section>
  );
}
