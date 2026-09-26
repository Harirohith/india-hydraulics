import Image from "next/image";
import { SectionHead } from "@/components/SectionHead";
import { CountUp } from "@/components/motion/CountUp";
import { locations } from "@/lib/content";

/**
 * About → Facilities. The two units side by side like two columns of a data
 * sheet: role, floor area (counts once — it is the proof of size), the
 * company's own photograph, the work done there and the address.
 *
 * The photos are low-res originals (~650px): never shown wider than that.
 */
type UnitId = (typeof locations)[number]["id"];

const UNIT: Record<
  UnitId,
  { work: string; caption: string; photo: { src: string; alt: string; well?: boolean } }
> = {
  primary: {
    work: "CNC machining of fittings and adapters",
    caption: "CNC shop floor. Fittings are turned in-house, on our own machines.",
    photo: {
      src: "/im/lmw_tuning.jpg",
      alt: "CNC lathes on the India Hydraulics shop floor, with an operator at a machine",
    },
  },
  secondary: {
    work: "Hose cutting, crimping and pressure testing",
    caption: "Hydrostatic test bench. Every assembly is tested before despatch.",
    photo: {
      src: "/im/Pressure_testing machine.jpg",
      alt: "Hydrostatic pressure-test bench with gauges, valves and a closed test chamber",
      well: true,
    },
  },
};

const mapUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export function Facilities() {
  const total = locations.reduce((n, l) => n + l.sqft, 0);

  return (
    <section id="facilities" aria-labelledby="facilities-title" className="section bg-paper">
      <div className="container-edge">
        <SectionHead
          id="facilities-title"
          kicker="Facilities"
          title="Where it is made."
          intro={
            <>
              Two units in Tiruchengode, {total.toLocaleString("en-IN")}&nbsp;ft² in all. Fittings are machined,
              hoses are crimped and every assembly is pressure-tested here before it leaves.
            </>
          }
        />

        <div data-reveal-group className="grid border-t border-ink lg:grid-cols-2">
          {locations.map((loc, i) => {
            const [unit, role] = loc.label.split(" — ");
            const u = UNIT[loc.id];
            return (
              <article
                key={loc.id}
                aria-labelledby={`unit-${loc.id}`}
                className={
                  i === 0
                    ? "pt-6 md:pt-8 lg:pr-12"
                    : "mt-16 border-t border-ink pt-6 md:pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:border-rule lg:pl-12"
                }
              >
                <p className="t-label">{unit}</p>
                <h3 id={`unit-${loc.id}`} className="t-h3 mt-3 text-ink">
                  {role}
                </h3>

                <p className="mt-8 flex items-baseline gap-3 font-display font-semibold leading-[0.8] text-ink">
                  <CountUp value={loc.sqft} className="text-[clamp(4.5rem,3rem+5vw,7.5rem)]" />
                  <span className="text-3xl text-ink-3">ft²</span>
                  <span className="sr-only">floor area</span>
                </p>

                <figure className="mt-10 max-w-[650px]">
                  <div
                    className={`relative aspect-[3/2] overflow-hidden ${u.photo.well ? "photo-well" : "bg-paper-3"}`}
                  >
                    <Image
                      src={u.photo.src}
                      alt={u.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 560px, (min-width: 690px) 650px, 100vw"
                      // The bench photo has a thin grey frame baked in: crop it off.
                      className={`object-cover ${u.photo.well ? "scale-[1.035]" : ""}`}
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-3">{u.caption}</figcaption>
                </figure>

                <dl className="spec-table mt-8 [&_.spec-row]:sm:grid-cols-[7.5rem_1fr]">
                  <div className="spec-row">
                    <dt>Work</dt>
                    <dd>{u.work}</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Address</dt>
                    <dd>
                      <address className="not-italic">
                        {loc.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </dd>
                  </div>
                </dl>
                <a
                  href={mapUrl(loc.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-6"
                >
                  Directions to {unit}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
