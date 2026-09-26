import Image from "next/image";
import Link from "next/link";
import { cadTools, locations, standards } from "@/lib/content";

const [unit1, unit2] = locations;
const split = (label: string) => label.split(" — ");

const rows = [
  { k: split(unit1.label)[0], v: `${split(unit1.label)[1]} · ${unit1.sqft.toLocaleString("en-IN")} ft²` },
  { k: split(unit2.label)[0], v: `${split(unit2.label)[1]} · ${unit2.sqft.toLocaleString("en-IN")} ft²` },
  { k: "CAD / CAM", v: cadTools.join(" · ") },
  { k: "Standards", v: standards.join(" · ") },
];

/**
 * The real place: the company's own shop floor and building. These photos
 * are low resolution, so they are never shown wider than ~600px.
 */
export function Works() {
  return (
    <section aria-labelledby="works-title" className="section bg-paper-2">
      <div className="container-edge grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-6 xl:col-span-5">
          <p className="t-kicker">Made in Tiruchengode</p>
          <h2 id="works-title" className="t-h2 mt-3 text-ink">
            We machine our own fittings.
          </h2>
          <p className="t-lede mt-6">
            Fittings are designed in SolidWorks 3D CAD, programmed in EdgeCAM and turned on our own CNC machines.
            Unit 1 handles manufacturing; Unit 2 builds the hose assemblies. Both are in Tiruchengode.
          </p>

          {/* Short keys here, so the key column is narrowed from sm to keep each value on one line. */}
          <dl className="spec-table mt-10 sm:[&_.spec-row]:grid-cols-[6.5rem_1fr]">
            {rows.map((r) => (
              <div key={r.k} className="spec-row">
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>

          <Link href="/about" className="link-arrow mt-10">
            About India Hydraulics <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <figure className="max-w-[40rem]">
            <div className="relative aspect-[3/2] overflow-hidden bg-paper-3">
              <Image
                src="/im/lmw_tuning.jpg"
                alt="CNC turning centres on the India Hydraulics shop floor, with an operator loading a machine"
                fill
                sizes="(min-width: 1024px) 594px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-3">CNC turning — fittings are machined in-house</figcaption>
          </figure>

          <div className="mt-8 grid max-w-[40rem] grid-cols-2 gap-4 sm:gap-6">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-paper-3">
                <Image
                  src="/im/factory_pic.jpg"
                  alt="The Unit 1 manufacturing building in Tiruchengode"
                  fill
                  sizes="(min-width: 1024px) 290px, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-3">
                {unit1.label}, {unit1.sqft.toLocaleString("en-IN")} ft²
              </figcaption>
            </figure>
            <figure>
              {/* The source photo has a thin grey frame: the inset box trims it off. */}
              <div className="photo-well relative aspect-[3/2]">
                <div className="absolute -inset-[4%]">
                  <Image
                    src="/im/Pressure_testing machine.jpg"
                    alt="Hydrostatic test bench with pressure gauges and a closed test chamber"
                    fill
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-sm text-ink-3">Hydrostatic test bench</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
