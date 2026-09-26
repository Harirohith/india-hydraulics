import { SectionHead } from "@/components/SectionHead";
import { ISOBadge } from "@/components/ISOBadge";
import { PressureGauge } from "@/components/motion/PressureGauge";

/**
 * About → Quality. The ISO 9001:2015 process as the order moves through the
 * works, then the proof: the hydrostatic test every assembly goes through.
 * Rows arrive in process order; the gauge needle climbs and the QC stamp lands.
 */
const PROCESS = [
  {
    title: "Order review",
    body: "Customer requirements are documented at the order stage.",
  },
  {
    title: "In-process checks",
    body: "Quality checks during fabrication and again at assembly.",
  },
  {
    title: "Pressure test",
    body: "Every assembly is hydrostatically pressure-tested before despatch.",
  },
  {
    title: "Traceability",
    body: "Records are kept for the materials used and for each build.",
  },
  {
    title: "Continual improvement",
    body: "Corrective and preventive actions are logged.",
  },
] as const;

export function Quality() {
  return (
    <section id="quality" aria-labelledby="quality-title" className="section bg-carbon text-fog">
      <div className="container-edge">
        <SectionHead
          tone="dark"
          id="quality-title"
          kicker="Quality and testing"
          title="Every order documented. Every assembly tested."
          intro={
            <>
              Our quality management system is certified to ISO&nbsp;9001:2015. Documentation, traceability and
              corrective-action records are kept at every stage of the build.
            </>
          }
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* The certificate mark heads the process it certifies */}
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pb-5">
              <p className="t-label !text-fog-2">The quality process, order to despatch</p>
              <div className="max-sm:order-first">
                <ISOBadge size="lg" tone="dark" />
              </div>
            </div>
            <ol data-reveal-group className="border-t border-fog">
              {PROCESS.map((step, i) => (
                <li
                  key={step.title}
                  // Number | title + text below; from xl the text gets its own column.
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-carbon-3 py-6 md:grid-cols-[3.5rem_1fr] md:py-7 xl:grid-cols-[3.5rem_13rem_1fr] xl:gap-x-6"
                >
                  <span className="pt-1.5 font-mono text-sm font-medium text-fog-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{step.title}</h3>
                  <p className="col-start-2 mt-1.5 leading-relaxed text-fog-2 xl:col-start-3 xl:mt-0 xl:pt-0.5">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <figure className="lg:col-span-5">
            <PressureGauge tone="dark" label="Maximum rated working pressure" />
            <figcaption className="mt-10">
              <dl className="spec-table spec-table--dark [&_.spec-row]:sm:grid-cols-[7.5rem_1fr]">
                <div className="spec-row">
                  <dt>Method</dt>
                  <dd>Hydrostatic pressure test</dd>
                </div>
                <div className="spec-row">
                  <dt>Applied to</dt>
                  <dd>Every assembly, before despatch</dd>
                </div>
              </dl>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
