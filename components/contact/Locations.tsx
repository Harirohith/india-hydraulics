import Image from "next/image";
import { company, locations } from "@/lib/content";

type UnitId = (typeof locations)[number]["id"];
type Geo = { lat: string; lng: string };

/** Verified pin for each unit — the same points the map embeds use. */
const GEO: Record<UnitId, Geo> = {
  primary: { lat: "11.395301", lng: "77.886245" },
  secondary: { lat: "11.3972139", lng: "77.8763012" },
};

const embedUrl = ({ lat, lng }: Geo) => `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
const mapsUrl = ({ lat, lng }: Geo) => `https://www.google.com/maps?q=${lat},${lng}`;
const totalArea = locations.reduce((sum, loc) => sum + loc.sqft, 0);

const coord = (v: string, pos: string, neg: string) => {
  const n = Number(v);
  return `${Math.abs(n).toFixed(5)}° ${n >= 0 ? pos : neg}`;
};

/**
 * Where the two units are: a short note on visiting, the Unit 1 building as
 * the visitor will see it, then each unit's address with its map.
 */
export function Locations() {
  return (
    <section id="locations" aria-labelledby="locations-title" className="section bg-paper">
      <div className="container-edge">
        <div data-reveal-group className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
            <p className="t-kicker">Locations</p>
            <h2 id="locations-title" className="t-h2 mt-3 text-ink">
              Two units in Tiruchengode.
            </h2>
            <p className="t-lede mt-6 max-w-[48ch]">
              Manufacturing at Unit 1 and hose assemblies at Unit 2 —{" "}
              {totalArea.toLocaleString("en-IN")}&nbsp;ft² in all. Visitors by appointment.
            </p>
            <div className="mt-8">
              <a href={company.phoneHref} className="link-arrow">
                Call to arrange a visit <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="md:col-span-5">
            <div className="relative aspect-[2/1] overflow-hidden border border-rule bg-paper-3">
              <Image
                src="/im/factory_pic.jpg"
                alt="The Unit 1 manufacturing building in Tiruchengode: a long blue-clad industrial shed with a roller-shutter entrance on the right."
                fill
                sizes="(min-width: 1320px) 480px, (min-width: 768px) 38vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 85%" }}
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-3">Unit 1 — Manufacturing, Tiruchengode.</figcaption>
          </figure>
        </div>

        <div className="rule-grid mt-14 md:mt-20 md:grid-cols-2">
          {locations.map((loc) => {
            const geo = GEO[loc.id];
            const [unit, role] = loc.label.split(" — ");
            return (
              <article key={loc.id} className="flex min-w-0 flex-col bg-paper">
                <div className="px-5 pb-8 pt-6 sm:px-8 sm:pt-7">
                  <div className="flex items-baseline justify-between gap-4" aria-hidden="true">
                    <p className="t-label">{unit}</p>
                    <p className="font-mono text-sm text-ink-3">{loc.sqft.toLocaleString("en-IN")} ft²</p>
                  </div>
                  <h3 className="t-h3 mt-4 text-ink">
                    <span className="sr-only">{unit} — </span>
                    {role ?? loc.label}
                    <span className="sr-only">, {loc.sqft.toLocaleString("en-IN")} square feet</span>
                  </h3>
                  <address className="mt-4 not-italic leading-relaxed text-ink-2">
                    {loc.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="relative mt-auto aspect-[4/3] overflow-hidden border-y border-rule bg-paper-3 sm:aspect-[16/10]">
                  {/* Shown until the map arrives (or if it cannot load) */}
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                    <div className="flex flex-col items-center">
                      <span className="relative block h-7 w-7">
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink-3" />
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink-3" />
                      </span>
                      <span className="t-label mt-4">Map · {unit}</span>
                    </div>
                  </div>
                  <iframe
                    title={`Map: ${loc.label}, Tiruchengode`}
                    src={embedUrl(geo)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-8">
                  <p className="font-mono text-[0.8125rem] tabular-nums text-ink-3">
                    {coord(geo.lat, "N", "S")}&ensp;{coord(geo.lng, "E", "W")}
                  </p>
                  <a href={mapsUrl(geo)} target="_blank" rel="noopener noreferrer" className="link-arrow">
                    Open in Google Maps
                    <span className="sr-only">: {loc.label} (opens in a new tab)</span>
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
